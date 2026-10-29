import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { submitForm } from '../api';

/* ==========================================================================
   ABC Autism Behavioral Center - Careers page
   Colours (from the logo): navy #003B5C | pink #F5456B | orange #F5A623 | cyan #1CA7C7
   ========================================================================== */

// Optional contact buttons at the bottom. Leave empty to hide them.
// WhatsApp number format: country code + number, no plus or spaces (e.g. '923001234567')
const WHATSAPP_NUMBER = '';
const CONTACT_EMAIL = '';

const BRAND = {
  navy: '#003B5C',
  navyDark: '#02263b',
  pink: '#F5456B',
  orange: '#F5A623',
  cyan: '#1CA7C7',
};

// Edit this list to match the jobs you are hiring for.
const ROLES = [
  'Speech & Language Therapist',
  'Behavior Therapist (ABA)',
  'Occupational Therapist',
  'Pediatric Physiotherapist',
  'Play & Sensory Therapist',
  'Daycare Caregiver',
  'Specialist Doctor',
  'Front Desk / Admin Officer',
];

const ROLE_ICONS = ['🗣️', '🧩', '🖐️', '🏃', '🎨', '🧸', '🩺', '💼'];
const MARQUEE_COLORS = [BRAND.pink, BRAND.cyan, BRAND.orange];

const COUNTRY_CODES = [
  { code: '+92', label: '🇵🇰 +92' },
  { code: '+91', label: '🇮🇳 +91' },
  { code: '+971', label: '🇦🇪 +971' },
  { code: '+966', label: '🇸🇦 +966' },
  { code: '+974', label: '🇶🇦 +974' },
  { code: '+968', label: '🇴🇲 +968' },
  { code: '+965', label: '🇰🇼 +965' },
  { code: '+973', label: '🇧🇭 +973' },
  { code: '+44', label: '🇬🇧 +44' },
  { code: '+1', label: '🇺🇸 +1' },
  { code: '+61', label: '🇦🇺 +61' },
  { code: '+49', label: '🇩🇪 +49' },
  { code: '+90', label: '🇹🇷 +90' },
  { code: '+86', label: '🇨🇳 +86' },
];

const EMPTY_FORM = {
  name: '',
  lastName: '',
  email: '',
  countryCode: '+92',
  phone: '',
  degree: '',
  age: '',
  gender: '',
  job: '',
  experience: '',
  website: '', // hidden anti-spam field (humans never fill it)
};

const STEPS = [
  { icon: '📝', title: 'Submit your application', text: 'Fill in the form and upload your CV.', color: BRAND.pink },
  { icon: '🔍', title: 'We review your profile', text: 'Our team goes through every application.', color: BRAND.cyan },
  { icon: '📞', title: 'Shortlisted candidates are contacted', text: 'We reach out if your profile matches.', color: BRAND.orange },
  { icon: '🎉', title: 'Welcome to the team', text: 'Start helping children learn and grow.', color: BRAND.navy },
];

// Edit these to match your center.
const PERKS = [
  { icon: '💙', title: 'Child-first mission', text: 'Every decision starts with what is best for the child and the family.', color: BRAND.pink },
  { icon: '🤝', title: 'A team of specialists', text: 'Work alongside therapists and educators from many fields of child development.', color: BRAND.cyan },
  { icon: '🌱', title: 'Room to grow', text: 'Learn from colleagues in different areas and keep building your skills.', color: BRAND.orange },
  { icon: '🏡', title: 'Caring environment', text: 'A warm, supportive place where families and staff feel valued.', color: BRAND.navy },
];

