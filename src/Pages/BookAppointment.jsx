import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const servicesList = [
  "Speech Therapy",
  "Nutrition Therapy & Dietetics",
  "Special Education",
  "Physiotherapy",
  "Occupational Therapy & Sensory Integration",
  "Day Care",
  "Montessori & Early Childhood Education",
  "Dysphagia Management & NG Tube Feeding",
  "ABA Therapy & Psychology"
];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM"
];

const BookingAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    childName: "",
    service: "",
    date: "",
    time: "",
    message: "",
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time || !formData.consent) {
      alert("Kripya sabhi anivarya (required) fields bharein aur consent check karein.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="w-full font-sans text-[#334155] bg-[#F8F9FA] overflow-x-hidden">

      {/* 1. HERO / PAGE HEADER */}
      <section className="relative w-full bg-[#003B5C] text-white py-24 lg:py-32 px-5 sm:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#003B5C]/95 via-[#003B5C]/90 to-[#00A8CD]/75 z-0" />
        
        {/* Animated Decorative Circles */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#F5A623]/15 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#FF5271]/20 blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] text-xs font-extrabold uppercase tracking-[0.2em] px-4 py-2 rounded-full"
          >
            ABC AUTISM & BEHAVIORAL CENTER
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            BOOK AN <span className="text-[#FF5271] italic">APPOINTMENT</span>
          </motion.h1>

          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg sm:text-xl font-semibold text-[#00A8CD]"
          >
            Let's Take the Next Step Together
          </motion.h3>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          >
            "Schedule an appointment with our professional team and take the first step toward personalized support for your child's development, communication and wellbeing."
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
          >
            <a 
              href="#booking-form"
              className="w-full sm:w-auto bg-[#FF5271] hover:bg-[#e04360] text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-[#FF5271]/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Book an Appointment
            </a>
            <Link 
              to="/services"
              className="w-full sm:w-auto bg-white/10 hover:bg-white hover:text-[#003B5C] text-white border border-white/30 font-bold px-8 py-3.5 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Explore Our Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9. APPOINTMENT BOOKING SECTION */}
      <section id="booking-form" className="py-20 px-5 sm:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-10 lg:p-14"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* LEFT SIDE – WHY BOOK WITH US */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-[#00A8CD] font-bold text-xs uppercase tracking-[0.2em] bg-[#00A8CD]/10 px-3.5 py-1.5 rounded-full border border-[#00A8CD]/20">
                  PERSONALIZED CARE
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#003B5C] leading-tight">
                  Personalized Care for Every Child
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  "Our multidisciplinary team works with children and families through personalized, compassionate and structured support."
                </p>
              </div>

              <div className="space-y-4 pt-4">
                {[
                  {
                    title: "Qualified Professionals",
                    desc: "Experienced professionals from different areas of child development.",
                    icon: "🎓"
                  },
                  {
                    title: "Personalized Support",
                    desc: "Care plans designed around individual needs and goals.",
                    icon: "🎯"
                  },
                  {
                    title: "Family-Centered Approach",
                    desc: "Parents and caregivers remain an important part of the journey.",
                    icon: "👨‍👩‍👧‍👦"
                  },
                  {
                    title: "Comfortable Environment",
                    desc: "A welcoming environment designed to encourage learning and participation.",
                    icon: "🏡"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 rounded-2xl bg-[#F1F5F9] border border-slate-200/60 shadow-sm flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#003B5C] text-white flex items-center justify-center text-xl flex-shrink-0 shadow-md">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-[#003B5C] mb-1">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE – BOOKING FORM */}
            <div className="lg:col-span-7 bg-[#F8F9FA] p-6 sm:p-8 rounded-2xl border border-slate-200">
              <h3 className="font-serif text-2xl font-bold text-[#003B5C] mb-6">
                Appointment Booking Form
              </h3>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-4 my-10"
                  >
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center text-3xl mx-auto shadow-lg">
                      ✓
                    </div>
                    <h4 className="font-serif text-2xl font-bold text-emerald-800">
                      Appointment Request Submitted Successfully
                    </h4>
                    <p className="text-emerald-700 text-sm max-w-md mx-auto">
                      Thank you for reaching out. Our team will review your request and contact you shortly to confirm the details.
                    </p>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          childName: "",
                          service: "",
                          date: "",
                          time: "",
                          message: "",
                          consent: false
                        });
                      }}
                      className="mt-4 px-6 py-2.5 bg-[#003B5C] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow hover:bg-[#002840] transition"
                    >
                      Book Another Appointment
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Full Name & Phone Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Full Name *
                        </label>
                        <input 
                          type="text"
                          name="name"
                          required
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full p-3.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#00A8CD] focus:ring-2 focus:ring-[#00A8CD]/20 transition"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Phone Number *
                        </label>
                        <input 
                          type="tel"
                          name="phone"
                          required
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full p-3.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#00A8CD] focus:ring-2 focus:ring-[#00A8CD]/20 transition"
                        />
                      </div>
                    </div>

                    {/* Email Address & Child's Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Email Address
                        </label>
                        <input 
                          type="email"
                          name="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-3.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#00A8CD] focus:ring-2 focus:ring-[#00A8CD]/20 transition"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Child's Name
                        </label>
                        <input 
                          type="text"
                          name="childName"
                          placeholder="Enter child's name"
                          value={formData.childName}
                          onChange={handleChange}
                          className="w-full p-3.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#00A8CD] focus:ring-2 focus:ring-[#00A8CD]/20 transition"
                        />
                      </div>
                    </div>

                    {/* Select Service */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Select Service *
                      </label>
                      <select 
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full p-3.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#00A8CD] focus:ring-2 focus:ring-[#00A8CD]/20 transition text-slate-700"
                      >
                        <option value="">-- Select a specialized service --</option>
                        {servicesList.map((srv, idx) => (
                          <option key={idx} value={srv}>{srv}</option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Date & Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <span>📅</span> Preferred Appointment Date *
                        </label>
                        <input 
                          type="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full p-3.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#00A8CD] focus:ring-2 focus:ring-[#00A8CD]/20 transition text-slate-700"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <span>⏰</span> Preferred Time *
                        </label>
                        <select 
                          name="time"
                          required
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full p-3.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#00A8CD] focus:ring-2 focus:ring-[#00A8CD]/20 transition text-slate-700"
                        >
                          <option value="">Select time slot</option>
                          {timeSlots.map((slot, idx) => (
                            <option key={idx} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Additional Information / Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Additional Information
                      </label>
                      <textarea 
                        name="message"
                        rows="4"
                        placeholder="Tell us briefly about your child's needs or any concerns you would like to discuss..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-3.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#00A8CD] focus:ring-2 focus:ring-[#00A8CD]/20 transition resize-none text-slate-700"
                      />
                    </div>

                    {/* Consent Checkbox */}
                    <div className="flex items-start gap-3 pt-2">
                      <input 
                        type="checkbox"
                        name="consent"
                        id="consent-checkbox"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-[#00A8CD] focus:ring-[#00A8CD] accent-[#00A8CD] cursor-pointer"
                      />
                      <label htmlFor="consent-checkbox" className="text-xs sm:text-sm text-slate-600 cursor-pointer select-none">
                        I confirm that the information provided is accurate and I would like to request an appointment.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                      <motion.button 
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#FF5271] hover:bg-[#e04360] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#FF5271]/30 transition-all duration-300 flex items-center justify-center gap-2 group text-base"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Submitting Request...</span>
                          </div>
                        ) : (
                          <>
                            <span>REQUEST APPOINTMENT</span>
                            <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                          </>
                        )}
                      </motion.button>
                    </div>

                  </form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ================= BOTTOM CLINIC SHOWCASE (Exact Match as Requested) ================= */}
      <section className="py-20 px-5 sm:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[32px] p-8 sm:p-12 shadow-2xl border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left Image */}
          <div className="lg:col-span-4 rounded-2xl overflow-hidden shadow-lg h-72 bg-slate-100 relative group">
            <img 
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800" 
              alt="Clinic Therapy Room" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003B5C]/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
          </div>

          {/* Center Details */}
          <div className="lg:col-span-4 text-center space-y-4 px-2">
            <span className="text-[#FF5271] font-bold text-xs uppercase tracking-widest bg-[#FF5271]/10 px-3 py-1 rounded-full">
              VISIT OUR CENTER
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#003B5C] leading-snug">
              We are always here to help you
            </h3>
            <div className="space-y-1 text-slate-600 text-sm">
              <p className="font-bold text-[#003B5C]">ABC Autism & Behavioral Center</p>
              <p>20 Plaza Main Boulevard, Hasan Commercial, Al-Rehman Garden Phase 2, Main Sharqpur Road, Near Faizpur Interchange, Lahore Pakistan</p>
            </div>
            <div className="pt-3">
              <a 
                href="https://www.google.com/maps/place/ABC+Autism+Behavioral+Center/@31.590277,74.250454,15z/data=!4m6!3m5!1s0x391911e609661487:0x359c64374c1f3a92!8m2!3d31.5902768!4d74.2504538!16s%2Fg%2F11nvjpvm2n?hl=en&entry=ttu&g_ep=EgoyMDI2MDkyMi4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#003B5C] hover:bg-[#FF5271] text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Get direction</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-4 rounded-2xl overflow-hidden shadow-lg h-72 bg-slate-100 relative group">
            <img 
              src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800" 
              alt="Therapy Setup" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003B5C]/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default BookingAppointment;