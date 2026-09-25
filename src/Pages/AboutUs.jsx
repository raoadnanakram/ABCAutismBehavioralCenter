import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

// Hero background
import heroBg from "../assets/hero-banner.jpg";
import drBilal from '../assets/dr-Bilal.jpeg';
import drAliRaza from '../assets/dr-AliRaza.jpg';
import drAtiya from '../assets/dr-Atiya.jpg';
import drMonina from '../assets/dr-Monina.jpeg';

/* =========================================================
   STATS DATA
========================================================= */

const statsData = [
  {
    label: "Specialized Services",
    value: 10,
    suffix: "+",
  },
  {
    label: "Families Supported",
    value: 1000,
    suffix: "+",
  },
  {
    label: "Expert Professionals",
    value: 10,
    suffix: "+",
  },
  {
    label: "Family Satisfaction",
    value: 95,
    suffix: "%",
  },
];

/* =========================================================
   TEAM DATA
========================================================= */

const teamMembersData = [
  {
    name: "Imran Malik",
    role: "CEO | Speech & Language Pathologist",
    degree: "M.Phil (Speech & Language Therapy)",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Aarsa Saeed",
    role: "Speech Pathologist",
    degree: "MS (Speech & Language Pathology)",
    image:
      "https://images.unsplash.com/photo-1594824813566-78a933758f46?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Dr. Muhammad Arqam",
    role: "Physiotherapist",
    degree: "DPT, MSPT - MSK",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Dr. Aasma Munir",
    role: "Child Psychologist",
    degree: "PhD (Applied Psychology)",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
  },
];

/* =========================================================
   REUSABLE ANIMATION VARIANTS
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
      ease: "easeOut",
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   SECTION HEADING
========================================================= */

