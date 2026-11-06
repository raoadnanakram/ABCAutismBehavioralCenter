import React, { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '../api';
import { MONTHS, parseDate, formatDate } from '../Components/PostParts';

/* Admin tab used for both "News & Events" (section = 'news')
   and "Community Services" (section = 'community'). */

const COPY = {
  news: {
    noun: 'event',
    heading: 'News & Events',
    help: 'Add an event or news item. It appears on the News & Events page with the month and date on the picture.',
  },
  community: {
    noun: 'update',
    heading: 'Community Services',
    help: 'Add a photo and update. It appears on the Community Services page with the month and date on the picture.',
  },
};

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const EMPTY = () => ({ id: null, title: '', content: '', date: today(), image: '', imageData: '', removeImage: false });

// Shrinks the picture in the browser (max 1600px, JPEG) so uploads stay small and fast.
function compressImage(file) {
  return new Promise((resolve, reject) => {
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return reject(new Error('Only JPG, PNG or WebP pictures are allowed.'));
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const max = 1600;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      const dataUrl = c.toDataURL('image/jpeg', 0.85);
      resolve({ preview: dataUrl, data: dataUrl.split(',')[1] });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('This picture could not be read.'));
    };
    img.src = url;
  });
}

function Badge({ date }) {
  if (!date) return null;
  const { month, day } = parseDate(date);
  return (
    <span className="absolute left-2 top-2 rounded-lg bg-[#003B5C] px-2.5 py-1 text-center leading-tight text-white shadow">
      <span className="block text-[10px]">{MONTHS[month]}</span>
      <span className="block text-base font-bold">{String(day).padStart(2, '0')}</span>
    </span>
  );
}

export default function AdminPosts({ section, say }) {
  const copy = COPY[section];
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY());
  const [saving, setSaving] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const fileRef = useRef(null);
  const formRef = useRef(null);
  const sayRef = useRef(say);
  useEffect(() => {
    sayRef.current = say;
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await api('/posts?section=' + section));
    } catch (e) {
      sayRef.current(e.message);
    }
    setLoading(false);
  }, [section]);

  useEffect(() => {
    load();
  }, [load]);

  const reset = () => {
    setForm(EMPTY());
    if (fileRef.current) fileRef.current.value = '';
  };

  const pick = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const out = await compressImage(file);
      setForm((f) => ({ ...f, image: out.preview, imageData: out.data, removeImage: false }));
    } catch (err) {
      say(err.message);
      e.target.value = '';
    }
  };

  const removePicture = () => {
    setForm((f) => ({ ...f, image: '', imageData: '', removeImage: true }));
    if (fileRef.current) fileRef.current.value = '';
  };

  const save = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return say('Please write a title');
    setSaving(true);
    try {
      const body = { section, title: form.title, content: form.content, date: form.date };
      if (form.imageData) body.image = { data: form.imageData };
      if (form.removeImage) body.removeImage = true;
      if (form.id) await api('/admin/posts/' + form.id, { method: 'PUT', body: JSON.stringify(body) });
      else await api('/admin/posts', { method: 'POST', body: JSON.stringify(body) });
      say(form.id ? 'Changes saved ✓' : 'Published ✓');
      reset();
      load();
    } catch (err) {
      say(err.message);
    }
    setSaving(false);
  };

  const edit = (p) => {
    setForm({ id: p.id, title: p.title, content: p.content, date: p.date, image: p.image, imageData: '', removeImage: false });
    if (fileRef.current) fileRef.current.value = '';
    formRef.current && formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const del = async (id) => {
    try {
      await api('/admin/posts/' + id, { method: 'DELETE' });
      say('Deleted');
      if (form.id === id) reset();
      setConfirmId(null);
      load();
    } catch (err) {
      say(err.message);
    }
  };

  const field = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#1CA7C7] focus:ring-2 focus:ring-[#1CA7C7]/20';
  const monthName = form.date ? MONTHS[parseDate(form.date).month] : '';

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
      {/* ---------- form ---------- */}
      <section ref={formRef} className="h-fit rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-[#003B5C]">
          {form.id ? `Edit ${copy.noun}` : `Add new ${copy.noun}`}
        </h3>
        <p className="mt-0.5 text-xs text-slate-400">{copy.help}</p>

        <form onSubmit={save} className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500" htmlFor={`t-${section}`}>Title</label>
            <input id={`t-${section}`} className={field} maxLength={200} value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Short, clear title" />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500" htmlFor={`d-${section}`}>
              Date {monthName && <span className="font-normal text-slate-400">(shows as {monthName} on the picture)</span>}
            </label>
            <input id={`d-${section}`} type="date" className={field} value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500" htmlFor={`c-${section}`}>Details</label>
            <textarea id={`c-${section}`} rows={6} className={field} maxLength={8000} value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Write what happened..." />
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold text-slate-500">Picture</p>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50">
              {form.image ? (
                <img src={form.image} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-400">No picture chosen</div>
              )}
              <Badge date={form.date} />
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <label className="cursor-pointer rounded-xl bg-[#003B5C] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#02263b]">
                {form.image ? 'Change picture' : 'Choose picture'}
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={pick} />
              </label>
              {form.image && (
                <button type="button" onClick={removePicture}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200">
                  Remove picture
                </button>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-400">JPG, PNG or WebP. Large pictures are shrunk automatically.</p>
          </div>

          <div className="flex gap-2 pt-1">
            <button type="submit" disabled={saving}
              className="flex-1 rounded-xl bg-gradient-to-r from-[#F5456B] to-[#F5A623] py-3 text-sm font-bold text-white shadow-lg shadow-[#F5456B]/25 transition hover:-translate-y-0.5 disabled:opacity-60">
              {saving ? 'Saving...' : form.id ? 'Save changes' : 'Publish'}
            </button>
            {form.id && (
              <button type="button" onClick={reset}
                className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-200">
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* ---------- list ---------- */}
      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-[#003B5C]">Published {copy.heading}</h3>
        <p className="mt-0.5 text-xs text-slate-400">{items.length} item{items.length === 1 ? '' : 's'}, newest first</p>

        {loading ? (
          <p className="mt-6 text-sm text-slate-400">Loading...</p>
        ) : items.length === 0 ? (
          <p className="mt-6 rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-500">
            Nothing here yet. Use the form to add the first {copy.noun}.
          </p>
        ) : (
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {items.map((p) => (
              <li key={p.id} className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
                <div className="relative aspect-[4/3] bg-[#003B5C]/10">
                  {p.image ? (
                    <img src={p.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-3xl font-bold text-[#003B5C]/25">ABC</div>
                  )}
                  <Badge date={p.date} />
                </div>
                <div className="p-4">
                  <p className="line-clamp-2 text-sm font-semibold text-[#003B5C]">{p.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{formatDate(p.date)}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button onClick={() => edit(p)}
                      className="rounded-lg bg-[#1CA7C7]/10 px-3 py-1.5 text-xs font-semibold text-[#1CA7C7] transition hover:bg-[#1CA7C7]/20">
                      Edit
                    </button>
                    {confirmId === p.id ? (
                      <>
                        <button onClick={() => del(p.id)}
                          className="rounded-lg bg-[#F5456B] px-3 py-1.5 text-xs font-semibold text-white">Yes, delete</button>
                        <button onClick={() => setConfirmId(null)}
                          className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">No</button>
                      </>
                    ) : (
                      <button onClick={() => setConfirmId(p.id)}
                        className="rounded-lg bg-[#F5456B]/10 px-3 py-1.5 text-xs font-semibold text-[#F5456B] transition hover:bg-[#F5456B]/20">
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