const STYLES = `
@keyframes cpFloat { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(22px,-28px,0) scale(1.08); } }
@keyframes cpFloatB { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-26px,20px,0) scale(1.12); } }
@keyframes cpBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
@keyframes cpShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@keyframes cpMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes cpPing { 0% { transform: scale(1); opacity: .7; } 80%,100% { transform: scale(2.6); opacity: 0; } }
@keyframes cpSpin { to { transform: rotate(360deg); } }
@keyframes cpShine { 0% { transform: translateX(-130%) skewX(-18deg); } 60%,100% { transform: translateX(260%) skewX(-18deg); } }
@keyframes cpPop { 0% { transform: scale(.5); opacity: 0; } 70% { transform: scale(1.12); } 100% { transform: scale(1); opacity: 1; } }
.cp-float { animation: cpFloat 9s ease-in-out infinite; }
.cp-float-b { animation: cpFloatB 11s ease-in-out infinite; }
.cp-bob { animation: cpBob 5s ease-in-out infinite; }
.cp-shift { background-size: 220% 220%; animation: cpShift 12s ease infinite; }
.cp-marquee { display: flex; width: max-content; animation: cpMarquee 38s linear infinite; }
.cp-marquee-wrap:hover .cp-marquee { animation-play-state: paused; }
.cp-ping { animation: cpPing 1.8s cubic-bezier(0,0,.2,1) infinite; }
.cp-spin { animation: cpSpin .8s linear infinite; }
.cp-shine { position: relative; overflow: hidden; }
.cp-shine::after { content: ''; position: absolute; top: 0; bottom: 0; width: 34%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent); animation: cpShine 5s ease-in-out infinite; pointer-events: none; }
.cp-dots { background-image: radial-gradient(rgba(255,255,255,.16) 1px, transparent 1px); background-size: 22px 22px; }
.cp-pop { animation: cpPop .6s ease both; }
@media (prefers-reduced-motion: reduce) {
  .cp-float, .cp-float-b, .cp-bob, .cp-shift, .cp-marquee, .cp-ping, .cp-shine::after, .cp-pop { animation: none !important; }
}
`;

/* ------------------------------ helpers ---------------------------------- */

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 placeholder-slate-400 outline-none transition-all duration-300 focus:border-[#1CA7C7] focus:ring-4 focus:ring-[#1CA7C7]/20 hover:border-slate-300';
const labelCls = 'mb-1.5 block text-sm font-semibold text-slate-700';

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(',')[1] || '');
    r.onerror = () => reject(new Error('Could not read the CV file.'));
    r.readAsDataURL(file);
  });

