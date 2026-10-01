import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* =========================================================
   SPECIAL EDUCATION PAGE
   REX MEDICAL CENTER
   — Redesigned Hero + Full Page Motion & Hover System
========================================================= */

const BRAND = {
  navy: "#003B5C",
  navyDeep: "#00283D",
  cyan: "#00A8CD",
  coral: "#FF5271",
  gold: "#F5A623",
  violet: "#6C63FF",
  green: "#22A06B",
  pink: "#E06C9F",
};

const EASE = [0.22, 1, 0.36, 1];

/* =========================================================
   MOTION VARIANTS
========================================================= */

const fadeUp = {
  hidden: { opacity: 0, y: 38 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -46 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 46 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.75, ease: EASE } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* =========================================================
   ICONS
========================================================= */

const Icon = ({ type, size = 26 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    education: (
      <>
        <path d="M3 6.5 12 3l9 3.5L12 10 3 6.5Z" />
        <path d="M6 8.2V14c0 1.7 2.7 3 6 3s6-1.3 6-3V8.2" />
        <path d="M21 7v6" />
      </>
    ),

    target: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1.3" />
      </>
    ),

    communication: (
      <>
        <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H8l-4 2 1.3-4A7.5 7.5 0 1 1 20 11.5Z" />
        <path d="M8 11h.01M12 11h.01M16 11h.01" />
      </>
    ),

    brain: (
      <>
        <path d="M9.5 4.5A3 3 0 0 0 6 7.2 3.5 3.5 0 0 0 4.8 13 3.4 3.4 0 0 0 7 18.8 3 3 0 0 0 12 18V7.5a3 3 0 0 0-2.5-3Z" />
        <path d="M14.5 4.5A3 3 0 0 1 18 7.2a3.5 3.5 0 0 1 1.2 5.8 3.4 3.4 0 0 1-2.2 5.8A3 3 0 0 1 12 18V7.5a3 3 0 0 1 2.5-3Z" />
        <path d="M8 9h2M14 9h2M8 14h2M14 14h2" />
      </>
    ),

    behavior: (
      <>
        <circle cx="12" cy="7" r="3" />
        <path d="M5 21c.7-4 3-6 7-6s6.3 2 7 6" />
        <path d="M4 12h3M17 12h3" />
      </>
    ),

    school: (
      <>
        <path d="M3 21h18" />
        <path d="M5 21V9l7-4 7 4v12" />
        <path d="M9 21v-5h6v5" />
        <path d="M9 10h.01M15 10h.01M9 13h.01M15 13h.01" />
      </>
    ),

    family: (
      <>
        <circle cx="8" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M2.5 20c.5-4 2.4-6 5.5-6s5 2 5.5 6" />
        <path d="M14 15c3.5-.5 5.8 1.2 6.5 5" />
      </>
    ),

    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16 9" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h13" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),

    star: (
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
    ),

    assessment: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 7h6M9 11h6M9 15h3" />
        <path d="m15 15 1 1 2-2" />
      </>
    ),

    home: (
      <>
        <path d="m3 11 9-7 9 7" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </>
    ),

    spark: (
      <>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <path d="m6.3 6.3 2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" />
      </>
    ),
  };

  return <svg {...common}>{icons[type]}</svg>;
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const SpecialEducation = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      number: "01",
      title: "Individualized Educational Planning",
      short:
        "Personalized learning goals based on every child's strengths, needs and developmental level.",
      color: BRAND.cyan,
      icon: "target",
      points: [
        "Individual learning goals",
        "Academic skill development",
        "Pre-academic readiness",
        "Attention and learning activities",
        "Cognitive skill development",
        "Functional learning",
        "Classroom-readiness skills",
        "Progress monitoring",
      ],
    },
    {
      number: "02",
      title: "Communication & Language Support",
      short:
        "Educational strategies coordinated with communication goals to help children participate more effectively.",
      color: BRAND.coral,
      icon: "communication",
      points: [
        "Communication development",
        "Following instructions",
        "Vocabulary development",
        "Functional communication",
        "Social communication",
        "Communication-support strategies",
        "Collaboration with SLP",
      ],
    },
    {
      number: "03",
      title: "Developmental & Learning Support",
      short:
        "Structured activities designed to strengthen attention, memory, concepts and early learning skills.",
      color: BRAND.gold,
      icon: "brain",
      points: [
        "Attention and concentration",
        "Memory",
        "Problem-solving",
        "Matching and categorization",
        "Concept development",
        "Fine-motor learning",
        "Pre-writing skills",
        "Early literacy",
        "Early numeracy",
        "Learning through play",
      ],
    },
    {
      number: "04",
      title: "Behavior & Functional Skills",
      short:
        "Support for routines, independence, task completion, social participation and everyday functioning.",
      color: BRAND.violet,
      icon: "behavior",
      points: [
        "Following routines",
        "Task completion",
        "Independence",
        "Self-care skills",
        "Classroom behavior",
        "Social interaction",
        "Turn-taking",
        "Following instructions",
        "Activity transitions",
        "Positive reinforcement",
      ],
    },
  ];

  const readiness = [
    {
      title: "Pre-Academic Skills",
      icon: "education",
      color: BRAND.cyan,
      items: [
        "Alphabet recognition",
        "Numbers",
        "Colors",
        "Shapes",
        "Basic concepts",
      ],
    },
    {
      title: "Learning Readiness",
      icon: "target",
      color: BRAND.coral,
      items: [
        "Sitting and attending",
        "Following instructions",
        "Completing activities",
        "Classroom routines",
      ],
    },
    {
      title: "Social Readiness",
      icon: "family",
      color: BRAND.gold,
      items: [
        "Sharing",
        "Turn-taking",
        "Appropriate interaction",
        "Group participation",
      ],
    },
  ];

  const benefitList = [
    "Learning difficulties",
    "Developmental delays",
    "Communication difficulties",
    "Intellectual disabilities",
    "Autism-related support needs",
    "Attention and learning difficulties",
    "School-readiness difficulties",
    "Delayed academic skills",
    "Daily living skill difficulties",
    "Multiple developmental support needs",
  ];

  const steps = [
    {
      number: "01",
      title: "Initial Assessment",
      text: "Understand the child's developmental, educational, communication, behavioral and functional needs.",
    },
    {
      number: "02",
      title: "Identify Strengths",
      text: "Determine what the child can already do and use those strengths as a foundation for learning.",
    },
    {
      number: "03",
      title: "Set Individual Goals",
      text: "Develop realistic and measurable goals based on the child's needs and priorities.",
    },
    {
      number: "04",
      title: "Individualized Intervention",
      text: "Provide structured educational and developmental sessions using individualized teaching strategies.",
    },
    {
      number: "05",
      title: "Family Involvement",
      text: "Give parents practical strategies for supporting learning and development at home.",
    },
    {
      number: "06",
      title: "Progress Review",
      text: "Regularly review goals and adjust the program as the child develops.",
    },
  ];

  const supportAreas = [
    { title: "Special Education", icon: "education", color: BRAND.cyan },
    { title: "Speech & Language", icon: "communication", color: BRAND.coral },
    { title: "Physiotherapy", icon: "target", color: BRAND.gold },
    { title: "Occupational Therapy", icon: "brain", color: BRAND.violet },
    { title: "Nutrition Support", icon: "home", color: BRAND.green },
    { title: "Parent Education", icon: "family", color: BRAND.pink },
  ];

  const learningStats = [
    { value: "1:1", label: "Individualized Sessions", icon: "target" },
    { value: "06", label: "Integrated Support Areas", icon: "spark" },
    { value: "3+", label: "Years of Experience", icon: "star" },
    { value: "360°", label: "Family-Centered Approach", icon: "family" },
  ];

  const planRows = [
    { label: "Academic Skills", value: 82, color: BRAND.cyan },
    { label: "Communication", value: 68, color: BRAND.coral },
    { label: "Daily Living & Independence", value: 74, color: BRAND.gold },
  ];

  const cardMotion = shouldReduceMotion
    ? {}
    : { whileHover: { y: -10, transition: { duration: 0.3 } } };

  return (
    <main className="se-page bg-[#F7FAFC] text-slate-700 overflow-hidden">
      {/* ============ FONT LOADER ============ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap');
        .se-page { font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif; }
        .se-display { font-family: 'Sora', 'Plus Jakarta Sans', sans-serif; letter-spacing: -0.02em; }
        .se-shine { position: relative; overflow: hidden; }
        .se-shine::after {
          content: ""; position: absolute; top: 0; left: -120%;
          width: 60%; height: 100%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,.35), transparent);
          transform: skewX(-18deg); transition: left .75s cubic-bezier(.22,1,.36,1);
        }
        .se-shine:hover::after { left: 140%; }
      `}</style>

{/* =====================================================
    HERO  —  COMPACT • ROUNDED • NEW H1 LAYOUT
===================================================== */}
<section className="relative px-3 sm:px-5 lg:px-8 pt-4 lg:pt-6">

  {/* Floating rounded hero card */}
  <div className="relative overflow-hidden rounded-[32px] sm:rounded-[44px] lg:rounded-[52px] bg-[#003B5C] pt-16 pb-16 lg:pt-20 lg:pb-20">

    {/* Ambient mesh */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-[#00A8CD]/20 blur-[130px]" />
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-[#FF5271]/15 blur-[140px]" />
      <div className="absolute -bottom-56 left-1/3 w-[480px] h-[480px] rounded-full bg-[#F5A623]/10 blur-[140px]" />
    </div>

    {/* Grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.08] pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage:
          "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 80%)",
      }}
    />

    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 items-center">

        {/* ---------------- LEFT ---------------- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Pill */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.07] border border-white/12 backdrop-blur-xl"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[#F5A623] opacity-70 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-[#F5A623]" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/75">
              Special Education &amp; Developmental Support
            </span>
          </motion.div>

          {/* H1 — NEW LAYOUT */}
          <motion.h1
            variants={fadeUp}
            className="se-display mt-6 text-[clamp(2.2rem,5vw,3.75rem)] font-extrabold leading-[1.05] text-white"
          >
            <span className="block text-white/55 font-semibold text-[0.68em] tracking-tight">
              Every Child
            </span>

            <span className="mt-2 block">
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#00A8CD] via-[#63DCEC] to-[#00A8CD] bg-clip-text text-transparent">
                  Learns
                </span>
                <motion.svg
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 w-full h-2.5"
                >
                  <motion.path
                    d="M2 8 C 50 2, 150 2, 198 8"
                    stroke="#FF5271"
                    strokeWidth="4.5"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, delay: 0.85, ease: "easeInOut" }}
                  />
                </motion.svg>
              </span>{" "}
              <span className="text-white/95">Differently.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-base sm:text-lg leading-relaxed text-white/60 max-w-xl"
          >
            Individualized learning, developmental skills and
            family-centered support — carefully designed around your
            child's unique strengths, pace and needs.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <Link
              to="/book-a-free-consult"
              className="se-shine group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[#FF5271] text-white font-bold shadow-xl shadow-[#FF5271]/25 hover:bg-[#ff3b5e] hover:shadow-2xl hover:shadow-[#FF5271]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Book an Assessment
              <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                <Icon type="arrow" size={19} />
              </span>
            </Link>

            <Link
              to="/book-appointment"
              className="group inline-flex items-center justify-center px-7 py-4 rounded-2xl border border-white/20 bg-white/[0.05] text-white font-bold backdrop-blur-md hover:bg-white/12 hover:border-white/35 hover:-translate-y-0.5 transition-all duration-300"
            >
              Talk to Our Team
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-8 text-sm text-white/50"
          >
            {["Individualized Goals", "Family-Centered", "Development-Focused"].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300"
                >
                  <span className="text-[#00A8CD]">
                    <Icon type="check" size={17} />
                  </span>
                  {item}
                </div>
              )
            )}
          </motion.div>
        </motion.div>

        {/* ---------------- RIGHT VISUAL ---------------- */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          className="relative hidden md:block"
        >
          <div className="relative w-full max-w-[470px] mx-auto">

            {/* Orbit ring */}
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-7 rounded-full border border-dashed border-white/12"
            />

            {/* Glow */}
            <div className="absolute -inset-6 rounded-[52px] bg-gradient-to-br from-[#00A8CD]/25 via-transparent to-[#FF5271]/25 blur-3xl" />

            {/* MAIN CARD */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.015 }}
              className="relative rounded-[32px] border border-white/12 bg-white/[0.06] backdrop-blur-2xl p-6 shadow-[0_45px_100px_-35px_rgba(0,0,0,0.85)]"
            >
              {/* Card header */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#00A8CD] text-white flex items-center justify-center shadow-lg shadow-[#00A8CD]/35">
                    <Icon type="education" size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
                      Learning Plan
                    </p>
                    <p className="text-white font-bold text-[15px]">
                      Individualized Program
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/12 border border-emerald-400/20 text-emerald-300 text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>

              <div className="h-px bg-white/10 my-5" />

              {/* Progress rows */}
              <div className="space-y-4">
                {planRows.map((row, i) => (
                  <div key={row.label} className="group">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="text-white/70 font-semibold group-hover:text-white transition-colors">
                        {row.label}
                      </span>
                      <span className="text-white/40 font-bold">
                        {row.value}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.value}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.2,
                          delay: 0.45 + i * 0.15,
                          ease: EASE,
                        }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${row.color}, ${row.color}88)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Card footer */}
              <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/[0.05] border border-white/10 px-4 py-3 hover:bg-white/[0.09] transition-colors duration-300">
                <div className="flex -space-x-2">
                  {[
                    { l: "R", c: BRAND.cyan },
                    { l: "S", c: BRAND.coral },
                    { l: "P", c: BRAND.gold },
                  ].map((a) => (
                    <span
                      key={a.l}
                      className="w-8 h-8 rounded-full border-2 border-[#003B5C] flex items-center justify-center text-[11px] font-black text-white"
                      style={{ backgroundColor: a.c }}
                    >
                      {a.l}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-white/50 font-semibold">
                  Family &amp; School aligned
                </p>
              </div>
            </motion.div>

            {/* FLOATING BADGE — TOP LEFT */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
              className="absolute -left-7 top-8 bg-white rounded-2xl px-4 py-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] flex items-center gap-3 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-[#00A8CD]/10 text-[#00A8CD] flex items-center justify-center">
                <Icon type="target" size={21} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Focus
                </p>
                <p className="text-sm font-extrabold text-[#003B5C]">
                  Individual Goals
                </p>
              </div>
            </motion.div>

            {/* FLOATING BADGE — BOTTOM RIGHT */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 12, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
              className="absolute -right-7 bottom-10 bg-white rounded-2xl px-4 py-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] flex items-center gap-3 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FF5271]/10 text-[#FF5271] flex items-center justify-center">
                <Icon type="family" size={21} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Support
                </p>
                <p className="text-sm font-extrabold text-[#003B5C]">
                  Family-Centered
                </p>
              </div>
            </motion.div>

            {/* Small floating star */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 right-14 w-12 h-12 rounded-2xl bg-[#F5A623] text-white flex items-center justify-center shadow-xl shadow-[#F5A623]/30"
            >
              <Icon type="star" size={22} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ---------------- STAT STRIP ---------------- */}
      <motion.div
        variants={staggerFast}
        initial="hidden"
        animate="visible"
        className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-[28px] overflow-hidden border border-white/10 bg-white/[0.05] backdrop-blur-xl"
      >
        {learningStats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            whileHover={shouldReduceMotion ? {} : { backgroundColor: "rgba(255,255,255,0.09)" }}
            className="group relative p-5 sm:p-6 bg-white/[0.02] transition-colors duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="text-[#00A8CD] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <Icon type={stat.icon} size={20} />
              </span>
              <span className="se-display text-2xl sm:text-3xl font-extrabold text-white">
                {stat.value}
              </span>
            </div>
            <p className="mt-2 text-[12px] sm:text-[13px] text-white/45 font-semibold leading-5">
              {stat.label}
            </p>

            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#00A8CD] to-[#FF5271] group-hover:w-full transition-all duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
</section>
      {/* =====================================================
          INTRO / PHILOSOPHY
      ===================================================== */}
      <section className="py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-[#00A8CD] text-xs font-black uppercase tracking-[0.25em]">
                Our Philosophy
              </span>

              <h2 className="se-display mt-4 text-4xl sm:text-5xl font-extrabold text-[#003B5C] leading-tight">
                Every Child Deserves
                <span className="block text-[#FF5271]">
                  The Right Support.
                </span>
              </h2>

              <p className="mt-6 text-slate-500 leading-8 text-lg">
                We provide individualized educational and developmental
                support for children who require additional assistance
                with learning, communication, behavior, daily living
                skills or overall development.
              </p>

              <p className="mt-5 text-slate-500 leading-8">
                Our approach focuses on identifying each child's
                strengths, abilities, needs and learning style, then
                developing an individualized program that supports
                meaningful progress at home, school and in everyday life.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                ["Academic Skills", "education", BRAND.cyan],
                ["Communication", "communication", BRAND.coral],
                ["Independence", "target", BRAND.gold],
                ["Social Skills", "family", BRAND.violet],
              ].map(([title, icon, color]) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  whileHover={shouldReduceMotion ? {} : { y: -9, scale: 1.02 }}
                  className="group relative bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_15px_45px_rgba(0,59,92,0.06)] hover:shadow-[0_28px_60px_rgba(0,59,92,0.14)] hover:border-transparent transition-shadow duration-300 overflow-hidden"
                >
                  <span
                    className="absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                    style={{ backgroundColor: color }}
                  />

                  <div
                    style={{ color, backgroundColor: `${color}15` }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300"
                  >
                    <Icon type={icon} size={26} />
                  </div>

                  <h3 className="mt-5 font-extrabold text-[#003B5C]">
                    {title}
                  </h3>

                  <div
                    style={{ backgroundColor: color }}
                    className="mt-4 w-8 h-1 rounded-full group-hover:w-14 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}
      <section className="py-24 bg-white px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <span className="text-[#00A8CD] text-xs font-black uppercase tracking-[0.25em]">
              What We Provide
            </span>

            <h2 className="se-display mt-4 text-4xl sm:text-5xl font-extrabold text-[#003B5C]">
              Our Special Education
              <span className="text-[#00A8CD]"> Services</span>
            </h2>

            <p className="mt-5 text-slate-500 text-lg leading-8">
              Every program is thoughtfully structured to support
              meaningful learning, participation and independence.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 gap-6 mt-14"
          >
            {services.map((service) => (
              <motion.div
                key={service.number}
                variants={fadeUp}
                {...cardMotion}
                className="group relative overflow-hidden rounded-[32px] bg-[#F8FAFC] border border-slate-100 p-7 sm:p-9 hover:shadow-[0_35px_70px_-25px_rgba(0,59,92,0.25)] hover:border-slate-200 transition-all duration-400"
              >
                <div
                  style={{ backgroundColor: service.color }}
                  className="absolute left-0 top-0 bottom-0 w-1.5 group-hover:w-2.5 transition-all duration-400"
                />

                <div className="flex items-start justify-between gap-5">
                  <div
                    style={{
                      color: service.color,
                      backgroundColor: `${service.color}14`,
                    }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-400"
                  >
                    <Icon type={service.icon} size={29} />
                  </div>

                  <span className="se-display text-5xl font-extrabold text-slate-100 group-hover:text-slate-200 transition-colors duration-400">
                    {service.number}
                  </span>
                </div>

                <h3 className="se-display mt-7 text-2xl font-extrabold text-[#003B5C]">
                  {service.title}
                </h3>

                <p className="mt-3 text-slate-500 leading-7">
                  {service.short}
                </p>

                <button
                  onClick={() => setActiveService(service)}
                  className="mt-6 inline-flex items-center gap-2 font-bold text-sm group/btn"
                  style={{ color: service.color }}
                >
                  Explore Support
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                    →
                  </span>
                </button>

                <div
                  style={{ backgroundColor: service.color }}
                  className="absolute -right-20 -bottom-20 w-44 h-44 rounded-full opacity-[0.04] group-hover:scale-150 transition-transform duration-700 pointer-events-none"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          DEVELOPMENTAL SKILLS
      ===================================================== */}
      <section className="py-24 px-5 sm:px-8 lg:px-12 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-[#FF5271] text-xs font-black uppercase tracking-[0.25em]">
                Developmental Growth
              </span>

              <h2 className="se-display mt-4 text-4xl sm:text-5xl font-extrabold text-[#003B5C]">
                Building Skills That
                <span className="text-[#FF5271]"> Matter</span>
              </h2>

              <p className="mt-5 text-slate-500 leading-8">
                Structured learning activities help children strengthen
                the skills they need to participate more confidently in
                everyday environments.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-14"
          >
            {[
              "Attention",
              "Memory",
              "Problem Solving",
              "Concept Development",
              "Fine-Motor Learning",
              "Pre-Writing",
              "Early Literacy",
              "Early Numeracy",
              "Categorization",
              "Learning Through Play",
            ].map((item, index) => (
              <motion.div
                variants={fadeUp}
                key={item}
                whileHover={shouldReduceMotion ? {} : { y: -10, scale: 1.03 }}
                className="relative bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-[0_28px_55px_-20px_rgba(0,59,92,0.28)] transition-shadow duration-300 overflow-hidden group cursor-default"
              >
                <div
                  className="absolute top-0 left-0 h-1 w-8 group-hover:w-full transition-all duration-500"
                  style={{
                    backgroundColor:
                      index % 3 === 0
                        ? BRAND.cyan
                        : index % 3 === 1
                        ? BRAND.coral
                        : BRAND.gold,
                  }}
                />

                <div className="text-xs font-black text-slate-300 mb-5 group-hover:text-slate-400 transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="font-extrabold text-[#003B5C] leading-snug">
                  {item}
                </h3>

                <div className="mt-5 text-[#00A8CD] group-hover:translate-x-1.5 transition-transform duration-300">
                  →
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          SCHOOL READINESS
      ===================================================== */}
      <section className="py-24 bg-white px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-14 items-center">

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#00A8CD]/10 text-[#00A8CD] flex items-center justify-center hover:scale-110 hover:-rotate-6 transition-transform duration-300">
                <Icon type="school" size={31} />
              </div>

              <span className="block mt-7 text-[#00A8CD] text-xs font-black uppercase tracking-[0.25em]">
                School Preparation
              </span>

              <h2 className="se-display mt-4 text-4xl sm:text-5xl font-extrabold text-[#003B5C] leading-tight">
                Preparing Children
                <span className="block text-[#00A8CD]">
                  For School Success
                </span>
              </h2>

              <p className="mt-6 text-slate-500 text-lg leading-8">
                Our school-readiness program focuses on the foundational
                skills children need to participate successfully in
                classroom environments.
              </p>

              <div className="mt-7 flex items-center gap-3 text-sm font-bold text-[#003B5C]">
                <span className="w-9 h-9 rounded-full bg-[#F5A623]/15 text-[#F5A623] flex items-center justify-center">
                  <Icon type="check" size={18} />
                </span>
                Learning • Social • Functional Readiness
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {readiness.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={shouldReduceMotion ? {} : { x: 10 }}
                  className="group bg-[#F8FAFC] rounded-[28px] p-6 sm:p-7 border border-slate-100 flex gap-5 hover:bg-white hover:shadow-[0_25px_55px_-22px_rgba(0,59,92,0.25)] transition-all duration-300"
                >
                  <div
                    style={{
                      color: item.color,
                      backgroundColor: `${item.color}14`,
                    }}
                    className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
                  >
                    <Icon type={item.icon} size={26} />
                  </div>

                  <div className="flex-1">
                    <h3 className="se-display text-xl font-extrabold text-[#003B5C]">
                      {item.title}
                    </h3>

                    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                      {item.items.map((skill) => (
                        <span
                          key={skill}
                          className="text-sm text-slate-500 flex items-center gap-2 hover:text-[#003B5C] transition-colors duration-200"
                        >
                          <span style={{ color: item.color }}>
                            <Icon type="check" size={15} />
                          </span>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CLASS EXPERIENCE
      ===================================================== */}
      <section className="py-24 bg-[#003B5C] px-5 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A8CD]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF5271]/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-[#F5A623] text-xs font-black uppercase tracking-[0.25em]">
                Learning Environment
              </span>

              <h2 className="se-display mt-4 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                Learning Should Feel
                <span className="block text-[#00A8CD]">
                  Meaningful &amp; Engaging
                </span>
              </h2>

              <p className="mt-6 text-white/60 text-lg leading-8">
                Special education classes can combine structured
                learning with play, visual supports, repetition,
                hands-on activities and peer interaction.
              </p>

              <div className="mt-8">
                <Link
                  to="/book-a-free-consult"
                  className="se-shine group inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-[#003B5C] font-extrabold hover:bg-[#F5A623] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Discuss Your Child's Needs
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                    <Icon type="arrow" size={19} />
                  </span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                "Structured Learning",
                "Play-Based Learning",
                "Visual Supports",
                "Repetition & Reinforcement",
                "Hands-On Activities",
                "Peer Learning",
                "Functional Learning",
                "Individualized Strategies",
              ].map((item) => (
                <motion.div
                  variants={fadeUp}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -4 }}
                  key={item}
                  className="group bg-white/[0.06] border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:bg-white/[0.11] hover:border-[#00A8CD]/40 transition-all duration-300 cursor-default"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#00A8CD]/15 text-[#00A8CD] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <Icon type="check" size={17} />
                  </div>

                  <p className="text-white font-bold text-sm leading-6">
                    {item}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
          MULTIDISCIPLINARY
      ===================================================== */}
      <section className="py-24 px-5 sm:px-8 lg:px-12 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-[#FF5271] text-xs font-black uppercase tracking-[0.25em]">
                Integrated Child Development
              </span>

              <h2 className="se-display mt-4 text-4xl sm:text-5xl font-extrabold text-[#003B5C]">
                A Team Around
                <span className="text-[#FF5271]"> Your Child</span>
              </h2>

              <p className="mt-5 text-slate-500 text-lg leading-8">
                When children require support across multiple areas,
                appropriate professionals can work together around
                individualized goals.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-14"
          >
            {supportAreas.map((area) => (
              <motion.div
                variants={fadeUp}
                key={area.title}
                whileHover={shouldReduceMotion ? {} : { y: -10, scale: 1.03 }}
                className="group bg-white rounded-3xl p-5 text-center border border-slate-100 shadow-sm hover:shadow-[0_25px_55px_-20px_rgba(0,59,92,0.25)] transition-all duration-300 cursor-default"
              >
                <div
                  style={{
                    color: area.color,
                    backgroundColor: `${area.color}14`,
                  }}
                  className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300"
                >
                  <Icon type={area.icon} size={25} />
                </div>

                <h3 className="mt-4 text-sm font-extrabold text-[#003B5C] leading-5">
                  {area.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-6">
              The exact combination of services is determined according
              to the child's individual needs and goals.
            </p>
          </div>

        </div>
      </section>

      {/* =====================================================
          PARENT GUIDANCE
      ===================================================== */}
      <section className="py-24 bg-white px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-5 bg-[#00A8CD]/5 rounded-[45px] rotate-2" />

              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -8 }}
                transition={{ duration: 0.4 }}
                className="relative bg-[#003B5C] rounded-[38px] p-8 sm:p-10 overflow-hidden"
              >
                <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#00A8CD]/10" />
                <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-[#FF5271]/10" />

                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-[#00A8CD] text-white flex items-center justify-center hover:scale-110 hover:rotate-6 transition-transform duration-300">
                    <Icon type="family" size={31} />
                  </div>

                  <h2 className="se-display mt-7 text-4xl font-extrabold text-white">
                    Parents Are Part
                    <span className="block text-[#00A8CD]">
                      Of The Intervention
                    </span>
                  </h2>

                  <p className="mt-5 text-white/60 leading-8">
                    Children benefit when the strategies they learn
                    during sessions are naturally reinforced at home
                    and in everyday routines.
                  </p>

                  <div className="mt-8 flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-[#FF5271] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <Icon type="home" size={22} />
                    </div>

                    <div>
                      <p className="text-white font-bold">
                        Home-Based Learning
                      </p>
                      <p className="text-white/40 text-sm">
                        Turning everyday moments into learning opportunities
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-[#00A8CD] text-xs font-black uppercase tracking-[0.25em]">
                Parent &amp; Caregiver Guidance
              </span>

              <h2 className="se-display mt-4 text-4xl sm:text-5xl font-extrabold text-[#003B5C]">
                Support That
                <span className="text-[#00A8CD]"> Continues At Home</span>
              </h2>

              <p className="mt-6 text-slate-500 text-lg leading-8">
                We help parents and caregivers understand practical
                ways to support their child's development beyond therapy
                or educational sessions.
              </p>

              <motion.div
                variants={staggerFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-8 space-y-4"
              >
                {[
                  "Creating structured routines",
                  "Supporting learning at home",
                  "Reinforcing educational goals",
                  "Communication-support strategies",
                  "Developing independence",
                  "Managing transitions",
                  "Creating functional learning opportunities",
                  "Monitoring progress",
                ].map((item) => (
                  <motion.div
                    key={item}
                    variants={fadeUp}
                    whileHover={shouldReduceMotion ? {} : { x: 8 }}
                    className="flex items-center gap-3 group cursor-default"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#00A8CD]/10 text-[#00A8CD] flex items-center justify-center group-hover:bg-[#00A8CD] group-hover:text-white transition-colors duration-300">
                      <Icon type="check" size={15} />
                    </span>

                    <span className="text-slate-600 font-medium group-hover:text-[#003B5C] transition-colors duration-300">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
          ASSESSMENT TIMELINE
      ===================================================== */}
      <section className="py-24 bg-[#F7FAFC] px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-[#00A8CD] text-xs font-black uppercase tracking-[0.25em]">
                Our Approach
              </span>

              <h2 className="se-display mt-4 text-4xl sm:text-5xl font-extrabold text-[#003B5C]">
                From Assessment
                <span className="text-[#00A8CD]"> To Progress</span>
              </h2>

              <p className="mt-5 text-slate-500 text-lg leading-8">
                A structured process helps us understand your child's
                needs and create a meaningful individualized plan.
              </p>
            </motion.div>
          </div>

          <div className="relative mt-16">

            <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-px bg-slate-200" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-6 gap-7"
            >
              {steps.map((step) => (
                <motion.div
                  variants={fadeUp}
                  key={step.number}
                  whileHover={shouldReduceMotion ? {} : { y: -8 }}
                  className="relative group cursor-default"
                >
                  <div className="relative z-10 w-20 h-20 mx-auto rounded-full bg-white border-8 border-[#F7FAFC] shadow-lg flex items-center justify-center group-hover:bg-[#00A8CD] group-hover:border-[#E4F6FB] group-hover:scale-110 transition-all duration-400">
                    <span className="se-display text-[#00A8CD] font-extrabold group-hover:text-white transition-colors duration-400">
                      {step.number}
                    </span>
                  </div>

                  <div className="text-center mt-6">
                    <h3 className="font-extrabold text-[#003B5C] group-hover:text-[#00A8CD] transition-colors duration-300">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm text-slate-500 leading-6">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
          EDUCATOR PROFILE
      ===================================================== */}
      <section className="py-24 bg-white px-5 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative overflow-hidden rounded-[42px] bg-[#003B5C]"
          >
            <div className="absolute right-0 top-0 w-[450px] h-[450px] rounded-full bg-[#00A8CD]/10 blur-3xl" />
            <div className="absolute left-0 bottom-0 w-[350px] h-[350px] rounded-full bg-[#FF5271]/10 blur-3xl" />

            <div className="relative grid lg:grid-cols-[.65fr_1.35fr]">

              <div className="min-h-[350px] lg:min-h-[460px] flex items-center justify-center p-10">
                <div className="relative group">

                  <motion.div
                    animate={shouldReduceMotion ? {} : { rotate: 360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-5 rounded-full border border-dashed border-[#00A8CD]/25"
                  />

                  <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-[#00A8CD] to-[#003B5C] border-8 border-white/10 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                      <Icon type="education" size={75} />
                    </div>
                  </div>

                  <motion.div
                    animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-5 top-8 w-14 h-14 rounded-2xl bg-[#F5A623] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                  >
                    <Icon type="star" size={25} />
                  </motion.div>

                  <motion.div
                    animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
                    transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -left-5 bottom-8 w-14 h-14 rounded-2xl bg-[#FF5271] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                  >
                    <Icon type="family" size={25} />
                  </motion.div>

                </div>
              </div>

              <div className="p-8 sm:p-12 lg:p-14">
                <span className="text-[#F5A623] text-xs font-black uppercase tracking-[0.25em]">
                  Meet Our Specialist
                </span>

                <h2 className="se-display mt-4 text-4xl sm:text-5xl font-extrabold text-white">
                  Rimsha Ijaz
                </h2>

                <p className="mt-2 text-[#00A8CD] font-bold text-lg">
                  Special Educator
                </p>

                <div className="w-16 h-1 bg-[#FF5271] rounded-full mt-6" />

                <p className="mt-7 text-white/65 text-lg leading-8">
                  Rimsha Ijaz is a dedicated Special Educator with
                  three years of experience in the field. She has worked
                  with children with developmental delays, learning
                  difficulties, autism, ADHD and other special needs
                  in both clinical and school settings.
                </p>

                <p className="mt-5 text-white/55 leading-8">
                  Rimsha focuses on creating individualized education
                  plans that build academic skills, life skills and
                  independence. She believes every child learns
                  differently and strives to provide a supportive,
                  structured and engaging learning environment.
                </p>

                <motion.div
                  variants={staggerFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid sm:grid-cols-2 gap-3 mt-8"
                >
                  {[
                    "Individualized Education Plans",
                    "Academic Skills",
                    "Life Skills",
                    "Independence",
                  ].map((item) => (
                    <motion.div
                      variants={fadeUp}
                      whileHover={shouldReduceMotion ? {} : { x: 6 }}
                      key={item}
                      className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors duration-300 cursor-default"
                    >
                      <span className="text-[#00A8CD]">
                        <Icon type="check" size={17} />
                      </span>
                      {item}
                    </motion.div>
                  ))}
                </motion.div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* =====================================================
          WHO CAN BENEFIT
      ===================================================== */}
      <section className="py-24 bg-[#F7FAFC] px-5 sm:px-8 lg:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-[#FF5271] text-xs font-black uppercase tracking-[0.25em]">
                Who Can Benefit?
              </span>

              <h2 className="se-display mt-4 text-4xl sm:text-5xl font-extrabold text-[#003B5C] leading-tight">
                Support Designed
                <span className="block text-[#FF5271]">
                  Around Individual Needs
                </span>
              </h2>

              <p className="mt-6 text-slate-500 text-lg leading-8">
                Special education and developmental support may be
                appropriate for children who need additional assistance
                with learning, communication, independence or
                participation.
              </p>

              <div className="mt-7 p-5 rounded-2xl bg-[#00A8CD]/5 border border-[#00A8CD]/10 hover:bg-[#00A8CD]/10 transition-colors duration-300">
                <p className="text-sm text-slate-600 leading-6">
                  <strong className="text-[#003B5C]">Important:</strong>{" "}
                  Services are individualized. A diagnosis is not
                  required simply to begin discussing a child's
                  educational needs.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-3"
            >
              {benefitList.map((item, index) => (
                <motion.div
                  variants={fadeUp}
                  whileHover={shouldReduceMotion ? {} : { x: 6, scale: 1.02 }}
                  key={item}
                  className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-3 shadow-sm hover:shadow-[0_18px_40px_-18px_rgba(0,59,92,0.3)] transition-all duration-300 cursor-default"
                >
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor:
                        index % 2 === 0
                          ? `${BRAND.cyan}12`
                          : `${BRAND.coral}12`,
                      color: index % 2 === 0 ? BRAND.cyan : BRAND.coral,
                    }}
                  >
                    <Icon type="check" size={16} />
                  </span>

                  <span className="text-sm font-semibold text-slate-600">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICE DETAIL MODAL
      ===================================================== */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#003B5C]/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveService(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[32px] shadow-2xl"
            >
              <div
                style={{ backgroundColor: activeService.color }}
                className="p-7 sm:p-9 text-white"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
                      <Icon type={activeService.icon} size={28} />
                    </div>

                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest">
                      Service {activeService.number}
                    </span>

                    <h3 className="se-display mt-2 text-3xl font-extrabold">
                      {activeService.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setActiveService(null)}
                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 hover:rotate-90 flex items-center justify-center text-xl transition-all duration-300"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-7 sm:p-9">
                <p className="text-slate-500 leading-7">
                  {activeService.short}
                </p>

                <h4 className="mt-8 text-lg font-extrabold text-[#003B5C]">
                  Support may include:
                </h4>

                <div className="grid sm:grid-cols-2 gap-3 mt-5">
                  {activeService.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#F7FAFC] hover:bg-[#EEF6FA] hover:translate-x-1 transition-all duration-300"
                    >
                      <span style={{ color: activeService.color }}>
                        <Icon type="check" size={17} />
                      </span>

                      <span className="text-sm font-medium text-slate-600">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/book-a-free-consult"
                  onClick={() => setActiveService(null)}
                  className="se-shine group mt-8 inline-flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-[#003B5C] text-white font-bold hover:bg-[#005078] transition-colors duration-300"
                >
                  Discuss This Service
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                    <Icon type="arrow" size={18} />
                  </span>
                </Link>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default SpecialEducation;