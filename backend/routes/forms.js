// @ts-nocheck
const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const db = require('../config/db');
const { sendMail, esc } = require('../mailer');

const pool = db.pool;

router.use(
  rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: { message: 'Bohat zyada requests. Thori der baad try karein.' },
  })
);

const LABEL = {
  appointment: 'Appointment Booking',
  contact: 'Contact Message',
  career: 'Career Application',
};
const EXTRA = {
  appointment: ['childName', 'service', 'date', 'time'],
  contact: ['service', 'preferredContact'],
  career: ['position', 'experience', 'degree', 'age', 'gender'],
};
const USER_SUBJECT = {
  appointment: 'We received your appointment request',
  contact: 'Thank you for contacting ABC Autism Behavioral Center',
  career: 'Your application has been received',
};
const USER_TEXT = {
  appointment: 'Thank you for booking an appointment with us. Our team will review your request and contact you soon.',
  contact: 'Thank you for reaching out. Our team has received your message and will get back to you soon.',
  career: 'Thank you for applying. Our team will review your application and contact you if your profile matches.',
};

const layout = (title, inner) => `
<div style="font-family:Arial,sans-serif;background:#f4f8fb;padding:24px">
  <div style="max-width:560px;margin:auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e5edf3">
    <div style="background:#003B5C;color:#fff;padding:18px 24px;font-size:18px;font-weight:bold">
      ${esc(title)}<div style="height:4px;margin-top:10px;background:linear-gradient(90deg,#F5A623,#F5456B,#1CA7C7)"></div>
    </div>
    <div style="padding:24px;color:#334155;font-size:14px;line-height:1.6">${inner}</div>
    <div style="padding:14px 24px;background:#f8fafc;color:#64748b;font-size:12px">ABC Autism Behavioral Center, Lahore</div>
  </div>
</div>`;

const rowsHtml = (obj) =>
  Object.entries(obj)
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 10px;color:#64748b;border-bottom:1px solid #eef2f6">${esc(k)}</td><td style="padding:6px 10px;border-bottom:1px solid #eef2f6"><b>${esc(v)}</b></td></tr>`
    )
    .join('');

const clean = (v, n) => String(v || '').trim().slice(0, n);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ---------- CV check (career form) ---------- */
const MAX_CV = 5 * 1024 * 1024;
const MIME_PDF = 'application/pdf';
const MIME_DOC = 'application/msword';
const MIME_DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

function checkCv(cv) {
  if (!cv || typeof cv !== 'object') return { error: 'Please upload your CV.' };
  const data = typeof cv.data === 'string' ? cv.data : '';
  if (!data) return { error: 'Please upload your CV.' };
  if (data.length > Math.ceil((MAX_CV * 4) / 3) + 16) return { error: 'CV file is too large (max 5 MB).' };

  const buf = Buffer.from(data, 'base64');
  if (!buf.length) return { error: 'CV file looks empty.' };
  if (buf.length > MAX_CV) return { error: 'CV file is too large (max 5 MB).' };

  // The real file type is checked from the first bytes, not from the name
  const isPdf = buf.slice(0, 4).toString('latin1') === '%PDF';
  const isDocx = buf[0] === 0x50 && buf[1] === 0x4b; // zip container
  const isDoc = buf[0] === 0xd0 && buf[1] === 0xcf && buf[2] === 0x11 && buf[3] === 0xe0;
  if (!isPdf && !isDocx && !isDoc) return { error: 'CV must be a PDF or Word file.' };

  const name = String(cv.name || 'cv').replace(/[^\w.\- ]+/g, '_').slice(0, 120) || 'cv';
  return { buf, name, mime: isPdf ? MIME_PDF : isDoc ? MIME_DOC : MIME_DOCX };
}

router.post('/:type', async (req, res) => {
  try {
    const type = String(req.params.type);
    if (!Object.prototype.hasOwnProperty.call(LABEL, type)) {
      return res.status(404).json({ message: 'Not found' });
    }

    const b = req.body || {};
    if (b.website) return res.json({ ok: true }); // honeypot: bots yahan phans jate hain

    const name = clean(b.name, 120);
    const email = clean(b.email, 160);
    const phone = clean(b.phone, 30);
    const subject = clean(b.subject, 200);
    const message = clean(b.message, 3000);

    if (name.length < 2) return res.status(400).json({ message: 'Naam likhein' });
    if (!EMAIL_RE.test(email)) return res.status(400).json({ message: 'Sahi email likhein' });
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15)
      return res.status(400).json({ message: 'Sahi phone number likhein' });

    const extra = Object.fromEntries(EXTRA[type].map((k) => [k, clean(b[k], 300)]));
    if (type === 'career' && !extra.position)
      return res.status(400).json({ message: 'Position select karein' });

    let cvInfo = null;
    if (type === 'career') {
      cvInfo = checkCv(b.cv);
      if (cvInfo.error) return res.status(400).json({ message: cvInfo.error });
      extra['CV file'] = cvInfo.name;
    }

    const [r] = await pool.query(
      'INSERT INTO submissions (type,name,email,phone,subject,message,extra,ip) VALUES (?,?,?,?,?,?,?,?)',
      [type, name, email, phone, subject || null, message || null, JSON.stringify(extra), req.ip]
    );

    if (cvInfo) {
      try {
        await pool.query(
          'INSERT INTO cv_files (submission_id, filename, mime, size, data) VALUES (?,?,?,?,?)',
          [r.insertId, cvInfo.name, cvInfo.mime, cvInfo.buf.length, cvInfo.buf]
        );
      } catch (e) {
        console.error('CV save error:', e.message);
        await pool.query('DELETE FROM submissions WHERE id = ?', [r.insertId]).catch(() => {});
        return res.status(500).json({ message: 'Could not save your CV. Please try a smaller file.' });
      }
    }

    res.json({ ok: true });

    // Emails background mein jati hain, user ko intezar nahi karna parta
    (async () => {
      const details = { Name: name, Phone: phone, Email: email, Subject: subject, ...extra, Message: message };
      const ownerOk = await sendMail({
        to: process.env.OWNER_EMAIL,
        subject: `New ${LABEL[type]} from ${name}`,
        replyTo: email,
        html: layout(
          `New ${LABEL[type]}`,
          `<table style="width:100%;border-collapse:collapse">${rowsHtml(details)}</table>${
            cvInfo ? '<p style="margin-top:12px;color:#64748b">The CV can be downloaded from the admin dashboard.</p>' : ''
          }`
        ),
      });
      const userOk = await sendMail({
        to: email,
        subject: USER_SUBJECT[type],
        html: layout(
          LABEL[type],
          `<p>Dear ${esc(name)},</p><p>${USER_TEXT[type]}</p><p>Your details:</p><table style="width:100%;border-collapse:collapse">${rowsHtml(details)}</table><p style="margin-top:16px">Regards,<br><b>ABC Autism Behavioral Center</b></p>`
        ),
      });
      await pool.query('UPDATE submissions SET mail_sent = ? WHERE id = ?', [
        (ownerOk ? 1 : 0) + (userOk ? 2 : 0),
        r.insertId,
      ]);
    })().catch((e) => console.error('Mail job:', e.message));
  } catch (e) {
    console.error('Form error:', e.message);
    res.status(500).json({ message: 'Server error, dobara try karein' });
  }
});

module.exports = router;
