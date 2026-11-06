import React, { useMemo, useState } from 'react';
import { MONTHS, parseDate, usePosts, PostCard, PostModal } from '../Components/PostParts';

/* Layout follows the UVAS events archive:
   year tabs -> month filter -> card grid (picture with month badge, title, date) -> Load more.
   Posts are added from  Admin Dashboard > News & Events. */

const PAGE_SIZE = 9;

function NewsEvents() {
  const { items, loading, error } = usePosts('news');

  const years = useMemo(
    () => [...new Set(items.map((i) => parseDate(i.date).year))].sort((a, b) => b - a),
    [items]
  );

  const [pickedYear, setPickedYear] = useState(null);
  const year = pickedYear && years.includes(pickedYear) ? pickedYear : years[0];
  const [month, setMonth] = useState('all');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [open, setOpen] = useState(null);

  const monthsWithPosts = useMemo(() => {
    const set = new Set(items.filter((i) => parseDate(i.date).year === year).map((i) => parseDate(i.date).month));
    return [...set].sort((a, b) => a - b);
  }, [items, year]);

  const filtered = useMemo(
    () =>
      items.filter((i) => {
        const p = parseDate(i.date);
        return p.year === year && (month === 'all' || p.month === month);
      }),
    [items, year, month]
  );

  const pickYear = (y) => {
    setPickedYear(y);
    setMonth('all');
    setVisible(PAGE_SIZE);
  };
  const pickMonth = (m) => {
    setMonth(m);
    setVisible(PAGE_SIZE);
  };

  const chip = (active) =>
    `px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
      active
        ? 'bg-[#003B5C] text-white border-[#003B5C]'
        : 'bg-white text-[#003B5C] border-slate-300 hover:border-[#003B5C]'
    }`;

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <section className="bg-[#003B5C] text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold">News and Events{year ? ` ${year}` : ''}</h1>
          <p className="mt-4 max-w-2xl text-lg text-sky-100">
            Updates, workshops, awareness drives and community activities from ABC Autism Behavioral Center.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        {years.length > 0 && (
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Year">
            {years.map((y) => (
              <button key={y} role="tab" aria-selected={y === year} onClick={() => pickYear(y)} className={chip(y === year)}>
                {y}
              </button>
            ))}
          </div>
        )}

        {monthsWithPosts.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2" aria-label="Month">
            <button onClick={() => pickMonth('all')} className={chip(month === 'all')}>
              All months
            </button>
            {monthsWithPosts.map((m) => (
              <button key={m} onClick={() => pickMonth(m)} className={chip(month === m)}>
                {MONTHS[m]}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p className="mt-12 text-center text-slate-500">Loading...</p>
        ) : error ? (
          <p className="mt-12 text-center text-slate-500">Events could not be loaded right now. Please try again later.</p>
        ) : filtered.length === 0 ? (
          <p className="mt-12 text-center text-slate-500">No events posted yet. Please check back soon.</p>
        ) : (
          <>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.slice(0, visible).map((item) => (
                <PostCard key={item.id} item={item} onOpen={setOpen} />
              ))}
            </div>
            {visible < filtered.length && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="bg-[#003B5C] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#002a42] transition-colors"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {open && <PostModal item={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

export default NewsEvents;