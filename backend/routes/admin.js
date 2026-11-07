const router = require('express').Router();
const db = require('../config/db');
const auth = require('../middleware/auth');
const { getLastError } = require('../mailer');

const pool = db.pool;
const TYPES = ['appointment', 'contact', 'career'];
const STATUSES = ['new', 'read', 'replied', 'closed'];

const h = (fn) => (req, res) =>
  fn(req, res).catch((e) => {
    console.error('Admin error:', e.message);
    res.status(500).json({ message: 'Server error' });
  });

router.use(auth);

router.get(
  '/stats',
  h(async (req, res) => {
    const [byType] = await pool.query('SELECT type, COUNT(*) c FROM submissions GROUP BY type');
    const [byStatus] = await pool.query('SELECT status, COUNT(*) c FROM submissions GROUP BY status');
    const [newByType] = await pool.query(
      "SELECT type, COUNT(*) c FROM submissions WHERE status='new' GROUP BY type"
    );
    const [[today]] = await pool.query(
      'SELECT COUNT(*) c FROM submissions WHERE DATE(created_at) = CURDATE()'
    );
    const [daily] = await pool.query(
      "SELECT DATE_FORMAT(created_at,'%Y-%m-%d') d, COUNT(*) c FROM submissions WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY) GROUP BY d"
    );
    const [[{ t }]] = await pool.query("SELECT DATE_FORMAT(CURDATE(),'%Y-%m-%d') t");
    const [recent] = await pool.query(
      'SELECT s.id, s.type, s.name, s.phone, s.email, s.subject, s.message, s.extra, s.status, s.mail_sent, s.created_at, (SELECT COUNT(*) FROM cv_files c WHERE c.submission_id = s.id) AS has_cv FROM submissions s ORDER BY s.id DESC LIMIT 8'
    );

    const n = (rows, k, v) => Number((rows.find((r) => r[k] === v) || {}).c || 0);
    const base = new Date(t + 'T00:00:00Z');
    const series = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setUTCDate(d.getUTCDate() - (6 - i));
      const key = d.toISOString().slice(0, 10);
      return { d: key, c: n(daily, 'd', key) };
    });

    const types = {};
    const fresh = {};
    TYPES.forEach((k) => {
      types[k] = n(byType, 'type', k);
      fresh[k] = n(newByType, 'type', k);
    });
    const status = {};
    STATUSES.forEach((k) => (status[k] = n(byStatus, 'status', k)));

    res.json({
      total: Object.values(types).reduce((a, b) => a + b, 0),
      new: status.new,
      today: Number(today.c),
      types,
      newByType: fresh,
      status,
      series,
      recent,
    });
  })
);

router.get(
  '/submissions',
  h(async (req, res) => {
    const type = req.query.type;
    if (!TYPES.includes(type)) return res.status(400).json({ message: 'Invalid type' });
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 10;
    const where = ['type = ?'];
    const args = [type];
    if (STATUSES.includes(req.query.status)) {
      where.push('status = ?');
      args.push(req.query.status);
    }
    const q = String(req.query.q || '').trim().slice(0, 60);
    if (q) {
      where.push('(name LIKE ? OR email LIKE ? OR phone LIKE ? OR message LIKE ?)');
      const like = `%${q}%`;
      args.push(like, like, like, like);
    }
    const w = where.join(' AND ');
    const [[{ total }]] = await pool.query(`SELECT COUNT(*) total FROM submissions WHERE ${w}`, args);
    const [rows] = await pool.query(
      `SELECT s.*, (SELECT COUNT(*) FROM cv_files c WHERE c.submission_id = s.id) AS has_cv FROM submissions s WHERE ${w} ORDER BY s.id DESC LIMIT ? OFFSET ?`,
      [...args, limit, (page - 1) * limit]
    );
    res.json({ rows, total: Number(total), page, pages: Math.max(1, Math.ceil(total / limit)) });
  })
);

router.get(
  '/submissions/:id/cv',
  h(async (req, res) => {
    const [rows] = await pool.query('SELECT filename, mime, data FROM cv_files WHERE submission_id = ?', [
      Number(req.params.id),
    ]);
    if (!rows.length) return res.status(404).json({ message: 'No CV found' });
    const f = rows[0];
    res
      .set({
        'Content-Type': f.mime,
        'Content-Disposition': `attachment; filename="${String(f.filename).replace(/[^\w.\- ]/g, '_')}"`,
        'X-Content-Type-Options': 'nosniff',
      })
      .send(f.data);
  })
);

router.patch(
  '/submissions/:id',
  h(async (req, res) => {
    const { status } = req.body || {};
    if (!STATUSES.includes(status)) return res.status(400).json({ message: 'Invalid status' });
    await pool.query('UPDATE submissions SET status = ? WHERE id = ?', [status, Number(req.params.id)]);
    res.json({ ok: true });
  })
);

