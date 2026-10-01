import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

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

// Yeh component pathname change hone par page ko sabse upar le jayega
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Browser ki scroll memory disable karein
    if ('scrollRestoration' in window) {
      window.history.scrollRestoration = 'manual';
    }

    // Ek chota sa timeout taaki naye page ka DOM render hone ke foran baad scroll top par jaye
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
            <Route path="/Pages/montessori-education" element={<Montessori />} />
            <Route path="/Pages/dysphagia-management" element={<DysphagiaManagement />} />
            <Route path="/Pages/aba-psychology" element={<ABATherapy />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;