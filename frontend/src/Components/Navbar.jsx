// src/Components/Navbar.jsx
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { searchablePages } from '../data/searchData';

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  // Search States
  const [query, setQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);

  // 1. Navigation Links Arrays
  const serviceDropdownLinks = [
    { name: 'Speech & Language Therapy', path: '/Pages/speech-therapy' },
    { name: 'Nutrition Therapy & Dietetics', path: '/Pages/nutrition-dietetics' },
    { name: 'Special Education', path: '/Pages/special-education' },
    { name: 'Physiotherapy', path: '/Pages/physiotherapy' },
    { name: 'Occupational Therapy & Sensory Integration', path: '/Pages/occupational-therapy' },
    { name: 'Day Care', path: '/Pages/day-care' },
    { name: 'Montessori & Early Childhood Education', path: '/Pages/montessori-education' },
    { name: 'Dysphagia Management & NG Tube Feeding', path: '/Pages/dysphagia-management' },
    { name: 'ABA Therapy & Psychology', path: '/Pages/aba-psychology' },
  ];

  const aboutDropdownLinks = [
    { name: 'Our Team', path: '/about/our-team' },
  ];

  const topBarTexts = ['Al Rehman Garden', 'Sadar Cantt'];

  const socialLinks = [
    { label: 'Facebook', icon: 'fa-brands fa-facebook-f', href: 'https://facebook.com/ABCAutismBehavioralCenter', bg: '#1877F2', color: '#ffffff' },
    { label: 'Instagram', icon: 'fa-brands fa-instagram', href: 'https://instagram.com/abcautismbehavioral', isGradient: true, color: '#ffffff' },
    { label: 'WhatsApp', icon: 'fa-brands fa-whatsapp', href: 'https://wa.me/923001234567', bg: '#25D366', color: '#ffffff' },
    { label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', href: 'https://linkedin.com/in/abcautismbehavioralcenter', bg: '#0A66C2', color: '#ffffff' },
  ];

  // 2. Fuse.js Instance Setup
  const fuse = useMemo(() => {
    return new Fuse(searchablePages, {
      keys: ['name', 'tags', 'category'],
      threshold: 0.35, // Typos aur flexible matching ke liye setting
      distance: 100,
    });
  }, []);

  // 3. Real-Time Fuse Search Results Filter
  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return fuse.search(q).map((res) => res.item).slice(0, 6);
  }, [query, fuse]);

  const goTo = (path) => {
    navigate(path);
    setQuery('');
    setIsSearchFocused(false);
    setIsOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      goTo(results[0].path);
    }
  };

  // Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search Box Component
  const SearchBox = ({ className = '' }) => (
    <div ref={searchContainerRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} role="search" className="flex items-center bg-white/10 hover:bg-white/15 focus-within:bg-white/20 rounded-lg transition-all border border-white/20">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          placeholder="Search therapies, conditions..."
          aria-label="Search the site"
          className="w-full bg-transparent text-white placeholder-white/70 text-xs sm:text-sm font-medium px-3 py-1.5 focus:outline-none"
        />
        {query && (
          <button 
            type="button" 
            onClick={() => setQuery('')} 
            className="px-2 text-white/70 hover:text-white text-xs transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
        <button type="submit" aria-label="Search" className="px-3 text-white/80 hover:text-white transition-colors">
          <i className="fa-solid fa-magnifying-glass text-xs"></i>
        </button>
      </form>

      {/* Floating Real-Time Dropdown */}
      <AnimatePresence>
        {isSearchFocused && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[100]"
          >
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span>Matching Results ({results.length})</span>
              <span className="text-[#00A8CD]">Fuse.js Engine</span>
            </div>

            {results.length > 0 ? (
              <ul className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {results.map((item) => (
                  <li key={item.path}>
                    <button
                      type="button"
                      onClick={() => goTo(item.path)}
                      className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors group"
                    >
                      <div>
                        <p className="text-sm font-bold text-[#003B5C] group-hover:text-[#00A8CD] transition-colors">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium">
                          {item.path}
                        </p>
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 group-hover:bg-[#003B5C] group-hover:text-white transition-all flex-shrink-0">
                        {item.category}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-6 text-center space-y-1">
                <i className="fa-solid fa-magnifying-glass text-slate-300 text-xl mb-1 block"></i>
                <p className="text-xs font-bold text-slate-600">No results found for "{query}"</p>
                <p className="text-[11px] text-slate-400">Try searching for ABA, Speech, OT, or Conditions</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {/* ===== Top Bar ===== */}
      <div className="bg-[#003B5C] relative z-[60] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-5">
          <div className="hidden md:flex items-center gap-4 text-xs tracking-wider uppercase font-semibold text-white/90">
            {topBarTexts.map((text, idx) => (
              <React.Fragment key={text}>
                <span>{text}</span>
                {idx < topBarTexts.length - 1 && <span className="w-1 h-1 rounded-full bg-[#FF5271]"></span>}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    background: s.isGradient
                      ? 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
                      : s.bg,
                    color: s.color,
                  }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs transition-transform duration-200 hover:scale-110 shadow-sm focus:outline-none"
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>

            <SearchBox className="w-48 sm:w-64" />
          </div>
        </div>
      </div>

      {/* ===== Main Navbar ===== */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 shadow-md transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <Link to="/" className="flex items-center group">
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                src="/Logo.png"
                alt="ABC Autism Behavioral Center"
                className="h-14 sm:h-16 md:h-18 w-auto object-contain drop-shadow-sm"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm xl:text-base font-semibold text-[#003B5C]">
              <Link to="/" className="relative group py-1 hover:text-[#00A8CD] transition-colors duration-200">
                Home
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00A8CD] transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {/* About Us Dropdown */}
              <div
                className="relative py-1"
                onMouseEnter={() => setIsAboutDropdownOpen(true)}
                onMouseLeave={() => setIsAboutDropdownOpen(false)}
              >
                <Link to="/about" className="relative group hover:text-[#00A8CD] transition-colors duration-200 flex items-center gap-1.5 cursor-pointer">
                  About Us
                  <motion.i
                    animate={{ rotate: isAboutDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="fa-solid fa-chevron-down text-xs text-slate-400 group-hover:text-[#00A8CD]"
                  ></motion.i>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00A8CD] transition-all duration-300 group-hover:w-full"></span>
                </Link>

                <AnimatePresence>
                  {isAboutDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full -left-4 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 mt-2 overflow-hidden"
                    >
                      {aboutDropdownLinks.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          onClick={() => setIsAboutDropdownOpen(false)}
                          className="block px-5 py-2.5 text-sm text-[#003B5C] hover:bg-slate-50 hover:text-[#00A8CD] font-medium transition-colors border-b border-slate-50 last:border-none"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services Dropdown */}
              <div
                className="relative py-1"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link to="/services" className="relative group hover:text-[#00A8CD] transition-colors duration-200 flex items-center gap-1.5 cursor-pointer">
                  Services
                  <motion.i
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="fa-solid fa-chevron-down text-xs text-slate-400 group-hover:text-[#00A8CD]"
                  ></motion.i>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00A8CD] transition-all duration-300 group-hover:w-full"></span>
                </Link>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full -left-4 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 mt-2 overflow-hidden max-h-[80vh] overflow-y-auto"
                    >
                      {serviceDropdownLinks.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          onClick={() => setIsDropdownOpen(false)}
                          className="block px-5 py-2.5 text-sm text-[#003B5C] hover:bg-slate-50 hover:text-[#00A8CD] font-medium transition-colors border-b border-slate-50 last:border-none"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/conditions" className="relative group py-1 hover:text-[#00A8CD] transition-colors duration-200">
                Conditions
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00A8CD] transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link to="/news-events" className="relative group py-1 hover:text-[#00A8CD] transition-colors duration-200 whitespace-nowrap">
                News &amp; Events
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00A8CD] transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link to="/community-services" className="relative group py-1 hover:text-[#00A8CD] transition-colors duration-200 whitespace-nowrap">
                Community Services
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00A8CD] transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link to="/contact" className="relative group py-1 hover:text-[#00A8CD] transition-colors duration-200 whitespace-nowrap">
                Contact
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00A8CD] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            <div className="hidden lg:flex items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/book-a-free-consult"
                  className="block relative bg-[#003B5C] hover:bg-[#FF5271] text-white text-sm font-bold px-7 py-3 rounded-full transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:shadow-[#FF5271]/30 border border-white/10 text-center"
                >
                  Book Appointment
                </Link>
              </motion.div>
            </div>

            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl text-[#003B5C] hover:text-[#00A8CD] hover:bg-slate-100 transition-all focus:outline-none text-2xl"
                aria-label="Toggle Menu"
              >
                <i className={`fa-solid ${isOpen ? 'fa-xmark rotate-90' : 'fa-bars'} transition-transform duration-300`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden bg-white px-6 pt-3 pb-6 space-y-3 shadow-xl border-b border-slate-200 max-h-[85vh] overflow-y-auto"
            >
              <Link to="/" onClick={() => setIsOpen(false)} className="block text-[#003B5C] hover:text-[#00A8CD] font-semibold py-2 transition-colors border-b border-slate-100">Home</Link>

              <Link to="/about" onClick={() => setIsOpen(false)} className="block text-[#003B5C] hover:text-[#00A8CD] font-semibold py-2 transition-colors">About Us</Link>
              <div className="pl-4 border-l-2 border-[#00A8CD]/30 space-y-2 mb-3">
                {aboutDropdownLinks.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block py-1.5 text-sm text-slate-600 hover:text-[#00A8CD] font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link to="/services" onClick={() => setIsOpen(false)} className="block text-[#003B5C] hover:text-[#00A8CD] font-semibold py-2 transition-colors">Services</Link>
              <div className="pl-4 border-l-2 border-[#00A8CD]/30 space-y-2 mb-3">
                {serviceDropdownLinks.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block py-1.5 text-sm text-slate-600 hover:text-[#00A8CD] font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link to="/conditions" onClick={() => setIsOpen(false)} className="block text-[#003B5C] hover:text-[#00A8CD] font-semibold py-2 transition-colors border-b border-slate-100">Conditions</Link>
              <Link to="/news-events" onClick={() => setIsOpen(false)} className="block text-[#003B5C] hover:text-[#00A8CD] font-semibold py-2 transition-colors border-b border-slate-100">News &amp; Events</Link>
              <Link to="/community-services" onClick={() => setIsOpen(false)} className="block text-[#003B5C] hover:text-[#00A8CD] font-semibold py-2 transition-colors border-b border-slate-100">Community Services</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-[#003B5C] hover:text-[#00A8CD] font-semibold py-2 transition-colors border-b border-slate-100">Contact</Link>

              <div className="pt-3">
                <Link
                  to="/book-a-free-consult"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#003B5C] hover:bg-[#FF5271] text-white text-base font-bold px-8 py-3.5 rounded-full shadow-lg shadow-[#003B5C]/20 transition-all duration-300 text-center block"
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

export default Navbar;