import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  // All 9 Specialized Services Array for ABC Autism Behavioral Center
  const serviceDropdownLinks = [
    { name: 'Speech & Language Therapy', path: '/services/speech-therapy' },
    { name: 'Nutrition Therapy & Dietetics', path: '/services/nutrition-dietetics' },
    { name: 'Special Education', path: '/services/special-education' },
    { name: 'Physiotherapy', path: '/services/physiotherapy' },
    { name: 'Occupational Therapy & Sensory Integration', path: '/services/occupational-therapy' },
    { name: 'Day Care', path: '/services/day-care' },
    { name: 'Montessori & Early Childhood Education', path: '/services/montessori-education' },
    { name: 'Dysphagia Management & NG Tube Feeding', path: '/services/dysphagia-management' },
    { name: 'ABA Therapy & Psychology', path: '/services/aba-psychology' },
  ];

  // About Us Dropdown links array
  const aboutDropdownLinks = [
    { name: 'Our Team', path: '/about/our-team' },
  ];

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 shadow-md transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo Section - Logo.PNG path updated */}
          <Link to="/" className="flex items-center group">
            <motion.img 
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              src="/Logo.png" 
              alt="ABC Autism Behavioral Center" 
              className="h-14 sm:h-16 md:h-18 w-auto object-contain drop-shadow-sm" 
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 text-base font-semibold text-[#003B5C]">
            
            <Link to="/" className="relative group py-1 hover:text-[#00A8CD] transition-colors duration-200">
              Home
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00A8CD] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* --- About Us Dropdown Section --- */}
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

              {/* Animated About Dropdown Menu Box */}
              <AnimatePresence>
                {isAboutDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full -left-4 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 mt-2 overflow-hidden"
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

            {/* --- Services Dropdown Section --- */}
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

              {/* Animated Services Dropdown Menu Box */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
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

            <Link to="/contact" className="relative group py-1 hover:text-[#00A8CD] transition-colors duration-200">
              Contact
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00A8CD] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Desktop Custom CTA Button */}
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

          {/* Mobile Menu Icon */}
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

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white px-6 pt-3 pb-6 space-y-3 shadow-xl border-b border-slate-200 max-h-[85vh] overflow-y-auto"
          >
            <Link to="/" onClick={() => setIsOpen(false)} className="block text-[#003B5C] hover:text-[#00A8CD] font-semibold py-2 transition-colors border-b border-slate-100">Home</Link>
            
            {/* Mobile About Us & Sub-links */}
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
            
            {/* Mobile Services & Sub-links */}
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
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-[#003B5C] hover:text-[#00A8CD] font-semibold py-2 transition-colors border-b border-slate-100">Contact</Link>
            
            {/* Mobile Button */}
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
  );
}

export default Navbar;