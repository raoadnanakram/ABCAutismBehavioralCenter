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

    </div>
  );
}

export default SpeechLanguageTherapy;