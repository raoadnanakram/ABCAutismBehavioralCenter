import React, { useState } from 'react';
import { submitForm } from '../api';

const SERVICES = [
  'Speech & Language Therapy', 'Nutrition Therapy & Dietetics', 'Special Education',
  'Physiotherapy', 'Occupational Therapy', 'Day Care', 'Montessori Education',
  'Dysphagia Management', 'ABA Therapy',
];
const POSITIONS = [
  'Speech Therapist', 'Occupational Therapist', 'ABA Therapist', 'Special Education Teacher',
  'Physiotherapist', 'Nutritionist', 'Other',
];

const CONFIG = {
  appointment: {
    button: 'Book Appointment',
    success: 'Thank you! Your appointment request has been received. A confirmation email has been sent to you.',
    fields: [
      { name: 'name', label: 'Parent / Guardian Name', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'childAge', label: 'Child Age' },
      { name: 'service', label: 'Service Needed', type: 'select', options: SERVICES },
      { name: 'date', label: 'Preferred Date', type: 'date' },
      { name: 'message', label: 'Message (optional)', type: 'textarea' },
    ],
  },
  contact: {
    button: 'Send Message',
    success: 'Thank you! Your message has been sent. A confirmation email has been sent to you.',
    fields: [
      { name: 'name', label: 'Your Name', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'subject', label: 'Subject' },
      { name: 'message', label: 'Message', type: 'textarea', required: true },
    ],
  },
  career: {
    button: 'Submit Application',
    success: 'Thank you! Your application has been received. A confirmation email has been sent to you.',
    fields: [
      { name: 'name', label: 'Full Name', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'position', label: 'Position Applying For', type: 'select', options: POSITIONS, required: true },
      { name: 'experience', label: 'Experience (e.g. 2 years)' },
      { name: 'cvLink', label: 'CV Link (Google Drive / Dropbox)', type: 'url' },
      { name: 'message', label: 'Cover Note (optional)', type: 'textarea' },
    ],
  },
};

const input =
  'w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1CA7C7] focus:ring-4 focus:ring-[#1CA7C7]/20';

export default function LeadForm({ type }) {
  const cfg = CONFIG[type];
  const [values, setValues] = useState({ website: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await submitForm(type, values);
      setDone(true);
      setValues({ website: '' });
    } catch (err) {
      setError(err.message || 'Kuch ghalat hua, dobara try karein');
    }
    setLoading(false);
  };

  if (done)
    return (
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center">
        <div className="text-5xl mb-3">✅</div>
        <p className="text-emerald-800 font-medium">{cfg.success}</p>
        <button onClick={() => setDone(false)} className="mt-5 text-sm underline text-emerald-700">
          Submit another response
        </button>
      </div>
    );

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Honeypot: insaan ko nazar nahi aata, bots bhar dete hain */}
      <input
        type="text" name="website" tabIndex={-1} autoComplete="off"
        value={values.website} onChange={set('website')}
        className="hidden" aria-hidden="true"
      />
      {cfg.fields.map((f) => (
        <div key={f.name}>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {f.label} {f.required && <span className="text-[#F5456B]">*</span>}
          </label>
          {f.type === 'textarea' ? (
            <textarea rows={4} required={f.required} value={values[f.name] || ''} onChange={set(f.name)} className={input} />
          ) : f.type === 'select' ? (
            <select required={f.required} value={values[f.name] || ''} onChange={set(f.name)} className={input}>
              <option value="">Select...</option>
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <input type={f.type || 'text'} required={f.required} value={values[f.name] || ''} onChange={set(f.name)} className={input} />
          )}
        </div>
      ))}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit" disabled={loading}
        className="w-full rounded-xl bg-[#F5456B] py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#003B5C] hover:shadow-xl disabled:opacity-60"
      >
        {loading ? 'Sending...' : cfg.button}
      </button>
    </form>
  );
}