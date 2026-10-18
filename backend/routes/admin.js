const router = require('express').Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

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
      'SELECT id, type, name, phone, email, subject, message, extra, status, mail_sent, created_at FROM submissions ORDER BY id DESC LIMIT 8'
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
      `SELECT * FROM submissions WHERE ${w} ORDER BY id DESC LIMIT ? OFFSET ?`,
      [...args, limit, (page - 1) * limit]
    );
    res.json({ rows, total: Number(total), page, pages: Math.max(1, Math.ceil(total / limit)) });
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
        apiKey: !!process.env.BREVO_API_KEY,
        sender: !!process.env.MAIL_FROM,
        owner: !!process.env.OWNER_EMAIL,
      },
      server: { node: process.version, uptimeMin: Math.round(process.uptime() / 60) },
    });
  })
);

module.exports = router;