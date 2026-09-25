import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// ========================================================
// 1. INLINE SVG ICONS (Zero Import/Package Error)
// ========================================================
const IconBrain = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const IconPulse = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconComments = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const IconHeart = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const IconBaby = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const IconBook = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconSparkles = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const IconUsers = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-4 h-4 text-[#00A8CD] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const IconClose = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ========================================================
// 2. CONDITIONS DATA ARRAY WITH WEBSITE BRAND COLORS
// ========================================================
const conditions = [
  {
    id: "asd",
    title: "Autism Spectrum Disorder (ASD)",
    shortDescription: "Neurodevelopmental condition affecting social interaction, communication, and sensory processing.",
    icon: IconBrain,
    color: "#FF5271", // Coral Pink
    description: "Autism Spectrum Disorder is a neurodevelopmental condition affecting communication, social interaction, and sensory processing. Early structured intervention builds daily functional independence.",
    areas: ["Functional Communication", "Social Engagement", "Sensory Processing", "Behavioral Flexibility"],
    supportedBy: ["ABA Therapy", "Speech Therapy", "Occupational Therapy", "Parent Training"]
  },
  {
    id: "adhd",
    title: "ADHD & Attention Challenges",
    shortDescription: "Difficulties with executive functioning, impulse control, sustained attention, and hyperactivity.",
    icon: IconPulse,
    color: "#F5A623", // Warm Yellow
    description: "Attention-Deficit/Hyperactivity Disorder affects executive function skills like organization, task completion, impulse control, and emotional regulation.",
    areas: ["Sustained Attention", "Impulse Regulation", "Executive Functioning", "Task Organization"],
    supportedBy: ["Behavioral Therapy", "Occupational Therapy", "Parent Coaching"]
  },
  {
    id: "speech",
    title: "Speech & Language Delay",
    shortDescription: "Challenges in expressive language, receptive comprehension, and articulation clarity.",
    icon: IconComments,
    color: "#00A8CD", // Sky Blue
    description: "Delays in speech articulation, language comprehension, and verbal expression that limit a child's ability to communicate effectively.",
    areas: ["Articulation & Clarity", "Expressive Vocabulary", "Receptive Understanding", "Social Pragmatics"],
    supportedBy: ["Speech Therapy", "Early Intervention", "Parent Training"]
  },
  {
    id: "down-syndrome",
    title: "Down Syndrome",
    shortDescription: "Genetic developmental condition requiring holistic motor, cognitive, and speech milestones support.",
    icon: IconHeart,
    color: "#FF5271", // Coral Pink
    description: "A developmental condition where tailored early intervention strengthens motor tone, speech clarity, cognitive processing, and self-reliance skills.",
    areas: ["Gross & Fine Motor Skills", "Speech Clarity", "Cognitive Enhancement", "Social Integration"],
    supportedBy: ["Physiotherapy", "Speech Therapy", "Occupational Therapy"]
  },
  {
    id: "developmental-delay",
    title: "Global Developmental Delay",
    shortDescription: "Delays in reaching expected physical, cognitive, communication, or emotional milestones.",
    icon: IconBaby,
    color: "#00A8CD", // Sky Blue
    description: "Occurs when children do not reach key developmental milestones at expected ages. Multidisciplinary care helps bridge developmental gaps.",
    areas: ["Milestone Catch-Up", "Motor Coordination", "Early Cognitive Skills", "Play & Exploration"],
    supportedBy: ["Early Intervention", "Occupational Therapy", "Speech Therapy"]
  },
  {
    id: "learning",
    title: "Learning Difficulties",
    shortDescription: "Academic challenges in reading, writing, mathematical comprehension, and information processing.",
    icon: IconBook,
    color: "#F5A623", // Warm Yellow
    description: "Challenges in specific academic domains that require structured, multi-sensory teaching methods to unlock academic confidence.",
    areas: ["Reading & Literacy", "Writing Clarity", "Mathematical Reasoning", "Working Memory"],
    supportedBy: ["Montessori Learning", "Behavioral Therapy", "Early Education"]
  },
  {
    id: "sensory",
    title: "Sensory Processing Sensitivity",
    shortDescription: "Over or under-reactivity to sensory input such as touch, movement, light, or sound.",
    icon: IconSparkles,
    color: "#F5A623", // Warm Yellow
    description: "Occurs when the nervous system struggles to process environmental stimuli, leading to sensory overload or intense sensory seeking.",
    areas: ["Sensory Modulation", "Environmental Adaptability", "Body Awareness", "Focus & Calming"],
    supportedBy: ["Occupational Therapy", "Sensory Integration"]
  },
  {
    id: "social-comm",
    title: "Social Communication Difficulties",
    shortDescription: "Trouble reading body language, building peer friendships, and maintaining conversations.",
    icon: IconUsers,
    color: "#00A8CD", // Sky Blue
    description: "Pragmatic language difficulties that make it hard for children to initiate, maintain, and adapt social interactions with peers.",
    areas: ["Peer Group Play", "Conversational Turn-Taking", "Non-Verbal Cues", "Group Integration"],
    supportedBy: ["Speech Therapy", "ABA Social Groups", "Parent Coaching"]
  }
];

export default function ConditionsPage() {
  const [selectedCondition, setSelectedCondition] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const leftConditions = conditions.slice(0, 4);
  const rightConditions = conditions.slice(4, 8);

  return (
    <div className="w-full bg-[#F8F9FA] text-[#003B5C] font-sans overflow-x-hidden min-h-screen">
      
      {/* ================= 1. HERO SECTION (MATCHING WEBSITE BRANDING) ================= */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] bg-[#003B5C] text-white flex items-center justify-center overflow-hidden py-20 px-4 sm:px-8">
        {/* Background Gradient & Animated Glows */}
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

          {/* HEADLINE */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white uppercase"
          >
            BRIDGING GAPS, <br />
            <span className="text-[#FF5271] italic">BUILDING INDEPENDENCE</span>
          </motion.h1>

          {/* SUB-TEXT */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-200 text-sm sm:text-lg max-w-3xl mx-auto font-normal leading-relaxed"
          >
            At ABC Autism Behavioral Center, we empower children with specialized developmental, speech, and behavioral therapy tailored to unlock their true potential[cite: 1, 2].
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a 
              href="#conditions-list" 
              className="w-full sm:w-auto bg-[#FF5271] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-xl shadow-slate-950/20 hover:bg-[#e04360] transition-all duration-300 transform hover:-translate-y-1"
            >
              Explore Conditions
            </a>
            <a 
              href="#appointment" 
              className="w-full sm:w-auto bg-transparent border-2 border-white/80 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white hover:text-[#003B5C] transition-all duration-300 transform hover:-translate-y-1"
            >
              Book an Assessment
            </a>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="pt-12 flex flex-col items-center gap-2 opacity-80"
          >
            <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-200">SCROLL DOWN</span>
            <div className="w-5 h-9 border-2 border-white/80 rounded-full flex justify-center pt-1">
              <div className="w-1.5 h-2 bg-[#F5A623] rounded-full animate-bounce" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 2. MAIN CONDITIONS SECTION ================= */}
      <section id="conditions-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-[#00A8CD] font-extrabold text-xs uppercase tracking-widest bg-[#00A8CD]/10 px-4 py-1.5 rounded-full border border-[#00A8CD]/20">
            WHAT WE TREAT
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#003B5C]">
            Conditions We Support
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every child is unique. Our multidisciplinary team provides personalized support for a wide range of developmental, communication, behavioral and learning needs[cite: 1, 2].
          </p>
        </div>

        {/* Two Column Condition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            {leftConditions.map((item) => (
              <ConditionCard 
                key={item.id} 
                data={item} 
                isSelected={selectedCondition?.id === item.id}
                onClick={() => setSelectedCondition(selectedCondition?.id === item.id ? null : item)}
              />
            ))}
          </div>

          <div className="space-y-4">
            {rightConditions.map((item) => (
              <ConditionCard 
                key={item.id} 
                data={item} 
                isSelected={selectedCondition?.id === item.id}
                onClick={() => setSelectedCondition(selectedCondition?.id === item.id ? null : item)}
              />
            ))}
          </div>
        </div>

        {/* Expandable Details Modal */}
        <AnimatePresence>
          {selectedCondition && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#00A8CD] shadow-2xl space-y-6 relative max-w-4xl mx-auto my-6"
            >
              <button 
                onClick={() => setSelectedCondition(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <IconClose />
              </button>

              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner"
                  style={{ backgroundColor: `${selectedCondition.color}15`, color: selectedCondition.color }}
                >
                  <selectedCondition.icon />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#00A8CD]">CONDITION DETAILS</span>
                  <h2 className="text-2xl font-bold text-[#003B5C]">{selectedCondition.title}</h2>
                </div>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {selectedCondition.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-[#EAF7F3]/60 p-5 rounded-2xl border border-emerald-100 space-y-3">
                  <h4 className="font-bold text-xs text-[#003B5C] uppercase tracking-wider">Areas We Support:</h4>
                  <ul className="space-y-2">
                    {selectedCondition.areas.map((area, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                        <IconCheck />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#EAF7F3]/60 p-5 rounded-2xl border border-emerald-100 space-y-3">
                  <h4 className="font-bold text-xs text-[#003B5C] uppercase tracking-wider">Services That Support This:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCondition.supportedBy.map((srv, i) => (
                      <span key={i} className="bg-white border border-[#00A8CD]/30 text-[#003B5C] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>

    </div>
  );
}

// ========================================================
// SINGLE CONDITION CARD COMPONENT
// ========================================================
function ConditionCard({ data, isSelected, onClick }) {
  const IconComponent = data.icon;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      onClick={onClick}
      role="button"
      className={`group cursor-pointer bg-white rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl ${
        isSelected ? 'border-[#FF5271] bg-[#FF5271]/5 shadow-md' : 'border-slate-100 hover:border-[#00A8CD]/40'
      }`}
    >
      <div className="flex items-center gap-4">
        {/* ICON CONTAINER */}
        <div 
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0"
          style={{ backgroundColor: `${data.color}15`, color: data.color }}
        >
          <IconComponent />
        </div>

        {/* TITLE & DESCRIPTION */}
        <div>
          <h3 className="font-bold text-base text-[#003B5C] group-hover:text-[#FF5271] transition-colors">
            {data.title}
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm line-clamp-1 mt-0.5">
            {data.shortDescription}
          </p>
        </div>
      </div>
    </motion.div>
  );
}