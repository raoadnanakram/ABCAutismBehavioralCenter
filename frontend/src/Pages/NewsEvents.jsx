import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Sparkles, 
  Search, 
  Filter, 
  X, 
  ChevronRight, 
  BookOpen 
} from 'lucide-react';
import { MONTHS, parseDate, usePosts, PostCard, PostModal } from '../Components/PostParts';

/* ==========================================================================
   ABC Autism & Behavioral Center - News & Events Page
   Colors: Navy (#003B5C) | Cyan (#00A8CD) | Pink (#FF5271) | Yellow (#F5A623)
   ========================================================================== */

const PAGE_SIZE = 9;

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

function NewsEvents() {
  const { items = [], loading, error } = usePosts('news');

  // Safely Extract Unique Years (Prevents Runtime crash on undefined dates)
  const years = useMemo(
    () => [...new Set((items || []).map((i) => parseDate(i?.date || '').year))].filter(Boolean).sort((a, b) => b - a),
    [items]
  );

  const [pickedYear, setPickedYear] = useState(null);
  const year = pickedYear && years.includes(pickedYear) ? pickedYear : (years[0] || null);
  const [month, setMonth] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [open, setOpen] = useState(null);

  // Extract months containing posts for the selected year
  const monthsWithPosts = useMemo(() => {
    if (!year) return [];
    const set = new Set(
      (items || [])
        .filter((i) => parseDate(i?.date || '').year === year)
        .map((i) => parseDate(i?.date || '').month)
    );
    return [...set].sort((a, b) => a - b);
  }, [items, year]);

  // Safe Multi-level Filter (Year + Month + Search)
  const filtered = useMemo(
    () =>
      (items || []).filter((i) => {
        const p = parseDate(i?.date || '');
        const matchesYear = p.year === year;
        const matchesMonth = month === 'all' || p.month === month;
        const matchesSearch = searchQuery === '' || 
          i.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
          i.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.summary?.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesYear && matchesMonth && matchesSearch;
      }),
    [items, year, month, searchQuery]
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

  return (
    <div className="bg-[#00263B] min-h-screen font-sans text-slate-100 selection:bg-[#FF5271] selection:text-white overflow-x-hidden">
      
      {/* =========================================================================
          1. HERO SECTION
         ========================================================================= */}
      <section className="relative w-full bg-gradient-to-br from-[#00263B] via-[#003B5C] to-[#00A8CD]/20 py-20 lg:py-28 px-6 text-center overflow-hidden border-b border-white/10">
        
        {/* Animated Background Glowing Blobs */}
        <motion.div 
          animate={{ scale: [1, 1.25, 1], x: [0, 40, 0], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-[450px] h-[450px] bg-[#F5A623]/20 rounded-full blur-[130px] pointer-events-none"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-[#FF5271]/20 rounded-full blur-[140px] pointer-events-none"
        />

        <div className="max-w-5xl mx-auto space-y-6 relative z-10">
          
          {/* Eyebrow Pill */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#00A8CD] text-xs font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-lg">
              <Sparkles className="w-4 h-4 text-[#F5A623] animate-pulse" />
              COMMUNITY & CENTER HIGHLIGHTS
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white"
          >
            News & Events <span className="text-[#F5A623]">{year ? `${year}` : ''}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-slate-200 text-base sm:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            Discover our latest updates, interactive workshops, awareness drives, and parent-caregiver community events at ABC Autism Behavioral Center.
          </motion.p>
        </div>
      </section>

      {/* =========================================================================
          2. FILTER BAR & SEARCH CONTROLS
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <div className="bg-[#003B5C]/70 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl space-y-6">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
            
            {/* Year Selection Tabs */}
            {years.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto" role="tablist" aria-label="Year Selection">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 mr-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#00A8CD]" /> Year:
                </span>
                {years.map((y) => (
                  <motion.button 
                    key={y} 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    role="tab" 
                    aria-selected={y === year} 
                    onClick={() => pickYear(y)} 
                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md ${
                      y === year
                        ? 'bg-gradient-to-r from-[#FF5271] to-[#e6405f] text-white shadow-[#FF5271]/30 border border-white/20'
                        : 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/10'
                    }`}
                  >
                    {y}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Live Search Bar */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#00263B] border border-white/10 rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#00A8CD] transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

          {/* Month Chips */}
          {monthsWithPosts.length > 0 && (
            <div className="flex flex-wrap items-center gap-2" aria-label="Month Filter">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 mr-2 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#F5A623]" /> Month:
              </span>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => pickMonth('all')} 
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  month === 'all'
                    ? 'bg-[#00A8CD] text-white shadow-lg shadow-[#00A8CD]/30 font-bold border border-white/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                All Months
              </motion.button>

              {monthsWithPosts.map((m) => (
                <motion.button 
                  key={m} 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => pickMonth(m)} 
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    month === m
                      ? 'bg-[#00A8CD] text-white shadow-lg shadow-[#00A8CD]/30 font-bold border border-white/20'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {MONTHS[m]}
                </motion.button>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* =========================================================================
          3. POSTS GRID & MODAL
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        
        {loading ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#00A8CD] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-400 text-sm font-medium">Loading upcoming news & events...</p>
          </div>
        ) : error ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-4 bg-white/5 rounded-3xl p-8 border border-white/10">
            <div className="w-12 h-12 rounded-full bg-[#FF5271]/20 text-[#FF5271] flex items-center justify-center mx-auto text-xl font-bold">!</div>
            <p className="text-slate-200 font-bold text-base">Events Could Not Be Loaded</p>
            <p className="text-slate-400 text-xs">Please try again later or check your network.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-4 bg-white/5 rounded-3xl p-8 border border-white/10">
            <BookOpen className="w-12 h-12 text-[#F5A623] mx-auto opacity-80" />
            <p className="text-slate-200 font-bold text-base">No Events Found</p>
            <p className="text-slate-400 text-xs">Try selecting a different year/month or clearing your search term.</p>
          </div>
        ) : (
          <>
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.slice(0, visible).map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#003B5C] rounded-3xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl hover:border-[#00A8CD]/50 transition-all group flex flex-col justify-between"
                >
                  <PostCard item={item} onOpen={setOpen} />
                </motion.div>
              ))}
            </motion.div>

            {/* Load More Button */}
            {visible < filtered.length && (
              <div className="mt-14 text-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="bg-gradient-to-r from-[#FF5271] to-[#e6405f] text-white px-10 py-4 rounded-full font-bold text-sm shadow-xl shadow-[#FF5271]/30 border border-white/20 transition-all inline-flex items-center gap-2"
                >
                  <span>Load More Events</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </>
        )}

      </section>

      {/* Dynamic Detail Modal */}
      <AnimatePresence>
        {open && <PostModal item={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>

    </div>
  );
}

export default NewsEvents;