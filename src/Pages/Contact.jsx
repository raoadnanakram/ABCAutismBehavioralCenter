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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
    } else {
      setFormErrors(errors);
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

      {/* ================= 2. QUICK CONTACT CARDS ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-12 relative z-20">
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Card 1 - Phone */}
          <motion.a 
            href={`tel:${contactInfo.phone}`}
            variants={fadeUp}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-100 flex flex-col justify-between group transition-all duration-300 hover:border-[#00A8CD]"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#00A8CD]/10 text-[#00A8CD] group-hover:bg-[#00A8CD] group-hover:text-white transition duration-300 flex items-center justify-center text-xl mb-4">
                📞
              </div>
              <h3 className="font-bold text-[#003B5C] text-lg mb-1">Phone Call</h3>
              <p className="text-slate-600 text-xs font-semibold">{contactInfo.phone}</p>
              <p className="text-slate-400 text-xs mt-1">Call our clinical desk</p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#00A8CD]">
              <span>Call Now</span>
              <span className="transform group-hover:translate-x-1 transition">→</span>
            </div>
          </motion.a>

          {/* Card 2 - WhatsApp */}
          <motion.a 
            href={`https://wa.me/${contactInfo.whatsapp}`}
            target="_blank" rel="noreferrer"
            variants={fadeUp}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-100 flex flex-col justify-between group transition-all duration-300 hover:border-[#25D366]"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition duration-300 flex items-center justify-center text-xl mb-4">
                💬
              </div>
              <h3 className="font-bold text-[#003B5C] text-lg mb-1">WhatsApp Desk</h3>
              <p className="text-slate-600 text-xs font-semibold">Chat With Us</p>
              <p className="text-slate-400 text-xs mt-1">Quick response support</p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#25D366]">
              <span>Start Chat</span>
              <span className="transform group-hover:translate-x-1 transition">→</span>
            </div>
          </motion.a>

          {/* Card 3 - Email */}
          <motion.a 
            href={`mailto:${contactInfo.email}`}
            variants={fadeUp}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-100 flex flex-col justify-between group transition-all duration-300 hover:border-[#FF5271]"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FF5271]/10 text-[#FF5271] group-hover:bg-[#FF5271] group-hover:text-white transition duration-300 flex items-center justify-center text-xl mb-4">
                ✉️
              </div>
              <h3 className="font-bold text-[#003B5C] text-lg mb-1">Email Center</h3>
              <p className="text-slate-600 text-xs font-semibold truncate">{contactInfo.email}</p>
              <p className="text-slate-400 text-xs mt-1">Send us your inquiry</p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#FF5271]">
              <span>Send Mail</span>
              <span className="transform group-hover:translate-x-1 transition">→</span>
            </div>
          </motion.a>

          {/* Card 4 - Opening Hours Status */}
          <motion.div 
            variants={fadeUp}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-100 flex flex-col justify-between group transition-all duration-300 hover:border-[#F5A623]"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F5A623]/20 text-[#003B5C] group-hover:bg-[#F5A623] transition duration-300 flex items-center justify-center text-xl mb-4">
                ⏰
              </div>
              <h3 className="font-bold text-[#003B5C] text-lg mb-1">Center Timings</h3>
              <p className="text-slate-600 text-xs font-semibold">Mon – Sat: 09 AM – 07 PM</p>
              <p className="text-slate-400 text-xs mt-1">{contactInfo.sundayHours}</p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>● Open Mon - Sat</span>
              <span className="text-slate-400">PKT</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= 3. CONTACT FORM + IMAGE ================= */}
      <section id="contact-form" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side Image Composition */}
          <motion.div 
            variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800" 
                alt="Therapist with child" 
                className="w-full h-[450px] sm:h-[550px] object-cover hover:scale-105 transition duration-700"
              />
            </div>

            {/* Floating Glass Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-white/50 text-xs font-bold text-[#003B5C] z-20 flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#00A8CD] animate-pulse" />
              <span>Compassionate Child Care</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-2 sm:right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F5A623]/20 text-[#F5A623] flex items-center justify-center font-bold text-xl">
                💛
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Dedicated Support</p>
                <p className="text-sm font-extrabold text-[#003B5C]">Here For Your Family</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side Contact Form */}
          <motion.div 
            variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
                    ✓
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#003B5C]">Thank You!</h3>
                  <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                    Your message has been received. Our clinical support team will review your inquiry and contact you shortly.
                  </p>
                  <button 
                    onClick={() => { setIsSubmitted(false); setFormValues({ fullName: '', email: '', phone: '', service: '', contactMethod: 'Phone Call', message: '' }); }}
                    className="mt-4 bg-[#003B5C] text-white font-bold px-6 py-2.5 rounded-full text-xs hover:bg-[#002840] transition"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <span className="text-[#FF5271] font-extrabold text-xs uppercase tracking-widest bg-[#FF5271]/10 px-3 py-1 rounded-full">
                      GET IN TOUCH
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#003B5C] mt-2">
                      Tell us how we can help
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Sarah Ahmed"
                        value={formValues.fullName}
                        onChange={(e) => setFormValues({ ...formValues, fullName: e.target.value })}
                        className={`w-full p-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#003B5C]/20 ${formErrors.fullName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 focus:border-[#003B5C]'}`}
                      />
                      {formErrors.fullName && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{formErrors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input 
                        type="tel" 
                        placeholder="+92 300 1234567"
                        value={formValues.phone}
                        onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                        className={`w-full p-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#003B5C]/20 ${formErrors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 focus:border-[#003B5C]'}`}
                      />
                      {formErrors.phone && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{formErrors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="sarah@example.com"
                        value={formValues.email}
                        onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-slate-200 focus:border-[#003B5C] text-sm focus:outline-none focus:ring-2 focus:ring-[#003B5C]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Select Service *</label>
                      <select 
                        value={formValues.service}
                        onChange={(e) => setFormValues({ ...formValues, service: e.target.value })}
                        className={`w-full p-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#003B5C]/20 transition-all ${formErrors.service ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 focus:border-[#003B5C] text-slate-700'}`}
                      >
                        <option value="">-- Choose Therapy / Assessment --</option>
                        {servicesList.map((srv, idx) => (
                          <option key={idx} value={srv}>{srv}</option>
                        ))}
                      </select>
                      {formErrors.service && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{formErrors.service}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Contact Method</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Phone Call', 'WhatsApp', 'Email'].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setFormValues({ ...formValues, contactMethod: method })}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${formValues.contactMethod === method ? 'bg-[#003B5C] text-white border-[#003B5C] shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                    <textarea 
                      rows="3" 
                      placeholder="Tell us a little about how we can help your child..."
                      value={formValues.message}
                      onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
                      className="w-full p-3.5 rounded-xl border border-slate-200 focus:border-[#003B5C] text-sm focus:outline-none focus:ring-2 focus:ring-[#003B5C]/20 transition-all"
                    />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="w-full bg-[#FF5271] hover:bg-[#e04360] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#FF5271]/25 transition duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>SEND MESSAGE</span>
                    <span className="transform group-hover:translate-x-1 transition">→</span>
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
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