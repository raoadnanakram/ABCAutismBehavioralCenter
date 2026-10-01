import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

// ========================================================
// ICONS
// ========================================================

const IconSparkles = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

const IconCheck = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const IconMessage = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 10h8M8 14h5M20 11.5c0 4.694-4.03 8.5-9 8.5a9.9 9.9 0 01-4.25-.95L3 21l1.5-3.55C3.56 16.1 3 14.4 3 12.5 3 7.806 7.03 4 12 4s8 3.806 8 7.5z"
    />
  </svg>
);

const IconMic = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
  >
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path
      strokeLinecap="round"
      d="M5 11a7 7 0 0014 0M12 18v3M8 21h8"
    />
  </svg>
);

const IconUsers = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
    />
  </svg>
);

const IconChild = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
  >
    <circle cx="12" cy="7" r="3" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 21v-2a6 6 0 0112 0v2M8 13l-2 3M16 13l2 3"
    />
  </svg>
);

const IconVoice = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"
    />
  </svg>
);

const IconHeart = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.8 8.8c0 5.5-8.8 10.7-8.8 10.7S3.2 14.3 3.2 8.8A4.8 4.8 0 0112 6.1a4.8 4.8 0 018.8 2.7z"
    />
  </svg>
);

const IconTarget = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" />
  </svg>
);

const IconChart = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
  >
    <path strokeLinecap="round" d="M4 19V5M4 19h16" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 15l3-4 3 2 5-7"
    />
  </svg>
);

const IconLaptop = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
  >
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path strokeLinecap="round" d="M2 20h20" />
  </svg>
);

const IconShield = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4"
    />
  </svg>
);

const IconArrow = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14M13 6l6 6-6 6"
    />
  </svg>
);

const IconClose = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      d="M6 6l12 12M18 6L6 18"
    />
  </svg>
);

// ========================================================
// DATA
// ========================================================

const servicesList = [
  {
    title: "Speech & Articulation Therapy",
    desc: "Support for unclear speech sounds and speech intelligibility.",
    icon: IconMic,
    color: "#00A8CD",
    points: [
      "Speech sound difficulties",
      "Articulation errors",
      "Phonological difficulties",
      "Reduced speech intelligibility",
      "Motor-speech related concerns when appropriate",
    ],
  },
  {
    title: "Language Therapy",
    desc: "Support for receptive and expressive language development.",
    icon: IconMessage,
    color: "#FF5271",
    points: [
      "Understanding spoken language",
      "Using words and sentences",
      "Vocabulary development",
      "Following instructions",
      "Grammar and sentence formulation",
      "Narrative and storytelling skills",
      "Functional communication",
    ],
  },
  {
    title: "Early Communication & Pediatric Therapy",
    desc: "Development of functional communication and age-appropriate skills.",
    icon: IconChild,
    color: "#F5A623",
    points: [
      "Speech and language delay",
      "Early communication skills",
      "Joint attention and interaction",
      "Play-based communication",
      "Parent-mediated communication strategies",
    ],
  },
  {
    title: "Fluency / Stammering Support",
    desc: "Individualized strategies for fluency and confident communication.",
    icon: IconVoice,
    color: "#8B5CF6",
    points: [
      "Assessment of fluency concerns",
      "Communication strategies",
      "Reducing communication-related struggle",
      "Reducing avoidance",
      "Building effective communication",
    ],
  },
  {
    title: "Voice Therapy",
    desc: "Support for appropriate and healthy voice use when clinically indicated.",
    icon: IconVoice,
    color: "#00A8CD",
    points: [
      "Voice assessment when indicated",
      "Healthy voice use",
      "Appropriate communication strategies",
      "Functional voice support",
    ],
  },
  {
    title: "Social Communication",
    desc: "Support for interaction, conversation, turn-taking, and pragmatic language skills.",
    icon: IconUsers,
    color: "#FF5271",
    points: [
      "Turn-taking",
      "Conversation skills",
      "Topic maintenance",
      "Understanding social cues",
      "Appropriate language use",
    ],
  },
  {
    title: "AAC / Alternative Communication Support",
    desc: "Guidance for clients who benefit from augmentative or alternative communication.",
    icon: IconMessage,
    color: "#F5A623",
    points: [
      "Alternative communication support",
      "Functional communication",
      "AAC guidance",
      "Communication strategy support",
    ],
  },
  {
    title: "Feeding & Oral-Motor Support",
    desc: "Assessment and therapy for appropriate feeding-related concerns within professional scope.",
    icon: IconHeart,
    color: "#FF5271",
    points: [
      "Feeding-related concerns",
      "Oral-motor support",
      "Feeding assessment",
      "Appropriate therapeutic intervention",
      "Referral for complex concerns when required",
    ],
  },
  {
    title: "Parent / Caregiver Training",
    desc: "Practical strategies to support communication and therapy goals at home.",
    icon: IconUsers,
    color: "#00A8CD",
    points: [
      "Home communication strategies",
      "Caregiver guidance",
      "Home practice",
      "Carryover into daily routines",
    ],
  },
  {
    title: "Online Consultation",
    desc: "Appropriate speech and language guidance through online sessions.",
    icon: IconLaptop,
    color: "#8B5CF6",
    points: [
      "Initial consultation",
      "Case history",
      "Speech and language guidance",
      "Parent counseling",
      "Home-program planning",
      "Follow-up monitoring",
    ],
  },
];

