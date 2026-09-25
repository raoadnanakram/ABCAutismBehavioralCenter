import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Services() {
  const servicesData = [
    {
      title: "Speech & Language Therapy",
      desc: "Improving articulation, expressive/receptive language capabilities, and functional communication skills.",
      img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600",
      path: "/services/speech-therapy"
    },
    {
      title: "Nutrition Therapy & Dietetics",
      desc: "Specialized pediatric dietary plans and nutritional guidance tailored to support growth and sensory needs.",
      img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600",
      path: "/services/nutrition-dietetics"
    },
    {
      title: "Special Education",
      desc: "Customized academic and cognitive learning frameworks designed to unlock every child's unique potential.",
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
      path: "/services/special-education"
    },
    {
      title: "Physiotherapy",
      desc: "Improving gross motor skills, core posture, physical strength, and overall bodily coordination.",
      img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600",
      path: "/services/physiotherapy"
    },
    {
      title: "Occupational Therapy & Sensory Integration",
      desc: "Developing fine motor skills, independence in daily routines, and healthy sensory regulation.",
      img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600",
      path: "/services/occupational-therapy"
    },
    {
      title: "Day Care",
      desc: "A secure, nurturing, and highly structured environment designed for safe supervision and holistic care.",
      img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=600",
      path: "/services/day-care"
    },
    {
      title: "Montessori & Early Childhood Education",
      desc: "Guided interactive learning that promotes natural confidence, attention spans, and self-reliance.",
      img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=600",
      path: "/services/montessori-education"
    },
    {
      title: "Dysphagia Management & NG Tube Feeding",
      desc: "Specialized clinical swallowing therapy and tube feeding support administered by expert practitioners.",
      img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
      path: "/services/dysphagia-management"
    },
    {
      title: "ABA Therapy & Psychology",
      desc: "Evidence-based behavior analysis and psychological counseling fostering positive reinforcement and emotional health.",
      img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600",
      path: "/services/aba-psychology"
    }
  ];

  return (
    <div className="w-full font-sans text-[#334155] bg-[#FFFDF9] overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-[#003B5C] text-white py-24 lg:py-32 px-5 sm:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#003B5C]/95 via-[#003B5C]/90 to-[#00A8CD]/75 z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            <span className="bg-[#FFF3CD] text-[#856404] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#FFEEBA]">
              ABC AUTISM & BEHAVIORAL CENTER
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            Our Services & Expert Care in <span className="text-[#F5A623]">LAHORE</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed"
          >
            “Comprehensive, Personalized & Child-Centered Care for Every Stage of Development”
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <Link 
              to="/book-a-free-consult"
              className="inline-block bg-[#FF5271] hover:bg-[#e04360] text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-[#FF5271]/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Book an Appointment
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section className="py-20 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl border-4 border-white"
          >
            <img 
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1000" 
              alt="Child therapy and care" 
              className="w-full h-[400px] object-cover hover:scale-105 transition duration-700" 
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-[#00A8CD] font-bold text-xs uppercase tracking-[0.2em] bg-[#00A8CD]/10 px-4 py-1.5 rounded-full border border-[#00A8CD]/20">
              WHO WE ARE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#003B5C] leading-tight">
              Specialized Support Tailored to Your Child
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At ABC Autism & Behavioral Center, Our Centre is a multidisciplinary healthcare, rehabilitation, education, and child development centre dedicated to helping individuals achieve better health, development, learning, independence, and quality of life.

Our team of qualified professionals—including Nutrition & Dietetics, Physiotherapy, Speech & Language Therapy, Occupational Therapy & Sensory Integration, Special Education, ABA therapy and Early Childhood Education—works collaboratively to provide personalized, evidence-based care under one roof.
</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                "Personalized Care",
                "Qualified Professionals",
                "Family-Centered Support",
                "Individualized Treatment Plans"
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-sm">
                  <span className="w-6 h-6 rounded-full bg-[#00A8CD] text-white flex items-center justify-center text-xs flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#003B5C]">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3 & 4. 9 SERVICES CARDS GRID WITH HOVER & RED/BLUE BUTTONS */}
      <section className="py-20 bg-[#F1F5F9] border-y border-slate-200 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="bg-[#FFF3CD] text-[#856404] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#FFEEBA]">
              OUR SERVICES
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#003B5C]">
                Our Services & Expert Care in <span className="text-[#F5A623]">ABC Center</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-medium">
              Transformative Care for Your Child's Recovery Journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 20px 30px -10px rgba(0, 59, 92, 0.15)" }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  {/* Image Container */}
                  <div className="p-4 pb-0">
                    <div className="relative h-56 rounded-2xl overflow-hidden shadow-sm">
                      <img 
                        src={service.img} 
                        alt={service.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                      />
                    </div>
                  </div>

                  {/* Title and Description */}
                  <div className="p-6 pb-3 space-y-2">
                    <h3 className="text-xl font-bold text-[#003B5C] group-hover:text-[#00A8CD] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Buttons: Learn More (Blue text/bg) & Book Appointment (Solid Red Background #FF5271) */}
                <div className="p-6 pt-3 grid grid-cols-2 gap-3">
                  <Link 
                    to={service.path}
                    className="text-center bg-[#003B5C]/10 hover:bg-[#003B5C] hover:text-white text-[#003B5C] font-semibold py-3 px-3 rounded-xl text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center"
                  >
                    Learn More
                  </Link>
                  
                  <Link 
                    to="/book-a-free-consult" 
                    className="text-center bg-[#FF5271] hover:bg-[#e04360] text-white font-bold py-3 px-3 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-[#FF5271]/20 flex items-center justify-center transform hover:-translate-y-0.5"
                  >
                    Book Appointment
                  </Link>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. WHY CHOOSE ABC? */}
      <section className="py-20 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[#00A8CD] font-bold text-xs uppercase tracking-[0.2em] bg-[#00A8CD]/10 px-3.5 py-1.5 rounded-full border border-[#00A8CD]/20">
            WHY CHOOSE ABC?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#003B5C]">
            The ABC Difference in Child Care
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Qualified Professionals",
              desc: "Experienced professionals working together to support each child's needs.",
              icon: "👩‍⚕️"
            },
            {
              title: "Personalized Care",
              desc: "Every child receives support according to their individual developmental needs.",
              icon: "🎯"
            },
            {
              title: "Family-Centered Approach",
              desc: "Families are involved throughout the child's development journey.",
              icon: "👨‍👩‍👧"
            },
            {
              title: "Child-Centered Environment",
              desc: "A safe, supportive and welcoming environment designed for children.",
              icon: "❤️"
            }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 15px 25px -5px rgb(0 0 0 / 0.1)" }}
              className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm transition-all duration-300 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#FF5271]/10 text-[#FF5271] text-3xl flex items-center justify-center mx-auto">
                {card.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-[#003B5C]">{card.title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. HOW OUR SERVICES WORK (CARE PROCESS) */}
      <section className="py-20 bg-[#003B5C] text-white px-5 sm:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[#F5A623] font-bold text-xs uppercase tracking-[0.2em]">OUR CARE PROCESS</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
              Step-by-Step Developmental Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { step: "01", title: "Initial Consultation", desc: "Understanding parent concerns and child history." },
              { step: "02", title: "Assessment", desc: "Detailed developmental and functional evaluation." },
              { step: "03", title: "Personalized Plan", desc: "Tailoring goals and therapy strategies." },
              { step: "04", title: "Therapy / Support", desc: "Engaging specialist intervention." },
              { step: "05", title: "Progress Monitoring", desc: "Continuous tracking and family updates." }
            ].map((proc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-3 relative group hover:bg-white/15 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF5271] text-white font-black text-lg flex items-center justify-center mx-auto shadow-md">
                  {proc.step}
                </div>
                <h3 className="font-bold text-lg text-white">{proc.title}</h3>
                <p className="text-slate-200 text-xs leading-relaxed">{proc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

   
{/* 3. MULTIDISCIPLINARY APPROACH (CHILD DEVELOPMENT CENTER) - BILKUL NEECHE */}
      <section className="py-20 bg-[#F1F5F9] border-t border-slate-200 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#00A8CD] font-bold text-xs uppercase tracking-[0.2em] bg-[#00A8CD]/10 px-3.5 py-1.5 rounded-full border border-[#00A8CD]/20">
              CHILD DEVELOPMENT & FAMILY SUPPORT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#003B5C] leading-tight">
              A Multidisciplinary Approach for Children
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              
We provide personalized, multidisciplinary support designed to understand each child’s unique strengths, needs, and developmental goals while supporting communication, learning, behavior, sensory development, and independence.
</p>
           
            <div className="pt-2">
              <Link 
                to="/book-a-free-consult" 
                className="inline-block bg-[#FF5271] hover:bg-[#e04360] text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-[#FF5271]/30 transition-all duration-300"
              >
                Book Child Consultation
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-8 rounded-3xl shadow-xl border border-slate-200 text-center space-y-6">
            <div className="inline-block bg-[#003B5C] text-white font-serif font-bold px-6 py-3 rounded-2xl shadow-md text-lg">
              Child Development Center
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { title: "Speech Therapy", icon: "🗣️" },
                { title: "Occupational Therapy", icon: "👐" },
                { title: "ABA Therapy", icon: "🧩" },
                { title: "Nutrition", icon: "🥗" },
                { title: "Education", icon: "📚" },
                { title: "Psychology", icon: "🧠" }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#F8F9FA] p-4 rounded-2xl border border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-[#00A8CD] transition shadow-sm">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-bold text-[#003B5C]">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. MULTIDISCIPLINARY APPROACH (ADULT REHABILITATION CENTER) - BILKUL NEECHE */}
      <section className="py-20 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#FF5271] font-bold text-xs uppercase tracking-[0.2em] bg-[#FF5271]/10 px-3.5 py-1.5 rounded-full border border-[#FF5271]/20">
              ADULT HEALTH & WELLNESS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#003B5C] leading-tight">
              A Multidisciplinary Approach for Adults
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We provide personalized, multidisciplinary support for adults focused on improving nutrition, physical function, communication, swallowing, healthy lifestyle habits, and overall quality of life.
               </p>
          
            <div className="pt-2">
              <Link 
                to="/book-a-free-consult" 
                className="inline-block bg-[#003B5C] hover:bg-[#002840] text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-[#003B5C]/30 transition-all duration-300"
              >
                Book Adult Consultation
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-8 rounded-3xl shadow-xl border border-slate-200 text-center space-y-6">
            <div className="inline-block bg-[#FF5271] text-white font-serif font-bold px-6 py-3 rounded-2xl shadow-md text-lg">
              Adult Rehabilitation Center
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { title: "Speech Rehab", icon: "🗣️" },
                { title: "Physiotherapy", icon: "🏃" },
                { title: "Occupational", icon: "👐" },
                { title: "Dietetics", icon: "🥗" },
                { title: "Dysphagia", icon: "🩺" },
                { title: "Psychology", icon: "🧠" }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#F8F9FA] p-4 rounded-2xl border border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-[#FF5271] transition shadow-sm">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-bold text-[#003B5C]">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
      

    </div>
  );
}

export default Services;