import React, { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '../api';
import { MONTHS, parseDate, formatDate, picturesOf } from '../Components/PostParts';
import { CATEGORIES, categoryOf } from '../Components/CommunityParts';

/* Admin tab used for "News & Events" (section = 'news') and for the two
   Community Services sections: 'filtration' (ABC Filtration Plant) and 'cricket' (ABC Cricket Stadium).
   Each post can have up to 10 pictures; the first one is the cover. */

const MAX_PICS = 10;

const COPY = {
  news: {
    noun: 'event',
    listTitle: 'News & Events',
    heading: 'News & Events',
    help: 'Add an event or news item. It appears on the News & Events page with the month and date on the picture.',
  },
  filtration: {
    noun: 'post',
    listTitle: 'ABC Filtration Plant posts',
    heading: 'ABC Filtration Plant',
    help: 'Add a post for the ABC Filtration Plant section of the Community Services page. Visitors can open it to read more and see all photos.',
  },
  cricket: {
    noun: 'post',
    listTitle: 'ABC Cricket Stadium posts',
    heading: 'ABC Cricket Stadium',
    help: 'Add a post for the ABC Cricket Stadium section of the Community Services page. Visitors can open it to read more and see all photos.',
  },
};

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const EMPTY = (category) => ({ id: null, category, title: '', content: '', date: today(), images: [] });
const idFromUrl = (url) => Number(String(url).split('/').pop());

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
  const isCommunity = section === 'filtration' || section === 'cricket';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY(section));
  const [saving, setSaving] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const fileRef = useRef(null);
  const formRef = useRef(null);
  const fresh = useRef(new Set()); // pictures uploaded in this form but not saved yet
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

  const uploading = form.images.some((i) => i.uploading);

  // removes pictures that were uploaded but never saved
  const discardFresh = () => {
    fresh.current.forEach((id) => api('/admin/media/' + id, { method: 'DELETE' }).catch(() => {}));
    fresh.current = new Set();
  };

  const reset = (discard) => {
    if (discard) discardFresh();
    else fresh.current = new Set();
    setForm(EMPTY(section));
    if (fileRef.current) fileRef.current.value = '';
  };

  const pick = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (!files.length) return;
    const room = MAX_PICS - form.images.length;
    if (room <= 0) return say(`You can add up to ${MAX_PICS} pictures.`);
    if (files.length > room) say(`Only ${room} more picture${room === 1 ? '' : 's'} can be added.`);

    for (const file of files.slice(0, room)) {
      const key = `n${Date.now()}${Math.random()}`;
      try {
        const out = await compressImage(file);
        setForm((f) => ({ ...f, images: [...f.images, { key, src: out.preview, uploading: true }] }));
        const r = await api('/admin/media', { method: 'POST', body: JSON.stringify({ data: out.data }) });
        fresh.current.add(r.id);
        setForm((f) => ({
          ...f,
          images: f.images.map((i) => (i.key === key ? { ...i, id: r.id, uploading: false } : i)),
        }));
      } catch (err) {
        say(err.message);
        setForm((f) => ({ ...f, images: f.images.filter((i) => i.key !== key) }));
      }
    }
  };

  const removePicture = (img) => {
    if (img.id && fresh.current.has(img.id)) {
      fresh.current.delete(img.id);
      api('/admin/media/' + img.id, { method: 'DELETE' }).catch(() => {});
    }
    setForm((f) => ({ ...f, images: f.images.filter((i) => i.key !== img.key) }));
  };

  // swaps one picture for another file, keeping its place in the order
  const replacePicture = async (img, file) => {
    if (!file) return;
    try {
      const out = await compressImage(file);
      setForm((f) => ({ ...f, images: f.images.map((i) => (i.key === img.key ? { ...i, src: out.preview, uploading: true } : i)) }));
      const r = await api('/admin/media', { method: 'POST', body: JSON.stringify({ data: out.data }) });
      if (img.id && fresh.current.has(img.id)) {
        fresh.current.delete(img.id);
        api('/admin/media/' + img.id, { method: 'DELETE' }).catch(() => {});
      }
      fresh.current.add(r.id);
      setForm((f) => ({ ...f, images: f.images.map((i) => (i.key === img.key ? { ...i, id: r.id, uploading: false } : i)) }));
    } catch (err) {
      say(err.message);
      setForm((f) => ({ ...f, images: f.images.map((i) => (i.key === img.key ? { ...img, uploading: false } : i)) }));
    }
  };

  const makeCover = (img) =>
    setForm((f) => ({ ...f, images: [img, ...f.images.filter((i) => i.key !== img.key)] }));

  const save = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return say('Please write a title');
    if (uploading) return say('Please wait, pictures are still uploading');
    setSaving(true);
    try {
      const category = isCommunity ? form.category : section;
      const body = {
        section: category,
        title: form.title,
        content: form.content,
        date: form.date,
        images: form.images.map((i) => i.id),
      };
      if (form.id) await api('/admin/posts/' + form.id, { method: 'PUT', body: JSON.stringify(body) });
      else await api('/admin/posts', { method: 'POST', body: JSON.stringify(body) });
      const moved = category !== section ? ` in ${categoryOf(category).label}` : '';
      say((form.id ? 'Changes saved ✓' : 'Published ✓') + moved);
      reset(false);
      load();
    } catch (err) {
      say(err.message);
    }
    setSaving(false);
  };

  const edit = (p) => {
    discardFresh();
    setForm({
      id: p.id,
      category: p.section || section,
      title: p.title,
      content: p.content,
      date: p.date,
      images: picturesOf(p).map((src) => ({ key: src, id: idFromUrl(src), src })),
    });
    if (fileRef.current) fileRef.current.value = '';
    formRef.current && formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const del = async (id) => {
    try {
      await api('/admin/posts/' + id, { method: 'DELETE' });
      say('Deleted');
      if (form.id === id) reset(true);
      setConfirmId(null);
      load();
    } catch (err) {
      say(err.message);
    }
  };

  const field = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#1CA7C7] focus:ring-2 focus:ring-[#1CA7C7]/20';
  const monthName = form.date ? MONTHS[parseDate(form.date).month] : '';
  const cover = form.images[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,440px)_minmax(0,1fr)]">
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

          {isCommunity && (
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-500" htmlFor={`cat-${section}`}>
                Community Services Category
              </label>
              <select id={`cat-${section}`} className={field} value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
              {form.category !== section && (
                <p className="mt-1 text-xs text-[#F5456B]">
                  This post will be saved in {categoryOf(form.category).label}, not in this list.
                </p>
              )}
            </div>
          )}

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
            <div className="mb-1 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-500">Pictures</p>
              <p className="text-xs text-slate-400">{form.images.length} / {MAX_PICS}</p>
            </div>

            {/* cover preview, as it will look on the website card */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50">
              {cover ? (
                <img src={cover.src} alt="Cover preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-400">No picture chosen</div>
              )}
              <Badge date={form.date} />
              {form.images.length > 1 && (
                <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white">
                  {form.images.length} photos
                </span>
              )}
            </div>

            {form.images.length > 0 && (
              <ul className="mt-3 grid grid-cols-3 gap-2">
                {form.images.map((img, i) => (
                  <li key={img.key} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <div className="relative aspect-square bg-slate-100">
                      <img src={img.src} alt="" className="h-full w-full object-cover" />
                      {img.uploading && (
                        <span className="absolute inset-0 flex items-center justify-center bg-white/70 text-xs font-semibold text-[#003B5C]">
                          Uploading...
                        </span>
                      )}
                      {i === 0 && !img.uploading && (
                        <span className="absolute left-1 top-1 rounded-md bg-[#F5456B] px-1.5 py-0.5 text-[10px] font-bold text-white">
                          Cover
                        </span>
                      )}
                    </div>
                    <div className="divide-y divide-slate-100 text-[11px] font-semibold">
                      <div className="flex divide-x divide-slate-100">
                        {i !== 0 ? (
                          <button type="button" disabled={img.uploading} onClick={() => makeCover(img)}
                            className="flex-1 py-1.5 text-[#1CA7C7] hover:bg-slate-50 disabled:opacity-40">
                            Make cover
                          </button>
                        ) : (
                          <span className="flex-1 py-1.5 text-center text-slate-300">Main</span>
                        )}
                        <label className={`flex-1 cursor-pointer py-1.5 text-center text-[#003B5C] hover:bg-slate-50 ${img.uploading ? 'pointer-events-none opacity-40' : ''}`}>
                          Replace
                          <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only"
                            onChange={(e) => { const f = e.target.files && e.target.files[0]; e.target.value = ''; replacePicture(img, f); }} />
                        </label>
                      </div>
                      <button type="button" disabled={img.uploading} onClick={() => removePicture(img)}
                        className="block w-full py-1.5 text-[#F5456B] hover:bg-slate-50 disabled:opacity-40">
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-3">
              <label
                className={`inline-block cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold text-white transition ${
                  form.images.length >= MAX_PICS ? 'bg-slate-300' : 'bg-[#003B5C] hover:bg-[#02263b]'
                }`}
              >
                {form.images.length ? 'Add more pictures' : 'Choose pictures'}
                <input ref={fileRef} type="file" multiple accept="image/jpeg,image/png,image/webp" className="sr-only"
                  disabled={form.images.length >= MAX_PICS} onChange={pick} />
              </label>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Select one or many (up to {MAX_PICS}). JPG, PNG or WebP. The Cover picture shows on the card; visitors see all pictures when they open the post.
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <button type="submit" disabled={saving || uploading}
              className="flex-1 rounded-xl bg-gradient-to-r from-[#F5456B] to-[#F5A623] py-3 text-sm font-bold text-white shadow-lg shadow-[#F5456B]/25 transition hover:-translate-y-0.5 disabled:opacity-60">
              {saving ? 'Saving...' : uploading ? 'Uploading...' : form.id ? 'Save changes' : 'Publish'}
            </button>
            {(form.id || form.images.length > 0 || form.title) && (
              <button type="button" onClick={() => reset(true)}
                className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-200">
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* ---------- list ---------- */}
      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-[#003B5C]">Published {copy.listTitle}</h3>
        <p className="mt-0.5 text-xs text-slate-400">{items.length} item{items.length === 1 ? '' : 's'}, newest first</p>

        {loading ? (
          <p className="mt-6 text-sm text-slate-400">Loading...</p>
        ) : items.length === 0 ? (
          <p className="mt-6 rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-500">
            Nothing here yet. Use the form to add the first {copy.noun}.
          </p>
        ) : (
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {items.map((p) => {
              const pics = picturesOf(p);
              return (
                <li key={p.id} className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
                  <div className="relative aspect-[4/3] bg-[#003B5C]/10">
                    {pics[0] ? (
                      <img src={pics[0]} alt="" className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-3xl font-bold text-[#003B5C]/25">ABC</div>
                    )}
                    <Badge date={p.date} />
                    {pics.length > 1 && (
                      <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] text-white">
                        {pics.length} photos
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-[#003B5C]">{p.title}</p>
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
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}