const assessmentItems = [
  "Case history and caregiver interview",
  "Speech and language screening",
  "Receptive and expressive language assessment",
  "Speech sound and intelligibility assessment",
  "Fluency assessment when indicated",
  "Voice assessment when indicated",
  "Social communication assessment",
  "Functional communication observation",
  "Feeding/oral-motor screening when relevant and within scope",
];

const approachItems = [
  {
    title: "Client-Centered",
    desc: "Activities are adapted around the client's needs, abilities and priorities.",
    icon: IconHeart,
  },
  {
    title: "Play-Based",
    desc: "Young children can learn communication skills through meaningful play.",
    icon: IconChild,
  },
  {
    title: "Structured Practice",
    desc: "Repetition and guided practice support skill development.",
    icon: IconTarget,
  },
  {
    title: "Visual Supports",
    desc: "Modeling and visual strategies can make communication easier to understand.",
    icon: IconMessage,
  },
  {
    title: "Functional Goals",
    desc: "Therapy focuses on meaningful communication in everyday life.",
    icon: IconSparkles,
  },
  {
    title: "Progress Monitoring",
    desc: "Goals are reviewed and adjusted according to progress and needs.",
    icon: IconChart,
  },
];

const carePlans = [
  {
    title: "Communication Care Plan",
    icon: IconTarget,
    color: "#00A8CD",
    items: [
      "Initial speech and language assessment",
      "Individualized therapy goals",
      "Personalized intervention plan",
      "Home practice recommendations",
      "Caregiver guidance",
      "Progress monitoring",
      "Regular follow-up",
    ],
  },
  {
    title: "Comprehensive Speech & Language Care Plan",
    icon: IconShield,
    color: "#FF5271",
    items: [
      "Detailed assessment of multiple communication areas",
      "Individualized treatment planning",
      "Regular therapy sessions according to need",
      "Parent/caregiver training",
      "Home-program support",
      "Progress documentation",
      "Referral or multidisciplinary coordination when required",
    ],
  },
];

const howItWorksSteps = [
  {
    step: "01",
    title: "Assessment",
    desc: "We begin by understanding the client's history, communication concerns, strengths, and goals.",
  },
  {
    step: "02",
    title: "Goal Setting",
    desc: "Specific, functional and measurable therapy goals are established.",
  },
  {
    step: "03",
    title: "Personalized Therapy",
    desc: "Activities and techniques are selected according to the client's needs and abilities.",
  },
  {
    step: "04",
    title: "Home Support",
    desc: "Caregivers receive practical strategies to support communication outside therapy.",
  },
  {
    step: "05",
    title: "Monitor",
    desc: "Progress is reviewed regularly and goals are adjusted when appropriate.",
  },
  {
    step: "06",
    title: "Generalize",
    desc: "The goal is to help the client use learned skills in everyday situations.",
  },
];

const onlineItems = [
  "Initial consultation and case history",
  "Speech and language guidance",
  "Parent/caregiver counseling",
  "Home-program planning",
  "Follow-up monitoring",
  "Teletherapy for appropriate clients and concerns",
];

// ========================================================
// REUSABLE SECTION HEADING
// ========================================================

