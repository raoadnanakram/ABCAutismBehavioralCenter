import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';

// Components Import
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

// Pages Import
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import Services from './Pages/Services';
import Conditions from './Pages/Conditions';
import Contact from './Pages/Contact';
import Team from './Pages/OurTeam';
import BookAppointment from './Pages/BookAppointment';

// Individual Service Pages Import
import SpeechLanguageTherapy from './Pages/SpeechLanguageTherapy';
import NutritiontherapyDietetics from './Pages/NutritiontherapyDietetics';
import SpecialEducation from './Pages/SpecialEducation';
import Physiotherapy from './Pages/Physiotherapy';
import Occupationaltherapy from './Pages/Occupationaltherapy';
import DayCare from './Pages/DayCare';
import Montessori from './Pages/Montessori';
import DysphagiaManagement from './Pages/DysphagiaManagement';
import ABATherapy from './Pages/ABATherapy';

import './App.css';

// Scroll to top on pathname change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window) {
      window.history.scrollRestoration = 'manual';
    }

    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const appContainer = document.querySelector('.app-container');
      if (appContainer) {
        appContainer.scrollTop = 0;
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

// Friendly slugs -> real pages
const SLUG_REDIRECTS = {
  '/our-team': '/about/our-team',
  '/about-us': '/about',
  '/our-services': '/services',
  '/contact-us': '/contact',
  '/book-appointment': '/book-a-free-consult',
  '/book': '/book-a-free-consult',
  '/speech-therapy': '/Pages/speech-therapy',
  '/nutrition-dietetics': '/Pages/nutrition-dietetics',
  '/special-education': '/Pages/special-education',
  '/physiotherapy': '/Pages/physiotherapy',
  '/occupational-therapy': '/Pages/occupational-therapy',
  '/day-care': '/Pages/day-care',
  '/montessori-education': '/Pages/montessori-education',
  '/dysphagia-management': '/Pages/dysphagia-management',
  '/aba-psychology': '/Pages/aba-psychology',
  '/aba-therapy': '/Pages/aba-psychology',
};

function InfoPage({ title }) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-6 py-24 bg-[#F8F9FA]">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold text-[#003B5C] mb-4">{title}</h1>
        <p className="text-slate-600 mb-8">
          This page is being prepared. For any question please contact us and our team will help you.
        </p>
        <a href="/contact" className="inline-block bg-[#003B5C] text-white px-6 py-3 rounded-lg font-semibold">Contact Us</a>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-6 py-24 bg-[#F8F9FA]">
      <div className="max-w-xl text-center">
        <h1 className="text-5xl font-bold text-[#003B5C] mb-3">404</h1>
        <p className="text-slate-600 mb-8">Sorry, this page does not exist.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="/" className="bg-[#003B5C] text-white px-6 py-3 rounded-lg font-semibold">Home</a>
          <a href="/services" className="border border-[#003B5C] text-[#003B5C] px-6 py-3 rounded-lg font-semibold">Services</a>
          <a href="/contact" className="border border-[#003B5C] text-[#003B5C] px-6 py-3 rounded-lg font-semibold">Contact</a>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <main className="w-full overflow-x-hidden">
          <Routes>
            {/* Primary Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/about/our-team" element={<Team />} />
            <Route path="/services" element={<Services />} />
            <Route path="/conditions" element={<Conditions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-a-free-consult" element={<BookAppointment />} />

            {/* Individual Service Sub-Pages Routes */}
            <Route path="/Pages/speech-therapy" element={<SpeechLanguageTherapy />} />
            <Route path="/Pages/nutrition-dietetics" element={<NutritiontherapyDietetics />} />
            <Route path="/Pages/special-education" element={<SpecialEducation />} />
            <Route path="/Pages/physiotherapy" element={<Physiotherapy />} />
            <Route path="/Pages/occupational-therapy" element={<Occupationaltherapy />} />
            <Route path="/Pages/day-care" element={<DayCare />} />
            <Route path="/Pages/montessori-education" element-={<Montessori />} />
            <Route path="/Pages/dysphagia-management" element={<DysphagiaManagement />} />
            <Route path="/Pages/aba-psychology" element={<ABATherapy />} />

            {/* Old / short slugs -> correct page */}
            {Object.entries(SLUG_REDIRECTS).map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}

            {/* Footer pages */}
            <Route path="/faq" element={<InfoPage title="FAQ's" />} />
            <Route path="/privacy-policy" element={<InfoPage title="Privacy Policy" />} />
            <Route path="/terms" element={<InfoPage title="Terms of Service" />} />

            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;