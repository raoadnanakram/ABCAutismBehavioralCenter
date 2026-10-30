import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ArrowRight } from 'lucide-react';
import { PageHero, RelatedAndCta, STYLES, usePageMeta } from '../Components/PolicyLayout';

/* ==========================================================================
   FAQ - ABC Autism Behavioral Center
   Edit the questions and answers in the FAQS list below.
   (Please check each answer matches how your center really works.)
   ========================================================================== */

const BRAND = { navy: '#003B5C', pink: '#F5456B', orange: '#F5A623', cyan: '#1CA7C7' };

const CATEGORIES = [
  { id: 'all', label: 'All questions', icon: '✨' },
  { id: 'general', label: 'About us', icon: '🏥' },
  { id: 'appointments', label: 'Appointments', icon: '📅' },
  { id: 'privacy', label: 'Forms and privacy', icon: '🔒' },
  { id: 'careers', label: 'Careers', icon: '💼' },
];

const CAT_COLOR = { general: BRAND.cyan, appointments: BRAND.pink, privacy: BRAND.navy, careers: BRAND.orange };

const FAQS = [
  {
    id: 'what-is-abc',
    cat: 'general',
    q: 'What is ABC Autism Behavioral Center?',
    a: 'We are a multidisciplinary child development center. Expert therapies, early education and specialised care are available under one roof, in a safe and supportive environment for children and their families.',
  },
  {
    id: 'services',
    cat: 'general',
    q: 'Which services do you offer?',
    a: 'Speech and Language Therapy, ABA Therapy, Occupational Therapy, Physiotherapy, Special Education, Nutrition Therapy and Dietetics, Day Care, Montessori Education and Dysphagia Management.',
    link: { to: '/services', label: 'See all services' },
  },
  {
    id: 'who-for',
    cat: 'general',
    q: 'Who can benefit from your services?',
    a: 'Our services support children with communication, developmental, behavioural and learning needs, and their families. Some of our specialists also support adults, for example with communication and swallowing difficulties.',
  },
  {
    id: 'parents',
    cat: 'general',
    q: 'Will parents be involved in the therapy?',
    a: 'Yes. We believe families are an important part of the care journey. Our team works together with parents, caregivers and educators so that progress continues at home and at school.',
  },
  {
    id: 'team',
    cat: 'general',
    q: 'Who are the specialists at the center?',
    a: 'You can meet our leadership and every specialist, with their qualifications and areas of expertise, on our Our Team page.',
    link: { to: '/about/our-team', label: 'Meet our team' },
  },
  {
    id: 'book',
    cat: 'appointments',
    q: 'How do I book an appointment?',
    a: 'Click Book Appointment, fill in the short form with your details and the service you need, and send it. Our team will review your request and contact you to agree a time.',
    link: { to: '/book-a-free-consult', label: 'Book an appointment' },
  },
  {
    id: 'confirmation',
    cat: 'appointments',
    q: 'Will I get a confirmation after sending the form?',
    a: 'Yes. A confirmation email is sent to the email address you entered, and our team is notified at the same time. The email shows that we received your request. Your visit is confirmed when our team contacts you.',
  },
  {
    id: 'no-email',
    cat: 'appointments',
    q: 'I did not receive the confirmation email. What should I do?',
    a: 'Please check your spam or junk folder first, and make sure the email address you typed is correct. If it is still missing, contact us and we will help you.',
    link: { to: '/contact', label: 'Contact us' },
  },
  {
    id: 'specific-specialist',
    cat: 'appointments',
    q: 'Can I choose a specific specialist?',
    a: 'You can find the specialist you would like on our Our Team page and use Book Appointment on their card. You can also write your preferred specialist in the message box of the booking form.',
  },
  {
    id: 'change',
    cat: 'appointments',
    q: 'What if I need to change or cancel my appointment?',
    a: 'Please contact us as early as you can through our Contact page, and our team will help you find a new time.',
  },
  {
    id: 'safe',
    cat: 'privacy',
    q: 'Is the information I send through the forms safe?',
    a: 'Your details are used only to respond to your request. They are stored on secure servers and can be seen only by authorised staff through a login-protected area. Please read our Privacy Policy for the full details.',
    link: { to: '/privacy-policy', label: 'Read the Privacy Policy' },
  },
  {
    id: 'medical-details',
    cat: 'privacy',
    q: 'Should I write my child\'s medical details in the form?',
    a: 'Please keep the form short and do not add detailed medical records. Our team will ask for the information they need when you meet them.',
  },
  {
    id: 'apply',
    cat: 'careers',
    q: 'How can I apply for a job at ABC?',
    a: 'Open our Careers page, fill in the application form, choose the job you are applying for and upload your CV as a PDF or Word file (up to 5 MB).',
    link: { to: '/careers', label: 'Go to Careers' },
  },
  {
    id: 'hear-back',
    cat: 'careers',
    q: 'Will I hear back after I apply?',
    a: 'You will receive an email confirming that your application arrived. Our team reviews every application and contacts shortlisted candidates.',
  },
];

