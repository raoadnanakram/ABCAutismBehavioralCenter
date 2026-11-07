import React from 'react';
import { Link } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowDown, Droplets, Trophy } from 'lucide-react';
import { usePosts } from '../Components/PostParts';
import { BRAND, CATEGORIES, CommunityCard, TriBar } from '../Components/CommunityParts';

/* ==========================================================================
   Community Services page
   - Two sections, each with its own posts:  ABC Filtration Plant, ABC Cricket Stadium
   - Posts are managed in  Admin Dashboard > ABC Filtration Plant / ABC Cricket Stadium
   - Page text is in CONTENT below, edit it here any time.
========================================================================== */

const CONTENT = {
  hero: {
    eyebrow: 'Community Services',
    title: 'Care that reaches beyond the therapy room',
    text: 'At ABC Autism Behavioral Center we believe a strong community helps every child grow. Our community services bring clean water and the joy of sport to the families and neighbours around us.',
  },
  sections: {
    filtration: {
      id: 'filtration-plant',
      icon: Droplets,
      tagline: 'Clean, safe drinking water for our community',
      intro:
        'The ABC Filtration Plant is a community service of ABC Autism Behavioral Center. It was set up so that children, families and neighbours around us can have access to filtered drinking water. Follow the posts below for news, photos and updates from the plant.',
      empty: 'Updates from the ABC Filtration Plant will appear here soon.',
    },
    cricket: {
      id: 'cricket-stadium',
      icon: Trophy,
      tagline: 'A place to play, belong and cheer together',
      intro:
        'The ABC Cricket Stadium is our community sports initiative. It brings children, young people and families together through the joy of cricket, teamwork and friendly competition. Match days, events and special moments from the ground are shared below.',
      empty: 'Updates from the ABC Cricket Stadium will appear here soon.',
    },
  },
  cta: {
    title: 'Want to know more about our community services?',
    text: 'Visit us, call us or send a message. We would love to hear from you.',
  },
};

function PostsSection({ category }) {
  const meta = CONTENT.sections[category.id];
  const Icon = meta.icon;
  const { items, loading, error } = usePosts(category.id);

  return (
    <section id={meta.id} className="scroll-mt-28 py-16 md:py-20" aria-labelledby={`${meta.id}-title`}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <span
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
            style={{ background: category.accent }}
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 id={`${meta.id}-title`} className="mt-4 text-3xl font-extrabold tracking-tight text-[#003B5C] md:text-4xl">
            {category.label}
          </h2>
          <TriBar className="mt-3" />
          <p className="mt-4 text-lg font-medium" style={{ color: category.accent }}>
            {meta.tagline}
          </p>
          <p className="mt-3 leading-relaxed text-slate-600">{meta.intro}</p>
        </motion.div>

        <div className="mt-10">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl bg-slate-200/70" />
              ))}
            </div>
          ) : error ? (
            <p className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
              Posts could not be loaded right now. Please try again later.
            </p>
          ) : items.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center text-slate-500">
              {meta.empty}
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((post, i) => (
                <CommunityCard key={post.id} post={post} accent={category.accent} index={i} />
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
      <div className="bg-[#F8F9FA] text-slate-700">
        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden bg-[#003B5C] text-white">
          <span className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-25 blur-3xl" style={{ background: BRAND.teal }} />
          <span className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: BRAND.pink }} />
          <span className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full opacity-20 blur-3xl" style={{ background: BRAND.yellow }} />

          <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: BRAND.yellow }}>
                {CONTENT.hero.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">{CONTENT.hero.title}</h1>
              <TriBar className="mt-5" />
              <p className="mt-6 text-lg leading-relaxed text-sky-100">{CONTENT.hero.text}</p>

              <div className="mt-9 flex flex-wrap gap-3">
                {CATEGORIES.map((c) => (
                  <a
                    key={c.id}
                    href={`#${CONTENT.sections[c.id].id}`}
                    className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                    style={{ background: c.accent }}
                  >
                    {c.label}
                    <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---------- The two sections ---------- */}
        {CATEGORIES.map((c, i) => (
          <div key={c.id} className={i % 2 === 1 ? 'bg-white' : ''}>
            <PostsSection category={c} />
          </div>
        ))}

        {/* ---------- Call to action ---------- */}
        <section className="relative overflow-hidden bg-[#003B5C] text-white">
          <span className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full opacity-25 blur-3xl" style={{ background: BRAND.pink }} />
          <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-6 py-16 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-2xl font-extrabold md:text-3xl">{CONTENT.cta.title}</h2>
              <p className="mt-2 text-sky-100">{CONTENT.cta.text}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-full px-7 py-3 text-sm font-bold text-[#003B5C] shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                style={{ background: BRAND.yellow }}
              >
                Contact us
              </Link>
              <Link
                to="/news-events"
                className="rounded-full border border-white/60 px-7 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
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