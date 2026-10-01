import React from 'react';
import { Link } from 'react-router-dom';

function SpeechLanguageTherapy() {
  return (
    <div className="w-full bg-[#F8F9FA] text-[#003B5C] font-sans min-h-screen">
      {/* Header Section */}
      <section className="w-full bg-[#003B5C] text-white py-20 px-4 text-center relative">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-[#F5A623] font-bold text-xs uppercase tracking-widest bg-[#F5A623]/10 px-4 py-1.5 rounded-full border border-[#F5A623]/20">
            SPECIALIZED SERVICE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase font-serif tracking-tight">
            Speech & Language Therapy
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto">
            Specialized therapy focusing on expressive language, speech clarity, articulation, and social pragmatics.
          </p>
        </div>
      </section>

      {/* Details Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 space-y-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-slate-100 space-y-6">
          <h2 className="text-2xl font-bold text-[#003B5C]">Overview & Key Focus Areas</h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            At ABC Autism Behavioral Center, our Speech & Language Therapy program focuses on personalized 1:1 interventions designed by expert specialists to ensure continuous progress, functional growth, and confidence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {['Articulation & Pronunciation', 'Expressive & Receptive Language', 'Social Communication Skills', 'Stuttering & Fluency Management'].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 bg-[#F8F9FA] p-4 rounded-xl border border-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]"></span>
                <span className="text-sm font-semibold text-[#003B5C]">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-4">
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

export default SpeechLanguageTherapy;