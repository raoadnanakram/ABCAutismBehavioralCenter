const r = require('express').Router();
const bcrypt = require('bcryptjs'), jwt = require('jsonwebtoken'), rl = require('express-rate-limit');
const { Admin, Contact, Appointment, normPhone } = require('./models');
const { send, esc } = require('./mailer');

// async errors -> express error handler (no extra package needed)
const wrap = (h) => (typeof h === 'function' && h.length < 4 ? (q, s, n) => Promise.resolve(h(q, s, n)).catch(n) : h);
['get', 'post', 'patch', 'delete'].forEach((m) => { const o = r[m].bind(r); r[m] = (p, ...hs) => o(p, ...hs.map(wrap)); });

const ok = (s, o = {}) => s.json({ success: true, ...o });
const fail = (s, code, message) => s.status(code).json({ success: false, message });
const clean = (v, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const okEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const limit = (max) => rl({ windowMs: 15 * 60 * 1000, max, standardHeaders: true, legacyHeaders: false, message: { success: false, message: 'Too many requests. Please try again later.' } });
const STATUS = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

// JWT is sent by the frontend as "Authorization: Bearer <token>"
const auth = (q, s, next) => {
  try { q.admin = jwt.verify((q.headers.authorization || '').replace(/^Bearer\s+/i, ''), process.env.JWT_SECRET); next(); }
  catch { fail(s, 401, 'Session expired. Please login again.'); }
};

/* ---------- PUBLIC FORMS: saved in MongoDB, email goes to owner AND user ---------- */
const intake = (Model, fields, required, title) => async (q, s) => {
  const d = {};
  for (const [k, max] of Object.entries(fields)) d[k] = clean(q.body[k], max);
  if (required.some((k) => !d[k])) return fail(s, 400, 'Please fill all required fields.');
  if (d.email && !okEmail(d.email)) return fail(s, 400, 'Please enter a valid email address.');
  await Model.create(d);
  const rows = Object.entries(d).filter(([, v]) => v).map(([k, v]) => `<p><b>${esc(k)}:</b> ${esc(v)}</p>`).join('');
  send(process.env.OWNER_EMAIL, 'New ' + title, rows);
  if (d.email) send(d.email, `${title} received`, `<p>Dear ${esc(d.name)},</p><p>Thank you for contacting ${esc(process.env.SITE_NAME)}. We have received your ${title.toLowerCase()} and our team will contact you soon.</p>`);
  ok(s, { message: 'Submitted successfully.' });
};
r.post('/contact', limit(10), intake(Contact, { name: 80, email: 120, phone: 20, service: 100, preferredContact: 40, message: 2000 }, ['name', 'phone', 'service'], 'Contact Message'));
r.post('/appointment', limit(10), intake(Appointment, { name: 80, email: 120, phone: 20, childName: 80, service: 100, date: 20, time: 20, additionalInfo: 1000 }, ['name', 'phone', 'service', 'date', 'time'], 'Appointment Request'));

/* ---------- ADMIN LOGIN ---------- */
r.post('/admin/login', limit(15), async (q, s) => {
  const a = await Admin.findOne({ phone: normPhone(clean(q.body.phone, 25)) });
  if (!a) return fail(s, 401, 'Invalid phone number or password.');
  if (a.lockUntil && a.lockUntil > Date.now()) return fail(s, 429, 'Too many failed attempts. Try again in 15 minutes.');
  if (!(await bcrypt.compare(String(q.body.password || ''), a.password))) {
    if (++a.fails >= 5) { a.lockUntil = Date.now() + 15 * 60000; a.fails = 0; }
    await a.save();
    return fail(s, 401, 'Invalid phone number or password.');
  }
  a.fails = 0; await a.save();
  ok(s, { token: jwt.sign({ id: a._id }, process.env.JWT_SECRET, { expiresIn: '12h' }) });
});

/* ---------- ADMIN DASHBOARD (JWT protected) ---------- */
r.get('/admin/appointments', auth, async (q, s) => ok(s, { appointments: await Appointment.find().sort('-createdAt').limit(2000).lean() }));
r.get('/admin/contacts', auth, async (q, s) => {
  const list = await Contact.find().sort('-createdAt').limit(2000).lean();
  ok(s, { contacts: list.map((x) => ({ ...x, subject: x.subject || x.service || '' })) });
});
r.patch('/admin/appointments/:id/status', auth, async (q, s) => {
  if (!STATUS.includes(q.body.status)) return fail(s, 400, 'Invalid status.');
  const a = await Appointment.findByIdAndUpdate(q.params.id, { status: q.body.status }, { new: true });
  if (!a) return fail(s, 404, 'Appointment not found.');
  if (a.email) send(a.email, 'Appointment ' + a.status, `<p>Dear ${esc(a.name)}, your appointment on ${esc(a.date)} ${esc(a.time)} is now <b>${esc(a.status)}</b>.</p>`);
  ok(s, { appointment: a });
});
r.delete('/admin/:type(contacts|appointments)/:id', auth, async (q, s) => {
  await (q.params.type === 'contacts' ? Contact : Appointment).findByIdAndDelete(q.params.id);
  ok(s);
});
r.post('/admin/change-password', auth, async (q, s) => {
  const a = await Admin.findById(q.admin.id), n = String(q.body.newPassword || '');
  if (!a || !(await bcrypt.compare(String(q.body.oldPassword || ''), a.password)) || n.length < 10) return fail(s, 400, 'Check passwords (new password min 10 characters).');
  a.password = await bcrypt.hash(n, 12); await a.save();
  ok(s, { message: 'Password changed.' });
});

module.exports = r;
