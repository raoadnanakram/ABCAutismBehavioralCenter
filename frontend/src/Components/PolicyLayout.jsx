import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp, ArrowRight, CheckCircle2 } from 'lucide-react';

/* ==========================================================================
   Shared layout for Privacy Policy and Terms of Service
   Colours (from the logo): navy #003B5C | pink #F5456B | orange #F5A623 | cyan #1CA7C7
   ========================================================================== */

// Optional: shown in the bottom banner if you fill it in
const CONTACT_EMAIL = '';

const BRAND = {
  navy: '#003B5C',
  navyDark: '#02263b',
  pink: '#F5456B',
  orange: '#F5A623',
  cyan: '#1CA7C7',
};

const COLORS = [BRAND.pink, BRAND.cyan, BRAND.orange, BRAND.navy];

const LINKS = [
  { to: '/faq', label: "FAQ's", icon: '❓', text: 'Quick answers to common questions.', color: BRAND.cyan },
  { to: '/privacy-policy', label: 'Privacy Policy', icon: '🔒', text: 'How we handle your information.', color: BRAND.pink },
  { to: '/terms', label: 'Terms of Service', icon: '📄', text: 'The rules for using our website.', color: BRAND.orange },
];

export const STYLES = `
@keyframes plFloat { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(22px,-26px,0) scale(1.08); } }
@keyframes plFloatB { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-24px,20px,0) scale(1.12); } }
@keyframes plShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@keyframes plShine { 0% { transform: translateX(-130%) skewX(-18deg); } 60%,100% { transform: translateX(260%) skewX(-18deg); } }
.pl-float { animation: plFloat 9s ease-in-out infinite; }
.pl-float-b { animation: plFloatB 11s ease-in-out infinite; }
.pl-shift { background-size: 220% 220%; animation: plShift 14s ease infinite; }
.pl-shine { position: relative; overflow: hidden; }
.pl-shine::after { content: ''; position: absolute; top: 0; bottom: 0; width: 34%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.5), transparent); animation: plShine 5s ease-in-out infinite; pointer-events: none; }
.pl-dots { background-image: radial-gradient(rgba(255,255,255,.16) 1px, transparent 1px); background-size: 22px 22px; }
.pl-scroll::-webkit-scrollbar { height: 5px; }
.pl-scroll::-webkit-scrollbar-thumb { background: #c5d4df; border-radius: 999px; }
@media (prefers-reduced-motion: reduce) {
  .pl-float, .pl-float-b, .pl-shift, .pl-shine::after { animation: none !important; }
}
`;

export function usePageMeta(title, description) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    let tag = document.head.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', description);
    return () => {
      document.title = prev;
    };
  }, [title, description]);
}

/* ----------------------------- hero ------------------------------------ */

export function PageHero({ crumb, eyebrow, title, accent, intro, chips = [] }) {
  return (
    <section
      className="pl-shift relative overflow-hidden pb-24 pt-28 text-white sm:pt-32 lg:pb-28"
      style={{ backgroundImage: `linear-gradient(125deg, ${BRAND.navyDark} 0%, ${BRAND.navy} 45%, #04507a 75%, ${BRAND.navyDark} 100%)` }}
    >
      <div className="pl-dots pointer-events-none absolute inset-0" />
      <div className="pl-float pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full blur-3xl" style={{ background: `${BRAND.pink}55` }} />
      <div className="pl-float-b pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full blur-3xl" style={{ background: `${BRAND.cyan}55` }} />
      <div className="pl-float pointer-events-none absolute -bottom-14 -left-14 h-56 w-56 rounded-full blur-3xl" style={{ background: `${BRAND.orange}40` }} />

      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-center gap-2 text-xs text-white/60"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="transition hover:text-white">Home</Link>
          <span>›</span>
          <span className="text-white/90">{crumb}</span>
        </motion.nav>

        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest backdrop-blur"
        >
          <span className="h-2 w-2 rounded-full" style={{ background: BRAND.orange }} />
          {eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-5 font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
        >
          {title}{' '}
          <span className="relative inline-block italic" style={{ color: BRAND.pink }}>
            {accent}
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 120 12" fill="none" preserveAspectRatio="none">
              <motion.path
                d="M2 8 Q 18 1, 34 7 T 66 7 T 98 7 T 118 6"
                stroke={BRAND.orange}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              />
            </svg>
          </span>
        </motion.h1>

        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {intro}
          </motion.p>
        )}

        {chips.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {chips.map((c) => (
              <span key={c} className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur">
                {c}
              </span>
            ))}
          </motion.div>
        )}
      </div>

      <svg className="absolute bottom-[-1px] left-0 w-full" viewBox="0 0 1440 90" preserveAspectRatio="none" fill="#F1F6FA">
        <path d="M0 40 C 240 100, 480 0, 720 40 C 960 80, 1200 10, 1440 50 L1440 90 L0 90 Z" />
      </svg>
    </section>
  );
}

