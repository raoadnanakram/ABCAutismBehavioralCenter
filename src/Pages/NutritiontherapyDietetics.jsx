import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";


// REX MEDICAL CENTER
// NUTRITION THERAPY & DIETETICS
// PREMIUM NAVY + TEAL + CORAL + GOLD COLOR SCHEME
// ========================================================

// ========================================================
// PREMIUM COLOR PALETTE
// ================================
const COLORS = {
  navy: "#003B5C",
  navyDark: "#002238",
  navyLight: "#015C7F",

  teal: "#00A8CD",
  tealDark: "#0089A8",
  tealLight: "#EAF8FB",

  coral: "#FF5271",
  coralLight: "#FFF0F3",

  gold: "#F5A623",
  goldLight: "#FFF7E6",

  orange: "#FF8C42",
  orangeLight: "#FFF3EC",

  pink: "#FF8EA3",

  background: "#F8F9FA",
  cyanBg: "#F0F8FA",

  white: "#FFFFFF",
  text: "#1E293B",
  muted: "#64748B",
};

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
      strokeLinejoin="round"
      d="M6 6l12 12M18 6L6 18"
    />
  </svg>
);

const IconSalad = () => (
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
      d="M3 12h18M5 12c.6 4.2 3.5 7 7 7s6.4-2.8 7-7M8 8c.5-2.5 2-4 4-4s3.5 1.5 4 4"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4V2"
    />
  </svg>
);

const IconStethoscope = () => (
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
      d="M9 3v6a3 3 0 006 0V3"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 3H4v6a6 6 0 0012 0V3h-2"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 13v3a3 3 0 003 3"
    />
    <circle cx="21" cy="19" r="1" />
  </svg>
);

const IconBrain = () => (
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
      d="M9.5 4.5A3.5 3.5 0 006 8v.5A3.5 3.5 0 004.5 15 3.5 3.5 0 008 18.5h1.5A3.5 3.5 0 0013 15V8a3.5 3.5 0 00-3.5-3.5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.5 4.5A3.5 3.5 0 0118 8v.5a3.5 3.5 0 011.5 6.5 3.5 3.5 0 01-3.5 3.5h-1.5A3.5 3.5 0 0111 15V8a3.5 3.5 0 013.5-3.5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 8h2m-2 4h2m4-4h2m-2 4h2M12 3v18"
    />
  </svg>
);

const IconActivity = () => (
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
      d="M22 12h-4l-3 9L9 3l-3 9H2"
    />
  </svg>
);

const IconPill = () => (
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
      d="M7.05 17.95l9.9-9.9a4.95 4.95 0 117 7l-9.9 9.9a4.95 4.95 0 01-7-7z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.5 15.5l7-7"
    />
  </svg>
);

const IconVideo = () => (
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
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14"
    />
    <rect
      x="3"
      y="6"
      width="12"
      height="12"
      rx="2"
    />
  </svg>
);

const IconHeart = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"
    />
  </svg>
);

const IconShield = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3l7 4v5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V7l7-4z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4"
    />
  </svg>
);

// ========================================================
// SERVICES DATA
// ========================================================

