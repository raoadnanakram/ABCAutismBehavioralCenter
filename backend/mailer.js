const n=require('nodemailer'),port=+process.env.SMTP_PORT||465;
const t=n.createTransport({host:process.env.SMTP_HOST,port,secure:port==465,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});
exports.esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
exports.send=(to,subject,html)=>t.sendMail({from:`"${process.env.SITE_NAME}" <${process.env.SMTP_USER}>`,to,subject,html}).catch(e=>console.error('Mail error:',e.message));
