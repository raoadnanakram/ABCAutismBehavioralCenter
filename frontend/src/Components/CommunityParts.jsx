import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Images, X } from 'lucide-react';
import { api } from '../api';
import { parseDate, picturesOf } from './PostParts';

/* Shared pieces for the Community Services page and the post detail page.
   Brand colors come from the ABC logo: navy text, yellow A, pink B, teal C. */

export const BRAND = { navy: '#003B5C', yellow: '#F5A623', pink: '#F5456B', teal: '#1CA7C7' };

export const CATEGORIES = [
  { id: 'filtration', label: 'ABC Filtration Plant', accent: BRAND.teal },
  { id: 'cricket', label: 'ABC Cricket Stadium', accent: BRAND.pink },
];
export const categoryOf = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];

const LONG_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const longDate = (iso) => {
  const { year, month, day } = parseDate(iso);
  return `${day} ${LONG_MONTHS[month]} ${year}`;
};

export const shortText = (text) => (text || '').replace(/\s+/g, ' ').trim();

export function usePost(id) {
  const [state, setState] = useState({ post: null, loading: true, error: '' });
  useEffect(() => {
    let off = false;
    setState({ post: null, loading: true, error: '' });
    api('/posts/' + encodeURIComponent(id))
      .then((post) => !off && setState({ post, loading: false, error: '' }))
      .catch((e) => !off && setState({ post: null, loading: false, error: e.message || 'Not found' }));
    return () => {
      off = true;
    };
  }, [id]);
  return state;
}

export function TriBar({ className = '' }) {
  return (
    <span className={`flex h-1.5 w-20 overflow-hidden rounded-full ${className}`} aria-hidden="true">
      <span className="flex-1" style={{ background: BRAND.yellow }} />
      <span className="flex-1" style={{ background: BRAND.pink }} />
      <span className="flex-1" style={{ background: BRAND.teal }} />
    </span>
  );
}

/* ---------- post card for the listing ---------- */
export function CommunityCard({ post, accent, index = 0 }) {
  const pics = picturesOf(post);
  const { month, day } = parseDate(post.date);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.08, ease: 'easeOut' }}
      className="h-full"
    >
      <Link
        to={`/community-services/${post.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{ '--accent': accent }}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#003B5C]/10">
          {pics[0] ? (
            <img
              src={pics[0]}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-[#003B5C]/20">ABC</div>
          )}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute left-3 top-3 rounded-xl bg-white/95 px-3 py-1.5 text-center leading-tight shadow">
            <span className="block text-[11px] font-semibold uppercase tracking-wide" style={{ color: accent }}>
              {LONG_MONTHS[month].slice(0, 3)}
            </span>
            <span className="block text-lg font-bold text-[#003B5C]">{String(day).padStart(2, '0')}</span>
          </span>
          {pics.length > 1 && (
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
              <Images className="h-3.5 w-3.5" aria-hidden="true" /> {pics.length}
            </span>
          )}
          <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: accent }} />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-bold leading-snug text-[#003B5C] transition-colors group-hover:text-[var(--accent)]">
            {post.title}
          </h3>
          {post.content && (
            <p
              className="mt-2.5 text-[15px] leading-relaxed text-slate-600"
              style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {shortText(post.content)}
            </p>
          )}
          <span
            className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold"
            style={{ color: accent }}
          >
            Read More
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ---------- full-screen viewer ---------- */
function Lightbox({ pics, index, setIndex, onClose, title }) {
  const touchX = useRef(null);
  const go = useCallback((s) => setIndex((i) => (i + s + pics.length) % pics.length), [pics.length, setIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [go, onClose]);

  const btn = 'absolute rounded-full bg-white/15 p-3 text-white backdrop-blur transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white';
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photos`}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <img
        key={pics[index]}
        src={pics[index]}
        alt={`${title} - photo ${index + 1}`}
        className="max-h-[88vh] max-w-full rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button type="button" onClick={onClose} className={`${btn} right-4 top-4`} aria-label="Close">
        <X className="h-5 w-5" />
      </button>
      {pics.length > 1 && (
        <>
          <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} className={`${btn} left-3 top-1/2 -translate-y-1/2`} aria-label="Previous photo">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} className={`${btn} right-3 top-1/2 -translate-y-1/2`} aria-label="Next photo">
            <ChevronRight className="h-6 w-6" />
          </button>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-3 py-1 text-sm text-white backdrop-blur">
            {index + 1} / {pics.length}
          </span>
        </>
      )}
    </motion.div>
  );
}

/* ---------- gallery: big picture, arrows, thumbnails, full-screen view ---------- */
export function Gallery({ pics, title, accent = BRAND.teal }) {
  const [index, setIndex] = useState(0);
  const [full, setFull] = useState(false);
  const thumbs = useRef(null);
  const touchX = useRef(null);
  const go = (s) => setIndex((i) => (i + s + pics.length) % pics.length);

  useEffect(() => {
    const box = thumbs.current;
    const el = box && box.children[index];
    if (box && el) box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
  }, [index]);

  if (!pics.length) return null;
  const arrow = 'absolute top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-[#003B5C] shadow-lg transition hover:scale-110 hover:bg-white focus:outline-none focus-visible:ring-2';

  return (
    <div>
      <div
        className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#003B5C]/10 shadow-lg sm:aspect-[16/10]"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.button
            key={pics[index]}
            type="button"
            onClick={() => setFull(true)}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 block cursor-zoom-in"
            aria-label="View photo full screen"
          >
            <img src={pics[index]} alt={`${title} - photo ${index + 1}`} className="h-full w-full object-cover" />
          </motion.button>
        </AnimatePresence>

        {pics.length > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} className={`${arrow} left-3`} style={{ '--tw-ring-color': accent }} aria-label="Previous photo">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => go(1)} className={`${arrow} right-3`} style={{ '--tw-ring-color': accent }} aria-label="Next photo">
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
              {index + 1} / {pics.length}
            </span>
          </>
        )}
      </div>

      {pics.length > 1 && (
        <div ref={thumbs} className="mt-3 flex gap-2.5 overflow-x-auto pb-2" aria-label="All photos">
          {pics.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-20 sm:w-28 ${
                i === index ? 'scale-100 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              style={i === index ? { borderColor: accent } : undefined}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {full && <Lightbox pics={pics} index={index} setIndex={setIndex} onClose={() => setFull(false)} title={title} />}
      </AnimatePresence>
    </div>
  );
}
