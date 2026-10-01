import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

// ========================================================
// 1. INLINE SVG ICONS (Zero Import/Package Error)
// ========================================================
const IconBrain = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const IconPulse = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconComments = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const IconHeart = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const IconBaby = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const IconBook = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconSparkles = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const IconUsers = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-4 h-4 text-[#00A8CD] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const IconClose = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ========================================================
// 2. CONDITIONS DATA ARRAY
// ========================================================
const conditionsList = [
  {
    id: "speech-therapy",
    title: "1. Speech & Language Therapy",
    shortDescription: "Support for speech delays, articulation disorders, stuttering, and communication difficulties.",
    icon: IconComments,
    color: "#00A8CD",
    intro: "We provide support for:",
    items: [
      "Speech & Language Delays",
      "Speech Sound & Articulation Disorders",
      "Receptive & Expressive Language Difficulties",
      "Childhood Communication Disorders",
      "Fluency Disorders & Stuttering",
      "Social Communication Difficulties",
      "Pragmatic Language Difficulties",
      "Voice & Communication Difficulties",
      "Autism-Related Communication Needs",
      "Developmental Communication Difficulties",
      "Adult Speech & Language Disorders"
    ]
  },
  {
    id: "nutrition-therapy",
    title: "2. Nutrition Therapy & Dietetics",
    shortDescription: "Nutritional assessment and therapeutic nutrition support for clinical and growth needs.",
    icon: IconPulse,
    color: "#F5A623",
    intro: "We provide nutritional assessment and therapeutic nutrition support for:",
    items: [
      "Overweight & Obesity",
      "Diabetes & Prediabetes",
      "Hypertension",
      "Cardiovascular Conditions",
      "Dyslipidemia",
      "Gastrointestinal Disorders",
      "Kidney & Renal Conditions",
      "Liver & Metabolic Conditions",
      "Anemia & Nutritional Deficiencies",
      "Malnutrition",
      "Pediatric Nutrition & Growth Concerns",
      "Pregnancy & Maternal Nutrition",
      "Weight Management",
      "Disease-Specific Nutritional Needs",
      "Therapeutic & Lifestyle Nutrition Needs"
    ]
  },
  {
    id: "special-education",
    title: "3. Special Education",
    shortDescription: "Tailored educational programs for learning difficulties, autism, and developmental needs.",
    icon: IconBook,
    color: "#FF5271",
    intro: "We support children with:",
    items: [
      "Autism Spectrum Disorder",
      "Intellectual & Developmental Disabilities",
      "Developmental Delays",
      "Learning Difficulties",
      "Attention & Learning Challenges",
      "Communication-Related Learning Needs",
      "Academic Skill Difficulties",
      "School Readiness Challenges",
      "Adaptive & Functional Learning Needs",
      "Social & Emotional Learning Needs",
      "Individualized Educational Needs"
    ]
  },
  {
    id: "physiotherapy",
    title: "4. Physiotherapy",
    shortDescription: "Physical rehabilitation, motor delays, posture support, and post-injury care.",
    icon: IconHeart,
    color: "#00A8CD",
    intro: "We provide support for:",
    items: [
      "Developmental Motor Delays",
      "Gross Motor Difficulties",
      "Muscle Weakness",
      "Balance & Coordination Difficulties",
      "Mobility Limitations",
      "Posture & Movement Difficulties",
      "Neurological Rehabilitation Needs",
      "Musculoskeletal Conditions",
      "Post-Injury Rehabilitation",
      "Post-Surgical Rehabilitation",
      "Functional Movement Limitations",
      "Physical Rehabilitation Needs"
    ]
  },
  {
    id: "occupational-therapy",
    title: "5. Occupational Therapy & Sensory Integration",
    shortDescription: "Sensory processing, motor coordination, self-care, and daily living independence.",
    icon: IconSparkles,
    color: "#F5A623",
    intro: "We support individuals experiencing:",
    items: [
      "Sensory Processing Difficulties",
      "Fine Motor Difficulties",
      "Gross Motor Coordination Challenges",
      "Activities of Daily Living Difficulties",
      "Self-Care Challenges",
      "Handwriting Difficulties",
      "Attention & Functional Participation Difficulties",
      "Motor Planning Difficulties",
      "Visual-Motor & Coordination Difficulties",
      "Play Skill Difficulties",
      "Social Participation Challenges",
      "Independence & Functional Skill Difficulties"
    ]
  },
  {
    id: "day-care",
    title: "6. Day Care",
    shortDescription: "Structured and nurturing environment focusing on routine, socialization, and early learning.",
    icon: IconBaby,
    color: "#FF5271",
    intro: "Our daycare provides a structured and nurturing environment for children who may benefit from:",
    items: [
      "Early Developmental Support",
      "Structured Daily Routines",
      "Socialization & Peer Interaction",
      "Early Learning Support",
      "Communication Development",
      "Self-Care & Independence Skills",
      "Behavioral & Routine Support",
      "School Readiness Activities",
      "Age-Appropriate Play & Learning"
    ]
  },
  {
    id: "montessori-education",
    title: "7. Montessori & Early Childhood Education",
    shortDescription: "Early childhood programs supporting developmental milestones and school readiness.",
    icon: IconBook,
    color: "#00A8CD",
    intro: "Our early childhood programs support children with:",
    items: [
      "Developmental Delays",
      "Early Learning Difficulties",
      "School Readiness Needs",
      "Attention & Concentration Difficulties",
      "Communication & Language Delays",
      "Fine Motor Skill Difficulties",
      "Social & Interaction Challenges",
      "Self-Care & Independence Needs",
      "Early Academic Skill Difficulties",
      "Individualized Learning Needs"
    ]
  },
  {
    id: "dysphagia-management",
    title: "8. Dysphagia Management & NG Tube Feeding",
    shortDescription: "Specialized feeding, swallowing, and enteral nutrition support coordination.",
    icon: IconPulse,
    color: "#F5A623",
    note: "Dysphagia and feeding care is provided through coordinated support between Speech & Language Therapy and Nutrition & Dietetics, with medical coordination where required.",
    intro: "We provide specialized support for individuals with:",
    items: [
      "Dysphagia",
      "Swallowing Difficulties",
      "Pediatric Feeding Difficulties",
      "Oral-Motor Difficulties",
      "Feeding & Swallowing Disorders",
      "Difficulty Managing Food Textures",
      "Aspiration-Related Feeding Concerns",
      "Nutritional Challenges Associated with Dysphagia",
      "Hydration & Nutrition Support Needs",
      "NG Tube Feeding Requirements",
      "Enteral Nutrition Needs"
    ]
  },
  {
    id: "aba-psychology",
    title: "9. ABA Therapy & Psychology",
    shortDescription: "Individualized behavioral and psychological support for autism and behavioral needs.",
    icon: IconBrain,
    color: "#FF5271",
    intro: "We provide individualized behavioral and psychological support for:",
    items: [
      "Autism Spectrum Disorder",
      "Developmental & Behavioral Difficulties",
      "Challenging Behaviors",
      "Attention Challenges"
    ]
  }
];

export default function ConditionsPage() {
  const [selectedCondition, setSelectedCondition] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full bg-[#F8F9FA] text-[#003B5C] font-sans overflow-x-hidden min-h-screen">
      
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] bg-[#003B5C] text-white flex items-center justify-center overflow-hidden py-20 px-4 sm:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-[#003B5C] via-[#003B5C]/95 to-[#00A8CD]/80 z-0" />

        <motion.div 
          animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-[#F5A623]/15 rounded-full blur-3xl pointer-events-none z-0"
        />
        <motion.div 
          animate={shouldReduceMotion ? {} : { scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF5271]/15 rounded-full blur-3xl pointer-events-none z-0"
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-block"
          >
            <span className="bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] text-[11px] sm:text-xs font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-sm backdrop-blur-sm">
              SPECIALIZED SUPPORT FOR UNIQUE CHALLENGES
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white uppercase"
          >
            CONDITIONS WE <br />
            <span className="text-[#FF5271] italic">SUPPORT</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-200 text-sm sm:text-lg max-w-3xl mx-auto font-normal leading-relaxed"
          >
            At ABC Centre, we provide individualized support for a wide range of developmental, communication, behavioral, nutritional, physical, sensory, educational, and functional needs. Our multidisciplinary team works with children, adults, and families to develop personalized care plans based on individual needs and goals[cite: 1, 2].
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a 
              href="#conditions-grid" 
              className="w-full sm:w-auto bg-[#FF5271] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-xl shadow-slate-950/20 hover:bg-[#e04360] transition-all duration-300 transform hover:-translate-y-1"
            >
              Explore Conditions
            </a>
            <a 
              href="/book-appointment" 
              className="w-full sm:w-auto bg-transparent border-2 border-white/80 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white hover:text-[#003B5C] transition-all duration-300 transform hover:-translate-y-1"
            >
              Book an Assessment
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================= 2. 9-BOX BENTO GRID ================= */}
      <section id="conditions-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16">
        
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[#00A8CD] font-extrabold text-xs uppercase tracking-widest bg-[#00A8CD]/10 px-4 py-1.5 rounded-full border border-[#00A8CD]/20">
            COMPREHENSIVE CARE DIRECTORY
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-[#003B5C]">
            Our Specialized Support Areas
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Click on any category card below to view complete professional breakdown items and focused care services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {conditionsList.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white rounded-3xl p-8 border border-slate-100 hover:border-[#00A8CD]/60 transition-all duration-500 overflow-hidden shadow-[0_10px_30px_rgba(0,59,92,0.06)] hover:shadow-[0_20px_50px_rgba(0,59,92,0.15)] flex flex-col justify-between"
              >
                <div 
                  className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-2.5" 
                  style={{ backgroundColor: item.color }} 
                />

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <motion.div 
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-transform"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      <IconComponent />
                    </motion.div>
                    
                    <span 
                      className="text-[10px] uppercase tracking-wider font-extrabold px-3.5 py-1.5 rounded-full border shadow-sm"
                      style={{ backgroundColor: `${item.color}10`, color: item.color, borderColor: `${item.color}30` }}
                    >
                      {item.items.length} Focus Areas
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-xl text-[#003B5C] group-hover:text-[#00A8CD] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {item.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Card Footer with "View Breakdown" Button (Arrow Removed & Included in modal trigger) */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                    <button 
                      onClick={() => setSelectedCondition(item)}
                      className="w-full bg-[#003B5C] hover:bg-[#FF5271] text-white text-xs font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:shadow-[#FF5271]/30 border border-white/10 text-center cursor-pointer uppercase tracking-wider"
                    >
                      View Breakdown
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= 3. MODAL POPUP ================= */}
        <AnimatePresence>
          {selectedCondition && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B2545]/60 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative my-auto max-h-[90vh] flex flex-col"
              >
                <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner flex-shrink-0"
                      style={{ backgroundColor: `${selectedCondition.color}15`, color: selectedCondition.color }}
                    >
                      <selectedCondition.icon />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00A8CD]">SPECIALIZED CATEGORY</span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#003B5C]">{selectedCondition.title}</h3>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedCondition(null)}
                    className="w-10 h-10 rounded-full bg-white hover:bg-slate-200 text-slate-600 flex items-center justify-center transition shadow-sm border border-slate-200 cursor-pointer"
                  >
                    <IconClose />
                  </button>
                </div>

                <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                  <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed bg-[#F8F9FA] p-4 rounded-2xl border border-slate-100 shadow-sm">
                    {selectedCondition.intro}
                  </p>

                  {selectedCondition.note && (
                    <div className="bg-[#EAF7F3] p-4 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                      {selectedCondition.note}
                    </div>
                  )}

                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-wider font-extrabold text-slate-400">Included Support Items ({selectedCondition.items.length})</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedCondition.items.map((subItem, i) => (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          key={i} 
                          className="bg-slate-50 hover:bg-[#00A8CD]/5 p-3.5 rounded-2xl border border-slate-100 flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium transition-colors"
                        >
                          <IconCheck />
                          <span>{subItem}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                  <button
                    onClick={() => setSelectedCondition(null)}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition cursor-pointer text-center"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </section>

    </div>
  );
}