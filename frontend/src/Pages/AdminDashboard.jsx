import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api, getToken, clearToken } from '../api';

/* ==========================================================================
   ABC Autism Behavioral Center - Admin Dashboard
   Brand colours come from the logo:
   navy #003B5C | pink #F5456B | orange #F5A623 | cyan #1CA7C7
   ========================================================================== */

// Logo: put your logo file in  frontend/public/  and set its name here.
// If the file is missing, a built-in ABC lettermark is shown instead.
const LOGO_SRC = '/logo.png';
const TAGLINE = 'Support. Learn. Grow.';

const IDLE = 5 * 60 * 1000;

const BRAND = {
  navy: '#003B5C',
  navyDark: '#02263b',
  pink: '#F5456B',
  orange: '#F5A623',
  cyan: '#1CA7C7',
};

const TABS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'appointment', label: 'Appointments', icon: '📅' },
  { id: 'contact', label: 'Contact Messages', icon: '✉️' },
  { id: 'career', label: 'Career Applications', icon: '💼' },
  { id: 'security', label: 'Security & System', icon: '🔒' },
];

const META = {
  appointment: {
    label: 'Appointments',
    single: 'Appointment',
    color: '#F5456B',
    icon: '📅',
    blurb: 'Families who want to book a session',
  },
  contact: {
    label: 'Contact Messages',
    single: 'Contact Message',
    color: '#1CA7C7',
    icon: '✉️',
    blurb: 'Questions and messages from parents',
  },
  career: {
    label: 'Career Applications',
    single: 'Career Application',
    color: '#F5A623',
    icon: '💼',
    blurb: 'People who want to join the team',
  },
};

const SUBTITLE = {
  overview: 'Your center at a glance',
  appointment: META.appointment.blurb,
  contact: META.contact.blurb,
  career: META.career.blurb,
  security: 'System health and account safety',
};

const STATUS_STYLE = {
  new: 'bg-pink-100 text-pink-700',
  read: 'bg-cyan-100 text-cyan-700',
  replied: 'bg-emerald-100 text-emerald-700',
  closed: 'bg-slate-200 text-slate-600',
};
const STATUS_COLOR = {
  new: '#F5456B',
  read: '#1CA7C7',
  replied: '#10b981',
  closed: '#94a3b8',
};
const STATUSES = ['new', 'read', 'replied', 'closed'];

const PROTECTIONS = [
  { icon: '⏱️', title: 'Auto logout', text: 'Signs you out after 5 minutes without activity.' },
  { icon: '🛡️', title: 'Account lockout', text: '5 wrong passwords lock the account for 15 minutes.' },
  { icon: '🔑', title: 'Session only', text: 'Your login ends as soon as the browser is closed.' },
  { icon: '📜', title: 'Login history', text: 'Every sign-in is recorded with its IP address.' },
  { icon: '🤖', title: 'Spam protection', text: 'Hidden trap field and a 10 per hour limit on forms.' },
  { icon: '📄', title: 'Safe exports', text: 'CSV files are cleaned against formula injection.' },
];

/* ------------------------------ styles ----------------------------------- */

const STYLES = `
@keyframes abcFloat { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(18px,-26px,0) scale(1.08); } }
@keyframes abcFloatB { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-24px,18px,0) scale(1.12); } }
@keyframes abcShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@keyframes abcShine { 0% { transform: translateX(-130%) skewX(-18deg); } 60%,100% { transform: translateX(260%) skewX(-18deg); } }
@keyframes abcPing { 0% { transform: scale(1); opacity: .65; } 80%,100% { transform: scale(2.4); opacity: 0; } }
@keyframes abcWave { 0%,100% { transform: rotate(0deg); } 20% { transform: rotate(16deg); } 40% { transform: rotate(-8deg); } 60% { transform: rotate(12deg); } 80% { transform: rotate(-4deg); } }
@keyframes abcSkeleton { 0% { background-position: -200px 0; } 100% { background-position: calc(200px + 100%) 0; } }
.abc-float { animation: abcFloat 9s ease-in-out infinite; }
.abc-float-b { animation: abcFloatB 11s ease-in-out infinite; }
.abc-shift { background-size: 220% 220%; animation: abcShift 14s ease infinite; }
.abc-shine { position: relative; overflow: hidden; }
.abc-shine::after { content: ''; position: absolute; top: 0; bottom: 0; width: 38%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.75), transparent); animation: abcShine 5.5s ease-in-out infinite; pointer-events: none; }
.abc-ping { animation: abcPing 1.8s cubic-bezier(0,0,.2,1) infinite; }
.abc-wave { display: inline-block; transform-origin: 70% 70%; animation: abcWave 2.4s ease-in-out 1s 2; }
.abc-skeleton { background: linear-gradient(90deg, #eef3f7 0%, #f8fbfd 50%, #eef3f7 100%); background-size: 200px 100%; background-repeat: no-repeat; animation: abcSkeleton 1.3s linear infinite; }
.abc-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
.abc-scroll::-webkit-scrollbar-thumb { background: #c5d4df; border-radius: 999px; }
.abc-dots { background-image: radial-gradient(rgba(255,255,255,.14) 1px, transparent 1px); background-size: 18px 18px; }
@media (prefers-reduced-motion: reduce) {
  .abc-float, .abc-float-b, .abc-shift, .abc-shine::after, .abc-ping, .abc-wave, .abc-skeleton { animation: none !important; }
}
`;

/* ------------------------------ helpers ---------------------------------- */

const fmt = (d) =>
  new Date(d).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const wa = (p) => 'https://wa.me/' + String(p).replace(/\D/g, '').replace(/^0/, '92');

const parse = (s) => {
  try {
    return JSON.parse(s || '{}');
  } catch {
    return {};
  }
};

