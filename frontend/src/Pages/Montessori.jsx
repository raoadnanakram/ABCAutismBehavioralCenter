import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Brain,
  BookOpen,
  Hand,
  Shapes,
  Calculator,
  Globe2,
  Sprout,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Star,
  Puzzle,
  Home,
  Palette,
} from "lucide-react";

const MontessoriPage = () => {
  const [activeArea, setActiveArea] = useState(0);

  const learningAreas = [
    {
      title: "Practical Life",
      shortTitle: "Practical Life",
      icon: Hand,
      color: "yellow",
      description:
        "Children build independence, coordination, concentration, and confidence through meaningful everyday activities.",
      points: [
        "Self-care and personal routines",
        "Grace and courtesy",
        "Care of the environment",
        "Fine-motor coordination",
      ],
    },
    {
      title: "Sensorial Learning",
      shortTitle: "Sensorial",
      icon: Shapes,
      color: "sky",
      description:
        "Hands-on materials help children explore, compare, classify, and refine their understanding of the world through the senses.",
      points: [
        "Colour and shape recognition",
        "Size and dimension",
        "Texture and sound",
        "Observation and classification",
      ],
    },
    {
      title: "Language",
      shortTitle: "Language",
      icon: BookOpen,
      color: "red",
      description:
        "Language experiences support vocabulary, communication, early literacy, listening, and expression.",
      points: [
        "Vocabulary development",
        "Sound awareness",
        "Pre-reading activities",
        "Early writing skills",
      ],
    },
    {
      title: "Mathematics",
      shortTitle: "Mathematics",
      icon: Calculator,
      color: "yellow",
      description:
        "Concrete materials allow children to experience quantity, number, sequence, and mathematical relationships.",
      points: [
        "Number recognition",
        "Counting and quantity",
        "Patterns and sequences",
        "Concrete-to-abstract learning",
      ],
    },
    {
      title: "Culture & Science",
      shortTitle: "Culture & Science",
      icon: Globe2,
      color: "sky",
      description:
        "Children explore nature, geography, science, art, and the wider world through meaningful experiences.",
      points: [
        "Nature exploration",
        "Geography",
        "Science discovery",
        "Art and creative expression",
      ],
    },
  ];

  const principles = [
    {
      icon: Home,
      title: "Prepared Environment",
      text: "A carefully arranged environment with accessible materials and child-sized spaces.",
      color: "yellow",
    },
    {
      icon: Heart,
      title: "Child-Centered Learning",
      text: "Children are supported according to their individual interests, pace, and developmental needs.",
      color: "red",
    },
    {
      icon: Hand,
      title: "Hands-On Exploration",
      text: "Learning happens through purposeful movement, materials, repetition, and direct experience.",
      color: "sky",
    },
    {
      icon: ShieldCheck,
      title: "Independence",
      text: "Children are encouraged to develop confidence and independence within appropriate limits.",
      color: "yellow",
    },
  ];

  const benefits = [
    "Builds independence and confidence",
    "Strengthens concentration",
    "Develops fine and gross motor coordination",
    "Encourages curiosity and exploration",
    "Supports language and communication",
    "Builds early mathematical thinking",
  ];

  const colorClasses = {
    yellow: {
      bg: "bg-yellow-50",
      iconBg: "bg-yellow-100",
      icon: "text-yellow-600",
      border: "border-yellow-200",
      text: "text-yellow-700",
      active: "border-yellow-400 ring-yellow-100",
    },
    sky: {
      bg: "bg-sky-50",
      iconBg: "bg-sky-100",
      icon: "text-sky-600",
      border: "border-sky-200",
      text: "text-sky-700",
      active: "border-sky-400 ring-sky-100",
    },
    red: {
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      icon: "text-red-500",
      border: "border-red-200",
      text: "text-red-600",
      active: "border-red-400 ring-red-100",
    },
  };

  /* =========================================================
      PREMIUM ANIMATION VARIANTS
  ========================================================= */

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeLeft = {
    hidden: {
      opacity: 0,
      x: -45,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeRight = {
    hidden: {
      opacity: 0,
      x: 45,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardAnimation = {
    hidden: {
      opacity: 0,
      y: 25,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section
        id="top"
        className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-sky-50 pt-16 pb-16 lg:pt-20 lg:pb-20"
      >
        {/* Decorative Background */}
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-yellow-200/30 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-sky-200/25 blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-red-100/25 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
            {/* LEFT */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate="visible"
            >
              {/* TAG */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{
                  y: -2,
                  scale: 1.02,
                }}
                className="mb-6 inline-flex cursor-default items-center gap-2 rounded-full border border-sky-200 bg-white/90 px-4 py-2 text-xs font-bold tracking-wide text-sky-700 shadow-sm backdrop-blur sm:text-sm"
              >
                <Sparkles className="h-4 w-4 text-yellow-500" />
                MONTESSORI • CHILD-CENTERED LEARNING
              </motion.div>

              {/* HEADING */}
              <h1 className="max-w-3xl text-4xl font-black leading-[1] tracking-tight text-slate-950 sm:text-5xl lg:text-[56px]">
                Helping Children
                <br />
                <motion.span
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="inline-block text-red-500"
                >
                  Learn With Purpose
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.45 }}
                  className="inline-block text-sky-600"
                >
                  Grow With Confidence.
                </motion.span>
              </h1>

              {/* DESCRIPTION */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg"
              >
                A thoughtfully prepared Montessori environment where children
                explore, discover, practice, and build independence through
                meaningful hands-on learning experiences.
              </motion.p>

              {/* BUTTONS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="mt-7 flex flex-col gap-3 sm:flex-row"
              >
                {/* APPOINTMENT BUTTON */}
                <motion.a
                  href="/book-a-free-consult"
                  whileHover={{
                    y: -4,
                    scale: 1.025,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-sky-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-600/25 transition-all duration-300 hover:bg-sky-700 hover:shadow-xl hover:shadow-sky-600/30"
                >
                  {/* Shine */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <span className="relative">
                    Book an Appointment
                  </span>

                  <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>

                {/* EXPLORE BUTTON */}
                <motion.a
                  href="#learning-areas"
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition-all duration-300 hover:border-sky-400 hover:bg-sky-50 hover:shadow-lg"
                >
                  Explore Montessori
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>
              </motion.div>

              {/* TRUST LINE */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.85 }}
                className="mt-7 flex items-center gap-3"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100"
                >
                  <Heart className="h-5 w-5 text-red-500" />
                </motion.div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Learning at the child&apos;s pace
                  </p>

                  <p className="text-xs text-slate-500">
                    Purposeful activity • Independence • Discovery
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT VISUAL */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="visible"
              className="mx-auto w-full max-w-md"
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.015,
                }}
                className="relative aspect-square rounded-[34px] border border-sky-100 bg-white p-6 shadow-2xl shadow-slate-200/60 transition-shadow duration-500 hover:shadow-2xl hover:shadow-sky-200/40"
              >
                {/* Decorative Circles */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-yellow-200/60"
                />

                <motion.div
                  animate={{
                    scale: [1, 1.12, 1],
                    rotate: [0, -10, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-5 -left-5 h-20 w-20 rounded-full bg-red-200/50"
                />

                {/* Main Circle */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 20px 45px rgba(15,23,42,0.18)",
                      "0 25px 60px rgba(14,165,233,0.18)",
                      "0 20px 45px rgba(15,23,42,0.18)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{
                        rotate: [0, 8, -8, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Sparkles className="mx-auto mb-2 h-7 w-7 text-yellow-400" />
                    </motion.div>

                    <p className="text-[11px] font-black uppercase tracking-wider text-white">
                      Montessori
                    </p>

                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-sky-400">
                      Learning
                    </p>
                  </div>
                </motion.div>

                {/* TOP LEFT */}
                <motion.div
                  whileHover={{
                    y: -7,
                    scale: 1.04,
                    rotate: -1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="absolute left-5 top-7 w-[42%] cursor-pointer rounded-2xl border border-yellow-100 bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-100">
                    <Hand className="h-4 w-4 text-yellow-600" />
                  </div>

                  <p className="mt-3 text-xs font-bold text-slate-900 sm:text-sm">
                    Practical Life
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-slate-500">
                    Independence &amp; confidence
                  </p>
                </motion.div>

                {/* TOP RIGHT */}
                <motion.div
                  whileHover={{
                    y: -7,
                    scale: 1.04,
                    rotate: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="absolute right-5 top-7 w-[38%] cursor-pointer rounded-2xl border border-sky-100 bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100">
                    <Shapes className="h-4 w-4 text-sky-600" />
                  </div>

                  <p className="mt-3 text-xs font-bold text-slate-900 sm:text-sm">
                    Sensorial
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-slate-500">
                    Explore &amp; discover
                  </p>
                </motion.div>

                {/* BOTTOM LEFT */}
                <motion.div
                  whileHover={{
                    y: 7,
                    scale: 1.04,
                    rotate: -1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="absolute bottom-7 left-5 w-[38%] cursor-pointer rounded-2xl border border-red-100 bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100">
                    <BookOpen className="h-4 w-4 text-red-500" />
                  </div>

                  <p className="mt-3 text-xs font-bold text-slate-900 sm:text-sm">
                    Language
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-slate-500">
                    Communication &amp; literacy
                  </p>
                </motion.div>

                {/* BOTTOM RIGHT */}
                <motion.div
                  whileHover={{
                    y: 7,
                    scale: 1.04,
                    rotate: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="absolute bottom-7 right-5 w-[42%] cursor-pointer rounded-2xl border border-yellow-100 bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-100">
                    <Calculator className="h-4 w-4 text-yellow-600" />
                  </div>

                  <p className="mt-3 text-xs font-bold text-slate-900 sm:text-sm">
                    Mathematics
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-slate-500">
                    Concrete learning
                  </p>
                </motion.div>

                {/* Connection Dots */}
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute left-[39%] top-[34%] h-2 w-2 rounded-full bg-yellow-400"
                />

                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    delay: 0.4,
                    repeat: Infinity,
                  }}
                  className="absolute right-[39%] top-[34%] h-2 w-2 rounded-full bg-sky-400"
                />

                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    delay: 0.8,
                    repeat: Infinity,
                  }}
                  className="absolute bottom-[34%] left-[39%] h-2 w-2 rounded-full bg-red-400"
                />

                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    delay: 1.2,
                    repeat: Infinity,
                  }}
                  className="absolute bottom-[34%] right-[39%] h-2 w-2 rounded-full bg-yellow-400"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* HERO STATS */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            whileHover={{
              y: -3,
            }}
            className="mt-10 rounded-2xl border border-slate-100 bg-white/90 p-5 shadow-lg shadow-slate-200/40 backdrop-blur transition-shadow duration-300 hover:shadow-xl hover:shadow-sky-100/50 lg:mt-12"
          >
            <div className="grid gap-5 md:grid-cols-3 md:divide-x md:divide-slate-100">
              <div className="flex items-center gap-3 md:justify-center">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100"
                >
                  <Hand className="h-5 w-5 text-yellow-600" />
                </motion.div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Hands-On Learning
                  </p>

                  <p className="text-xs text-slate-500">
                    Purposeful activities
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:justify-center">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100"
                >
                  <Brain className="h-5 w-5 text-sky-600" />
                </motion.div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Child-Centered
                  </p>

                  <p className="text-xs text-slate-500">
                    Individual development
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:justify-center">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100"
                >
                  <Heart className="h-5 w-5 text-red-500" />
                </motion.div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Whole Child
                  </p>

                  <p className="text-xs text-slate-500">
                    Confidence &amp; growth
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600">
                Our Montessori Approach
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                An environment prepared for
                <span className="text-red-500"> growing minds.</span>
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-slate-600">
                Montessori learning places the child in a carefully prepared
                environment where accessible materials, purposeful activities,
                and thoughtful adult guidance support active exploration and
                independence.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  "Independence",
                  "Concentration",
                  "Movement",
                  "Curiosity",
                  "Confidence",
                ].map((item, index) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{
                      y: -3,
                      scale: 1.05,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.08,
                    }}
                    className={`cursor-default rounded-full px-3 py-2 text-xs font-bold ${
                      index % 3 === 0
                        ? "bg-yellow-100 text-yellow-700"
                        : index % 3 === 1
                        ? "bg-sky-100 text-sky-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {principles.map((item) => {
                const Icon = item.icon;
                const colors = colorClasses[item.color];

                return (
                  <motion.div
                    key={item.title}
                    variants={cardAnimation}
                    whileHover={{
                      y: -7,
                      scale: 1.02,
                    }}
                    className={`group rounded-3xl border ${colors.border} ${colors.bg} p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl`}
                  >
                    <motion.div
                      whileHover={{
                        rotate: 7,
                        scale: 1.08,
                      }}
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors.iconBg}`}
                    >
                      <Icon className={`h-5 w-5 ${colors.icon}`} />
                    </motion.div>

                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          LEARNING AREAS
      ========================================================= */}
      <section
        id="learning-areas"
        className="scroll-mt-20 bg-slate-50 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-600">
              Montessori Learning Areas
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              Learning through
              <span className="text-sky-600"> purposeful discovery.</span>
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Montessori environments commonly bring together practical life,
              sensorial, language, mathematics, and cultural learning
              experiences.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            {/* NAV */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-3"
            >
              {learningAreas.map((area, index) => {
                const Icon = area.icon;
                const colors = colorClasses[area.color];
                const isActive = activeArea === index;

                return (
                  <motion.button
                    key={area.title}
                    variants={cardAnimation}
                    whileHover={{
                      x: 5,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    type="button"
                    onClick={() => setActiveArea(index)}
                    className={`flex w-full items-center gap-4 rounded-2xl border bg-white p-4 text-left transition-all duration-300 ${
                      isActive
                        ? `${colors.active} shadow-lg ring-4`
                        : "border-slate-100 shadow-sm hover:border-slate-200 hover:shadow-md"
                    }`}
                  >
                    <motion.div
                      animate={
                        isActive
                          ? {
                              scale: [1, 1.08, 1],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.8,
                        repeat: isActive ? Infinity : 0,
                      }}
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        isActive ? colors.iconBg : "bg-slate-100"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isActive ? colors.icon : "text-slate-500"
                        }`}
                      />
                    </motion.div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900">
                        {area.title}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Explore this area
                      </p>
                    </div>

                    <ChevronRight
                      className={`h-5 w-5 transition-transform duration-300 ${
                        isActive
                          ? `${colors.icon} translate-x-1`
                          : "text-slate-300"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </motion.div>

            {/* ACTIVE AREA */}
            <motion.div
              key={activeArea}
              initial={{
                opacity: 0,
                x: 20,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -4,
              }}
              className="rounded-[32px] border border-slate-100 bg-white p-7 shadow-xl shadow-slate-200/50 transition-shadow duration-300 hover:shadow-2xl sm:p-9"
            >
              {(() => {
                const area = learningAreas[activeArea];
                const Icon = area.icon;
                const colors = colorClasses[area.color];

                return (
                  <>
                    <div className="flex items-start justify-between gap-5">
                      <motion.div
                        whileHover={{
                          rotate: 8,
                          scale: 1.08,
                        }}
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colors.iconBg}`}
                      >
                        <Icon className={`h-7 w-7 ${colors.icon}`} />
                      </motion.div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${colors.bg} ${colors.text}`}
                      >
                        Montessori Area
                      </span>
                    </div>

                    <h3 className="mt-7 text-2xl font-black text-slate-950">
                      {area.title}
                    </h3>

                    <p className="mt-4 leading-7 text-slate-600">
                      {area.description}
                    </p>

                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="mt-7 grid gap-3 sm:grid-cols-2"
                    >
                      {area.points.map((point) => (
                        <motion.div
                          key={point}
                          variants={cardAnimation}
                          whileHover={{
                            x: 4,
                            scale: 1.015,
                          }}
                          className={`flex items-center gap-3 rounded-xl ${colors.bg} p-4`}
                        >
                          <CheckCircle2
                            className={`h-5 w-5 shrink-0 ${colors.icon}`}
                          />

                          <span className="text-sm font-semibold text-slate-700">
                            {point}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </>
                );
              })()}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRACTICAL LIFE
      ========================================================= */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.08,
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100"
                >
                  <Hand className="h-6 w-6 text-yellow-600" />
                </motion.div>

                <span className="text-sm font-bold uppercase tracking-wider text-yellow-600">
                  Practical Life
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-black text-slate-950 sm:text-4xl">
                Everyday activities can build
                <span className="text-yellow-600"> lifelong skills.</span>
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                Practical Life activities connect children with purposeful
                everyday experiences. They can support movement, coordination,
                concentration, independence, and confidence.
              </p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-7 space-y-3"
              >
                {[
                  "Pouring, transferring and sorting",
                  "Personal care routines",
                  "Caring for classroom materials",
                  "Grace and courtesy",
                ].map((item) => (
                  <motion.div
                    key={item}
                    variants={cardAnimation}
                    whileHover={{
                      x: 5,
                    }}
                    className="flex items-center gap-3 rounded-xl bg-yellow-50 p-4 transition-shadow duration-300 hover:shadow-md"
                  >
                    <CheckCircle2 className="h-5 w-5 text-yellow-600" />

                    <span className="text-sm font-semibold text-slate-700">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                y: -5,
              }}
              className="rounded-[32px] bg-gradient-to-br from-yellow-50 via-white to-sky-50 p-8 ring-1 ring-yellow-100 transition-shadow duration-500 hover:shadow-2xl hover:shadow-yellow-100/50"
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-4 sm:grid-cols-2"
              >
                <motion.div
                  variants={cardAnimation}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <Puzzle className="h-7 w-7 text-yellow-600" />

                  <h3 className="mt-4 font-bold text-slate-900">
                    Coordination
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Purposeful hand and body movements support developing
                    coordination.
                  </p>
                </motion.div>

                <motion.div
                  variants={cardAnimation}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <Star className="h-7 w-7 text-red-500" />

                  <h3 className="mt-4 font-bold text-slate-900">
                    Confidence
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Completing meaningful tasks can help children experience
                    capability and success.
                  </p>
                </motion.div>

                <motion.div
                  variants={cardAnimation}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <Brain className="h-7 w-7 text-sky-600" />

                  <h3 className="mt-4 font-bold text-slate-900">
                    Concentration
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Repetition and purposeful work encourage sustained
                    attention.
                  </p>
                </motion.div>

                <motion.div
                  variants={cardAnimation}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <Heart className="h-7 w-7 text-red-500" />

                  <h3 className="mt-4 font-bold text-slate-900">
                    Independence
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Children are supported in doing meaningful tasks as
                    independently as appropriate.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PREPARED ENVIRONMENT
      ========================================================= */}
      <section className="bg-sky-50/70 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600">
              The Prepared Environment
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              A space designed to help children
              <span className="text-sky-600"> do more for themselves.</span>
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              The Montessori environment is intentionally organized so
              children can access appropriate materials, move with purpose,
              and engage in meaningful work.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-10 grid gap-5 md:grid-cols-3"
          >
            <motion.div
              variants={cardAnimation}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="rounded-3xl border border-sky-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl"
            >
              <Home className="h-7 w-7 text-sky-600" />

              <h3 className="mt-5 text-xl font-black text-slate-900">
                Child-Sized
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Furniture, materials, and spaces are arranged with children’s
                access and movement in mind.
              </p>
            </motion.div>

            <motion.div
              variants={cardAnimation}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="rounded-3xl border border-yellow-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl"
            >
              <Palette className="h-7 w-7 text-yellow-600" />

              <h3 className="mt-5 text-xl font-black text-slate-900">
                Order &amp; Beauty
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                A calm, organized environment gives children clear places for
                purposeful materials and activities.
              </p>
            </motion.div>

            <motion.div
              variants={cardAnimation}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="rounded-3xl border border-red-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl"
            >
              <Sprout className="h-7 w-7 text-red-500" />

              <h3 className="mt-5 text-xl font-black text-slate-900">
                Nature &amp; Reality
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Meaningful experiences can connect children with real objects,
                everyday life, nature, and their wider community.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          BENEFITS
      ========================================================= */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            whileHover={{
              y: -3,
            }}
            className="rounded-[36px] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-300/30 sm:p-12"
          >
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-400">
                  Growing Through Learning
                </p>

                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                  More than academics.
                  <span className="text-sky-400">
                    {" "}
                    Building the whole child.
                  </span>
                </h2>

                <p className="mt-5 leading-7 text-slate-300">
                  Montessori learning is designed to support children’s
                  intellectual, physical, social, emotional, and practical
                  development through purposeful experiences.
                </p>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-3 sm:grid-cols-2"
              >
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    variants={cardAnimation}
                    whileHover={{
                      y: -4,
                      scale: 1.02,
                    }}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10"
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        index % 3 === 0
                          ? "bg-yellow-400/15"
                          : index % 3 === 1
                          ? "bg-sky-400/15"
                          : "bg-red-400/15"
                      }`}
                    >
                      <CheckCircle2
                        className={`h-4 w-4 ${
                          index % 3 === 0
                            ? "text-yellow-400"
                            : index % 3 === 1
                            ? "text-sky-400"
                            : "text-red-400"
                        }`}
                      />
                    </div>

                    <span className="text-sm font-semibold text-slate-200">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FAMILY / COLLABORATION
      ========================================================= */}
      <section className="bg-gradient-to-br from-yellow-50 via-white to-red-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100"
            >
              <Users className="h-7 w-7 text-yellow-600" />
            </motion.div>

            <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-sky-600">
              Partnership Matters
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              Children thrive when the adults around them
              <span className="text-red-500"> work together.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-3xl leading-7 text-slate-600">
              A strong learning experience benefits from communication between
              the child, educators, and family. Shared observations and
              consistent support can help create a more connected experience
              for the child.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-9 grid gap-4 sm:grid-cols-3"
          >
            {[
              {
                title: "Observe",
                text: "Understand the child's strengths, interests, and needs.",
                color: "yellow",
              },
              {
                title: "Guide",
                text: "Offer appropriate materials, demonstrations, and support.",
                color: "sky",
              },
              {
                title: "Grow",
                text: "Celebrate progress while encouraging continued independence.",
                color: "red",
              },
            ].map((item) => {
              const colors = colorClasses[item.color];

              return (
                <motion.div
                  key={item.title}
                  variants={cardAnimation}
                  whileHover={{
                    y: -7,
                    scale: 1.025,
                  }}
                  className={`rounded-3xl border ${colors.border} ${colors.bg} p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl`}
                >
                  <h3 className={`text-lg font-black ${colors.text}`}>
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          SAFETY / NOTE
      ========================================================= */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{
              y: -3,
            }}
            className="flex flex-col gap-4 rounded-3xl border border-yellow-200 bg-yellow-50 p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:flex-row sm:items-start"
          >
            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-100"
            >
              <ShieldCheck className="h-5 w-5 text-yellow-600" />
            </motion.div>

            <div>
              <h3 className="font-black text-slate-900">
                Individualized Support
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Every child develops differently. Montessori activities and
                expectations should be presented according to the child’s age,
                developmental stage, abilities, interests, and individual
                needs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
          Appointment Button
      ========================================================= */}
      <section className="border-t border-slate-100 bg-white py-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl px-6 text-center lg:px-8"
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100"
          >
            <Sparkles className="h-7 w-7 text-sky-600" />
          </motion.div>

          <h2 className="mt-5 text-3xl font-black text-slate-950 sm:text-4xl">
            Ready to explore the right learning pathway?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Connect with our team to discuss your child&apos;s learning needs
            and explore how a thoughtfully prepared environment can support
            their development.
          </p>

          {/* FINAL APPOINTMENT BUTTON */}
          <motion.a
            href="/book-a-free-consult"
            whileHover={{
              y: -5,
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="group relative mt-7 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-red-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:bg-red-600 hover:shadow-xl hover:shadow-red-500/30"
          >
            {/* Button Shine */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <span className="relative">Book an Appointment</span>

            <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default MontessoriPage;