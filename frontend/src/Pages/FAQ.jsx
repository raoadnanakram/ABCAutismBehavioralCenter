import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, ArrowRight } from 'lucide-react';

/* ==========================================================================
   FAQ - ABC Autism Behavioral Center
   Own look: warm cream + deep teal + coral, with Fraunces and Plus Jakarta Sans fonts.
   Edit the questions and answers in the FAQS list below.
   ========================================================================== */

const C = {
  ink: '#12343B',
  teal: '#0E5A63',
  tealMid: '#1B8A8F',
  mint: '#D5EFE8',
  cream: '#FBF6EE',
  coral: '#FF6B4A',
  gold: '#F4B942',
};

const TOPICS = [
  { id: 'all', label: 'All questions', icon: '✨', color: C.teal },
  { id: 'start', label: 'Getting started', icon: '🚀', color: C.coral },
  { id: 'care', label: 'Care and families', icon: '💛', color: C.gold },
  { id: 'coord', label: 'Working together', icon: '🤝', color: C.tealMid },
  { id: 'community', label: 'Community and fees', icon: '🌱', color: C.ink },
];

const FAQS = [
  {
    id: 'age-groups',
    topic: 'care',
    q: 'What age groups does ABC Centre cater to?',
    a: 'ABC Centre provides services for children, adolescents, adults, and families, with programs tailored according to individual needs, developmental stage, abilities, and goals. Our child development services focus on early childhood through school-age years, while our nutrition, speech and language, physiotherapy, rehabilitation, and other specialized services are available for individuals across different age groups.',
  },
  {
    id: 'parent-support',
    topic: 'care',
    q: 'Does ABC Centre offer support or resources for parents and caregivers?',
    a: 'Yes. We believe that parents and caregivers are an important part of an individual’s progress. We provide parent and caregiver guidance, education, home-based strategies, and recommendations where appropriate. Our multidisciplinary team also works with families to help them understand their child’s needs and support development and independence at home.',
  },
  {
    id: 'enrolling',
    topic: 'start',
    q: 'What is the process for enrolling my child at ABC Centre?',
    a: 'The process begins with an initial consultation or assessment to understand your child’s developmental, behavioral, communication, sensory, educational, nutritional, or functional needs. Based on the assessment, our professionals develop an individualized plan and recommend the appropriate services and frequency of sessions. Parents and caregivers are involved throughout the process.',
    link: { to: '/book-a-free-consult', label: 'Book an appointment' },
  },
  {
    id: 'schools',
    topic: 'coord',
    q: 'How does ABC Centre collaborate with schools or other professionals involved in my child’s care?',
    a: 'We believe in coordinated and multidisciplinary care. With appropriate parental consent, our team can communicate with teachers, schools, healthcare professionals, therapists, and other relevant caregivers involved in the child’s care. This helps promote consistency between therapy, education, and everyday environments.',
  },
  {
    id: 'community',
    topic: 'community',
    q: 'Are there any support groups or community activities organized by ABC Centre?',
    a: 'ABC Centre aims to promote family education, awareness, and community support through educational activities, nutrition and health awareness sessions, parent guidance, and developmental initiatives. Details of upcoming workshops, awareness programs, and community activities will be shared through our centre’s official communication channels.',
  },
  {
    id: 'fees',
    topic: 'community',
    q: 'Does ABC Centre accept insurance or offer financial assistance options?',
    a: 'Our payment and financial assistance policies may vary depending on the service and individual circumstances. Families are encouraged to contact ABC Centre directly to discuss consultation fees, therapy packages, payment options, and any available concessions or assistance programs.',
    link: { to: '/contact', label: 'Contact us about fees' },
  },
  {
    id: 'tour',
    topic: 'start',
    q: 'Can I schedule a tour of ABC Centre before enrolling my child?',
    a: 'Yes. Families are welcome to contact ABC Centre to schedule a visit or consultation before starting services. A visit allows parents and caregivers to learn more about our environment, services, multidisciplinary approach, and the support available for their child.',
    link: { to: '/contact', label: 'Schedule a visit' },
  },
];