const detail = (r) => {
  const x = parse(r.extra);
  return r.type === 'appointment' ? x.service : r.type === 'career' ? x.position : r.subject;
};

const initials = (name) =>
  String(name || '?')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

const greet = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
};

const ago = (d) => {
  const s = Math.max(0, Math.round((Date.now() - new Date(d).getTime()) / 1000));
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} hr ago`;
  return `${Math.floor(s / 86400)} d ago`;
};

const dayName = (iso) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { weekday: 'short', timeZone: 'UTC' });

const strength = (p) => {
  let s = 0;
  if (p.length >= 10) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
};

/* ------------------------------- hooks ----------------------------------- */

function useIdle(onTimeout) {
  const last = useRef(Date.now());
  const [warn, setWarn] = useState(null);
  useEffect(() => {
    const bump = () => {
      last.current = Date.now();
    };
    const evs = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    evs.forEach((e) => window.addEventListener(e, bump, { passive: true }));
    const tick = setInterval(() => {
      const idle = Date.now() - last.current;
      if (idle >= IDLE) onTimeout();
      else if (idle >= IDLE - 30000) setWarn(Math.ceil((IDLE - idle) / 1000));
      else setWarn(null);
    }, 1000);
    const beat = setInterval(() => {
      if (Date.now() - last.current < 120000) api('/auth/me').catch(() => {});
    }, 120000);
    return () => {
      evs.forEach((e) => window.removeEventListener(e, bump));
      clearInterval(tick);
      clearInterval(beat);
    };
  }, [onTimeout]);
  return warn;
}

/* ------------------------- small building blocks ------------------------- */

function Logo({ size = 'md' }) {
  const [broken, setBroken] = useState(false);
  const h = size === 'lg' ? 'h-16' : 'h-12';
  if (!broken) {
    return (
      <img
        src={LOGO_SRC}
        alt="ABC Autism Behavioral Center"
        onError={() => setBroken(true)}
        className={`${h} w-auto max-w-full object-contain`}
      />
    );
  }
  return (
    <div className="flex flex-col items-center leading-none">
      <div className="flex items-end gap-0.5 font-serif text-4xl font-black tracking-tight">
        <span style={{ color: BRAND.orange }}>A</span>
        <span style={{ color: BRAND.pink }}>B</span>
        <span style={{ color: BRAND.cyan }}>C</span>
      </div>
      <span className="mt-1 text-[10px] font-bold text-[#003B5C]">Autism Behavioral Center</span>
    </div>
  );
}

function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="hidden items-center gap-2 rounded-full bg-[#003B5C]/5 px-4 py-2 text-xs font-semibold text-[#003B5C] md:flex">
      <span className="relative flex h-2 w-2">
        <span className="abc-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      {now.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })}
      <span className="text-slate-300">|</span>
      {now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
}

function CountUp({ value, suffix = '' }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / 800);
      setN(Math.round(value * p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <>
      {n}
      {suffix}
    </>
  );
}

function Sparkline({ values, color }) {
  const max = Math.max(1, ...values);
  const pts = values.map((v, i) => [(i / Math.max(1, values.length - 1)) * 100, 28 - (v / max) * 24]);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L100 30 L0 30 Z`;
  const id = 'sp' + color.replace('#', '');
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-10 w-full">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill={`url(#${id})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />
    </svg>
  );
}

function StatCard({ label, value, suffix, icon, color, delay, note, spark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-[0_22px_44px_-14px_rgba(0,59,92,0.28)]"
    >
      <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: `linear-gradient(90deg, ${color}, ${color}55)` }} />
      <div
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150"
        style={{ background: color }}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 font-serif text-4xl font-bold text-[#003B5C]">
            <CountUp value={value} suffix={suffix} />
          </p>
        </div>
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}
        >
          <span className="drop-shadow">{icon}</span>
        </div>
      </div>
      <div className="relative mt-3">
        {spark ? <Sparkline values={spark} color={color} /> : null}
        {note ? <p className="mt-1 text-xs text-slate-400">{note}</p> : null}
      </div>
    </motion.div>
  );
}