const SectionHeading = ({
  eyebrow,
  title,
  description,
  light = false,
}) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-3xl mx-auto text-center mb-14"
    >
      <span
        className={`inline-block text-xs font-extrabold tracking-[0.2em] uppercase mb-4 ${
          light ? "text-[#F5A623]" : "text-[#FF5271]"
        }`}
      >
        {eyebrow}
      </span>

      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-[42px] font-extrabold leading-tight ${
          light ? "text-white" : "text-[#003B5C]"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 text-sm sm:text-base leading-7 ${
            light ? "text-slate-200" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};

/* =========================================================
   STAT COUNTER
========================================================= */

const StatCounter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.4,
  });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800;
    const increment = Math.max(1, Math.ceil(value / 50));
    const intervalTime = Math.max(
      20,
      Math.floor(duration / (value / increment))
    );

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    alert("Appointment Request Submitted Successfully!");

    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    });
  };

  return (
    <main className="w-full overflow-x-hidden bg-[#F8F9FA] text-slate-800 font-sans">

      {/* =====================================================
          1. HERO SECTION
      ===================================================== */}

      <section className="relative min-h-[720px] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#003B5C] text-white">

        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="ABC Autism and Behavioral Center"
            className="w-full h-full object-cover opacity-20 scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#003B5C]/95 via-[#003B5C]/90 to-[#005F60]/75" />
        </div>

        {/* Decorative shapes */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#F5A623]/15 blur-3xl pointer-events-none"
        />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#FF5271]/20 blur-3xl pointer-events-none"
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 py-28 text-center">

          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center bg-[#F5A623]/15 border border-[#F5A623]/40 text-[#F5A623] text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.18em] px-4 py-2 rounded-full"
          >
            About ABC Autism & Behavioral Center
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white uppercase"
          >
                        EMBRACING DIFFERENCES,
                             <br />
            <span className="text-[#FF5271] italic">EMPOWERING POTENTIAL</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="max-w-3xl mx-auto mt-7 text-sm sm:text-base lg:text-lg text-slate-200 leading-7"
          >
            At ABC Autism & Behavioral Center, we create a supportive,
            compassionate environment where every child is understood,
            encouraged and empowered to reach their full potential.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-9"
          >
            <a
              href="#approach"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FF5271] hover:bg-[#e04360] text-white font-bold text-sm shadow-lg shadow-[#FF5271]/25 transition-all duration-300 hover:-translate-y-1"
            >
              Explore Our Approach
            </a>

            <a
              href="#appointment"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white hover:text-[#003B5C] border border-white/30 text-white font-bold text-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
            >
              Book an Assessment
            </a>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          2. WHO WE ARE
      ===================================================== */}

      <section className="py-20 lg:py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-[28px] overflow-hidden border-4 border-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1000"
                alt="Therapist supporting a child"
                className="w-full h-[390px] sm:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#003B5C]/35 to-transparent" />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-6 right-3 sm:right-7 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-[#FF5271]/10 text-[#FF5271] flex items-center justify-center">
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Our Philosophy
                </p>

                <p className="text-sm font-extrabold text-[#003B5C]">
                  Child-Centered Care
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7"
          >
            <span className="inline-block text-[#00A8CD] font-extrabold text-xs uppercase tracking-[0.18em] bg-[#00A8CD]/10 px-4 py-2 rounded-full border border-[#00A8CD]/20">
              WHO WE ARE
            </span>

            <h2 className="mt-5 font-serif text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#003B5C] leading-tight">
              Supporting Every Child With Care, Expertise & Understanding
            </h2>

            <div className="mt-6 space-y-5 text-sm sm:text-base text-slate-600 leading-7">
              <p>
                Our Centre is a multidisciplinary healthcare, rehabilitation, education, and child development centre dedicated to helping individuals achieve better health, development, learning, independence, and quality of life.
              </p>

              <p>
                
Our team of qualified professionals—including Nutrition & Dietetics, Physiotherapy, Speech & Language Therapy, Occupational Therapy & Sensory Integration, Special Education, ABA therapy and Early Childhood Education—works collaboratively to provide personalized, evidence-based care under one roof.
              </p>

              <p>
                From therapeutic and rehabilitation services to Montessori, early childhood education, daycare, and specialized nutrition care, we create a safe, nurturing, and inclusive environment where every individual is understood, supported, and empowered to reach their fullest potential.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
              {[
                "Child-Centered",
                "Evidence-Informed",
                "Family-Focused",
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm"
                >
                  <div className="text-[#FF5271] font-black text-lg mb-1">
                    ✓
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-[#003B5C]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          3. OUR APPROACH
      ===================================================== */}

      <section
        id="approach"
        className="py-20 lg:py-24 px-5 sm:px-8 bg-slate-100/70 border-y border-slate-200"
      >
        <div className="max-w-7xl mx-auto">

          <SectionHeading
            eyebrow="OUR APPROACH"
            title="Every Child Deserves a Personalized Path to Progress"
            description="Our approach focuses on understanding the child first, then building practical and individualized support around their developmental goals."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {[
              {
                num: "01",
                title: "Understand",
                desc: "We begin by understanding each child's strengths, needs, interests and challenges.",
              },
              {
                num: "02",
                title: "Assess",
                desc: "Our specialists assess development, communication, behavior and learning needs.",
              },
              {
                num: "03",
                title: "Personalize",
                desc: "We develop individualized therapy and learning plans based on each child's goals.",
              },
              {
                num: "04",
                title: "Empower",
                desc: "We work with children and families to build confidence, independence and meaningful progress.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -7 }}
                className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#00A8CD]/10 text-[#00A8CD] flex items-center justify-center font-black text-xl mb-6 group">
                  {step.num}
                </div>

                <h3 className="text-xl font-bold text-[#003B5C] mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 leading-6">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          4. MISSION / VISION / VALUES
      ===================================================== */}

      <section className="py-20 lg:py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">

          <SectionHeading
            eyebrow="WHAT GUIDES US"
            title="Our Mission, Vision & Values"
            description="Everything we do is centered around respectful care, meaningful development and stronger partnerships with families."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

            {/* Mission */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-gradient-to-br from-[#003B5C] to-[#005F60] text-white shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#F5A623] mb-6">
                ♥
              </div>

              <h3 className="font-serif text-2xl font-extrabold mb-4">
                OUR MISSION
              </h3>

              <p className="text-sm text-slate-100 leading-7">
                To provide compassionate, evidence-informed and personalized
                support that helps children communicate, learn, grow and
                participate confidently in everyday life.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="p-8 rounded-3xl bg-[#003B5C] text-white shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#FF5271] mb-6">
                ◉
              </div>

              <h3 className="font-serif text-2xl font-extrabold mb-4">
                OUR VISION
              </h3>

              <p className="text-sm text-slate-200 leading-7">
                To build a world where every child is understood, included
                and given the opportunity to develop their abilities and reach
                their fullest potential.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F5A623]/15 flex items-center justify-center text-[#F5A623] mb-6">
                ★
              </div>

              <h3 className="font-serif text-2xl font-extrabold text-[#003B5C] mb-5">
                OUR VALUES
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {[
                  "Compassion",
                  "Respect",
                  "Collaboration",
                  "Excellence",
                ].map((value, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#FF5271]" />

                    <span className="text-xs font-bold text-[#003B5C]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          5. WHY CHOOSE ABC
      ===================================================== */}

      <section className="py-20 lg:py-24 px-5 sm:px-8 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">

          <SectionHeading
            eyebrow="THE ABC DIFFERENCE"
            title="Why Families Choose ABC Center"
            description="We focus on coordinated care, personalized planning and meaningful involvement of families throughout the child's journey."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Qualified Professionals",
                desc: "A multidisciplinary team with professional expertise across different areas of child development.",
              },
              {
                title: "Individualized Plans",
                desc: "Personalized intervention and learning plans designed around each child's specific goals.",
              },
              {
                title: "Child-Centered Environment",
                desc: "A welcoming environment designed to support comfort, participation and focused learning.",
              },
              {
                title: "Family Involvement",
                desc: "Parents and caregivers receive guidance and practical support throughout the care journey.",
              },
              {
                title: "Multidisciplinary Support",
                desc: "Multiple therapy and developmental services available through one coordinated center.",
              },
              {
                title: "Progress-Focused Care",
                desc: "Ongoing observation and communication help families understand development and progress.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -6 }}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00A8CD]/10 text-[#00A8CD] flex items-center justify-center font-black flex-shrink-0">
                    ✓
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-[#003B5C] mb-2">
                      {feature.title}
                    </h4>

                    <p className="text-sm text-slate-600 leading-6">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          6. SERVICES HIGHLIGHT
      ===================================================== */}

      <section className="py-20 lg:py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#003B5C] to-[#005F60] text-white p-8 sm:p-12 lg:p-16 text-center shadow-2xl"
          >

            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#F5A623]/10 blur-3xl" />

            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#FF5271]/10 blur-3xl" />

            <div className="relative z-10">

              <span className="inline-block bg-white/10 border border-white/10 text-[#F5A623] px-4 py-2 rounded-full text-[10px] sm:text-xs font-extrabold tracking-[0.18em] uppercase">
                OUR SPECIALIZED SERVICES
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold max-w-3xl mx-auto mt-6 leading-tight">
                Comprehensive Support Tailored to Your Child
              </h2>

              <p className="max-w-2xl mx-auto mt-5 text-sm sm:text-base text-slate-200 leading-7">
                From Speech Therapy and ABA Therapy to Occupational Therapy,
                Physiotherapy, Early Childhood Education and other specialized
                services, our programs are designed around individual needs.
              </p>

              <Link
                to="/services"
                className="inline-block mt-8 bg-[#FF5271] hover:bg-[#e04360] text-white font-bold px-9 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                Explore All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          7. HOW WE SUPPORT YOUR CHILD
      ===================================================== */}

      <section className="py-20 lg:py-24 px-5 sm:px-8 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">

          <SectionHeading
            eyebrow="STEP BY STEP"
            title="How We Support Your Child"
            description="We follow a structured process that helps families understand their child's needs and identify appropriate areas of support."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {[
              {
                num: "01",
                title: "Initial Consultation",
                desc: "We listen to parents' concerns, discuss developmental history and understand the child's current needs.",
              },
              {
                num: "02",
                title: "Comprehensive Assessment",
                desc: "Relevant developmental, communication, behavioral or functional areas are carefully assessed by specialists.",
              },
              {
                num: "03",
                title: "Personalized Plan",
                desc: "A structured plan is developed according to the child's individual goals, strengths and areas requiring support.",
              },
              {
                num: "04",
                title: "Therapy & Learning",
                desc: "The child receives structured intervention and learning support while progress is monitored over time.",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -5 }}
                className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#003B5C] text-[#F5A623] font-black text-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    {process.num}
                  </div>

                  <div>
                    <h4 className="font-bold text-lg text-[#003B5C] mb-2">
                      {process.title}
                    </h4>

                    <p className="text-sm text-slate-600 leading-6">
                      {process.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          8. STATS
      ===================================================== */}

      <section className="py-16 sm:py-20 px-5 sm:px-8 bg-[#003B5C] text-white">
        <div className="max-w-7xl mx-auto">

          <SectionHeading
            eyebrow="OUR IMPACT"
            title="Making a Meaningful Difference"
            light
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="text-center"
              >
                <h3 className="text-4xl sm:text-5xl font-black text-white">
                  <StatCounter
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-300 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          9. OUR TEAM
      ===================================================== */}

      <section className="py-20 lg:py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">

          <SectionHeading
            eyebrow="OUR EXPERT TEAM"
            title="Meet the Specialists Behind Your Child's Care"
            description="Our team brings together professionals from different disciplines to provide focused and coordinated support."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {teamMembersData.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="h-64 overflow-hidden relative bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#003B5C]/30 to-transparent pointer-events-none" />
                </div>

                <div className="p-5 text-center">
                  <h4 className="font-bold text-base text-[#003B5C]">
                    {member.name}
                  </h4>

                  <p className="mt-1 text-[#00A8CD] text-xs font-semibold leading-5">
                    {member.role}
                  </p>

                  <p className="mt-1 text-slate-500 text-[11px] leading-5">
                    {member.degree}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/team"
              className="inline-block bg-[#003B5C] hover:bg-[#002840] text-white font-bold px-8 py-3.5 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              More Team Members
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          10. APPOINTMENT FORM
      ===================================================== */}

      <section
        id="appointment"
        className="py-20 lg:py-24 px-5 sm:px-8 bg-slate-100/70 border-t border-slate-200"
      >
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white p-6 sm:p-10 lg:p-12 rounded-[32px] shadow-xl border border-slate-200">

            {/* Contact Information */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <span className="text-[#FF5271] font-extrabold text-xs uppercase tracking-[0.18em]">
                GET IN TOUCH
              </span>

              <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-extrabold text-[#003B5C] leading-tight">
                Let's Talk About Your Child's Journey
              </h2>

              <p className="mt-5 text-sm text-slate-600 leading-7">
                We are here to support you every step of the way. Contact us
                to discuss your child's needs, schedule an assessment or learn
                more about our services.
              </p>

              <div className="mt-8 space-y-5">

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00A8CD]/10 text-[#00A8CD] flex items-center justify-center flex-shrink-0">
                    📞
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">
                      Phone
                    </p>

                    <a
                      href="tel:+923238864026"
                      className="text-sm font-bold text-[#003B5C] hover:text-[#00A8CD] transition"
                    >
                      +92 323 8864026
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF5271]/10 text-[#FF5271] flex items-center justify-center flex-shrink-0">
                    ✉
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">
                      Email
                    </p>

                    <a
                      href="mailto:abcautismbehaviouralcenter@gmail.com"
                      className="text-sm font-bold text-[#003B5C] hover:text-[#00A8CD] transition break-all"
                    >
                      abcautismbehaviouralcenter@gmail.com
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-7 bg-slate-50 p-5 sm:p-7 lg:p-8 rounded-2xl border border-slate-200"
            >
              <form
                onSubmit={handleFormSubmit}
                className="space-y-4"
              >

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <input
                    type="text"
                    placeholder="Full Name *"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A8CD]/20 focus:border-[#00A8CD] transition"
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A8CD]/20 focus:border-[#00A8CD] transition"
                  />

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A8CD]/20 focus:border-[#00A8CD] transition"
                  />

                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service: e.target.value,
                      })
                    }
                    className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#00A8CD]/20 focus:border-[#00A8CD] transition"
                  >
                    <option value="">
                      Select Service
                    </option>

                    <option value="speech">
                      Speech Therapy
                    </option>

                    <option value="aba">
                      ABA Therapy
                    </option>

                    <option value="occupational">
                      Occupational Therapy
                    </option>

                    <option value="physiotherapy">
                      Physiotherapy
                    </option>

                    <option value="assessment">
                      Diagnostic Assessment
                    </option>

                    <option value="montessori">
                      Montessori
                    </option>

                    <option value="early-childhood">
                      Early Childhood Education
                    </option>
                  </select>

                </div>

                <textarea
                  rows="5"
                  placeholder="Message / Details about your child"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#00A8CD]/20 focus:border-[#00A8CD] transition"
                />

                <button
                  type="submit"
                  className="w-full bg-[#FF5271] hover:bg-[#e04360] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#FF5271]/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Book an Appointment
                </button>

              </form>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default AboutUs;