const TOPIC_BY_ID = Object.fromEntries(TOPICS.map((t) => [t.id, t]));

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,700;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
.fq-display { font-family: 'Fraunces', Georgia, 'Times New Roman', serif; }
.fq-body { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif; }
@keyframes fqMorph { 0%,100% { border-radius: 60% 40% 55% 45% / 55% 45% 60% 40%; } 50% { border-radius: 40% 60% 45% 55% / 45% 60% 40% 55%; } }
@keyframes fqBob { 0%,100% { transform: translateY(0) rotate(var(--r, 0deg)); } 50% { transform: translateY(-14px) rotate(var(--r, 0deg)); } }
@keyframes fqSpin { to { transform: rotate(360deg); } }
@keyframes fqShine { 0% { transform: translateX(-130%) skewX(-18deg); } 60%,100% { transform: translateX(260%) skewX(-18deg); } }
.fq-morph { animation: fqMorph 14s ease-in-out infinite; }
.fq-bob { animation: fqBob 6s ease-in-out infinite; }
.fq-spin { animation: fqSpin 40s linear infinite; }
.fq-shine { position: relative; overflow: hidden; }
.fq-shine::after { content: ''; position: absolute; top: 0; bottom: 0; width: 34%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent); animation: fqShine 5s ease-in-out infinite; pointer-events: none; }
.fq-grain { background-image: radial-gradient(rgba(14,90,99,.10) 1px, transparent 1px); background-size: 20px 20px; }
@media (prefers-reduced-motion: reduce) { .fq-morph, .fq-bob, .fq-spin, .fq-shine::after { animation: none !important; } }
`;

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function Mark({ text, query }) {
  const q = query.trim();
  if (!q) return text;
  const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, 'ig'));
  return parts.map((p, i) =>
    p.toLowerCase() === q.toLowerCase() ? (
      <mark key={i} className="rounded px-0.5" style={{ background: `${C.gold}88`, color: 'inherit' }}>{p}</mark>
    ) : (
      <React.Fragment key={i}>{p}</React.Fragment>
    )
  );
}

function FaqCard({ item, index, open, onToggle, query }) {
  const topic = TOPIC_BY_ID[item.topic];
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-[28px] transition-shadow duration-300 hover:shadow-[0_28px_50px_-22px_rgba(14,90,99,0.45)]"
      style={{ background: open ? C.mint : '#fff', boxShadow: open ? '0 20px 40px -22px rgba(14,90,99,0.4)' : '0 1px 2px rgba(18,52,59,0.06)' }}
    >
      <div
        className={`absolute inset-y-0 left-0 w-2 origin-top transition-transform duration-500 ${open ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`}
        style={{ background: topic.color }}
      />
      <button onClick={onToggle} aria-expanded={open} className="flex w-full items-start gap-5 p-6 text-left sm:p-8">
        <span className="fq-display text-5xl font-bold leading-none opacity-90 transition-transform duration-300 group-hover:scale-110 sm:text-6xl" style={{ color: topic.color }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex-1 pt-1">
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider" style={{ background: `${topic.color}18`, color: topic.color }}>
            {topic.icon} {topic.label}
          </span>
          <span className="fq-display block text-xl font-bold leading-snug sm:text-2xl" style={{ color: C.ink }}>
            <Mark text={item.q} query={query} />
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 135 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-md"
          style={{ background: open ? C.coral : C.teal }}
        >
          <Plus className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 pl-6 pr-6 sm:pl-[7.5rem] sm:pr-10" style={{ color: C.ink }}>
              <p className="text-[15.5px] leading-[1.8] opacity-80">
                <Mark text={item.a} query={query} />
              </p>
              {item.link && (
                <Link
                  to={item.link.to}
                  className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:gap-3 hover:shadow-lg"
                  style={{ background: C.teal }}
                >
                  {item.link.label} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function FAQ() {
  const [topic, setTopic] = useState('all');
  const [query, setQuery] = useState('');
  const [openIds, setOpenIds] = useState(new Set([FAQS[0].id]));

  // page title, description and search-engine data
  useEffect(() => {
    const prev = document.title;
    document.title = "FAQ's | ABC Autism Behavioral Center";
    let meta = document.head.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'Answers about age groups, parent support, enrolling, working with schools, community activities, fees and visiting ABC Autism Behavioral Center.');

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
    document.head.appendChild(script);
    return () => {
      document.title = prev;
      document.head.removeChild(script);
    };
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => (topic === 'all' || f.topic === topic) && (!q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)));
  }, [topic, query]);

  const counts = useMemo(() => {
    const c = { all: FAQS.length };
    FAQS.forEach((f) => {
      c[f.topic] = (c[f.topic] || 0) + 1;
    });
    return c;
  }, []);

  const toggle = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allOpen = results.length > 0 && results.every((r) => openIds.has(r.id));

  return (
    <main className="fq-body overflow-x-hidden" style={{ background: C.cream, color: C.ink }}>
      <style>{STYLES}</style>

      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden pb-20 pt-28 sm:pt-32">
        <div className="fq-grain pointer-events-none absolute inset-0" />
        <div className="fq-morph pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem]" style={{ background: `${C.mint}` }} />
        <div className="fq-morph pointer-events-none absolute -bottom-32 -left-24 h-80 w-80" style={{ background: `${C.gold}40`, animationDelay: '-5s' }} />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest text-white"
              style={{ background: C.teal }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: C.gold }} />
              Help centre
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="fq-display mt-6 text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl"
              style={{ color: C.ink }}
            >
              Questions,{' '}
              <span className="relative inline-block italic" style={{ color: C.coral }}>
                answered.
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 14" fill="none" preserveAspectRatio="none">
                  <motion.path
                    d="M3 9 Q 30 2, 60 8 T 120 8 T 197 7"
                    stroke={C.gold}
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, delay: 0.8 }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-7 max-w-xl text-lg leading-relaxed opacity-75"
            >
              Everything families ask us most, about ages, enrolling, support for parents, working with schools, and visiting the centre.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="relative mt-9 max-w-xl"
            >
              <Search className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: C.tealMid }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search: age, enrol, fees, visit..."
                className="w-full rounded-full border-2 bg-white py-4 pl-14 pr-14 text-base shadow-[0_18px_40px_-20px_rgba(14,90,99,0.5)] outline-none transition placeholder:opacity-50 focus:shadow-[0_22px_44px_-18px_rgba(14,90,99,0.6)]"
                style={{ borderColor: query ? C.teal : 'transparent', color: C.ink }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white transition hover:scale-110"
                  style={{ background: C.coral }}
                >
                  ×
                </button>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <span className="opacity-60">Popular:</span>
              {['age', 'enrol', 'fees', 'visit'].map((w) => (
                <button
                  key={w}
                  onClick={() => setQuery(w)}
                  className="rounded-full bg-white px-4 py-1.5 font-semibold shadow-sm transition hover:-translate-y-0.5 hover:text-white hover:shadow-md"
                  style={{ color: C.teal }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = C.teal)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
                >
                  {w}
                </button>
              ))}
            </motion.div>
          </div>

          {/* floating answers */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.3 }} className="relative mx-auto hidden h-[26rem] w-full max-w-md lg:block">
            <div className="fq-spin absolute inset-4 rounded-full border-2 border-dashed" style={{ borderColor: `${C.teal}40` }} />
            <div className="fq-morph absolute inset-10" style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.tealMid})` }} />
            <div className="fq-bob absolute left-0 top-6 w-64 rounded-3xl rounded-bl-md bg-white p-5 shadow-2xl" style={{ ['--r']: '-3deg' }}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: C.coral }}>Family asks</p>
              <p className="fq-display mt-1 text-lg font-bold leading-snug">What age groups does ABC Centre cater to?</p>
            </div>
            <div className="fq-bob absolute bottom-24 right-0 w-64 rounded-3xl rounded-br-md p-5 text-white shadow-2xl" style={{ background: C.coral, ['--r']: '2.5deg', animationDelay: '-2s' }}>
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">We answer</p>
              <p className="mt-1 text-[15px] font-semibold leading-snug">Programs are tailored to each person’s needs, stage, abilities and goals.</p>
            </div>
            <div className="fq-bob absolute bottom-0 left-8 flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-xl" style={{ ['--r']: '-1.5deg', animationDelay: '-4s' }}>
              <span className="text-2xl">💛</span>
              <span className="text-sm font-bold">Families are welcome to visit</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================== LIST ============================== */}
      <section className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-24 pt-6 lg:grid-cols-[300px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-[28px] bg-white p-5 shadow-sm">
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest opacity-50">Browse topics</p>
            <nav className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1.5 lg:overflow-visible lg:pb-0">
              {TOPICS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTopic(t.id)}
                  className={`relative flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200 lg:w-full lg:hover:translate-x-1 ${
                    topic === t.id ? 'text-white' : 'hover:bg-[#FBF6EE]'
                  }`}
                >
                  {topic === t.id && (
                    <motion.span layoutId="fqTopic" className="absolute inset-0 rounded-2xl shadow-lg" style={{ background: t.color }} transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative text-lg">{t.icon}</span>
                  <span className="relative flex-1 whitespace-nowrap lg:whitespace-normal">{t.label}</span>
                  <span className={`relative rounded-full px-2 py-0.5 text-[11px] ${topic === t.id ? 'bg-white/25' : 'bg-slate-100'}`}>{counts[t.id] || 0}</span>
                </button>
              ))}
            </nav>
          </div>

          <motion.div
            whileHover={{ y: -5, rotate: -0.8 }}
            className="relative mt-5 hidden overflow-hidden rounded-[28px] p-6 text-white shadow-xl lg:block"
            style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.tealMid})` }}
          >
            <div className="fq-morph absolute -right-10 -top-10 h-32 w-32" style={{ background: `${C.gold}55` }} />
            <p className="fq-display relative text-2xl font-bold leading-tight">Prefer to talk to someone?</p>
            <p className="relative mt-2 text-sm opacity-85">Our team is happy to help with anything not listed here.</p>
            <Link to="/contact" className="fq-shine relative mt-5 inline-block rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105" style={{ background: C.coral }}>
              Contact us
            </Link>
          </motion.div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold opacity-70">
              Showing <b style={{ color: C.teal }}>{results.length}</b> of {FAQS.length} answers
            </p>
            {results.length > 0 && (
              <button
                onClick={() => setOpenIds(allOpen ? new Set() : new Set(results.map((r) => r.id)))}
                className="rounded-full bg-white px-5 py-2 text-sm font-bold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                style={{ color: C.teal }}
              >
                {allOpen ? 'Collapse all' : 'Expand all'}
              </button>
            )}
          </div>

          <div className="space-y-5">
            <AnimatePresence>
              {results.map((item, i) => (
                <FaqCard key={item.id} item={item} index={i} open={openIds.has(item.id)} onToggle={() => toggle(item.id)} query={query} />
              ))}
            </AnimatePresence>

            {results.length === 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-[28px] bg-white p-12 text-center shadow-sm">
                <div className="mb-3 text-5xl">🔎</div>
                <p className="fq-display text-2xl font-bold">No answers found</p>
                <p className="mt-2 text-sm opacity-60">Try another word, or ask our team directly.</p>
                <button
                  onClick={() => {
                    setQuery('');
                    setTopic('all');
                  }}
                  className="mt-6 rounded-full px-7 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5"
                  style={{ background: C.teal }}
                >
                  Show all questions
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ============================== CTA ============================== */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[40px] px-8 py-14 text-white sm:px-16"
          style={{ background: `linear-gradient(120deg, ${C.teal}, ${C.tealMid})` }}
        >
          <div className="fq-grain absolute inset-0 opacity-60" />
          <div className="fq-morph absolute -right-16 -top-20 h-72 w-72" style={{ background: `${C.coral}66` }} />
          <div className="fq-morph absolute -bottom-24 left-1/3 h-64 w-64" style={{ background: `${C.gold}55`, animationDelay: '-6s' }} />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="fq-display text-4xl font-bold leading-tight sm:text-5xl">
                Ready to take the <span className="italic" style={{ color: C.gold }}>first step?</span>
              </h2>
              <p className="mt-4 max-w-lg text-lg opacity-85">Visit us, meet the team and see how personalised support can help your child grow.</p>
            </div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <motion.div whileHover={{ y: -4, scale: 1.05 }}>
                <Link to="/book-a-free-consult" className="fq-shine inline-block rounded-full px-9 py-4 font-bold text-white shadow-xl" style={{ background: C.coral }}>
                  Book Appointment
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -4 }}>
                <Link to="/contact" className="inline-block rounded-full border-2 border-white/60 px-9 py-3.5 font-bold transition hover:bg-white hover:text-[#0E5A63]">
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}