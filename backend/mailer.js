const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

async function sendMail({ to, subject, html, replyTo }) {
  if (!process.env.BREVO_API_KEY || !process.env.MAIL_FROM || !to) {
    console.log('Mail skipped: keys/recipient missing');
    return false;
  }
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'ABC Autism Behavioral Center', email: process.env.MAIL_FROM },
        to: [{ email: to }],
        subject,
        htmlContent: html,
        ...(replyTo ? { replyTo: { email: replyTo } } : {}),
      }),
    });
    if (!res.ok) {
      console.error('Mail error', res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error('Mail error:', e.message);
    return false;
  }
}

module.exports = { sendMail, esc };