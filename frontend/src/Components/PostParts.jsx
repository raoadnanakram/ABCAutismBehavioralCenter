import React, { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '../api';

/* Shared pieces for the News & Events and Community Services pages.
   Posts come from the admin dashboard:
   { id, title, content, date: 'YYYY-MM-DD', image (cover), images: [urls] } */

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const parseDate = (iso) => {
  const [y, m, d] = String(iso).split('-').map(Number);
  return { year: y, month: m - 1, day: d };
};

export const formatDate = (iso) => {
  const { year, month, day } = parseDate(iso);
  return `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
};

export const picturesOf = (item) =>
  item.images && item.images.length ? item.images : item.image ? [item.image] : [];

export function usePosts(section) {
  const [state, setState] = useState({ items: [], loading: true, error: '' });
  useEffect(() => {
    let off = false;
    api('/posts?section=' + section)
      .then((items) => !off && setState({ items: Array.isArray(items) ? items : [], loading: false, error: '' }))
      .catch((e) => !off && setState({ items: [], loading: false, error: e.message || 'Could not load.' }));
    return () => {
      off = true;
    };
  }, [section]);
  return state;
}

export function DateBadge({ date, className = '' }) {
  const { month, day } = parseDate(date);
  return (
    <span
      className={`absolute bg-[#003B5C] text-white rounded-lg px-3 py-1.5 text-center leading-tight shadow ${className}`}
    >
      <span className="block text-xs">{MONTHS[month]}</span>
      <span className="block text-lg font-bold">{String(day).padStart(2, '0')}</span>
    </span>
  );
}

const clamp = (lines) => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export function PostCard({ item, onOpen }) {
  const pics = picturesOf(item);
  const snippet = (item.content || '').replace(/\s+/g, ' ').trim();
  return (
    <article className="bg-white rounded-xl overflow-hidden border border-slate-200 flex flex-col">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="relative block aspect-[4/3] bg-[#003B5C]/10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003B5C]"
        aria-label={`Read: ${item.title}`}
      >
        {pics[0] ? (
          <img src={pics[0]} alt="" className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#003B5C]/30 text-5xl font-bold">
            ABC
          </div>
        )}
        <DateBadge date={item.date} className="top-3 left-3" />
        {pics.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium rounded-full px-2.5 py-1">
            {pics.length} photos
          </span>
        )}
      </button>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-[#003B5C] leading-snug">
          <button type="button" onClick={() => onOpen(item)} className="text-left hover:underline">
            {item.title}
          </button>
        </h3>
        {snippet && (
          <p className="mt-2 text-sm text-slate-600 leading-relaxed" style={clamp(3)}>
            {snippet}
          </p>
        )}
        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-500">{formatDate(item.date)}</p>
          <button
            type="button"
            onClick={() => onOpen(item)}
            className="text-sm font-semibold text-[#003B5C] hover:underline"
          >
            Read more
          </button>
        </div>
      </div>
    </article>
  );
}

export function PostModal({ item, onClose }) {
  const pics = picturesOf(item);
  const [index, setIndex] = useState(0);
  const thumbs = useRef(null);
  const touchX = useRef(null);

  const go = useCallback(
    (step) => setIndex((i) => (pics.length ? (i + step + pics.length) % pics.length : 0)),
    [pics.length]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, go]);

  // keep the selected thumbnail visible
  useEffect(() => {
    const box = thumbs.current;
    const el = box && box.children[index];
    if (box && el) box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
  }, [index]);

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  const arrow =
    'absolute top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#003B5C] rounded-full w-10 h-10 text-xl font-bold shadow';

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 flex items-start md:items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative aspect-[16/10] bg-[#003B5C]/10"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={onTouchEnd}
        >
          {pics.length > 0 ? (
            <img key={pics[index]} src={pics[index]} alt={`${item.title} - photo ${index + 1}`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#003B5C]/30 text-6xl font-bold">ABC</div>
          )}
          <DateBadge date={item.date} className="top-4 left-4" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#003B5C] rounded-full w-9 h-9 font-bold"
            aria-label="Close"
          >
            ×
          </button>
          {pics.length > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} className={`${arrow} left-3`} aria-label="Previous photo">
                ‹
              </button>
              <button type="button" onClick={() => go(1)} className={`${arrow} right-3`} aria-label="Next photo">
                ›
              </button>
              <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs rounded-full px-2.5 py-1">
                {index + 1} / {pics.length}
              </span>
            </>
          )}
        </div>

        {pics.length > 1 && (
          <div ref={thumbs} className="flex gap-2 overflow-x-auto px-4 pt-3" aria-label="All photos">
            {pics.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index}
                className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition ${
                  i === index ? 'border-[#003B5C]' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        <div className="p-6 md:p-8">
          <p className="text-sm text-slate-500">{formatDate(item.date)}</p>
          <h2 className="mt-1 text-2xl font-bold text-[#003B5C]">{item.title}</h2>
          {item.content && (
            <p className="mt-4 text-slate-700 leading-relaxed whitespace-pre-line">{item.content}</p>
          )}
        </div>
      </div>
    </div>
  );
}