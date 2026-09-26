import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#757575] text-slate-100 pt-16 pb-12 border-t border-slate-600 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-slate-600/60">
          
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Link to="/" className="inline-block group">
                <img 
                  src="/Logo.png" 
                  alt="Rex Medical Centre" 
                  className="h-14 sm:h-16 w-auto transform group-hover:scale-105 transition-all duration-300 filter brightness-125" 
                />
              </Link>
            </div>
            <p className="text-sm leading-relaxed text-slate-100 font-normal">
              Providing professional child therapy, modern developmental support, and expert clinical care with utmost integrity and human kindness.
            </p>

            {/* Social Media Icons (Always Visible & Interactive) */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://facebook.com//ABCAutismBehavioralCenter/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#5f5f5f] border border-slate-400 flex items-center justify-center text-white hover:bg-[#1877F2] hover:border-[#1877F2] transform hover:scale-110 transition-all duration-300 shadow-md"
              >
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>

              <a 
                href="https://instagram.com/abcautismbehavioral/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#5f5f5f] border border-slate-400 flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-red-500 hover:to-purple-600 hover:border-transparent transform hover:scale-110 transition-all duration-300 shadow-md"
              >
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>

              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-[#5f5f5f] border border-slate-400 flex items-center justify-center text-white hover:bg-black hover:border-black transform hover:scale-110 transition-all duration-300 shadow-md"
              >
                <i className="fa-brands fa-tiktok text-sm"></i>
              </a>

              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#5f5f5f] border border-slate-400 flex items-center justify-center text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transform hover:scale-110 transition-all duration-300 shadow-md"
              >
                <i className="fa-brands fa-linkedin-in text-sm"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider border-l-4 border-[#FF5271] pl-3 py-0.5 bg-black/10 rounded-r-md">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-200 py-1 border-b border-slate-600/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5271]" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-200 py-1 border-b border-slate-600/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5271]" /> About Our Center
                </Link>
              </li>
              <li>
                <Link to="/services" className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-200 py-1 border-b border-slate-600/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5271]" /> Our Services
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-200 py-1 border-b border-slate-600/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5271]" /> Conditions We Support
                </Link>
              </li>
              <li>
                <Link to="/team" className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-200 py-1 border-b border-slate-600/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5271]" /> Our Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-200 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5271]" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Specialties */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider border-l-4 border-[#00A8CD] pl-3 py-0.5 bg-black/10 rounded-r-md">
              Our Specialties
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/speech-therapy" className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-200 py-0.5 border-b border-slate-600/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A8CD]" /> Speech & Language Therapy
                </Link>
              </li>
              <li>
                <Link to="/services/nutrition-dietetics" className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-200 py-0.5 border-b border-slate-600/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A8CD]" /> Nutrition Therapy & Dietetics
                </Link>
              </li>
              <li>
                <Link to="/services/special-education" className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-200 py-0.5 border-b border-slate-600/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A8CD]" /> Special Education
                </Link>
              </li>
              <li>
                <Link to="/services/physiotherapy" className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-200 py-0.5 border-b border-slate-600/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A8CD]" /> Physiotherapy
                </Link>
              </li>
              <li>
                <Link to="/services/occupational-therapy" className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-200 py-0.5 border-b border-slate-600/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A8CD]" /> Occupational Therapy
                </Link>
              </li>
              <li>
                <Link to="/services/day-care" className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-200 py-0.5 border-b border-slate-600/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A8CD]" /> Day Care
                </Link>
              </li>
              <li>
                <Link to="/services/montessori-education" className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-200 py-0.5 border-b border-slate-600/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A8CD]" /> Montessori Education
                </Link>
              </li>
              <li>
                <Link to="/services/dysphagia-management" className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-200 py-0.5 border-b border-slate-600/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A8CD]" /> Dysphagia Management
                </Link>
              </li>
              <li>
                <Link to="/services/aba-psychology" className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-200 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A8CD]" /> ABA Therapy & Psychology
                </Link>
              </li>
            </ul>
          </div>

          {/* Get In Touch & Appointment Button */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider border-l-4 border-[#F5A623] pl-3 py-0.5 bg-black/10 rounded-r-md">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <i className="fa-solid fa-location-dot text-[#FF5271] mt-0.5"></i>
                <span>20 Plaza Main Boulevard, Hasan Commercial,
Al-Rehman Garden Phase 2,
Main Sharqpur Road, Near Faizpur Interchange,
Lahore Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="fa-solid fa-phone text-[#00A8CD]"></i>
                <span> +92345-8471693 </span>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="fa-solid fa-envelope text-[#F5A623]"></i>
                <span>info@abcautismbehavioralcenter.com</span>
              </li>
            </ul>

            {/* Book Appointment Button inside Get In Touch */}
            <div className="pt-3">
              <Link
                to="/book-a-free-consult"
                className="block w-full bg-[#003B5C] hover:bg-[#FF5271] text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl text-center transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20 transform hover:-translate-y-0.5"
              >
                Book Appointment
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-200">
          <p>&copy; {new Date().getFullYear()} ABC Autism Behavioral Center. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/faq" className="hover:text-white transition-colors">FAQ'S</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;