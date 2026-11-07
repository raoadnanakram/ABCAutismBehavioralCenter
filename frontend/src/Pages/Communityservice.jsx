import React from 'react';
import { Link } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Droplets, Trophy } from 'lucide-react';
import { usePosts } from '../Components/PostParts';
import { BRAND, CATEGORIES, CommunityCard, TriBar } from '../Components/CommunityParts';

/* ==========================================================================
   Community Services page (redesigned)
   - Posts are managed in Admin Dashboard > ABC Filtration Plant / ABC Cricket Stadium
   - All page text is in CONTENT below.
   - Fonts: Bricolage Grotesque (headings) + Figtree (body), loaded in <Fonts />
========================================================================== */

const CONTENT = {
  hero: {
    title: 'Care that reaches beyond the therapy room',
    text: 'A strong community helps every child grow. At ABC Autism Behavioral Center, that means clean water for our neighbours and a field where everyone can play.',
  },
  sections: {
    filtration: {
      id: 'filtration-plant',
      icon: Droplets,
      short: 'Clean water',
      tagline: 'Clean, safe drinking water for our community',
      intro:
        'The ABC Filtration Plant gives children, families and neighbours access to filtered drinking water. Follow the posts below for news, photos and updates from the plant.',
      empty: 'No updates yet. Posts from the ABC Filtration Plant will appear here.',
    },
    cricket: {
      id: 'cricket-stadium',
      icon: Trophy,
      short: 'Sport for all',
      tagline: 'A place to play, belong and cheer together',
      intro:
        'The ABC Cricket Stadium brings children, young people and families together through cricket, teamwork and friendly competition. Match days and events are shared below.',
      empty: 'No updates yet. Posts from the ABC Cricket Stadium will appear here.',
    },
  },
  cta: {
    title: 'Want to know more about our community services?',
    text: 'Visit us, call us or send a message. We would love to hear from you.',
  },
};

const HEAD = { fontFamily: "'Bricolage Grotesque', 'Figtree', system-ui, sans-serif" };

function Fonts() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Figtree:wght@400;500;600;700&display=swap');
      .cs-page { font-family: 'Figtree', system-ui, sans-serif; }
      @keyframes cs-wave { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes cs-ring { 0% { transform: scale(.6); opacity: .55; } 100% { transform: scale(1.5); opacity: 0; } }
      .cs-wave { animation: cs-wave 9s linear infinite; }
      .cs-wave-b { animation-duration: 14s; animation-direction: reverse; }
      .cs-ring { animation: cs-ring 4s ease-out infinite; }
      @media (prefers-reduced-motion: reduce) { .cs-wave, .cs-ring { animation: none; } }
    `}</style>
  );
}

/* Moving water, used in the Filtration door */
function Waves() {
  const path = 'M0 40 C 150 0, 300 80, 450 40 S 750 0, 900 40 S 1200 80, 1350 40 S 1650 0, 1800 40 V120 H0 Z';
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 overflow-hidden" aria-hidden="true">
      <svg className="cs-wave absolute bottom-0 h-24 w-[200%]" viewBox="0 0 1800 120" preserveAspectRatio="none">
        <path d={path} fill="rgba(255,255,255,.18)" />
      </svg>
      <svg className="cs-wave cs-wave-b absolute -bottom-3 h-24 w-[200%]" viewBox="0 0 1800 120" preserveAspectRatio="none">
        <path d={path} fill="rgba(255,255,255,.28)" />
      </svg>
    </div>
  );
}

/* Cricket ground lines, used in the Cricket door */
function Ground() {
  return (
    <svg className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 opacity-30" viewBox="0 0 200 200" fill="none" stroke="white" aria-hidden="true">
      <circle cx="100" cy="100" r="92" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="62" strokeWidth="1.5" strokeDasharray="4 6" />
      <rect x="88" y="52" width="24" height="96" rx="3" strokeWidth="1.5" />
      <path d="M94 52v-8M100 52v-8M106 52v-8M94 148v8M100 148v8M106 148v8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Door({ category, index }) {
  const meta = CONTENT.sections[category.id];
  const Icon = meta.icon;
  return (
    <motion.a
      href={`#${meta.id}`}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25 + index * 0.15, ease: 'easeOut' }}
      className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[2rem] p-7 text-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white md:min-h-[340px] md:p-9"
      style={{ background: category.accent, borderRadius: index === 0 ? '2.5rem 1rem 2.5rem 1rem' : '1rem 2.5rem 1rem 2.5rem' }}
    >
      {index === 0 ? <Waves /> : <Ground />}
      <div className="relative flex items-center justify-between">
        <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur">
          <span className="cs-ring absolute inset-0 rounded-full border-2 border-white/70" aria-hidden="true" />
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>
        <span className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur">{meta.short}</span>
      </div>
      <div className="relative">
        <h2 className="max-w-sm text-3xl font-extrabold leading-tight md:text-4xl" style={HEAD}>
          {category.label}
        </h2>
        <p className="mt-2 max-w-sm text-white/90">{meta.tagline}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-bold">
          See the latest posts
          <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
        </span>
      </div>
    </motion.a>
  );
}