const SectionHeading = ({
  eyebrow,
  title,
  description,
  light = false,
}) => {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.span
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.18em] ${
          light
            ? "bg-white/10 text-[#F5A623] border border-white/10"
            : "bg-[#00A8CD]/10 text-[#00A8CD] border border-[#00A8CD]/20"
        }`}
      >
        <IconSparkles />
        {eyebrow}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className={`mt-4 text-2xl sm:text-4xl lg:text-5xl font-extrabold font-serif leading-tight ${
          light ? "text-white" : "text-[#003B5C]"
        }`}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`mt-3 text-sm sm:text-base leading-relaxed ${
            light ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

// ========================================================
// MAIN PAGE
// ========================================================

export default function SpeechTherapyPage() {
  const [activeService, setActiveService] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full bg-[#F8F9FA] text-[#003B5C] font-sans overflow-x-hidden">

      {/* ==================================================
          COMPACT & ATTRACTIVE HERO SECTION
      ================================================== */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-[#003B5C] px-4 sm:px-8 py-16 sm:py-20">

        {/* Rich multi-layered background gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#002238] via-[#003B5C] to-[#015C7F]" />

        {/* Animated glowing gradient blobs */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.3, 1],
                  x: [0, 40, 0],
                  y: [0, -30, 0],
                }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#00A8CD]/20 blur-[120px] pointer-events-none"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.25, 1],
                  x: [0, -40, 0],
                  y: [0, 40, 0],
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#FF5271]/20 blur-[130px] pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-10 items-center">

          {/* HERO LEFT TEXT */}
          <div className="lg:col-span-7 text-center lg:text-left">

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex"
            >
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-xl text-[#F5A623] text-xs font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-full shadow-lg shadow-black/10">
                <IconSparkles />
                Advanced Speech & Language Care
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-black font-serif leading-[1.1] text-white tracking-tight"
            >
              Helping You <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] to-[#FF8C42] italic">
                Communicate.
              </span>{" "}
              Helping You{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5271] to-[#FF8EA3] italic">
                Connect.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-4 max-w-xl mx-auto lg:mx-0 text-slate-200 text-sm sm:text-base leading-relaxed font-normal"
            >
              Personalized speech and language therapy designed around the
              individual needs of children and adults. Focus on clarity, fluency, voice, and feeding support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              {/* Requested Button */}
              <Link
                to="/book-a-free-consult"
                className="bg-[#003B5C] hover:bg-[#FF5271] text-white text-base font-bold px-8 py-3.5 rounded-full shadow-lg shadow-[#003B5C]/20 transition-all duration-300 text-center block border border-white/20"
              >
                Explore Services
              </Link>
              

              <a
                href="/book-appointment"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:bg-white hover:text-[#003B5C] text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-full backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                Book Consultation
              </a>
            </motion.div>

            {/* TRUST PILLS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-bold text-slate-200"
            >
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                <span className="text-[#F5A623]"><IconCheck /></span>
                <span>Tailored Plans</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                <span className="text-[#F5A623]"><IconCheck /></span>
                <span>Evidence-Informed</span>
              </div>
            </motion.div>
          </div>

          {/* HERO RIGHT COMPACT VISUAL */}
          <div className="lg:col-span-5 relative min-h-[380px] flex items-center justify-center">

            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, -10, 0],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-[280px] sm:w-[350px] h-[360px] sm:h-[400px]"
            >
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-[#00A8CD]/30 to-[#FF5271]/30 blur-xl" />

              <div className="absolute inset-4 rounded-[35px] bg-white/10 border border-white/25 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col justify-between p-6">

                <div className="flex justify-between items-center">
                  <span className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-[#F5A623]">
                    <IconSparkles />
                  </span>
                  <span className="text-[10px] uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded-full text-slate-200 font-bold">
                    Expert Care
                  </span>
                </div>

                <div className="text-center space-y-2">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#00A8CD] to-[#FF5271] p-1 shadow-xl flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#003B5C] flex items-center justify-center text-white">
                      <IconMessage />
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-white">
                    Unlock Potential
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-[240px] mx-auto">
                    Building confidence and clarity through specialized therapy.
                  </p>
                </div>

                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/20 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#F5A623] text-[#003B5C] flex items-center justify-center font-black text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Active Support Program</p>
                    <p className="text-[10px] text-slate-300">Customized milestones</p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Curved Wave Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#F8F9FA] [clip-path:ellipse(70%_55%_at_50%_100%)]" />
      </section>

      {/* ==================================================
          TRUST STRIP
      ================================================== */}
      <section className="relative z-20 -mt-4 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-[30px] shadow-[0_15px_50px_rgba(0,59,92,0.1)] border border-slate-100 p-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            {[
              ["01", "Individualized", "Care Plans"],
              ["02", "Functional", "Communication Goals"],
              ["03", "Family", "Caregiver Support"],
              ["04", "Progress", "Regular Monitoring"],
            ].map(([num, title, sub], index) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -3 }}
                className="text-center p-2 rounded-2xl hover:bg-[#00A8CD]/5 transition-colors"
              >
                <span className="text-[#FF5271] text-xs font-black">
                  {num}
                </span>
                <h3 className="font-bold text-[#003B5C] text-sm mt-1">
                  {title}
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          WELCOME / ABOUT
      ================================================== */}
      <section
        id="about"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-white rounded-[35px] p-7 sm:p-10 border border-slate-100 shadow-[0_15px_45px_rgba(0,59,92,0.07)] relative overflow-hidden"
          >
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-[#00A8CD]/10 blur-2xl" />

            <span className="inline-flex px-4 py-2 rounded-full bg-[#00A8CD]/10 text-[#00A8CD] text-[10px] font-black uppercase tracking-[0.18em]">
              Every Person Communicates Differently
            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold font-serif text-[#003B5C]">
              Communication That Fits
              <span className="text-[#FF5271] italic">
                {" "}the Individual.
              </span>
            </h2>

            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              Whether the concern involves delayed speech, difficulty
              understanding or expressing language, unclear speech,
              stammering, social communication, voice, or feeding and
              swallowing-related concerns, therapy is planned according
              to the client's abilities, needs, goals, and daily
              communication environment.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {[
                "Individualized assessment and goal setting",
                "Evidence-informed intervention",
                "Functional communication goals",
                "Family and caregiver involvement",
              ].map((text, index) => (
                <div
                  key={text}
                  className="flex gap-3 items-start p-2.5 rounded-xl hover:bg-[#00A8CD]/5 transition-colors"
                >
                  <span className="mt-0.5 text-[#00A8CD]">
                    <IconCheck />
                  </span>
                  <span className="text-xs sm:text-sm text-slate-600">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 rounded-[35px] p-7 sm:p-9 bg-gradient-to-br from-[#003B5C] to-[#00A8CD] text-white relative overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            <div>
              <span className="text-[#F5A623] text-xs font-black uppercase tracking-[0.2em]">
                Our Philosophy
              </span>

              <h3 className="mt-4 text-2xl sm:text-3xl font-serif font-bold">
                Therapy Beyond
                <span className="block text-[#F5A623]">
                  The Clinic.
                </span>
              </h3>

              <p className="mt-4 text-slate-200 text-sm leading-relaxed">
                Therapy is not only about practicing a skill in the clinic.
                The goal is to help the client use communication skills
                meaningfully in everyday life.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {[
                ["Functional", "Meaningful communication"],
                ["Family", "Caregiver involvement"],
                ["Progress", "Regular monitoring"],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#F5A623]">
                    <IconCheck />
                  </div>

                  <div>
                    <p className="font-bold text-xs">{title}</p>
                    <p className="text-[10px] text-slate-300">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================================================
          SERVICES
      ================================================== */}
      <section
        id="services"
        className="relative py-20 bg-white overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#00A8CD]/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#FF5271]/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Comprehensive Offerings"
            title="Our Specialized Services"
            description="Targeted therapeutic support designed to build confidence, clarity, connection and meaningful everyday communication."
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="group relative bg-[#F8F9FA] rounded-[28px] p-6 border border-slate-100 overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,59,92,0.1)] transition-all duration-400"
                >
                  <div
                    className="absolute -right-16 -top-16 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    style={{
                      backgroundColor: service.color,
                    }}
                  />

                  <motion.div
                    initial={{ width: "25%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-0 left-0 h-1 rounded-r-full"
                    style={{
                      backgroundColor: service.color,
                    }}
                  />

                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center"
                          style={{
                            backgroundColor: `${service.color}12`,
                            color: service.color,
                          }}
                        >
                          <Icon />
                        </div>

                        <span
                          className="text-[10px] font-black"
                          style={{
                            color: service.color,
                          }}
                        >
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="mt-5 text-lg font-serif font-bold text-[#003B5C] group-hover:text-[#00A8CD] transition-colors duration-300">
                        {service.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveService(service)}
                      className="mt-5 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#FF5271] cursor-pointer group-hover:gap-3 transition-all"
                    >
                      Explore Service
                      <IconArrow />
                    </button>
                  </div>
                </motion.div>
                
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          SERVICE MODAL
      ================================================== */}
      <AnimatePresence>
        {activeService && (
          <div className="fixed inset-0 z-[100] bg-[#003B5C]/70 backdrop-blur-md flex items-center justify-center p-4">

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 20,
              }}
              className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[35px] shadow-2xl"
            >
              <div
                className="h-2"
                style={{
                  backgroundColor: activeService.color,
                }}
              />

              <div className="p-6 sm:p-9">

                <div className="flex items-start justify-between gap-5">
                  <div>
                    <span
                      className="text-[10px] font-black uppercase tracking-[0.18em]"
                      style={{
                        color: activeService.color,
                      }}
                    >
                      Specialized Support
                    </span>

                    <h3 className="mt-2 text-2xl font-serif font-bold text-[#003B5C]">
                      {activeService.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setActiveService(null)}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#FF5271] hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <IconClose />
                  </button>
                </div>

                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  {activeService.desc}
                </p>

                <div className="mt-6 space-y-2.5">
                  {activeService.points.map((point, index) => (
                    <div
                      key={point}
                      className="flex gap-3 items-center p-3 rounded-2xl bg-[#F8F9FA] border border-slate-100"
                    >
                      <span
                        style={{
                          color: activeService.color,
                        }}
                      >
                        <IconCheck />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-700">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Added Button in Modal too for better flow */}
                <Link
                  to="/book-a-free-consult"
                  onClick={() => setActiveService(null)}
                  className="mt-7 w-full flex items-center justify-center gap-2 bg-[#003B5C] hover:bg-[#FF5271] text-white font-black uppercase tracking-wider text-xs py-3.5 rounded-full transition-all duration-300 shadow-lg text-center"
                >
                  Book Free Consultation
                  <IconArrow />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================
          ASSESSMENT
      ================================================== */}
      <section
        id="assessment"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="grid lg:grid-cols-12 gap-10 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-[35px] min-h-[420px] bg-gradient-to-br from-[#003B5C] to-[#00A8CD] overflow-hidden p-7 shadow-2xl flex flex-col justify-between">
              <div>
                <span className="text-[#F5A623] text-xs font-black uppercase tracking-[0.2em]">
                  Before Therapy
                </span>

                <h3 className="mt-3 text-2xl sm:text-3xl font-serif font-bold text-white">
                  Understanding the Client
                  <span className="block text-[#F5A623]">
                    Before Planning.
                  </span>
                </h3>

                <p className="mt-4 text-slate-200 text-xs sm:text-sm leading-relaxed">
                  Assessment is used to understand the client's strengths,
                  difficulties, functional communication needs and therapy
                  priorities.
                </p>
              </div>

              <div className="mt-8 space-y-2.5">
                {[
                  ["Observe", "Understand"],
                  ["Assess", "Plan"],
                  ["Support", "Progress"],
                ].map(([one, two], index) => (
                  <div
                    key={one}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-[#F5A623] font-black text-xs">
                      0{index + 1}
                    </div>

                    <div className="h-px flex-1 bg-white/10" />

                    <span className="text-xs font-bold text-white">
                      {one}
                    </span>

                    <IconArrow />

                    <span className="text-xs font-bold text-[#F5A623]">
                      {two}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <span className="text-[#00A8CD] font-black text-xs uppercase tracking-[0.2em]">
              Comprehensive Assessment
            </span>

            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold font-serif text-[#003B5C]">
              Understanding the Client Before Planning Therapy
            </h2>

            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Assessment helps us understand communication strengths,
              difficulties, functional needs and therapy priorities before
              personalized goals are established.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {assessmentItems.map((item, index) => (
                <div
                  key={item}
                  className="group flex gap-3 items-start p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-[#00A8CD]/30 transition-all"
                >
                  <span className="w-6 h-6 flex-shrink-0 rounded-lg bg-[#00A8CD]/10 text-[#00A8CD] flex items-center justify-center group-hover:bg-[#00A8CD] group-hover:text-white transition-colors">
                    <IconCheck />
                  </span>

                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          THERAPY APPROACH
      ================================================== */}
      <section
        id="approach"
        className="bg-[#F0F8FA] py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Personalized Therapy"
            title="Functional Goals. Meaningful Progress."
            description="Our therapy approach is designed to help communication skills move beyond the therapy room and into everyday life."
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {approachItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.06,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="group bg-white rounded-[25px] p-6 border border-white shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#003B5C] text-[#F5A623] flex items-center justify-center shadow-md">
                    <Icon />
                  </div>

                  <h3 className="mt-5 text-lg font-serif font-bold text-[#003B5C] group-hover:text-[#00A8CD] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="mt-4 h-1 w-8 group-hover:w-full bg-[#FF5271] rounded-full transition-all duration-400" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          CARE PLANS
      ================================================== */}
      <section
        id="care-plans"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <SectionHeading
          eyebrow="Personalized Care Plans"
          title="A Plan Built Around Your Goals"
          description="Care plans combine assessment, individualized goals, therapy, home support and regular progress monitoring."
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {carePlans.map((plan, index) => {
            const Icon = plan.icon;

            return (
              <motion.div
                key={plan.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -6,
                }}
                className="group relative bg-white rounded-[30px] p-6 sm:p-8 border border-slate-100 shadow-[0_15px_40px_rgba(0,59,92,0.07)] overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    backgroundColor: plan.color,
                  }}
                />

                <div className="flex items-start justify-between gap-5">
                  <div>
                    <span
                      className="text-[10px] font-black uppercase tracking-[0.18em]"
                      style={{
                        color: plan.color,
                      }}
                    >
                      Care Plan 0{index + 1}
                    </span>

                    <h3 className="mt-2 text-xl sm:text-2xl font-serif font-bold text-[#003B5C]">
                      {plan.title}
                    </h3>
                  </div>

                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${plan.color}12`,
                      color: plan.color,
                    }}
                  >
                    <Icon />
                  </div>
                </div>

                <div className="mt-6 space-y-2.5">
                  {plan.items.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 items-start text-xs sm:text-sm text-slate-600"
                    >
                      <span
                        className="mt-0.5"
                        style={{
                          color: plan.color,
                        }}
                      >
                        <IconCheck />
                      </span>

                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          HOW IT WORKS
      ================================================== */}
      <section
        id="how-it-works"
        className="relative py-20 bg-[#003B5C] text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#003B5C] via-[#064D6A] to-[#00A8CD]/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            eyebrow="Step-by-Step Journey"
            title="How It Works"
            description="A clear and supportive journey from understanding communication needs to using skills confidently in everyday situations."
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{
                  opacity: 0,
                  scale: 0.94,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                }}
                whileHover={{
                  y: -6,
                }}
                className="group relative rounded-[25px] bg-white/10 backdrop-blur-md border border-white/10 p-6 overflow-hidden hover:bg-white/15 transition-all"
              >
                <span className="text-[#F5A623] text-3xl font-black font-serif">
                  {step.step}
                </span>

                <h3 className="mt-4 text-lg font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.desc}
                </p>

                <div className="mt-5 w-6 h-1 bg-[#FF5271] group-hover:w-full transition-all duration-400 rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          ONLINE CONSULTATION
      ================================================== */}
      <section
        id="online"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="relative overflow-hidden rounded-[35px] bg-gradient-to-br from-white to-[#EAF8FB] border border-slate-100 shadow-[0_15px_50px_rgba(0,59,92,0.07)]">
          <div className="relative grid lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            <div className="lg:col-span-7">
              <span className="inline-flex px-4 py-1.5 rounded-full bg-[#FF5271]/10 text-[#FF5271] text-[10px] font-black uppercase tracking-[0.18em]">
                Online Consultation
              </span>

              <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold font-serif text-[#003B5C]">
                Speech & Language Support
                <span className="block text-[#00A8CD]">
                  From Wherever You Are.
                </span>
              </h2>

              <p className="mt-4 text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Online support may be appropriate for selected clients
                and concerns, offering guidance, caregiver counseling,
                home-program planning and follow-up monitoring.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-2.5">
                {onlineItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-lg bg-[#00A8CD]/10 text-[#00A8CD] flex items-center justify-center">
                      <IconCheck />
                    </span>

                    <span className="text-xs sm:text-sm text-slate-600">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/book-a-free-consult"
                className="inline-flex mt-6 items-center gap-2 bg-[#003B5C] hover:bg-[#FF5271] text-white font-bold uppercase tracking-wider text-xs px-7 py-3.5 rounded-full shadow-lg transition-all"
              >
                Book Online Consultation
                <IconArrow />
              </Link>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="rounded-[30px] bg-[#003B5C] p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[#F5A623] text-xs font-black">
                      ONLINE SESSION
                    </span>
                    <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                  </div>

                  <div className="mt-5 bg-white/10 rounded-2xl p-4 border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-[#00A8CD] text-white flex items-center justify-center">
                      <IconLaptop />
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-white">
                      Connect From Home
                    </h3>

                    <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                      Guidance, counseling and follow-up support for
                      appropriate clients and concerns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          FLOATING BOOK BUTTON
      ================================================== */}
   

    </div>
  );
}