// Public read-only routes: posts list, single post and pictures.
// Writing (create / edit / delete) is in routes/admin.js and needs the admin token.
const router = require('express').Router();
const db = require('../config/db');

const pool = db.pool;
// news = News & Events page, filtration / cricket = the two Community Services sections
const SECTIONS = ['news', 'filtration', 'cricket'];

const h = (fn) => (req, res) =>
  fn(req, res).catch((e) => {
    console.error('Posts error:', e.message);
    res.status(500).json({ message: 'Server error' });
  });

const COLS = "id, section, title, content, DATE_FORMAT(post_date,'%Y-%m-%d') AS date, image_id";

// turns database rows into the JSON the website uses (with all picture links)
async function shape(rows) {
  const pics = {};
  if (rows.length) {
    const [imgs] = await pool.query(
      'SELECT post_id, image_id FROM post_images WHERE post_id IN (?) ORDER BY post_id, position, id',
      [rows.map((r) => r.id)]
    );
    imgs.forEach((r) => (pics[r.post_id] = pics[r.post_id] || []).push(r.image_id));
  }
  return rows.map((r) => {
    // posts saved before multi-picture support only have the single cover picture
    const ids = pics[r.id] || (r.image_id ? [r.image_id] : []);
    const images = ids.map((i) => `/api/media/${i}`);
    return {
      id: r.id,
      section: r.section,
      title: r.title,
      content: r.content || '',
      date: r.date,
      image: images[0] || '',
      images,
    };
  });
}

router.get(
  '/posts',
  h(async (req, res) => {
    const section = req.query.section;
    if (!SECTIONS.includes(section)) return res.status(400).json({ message: 'Invalid section' });
    const [rows] = await pool.query(
      `SELECT ${COLS} FROM posts WHERE section = ? ORDER BY post_date DESC, id DESC LIMIT 300`,
      [section]
    );
    res.set('Cache-Control', 'no-cache').json(await shape(rows));
  })
);

// one post (used by the Community Services detail page)
router.get(
  '/posts/:id',
  h(async (req, res) => {
    const [rows] = await pool.query(`SELECT ${COLS} FROM posts WHERE id = ?`, [Number(req.params.id) || 0]);
    if (!rows.length) return res.status(404).json({ message: 'Post not found' });
    res.set('Cache-Control', 'no-cache').json((await shape(rows))[0]);
  })
);

router.get(
  '/media/:id',
  h(async (req, res) => {
    const [rows] = await pool.query('SELECT mime, data FROM media_files WHERE id = ?', [
      Number(req.params.id) || 0,
    ]);
    if (!rows.length) return res.status(404).json({ message: 'Not found' });
    res
      .set({
        'Content-Type': rows[0].mime,
        'X-Content-Type-Options': 'nosniff',
        // a replaced picture always gets a new id, so this can be cached for long
        'Cache-Control': 'public, max-age=31536000, immutable',
      })
      .send(rows[0].data);
  })
);

module.exports = router;