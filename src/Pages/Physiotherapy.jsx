import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* =========================================================
   PHYSIOTHERAPY & REHABILITATION PAGE
   NAMRA RIAZ — REX MEDICAL CENTER
   — Redesigned Hero + Full Motion System
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
  surface: "#F8FAFC",
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

const Icon = ({ type, size = 24 }) => {
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
    activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    target: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1.3" />
      </>
    ),
    brain: (
      <>
        <path d="M9.5 4.5A3 3 0 0 0 6 7.2 3.5 3.5 0 0 0 4.8 13 3.4 3.4 0 0 0 7 18.8 3 3 0 0 0 12 18V7.5a3 3 0 0 0-2.5-3Z" />
        <path d="M14.5 4.5A3 3 0 0 1 18 7.2a3.5 3.5 0 0 1 1.2 5.8 3.4 3.4 0 0 1-2.2 5.8A3 3 0 0 1 12 18V7.5a3 3 0 0 1 2.5-3Z" />
      </>
    ),
    child: (
      <>
        <circle cx="12" cy="5" r="3" />
        <path d="M6.5 12h11l-2 9H8.5l-2-9Z" />
        <path d="M12 12v9" />
      </>
    ),
    exercise: (
      <>
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v8H2z" />
        <path d="M6 1v7M14 1v7M6 16v7M14 16v7" />
      </>
    ),
    balance: (
      <>
        <path d="m16 16 3-8 3 8c-1 1-2 1-3 1s-2 0-3-1Z" />
        <path d="m2 16 3-8 3 8c-1 1-2 1-3 1s-2 0-3-1Z" />
        <path d="M7 21h10" />
        <path d="M12 3v18" />
        <path d="M3 7h18" />
      </>
    ),
    online: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
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
    user: (
      <>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-7 9 7" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
    spark: (
      <>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <path d="m6.3 6.3 2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" />
      </>
    ),
    star: (
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
    ),
    pulse: (
      <>
        <path d="M3 12h4l2-6 4 12 2-6h6" />
      </>
    ),
  };

  return <svg {...common}>{icons[type]}</svg>;
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const Physiotherapy = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      number: "01",
      title: "Musculoskeletal Physiotherapy",
      short:
        "Assessment and treatment of pain, stiffness, weakness, movement limitations, and musculoskeletal conditions.",
      color: BRAND.cyan,
      icon: "activity",
      points: [
        "Comprehensive joint and muscle assessment",
        "Targeted pain-relief interventions",
        "Post-injury and post-op rehabilitation",
        "Stiffness & flexibility restoration",
        "Musculoskeletal strength conditioning",
      ],
    },
    {
      number: "02",
      title: "Neurological Physiotherapy",
      short:
        "Individualized rehabilitation for stroke, cerebral palsy, spinal cord injury, traumatic brain injury, and other neurological conditions.",
      color: BRAND.coral,
      icon: "brain",
      points: [
        "Stroke rehabilitation & motor relearning",
        "Spinal cord & TBI recovery support",
        "Neuroplasticity-focused training",
        "Spasticity and muscle tone management",
        "Coordination & balance restoration",
      ],
    },
    {
      number: "03",
      title: "Pediatric Physiotherapy",
      short:
        "Developmental and functional physiotherapy for children with motor delays, cerebral palsy, developmental difficulties, weakness, balance problems, and mobility limitations.",
      color: BRAND.gold,
      icon: "child",
      points: [
        "Motor delay assessment & intervention",
        "Cerebral palsy pediatric management",
        "Play-based developmental exercises",
        "Balance & core stability training",
        "Mobility enhancement for children",
      ],
    },
    {
      number: "04",
      title: "Therapeutic Exercise & Functional Training",
      short:
        "Structured exercise programs to improve strength, flexibility, endurance, balance, coordination, mobility, and functional independence.",
      color: BRAND.violet,
      icon: "exercise",
      points: [
        "Customized strengthening routines",
        "Flexibility & endurance conditioning",
        "Postural training & correction",
        "Core stability exercises",
        "Progressive conditioning plans",
      ],
    },
    {
      number: "05",
      title: "Balance & Gait Rehabilitation",
      short:
        "Assessment and training to improve walking, postural control, balance, coordination, and safe mobility.",
      color: BRAND.green,
      icon: "balance",
      points: [
        "Gait analysis & walking mechanics",
        "Postural control drills",
        "Fall prevention strategies",
        "Coordination training",
        "Safe mobility assistance",
      ],
    },
    {
      number: "06",
      title: "Functional Rehabilitation",
      short:
        "Task-oriented rehabilitation designed to help patients improve their ability to perform daily activities and participate more independently.",
      color: BRAND.pink,
      icon: "target",
      points: [
        "Activities of Daily Living (ADL) training",
        "Task-oriented motor practice",
        "Ergonomic & work-related guidance",
        "Community reintegration support",
        "Independent living skills coaching",
      ],
    },
  ];

  const carePlans = [
    {
      title: "Initial Assessment",
      subtitle: "Comprehensive Clinical Evaluation",
      color: BRAND.cyan,
      items: [
        "Detailed physiotherapy assessment",
        "Identification of impairments and functional limitations",
        "Individualized treatment goals",
        "Personalized treatment plan",
        "Home exercise recommendations",
      ],
    },
    {
      title: "Rehabilitation Care Plan",
      subtitle: "Continuous & Progressive Therapy",
      color: BRAND.coral,
      items: [
        "Regular physiotherapy sessions according to clinical need",
        "Progressive therapeutic exercise & functional mobility training",
        "Balance and gait rehabilitation where appropriate",
        "Home exercise program & patient/caregiver education",
        "Regular reassessment, progress monitoring, and treatment modification",
      ],
    },
    {
      title: "Pediatric Rehabilitation Plan",
      subtitle: "Specialized Care for Young Patients",
      color: BRAND.gold,
      items: [
        "Developmental and functional assessment",
        "Individualized pediatric therapy goals",
        "Gross motor and functional training",
        "Balance, coordination, strength, and mobility exercises",
        "Parent/caregiver education, home program, and regular progress review",
      ],
    },
  ];

  const steps = [
    { number: "01", title: "Assessment", text: "We begin by understanding your medical history, physical condition, movement difficulties, functional limitations, and rehabilitation goals." },
    { number: "02", title: "Personalized Plan", text: "A physiotherapy treatment plan is developed according to your assessment findings and individual goals." },
    { number: "03", title: "Treatment", text: "Evidence-based physiotherapy interventions and therapeutic exercises are provided according to your needs." },
    { number: "04", title: "Functional Training", text: "Where appropriate, treatment focuses on balance, gait, mobility, coordination, and activities of daily living." },
    { number: "05", title: "Home Program", text: "You receive appropriate exercises and guidance to continue your rehabilitation safely outside the clinic." },
    { number: "06", title: "Monitor & Progress", text: "Your progress is regularly reassessed and the treatment plan is modified according to your response and changing goals." },
  ];

  const faqs = [
    { q: "Do you provide personalized physiotherapy plans?", a: "Yes. Treatment plans are individualized according to the patient's condition, assessment findings, functional limitations, goals, and progress." },
    { q: "Do you treat children?", a: "Yes. Pediatric physiotherapy is provided for children who require support with motor development, strength, balance, coordination, mobility, and functional skills." },
    { q: "Can physiotherapy help after stroke?", a: "Physiotherapy can support rehabilitation after stroke by addressing movement, strength, balance, gait, mobility, coordination, and functional independence according to the individual's needs." },
    { q: "How often will I need physiotherapy?", a: "The frequency of treatment depends on the patient's condition, severity, goals, response to treatment, and clinical requirements. It is determined after assessment and reviewed during follow-ups." },
    { q: "Can I receive a home exercise program?", a: "Yes. Appropriate patients can receive an individualized home exercise program with instructions designed around their functional needs." },
    { q: "Can physiotherapy and other healthcare services be combined?", a: "Yes. Physiotherapy can form part of multidisciplinary rehabilitation when appropriate, with coordination or referral to other qualified healthcare professionals when required." },
  ];

  const heroStats = [
    { value: "6+", label: "Clinical Service Areas", icon: "activity" },
    { value: "1:1", label: "Individualized Sessions", icon: "target" },
    { value: "360°", label: "Patient-Centered Care", icon: "user" },
    { value: "24/7", label: "Online Guidance", icon: "online" },
  ];

  const progressRows = [
    { label: "Mobility & Function", value: 88, color: BRAND.cyan },
    { label: "Strength Recovery", value: 74, color: BRAND.coral },
    { label: "Balance & Coordination", value: 80, color: BRAND.gold },
  ];

  const cardMotion = shouldReduceMotion
    ? {}
    : { whileHover: { y: -10, transition: { duration: 0.3 } } };

  return (
    <main className="physio-page bg-[#F7FAFC] text-slate-700 overflow-hidden">
      {/* ============ FONT LOADER ============ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap');
        .physio-page { font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif; }
        .physio-display { font-family: 'Sora', 'Plus Jakarta Sans', sans-serif; letter-spacing: -0.02em; }
        .physio-shine { position: relative; overflow: hidden; }
        .physio-shine::after {
          content: ""; position: absolute; top: 0; left: -120%;
          width: 60%; height: 100%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,.35), transparent);
          transform: skewX(-18deg); transition: left .75s cubic-bezier(.22,1,.36,1);
        }
        .physio-shine:hover::after { left: 140%; }
      `}</style>

      {/* =====================================================
          HERO  —  COMPACT • ROUNDED • NEW H1 LAYOUT
      ===================================================== */}
      <section className="relative px-3 sm:px-5 lg:px-8 pt-4 lg:pt-6">

        <div className="relative overflow-hidden rounded-[32px] sm:rounded-[44px] lg:rounded-[52px] bg-[#003B5C] pt-16 pb-16 lg:pt-20 lg:pb-20">

          {/* Ambient mesh */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-[#00A8CD]/20 blur-[130px]" />
            <div className="absolute top-1/4 -right-40 w-[520px] h-[520px] rounded-full bg-[#FF5271]/15 blur-[140px]" />
            <div className="absolute -bottom-56 left-1/3 w-[500px] h-[500px] rounded-full bg-[#F5A623]/10 blur-[140px]" />
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
                <motion.div
                  variants={fadeUp}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.07] border border-white/12 backdrop-blur-xl"
                >
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-[#F5A623] opacity-70 animate-ping" />
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-[#F5A623]" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/75">
                    Move Better • Live Better
                  </span>
                </motion.div>

                {/* New H1 layout */}
                <motion.h1
                  variants={fadeUp}
                  className="physio-display mt-6 text-[clamp(2.2rem,5vw,3.75rem)] font-extrabold leading-[1.05] text-white"
                >
                  <span className="block text-white/55 font-semibold text-[0.68em] tracking-tight">
                    Personalized Physiotherapy &amp;
                  </span>

                  <span className="mt-2 block">
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-[#00A8CD] via-[#63DCEC] to-[#00A8CD] bg-clip-text text-transparent">
                        Rehabilitation
                      </span>
                      <motion.svg
                        viewBox="0 0 240 12"
                        preserveAspectRatio="none"
                        className="absolute -bottom-1 left-0 w-full h-2.5"
                      >
                        <motion.path
                          d="M2 8 C 60 2, 180 2, 238 8"
                          stroke="#FF5271"
                          strokeWidth="4.5"
                          fill="none"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.2, delay: 0.85, ease: "easeInOut" }}
                        />
                      </motion.svg>
                    </span>{" "}
                    <span className="text-white/95">Care.</span>
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="mt-6 text-base sm:text-lg leading-relaxed text-white/60 max-w-xl"
                >
                  Expert movement and rehabilitation care designed to improve
                  your strength, balance, mobility, and functional
                  independence — tailored to your clinical needs.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  variants={fadeUp}
                  className="flex flex-col sm:flex-row gap-4 mt-8"
                >
                  <Link
                    to="/book-appointment"
                    className="physio-shine group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[#FF5271] text-white font-bold shadow-xl shadow-[#FF5271]/25 hover:bg-[#ff3b5e] hover:shadow-2xl hover:shadow-[#FF5271]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                  >
                    Book an Appointment
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                      <Icon type="arrow" size={19} />
                    </span>
                  </Link>

                  <Link
                    to="/online-consultation"
                    className="group inline-flex items-center justify-center px-7 py-4 rounded-2xl border border-white/20 bg-white/[0.05] text-white font-bold backdrop-blur-md hover:bg-white/12 hover:border-white/35 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Online Guidance
                  </Link>
                </motion.div>

                {/* Trust row */}
                <motion.div
                  variants={fadeUp}
                  className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-8 text-sm text-white/50"
                >
                  {["Clinical Assessment", "Evidence-Based", "Patient-Centered"].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300"
                    >
                      <span className="text-[#00A8CD]">
                        <Icon type="check" size={17} />
                      </span>
                      {item}
                    </div>
                  ))}
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

                  <motion.div
                    animate={shouldReduceMotion ? {} : { rotate: 360 }}
                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-7 rounded-full border border-dashed border-white/12"
                  />

                  <div className="absolute -inset-6 rounded-[52px] bg-gradient-to-br from-[#00A8CD]/25 via-transparent to-[#FF5271]/25 blur-3xl" />

                  {/* MAIN CARD */}
                  <motion.div
                    animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.015 }}
                    className="relative rounded-[32px] border border-white/12 bg-white/[0.06] backdrop-blur-2xl p-6 shadow-[0_45px_100px_-35px_rgba(0,0,0,0.85)]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-[#00A8CD] text-white flex items-center justify-center shadow-lg shadow-[#00A8CD]/35">
                          <Icon type="user" size={22} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
                            Physiotherapist
                          </p>
                          <p className="text-white font-bold text-[15px]">
                            Namra Riaz
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/12 border border-emerald-400/20 text-emerald-300 text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active
                      </span>
                    </div>

                    <div className="h-px bg-white/10 my-5" />

                    <div className="space-y-4">
                      {progressRows.map((row, i) => (
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
                        Recovery in progress
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
                      <Icon type="activity" size={21} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                        Therapy
                      </p>
                      <p className="text-sm font-extrabold text-[#003B5C]">
                        Rehabilitation
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
                      <Icon type="target" size={21} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                        Approach
                      </p>
                      <p className="text-sm font-extrabold text-[#003B5C]">
                        Goal-Oriented
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

            {/* STAT STRIP */}
            <motion.div
              variants={staggerFast}
              initial="hidden"
              animate="visible"
              className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-[28px] overflow-hidden border border-white/10 bg-white/[0.05] backdrop-blur-xl"
            >
              {heroStats.map((stat) => (
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
                    <span className="physio-display text-2xl sm:text-3xl font-extrabold text-white">
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
         WELCOME
      ===================================================== */}
      <section className="py-24 px-5 sm:px-8 lg:px-12 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-[#00A8CD] text-xs font-black uppercase tracking-[0.25em]">
                Your Health. Your Movement.
              </span>
              <h2 className="physio-display mt-4 text-4xl sm:text-5xl font-extrabold text-[#003B5C] leading-tight">
                Your Personalized <br />
                <span className="text-[#FF5271]">Treatment Plan.</span>
              </h2>
              <p className="mt-6 text-slate-600 leading-relaxed text-lg">
                Every patient has different physical and functional needs.
                Whether you are recovering from an injury, managing a
                neurological or musculoskeletal condition, experiencing pain,
                or working toward improved strength, balance, mobility, and
                independence, we provide individualized physiotherapy care
                based on your assessment, condition, lifestyle, and goals.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Our approach combines clinical assessment, therapeutic exercise,
                functional training, patient education, and evidence-based
                rehabilitation to support safe and sustainable recovery.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-5"
            >
              {[
                ["Musculoskeletal", "activity", BRAND.cyan],
                ["Neurological", "brain", BRAND.coral],
                ["Pediatric Care", "child", BRAND.gold],
                ["Functional Training", "exercise", BRAND.violet],
              ].map(([title, icon, color]) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  whileHover={shouldReduceMotion ? {} : { y: -9, scale: 1.02 }}
                  className="group relative bg-white rounded-3xl p-7 border border-slate-100 shadow-[0_15px_45px_rgba(0,59,92,0.06)] hover:shadow-[0_28px_60px_rgba(0,59,92,0.14)] hover:border-transparent transition-shadow duration-300 overflow-hidden cursor-pointer"
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
                  <h3 className="mt-6 font-extrabold text-[#003B5C] text-lg">{title}</h3>
                  <div style={{ backgroundColor: color }} className="mt-4 w-8 h-1 rounded-full group-hover:w-14 transition-all duration-300" />
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
         SERVICES
      ===================================================== */}
      <section className="py-24 bg-white px-5 sm:px-8 lg:px-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <span className="text-[#00A8CD] text-xs font-black uppercase tracking-[0.25em]">
              Clinical Care Offerings
            </span>
            <h2 className="physio-display mt-4 text-4xl sm:text-5xl font-extrabold text-[#003B5C]">
              Our Physiotherapy <span className="text-[#00A8CD]">Services</span>
            </h2>
            <p className="mt-5 text-slate-500 text-lg leading-relaxed">
              Specialized clinical physiotherapy programs structured to restore
              movement, reduce pain, and boost daily independence. Click any
              card for details.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14"
          >
            {services.map((service) => (
              <motion.div
                key={service.number}
                variants={fadeUp}
                whileHover={shouldReduceMotion ? {} : { y: -10 }}
                onClick={() => setActiveService(service)}
                className="group relative overflow-hidden rounded-[32px] bg-[#F8FAFC] border border-slate-100 p-8 cursor-pointer shadow-sm hover:shadow-[0_35px_70px_-25px_rgba(0,59,92,0.25)] hover:border-slate-200 transition-all duration-400"
              >
                <div
                  style={{ backgroundColor: service.color }}
                  className="absolute left-0 top-0 bottom-0 w-2 group-hover:w-3 transition-all duration-400"
                />

                <div className="flex items-start justify-between gap-5">
                  <div
                    style={{ color: service.color, backgroundColor: `${service.color}14` }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-400"
                  >
                    <Icon type={service.icon} size={28} />
                  </div>
                  <span className="physio-display text-4xl font-extrabold text-slate-200 group-hover:text-slate-300 transition-colors">
                    {service.number}
                  </span>
                </div>

                <h3 className="physio-display mt-8 text-xl font-extrabold text-[#003B5C] group-hover:text-[#00A8CD] transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                  {service.short}
                </p>

                <div
                  className="mt-6 inline-flex items-center gap-2 font-bold text-sm"
                  style={{ color: service.color }}
                >
                  <span>View Details</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </div>

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
         ABOUT / THERAPIST
      ===================================================== */}
      <section className="py-24 bg-[#003B5C] text-white px-5 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#00A8CD]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#FF5271]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">

            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="relative max-w-sm mx-auto group">
                <motion.div
                  animate={shouldReduceMotion ? {} : { rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-6 rounded-full border border-dashed border-[#00A8CD]/25"
                />

                <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto rounded-full bg-gradient-to-br from-[#00A8CD] to-[#003B5C] border-8 border-white/10 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                    <Icon type="user" size={90} />
                  </div>
                </div>

                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-2 top-10 px-4 py-2 rounded-2xl bg-[#FF5271] text-white font-extrabold shadow-xl text-xs uppercase tracking-wider"
                >
                  PSRD Hospital Expert
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-[#F5A623] text-xs font-black uppercase tracking-[0.25em]">
                About Your Physiotherapist
              </span>
              <h2 className="physio-display mt-3 text-4xl sm:text-5xl font-extrabold">Namra Riaz</h2>
              <p className="mt-2 text-[#00A8CD] font-bold text-lg">
                Physiotherapist (Clinical &amp; Hospital Experience)
              </p>

              <div className="w-16 h-1 bg-[#FF5271] rounded-full my-6" />

              <p className="text-white/80 leading-relaxed text-lg">
                I am Namra Riaz, a Physiotherapist with clinical experience in
                hospital-based physiotherapy and rehabilitation. I am currently
                working at <strong>PSRD Hospital</strong>. Previously, I worked
                at Saira Miraj Hospital and also completed my House Officer
                experience at PSRD Hospital.
              </p>
              <p className="mt-4 text-white/70 leading-relaxed">
                I completed clinical rotations at Children's Hospital, PSRD
                Hospital Lahore where I gained valuable exposure to pediatric
                and multidisciplinary clinical practice.
              </p>

              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-white font-extrabold text-base mb-4">Core Focus Areas:</h4>
                <motion.div
                  variants={staggerFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid sm:grid-cols-2 gap-3 text-sm text-white/75"
                >
                  {[
                    "Patient assessment & treatment planning",
                    "Neurological rehabilitation",
                    "Pediatric physiotherapy",
                    "Therapeutic exercise & strengthening",
                    "Balance, coordination and gait training",
                    "Mobility & functional rehabilitation",
                  ].map((item) => (
                    <motion.div
                      variants={fadeUp}
                      whileHover={shouldReduceMotion ? {} : { x: 6 }}
                      key={item}
                      className="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-default"
                    >
                      <span className="text-[#00A8CD]">
                        <Icon type="check" size={15} />
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
         PATIENT-CENTERED CARE
      ===================================================== */}
      <section className="py-24 bg-white px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-[#00A8CD] text-xs font-black uppercase tracking-[0.25em]">
                Treatment Is More Than Exercise
              </span>
              <h2 className="physio-display mt-4 text-4xl sm:text-5xl font-extrabold text-[#003B5C] leading-tight">
                Patient-Centered Care <br />
                <span className="text-[#FF5271]">With Clear Goals.</span>
              </h2>
              <p className="mt-6 text-slate-500 leading-relaxed text-lg">
                Effective physiotherapy begins with understanding the patient.
                We consider the patient's diagnosis, symptoms, physical
                impairments, functional limitations, daily activities,
                environment, and personal goals.
              </p>

              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                className="mt-8 p-6 rounded-3xl bg-[#00A8CD]/5 border border-[#00A8CD]/10 hover:bg-[#00A8CD]/10 transition-colors duration-300"
              >
                <h4 className="font-extrabold text-[#003B5C] text-base mb-2">
                  The Ultimate Goal:
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The goal is not simply to reduce symptoms. The goal is to
                  improve movement, function, confidence, independence, and
                  participation in everyday life.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-[#F8FAFC] rounded-[36px] p-8 sm:p-10 border border-slate-100 shadow-sm"
            >
              <h3 className="physio-display text-2xl font-extrabold text-[#003B5C] mb-6">
                Our Integrated Approach
              </h3>
              <div className="space-y-4">
                {[
                  "Comprehensive physiotherapy assessment",
                  "Individualized treatment planning",
                  "Therapeutic exercise & functional training",
                  "Balance, gait & mobility rehabilitation",
                  "Patient and caregiver education",
                  "Customized home exercise programs",
                  "Regular reassessment and progress monitoring",
                ].map((item, idx) => (
                  <motion.div
                    variants={fadeUp}
                    whileHover={shouldReduceMotion ? {} : { x: 8 }}
                    key={item}
                    className="group flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-[0_18px_40px_-18px_rgba(0,59,92,0.3)] transition-all duration-300 cursor-default"
                  >
                    <span className="w-8 h-8 rounded-xl bg-[#00A8CD]/10 text-[#00A8CD] flex items-center justify-center font-bold text-xs flex-shrink-0 group-hover:bg-[#00A8CD] group-hover:text-white transition-colors duration-300">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-extrabold text-slate-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
         CARE PLANS
      ===================================================== */}
      <section className="py-24 bg-[#F7FAFC] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-[#00A8CD] text-xs font-black uppercase tracking-[0.25em]">
              Choose Your Support Level
            </span>
            <h2 className="physio-display mt-4 text-4xl sm:text-5xl font-extrabold text-[#003B5C]">
              Physiotherapy Care <span className="text-[#00A8CD]">Plans</span>
            </h2>
            <p className="mt-5 text-slate-500 text-lg leading-relaxed">
              Select the structured care plan that aligns with your
              rehabilitation requirements and clinical goals.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8"
        >
          {carePlans.map((plan) => (
            <motion.div
              variants={fadeUp}
              key={plan.title}
              whileHover={shouldReduceMotion ? {} : { y: -10 }}
              className="group bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-[0_35px_70px_-25px_rgba(0,59,92,0.25)] flex flex-col justify-between relative overflow-hidden transition-all duration-400"
            >
              <div
                style={{ backgroundColor: plan.color }}
                className="absolute top-0 left-0 right-0 h-2 group-hover:h-3 transition-all duration-300"
              />

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {plan.subtitle}
                </span>
                <h3 className="physio-display text-2xl font-extrabold text-[#003B5C] mt-1">
                  {plan.title}
                </h3>

                <div className="mt-6 space-y-3.5">
                  {plan.items.map((item) => (
                    <div key={item} className="flex items-start gap-3 group/item">
                      <span
                        style={{ color: plan.color }}
                        className="mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200"
                      >
                        <Icon type="check" size={16} />
                      </span>
                      <span className="text-sm text-slate-600 font-medium leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  to="/book-appointment"
                  className="physio-shine inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-extrabold text-sm text-white shadow-md transition-all hover:opacity-90 hover:-translate-y-0.5"
                  style={{ backgroundColor: plan.color }}
                >
                  Get Started <Icon type="arrow" size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* =====================================================
         HOW IT WORKS
      ===================================================== */}
      <section className="py-24 bg-white px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-[#FF5271] text-xs font-black uppercase tracking-[0.25em]">
              Step-By-Step Process
            </span>
            <h2 className="physio-display mt-4 text-4xl sm:text-5xl font-extrabold text-[#003B5C]">
              Your Journey to <span className="text-[#FF5271]">Better Movement</span>
            </h2>
            <p className="mt-5 text-slate-500 text-lg leading-relaxed">
              A transparent and structured pathway from your initial assessment
              all the way to sustainable functional recovery.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {steps.map((step) => (
            <motion.div
              variants={fadeUp}
              key={step.number}
              whileHover={shouldReduceMotion ? {} : { y: -8 }}
              className="group bg-[#F8FAFC] rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-[0_25px_55px_-22px_rgba(0,59,92,0.25)] hover:bg-white transition-all duration-300 relative overflow-hidden"
            >
              <div className="physio-display w-14 h-14 rounded-2xl bg-[#003B5C] text-white flex items-center justify-center font-extrabold text-xl mb-6 shadow-md group-hover:bg-[#00A8CD] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                {step.number}
              </div>
              <h3 className="physio-display text-xl font-extrabold text-[#003B5C] mb-3 group-hover:text-[#00A8CD] transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.text}</p>

              <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#00A8CD] to-[#FF5271] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* =====================================================
         ONLINE CONSULTATION
      ===================================================== */}
      <section className="py-24 bg-[#003B5C] text-white px-5 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#00A8CD]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#FF5271]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-[#00A8CD] text-xs font-black uppercase tracking-[0.25em]">
                Telehealth &amp; Remote Care
              </span>
              <h2 className="physio-display mt-4 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                Physiotherapy Guidance <br />
                <span className="text-[#00A8CD]">From Wherever You Are.</span>
              </h2>
              <p className="mt-6 text-white/70 text-lg leading-relaxed">
                For appropriate patients, online consultation can provide
                physiotherapy education, exercise guidance, home-program
                review, and progress monitoring.
              </p>

              <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/[0.08] transition-colors duration-300">
                <p className="text-xs text-white/60 leading-relaxed italic">
                  *Note: In-person assessment is recommended when physical
                  examination or hands-on assessment is clinically necessary.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/10 border border-white/15 backdrop-blur-xl rounded-[36px] p-8 sm:p-10 shadow-2xl hover:bg-white/[0.13] transition-colors duration-400"
            >
              <h3 className="physio-display text-2xl font-extrabold text-white mb-6">
                Online Consultation Includes:
              </h3>
              <motion.div
                variants={staggerFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {[
                  "Review of relevant history and functional concerns",
                  "Movement and functional discussion",
                  "Personalized exercise guidance",
                  "Customized home exercise program",
                  "Education regarding safe activity and movement",
                  "Follow-up and structured progress monitoring",
                ].map((item) => (
                  <motion.div
                    variants={fadeUp}
                    whileHover={shouldReduceMotion ? {} : { x: 6 }}
                    key={item}
                    className="flex items-center gap-3 cursor-default"
                  >
                    <span className="text-[#00A8CD] flex-shrink-0">
                      <Icon type="check" size={18} />
                    </span>
                    <span className="text-sm font-semibold text-white/90">{item}</span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-8">
                <Link
                  to="/online-consultation"
                  className="physio-shine group inline-flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#FF5271] text-white font-extrabold hover:bg-[#ff3b5e] transition-all shadow-lg hover:-translate-y-0.5"
                >
                  Book Online Session
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                    <Icon type="arrow" size={18} />
                  </span>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
         FAQ
      ===================================================== */}
      <section className="py-24 bg-[#F7FAFC] px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-[#00A8CD] text-xs font-black uppercase tracking-[0.25em]">
                Common Inquiries
              </span>
              <h2 className="physio-display mt-4 text-4xl sm:text-5xl font-extrabold text-[#003B5C]">
                Frequently Asked <span className="text-[#00A8CD]">Questions</span>
              </h2>
              <p className="mt-5 text-slate-500 text-lg">
                Everything you need to know about our physiotherapy and
                rehabilitation care.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                variants={fadeUp}
                whileHover={shouldReduceMotion ? {} : { x: 6 }}
                key={index}
                className="group bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-[0_22px_50px_-20px_rgba(0,59,92,0.25)] hover:border-[#00A8CD]/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#00A8CD]/10 text-[#00A8CD] flex items-center justify-center font-black text-sm group-hover:bg-[#00A8CD] group-hover:text-white transition-colors duration-300">
                    Q
                  </span>
                  <div>
                    <h3 className="physio-display text-lg font-extrabold text-[#003B5C] mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
         CTA / CONTACT
      ===================================================== */}
      <section className="px-3 sm:px-5 lg:px-8 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-7xl mx-auto relative overflow-hidden rounded-[36px] sm:rounded-[44px] lg:rounded-[52px] bg-gradient-to-br from-[#003B5C] via-[#004E70] to-[#003B5C] p-9 sm:p-14 lg:p-16 shadow-2xl text-white"
        >
          <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-[#00A8CD]/20 blur-3xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-80 h-80 rounded-full bg-[#FF5271]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div>
              <span className="text-[#F5A623] text-xs font-black uppercase tracking-[0.25em]">
                Start Your Recovery
              </span>
              <h2 className="physio-display mt-4 text-4xl sm:text-5xl font-extrabold leading-tight">
                Ready to Start Your <br />
                <span className="text-[#00A8CD]">Rehabilitation Journey?</span>
              </h2>
              <p className="mt-5 text-white/70 text-lg leading-relaxed">
                Whether you are recovering from an injury, managing a
                neurological or pediatric condition, experiencing mobility
                difficulties, or working toward better strength, balance, and
                functional independence, personalized physiotherapy can help.
              </p>
            </div>

            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              className="bg-white/10 border border-white/15 backdrop-blur-xl rounded-3xl p-8 space-y-5 hover:bg-white/[0.14] transition-colors duration-300"
            >
              <h3 className="physio-display text-2xl font-extrabold text-white">Visit Our Clinic</h3>
              <div className="space-y-3 text-sm text-white/80">
                <p className="font-bold text-white">[Clinic Name]</p>
                <p>[Address]</p>
                <p className="pt-2">
                  <strong className="text-white">Contact:</strong> [Phone/WhatsApp] | [Email]
                </p>
                <p>
                  <strong className="text-white">Hours:</strong> [Clinic Hours: Days &amp; Timings]
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/book-appointment"
                  className="physio-shine inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#FF5271] text-white font-extrabold shadow-lg hover:bg-[#ff3b5e] transition-all hover:-translate-y-0.5"
                >
                  <Icon type="calendar" size={18} /> Book an Appointment
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 text-center text-xs text-white/50 space-y-2">
            <p className="font-bold text-white/80">Namra Riaz • Physiotherapist</p>
            <p>
              Neurological Rehabilitation | Pediatric Physiotherapy | Therapeutic
              Exercise | Balance &amp; Gait Rehabilitation | Functional
              Rehabilitation
            </p>
            <p className="max-w-2xl mx-auto pt-2 italic">
              <strong>Disclaimer:</strong> Physiotherapy care is individualized
              according to clinical assessment. It does not replace appropriate
              medical diagnosis or treatment when required. Referral to another
              qualified healthcare professional may be recommended when
              clinically appropriate.
            </p>
          </div>
        </motion.div>
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
            className="fixed inset-0 z-[100] bg-[#003B5C]/75 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveService(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[36px] shadow-2xl"
            >
              <div style={{ backgroundColor: activeService.color }} className="p-8 sm:p-10 text-white">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
                      <Icon type={activeService.icon} size={28} />
                    </div>
                    <span className="text-white/70 text-xs font-bold uppercase tracking-widest">
                      Service {activeService.number}
                    </span>
                    <h3 className="physio-display mt-2 text-3xl font-extrabold">
                      {activeService.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveService(null)}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 hover:rotate-90 flex items-center justify-center text-xl font-bold transition-all duration-300"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-8 sm:p-10">
                <p className="text-slate-600 leading-relaxed text-lg">
                  {activeService.short}
                </p>

                <h4 className="mt-8 text-lg font-extrabold text-[#003B5C]">
                  Key Clinical Interventions:
                </h4>
                <div className="grid sm:grid-cols-2 gap-3.5 mt-5">
                  {activeService.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-100 hover:bg-[#EEF6FA] hover:translate-x-1 transition-all duration-300"
                    >
                      <span style={{ color: activeService.color }}>
                        <Icon type="check" size={18} />
                      </span>
                      <span className="text-sm font-extrabold text-slate-700">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/book-appointment"
                  onClick={() => setActiveService(null)}
                  className="physio-shine group mt-8 inline-flex items-center justify-center gap-3 w-full px-8 py-4 rounded-2xl bg-[#003B5C] text-white font-extrabold hover:bg-[#005078] transition-colors shadow-lg"
                >
                  Book Assessment for This Service
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

export default Physiotherapy;