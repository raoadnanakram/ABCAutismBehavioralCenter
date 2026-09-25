import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Link } from 'react-router-dom';

// Components Import
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

// Pages Import
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import Services from './Pages/Services';
import Conditions from './Pages/Conditions';
import Contact from './Pages/Contact';
import Team from './Pages/OurTeam'; // Check karein ke Pages folder mein Team.jsx mojood ho
import BookAppointment from './Pages/BookAppointment'; // Check karein ke Pages folder mein BookAppointment.jsx mojood ho

import './App.css';

// Inline Service Detail Component
const servicesData = {
  'speech-therapy': { title: 'Speech & Language Therapy', description: 'Specialized therapy focusing on expressive language, speech clarity, articulation, and social pragmatics.' },
  'nutrition-dietetics': { title: 'Nutrition Therapy & Dietetics', description: 'Customized clinical nutrition plans supporting healthy developmental growth and sensory food aversion.' },
  'special-education': { title: 'Special Education', description: 'Individualized Educational Plans (IEPs) designed for unique learning styles and cognitive development.' },
  'physiotherapy': { title: 'Physiotherapy', description: 'Targeted motor movement exercises improving gross motor skills, posture, strength, and physical balance.' },
  'occupational-therapy': { title: 'Occupational Therapy & Sensory Integration', description: 'Occupational therapy strategies to support sensory regulation, fine motor skills, and daily life independence.' },
  'day-care': { title: 'Day Care Services', description: 'Safe, interactive, and structured developmental daycare environment tailored for early childhood growth.' },
  'montessori-education': { title: 'Montessori & Early Childhood Education', description: 'Self-directed learning and practical life activities nurturing early focus, creativity, and self-reliance.' },
  'dysphagia-management': { title: 'Dysphagia Management & NG Tube Feeding', description: 'Clinical feeding therapy, safe swallowing strategies, and specialized NG tube transition management.' },
  'aba-psychology': { title: 'ABA Therapy & Psychology', description: 'Evidence-based Applied Behavior Analysis and psychological support to build functional independence.' }
};

function ServiceDetail() {
  const { serviceId } = useParams();
  const service = servicesData[serviceId] || {
    title: 'Specialized Service',
    description: 'Specialized therapy and developmental support designed for growth and independence.'
  };

  return (
    <div className="w-full bg-[#F8F9FA] text-[#003B5C] font-sans min-h-screen">
      <section className="w-full bg-[#003B5C] text-white py-20 px-4 text-center relative">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-[#F5A623] font-bold text-xs uppercase tracking-widest bg-[#F5A623]/10 px-4 py-1.5 rounded-full border border-[#F5A623]/20">
            SPECIALIZED SERVICE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase font-serif tracking-tight">
            {service.title}
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto">
            {service.description}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16 space-y-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-slate-100 space-y-6">
          <h2 className="text-2xl font-bold text-[#003B5C]">Overview & Approach</h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            At ABC Autism Behavioral Center, our {service.title} program focuses on personalized 1:1 interventions designed by expert specialists to ensure continuous progress and confidence.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Link 
              to="/book-a-free-consult" 
              className="bg-gradient-to-r from-[#FF5271] to-[#F5A623] text-white font-bold px-8 py-3.5 rounded-full text-center shadow-md hover:shadow-lg transition-all"
            >
              Book an Assessment
            </Link>
            <Link 
              to="/contact" 
              className="border border-[#003B5C] text-[#003B5C] font-bold px-8 py-3.5 rounded-full text-center hover:bg-[#003B5C] hover:text-white transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
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

            {/* All 9 Sub-Pages Dynamic Route */}
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;