router.delete(
  '/submissions/:id',
  h(async (req, res) => {
    await pool.query('DELETE FROM cv_files WHERE submission_id = ?', [Number(req.params.id)]);
    await pool.query('DELETE FROM submissions WHERE id = ?', [Number(req.params.id)]);
    res.json({ ok: true });
  })
);

router.get(
  '/export',
  h(async (req, res) => {
    const type = req.query.type;
    if (!TYPES.includes(type)) return res.status(400).json({ message: 'Invalid type' });
    const [rows] = await pool.query('SELECT * FROM submissions WHERE type = ? ORDER BY id DESC', [type]);
    const cols = ['id', 'name', 'email', 'phone', 'subject', 'message', 'extra', 'status', 'created_at'];
    const cell = (v) => {
      let s = String(v ?? '');
      if (/^[=+\-@]/.test(s)) s = "'" + s; // Excel formula injection se bachao
      return `"${s.replace(/"/g, '""')}"`;
    };
    const csv =
      '\uFEFF' +
      [cols.join(','), ...rows.map((r) => cols.map((c) => cell(c === 'created_at' ? new Date(r[c]).toISOString() : r[c])).join(','))].join('\r\n');
    res.set('Content-Type', 'text/csv; charset=utf-8').send(csv);
  })
);

router.get(
  '/logins',
  h(async (req, res) => {
    const [rows] = await pool.query(
      'SELECT phone, success, ip, user_agent, created_at FROM login_logs ORDER BY id DESC LIMIT 15'
    );
    res.json(rows);
  })
);

router.get(
  '/system',
  h(async (req, res) => {
    let dbInfo;
    try {
      await pool.query('SELECT 1');
      const [[a]] = await pool.query('SELECT COUNT(*) c FROM admins');
      const [[s]] = await pool.query('SELECT COUNT(*) c FROM submissions');
      const [[l]] = await pool.query('SELECT COUNT(*) c FROM login_logs');
      dbInfo = { connected: true, tables: { admins: a.c, submissions: s.c, login_logs: l.c } };
    } catch (e) {
      dbInfo = { connected: false, error: e.message };
    }
    res.json({
      db: dbInfo,
      mail: {
        apiKey: !!process.env.GOOGLE_SCRIPT_URL,
        sender: !!process.env.MAIL_SECRET,
        owner: !!process.env.OWNER_EMAIL,
        lastError: getLastError(),
      },
      server: { node: process.version, uptimeMin: Math.round(process.uptime() / 60) },
    });
  })
);

/* ---------- News & Events / Community Services posts ---------- */
const SECTIONS = ['news', 'filtration', 'cricket'];
const COMMUNITY = ['filtration', 'cricket']; // posts can be moved between these two
const MAX_IMG = 4 * 1024 * 1024;
const MAX_PICS = 10;

function checkImage(img) {
  const raw = img && typeof img.data === 'string' ? img.data.replace(/^data:[^;]+;base64,/, '') : '';
  if (!raw) return { error: 'Please choose a picture.' };
  if (raw.length > Math.ceil((MAX_IMG * 4) / 3) + 16) return { error: 'Picture is too large (max 4 MB).' };
  const buf = Buffer.from(raw, 'base64');
  if (!buf.length) return { error: 'Picture looks empty.' };
  if (buf.length > MAX_IMG) return { error: 'Picture is too large (max 4 MB).' };
  // real type is checked from the first bytes, not from the file name
  let mime = null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) mime = 'image/jpeg';
  else if (buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) mime = 'image/png';
  else if (buf.slice(0, 4).toString('latin1') === 'RIFF' && buf.slice(8, 12).toString('latin1') === 'WEBP') mime = 'image/webp';
  if (!mime) return { error: 'Only JPG, PNG or WebP pictures are allowed.' };
  return { buf, mime };
}

function readPost(body) {
  const b = body || {};
  const title = String(b.title || '').trim().slice(0, 200);
  const content = String(b.content || '').trim().slice(0, 8000);
  const date = String(b.date || '');
  if (!title) return { error: 'Title is required.' };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(new Date(date + 'T00:00:00Z').getTime()))
    return { error: 'Please choose a valid date.' };
  return { title, content, date };
}

const dropImages = async (ids) => {
  if (ids.length) await pool.query('DELETE FROM media_files WHERE id IN (?)', [ids]);
};

// every picture that belongs to a post (new table + old single "cover" column)
async function currentImageIds(postId) {
  const [a] = await pool.query('SELECT image_id FROM post_images WHERE post_id = ?', [postId]);
  const [b] = await pool.query('SELECT image_id FROM posts WHERE id = ?', [postId]);
  const ids = new Set(a.map((r) => r.image_id));
  b.forEach((r) => r.image_id && ids.add(r.image_id));
  return [...ids];
}