function Reveal({ children, delay = 0, className = '', y = 32 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ value, suffix = '' }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (t) => {
          const p = Math.min(1, (t - start) / 1400);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* -------------------------------- page ----------------------------------- */

export default function Careerpage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [cv, setCv] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverError, setServerError] = useState('');
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);
  const formRef = useRef(null);
  const rolesRef = useRef(null);

  const goTo = (ref) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  /* ---------- SEO ---------- */
  useEffect(() => {
    const prevTitle = document.title;
    const title = 'Careers | ABC Autism Behavioral Center';
    document.title = title;

    const setMeta = (name, content, attr = 'name') => {
      let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const desc =
      'Join ABC Autism Behavioral Center. Apply for speech therapist, ABA behavior therapist, occupational therapist, physiotherapist and daycare jobs.';
    setMeta('description', desc);
    setMeta('og:title', title, 'property');
    setMeta('og:description', desc, 'property');
    setMeta('og:url', 'https://abcautismbehavioralcenter.com/careers', 'property');

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://abcautismbehavioralcenter.com/careers');

    return () => {
      document.title = prevTitle;
    };
  }, []);

  /* ---------- form logic ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  // Phone: digits only, leading 0 removed (0300... -> 300...)
  const handlePhone = (e) => {
    let digits = e.target.value.replace(/\D/g, '');
    if (digits.startsWith('0')) digits = digits.replace(/^0+/, '');
    setForm((f) => ({ ...f, phone: digits.slice(0, 12) }));
    if (errors.phone) setErrors((er) => ({ ...er, phone: '' }));
  };

  const pickFile = (file) => {
    if (!file) return;
    const okTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const okExt = /\.(pdf|doc|docx)$/i.test(file.name);
    if (!okTypes.includes(file.type) && !okExt) {
      setErrors((er) => ({ ...er, cv: 'Please upload a PDF or Word file.' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((er) => ({ ...er, cv: 'File size must be under 5 MB.' }));
      return;
    }
    setCv(file);
    setErrors((er) => ({ ...er, cv: '' }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = 'Please enter your first name.';
    if (!form.lastName.trim()) er.lastName = 'Please enter your last name.';
    if (!form.email.trim()) er.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      er.email = 'Please enter a valid email address.';

    if (!form.phone) er.phone = 'Please enter your phone number.';
    else if (form.countryCode === '+92' && form.phone.length !== 10)
      er.phone = 'Enter 10 digits after +92 (e.g. 3001234567).';
    else if ((form.countryCode + form.phone).replace(/\D/g, '').length < 10)
      er.phone = 'Please enter a valid phone number.';

    if (!form.degree.trim()) er.degree = 'Please enter your degree.';
    if (!form.age || Number(form.age) < 18 || Number(form.age) > 70)
      er.age = 'Please enter a valid age (18–70).';
    if (!form.gender) er.gender = 'Please select your gender.';
    if (!form.job) er.job = 'Please select the job you are applying for.';
    if (!form.experience.trim()) er.experience = 'Please enter your experience.';
    if (!cv) er.cv = 'Please upload your CV.';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return; // stops double submissions
    if (!validate()) return;
    setStatus('sending');
    setServerError('');
    try {
      const payload = {
        name: `${form.name.trim()} ${form.lastName.trim()}`.trim(),
        email: form.email.trim(),
        phone: `${form.countryCode}${form.phone}`,
        position: form.job,
        experience: form.experience.trim(),
        degree: form.degree.trim(),
        age: form.age,
        gender: form.gender,
        website: form.website,
        cv: { name: cv.name, type: cv.type, data: await toBase64(cv) },
      };
      await submitForm('career', payload);
      setStatus('success');
      setForm(EMPTY_FORM);
      setCv(null);
    } catch (err) {
      let msg = err && err.message ? err.message : '';
      if (/413|too large/i.test(msg)) msg = 'Your CV file is too large. Please upload a file under 5 MB.';
      else if (!msg || /failed to fetch|network/i.test(msg))
        msg = 'Could not reach the server. Please check your internet connection and try again.';
      setServerError(msg);
      setStatus('error');
    }
  };

  const ErrorMsg = ({ name }) =>
    errors[name] ? <p className="mt-1.5 text-xs font-medium text-red-500">{errors[name]}</p> : null;

  // How much of the form is filled (only for the progress bar)
  const progress = useMemo(() => {
    const checks = [
      form.name.trim(),
      form.lastName.trim(),
      form.email.trim(),
      form.phone,
      form.degree.trim(),
      form.age,
      form.gender,
      form.job,
      form.experience.trim(),
      cv,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [form, cv]);

  /* ---------------------------------------------------------------- */
  return (
    <main className="overflow-x-hidden bg-[#F1F6FA]">
      <style>{STYLES}</style>

      {/* ============================== HERO ============================== */}
      <section
        className="cp-shift relative overflow-hidden pb-28 pt-28 text-white sm:pt-32 lg:pb-36"
        style={{ backgroundImage: `linear-gradient(125deg, ${BRAND.navyDark} 0%, ${BRAND.navy} 45%, #04507a 75%, ${BRAND.navyDark} 100%)` }}
      >
        <div className="cp-dots pointer-events-none absolute inset-0" />
        <div className="cp-float pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full blur-3xl" style={{ background: `${BRAND.pink}55` }} />
        <div className="cp-float-b pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full blur-3xl" style={{ background: `${BRAND.cyan}55` }} />
        <div className="cp-float pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full blur-3xl" style={{ background: `${BRAND.orange}40` }} />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2">
          {/* ---- left: message ---- */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold backdrop-blur sm:text-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="cp-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              We are hiring
              <span className="text-white/40">|</span>
              <span style={{ color: BRAND.orange }}>Join ABC Autism Behavioral Center</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 font-serif text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl"
            >
              Build a career that helps every child{' '}
              <span className="relative inline-block italic" style={{ color: BRAND.pink }}>
                grow
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 120 12" fill="none" preserveAspectRatio="none">
                  <motion.path
                    d="M2 8 Q 18 1, 34 7 T 66 7 T 98 7 T 118 6"
                    stroke={BRAND.orange}
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, delay: 0.9, ease: 'easeOut' }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
            >
              We are looking for caring and skilled professionals to provide child therapy, developmental support and
              expert clinical care. Bring your skills, and grow with a team that puts children first.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <motion.button
                type="button"
                onClick={goTo(formRef)}
                whileHover={{ y: -4, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="cp-shine rounded-full bg-gradient-to-r from-[#F5456B] to-[#F5A623] px-9 py-4 text-base font-bold text-white shadow-xl shadow-[#F5456B]/40"
              >
                Apply Now →
              </motion.button>
              <motion.button
                type="button"
                onClick={goTo(rolesRef)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full border-2 border-white/30 bg-white/5 px-8 py-3.5 text-base font-semibold backdrop-blur transition hover:border-white hover:bg-white/15"
              >
                View open roles
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6"
            >
              {[
                { v: 500, s: '+', l: 'children supported', c: BRAND.orange },
                { v: 9, s: '', l: 'care services', c: BRAND.pink },
                { v: ROLES.length, s: '', l: 'role types', c: BRAND.cyan },
              ].map((x) => (
                <div key={x.l}>
                  <p className="font-serif text-3xl font-bold sm:text-4xl" style={{ color: x.c }}>
                    <CountUp value={x.v} suffix={x.s} />
                  </p>
                  <p className="mt-1 text-xs text-white/70 sm:text-sm">{x.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ---- right: floating roles panel ---- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div
              className="absolute -inset-4 rounded-[2.5rem] opacity-60 blur-2xl"
              style={{ background: `conic-gradient(from 0deg, ${BRAND.pink}, ${BRAND.orange}, ${BRAND.cyan}, ${BRAND.pink})` }}
            />
            <div className="cp-bob relative rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="font-serif text-xl font-bold">Open positions</p>
                  <p className="text-xs text-white/60">Tap apply to start</p>
                </div>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-300">Hiring</span>
              </div>
              <div className="space-y-3">
                {ROLES.slice(0, 4).map((r, i) => (
                  <motion.button
                    type="button"
                    key={r}
                    onClick={goTo(formRef)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.12 }}
                    whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.22)' }}
                    className="group flex w-full items-center gap-4 rounded-2xl bg-white/10 p-3.5 text-left"
                  >
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${MARQUEE_COLORS[i % 3]}, ${MARQUEE_COLORS[i % 3]}99)` }}
                    >
                      {ROLE_ICONS[i]}
                    </span>
                    <span className="flex-1 text-sm font-semibold">{r}</span>
                    <span className="text-lg text-white/50 transition group-hover:translate-x-1 group-hover:text-white">→</span>
                  </motion.button>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-white/60">and more roles in the application form</p>
            </div>

            {[
              { t: 'Support', c: BRAND.orange, pos: '-left-6 top-8', d: '0s' },
              { t: 'Learn', c: BRAND.pink, pos: '-right-5 top-1/2', d: '1.2s' },
              { t: 'Grow', c: BRAND.cyan, pos: 'left-8 -bottom-5', d: '2.4s' },
            ].map((b) => (
              <span
                key={b.t}
                className={`cp-bob absolute ${b.pos} rounded-full px-5 py-2 text-sm font-bold text-white shadow-xl`}
                style={{ background: b.c, animationDelay: b.d }}
              >
                {b.t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* wave divider */}
        <svg className="absolute bottom-[-1px] left-0 w-full" viewBox="0 0 1440 90" preserveAspectRatio="none" fill="#F1F6FA">
          <path d="M0 40 C 240 100, 480 0, 720 40 C 960 80, 1200 10, 1440 50 L1440 90 L0 90 Z" />
        </svg>
      </section>

      {/* ============================ ROLES MARQUEE ============================ */}
      <section ref={rolesRef} className="relative -mt-2 pb-4 pt-6" style={{ scrollMarginTop: 90 }}>
        <Reveal className="mb-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: BRAND.pink }}>
            Roles we hire for
          </p>
        </Reveal>
        <div className="cp-marquee-wrap relative overflow-hidden py-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#F1F6FA] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#F1F6FA] to-transparent" />
          <div className="cp-marquee gap-4">
            {[...ROLES, ...ROLES].map((r, i) => (
              <span
                key={r + i}
                className="mx-2 flex items-center gap-3 whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-semibold shadow-md ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
                style={{ color: BRAND.navy }}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: MARQUEE_COLORS[i % 3] }} />
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ APPLICATION FORM ============================ */}
      <section id="application" ref={formRef} className="relative py-16 sm:py-20" style={{ scrollMarginTop: 90 }}>
        <div className="cp-float pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full blur-3xl" style={{ background: `${BRAND.cyan}22` }} />
        <div className="cp-float-b pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full blur-3xl" style={{ background: `${BRAND.pink}22` }} />

        <div className="relative mx-auto max-w-3xl px-5">
          <Reveal className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: BRAND.pink }}>
              Job Application
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl" style={{ color: BRAND.navy }}>
              Apply to join <span className="italic" style={{ color: BRAND.pink }}>our team</span>
            </h2>
            <p className="mt-4 text-slate-600">
              Fill in the form below and upload your CV. Our team will contact shortlisted candidates.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-24px_rgba(0,59,92,0.35)] ring-1 ring-slate-100">
              <div
                className="cp-shift h-2 w-full"
                style={{ backgroundImage: `linear-gradient(90deg, ${BRAND.orange}, ${BRAND.pink}, ${BRAND.cyan}, ${BRAND.orange})` }}
              />

              {status === 'success' ? (
                <div className="px-8 py-16 text-center">
                  <div
                    className="cp-pop mx-auto flex h-24 w-24 items-center justify-center rounded-full text-5xl text-white shadow-xl"
                    style={{ background: `linear-gradient(135deg, #10b981, ${BRAND.cyan})` }}
                  >
                    ✓
                  </div>
                  <h3 className="mt-6 font-serif text-3xl font-bold" style={{ color: BRAND.navy }}>
                    Application Submitted!
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-slate-600">
                    Thank you for applying to ABC Autism Behavioral Center. A confirmation email is on its way. Our team
                    will review your application and contact you if you are shortlisted.
                  </p>
                  <motion.button
                    onClick={() => setStatus('idle')}
                    whileHover={{ y: -3, scale: 1.04 }}
                    className="mt-8 rounded-full bg-gradient-to-r from-[#003B5C] to-[#1CA7C7] px-8 py-3 font-semibold text-white shadow-lg"
                  >
                    Submit Another Application
                  </motion.button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="relative space-y-6 p-6 sm:p-10">
                  {/* progress */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span>Your progress</span>
                      <span style={{ color: BRAND.pink }}>{progress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${BRAND.cyan}, ${BRAND.pink}, ${BRAND.orange})` }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Anti-spam honeypot: invisible to people */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                  />

                  {/* Name + Last Name */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelCls}>Name</label>
                      <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="First name" className={inputCls} />
                      <ErrorMsg name="name" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={labelCls}>Last Name</label>
                      <input id="lastName" name="lastName" type="text" value={form.lastName} onChange={handleChange} placeholder="Last name" className={inputCls} />
                      <ErrorMsg name="lastName" />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={labelCls}>Email</label>
                      <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputCls} />
                      <ErrorMsg name="email" />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelCls}>Phone Number</label>
                      <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300 focus-within:border-[#1CA7C7] focus-within:ring-4 focus-within:ring-[#1CA7C7]/20">
                        <select
                          name="countryCode"
                          value={form.countryCode}
                          onChange={handleChange}
                          aria-label="Country code"
                          className="w-[104px] shrink-0 cursor-pointer border-r border-slate-200 bg-slate-50 px-2 py-3.5 text-sm font-medium text-slate-700 outline-none"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>{c.label}</option>
                          ))}
                        </select>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          value={form.phone}
                          onChange={handlePhone}
                          placeholder="3001234567"
                          className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-slate-800 placeholder-slate-400 outline-none"
                        />
                      </div>
                      <ErrorMsg name="phone" />
                    </div>
                  </div>

                  {/* Degree */}
                  <div>
                    <label htmlFor="degree" className={labelCls}>Degree</label>
                    <input id="degree" name="degree" type="text" value={form.degree} onChange={handleChange} placeholder="e.g. DPT, BS Speech Therapy, MBBS" className={inputCls} />
                    <ErrorMsg name="degree" />
                  </div>

                  {/* Age + Gender */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="age" className={labelCls}>Age</label>
                      <input id="age" name="age" type="number" min="18" max="70" value={form.age} onChange={handleChange} placeholder="Your age" className={inputCls} />
                      <ErrorMsg name="age" />
                    </div>
                    <div>
                      <label className={labelCls}>Gender</label>
                      <div className="flex gap-3">
                        {['Male', 'Female'].map((g) => (
                          <label
                            key={g}
                            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3.5 font-medium transition-all duration-300 ${
                              form.gender === g
                                ? 'border-[#003B5C] bg-[#003B5C] text-white shadow-md'
                                : 'border-slate-200 text-slate-700 hover:border-[#1CA7C7]'
                            }`}
                          >
                            <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange} className="sr-only" />
                            {g}
                          </label>
                        ))}
                      </div>
                      <ErrorMsg name="gender" />
                    </div>
                  </div>

                  {/* Job applied for */}
                  <div>
                    <label htmlFor="job" className={labelCls}>Job Applied For</label>
                    <select id="job" name="job" value={form.job} onChange={handleChange} className={inputCls}>
                      <option value="">Select a position</option>
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                    <ErrorMsg name="job" />
                  </div>

                  {/* Experience */}
                  <div>
                    <label htmlFor="experience" className={labelCls}>Experience</label>
                    <input id="experience" name="experience" type="text" value={form.experience} onChange={handleChange} placeholder="e.g. 2 years, or Fresh graduate" className={inputCls} />
                    <ErrorMsg name="experience" />
                  </div>

                  {/* Upload CV */}
                  <div>
                    <label className={labelCls}>Upload CV</label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={(e) => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files[0]); }}
                      className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-all duration-300 ${
                        dragging ? 'scale-[1.02] border-[#1CA7C7] bg-[#1CA7C7]/10' : 'border-slate-300 hover:border-[#1CA7C7] hover:bg-slate-50'
                      }`}
                    >
                      <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => pickFile(e.target.files[0])} />
                      <span className="text-4xl">{cv ? '📄' : '☁️'}</span>
                      {cv ? (
                        <>
                          <p className="mt-2 font-semibold" style={{ color: BRAND.navy }}>{cv.name}</p>
                          <p className="text-xs text-slate-500">{(cv.size / 1024).toFixed(0)} KB · Click to change</p>
                        </>
                      ) : (
                        <>
                          <p className="mt-2 font-semibold text-slate-700">Click to upload or drag &amp; drop</p>
                          <p className="text-xs text-slate-500">PDF, DOC or DOCX (max 5 MB)</p>
                        </>
                      )}
                    </div>
                    <ErrorMsg name="cv" />
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                      {serverError || 'Something went wrong. Please try again.'}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={status === 'sending' ? {} : { y: -3 }}
                    whileTap={{ scale: 0.99 }}
                    className="cp-shine relative flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#F5456B] to-[#F5A623] py-4 text-lg font-bold text-white shadow-lg shadow-[#F5456B]/30 transition-shadow hover:shadow-xl hover:shadow-[#F5456B]/40 disabled:opacity-70"
                  >
                    {status === 'sending' && (
                      <span className="cp-spin inline-block h-5 w-5 rounded-full border-2 border-white/40 border-t-white" />
                    )}
                    {status === 'sending' ? 'Submitting…' : 'Submit Application'}
                  </motion.button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ HIRING JOURNEY ============================ */}
      <section className="relative mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <Reveal className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest" style={{ color: BRAND.cyan }}>
            What happens next
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl" style={{ color: BRAND.navy }}>
            Your journey with <span className="italic" style={{ color: BRAND.pink }}>us</span>
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute left-[12%] right-[12%] top-10 hidden h-1 origin-left rounded-full lg:block"
            style={{ background: `linear-gradient(90deg, ${BRAND.pink}, ${BRAND.cyan}, ${BRAND.orange}, ${BRAND.navy})` }}
          />
          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.12}>
                <motion.div whileHover={{ y: -10 }} className="group text-center">
                  <div
                    className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl text-4xl text-white shadow-xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)` }}
                  >
                    {s.icon}
                    <span
                      className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-extrabold shadow-md"
                      style={{ color: s.color }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-bold" style={{ color: BRAND.navy }}>{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{s.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== LIFE AT ABC ============================== */}
      <section className="relative overflow-hidden py-16 sm:py-20" style={{ background: `linear-gradient(180deg, #F1F6FA 0%, ${BRAND.navy}0f 100%)` }}>
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: BRAND.orange }}>
              Why work with us
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl" style={{ color: BRAND.navy }}>
              Life at <span className="italic" style={{ color: BRAND.pink }}>ABC</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -10, rotate: i % 2 ? 1 : -1 }}
                  className="group relative h-full overflow-hidden rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-100 transition-shadow duration-300 hover:shadow-[0_26px_50px_-18px_rgba(0,59,92,0.3)]"
                >
                  <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: p.color }} />
                  <div
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150"
                    style={{ background: p.color }}
                  />
                  <div
                    className="relative flex h-14 w-14 items-center justify-center rounded-2xl text-3xl text-white shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}aa)` }}
                  >
                    {p.icon}
                  </div>
                  <h3 className="relative mt-5 font-serif text-xl font-bold" style={{ color: BRAND.navy }}>{p.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-500">{p.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== FINAL CTA ============================== */}
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-10">
        <Reveal>
          <div
            className="cp-shift relative overflow-hidden rounded-[2rem] px-8 py-14 text-white sm:px-14"
            style={{ backgroundImage: `linear-gradient(120deg, ${BRAND.navyDark}, ${BRAND.navy}, #04507a, ${BRAND.navyDark})` }}
          >
            <div className="cp-dots absolute inset-0" />
            <div className="cp-float absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl" style={{ background: `${BRAND.pink}55` }} />
            <div className="cp-float-b absolute -bottom-20 left-10 h-64 w-64 rounded-full blur-3xl" style={{ background: `${BRAND.cyan}55` }} />

            <div className="relative grid items-center gap-10 md:grid-cols-2">
              <div>
                <div className="mb-4 flex gap-2">
                  {[BRAND.orange, BRAND.pink, BRAND.cyan].map((c) => (
                    <span key={c} className="h-2 w-10 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <h2 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">
                  Questions about <span className="italic" style={{ color: BRAND.orange }}>working with us?</span>
                </h2>
                <p className="mt-4 max-w-md text-white/80">
                  Reach out and our team will be happy to help. Every child deserves a caring team, and we would love to
                  meet you.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 md:justify-end">
                <motion.a
                  href="/contact"
                  whileHover={{ y: -4, scale: 1.04 }}
                  className="cp-shine rounded-full bg-gradient-to-r from-[#F5456B] to-[#F5A623] px-8 py-4 font-bold text-white shadow-xl shadow-[#F5456B]/40"
                >
                  Contact Us
                </motion.a>
                {WHATSAPP_NUMBER && (
                  <motion.a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -4, scale: 1.04 }}
                    className="rounded-full bg-emerald-500 px-8 py-4 font-bold text-white shadow-xl"
                  >
                    WhatsApp us
                  </motion.a>
                )}
                {CONTACT_EMAIL && (
                  <motion.a
                    href={`mailto:${CONTACT_EMAIL}`}
                    whileHover={{ y: -4 }}
                    className="rounded-full border-2 border-white/40 px-8 py-3.5 font-semibold transition hover:bg-white hover:text-[#003B5C]"
                  >
                    {CONTACT_EMAIL}
                  </motion.a>
                )}
                <motion.button
                  type="button"
                  onClick={goTo(formRef)}
                  whileHover={{ y: -4 }}
                  className="rounded-full border-2 border-white/40 px-8 py-3.5 font-semibold transition hover:bg-white hover:text-[#003B5C]"
                >
                  Back to application ↑
                </motion.button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