const servicesList = [
  {
    title: "Clinical Nutrition & Dietetics",
    desc: "Personalized nutrition plans for health conditions, weight management, and nutritional deficiencies.",
    icon: IconSalad,
    color: COLORS.teal,
    lightColor: COLORS.tealLight,
    points: [
      "Weight management",
      "Nutritional deficiencies",
      "Metabolic health support",
      "Custom clinical meal planning",
    ],
  },
  {
    title: "Therapeutic Nutrition",
    desc: "Dietary management designed around your specific medical condition and nutritional requirements.",
    icon: IconStethoscope,
    color: COLORS.navy,
    lightColor: "#EAF2F6",
    points: [
      "Diabetes & Prediabetes",
      "PCOS & Thyroid disorders",
      "Hypertension & Kidney health",
      "Gastrointestinal care",
    ],
  },
  {
    title: "Behavioral Nutrition",
    desc: "Understand your eating patterns, cravings, emotional triggers, and barriers to maintaining healthy habits.",
    icon: IconBrain,
    color: COLORS.coral,
    lightColor: COLORS.coralLight,
    points: [
      "Emotional eating guidance",
      "Overcoming food cravings",
      "Mindful eating strategies",
      "Long-term habit formation",
    ],
  },
  {
    title: "Physiotherapy",
    desc: "Personalized physiotherapy and movement support as part of an integrated approach to health and wellness.",
    icon: IconActivity,
    color: COLORS.gold,
    lightColor: COLORS.goldLight,
    points: [
      "Mobility enhancement",
      "Targeted movement plans",
      "Post-injury support",
      "Active lifestyle guidance",
    ],
  },
  {
    title: "Supplement Guidance",
    desc: "Individualized supplement recommendations based on nutritional assessment and appropriate clinical information.",
    icon: IconPill,
    color: COLORS.tealDark,
    lightColor: COLORS.tealLight,
    points: [
      "Evidence-based dosing",
      "Deficiency correction",
      "Clinical safety check",
      "Tailored micronutrients",
    ],
  },
  {
    title: "Online Consultation",
    desc: "Receive personalized nutrition guidance from the comfort of your home through secure video calls.",
    icon: IconVideo,
    color: COLORS.orange,
    lightColor: COLORS.orangeLight,
    points: [
      "Global remote access",
      "Full dietary assessment",
      "Digital meal plans",
      "Continuous follow-ups",
    ],
  },
];

// ========================================================
// CONDITIONS
// ========================================================

const diseaseConditions = [
  "Diabetes",
  "Prediabetes",
  "PCOS",
  "Thyroid Disorders",
  "Hypertension",
  "Dyslipidemia",
  "Kidney Disease",
  "Gastrointestinal Conditions",
  "Fatty Liver",
  "Anemia",
  "Obesity",
];

// ========================================================
// JOURNEY STEPS
// ========================================================

const howItWorksSteps = [
  {
    step: "01",
    title: "Assessment",
    desc: "We begin by understanding your health history, nutrition, lifestyle, goals, and concerns.",
  },
  {
    step: "02",
    title: "Personalized Plan",
    desc: "Your nutrition and lifestyle plan is developed according to your individual needs.",
  },
  {
    step: "03",
    title: "Behavioral Support",
    desc: "We identify barriers, eating patterns, cravings, and habits that may affect your progress.",
  },
  {
    step: "04",
    title: "Movement & Physiotherapy",
    desc: "Where appropriate, physiotherapy and physical activity support are incorporated.",
  },
  {
    step: "05",
    title: "Monitor",
    desc: "Your progress is regularly reviewed and your plan adjusted when needed.",
  },
  {
    step: "06",
    title: "Sustain",
    desc: "The ultimate goal is to help you develop habits that continue beyond the program.",
  },
];

// ========================================================
// FAQ
// ========================================================

const faqData = [
  {
    q: "Do you provide customized diet plans?",
    a: "Yes. Nutrition plans are individualized according to health status, nutritional requirements, lifestyle, food preferences, and goals.",
  },
  {
    q: "Can I have an online consultation?",
    a: "Yes. Online consultations can be provided seamlessly for appropriate clients worldwide.",
  },
  {
    q: "Do you treat medical conditions?",
    a: "We provide nutrition and dietetic management as part of healthcare. Medical diagnosis, medication prescribing, and medical treatment remain under the care of the appropriate licensed medical professional.",
  },
  {
    q: "Are supplements included?",
    a: "Supplement recommendations are individualized. Supplements may be included separately depending on the client's requirements.",
  },
  {
    q: "How often will my diet plan be changed?",
    a: "This depends on your condition, progress, goals, and clinical requirements. Plans are reviewed during follow-ups and modified when appropriate.",
  },
  {
    q: "Can I get physiotherapy and nutrition together?",
    a: "Yes. Our integrated packages can combine nutrition care with physiotherapy where appropriate.",
  },
];

// ========================================================
// SECTION HEADING
// ========================================================

