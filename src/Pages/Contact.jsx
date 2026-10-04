import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. Centralized Contact Info Configuration
const contactInfo = {
  centerName: "ABC Autism & Behavioral Center",
  phone: "+92345-8471693",
  whatsapp: "+92300-1330450",
  email: "info@abcautismbehavioralcenter.com",
  address: "20 Plaza Main Boulevard, Hasan Commercial, Al-Rehman Garden Phase 2, Main Sharqpur Road, Near Faizpur Interchange, Lahore Pakistan",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.014237731778!2d74.2504538!3d31.5902768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391911e609661487%3A0x359c64374c1f3a92!2sABC%20Autism%20Behavioral%20Center!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s",
  sundayHours: "Sunday: Closed"
};

const servicesList = [
  "Speech Therapy",
  "ABA Therapy",
  "Occupational Therapy",
  "Physiotherapy",
  "Autism Screening",
  "Diagnostic Assessment",
  "Early Education",
  "Montessori",
  "Parent Training",
  "Nutrition Support"
];

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    contactMethod: 'Phone Call',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formValues.fullName.trim()) errors.fullName = "Full name is required";
    if (!formValues.phone.trim()) errors.phone = "Phone number is required";
    if (!formValues.service) errors.service = "Please select a service";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Backend API call updated to match individual professional fields
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formValues.fullName,
          email: formValues.email,
          phone: formValues.phone,
          service: formValues.service,
          preferredContact: formValues.contactMethod,
          message: formValues.message
        })
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(data.message || 'Kuch ghalat ho gaya, dobara koshish karein.');
      }
    } catch (err) {
      console.error('Error:', err);
      setErrorMessage('Server ke sath connection nahi ho saka.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full font-sans text-slate-800 bg-[#F8F9FA] overflow-x-hidden relative selection:bg-[#003B5C] selection:text-white">

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative w-full min-h-[75vh] bg-[#003B5C] text-white flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1800" 
            alt="Child Therapy Session" 
            className="w-full h-full object-cover opacity-20 scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003B5C]/95 via-[#003B5C]/85 to-[#00A8CD]/70" />
        </div>

        {/* Floating Animated Accent Blobs */}
        <motion.div 
          animate={{ scale: [1, 1.25, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-[#F5A623]/20 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF5271]/25 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-block bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
              LET'S CONNECT
            </span>
          </motion.div>

          <motion.h1 
            variants={fadeUp} initial="hidden" animate="visible"
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white"
          >
            WE’RE HERE TO <br />
            <span className="text-[#FF5271] italic">SUPPORT YOUR JOURNEY</span>
          </motion.h1>

          <motion.p 
            variants={fadeUp} initial="hidden" animate="visible"
            className="text-slate-200 text-sm sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Have questions about our therapies or want to learn more about how we can support your child? Our team is here to listen, guide and help you take the next step.
          </motion.p>

          <motion.div 
            variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a 
              href="#contact-form" 
              className="w-full sm:w-auto bg-[#FF5271] hover:bg-[#e04360] text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-[#FF5271]/25 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Book an Assessment
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================= 2. MODERN QUICK CONTACT CARDS ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-12 relative z-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >

          {/* ================= WHATSAPP ================= */}
          <motion.a
            href={`https://wa.me/${contactInfo.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            variants={fadeUp}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden bg-white rounded-[28px] p-7 border border-slate-200/80 shadow-[0_15px_45px_rgba(0,59,92,0.08)] hover:shadow-[0_25px_60px_rgba(37,211,102,0.16)] transition-all duration-500"
          >
            <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-[#25D366]/10 blur-3xl group-hover:bg-[#25D366]/20 transition-all duration-500" />
            <div className="absolute top-0 left-8 right-8 h-[3px] bg-gradient-to-r from-transparent via-[#25D366] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-7">
                <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm">
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.007-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M20.52 3.449C18.24 1.245 15.24.032 12.049.032 5.425.032.03 5.426.03 12.05c0 2.126.555 4.202 1.61 6.032L.022 23.978l6.042-1.585a12.014 12.014 0 005.985 1.526h.005c6.623 0 12.018-5.394 12.018-12.018 0-3.191-1.213-6.191-3.552-8.452zm-8.471 18.443h-.004a9.998 9.998 0 01-5.099-1.395l-.366-.217-3.586.94.957-3.497-.238-.36a9.97 9.97 0 01-1.528-5.313c0-5.507 4.481-9.988 9.988-9.988 2.669 0 5.179 1.04 7.065 2.926a9.935 9.935 0 012.923 7.067c-.003 5.507-4.484 9.987-9.992 9.987z" />
                  </svg>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                  Online
                </span>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#25D366] mb-2">Instant Support</p>
              <h3 className="text-xl font-extrabold text-[#003B5C] mb-2">WhatsApp Desk</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Connect with our support team quickly for appointments, questions and general assistance.</p>
              <div className="mt-7 pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-bold text-[#25D366]">Start a Conversation</span>
                <span className="w-9 h-9 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </motion.a>

          {/* ================= EMAIL ================= */}
          <motion.a
            href={`mailto:${contactInfo.email}`}
            variants={fadeUp}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden bg-white rounded-[28px] p-7 border border-slate-200/80 shadow-[0_15px_45px_rgba(0,59,92,0.08)] hover:shadow-[0_25px_60px_rgba(255,82,113,0.16)] transition-all duration-500"
          >
            <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-[#FF5271]/10 blur-3xl group-hover:bg-[#FF5271]/20 transition-all duration-500" />
            <div className="absolute top-0 left-8 right-8 h-[3px] bg-gradient-to-r from-transparent via-[#FF5271] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-7">
                <div className="w-14 h-14 rounded-2xl bg-[#FF5271]/10 text-[#FF5271] flex items-center justify-center group-hover:bg-[#FF5271] group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 8.05 5.367a1.7 1.7 0 0 0 1.9 0L21 7" />
                  </svg>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-rose-50 text-[#FF5271] border border-rose-100">
                  Email
                </span>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5271] mb-2">Contact Center</p>
              <h3 className="text-xl font-extrabold text-[#003B5C] mb-2">Email Center</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Send your questions, appointment requests or detailed inquiries directly to our team.</p>
              <p className="mt-4 text-xs font-semibold text-slate-400 truncate max-w-full">{contactInfo.email}</p>
              <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-bold text-[#FF5271]">Send an Email</span>
                <span className="w-9 h-9 rounded-full bg-[#FF5271]/10 flex items-center justify-center text-[#FF5271] group-hover:bg-[#FF5271] group-hover:text-white transition-all duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </motion.a>

          {/* ================= OPENING HOURS ================= */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden bg-white rounded-[28px] p-7 border border-slate-200/80 shadow-[0_15px_45px_rgba(0,59,92,0.08)] hover:shadow-[0_25px_60px_rgba(245,166,35,0.18)] transition-all duration-500"
          >
            <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-[#F5A623]/10 blur-3xl group-hover:bg-[#F5A623]/20 transition-all duration-500" />
            <div className="absolute top-0 left-8 right-8 h-[3px] bg-gradient-to-r from-transparent via-[#F5A623] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-7">
                <div className="w-14 h-14 rounded-2xl bg-[#F5A623]/10 text-[#F5A623] flex items-center justify-center group-hover:bg-[#F5A623] group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                  </svg>
                </div>
                <span className="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Open
                </span>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A623] mb-2">Clinic Schedule</p>
              <h3 className="text-xl font-extrabold text-[#003B5C] mb-2">Center Timings</h3>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-600">Monday – Saturday</span>
                  <span className="text-sm font-bold text-[#003B5C]">09 AM – 07 PM</span>
                </div>
                <div className="h-px bg-slate-100" />
                <p className="text-xs text-slate-400">{contactInfo.sundayHours}</p>
              </div>
              <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-600">● Open Mon – Sat</span>
                <span className="text-xs font-bold text-slate-400">PKT</span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* ================= 3. CONTACT FORM SECTION WITH API ================= */}
      <section id="contact-form" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200"
        >
          <div className="text-center mb-10 space-y-2">
            <span className="text-[#FF5271] font-bold text-xs uppercase tracking-widest bg-[#FF5271]/10 px-3 py-1 rounded-full">SEND US A MESSAGE</span>
            <h2 className="font-serif text-3xl font-extrabold text-[#003B5C]">Get in Touch With Us</h2>
            <p className="text-slate-600 text-sm">Fill out the form below and our team will get back to you shortly.</p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl text-center">
              {errorMessage}
            </div>
          )}

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-4 my-6"
              >
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center text-3xl mx-auto shadow-lg">
                  ✓
                </div>
                <h4 className="font-serif text-2xl font-bold text-emerald-800">
                  Message Sent Successfully!
                </h4>
                <p className="text-emerald-700 text-sm max-w-md mx-auto">
                  Thank you for reaching out. We have received your query and will contact you very soon.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormValues({
                      fullName: '',
                      email: '',
                      phone: '',
                      service: '',
                      contactMethod: 'Phone Call',
                      message: ''
                    });
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#003B5C] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow hover:bg-[#002840] transition"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formValues.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name" 
                      className={`w-full p-3.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00A8CD]/20 transition ${formErrors.fullName ? 'border-red-400' : 'border-slate-300 focus:border-[#00A8CD]'}`}
                    />
                    {formErrors.fullName && <p className="text-red-500 text-xs">{formErrors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formValues.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number" 
                      className={`w-full p-3.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00A8CD]/20 transition ${formErrors.phone ? 'border-red-400' : 'border-slate-300 focus:border-[#00A8CD]'}`}
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs">{formErrors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      placeholder="Enter your email address" 
                      className="w-full p-3.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#00A8CD] focus:ring-2 focus:ring-[#00A8CD]/20 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Select Service *</label>
                    <select 
                      name="service"
                      value={formValues.service}
                      onChange={handleChange}
                      className={`w-full p-3.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00A8CD]/20 transition text-slate-700 ${formErrors.service ? 'border-red-400' : 'border-slate-300 focus:border-[#00A8CD]'}`}
                    >
                      <option value="">-- Choose a service --</option>
                      {servicesList.map((srv, idx) => (
                        <option key={idx} value={srv}>{srv}</option>
                      ))}
                    </select>
                    {formErrors.service && <p className="text-red-500 text-xs">{formErrors.service}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Message / Query</label>
                  <textarea 
                    name="message"
                    rows="4"
                    value={formValues.message}
                    onChange={handleChange}
                    placeholder="Write your message or questions here..."
                    className="w-full p-3.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#00A8CD] focus:ring-2 focus:ring-[#00A8CD]/20 transition resize-none text-slate-700"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#FF5271] hover:bg-[#e04360] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#FF5271]/30 transition-all duration-300 flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </div>
                  ) : (
                    <span>Submit Message</span>
                  )}
                </button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ================= 4. CLINIC LOCATION & TIMINGS ================= */}
      <section className="py-20 bg-slate-100/70 border-t border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[#00A8CD] font-extrabold text-xs uppercase tracking-widest">VISIT US</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#003B5C]">VISIT OUR CENTER</h2>
            <p className="text-slate-600 text-xs sm:text-sm">We’re here to welcome you and your family.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Address Card */}
            <motion.div 
              variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="lg:col-span-5 bg-white p-8 rounded-3xl shadow-lg border border-slate-200 space-y-6"
            >
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#00A8CD]">Center Location</span>
                <h3 className="font-bold text-xl text-[#003B5C]">{contactInfo.centerName}</h3>
                <p className="text-slate-600 text-sm">{contactInfo.address}</p>
              </div>

              <div className="space-y-3 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-3">
                  <span className="text-[#00A8CD]">📞 Phone:</span>
                  <a href={`tel:${contactInfo.phone}`} className="hover:underline">{contactInfo.phone}</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#25D366]">💬 WhatsApp:</span>
                  <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noreferrer" className="hover:underline">{contactInfo.whatsapp}</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#FF5271]">✉️ Email:</span>
                  <a href={`mailto:${contactInfo.email}`} className="hover:underline">{contactInfo.email}</a>
                </div>
              </div>

              {/* Simple Operating Hours Box */}
              <div className="pt-2 border-t border-slate-100">
                <h4 className="font-bold text-xs text-[#003B5C] uppercase tracking-wider mb-3">Operating Hours</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-slate-700 text-xs font-bold border border-slate-100">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Monday – Saturday
                    </span>
                    <span>09:00 AM – 07:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-slate-500 text-xs font-bold border border-slate-100">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                      Sunday
                    </span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`} 
                target="_blank" rel="noreferrer"
                className="inline-block w-full text-center bg-[#003B5C] hover:bg-[#002840] text-white font-bold py-3.5 rounded-xl transition text-xs shadow-md active:scale-98"
              >
                Get Directions
              </a>
            </motion.div>

            {/* Google Map Embed */}
            <motion.div 
              variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="lg:col-span-7 h-[480px] rounded-3xl overflow-hidden shadow-lg border-4 border-white relative"
            >
              <iframe 
                title="ABC Autism Behavioral Center Map"
                src={contactInfo.mapEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}