// picture ids sent by the dashboard must exist and must not belong to another post
async function checkImageIds(ids, postId) {
  if (!Array.isArray(ids)) return { error: 'Invalid pictures.' };
  const list = [...new Set(ids.map(Number).filter((n) => n > 0))];
  if (list.length > MAX_PICS) return { error: `You can add up to ${MAX_PICS} pictures.` };
  if (!list.length) return { ids: [] };
  const [used] = await pool.query('SELECT post_id FROM post_images WHERE image_id IN (?)', [list]);
  const [cover] = await pool.query('SELECT id FROM posts WHERE image_id IN (?)', [list]);
  if (used.some((r) => r.post_id !== postId) || cover.some((r) => r.id !== postId))
    return { error: 'A picture is already used by another post.' };
  const [found] = await pool.query('SELECT id FROM media_files WHERE id IN (?)', [list]);
  if (found.length !== list.length) return { error: 'A picture was not found. Please upload it again.' };
  return { ids: list };
}

async function setImages(postId, newIds) {
  const old = await currentImageIds(postId);
  await pool.query('DELETE FROM post_images WHERE post_id = ?', [postId]);
  if (newIds.length)
    await pool.query('INSERT INTO post_images (post_id, image_id, position) VALUES ?', [
      newIds.map((id, i) => [postId, id, i]),
    ]);
  await pool.query('UPDATE posts SET image_id = ? WHERE id = ?', [newIds[0] || null, postId]);
  await dropImages(old.filter((id) => !newIds.includes(id)));
}

// pictures uploaded but never saved in a post (form abandoned) are removed after a day
const cleanOrphans = () =>
  pool
    .query(
      'DELETE FROM media_files WHERE created_at < (NOW() - INTERVAL 1 DAY) AND id NOT IN (SELECT image_id FROM post_images) AND id NOT IN (SELECT image_id FROM posts WHERE image_id IS NOT NULL)'
    )
    .catch(() => {});

// one picture per request: keeps every upload small and gives the dashboard progress
router.post(
  '/media',
  h(async (req, res) => {
    const img = checkImage(req.body);
    if (img.error) return res.status(400).json({ message: img.error });
    const [r] = await pool.query('INSERT INTO media_files (mime, size, data) VALUES (?,?,?)', [
      img.mime,
      img.buf.length,
      img.buf,
    ]);
    cleanOrphans();
    res.json({ ok: true, id: r.insertId });
  })
);

// removes a picture only if no post uses it yet (user removed it before saving)
router.delete(
  '/media/:id',
  h(async (req, res) => {
    const id = Number(req.params.id) || 0;
    const [a] = await pool.query('SELECT id FROM post_images WHERE image_id = ?', [id]);
    const [b] = await pool.query('SELECT id FROM posts WHERE image_id = ?', [id]);
    if (!a.length && !b.length) await dropImages([id]);
    res.json({ ok: true });
  })
);

router.post(
  '/posts',
  h(async (req, res) => {
    const section = (req.body || {}).section;
    if (!SECTIONS.includes(section)) return res.status(400).json({ message: 'Invalid section' });
    const post = readPost(req.body);
    if (post.error) return res.status(400).json({ message: post.error });
    const pics = await checkImageIds(req.body.images || [], 0);
    if (pics.error) return res.status(400).json({ message: pics.error });

    const [r] = await pool.query('INSERT INTO posts (section, title, content, post_date) VALUES (?,?,?,?)', [
      section,
      post.title,
      post.content,
      post.date,
    ]);
    await setImages(r.insertId, pics.ids);
    res.json({ ok: true, id: r.insertId });
  })
);

router.put(
  '/posts/:id',
  h(async (req, res) => {
    const id = Number(req.params.id) || 0;
    const [rows] = await pool.query('SELECT id, section FROM posts WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'Post not found' });
    // category change (Filtration Plant <-> Cricket Stadium)
    let section = rows[0].section;
    const want = (req.body || {}).section;
    if (want && want !== section) {
      if (!COMMUNITY.includes(want) || !COMMUNITY.includes(section))
        return res.status(400).json({ message: 'This post cannot be moved to that category.' });
      section = want;
    }
    const post = readPost(req.body);
    if (post.error) return res.status(400).json({ message: post.error });
    let pics = null;
    if (req.body.images !== undefined) {
      pics = await checkImageIds(req.body.images, id);
      if (pics.error) return res.status(400).json({ message: pics.error });
    }
    await pool.query('UPDATE posts SET section = ?, title = ?, content = ?, post_date = ? WHERE id = ?', [
      section,
      post.title,
      post.content,
      post.date,
      id,
    ]);
    if (pics) await setImages(id, pics.ids);
    res.json({ ok: true });
  })
);

router.delete(
  '/posts/:id',
  h(async (req, res) => {
    const id = Number(req.params.id) || 0;
    const ids = await currentImageIds(id);
    await pool.query('DELETE FROM post_images WHERE post_id = ?', [id]);
    await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    await dropImages(ids);
    res.json({ ok: true });
  })
);

module.exports = router;