function FaqItem({ item, index, open, onToggle }) {
  const color = CAT_COLOR[item.cat];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      className={`group relative overflow-hidden rounded-2xl bg-white ring-1 transition-shadow duration-300 hover:shadow-[0_20px_40px_-18px_rgba(0,59,92,0.3)] ${
        open ? 'shadow-lg ring-slate-200' : 'shadow-sm ring-slate-100'
      }`}
    >
      <div
        className={`absolute inset-y-0 left-0 w-1.5 origin-top transition-transform duration-500 ${open ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`}
        style={{ background: color }}
      />
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
      >
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}aa)` }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex-1 font-serif text-base font-bold leading-snug sm:text-lg" style={{ color: BRAND.navy }}>
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors"
          style={{ background: open ? color : '#f1f5f9', color: open ? '#fff' : '#64748b' }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 pl-[4.75rem] pr-6 text-[15px] leading-relaxed text-slate-600 sm:pl-[5.25rem]">
              <p>{item.a}</p>
              {item.link && (
                <Link
                  to={item.link.to}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 hover:gap-3"
                  style={{ color }}
                >
                  {item.link.label} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(FAQS[0].id);

  usePageMeta(
    "FAQ's | ABC Autism Behavioral Center",
    'Answers to common questions about our services, booking an appointment, forms, privacy and careers at ABC Autism Behavioral Center.'
  );

  // Search-engine friendly FAQ data
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter(
      (f) => (cat === 'all' || f.cat === cat) && (!q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
    );
  }, [cat, query]);

  const counts = useMemo(() => {
    const c = { all: FAQS.length };
    FAQS.forEach((f) => {
      c[f.cat] = (c[f.cat] || 0) + 1;
    });
    return c;
  }, []);

  return (
    <main className="overflow-x-hidden bg-[#F1F6FA]">
      <style>{STYLES}</style>

      <PageHero
        crumb="FAQ's"
        eyebrow="Help centre"
        title="Frequently asked"
        accent="questions"
        intro="Quick, clear answers about our services, booking an appointment and applying to work with us."
        chips={[`${FAQS.length} answers`, 'Updated regularly']}
      />

      <section className="mx-auto max-w-4xl px-5 py-14">
        {/* search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative -mt-24 mb-8 rounded-3xl bg-white p-3 shadow-[0_24px_50px_-20px_rgba(0,59,92,0.4)] ring-1 ring-slate-100"
        >
          <Search className="pointer-events-none absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a question, e.g. appointment, CV, privacy"
            className="w-full rounded-2xl bg-slate-50 py-4 pl-14 pr-12 text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-[#1CA7C7]/20"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-6 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-slate-200 text-sm text-slate-600 transition hover:bg-[#F5456B] hover:text-white"
            >
              ×
            </button>
          )}
        </motion.div>

        {/* categories */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((c) => (
            <motion.button
              key={c.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setCat(c.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                cat === c.id
                  ? 'bg-[#003B5C] text-white shadow-lg shadow-[#003B5C]/25'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-[#003B5C] hover:ring-[#1CA7C7]'
              }`}
            >
              <span>{c.icon}</span>
              {c.label}
              <span className={`rounded-full px-2 py-0.5 text-[11px] ${cat === c.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                {counts[c.id] || 0}
              </span>
            </motion.button>
          ))}
        </div>

        {/* questions */}
        <div className="space-y-4">
          <AnimatePresence>
            {results.map((item, i) => (
              <FaqItem
                key={item.id}
                item={item}
                index={i}
                open={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </AnimatePresence>

          {results.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-100"
            >
              <div className="mb-3 text-5xl">🔍</div>
              <p className="font-serif text-xl font-bold" style={{ color: BRAND.navy }}>No answers found</p>
              <p className="mt-2 text-sm text-slate-500">Try a different word, or ask our team directly.</p>
              <button
                onClick={() => {
                  setQuery('');
                  setCat('all');
                }}
                className="mt-5 rounded-full bg-[#003B5C] px-6 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1CA7C7]"
              >
                Show all questions
              </button>
            </motion.div>
          )}
        </div>

        {/* still need help */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-14 overflow-hidden rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100 sm:p-10"
        >
          <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: `linear-gradient(90deg, ${BRAND.orange}, ${BRAND.pink}, ${BRAND.cyan})` }} />
          <div className="mb-3 text-4xl">💬</div>
          <h2 className="font-serif text-2xl font-bold" style={{ color: BRAND.navy }}>Still have a question?</h2>
          <p className="mx-auto mt-2 max-w-md text-slate-500">We are happy to help. Send us a message or book a visit.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ y: -4, scale: 1.04 }}>
              <Link to="/book-a-free-consult" className="pl-shine inline-block rounded-full bg-gradient-to-r from-[#F5456B] to-[#F5A623] px-8 py-3.5 font-bold text-white shadow-lg shadow-[#F5456B]/30">
                Book Appointment
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -4 }}>
              <Link to="/contact" className="inline-block rounded-full border-2 border-[#003B5C] px-8 py-3 font-semibold text-[#003B5C] transition hover:bg-[#003B5C] hover:text-white">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <RelatedAndCta current="/faq" hideCta />
    </main>
  );
}