/* --------------------------- closing blocks ---------------------------- */

export function RelatedAndCta({ current, ctaTitle, ctaText, hideCta = false }) {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-10">
        <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.25em]" style={{ color: BRAND.pink }}>
          You may also need
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {LINKS.filter((l) => l.to !== current).map((l, i) => (
            <motion.div
              key={l.to}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <Link
                to={l.to}
                className="group relative flex items-center gap-5 overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-shadow duration-300 hover:shadow-[0_24px_48px_-18px_rgba(0,59,92,0.3)]"
              >
                <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: l.color }} />
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl text-white shadow-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${l.color}, ${l.color}aa)` }}
                >
                  {l.icon}
                </span>
                <span className="flex-1">
                  <span className="block font-serif text-lg font-bold" style={{ color: BRAND.navy }}>{l.label}</span>
                  <span className="text-sm text-slate-500">{l.text}</span>
                </span>
                <ArrowRight className="h-5 w-5 text-slate-300 transition duration-300 group-hover:translate-x-2 group-hover:text-[#F5456B]" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {hideCta ? <div className="pb-16" /> : (
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pl-shift relative overflow-hidden rounded-[2rem] px-8 py-12 text-white sm:px-14"
          style={{ backgroundImage: `linear-gradient(120deg, ${BRAND.navyDark}, ${BRAND.navy}, #04507a, ${BRAND.navyDark})` }}
        >
          <div className="pl-dots absolute inset-0" />
          <div className="pl-float absolute -right-14 -top-14 h-56 w-56 rounded-full blur-3xl" style={{ background: `${BRAND.pink}55` }} />
          <div className="pl-float-b absolute -bottom-16 left-10 h-56 w-56 rounded-full blur-3xl" style={{ background: `${BRAND.cyan}55` }} />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-3 flex gap-2">
                {[BRAND.orange, BRAND.pink, BRAND.cyan].map((c) => (
                  <span key={c} className="h-2 w-10 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <h2 className="font-serif text-3xl font-bold">{ctaTitle}</h2>
              <p className="mt-3 max-w-lg text-white/80">{ctaText}</p>
              {CONTACT_EMAIL && <p className="mt-2 text-sm text-white/70">Email: {CONTACT_EMAIL}</p>}
            </div>
            <motion.div whileHover={{ y: -4, scale: 1.04 }}>
              <Link
                to="/contact"
                className="pl-shine inline-block rounded-full bg-gradient-to-r from-[#F5456B] to-[#F5A623] px-9 py-4 font-bold text-white shadow-xl shadow-[#F5456B]/40"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
      )}
    </>
  );
}

/* ----------------------------- main layout ----------------------------- */

const blockText = (b) => (typeof b === 'string' ? b : b.list ? b.list.join(' ') : b.note || '');