function PostsSection({ category, index }) {
  const meta = CONTENT.sections[category.id];
  const Icon = meta.icon;
  const { items, loading, error } = usePosts(category.id);
  const tint = `color-mix(in srgb, ${category.accent} 9%, white)`;
  const flip = index % 2 === 1;

  return (
    <section
      id={meta.id}
      aria-labelledby={`${meta.id}-title`}
      className="scroll-mt-24 py-16 md:py-24"
      style={{ background: flip ? '#fff' : tint }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-12">
        {/* Intro column stays in view while posts scroll */}
        <div className={`lg:col-span-4 ${flip ? 'lg:order-2' : ''}`}>
          <div className="lg:sticky lg:top-28">
            <span
              className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white"
              style={{ background: category.accent }}
            >
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <h2 id={`${meta.id}-title`} className="mt-5 text-3xl font-extrabold leading-tight text-[#003B5C] md:text-4xl" style={HEAD}>
              {category.label}
            </h2>
            <TriBar className="mt-4" />
            <p className="mt-5 text-lg font-semibold leading-snug" style={{ color: category.accent }}>
              {meta.tagline}
            </p>
            <p className="mt-3 max-w-md leading-relaxed text-slate-600">{meta.intro}</p>
          </div>
        </div>

        {/* Posts column: first post is larger */}
        <div className={`lg:col-span-8 ${flip ? 'lg:order-1' : ''}`}>
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2" aria-busy="true">
              <div className="h-80 animate-pulse rounded-3xl bg-slate-200/70 sm:col-span-2" />
              <div className="h-72 animate-pulse rounded-3xl bg-slate-200/70" />
              <div className="h-72 animate-pulse rounded-3xl bg-slate-200/70" />
            </div>
          ) : error ? (
            <p role="alert" className="rounded-3xl bg-white p-8 text-center text-slate-600 shadow-sm">
              We could not load these posts. Refresh the page or try again in a few minutes.
            </p>
          ) : items.length === 0 ? (
            <p className="rounded-3xl border-2 border-dashed p-12 text-center text-slate-600" style={{ borderColor: category.accent }}>
              {meta.empty}
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {items.map((post, i) => (
                <div key={post.id} className={i === 0 && items.length > 1 ? 'sm:col-span-2' : ''}>
                  <CommunityCard post={post} accent={category.accent} index={i} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CommunityService() {
  return (
    <MotionConfig reducedMotion="user">
      <Fonts />
      <div className="cs-page bg-[#F8F9FA] text-slate-700">
        {/* ---------- Hero: two doors, one for each service ---------- */}
        <section className="relative overflow-hidden bg-[#003B5C] text-white">
          <span className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-25 blur-3xl" style={{ background: BRAND.teal }} />
          <span className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: BRAND.yellow }} />

          <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 md:pb-24 md:pt-28">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl" style={HEAD}>
                {CONTENT.hero.title}
              </h1>
              <TriBar className="mt-6" />
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sky-100">{CONTENT.hero.text}</p>
            </motion.div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {CATEGORIES.map((c, i) => (
                <Door key={c.id} category={c} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Posts ---------- */}
        {CATEGORIES.map((c, i) => (
          <PostsSection key={c.id} category={c} index={i} />
        ))}

        {/* ---------- Call to action ---------- */}
        <section className="bg-[#003B5C] text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-16 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="max-w-2xl text-2xl font-extrabold md:text-3xl" style={HEAD}>{CONTENT.cta.title}</h2>
              <p className="mt-2 text-sky-100">{CONTENT.cta.text}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-[#003B5C] transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{ background: BRAND.yellow }}
              >
                Contact us <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/news-events"
                className="rounded-full border border-white/60 px-7 py-3 text-sm font-bold text-white transition duration-300 hover:bg-white/10 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                News &amp; Events
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}

export default CommunityService;