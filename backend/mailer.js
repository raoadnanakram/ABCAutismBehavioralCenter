const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let lastError = null;
const getLastError = () => lastError;

async function sendMail({ to, subject, html, replyTo }) {
  const missing = [
    !process.env.GOOGLE_SCRIPT_URL && 'GOOGLE_SCRIPT_URL',
    !process.env.MAIL_SECRET && 'MAIL_SECRET',
    !to && 'recipient (OWNER_EMAIL?)',
  ].filter(Boolean);

  if (missing.length) {
    lastError = 'Missing: ' + missing.join(', ');
    console.log('Mail skipped:', lastError);
    return false;
  }

  try {
    const res = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'content-type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ secret: process.env.MAIL_SECRET, to, subject, html, replyTo }),
      redirect: 'follow',
    });

    const text = await res.text();
    let data = {};
    try {
      data = JSON.parse(text);
    } catch {
      /* Google ne JSON nahi diya */
    }

    if (!data.ok) {
      lastError = ('Google: ' + (data.error || text)).replace(/\s+/g, ' ').slice(0, 300);
      console.error('Mail error:', lastError);
      return false;
    }

    lastError = null;
    return true;
  } catch (e) {
    lastError = 'Network: ' + e.message;
    console.error('Mail error:', e.message);
    return false;
  }
}

module.exports = { sendMail, esc, getLastError };