export default function PolicyLayout({ current, crumb, eyebrow, title, accent, intro, updated, sections, metaTitle, metaDescription, ctaTitle, ctaText }) {
  const [active, setActive] = useState(sections[0].id);
  const [showTop, setShowTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  usePageMeta(metaTitle, metaDescription);

  const minutes = useMemo(() => {
    const words = sections.reduce((n, s) => n + (s.title + ' ' + s.body.map(blockText).join(' ')).split(/\s+/).length, 0);
    return Math.max(1, Math.round(words / 200));
  }, [sections]);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="overflow-x-hidden bg-[#F1F6FA]">
      <style>{STYLES}</style>

      <motion.div
        className="fixed left-0 right-0 top-0 z-[70] h-1 origin-left"
        style={{ scaleX, background: `linear-gradient(90deg, ${BRAND.orange}, ${BRAND.pink}, ${BRAND.cyan})` }}
      />

      <PageHero
        crumb={crumb}
        eyebrow={eyebrow}
        title={title}
        accent={accent}
        intro={intro}
        chips={[`Last updated: ${updated}`, `${minutes} min read`, `${sections.length} sections`]}
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[280px_1fr]">
        {/* table of contents */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="hidden rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 lg:block">
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">On this page</p>
            <nav className="space-y-1">
              {sections.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => go(s.id)}
                  className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 hover:translate-x-1 ${
                    active === s.id ? 'text-white' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {active === s.id && (
                    <motion.span
                      layoutId="tocActive"
                      className="absolute inset-0 rounded-xl shadow-lg"
                      style={{ background: `linear-gradient(90deg, ${BRAND.navy}, ${BRAND.cyan})` }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative text-base">{s.icon}</span>
                  <span className="relative flex-1 leading-snug">{s.title}</span>
                  <span className={`relative text-[10px] font-bold ${active === s.id ? 'text-white/70' : 'text-slate-300'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="pl-scroll -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:hidden">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
                  active === s.id ? 'bg-[#003B5C] text-white shadow-md' : 'bg-white text-slate-600 ring-1 ring-slate-200'
                }`}
              >
                {s.icon} {s.title}
              </button>
            ))}
          </div>
        </aside>

        {/* sections */}
        <div className="space-y-6">
          {sections.map((s, i) => {
            const color = COLORS[i % COLORS.length];
            return (
              <motion.section
                key={s.id}
                id={s.id}
                style={{ scrollMarginTop: 110 }}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-shadow duration-300 hover:shadow-[0_24px_48px_-20px_rgba(0,59,92,0.28)] sm:p-9"
              >
                <div
                  className="absolute inset-y-0 left-0 w-1.5 origin-top scale-y-50 transition-transform duration-500 group-hover:scale-y-100"
                  style={{ background: color }}
                />
                <div
                  className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-[0.07] transition-transform duration-500 group-hover:scale-150"
                  style={{ background: color }}
                />

                <div className="relative flex items-center gap-4">
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl text-white shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}aa)` }}
                  >
                    {s.icon}
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color }}>
                      Section {String(i + 1).padStart(2, '0')}
                    </p>
                    <h2 className="font-serif text-xl font-bold sm:text-2xl" style={{ color: BRAND.navy }}>{s.title}</h2>
                  </div>
                </div>

                <div className="relative mt-5 space-y-4 text-[15px] leading-relaxed text-slate-600">
                  {s.body.map((b, j) => {
                    if (typeof b === 'string') return <p key={j}>{b}</p>;
                    if (b.list)
                      return (
                        <ul key={j} className="space-y-2.5">
                          {b.list.map((item) => (
                            <li key={item} className="flex gap-3 transition-transform duration-200 hover:translate-x-1">
                              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color }} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    return (
                      <div key={j} className="flex gap-3 rounded-2xl border-l-4 bg-slate-50 p-4 text-sm" style={{ borderColor: BRAND.orange }}>
                        <span className="text-lg">💡</span>
                        <span>{b.note}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>

      <RelatedAndCta current={current} ctaTitle={ctaTitle} ctaText={ctaText} />

      <motion.button
        initial={false}
        animate={{ opacity: showTop ? 1 : 0, scale: showTop ? 1 : 0.6, y: showTop ? 0 : 20 }}
        style={{ pointerEvents: showTop ? 'auto' : 'none' }}
        whileHover={{ y: -4 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#F5456B] to-[#F5A623] text-white shadow-xl shadow-[#F5456B]/40"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </main>
  );
}
