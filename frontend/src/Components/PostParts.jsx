import React, { useEffect, useState } from 'react';
import { api } from '../api';

/* Shared pieces for the News & Events and Community Services pages.
   Posts come from the admin dashboard: { id, title, content, date: 'YYYY-MM-DD', image } */

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const parseDate = (iso) => {
  const [y, m, d] = String(iso).split('-').map(Number);
  return { year: y, month: m - 1, day: d };
};

export const formatDate = (iso) => {
  const { year, month, day } = parseDate(iso);
  return `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
};

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

export function PostCard({ item, onOpen }) {
  return (
    <article className="bg-white rounded-xl overflow-hidden border border-slate-200 flex flex-col">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="relative block aspect-[4/3] bg-[#003B5C]/10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003B5C]"
        aria-label={`Read: ${item.title}`}
      >
        {item.image ? (
          <img src={item.image} alt="" className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#003B5C]/30 text-5xl font-bold">
            ABC
          </div>
        )}
        <DateBadge date={item.date} className="top-3 left-3" />
      </button>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-[#003B5C] leading-snug">
          <button type="button" onClick={() => onOpen(item)} className="text-left hover:underline">
            {item.title}
          </button>
        </h3>
        <p className="mt-auto pt-4 text-sm text-slate-500">{formatDate(item.date)}</p>
      </div>
    </article>
  );
}

export function PostModal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

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
        <div className="relative aspect-[16/9] bg-[#003B5C]/10">
          {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
          <DateBadge date={item.date} className="top-4 left-4" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#003B5C] rounded-full w-9 h-9 font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>
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