function Panel({ title, subtitle, right, children, className = '', delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-[0_18px_40px_-16px_rgba(0,59,92,0.22)] ${className}`}
    >
      {(title || right) && (
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#003B5C]">{title}</h3>
            {subtitle && <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>}
          </div>
          {right}
        </div>
      )}
      {children}
    </motion.section>
  );
}

function Avatar({ name, color, size = 'h-11 w-11' }) {
  return (
    <span
      className={`flex ${size} shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-md`}
      style={{ background: `linear-gradient(135deg, ${color}, ${color}aa)` }}
    >
      {initials(name)}
    </span>
  );
}

function StatusPill({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLE[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_COLOR[status] }} />
      {status}
    </span>
  );
}

function SkeletonBlock({ className = '' }) {
  return <div className={`abc-skeleton rounded-2xl ${className}`} />;
}

/* ------------------------------- charts ---------------------------------- */

function BarChart({ series }) {
  const max = Math.max(1, ...series.map((s) => s.c));
  const todayKey = series[series.length - 1]?.d;
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="absolute inset-x-0 border-t border-dashed border-slate-100" style={{ top: `${i * 33.3}%` }} />
        ))}
      </div>
      <div className="relative flex items-end gap-3">
        {series.map((s, i) => {
          const isToday = s.d === todayKey;
          return (
            <div key={s.d} className="group flex flex-1 flex-col items-center">
              <div className="relative h-48 w-full">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(s.c / max) * 100}%` }}
                  transition={{ delay: i * 0.07, duration: 0.7, ease: 'easeOut' }}
                  className={`absolute bottom-0 w-full min-h-[6px] rounded-t-xl transition-all duration-300 group-hover:brightness-110 ${
                    isToday
                      ? 'bg-gradient-to-t from-[#F5456B] to-[#F5A623]'
                      : 'bg-gradient-to-t from-[#003B5C] to-[#1CA7C7] group-hover:from-[#F5456B] group-hover:to-[#F5A623]'
                  }`}
                >
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#003B5C] px-2 py-1 text-xs font-bold text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                    {s.c}
                  </span>
                </motion.div>
              </div>
              <span className={`mt-3 text-xs font-semibold ${isToday ? 'text-[#F5456B]' : 'text-slate-500'}`}>{dayName(s.d)}</span>
              <span className="text-[10px] text-slate-400">{s.d.slice(5)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Donut({ types, total }) {
  const [active, setActive] = useState(null);
  const R = 54;
  const C = 2 * Math.PI * R;
  let offset = 0;
  const segs = Object.entries(META).map(([k, m]) => {
    const len = total ? (types[k] / total) * C : 0;
    const seg = { k, m, len, offset };
    offset += len;
    return seg;
  });
  const shown = active ? types[active] : total;
  const shownLabel = active ? META[active].label : 'Total';
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-44 w-44">
        <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
          <circle cx="70" cy="70" r={R} fill="none" stroke="#eef3f7" strokeWidth="16" />
          {segs.map(({ k, m, len, offset: off }) => (
            <motion.circle
              key={k}
              cx="70"
              cy="70"
              r={R}
              fill="none"
              stroke={m.color}
              strokeWidth={active === k ? 20 : 16}
              strokeLinecap="butt"
              strokeDashoffset={-off}
              initial={{ strokeDasharray: `0 ${C}` }}
              animate={{ strokeDasharray: `${Math.max(0, len - 2)} ${C - Math.max(0, len - 2)}` }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              style={{ cursor: 'pointer', transition: 'stroke-width .2s' }}
              onMouseEnter={() => setActive(k)}
              onMouseLeave={() => setActive(null)}
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-4xl font-bold text-[#003B5C]">{shown}</span>
          <span className="text-[11px] font-medium text-slate-400">{shownLabel}</span>
        </div>
      </div>
      <div className="w-full space-y-2">
        {Object.entries(META).map(([k, m]) => (
          <div
            key={k}
            onMouseEnter={() => setActive(k)}
            onMouseLeave={() => setActive(null)}
            className={`flex cursor-default items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
              active === k ? 'bg-slate-50 translate-x-1' : ''
            }`}
          >
            <span className="h-3 w-3 rounded-full" style={{ background: m.color }} />
            <span className="flex-1 text-slate-600">{m.label}</span>
            <b className="text-[#003B5C]">{types[k]}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBars({ status, total }) {
  return (
    <div className="space-y-4">
      {STATUSES.map((s, i) => (
        <div key={s}>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 capitalize text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS_COLOR[s] }} />
              {s}
            </span>
            <b className="text-[#003B5C]">{status[s]}</b>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${total ? (status[s] / total) * 100 : 0}%` }}
              transition={{ duration: 0.9, delay: i * 0.1 }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${STATUS_COLOR[s]}, ${STATUS_COLOR[s]}99)` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------- modal ----------------------------------- */

function Modal({ item, onClose, onStatus, onDelete }) {
  useEffect(() => {
    if (!item) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onClose]);

  if (!item) return null;
  const x = parse(item.extra);
  const meta = META[item.type];
  const rows = [
    ['Name', item.name],
    ['Phone', item.phone],
    ['Email', item.email],
    ['Subject', item.subject],
    ...Object.entries(x),
    ['Message', item.message],
    ['Received', fmt(item.created_at)],
    ['Owner mail', item.mail_sent & 1 ? 'Sent ✓' : 'Not sent'],
    ['User mail', item.mail_sent & 2 ? 'Sent ✓' : 'Not sent'],
  ].filter(([, v]) => v);

  const downloadCv = async () => {
    const res = await fetch(`/api/admin/submissions/${item.id}/cv`, {
      headers: { Authorization: 'Bearer ' + getToken() },
    });
    if (!res.ok) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(await res.blob());
    a.download = x['CV file'] || 'cv';
    a.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#02263b]/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="abc-scroll max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[28px] bg-white shadow-2xl"
      >
        <div className="abc-shift relative overflow-hidden p-6 text-white" style={{ backgroundImage: `linear-gradient(120deg, ${BRAND.navy}, ${meta.color}, ${BRAND.navy})` }}>
          <div className="abc-dots absolute inset-0" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-xl transition hover:rotate-90 hover:bg-white/30"
          >
            ×
          </button>
          <div className="relative flex items-center gap-4">
            <Avatar name={item.name} color="#ffffff33" size="h-14 w-14" />
            <div>
              <p className="text-xs font-medium text-white/70">
                {meta.icon} {meta.single}
              </p>
              <h3 className="font-serif text-2xl font-bold leading-tight">{item.name}</h3>
              <p className="mt-0.5 text-xs text-white/70">Received {ago(item.created_at)}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-1">
            {rows.map(([k, v]) => (
              <div key={k} className="flex gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-slate-50">
                <span className="w-28 shrink-0 capitalize text-slate-400">{k}</span>
                <span className="break-words font-medium text-slate-800">{String(v)}</span>
              </div>
            ))}
          </div>

          <p className="mb-2 mt-5 text-xs font-semibold text-slate-400">Update status</p>
          <div className="grid grid-cols-4 gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => onStatus(item.id, s)}
                className={`rounded-xl py-2 text-xs font-semibold capitalize transition hover:-translate-y-0.5 ${
                  item.status === s ? STATUS_STYLE[s] + ' ring-2 ring-offset-1 ring-current' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {Number(item.has_cv) > 0 && (
            <button
              onClick={downloadCv}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#F5456B] py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
            >
              📄 Download CV
            </button>
          )}

          <div className="mt-3 grid grid-cols-3 gap-2">
            <a
              href={`mailto:${item.email}`}
              onClick={() => onStatus(item.id, 'replied')}
              className="rounded-xl bg-[#003B5C] py-3 text-center text-sm font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-[#1CA7C7] hover:shadow-lg"
            >
              ✉️ Email
            </a>
            <a
              href={wa(item.phone)}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-500 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-lg"
            >
              💬 WhatsApp
            </a>
            <button
              onClick={() => onDelete(item.id)}
              className="rounded-xl bg-[#F5456B] py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-red-600 hover:shadow-lg"
            >
              🗑 Delete
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------ sidebar ---------------------------------- */

function Sidebar({ tab, goTab, nb, menu, logout, phone }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-72 transform flex-col overflow-hidden bg-gradient-to-b from-[#003B5C] via-[#022f49] to-[#02263b] p-5 text-white shadow-2xl transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
        menu ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="abc-float pointer-events-none absolute -left-16 top-1/3 h-48 w-48 rounded-full bg-[#1CA7C7]/20 blur-3xl" />
      <div className="abc-float-b pointer-events-none absolute -right-16 bottom-24 h-48 w-48 rounded-full bg-[#F5456B]/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="abc-shine relative rounded-3xl bg-white p-4 shadow-xl"
      >
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="mt-3 h-1 rounded-full bg-gradient-to-r from-[#F5A623] via-[#F5456B] to-[#1CA7C7]" />
        <p className="mt-2 text-center text-[11px] font-semibold tracking-wide text-[#003B5C]">{TAGLINE}</p>
      </motion.div>

      <p className="relative mb-2 mt-7 px-3 text-xs font-semibold text-white/40">Menu</p>
      <nav className="relative space-y-1.5">
        {TABS.map((t, i) => (
          <motion.button
            key={t.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
            onClick={() => goTab(t.id)}
            className={`group relative flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 hover:translate-x-1.5 ${
              tab === t.id ? 'text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {tab === t.id && (
              <motion.span
                layoutId="navActive"
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#F5456B]/90 to-[#F5A623]/80 shadow-lg shadow-[#F5456B]/30"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative text-xl transition-transform duration-200 group-hover:scale-125">{t.icon}</span>
            <span className="relative flex-1">{t.label}</span>
            {nb(t.id) > 0 && (
              <span className="relative flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-white px-2 text-xs font-bold text-[#F5456B] shadow">
                {nb(t.id)}
              </span>
            )}
          </motion.button>
        ))}
      </nav>

      <div className="relative mt-auto space-y-3 pt-6">
        <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#F5A623] via-[#F5456B] to-[#1CA7C7] text-lg">
            👤
          </span>
          <div className="min-w-0">
            <p className="text-xs text-white/50">Signed in as</p>
            <p className="truncate text-sm font-semibold">{phone || '...'}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full rounded-2xl bg-white/10 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 hover:bg-[#F5456B] hover:shadow-lg hover:shadow-[#F5456B]/30"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

/* ------------------------------- overview -------------------------------- */

function Hero({ stats, onGo }) {
  const topType = useMemo(() => {
    const entries = Object.entries(stats.newByType || {});
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0] && entries[0][1] > 0 ? entries[0][0] : null;
  }, [stats]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="abc-shift relative overflow-hidden rounded-[32px] p-7 text-white shadow-[0_24px_50px_-18px_rgba(0,59,92,0.6)] sm:p-9"
      style={{ backgroundImage: `linear-gradient(120deg, ${BRAND.navy} 0%, #04507a 45%, ${BRAND.navy} 100%)` }}
    >
      <div className="abc-dots absolute inset-0" />
      <div className="abc-float absolute -right-10 -top-16 h-64 w-64 rounded-full bg-[#F5456B]/40 blur-3xl" />
      <div className="abc-float-b absolute bottom-[-4rem] left-1/3 h-56 w-56 rounded-full bg-[#1CA7C7]/40 blur-3xl" />
      <div className="abc-float absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#F5A623]/30 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#F5A623]" /> Support
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#F5456B]" /> Learn
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#1CA7C7]" /> Grow
            </span>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl">
            {greet()} <span className="abc-wave">👋</span>
          </h2>
          <p className="mt-1 font-serif text-xl text-white/90 sm:text-2xl">
            Welcome back to your <span className="italic text-[#F5A623]">care center</span> dashboard.
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
            {stats.new > 0
              ? `${stats.new} ${stats.new === 1 ? 'family is' : 'families are'} waiting to hear from you. A quick reply makes a big difference.`
              : 'You are all caught up. New enquiries will appear here as soon as they arrive.'}
          </p>
        </div>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row lg:flex-col">
          <motion.div
            whileHover={{ scale: 1.04, rotate: -1 }}
            className="rounded-3xl border border-white/15 bg-white/10 px-8 py-5 text-center backdrop-blur"
          >
            <p className="text-xs font-semibold text-white/60">Waiting for reply</p>
            <p className="font-serif text-5xl font-bold">
              <CountUp value={stats.new} />
            </p>
          </motion.div>
          <motion.button
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={!topType}
            onClick={() => topType && onGo(topType)}
            className="rounded-2xl bg-gradient-to-r from-[#F5456B] to-[#F5A623] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#F5456B]/40 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {topType ? `Open ${META[topType].label}` : 'Nothing new'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function InboxCard({ type, stats, onGo, delay }) {
  const m = META[type];
  const total = stats.types[type];
  const fresh = stats.newByType[type] || 0;
  const pct = total ? Math.round((fresh / total) * 100) : 0;
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onGo(type)}
      className="group relative overflow-hidden rounded-3xl bg-white p-5 text-left shadow-sm ring-1 ring-slate-100 transition-shadow duration-300 hover:shadow-[0_22px_44px_-14px_rgba(0,59,92,0.28)]"
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(135deg, ${m.color}12, transparent 60%)` }}
      />
      <div className="relative flex items-center gap-4">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white shadow-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
          style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}aa)` }}
        >
          {m.icon}
        </span>
        <div className="flex-1">
          <p className="font-serif text-lg font-bold text-[#003B5C]">{m.label}</p>
          <p className="text-xs text-slate-400">{total} in total</p>
        </div>
        {fresh > 0 && (
          <span className="relative flex h-7 min-w-[1.75rem] items-center justify-center rounded-full px-2 text-xs font-bold text-white" style={{ background: m.color }}>
            <span className="abc-ping absolute inset-0 rounded-full" style={{ background: m.color }} />
            <span className="relative">{fresh}</span>
          </span>
        )}
      </div>
      <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, delay: delay + 0.2 }}
          className="h-full rounded-full"
          style={{ background: m.color }}
        />
      </div>
      <p className="relative mt-2 flex items-center justify-between text-xs text-slate-400">
        <span>{fresh} still unread</span>
        <span className="font-semibold transition-transform duration-200 group-hover:translate-x-1" style={{ color: m.color }}>
          Open inbox →
        </span>
      </p>
    </motion.button>
  );
}

function OverviewSkeleton() {
  return (
    <div className="space-y-6">
      <SkeletonBlock className="h-56" />
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <SkeletonBlock key={i} className="h-40" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <SkeletonBlock className="h-80 lg:col-span-2" />
        <SkeletonBlock className="h-80" />
      </div>
    </div>
  );
}

function OverviewTab({ stats, onGo, open }) {
  const spark = stats.series.map((s) => s.c);
  const handled = stats.status.replied + stats.status.closed;
  const rate = stats.total ? Math.round((handled / stats.total) * 100) : 0;

  return (
    <div className="space-y-6">
      <Hero stats={stats} onGo={onGo} />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Total Submissions" value={stats.total} icon="📥" color="#003B5C" delay={0.05} spark={spark} note="Last 7 days trend" />
        <StatCard label="New / Unread" value={stats.new} icon="🔔" color="#F5456B" delay={0.12} note="Needs your attention" />
        <StatCard label="Received Today" value={stats.today} icon="📆" color="#F5A623" delay={0.19} note="Since midnight" />
        <StatCard label="Handled Rate" value={rate} suffix="%" icon="✅" color="#10b981" delay={0.26} note={`${handled} replied or closed`} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Object.keys(META).map((k, i) => (
          <InboxCard key={k} type={k} stats={stats} onGo={onGo} delay={0.3 + i * 0.08} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel
          title="Submissions this week"
          subtitle="Daily number of new enquiries"
          className="lg:col-span-2"
          delay={0.35}
          right={
            <span className="rounded-full bg-[#1CA7C7]/10 px-3 py-1 text-xs font-semibold text-[#1CA7C7]">
              {spark.reduce((a, b) => a + b, 0)} this week
            </span>
          }
        >
          <BarChart series={stats.series} />
        </Panel>

        <Panel title="Where they come from" subtitle="Hover to explore" delay={0.4}>
          <Donut types={stats.types} total={stats.total} />
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Status breakdown" subtitle="How far each enquiry has come" delay={0.45}>
          <StatusBars status={stats.status} total={stats.total} />
        </Panel>

        <Panel title="Recent activity" subtitle="The latest 8 enquiries" className="lg:col-span-2" delay={0.5}>
          {stats.recent.length === 0 && (
            <div className="py-10 text-center">
              <div className="mb-2 text-5xl">📭</div>
              <p className="font-semibold text-[#003B5C]">No enquiries yet</p>
              <p className="text-sm text-slate-400">New appointments, messages and applications will show up here.</p>
            </div>
          )}
          <div className="space-y-1">
            {stats.recent.map((r, i) => (
              <motion.button
                key={r.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.05 }}
                onClick={() => open(r)}
                className="group flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-all duration-200 hover:bg-gradient-to-r hover:from-slate-50 hover:to-transparent hover:pl-5"
              >
                <Avatar name={r.name} color={META[r.type].color} />
                <span className="min-w-0 flex-1">
                  <b className="block truncate text-sm text-slate-800">{r.name}</b>
                  <span className="block truncate text-xs text-slate-500">
                    {META[r.type].icon} {META[r.type].single}
                    {detail(r) ? ` - ${detail(r)}` : ''}
                  </span>
                </span>
                <span className="hidden text-right sm:block">
                  <span className="block text-xs font-medium text-slate-500">{ago(r.created_at)}</span>
                </span>
                <StatusPill status={r.status} />
                <span className="text-slate-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#F5456B]">›</span>
              </motion.button>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ----------------------------- list tab ---------------------------------- */

function ListTab({ tab, list, loading, q, setQ, statusF, setStatusF, page, setPage, open, exportCsv }) {
  const m = META[tab];
  const chips = [['', 'All'], ...STATUSES.map((s) => [s, s])];

  return (
    <motion.div
      key={tab}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
    >
      <div className="relative overflow-hidden p-6 text-white" style={{ background: `linear-gradient(120deg, ${BRAND.navy}, ${m.color})` }}>
        <div className="abc-dots absolute inset-0" />
        <div className="abc-float absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl backdrop-blur">{m.icon}</span>
            <div>
              <h2 className="font-serif text-2xl font-bold">{m.label}</h2>
              <p className="text-sm text-white/70">{m.blurb}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white/15 px-5 py-3 text-center backdrop-blur">
            <p className="font-serif text-3xl font-bold">
              <CountUp value={list.total} />
            </p>
            <p className="text-[11px] text-white/70">Matching records</p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, email or phone"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm outline-none transition focus:border-[#1CA7C7] focus:bg-white focus:ring-4 focus:ring-[#1CA7C7]/20"
            />
            {q && (
              <button
                onClick={() => {
                  setQ('');
                  setPage(1);
                }}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-slate-200 text-xs text-slate-600 transition hover:bg-[#F5456B] hover:text-white"
              >
                ×
              </button>
            )}
          </div>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={exportCsv}
            className="rounded-2xl bg-gradient-to-r from-[#003B5C] to-[#1CA7C7] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#003B5C]/20 transition hover:shadow-xl"
          >
            ⬇ Export CSV
          </motion.button>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {chips.map(([val, label]) => (
            <button
              key={label}
              onClick={() => {
                setStatusF(val);
                setPage(1);
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition duration-200 hover:-translate-y-0.5 ${
                statusF === val ? 'bg-[#003B5C] text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="abc-scroll overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-500">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Phone</th>
                <th className="p-4 font-semibold">Detail</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.rows.map((r, i) => (
                <motion.tr
                  key={r.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => open(r)}
                  className="group cursor-pointer border-t border-slate-100 transition-colors duration-200 hover:bg-[#1CA7C7]/5"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={r.name} color={m.color} size="h-10 w-10" />
                      <div>
                        <p className="flex items-center gap-2 font-semibold text-slate-800">
                          {r.name}
                          {r.status === 'new' && <span className="h-2 w-2 rounded-full bg-[#F5456B]" />}
                        </p>
                        <p className="text-xs text-slate-400">{r.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap p-4 text-slate-600">{r.phone}</td>
                  <td className="p-4 text-slate-500">{detail(r) || '-'}</td>
                  <td className="whitespace-nowrap p-4 text-slate-500">
                    {fmt(r.created_at)}
                    <span className="block text-[11px] text-slate-400">{ago(r.created_at)}</span>
                  </td>
                  <td className="p-4">
                    <StatusPill status={r.status} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {loading && (
            <div className="space-y-2 p-4">
              {[0, 1, 2].map((i) => (
                <SkeletonBlock key={i} className="h-14" />
              ))}
            </div>
          )}
          {!loading && list.rows.length === 0 && (
            <div className="py-14 text-center">
              <div className="mb-2 text-5xl">🗂️</div>
              <p className="font-semibold text-[#003B5C]">No records found</p>
              <p className="text-sm text-slate-400">Try a different search or clear the status filter.</p>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
          <span>
            Total records: <b className="text-[#003B5C]">{list.total}</b>
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="rounded-xl bg-slate-100 px-4 py-2 font-semibold transition hover:-translate-x-0.5 hover:bg-[#F5456B] hover:text-white disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:bg-slate-100 disabled:hover:text-slate-600"
            >
              ‹ Prev
            </button>
            <span className="rounded-xl bg-[#003B5C] px-4 py-2 font-semibold text-white">
              {list.page} / {list.pages}
            </span>
            <button
              disabled={page >= list.pages}
              onClick={() => setPage(page + 1)}
              className="rounded-xl bg-slate-100 px-4 py-2 font-semibold transition hover:translate-x-0.5 hover:bg-[#F5456B] hover:text-white disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:bg-slate-100 disabled:hover:text-slate-600"
            >
              Next ›
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------- security tab ------------------------------- */

function HealthCard({ title, state, headline, lines, delay, icon }) {
  const palette = {
    ok: { text: 'text-emerald-600', dot: 'bg-emerald-500', ring: 'bg-emerald-400' },
    warn: { text: 'text-amber-600', dot: 'bg-amber-500', ring: 'bg-amber-400' },
    bad: { text: 'text-red-600', dot: 'bg-red-500', ring: 'bg-red-400' },
    idle: { text: 'text-slate-500', dot: 'bg-slate-400', ring: 'bg-slate-300' },
  }[state];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-[0_22px_44px_-14px_rgba(0,59,92,0.28)]"
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#1CA7C7]/10 transition-transform duration-500 group-hover:scale-150" />
      <div className="relative flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <span className="text-2xl transition-transform duration-300 group-hover:scale-125">{icon}</span>
      </div>
      <p className={`relative mt-2 flex items-center gap-2 font-serif text-xl font-bold ${palette.text}`}>
        <span className="relative flex h-3 w-3">
          <span className={`abc-ping absolute inline-flex h-full w-full rounded-full ${palette.ring}`} />
          <span className={`relative inline-flex h-3 w-3 rounded-full ${palette.dot}`} />
        </span>
        {headline}
      </p>
      <div className="relative mt-3 space-y-1 text-xs text-slate-500">
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
    </motion.div>
  );
}

function SecurityTab({ sys, logins, pw, setPw, changePw }) {
  const mailOk = sys && sys.mail.apiKey && sys.mail.sender && sys.mail.owner;
  const score = strength(pw.n1);
  const scoreLabel = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'][score];
  const scoreColor = ['#ef4444', '#ef4444', '#F5A623', '#1CA7C7', '#10b981'][score];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <HealthCard
          title="Database (MySQL)"
          icon="🗄️"
          delay={0.05}
          state={!sys ? 'idle' : sys.db.connected ? 'ok' : 'bad'}
          headline={!sys ? 'Checking...' : sys.db.connected ? 'Connected' : 'Disconnected'}
          lines={
            sys && sys.db.tables
              ? [`Admins: ${sys.db.tables.admins}`, `Submissions: ${sys.db.tables.submissions}`, `Login records: ${sys.db.tables.login_logs}`]
              : ['Reading table counts']
          }
        />
        <HealthCard
          title="Email service"
          icon="📧"
          delay={0.12}
          state={!sys ? 'idle' : mailOk ? 'ok' : 'warn'}
          headline={!sys ? 'Checking...' : mailOk ? 'Configured' : 'Setup incomplete'}
          lines={
            sys
              ? [
                  `Mail script link ${sys.mail.apiKey ? '✓' : '✗'}`,
                  `Secret key ${sys.mail.sender ? '✓' : '✗'}`,
                  `Owner email ${sys.mail.owner ? '✓' : '✗'}`,
                  ...(sys.mail.lastError ? ['Last error: ' + sys.mail.lastError] : []),
                ]
              : ['Checking settings']
          }
        />
        <HealthCard
          title="Server"
          icon="🖥️"
          delay={0.19}
          state={sys ? 'ok' : 'idle'}
          headline={sys ? `Node ${sys.server.node}` : 'Checking...'}
          lines={sys ? [`Running for ${sys.server.uptimeMin} min`] : ['Reading server details']}
        />
      </div>

      <Panel title="Protection in place" subtitle="What keeps this dashboard safe" delay={0.25}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {PROTECTIONS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group flex gap-4 rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-4 transition-shadow duration-300 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#003B5C] to-[#1CA7C7] text-xl shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                {p.icon}
              </span>
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-[#003B5C]">
                  {p.title}
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Active</span>
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.form
          onSubmit={changePw}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-[0_18px_40px_-16px_rgba(0,59,92,0.22)]"
        >
          <h3 className="font-serif text-lg font-bold text-[#003B5C]">Change password</h3>
          <p className="mb-5 mt-0.5 text-xs text-slate-400">Use at least 10 characters with letters and numbers.</p>
          {[
            ['cur', 'Current password'],
            ['n1', 'New password'],
            ['n2', 'Repeat new password'],
          ].map(([k, ph]) => (
            <input
              key={k}
              type="password"
              required
              placeholder={ph}
              value={pw[k]}
              onChange={(e) => setPw({ ...pw, [k]: e.target.value })}
              className="mb-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#1CA7C7] focus:bg-white focus:ring-4 focus:ring-[#1CA7C7]/20"
            />
          ))}

          {pw.n1 && (
            <div className="mb-4">
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={false}
                      animate={{ width: i < score ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                      className="h-full rounded-full"
                      style={{ background: scoreColor }}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-1.5 text-xs font-semibold" style={{ color: scoreColor }}>
                {scoreLabel}
              </p>
            </div>
          )}

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-2xl bg-gradient-to-r from-[#F5456B] to-[#F5A623] py-3 font-semibold text-white shadow-lg shadow-[#F5456B]/30 transition hover:shadow-xl"
          >
            Update password
          </motion.button>
        </motion.form>

        <Panel title="Login history" subtitle="Your last 15 sign-in attempts" delay={0.4}>
          <div className="abc-scroll max-h-96 space-y-2 overflow-y-auto pr-1">
            {logins.length === 0 && <p className="py-8 text-center text-sm text-slate-400">No sign-ins recorded yet.</p>}
            {logins.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.03 }}
                className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 text-xs transition hover:bg-slate-100 hover:translate-x-1"
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm text-white ${l.success ? 'bg-emerald-500' : 'bg-red-500'}`}
                >
                  {l.success ? '✓' : '✗'}
                </span>
                <span className="min-w-0 flex-1">
                  <b className="block truncate text-slate-800">{l.phone}</b>
                  <span className="text-slate-400">
                    {l.ip} - {fmt(l.created_at)}
                  </span>
                </span>
                <span className={`rounded-full px-2.5 py-1 font-semibold ${l.success ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {l.success ? 'Success' : 'Failed'}
                </span>
              </motion.div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* -------------------------- floating messages ---------------------------- */

function IdleWarning({ warn }) {
  return (
    <AnimatePresence>
      {warn !== null && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 z-[60] w-[92%] max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-gradient-to-r from-[#F5456B] to-[#F5A623] text-white shadow-2xl shadow-[#F5456B]/40"
        >
          <div className="flex items-center gap-4 px-6 py-4">
            <span className="text-3xl">⏳</span>
            <div>
              <p className="font-bold">Still there?</p>
              <p className="text-sm text-white/90">You will be signed out in {warn} seconds. Move your mouse to stay signed in.</p>
            </div>
          </div>
          <div className="h-1.5 bg-white/25">
            <div className="h-full bg-white transition-all duration-1000 ease-linear" style={{ width: `${Math.min(100, (warn / 30) * 100)}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          className="fixed right-5 top-24 z-[60] flex items-center gap-3 rounded-2xl border-l-4 border-[#F5A623] bg-[#003B5C] px-5 py-3.5 text-sm font-medium text-white shadow-2xl"
        >
          <span className="text-lg">💬</span>
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------ main page -------------------------------- */

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [menu, setMenu] = useState(false);
  const [phone, setPhone] = useState('');
  const [stats, setStats] = useState(null);
  const [list, setList] = useState({ rows: [], total: 0, page: 1, pages: 1 });
  const [q, setQ] = useState('');
  const [statusF, setStatusF] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sel, setSel] = useState(null);
  const [toast, setToast] = useState('');
  const [sys, setSys] = useState(null);
  const [logins, setLogins] = useState([]);
  const [pw, setPw] = useState({ cur: '', n1: '', n2: '' });

  const logout = useCallback(() => {
    clearToken();
    navigate('/login', { replace: true });
  }, [navigate]);
  const warn = useIdle(() => {
    clearToken();
    window.location.href = '/login?expired=1';
  });
  const say = (m) => {
    setToast(m);
    setTimeout(() => setToast(''), 3000);
  };

  useEffect(() => {
    document.title = 'Admin Dashboard';
    if (!getToken()) {
      navigate('/login', { replace: true });
      return;
    }
    api('/auth/me')
      .then((d) => setPhone(d.phone))
      .catch(() => {});
  }, [navigate]);

  const loadStats = useCallback(() => api('/admin/stats').then(setStats).catch(() => {}), []);
  useEffect(() => {
    loadStats();
    const t = setInterval(loadStats, 60000);
    return () => clearInterval(t);
  }, [loadStats]);

  const loadList = useCallback(async () => {
    if (!META[tab]) return;
    setLoading(true);
    try {
      setList(await api('/admin/submissions?' + new URLSearchParams({ type: tab, status: statusF, q, page })));
    } catch (e) {
      say(e.message);
    }
    setLoading(false);
  }, [tab, statusF, q, page]);
  useEffect(() => {
    const t = setTimeout(loadList, 250);
    return () => clearTimeout(t);
  }, [loadList]);

  useEffect(() => {
    if (tab !== 'security') return;
    api('/admin/system')
      .then(setSys)
      .catch(() => {});
    api('/admin/logins')
      .then(setLogins)
      .catch(() => {});
  }, [tab]);

  const goTab = (id) => {
    setTab(id);
    setPage(1);
    setQ('');
    setStatusF('');
    setMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setStatus = async (id, status) => {
    await api(`/admin/submissions/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
    setSel((s) => (s && s.id === id ? { ...s, status } : s));
    loadList();
    loadStats();
  };
  const open = (row) => {
    setSel(row);
    if (row.status === 'new') setStatus(row.id, 'read');
  };
  const remove = async (id) => {
    if (!window.confirm('Kya aap waqai delete karna chahte hain?')) return;
    await api(`/admin/submissions/${id}`, { method: 'DELETE' });
    setSel(null);
    say('Deleted');
    loadList();
    loadStats();
  };
  const exportCsv = async () => {
    const res = await fetch('/api/admin/export?type=' + tab, { headers: { Authorization: 'Bearer ' + getToken() } });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(await res.blob());
    a.download = `${tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };
  const changePw = async (e) => {
    e.preventDefault();
    if (pw.n1 !== pw.n2) return say('Naya password dono jagah same likhein');
    try {
      await api('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword: pw.cur, newPassword: pw.n1 }),
      });
      setPw({ cur: '', n1: '', n2: '' });
      say('Password badal gaya ✓');
    } catch (err) {
      say(err.message);
    }
  };

  const nb = (id) => (stats && stats.newByType && stats.newByType[id]) || 0;
  const totalNew = (stats && stats.new) || 0;
  const current = TABS.find((t) => t.id === tab);

  return (
    <div className="min-h-screen bg-[#F1F6FA] lg:flex">
      <style>{STYLES}</style>

      <Sidebar tab={tab} goTab={goTab} nb={nb} menu={menu} logout={logout} phone={phone} />
      {menu && <div className="fixed inset-0 z-30 bg-[#02263b]/50 backdrop-blur-sm lg:hidden" onClick={() => setMenu(false)} />}

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-slate-200/60 bg-white/80 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#003B5C] text-xl text-white shadow transition hover:scale-105 lg:hidden"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
            <div>
              <h1 className="flex items-center gap-2 font-serif text-xl font-bold text-[#003B5C]">
                <span>{current.icon}</span>
                {current.label}
              </h1>
              <p className="text-xs text-slate-400">{SUBTITLE[tab]}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LiveClock />
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goTab('overview')}
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-lg transition hover:bg-[#F5456B]/10"
              aria-label="Notifications"
            >
              🔔
              {totalNew > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#F5456B] px-1 text-[10px] font-bold text-white shadow">
                  {totalNew}
                </span>
              )}
            </motion.button>
            <div className="hidden items-center gap-3 rounded-2xl bg-slate-100 py-1.5 pl-1.5 pr-4 sm:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#F5A623] via-[#F5456B] to-[#1CA7C7] text-sm text-white">
                👤
              </span>
              <span className="text-sm font-semibold text-[#003B5C]">{phone || '...'}</span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          <AnimatePresence mode="wait">
            {tab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {stats ? <OverviewTab stats={stats} onGo={goTab} open={open} /> : <OverviewSkeleton />}
              </motion.div>
            )}
          </AnimatePresence>

          {META[tab] && (
            <ListTab
              tab={tab}
              list={list}
              loading={loading}
              q={q}
              setQ={setQ}
              statusF={statusF}
              setStatusF={setStatusF}
              page={page}
              setPage={setPage}
              open={open}
              exportCsv={exportCsv}
            />
          )}

          {tab === 'security' && <SecurityTab sys={sys} logins={logins} pw={pw} setPw={setPw} changePw={changePw} />}

          <footer className="mt-10 flex flex-col items-center gap-1 pb-4 text-center">
            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-[#F5A623] via-[#F5456B] to-[#1CA7C7]" />
            <p className="mt-3 font-serif text-sm font-semibold text-[#003B5C]">ABC Autism Behavioral Center</p>
            <p className="text-xs text-slate-400">{TAGLINE} Caring for every child, every day.</p>
          </footer>
        </main>
      </div>

      <AnimatePresence>{sel && <Modal item={sel} onClose={() => setSel(null)} onStatus={setStatus} onDelete={remove} />}</AnimatePresence>

      <IdleWarning warn={warn} />
      <Toast toast={toast} />
    </div>
  );
}