const SectionHeading = ({
  eyebrow,
  title,
  description,
  light = false,
}) => (
  <div className="text-center max-w-3xl mx-auto mb-16">
    <motion.span
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
        light
          ? "bg-[#00A8CD]/10 text-[#8DE8F7] border border-[#00A8CD]/30"
          : "bg-[#EAF8FB] text-[#0089A8] border border-[#BCECF5]"
      }`}
    >
      <IconSparkles />
      {eyebrow}
    </motion.span>

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-serif ${
        light ? "text-white" : "text-[#003B5C]"
      }`}
    >
      {title}
    </motion.h2>

    {description && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`mt-4 text-base sm:text-lg leading-relaxed ${
          light ? "text-slate-300" : "text-slate-600"
        }`}
      >
        {description}
      </motion.p>
    )}
  </div>
);

// ========================================================
// MAIN COMPONENT
// ========================================================

export default function NutritiontherapyDietetics() {
  const [activeService, setActiveService] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <div className="w-full bg-[#F8F9FA] text-slate-800 font-sans overflow-x-hidden antialiased">

      {/* ==================================================
          HERO
      ================================================== */}

      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#003B5C] px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#002238] via-[#003B5C] to-[#015C7F]" />

        {/* Decorative Glow */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-[#00A8CD]/20 rounded-full blur-3xl pointer-events-none"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, -30, 0],
                  y: [0, 20, 0],
                }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#FF5271]/15 rounded-full blur-3xl pointer-events-none"
        />

        <div className="absolute top-1/3 right-10 w-40 h-40 bg-[#F5A623]/10 rounded-full blur-3xl" />

        {/* Floating circles */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -18, 0],
                  rotate: [0, 8, 0],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-24 right-[12%] hidden lg:block w-16 h-16 rounded-full border border-[#00A8CD]/30 bg-[#00A8CD]/5"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, 15, 0],
                  rotate: [0, -8, 0],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-32 left-[12%] hidden lg:block w-10 h-10 rounded-full border border-[#F5A623]/40 bg-[#F5A623]/5"
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00A8CD]/10 border border-[#00A8CD]/30 text-[#8DE8F7] text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg"
          >
            <IconSparkles />
            Complete Clinical Nutrition & Dietetics
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-serif text-white tracking-tight leading-[1.1]"
          >
            Nourish Your Body.
            <br />

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A8CD] via-[#8DE8F7] to-[#F5A623]">
              Transform Your Health.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-2xl mx-auto text-slate-300 text-lg sm:text-xl leading-relaxed"
          >
            Programs designed around your individual health needs.
            Evidence-based clinical nutrition, therapeutic diet planning,
            behavioral nutrition, and personalized wellness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/book-a-free-consult"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#00A8CD] hover:bg-[#0089A8] text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-[#002238]/40 hover:-translate-y-1 transition-all duration-300 text-base"
            >
              Book a Consultation
              <IconArrow />
            </Link>

            <a
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 text-base"
            >
              Explore Our Services
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            <span className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <span className="text-[#00A8CD]">
                <IconShield />
              </span>
              Evidence-Based Care
            </span>

            <span className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <span className="text-[#FF5271]">
                <IconHeart />
              </span>
              Personalized Support
            </span>

            <span className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <span className="text-[#F5A623]">
                <IconSparkles />
              </span>
              Sustainable Wellness
            </span>
          </motion.div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#F8F9FA] rounded-t-[50%] scale-x-110" />
      </section>

      {/* ==================================================
          WELCOME SECTION
      ================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        <div className="grid lg:grid-cols-12 gap-12 items-center">

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="inline-block text-[#0089A8] font-bold text-xs uppercase tracking-widest bg-[#EAF8FB] px-4 py-2 rounded-full border border-[#BCECF5]">
              Your Goals. Your Personalized Plan.
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#003B5C] leading-tight">
              Every person has different nutritional needs.
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Whether your goal is weight management, better blood sugar
              control, recovery from illness, improved digestion, or simply
              developing healthier eating habits, we provide personalized
              nutrition care based on your health status, lifestyle,
              preferences, and goals.
            </p>

            <p className="text-slate-600 text-base leading-relaxed">
              Our approach combines nutrition science, behavioral change,
              lifestyle modification, and multidisciplinary support to help
              you achieve sustainable results.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="px-4 py-2 rounded-full bg-[#EAF8FB] text-[#0089A8] text-xs font-bold">
                Clinical Nutrition
              </span>

              <span className="px-4 py-2 rounded-full bg-[#FFF0F3] text-[#FF5271] text-xs font-bold">
                Behavioral Support
              </span>

              <span className="px-4 py-2 rounded-full bg-[#FFF7E6] text-[#C57B00] text-xs font-bold">
                Lifestyle Care
              </span>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6 bg-gradient-to-br from-[#003B5C] to-[#015C7F] rounded-[35px] p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-[#015C7F]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A8CD]/10 rounded-full blur-3xl" />

            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FF5271]/10 rounded-full blur-3xl" />

            <h3 className="relative text-2xl font-serif font-bold text-[#8DE8F7] mb-6">
              Core Pillars of Care
            </h3>

            <ul className="relative space-y-4">
              {[
                "Evidence-based clinical nutrition standards",
                "Behavioral guidance for emotional & stress eating",
                "Physiotherapy & movement integration",
                "Continuous tracking, monitoring & support",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#00A8CD]/15 text-[#00A8CD] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <IconCheck />
                  </span>

                  <span className="text-slate-200 text-sm sm:text-base leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ==================================================
          SERVICES
      ================================================== */}

      <section
        id="services"
        className="py-24 bg-white relative border-y border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Comprehensive Offerings"
            title="Our Specialized Services"
            description="Tailored nutrition, therapeutic protocols, and multidisciplinary support designed around your lifestyle."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {servicesList.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.015,
                  }}
                  className="group bg-white rounded-[30px] p-8 border border-slate-200/70 shadow-[0_8px_30px_rgba(0,59,92,0.06)] hover:shadow-[0_20px_45px_rgba(0,59,92,0.14)] transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
                >

                  {/* Top Accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 group-hover:h-2 transition-all duration-500"
                    style={{
                      background: `linear-gradient(90deg, ${service.color}, ${service.color}99)`,
                    }}
                  />

                  {/* Decorative circle */}
                  <div
                    className="absolute -right-16 -top-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      backgroundColor: `${service.color}10`,
                    }}
                  />

                  <div className="relative">

                    <div className="flex items-center justify-between mb-6">

                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                        style={{
                          backgroundColor: service.lightColor,
                          color: service.color,
                        }}
                      >
                        <Icon />
                      </div>

                      <span
                        className="text-xs font-black"
                        style={{
                          color: `${service.color}70`,
                        }}
                      >
                        0{index + 1}
                      </span>
                    </div>

                    <h3
                      className="text-xl font-serif font-bold text-[#003B5C] group-hover:text-[#00A8CD] transition-colors duration-300"
                    >
                      {service.title}
                    </h3>

                    <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveService(service)}
                    className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00A8CD] hover:text-[#003B5C] transition-all duration-300 group/btn cursor-pointer"
                  >
                    Learn More

                    <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                      <IconArrow />
                    </span>
                  </button>

                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          PROFESSIONAL SECTION
      ================================================== */}

      <section className="py-24 bg-[#F8F9FA]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-white rounded-[40px] p-8 sm:p-12 lg:p-16 border border-slate-200/80 shadow-xl grid lg:grid-cols-12 gap-12 items-center">

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 space-y-6"
            >
              <span className="inline-block text-[#0089A8] font-bold text-xs uppercase tracking-widest bg-[#EAF8FB] px-4 py-2 rounded-full border border-[#BCECF5]">
                Meet Your Expert
              </span>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#003B5C]">
                Dn. Momna
              </h2>

              <p className="text-[#00A8CD] font-semibold text-base">
               CEO Consultant Nutritionist & Dietitian
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                With advanced education in Food Science, Nutrition and
                Dietetics, our approach combines scientific knowledge with
                practical, individualized nutrition care. Our goal is not
                simply to give you a diet chart—it is to help you understand
                your body and build sustainable habits.
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-100">

                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="text-[#00A8CD] font-bold">✓</span>
                  MPhil Food Science (UET)
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="text-[#FF5271] font-bold">✓</span>
                  Doctor of Nutrition & Dietetics (DND) UVAS
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="text-[#F5A623] font-bold">✓</span>
                  Clinical experience at Sir Ganga Ram Hospital, Lahore
                </div>

              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-7 bg-gradient-to-br from-[#003B5C] to-[#015C7F] rounded-[35px] p-8 sm:p-10 text-white shadow-2xl relative border border-[#015C7F] overflow-hidden"
            >

              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#00A8CD]/10 rounded-full blur-3xl" />

              <span className="relative text-[#8DE8F7] text-xs font-bold uppercase tracking-widest">
                Our Philosophy
              </span>

              <blockquote className="relative mt-4 text-xl sm:text-2xl font-serif italic text-slate-100 leading-relaxed">
                “A healthy diet should not be a temporary restriction. It
                should become a sustainable part of your lifestyle.”
              </blockquote>

              <div className="relative mt-8 grid sm:grid-cols-2 gap-4">

                {[
                  "Evidence-based recommendations",
                  "Individualized meal planning",
                  "Sustainable lifestyle changes",
                  "Cultural and dietary preferences",
                  "Practical food choices",
                  "Continuous monitoring & support",
                ].map((phil, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-[#00A8CD]/10 transition-colors duration-300"
                  >
                    <span className="text-[#00A8CD]">✓</span>
                    <span className="text-xs sm:text-sm font-medium">
                      {phil}
                    </span>
                  </div>
                ))}

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================================================
          CONDITIONS
      ================================================== */}

      <section className="py-24 bg-white border-t border-slate-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Targeted Care"
            title="Disease-Specific & Therapeutic Nutrition"
            description="Specialized nutrition care for clients requiring dietary management of specific health conditions, complementing your medical treatment."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">

            {diseaseConditions.map((condition, idx) => {

              const accents = [
                COLORS.teal,
                COLORS.navy,
                COLORS.coral,
                COLORS.gold,
              ];

              const accent = accents[idx % accents.length];

              return (
                <motion.div
                  key={condition}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                  }}
                  className="bg-[#F8F9FA] border border-slate-200/80 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: accent }}
                  />

                  <p className="font-bold text-[#003B5C] text-sm sm:text-base">
                    {condition}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <motion.div
              whileHover={{ y: -6 }}
              className="bg-[#FFF0F3] rounded-[30px] p-8 border border-[#FFD4DC] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-white text-[#FF5271] flex items-center justify-center mb-5 shadow-sm">
                <IconHeart />
              </div>

              <h3 className="text-xl font-bold font-serif text-[#003B5C] mb-3">
                Pregnancy & Lactation Nutrition
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Personalized nutritional guidance to support maternal
                nutritional needs, fetal development, and healthy
                breastfeeding throughout all trimesters.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="bg-[#EAF8FB] rounded-[30px] p-8 border border-[#BCECF5] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-white text-[#00A8CD] flex items-center justify-center mb-5 shadow-sm">
                <IconSparkles />
              </div>

              <h3 className="text-xl font-bold font-serif text-[#003B5C] mb-3">
                Pediatric Nutrition
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Age-appropriate nutrition guidance for children's healthy
                growth, robust development, building healthy eating habits,
                and addressing nutritional concerns.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==================================================
          BEHAVIORAL NUTRITION
      ================================================== */}

      <section className="py-24 bg-[#003B5C] text-white relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-tr from-[#002238] via-[#003B5C] to-[#015C7F]" />

        <div className="absolute -top-32 right-0 w-96 h-96 bg-[#FF5271]/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00A8CD]/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeading
            light
            eyebrow="Behavioral Nutrition & Psychology"
            title="It's Not Always About Knowing What to Eat."
            description="Sometimes you already know what you should eat—but changing your eating behavior is the difficult part."
          />

          <div className="grid lg:grid-cols-12 gap-12 items-center mt-12">

            <div className="lg:col-span-6 space-y-6">

              <p className="text-slate-300 text-base leading-relaxed">
                Our Behavioral Nutrition sessions focus on the relationship
                between your thoughts, emotions, habits, environment, and
                eating behavior.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">

                {[
                  "Emotional eating",
                  "Food cravings",
                  "Mindless eating",
                  "Stress-related eating",
                  "Eating triggers",
                  "Portion awareness",
                  "Mindful eating",
                  "Motivation & Adherence",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-xl backdrop-blur-sm transition-all"
                  >
                    <span className="text-[#00A8CD]">✓</span>
                    <span className="text-xs sm:text-sm text-slate-200">
                      {item}
                    </span>
                  </motion.div>
                ))}

              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="lg:col-span-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[35px] p-8 sm:p-10 shadow-2xl"
            >

              <span className="text-[#8DE8F7] font-bold text-xs uppercase tracking-widest">
                The Ultimate Goal
              </span>

              <h3 className="text-2xl font-serif font-bold text-white mt-2 mb-4">
                Not a perfect diet. A healthier relationship with food.
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We help you build sustainable patterns that you can maintain
                long-term without feeling deprived or restricted.
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 text-xs text-slate-400">
                Note: For significant psychological concerns or diagnosed
                eating disorders, appropriate referral to a qualified
                mental-health professional will be recommended.
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ==================================================
          INTEGRATED CARE
      ================================================== */}

      <section className="py-24 bg-[#F8F9FA]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <SectionHeading
            eyebrow="Multidisciplinary Wellness"
            title="Nutrition + Physiotherapy + Behavioral Support"
            description="Health is more than just food. Our integrated approach brings together complete lifestyle modification."
          />

          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 max-w-5xl mx-auto">

            {[
              {
                title: "Nutrition",
                color: COLORS.teal,
              },
              {
                title: "Behavioral Change",
                color: COLORS.coral,
              },
              {
                title: "Movement & Physiotherapy",
                color: COLORS.gold,
              },
              {
                title: "Lifestyle Modification",
                color: COLORS.orange,
              },
              {
                title: "Long-Term Health",
                color: COLORS.navy,
              },
            ].map((step, idx, arr) => (
              <React.Fragment key={step.title}>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{
                    y: -7,
                    scale: 1.03,
                  }}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm w-full md:w-auto flex-1 text-center transition-all duration-300"
                >

                  <span
                    className="font-bold text-xs"
                    style={{ color: step.color }}
                  >
                    Step 0{idx + 1}
                  </span>

                  <h4 className="font-bold text-[#003B5C] mt-1 text-sm sm:text-base">
                    {step.title}
                  </h4>

                </motion.div>

                {idx < arr.length - 1 && (
                  <div className="text-[#00A8CD] font-black text-lg md:rotate-0 rotate-90 my-2 md:my-0">
                    →
                  </div>
                )}

              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          CARE PLANS
      ================================================== */}

      <section className="py-24 bg-white border-t border-slate-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Flexible Packages"
            title="Choose the Level of Support You Need"
            description="Structured care plans designed to give you optimal guidance depending on your specific health requirements."
          />

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Disease Care Plan */}

            <motion.div
              whileHover={{ y: -7 }}
              className="bg-[#F8F9FA] border border-slate-200 rounded-[35px] p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >

              <div>

                <span className="inline-block px-4 py-1.5 rounded-full bg-[#EAF8FB] text-[#0089A8] text-xs font-bold uppercase tracking-wider mb-4">
                  🌱 Disease Care Plan
                </span>

                <h3 className="text-2xl font-serif font-bold text-[#003B5C] mb-2">
                  For clients with one primary health condition
                </h3>

                <ul className="mt-6 space-y-3">

                  {[
                    "Comprehensive nutrition assessment",
                    "Disease-specific personalized diet plan",
                    "Calorie & macronutrient planning",
                    "Meal and portion guidance",
                    "1 Behavioral Nutrition session/month",
                    "2 physiotherapy sessions/month",
                    "Supplement assessment & lab review",
                    "2 nutrition follow-ups/month + WhatsApp support",
                  ].map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <span className="text-[#00A8CD] font-bold">✓</span>
                      {feat}
                    </li>
                  ))}

                </ul>
              </div>

              <div className="mt-10">

                <Link
                  to="/book-a-free-consult"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#003B5C] hover:bg-[#00A8CD] text-white font-bold py-4 rounded-full transition-all duration-300 text-sm"
                >
                  Book Disease Care Plan
                  <IconArrow />
                </Link>

              </div>
            </motion.div>

            {/* Comprehensive Care */}

            <motion.div
              whileHover={{ y: -7 }}
              className="bg-gradient-to-br from-[#003B5C] to-[#015C7F] text-white rounded-[35px] p-8 sm:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden border border-[#015C7F]"
            >

              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#00A8CD]/10 rounded-full blur-3xl" />

              <div className="relative">

                <span className="inline-block px-4 py-1.5 rounded-full bg-[#00A8CD]/15 text-[#8DE8F7] text-xs font-bold uppercase tracking-wider mb-4 border border-[#00A8CD]/30">
                  🏥 Disease + Complication Plan
                </span>

                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  For comprehensive care & multiple health concerns
                </h3>

                <ul className="mt-6 space-y-3">

                  {[
                    "Everything in Disease Care Plan, plus:",
                    "Advanced therapeutic meal planning",
                    "Management of multiple nutritional requirements",
                    "2 Behavioral Nutrition sessions/month",
                    "4–8 physiotherapy sessions according to need",
                    "Detailed laboratory & body-composition review",
                    "Physician coordination/referral when required",
                    "Priority follow-up & monthly progress review",
                  ].map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-200"
                    >
                      <span className="text-[#00A8CD] font-bold">✓</span>
                      {feat}
                    </li>
                  ))}

                </ul>
              </div>

              <div className="relative mt-10">

                <Link
                  to="/book-a-free-consult"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#00A8CD] hover:bg-[#8DE8F7] text-[#002238] font-bold py-4 rounded-full transition-all duration-300 text-sm shadow-lg"
                >
                  Book Comprehensive Care
                  <IconArrow />
                </Link>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================================================
          HOW IT WORKS
      ================================================== */}

      <section className="py-24 bg-[#F8F9FA]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Step-by-Step Journey"
            title="Your Journey to Better Health"
            description="A clear and structured path designed to take you from initial assessment to sustained lifelong wellness."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

            {howItWorksSteps.map((step, index) => {

              const colors = [
                COLORS.teal,
                COLORS.navy,
                COLORS.coral,
                COLORS.gold,
                COLORS.orange,
                COLORS.tealDark,
              ];

              const stepColor = colors[index];

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{
                    y: -7,
                    scale: 1.01,
                  }}
                  className="bg-white rounded-[30px] p-8 border border-slate-200/80 shadow-sm hover:shadow-xl relative overflow-hidden transition-all duration-300"
                >

                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: stepColor }}
                  />

                  <span
                    className="text-4xl font-serif font-extrabold"
                    style={{ color: `${stepColor}45` }}
                  >
                    {step.step}
                  </span>

                  <h3 className="text-xl font-serif font-bold text-[#003B5C] mt-2 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.desc}
                  </p>

                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          ONLINE CONSULTATION
      ================================================== */}

      <section className="py-24 bg-white border-t border-slate-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-r from-[#003B5C] to-[#002238] rounded-[40px] p-8 sm:p-12 lg:p-16 text-white shadow-2xl grid lg:grid-cols-12 gap-8 items-center border border-[#015C7F] relative overflow-hidden"
          >

            <div className="absolute right-0 top-0 w-72 h-72 bg-[#00A8CD]/10 rounded-full blur-3xl" />

            <div className="relative lg:col-span-8 space-y-6">

              <span className="inline-block px-4 py-1.5 rounded-full bg-[#00A8CD]/10 text-[#8DE8F7] text-xs font-bold uppercase tracking-widest border border-[#00A8CD]/30">
                Online Consultation
              </span>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold">
                Nutrition Care From Wherever You Are
              </h2>

              <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
                Can't visit the clinic? Receive personalized nutrition
                guidance securely through online consultations including
                dietary history, custom meal plans, lab discussions, and
                behavioral support.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">

                {[
                  "Nutrition Assessment",
                  "Custom Meal Plan",
                  "Disease Nutrition",
                  "Lab Discussion",
                  "Behavioral Support",
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-white/10 px-3 py-1.5 rounded-full text-xs text-slate-200 border border-white/10"
                  >
                    <span className="text-[#00A8CD]">✓</span>{" "}
                    {item}
                  </span>
                ))}

              </div>
            </div>

            <div className="relative lg:col-span-4 flex justify-center">

              <Link
                to="/book-a-free-consult"
                className="inline-flex items-center gap-2 bg-[#00A8CD] hover:bg-[#8DE8F7] text-[#002238] font-bold px-8 py-5 rounded-full shadow-2xl transition-all duration-300 text-base hover:-translate-y-1"
              >
                Book Online Consultation
                <IconArrow />
              </Link>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================================================
          FAQ
      ================================================== */}

      <section className="py-24 bg-[#F8F9FA]">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Got Questions?"
            title="Frequently Asked Questions"
            description="Find clear answers regarding our customized plans, online appointments, and medical nutrition services."
          />

          <div className="space-y-4 mt-12">

            {faqData.map((faq, index) => {

              const isOpen = openFaq === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "border-[#00A8CD]/40 shadow-lg"
                      : "border-slate-200/80 shadow-sm"
                  }`}
                >

                  <button
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="w-full flex items-center justify-between gap-4 p-6 text-left font-serif font-bold text-[#003B5C] hover:text-[#00A8CD] transition-colors cursor-pointer"
                  >

                    <span className="text-base sm:text-lg">
                      {faq.q}
                    </span>

                    <span
                      className={`flex-shrink-0 transform transition-transform duration-300 text-[#00A8CD] font-bold text-xl ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>

                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <div className="px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

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
          <div
            className="fixed inset-0 z-50 bg-[#002238]/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveService(null)}
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-xl rounded-[35px] shadow-2xl overflow-hidden relative border border-slate-100"
            >

              {/* Modal top accent */}
              <div
                className="h-2"
                style={{
                  background: `linear-gradient(90deg, ${activeService.color}, ${activeService.color}70)`,
                }}
              />

              <div className="p-8 sm:p-10">

                <div className="flex items-start justify-between gap-4 mb-6">

                  <div>

                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{
                        color: activeService.color,
                      }}
                    >
                      Service Detail
                    </span>

                    <h3 className="text-2xl font-serif font-bold text-[#003B5C] mt-1">
                      {activeService.title}
                    </h3>

                  </div>

                  <button
                    onClick={() => setActiveService(null)}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#FFF0F3] hover:text-[#FF5271] text-slate-700 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <IconClose />
                  </button>

                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  {activeService.desc}
                </p>

                <div className="space-y-3 mb-8">

                  {activeService.points.map((pt, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-[#F8F9FA] p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
                    >
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: activeService.lightColor,
                          color: activeService.color,
                        }}
                      >
                        <IconCheck />
                      </span>

                      <span className="text-sm font-medium text-slate-800">
                        {pt}
                      </span>
                    </div>
                  ))}

                </div>

                <Link
                  to="/book-a-free-consult"
                  onClick={() => setActiveService(null)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#003B5C] hover:bg-[#00A8CD] text-white font-bold py-4 rounded-full transition-all duration-300 text-sm text-center"
                >
                  Book Consultation for this Service
                  <IconArrow />
                </Link>

              </div>
            </motion.div>
          </div>
        )}

      </AnimatePresence>

     
    </div>
  );
}