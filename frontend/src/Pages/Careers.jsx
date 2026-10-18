import React from 'react';
import LeadForm from '../Components/LeadForm';

export default function Careers() {
  return (
    <section className="bg-[#F8F9FA] px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-[#003B5C]">Join Our Team</h1>
        <p className="mt-2 mb-8 text-slate-600">
          Apply to be part of our child development specialists team.
        </p>
        <LeadForm type="career" />
      </div>
    </section>
  );
}