import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  Users,
  Brain,
  Activity,
  CalendarCheck,
  Phone,
  CheckCircle2,
  Star,
  Award,
  Utensils,
  ChevronDown,
  Stethoscope,
  Clock,
  MapPin,
  Mail,
  Zap,
  Globe,
  Compass
} from "lucide-react";

// Local Images Import
import nutritionImg from "../assets/Nutrition.jpg";
import occupationImg from "../assets/Occupation.jpg";

/* =========================================================
    ANIMATION SYSTEM
========================================================= */
const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -45 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const viewport = { once: true, amount: 0.12 };

/* =========================================================
    REUSABLE SECTION HEADER
========================================================= */
const SectionHeader = ({ eyebrow, title, description }) => {
  return (
    <motion.div
      className="nutri-section-header"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <span className="nutri-eyebrow">
        <Sparkles size={14} />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </motion.div>
  );
};

/* =========================================================
    1. HERO SECTION
========================================================= */
const HeroSection = () => {
  return (
    <section className="nutri-hero">
      <div className="nutri-hero-glow-1" />
      <div className="nutri-hero-glow-2" />
      <div className="nutri-grid-pattern" />

      <div className="nutri-container nutri-hero-layout">
        <motion.div
          className="nutri-hero-text"
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="nutri-pill-badge"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Sparkles size={14} className="nutri-pulse-icon" />
            <span>EXPERT NUTRITION & DIETETICS CARE</span>
          </motion.div>

          <h1>
            Nourish Your Body. <br />
            <span className="nutri-gradient-text">Transform Your Health.</span>
          </h1>

          <p>
            Personalized Nutrition & Dietetics Care for a Healthier You. We empower you to cultivate sustainable eating habits and optimize your holistic clinical well-being.
          </p>

          <div className="nutri-hero-btns">
            <Link to="/book-a-free-consult" className="nutri-btn nutri-btn-primary">
              <CalendarCheck size={18} />
              <span>Book a Consultation</span>
              <ArrowRight size={16} />
            </Link>

            <a href="#services" className="nutri-btn nutri-btn-outline">
              <span>Explore Our Services</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="nutri-hero-visual"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          <div className="nutri-hero-img-frame">
            <img
              src={nutritionImg}
              alt="Clinical Nutrition and Dietetics"
              loading="lazy"
            />
            <div className="nutri-img-overlay" />
          </div>

          <motion.div
            className="nutri-float-card card-top"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <div className="nutri-float-icon">
              <Utensils size={18} />
            </div>
            <div>
              <strong>Therapeutic Diets</strong>
              <span>Tailored Meal Plans</span>
            </div>
          </motion.div>

          <motion.div
            className="nutri-float-card card-bottom"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          >
            <div className="nutri-float-icon gold">
              <Heart size={18} />
            </div>
            <div>
              <strong>Holistic Care</strong>
              <span>100% Evidence-Based</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    2. PROFESSIONAL PROFILE SECTION (MS. MOMNA)
========================================================= */
const AboutSection = () => {
  const qualifications = [
    { title: "MPhil Food Science", source: "University of Engineering and Technology (UET)" },
    { title: "Doctor of Nutrition & Dietetics (DND)", source: "University of Veterinary and Animal Sciences (UVAS)" },
    { title: "Clinical Dietetics Specialist", source: "Professional experience in clinical nutrition (Sir Ganga Ram Hospital, Lahore)" },
    { title: "Therapeutic & Lifestyle Nutrition", source: "Specialized in metabolic health & behavioral nutrition" },
  ];

  return (
    <section className="nutri-section nutri-about-section" id="about">
      <div className="nutri-container">
        <div className="nutri-about-grid">
          <motion.div
            className="nutri-about-media"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="nutri-profile-frame">
              <img src={occupationImg} alt="Ms. Momna - Consultant Nutritionist & Dietitian" />
              <div className="nutri-profile-badge">
                <Award size={24} />
                <div>
                  <strong>Ms. Momna</strong>
                  <span>Consultant Nutritionist & Dietitian</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="nutri-about-text"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <span className="nutri-eyebrow">
              <Sparkles size={14} /> CONSULTANT PROFILE
            </span>
            <h2>Meet Consultant Nutritionist Ms. Momna</h2>
            <p className="nutri-lead">
              Dedicated to translating complex nutritional science into practical, enjoyable, and life-changing daily habits.
            </p>
            <p className="nutri-subtext">
              With professional experience at premier clinical institutions including Sir Ganga Ram Hospital, Lahore, Ms. Momna combines therapeutic dietetics with behavioral coaching to address root causes rather than temporary symptoms.
            </p>

            <div className="nutri-qualifications-grid">
              {qualifications.map((q, idx) => (
                <div key={idx} className="nutri-qual-card">
                  <CheckCircle2 size={18} className="nutri-check-icon" />
                  <div>
                    <h4>{q.title}</h4>
                    <p>{q.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
    3. SERVICES SECTION
========================================================= */
const ServicesSection = () => {
  const services = [
    {
      title: "Clinical Nutrition & Dietetics",
      desc: "Comprehensive dietary evaluations and clinical meal design for underlying medical condition management.",
      icon: Stethoscope,
    },
    {
      title: "Therapeutic Nutrition",
      desc: "Targeted medical nutrition therapy for diabetes, hypertension, PCOS, and gut health.",
      icon: Heart,
    },
    {
      title: "Behavioral Nutrition",
      desc: "Mindful eating strategies and psychological frameworks to heal your relationship with food.",
      icon: Brain,
    },
    {
      title: "Physiotherapy",
      desc: "Coordinated nutrition and movement strategies to accelerate muscle recovery and body mechanics.",
      icon: Activity,
    },
    {
      title: "Supplement Guidance",
      desc: "Evidence-based micronutrient, vitamin, and supplement protocols tailored to your blood work.",
      icon: Zap,
    },
    {
      title: "Online Consultation",
      desc: "Virtual appointments and continuous digital guidance from the comfort of your home.",
      icon: Globe,
    },
  ];

  return (
    <section className="nutri-section nutri-services-section" id="services">
      <div className="nutri-container">
        <SectionHeader
          eyebrow="Core Offerings"
          title="Clinical & Wellness Services"
          description="Tailored nutritional interventions grounded in medical research and individualized care."
        />

        <motion.div
          className="nutri-services-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={i}
                className="nutri-service-card"
                variants={fadeUp}
                whileHover={{ y: -8 }}
              >
                <div className="nutri-svc-icon-wrap">
                  <Icon size={24} />
                </div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <Link to="/book-a-free-consult" className="nutri-svc-link">
                  <span>Learn More</span>
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    4. INTEGRATED CARE SECTION
========================================================= */
const IntegratedCareSection = () => {
  return (
    <section className="nutri-section nutri-integrated-section" id="integrated">
      <div className="nutri-container">
        <div className="nutri-integrated-box">
          <motion.div
            className="nutri-integrated-content"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <span className="nutri-eyebrow light">
              <ShieldCheck size={14} /> MULTIDISCIPLINARY SYNERGY
            </span>
            <h2>Integrated Healthcare Approach</h2>
            <p>
              Our clinical nutrition programs integrate seamlessly with primary medical care, physical therapy, and behavioral guidance to deliver holistic recovery plans.
            </p>
            <ul className="nutri-integrated-list">
              <li><CheckCircle2 size={16} /> Coordinated therapy with primary care providers</li>
              <li><CheckCircle2 size={16} /> Routine progress & lab marker monitoring</li>
              <li><CheckCircle2 size={16} /> Alignment with physical therapy and rehabilitation</li>
            </ul>
          </motion.div>

          <motion.div
            className="nutri-integrated-card"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="nutri-card-inner">
              <Compass size={40} className="nutri-gold-icon" />
              <h3>Integrated Health Circle</h3>
              <p>Clinical Nutrition • Behavior • Movement • Medical Care</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
    5. CARE PLANS SECTION
========================================================= */
const CarePlansSection = () => {
  const plans = [
    {
      name: "Disease Care Plan",
      badge: "Standard Therapeutic",
      desc: "Designed for single health condition management and targeted dietary correction.",
      features: [
        "Comprehensive Nutritional Assessment",
        "Customized Therapeutic Meal Plan",
        "Regular Progress Monitoring",
        "Lifestyle & Habit Guidance",
        "Direct Support & Queries"
      ],
      highlight: false
    },
    {
      name: "Disease + Complication Care Plan",
      badge: "Advanced Multidisciplinary",
      desc: "Comprehensive medical nutrition therapy for complex or multi-condition health management.",
      features: [
        "In-depth Health & Report Analysis",
        "Multi-Condition Integrated Meal Design",
        "Priority Monitoring & Adjustments",
        "Movement & Physiotherapy Alignment",
        "Comprehensive Family Support"
      ],
      highlight: true
    }
  ];

  return (
    <section className="nutri-section nutri-plans-section" id="plans">
      <div className="nutri-container">
        <SectionHeader
          eyebrow="Targeted Interventions"
          title="Structured Care Plans"
          description="Select a specialized care plan designed for your individual health requirements."
        />

        <div className="nutri-plans-grid">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              className={`nutri-plan-card ${plan.highlight ? "highlighted" : ""}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              whileHover={{ y: -6 }}
            >
              {plan.highlight && <div className="nutri-popular-tag">Recommended</div>}
              <span className="nutri-plan-badge">{plan.badge}</span>
              <h3>{plan.name}</h3>
              <p className="nutri-plan-desc">{plan.desc}</p>
              
              <div className="nutri-plan-divider" />

              <ul className="nutri-plan-features">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx}>
                    <CheckCircle2 size={16} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link to="/book-a-free-consult" className={`nutri-btn ${plan.highlight ? "nutri-btn-primary" : "nutri-btn-outline-dark"}`}>
                <span>Book Consultation</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
    6. HOW IT WORKS (SIX-STEP TIMELINE)
========================================================= */
const HowItWorksSection = () => {
  const steps = [
    { num: "01", title: "Assessment", desc: "Evaluation of medical history, lifestyle routines, dietary habits, and individual goals." },
    { num: "02", title: "Personalized Plan", desc: "Designing a customized nutrition and lifestyle plan tailored to your health." },
    { num: "03", title: "Behavioral Support", desc: "Mindset coaching and strategies for sustainable habit formation." },
    { num: "04", title: "Movement & Physiotherapy", desc: "Aligning physical movement with nutritional energy needs." },
    { num: "05", title: "Monitor", desc: "Regular reviews and adjustments based on ongoing health progress." },
    { num: "06", title: "Sustain", desc: "Empowering long-term independence for lifelong wellness." },
  ];

  return (
    <section className="nutri-section nutri-how-section" id="how-it-works">
      <div className="nutri-container">
        <SectionHeader
          eyebrow="Structured Pathway"
          title="How It Works"
          description="A clear, interactive 6-step journey towards sustainable health improvement."
        />

        <div className="nutri-timeline-grid">
          {steps.map((st, idx) => (
            <motion.div
              key={idx}
              className="nutri-timeline-item"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="nutri-timeline-num">{st.num}</div>
              <h3>{st.title}</h3>
              <p>{st.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
    7. FAQ SECTION
========================================================= */
const FaqSection = () => {
  const faqs = [
    { q: "What should I expect during my first consultation?", a: "Your initial consultation involves an in-depth assessment of medical history, eating routines, lifestyle preferences, and setting individual health goals." },
    { q: "Are meal plans customized for specific medical conditions?", a: "Yes. All nutrition plans are tailored according to underlying health conditions such as diabetes, hypertension, PCOS, digestive issues, and metabolic health." },
    { q: "How do online consultations work?", a: "Online consultations take place through secure video calls. Meal charts, guidelines, and monitoring materials are delivered digitally." },
    { q: "Are recent blood tests required?", a: "Having recent medical reports helps in tailoring an accurate plan. Recommendations for specific blood tests can also be provided during your consult if necessary." }
  ];

  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="nutri-section nutri-faq-section" id="faq">
      <div className="nutri-container">
        <SectionHeader
          eyebrow="Common Inquiries"
          title="Frequently Asked Questions"
          description="Find answers to common questions regarding clinical consultations and nutrition plans."
        />

        <div className="nutri-faq-list">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={i}
                className={`nutri-faq-item ${isOpen ? "open" : ""}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                <button
                  className="nutri-faq-question"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`nutri-faq-arrow ${isOpen ? "rotate" : ""}`} size={20} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="nutri-faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
    8. CONTACT SECTION
========================================================= */
const ContactCtaSection = () => {
  return (
    <section className="nutri-section nutri-contact-section" id="contact">
      <div className="nutri-container">
        <div className="nutri-contact-card">
          <motion.div
            className="nutri-contact-info"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <span className="nutri-eyebrow light">GET IN TOUCH</span>
            <h2>Start Your Health Journey Today</h2>
            <p>Schedule a personalized consultation with Ms. Momna and take a proactive step towards long-term wellness.</p>

            <div className="nutri-contact-details">
              <div className="nutri-contact-item">
                <MapPin size={20} />
                <span>Sir Ganga Ram Hospital / Private Consultation, Lahore</span>
              </div>
              <div className="nutri-contact-item">
                <Clock size={20} />
                <span>Clinic Timings: By Appointment</span>
              </div>
              <div className="nutri-contact-item">
                <Phone size={20} />
                <span>Phone/WhatsApp: Available upon booking</span>
              </div>
              <div className="nutri-contact-item">
                <Mail size={20} />
                <span>Email: contact@nutritioncare.com</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="nutri-contact-action"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="nutri-action-box">
              <CalendarCheck size={42} className="nutri-gold-icon" />
              <h3>Book Your Appointment</h3>
              <p>In-person and Online Consultations available.</p>
              <Link to="/book-a-free-consult" className="nutri-btn nutri-btn-primary full-width">
                <span>Book Consultation</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
    MAIN COMPONENT WITH EMBEDDED CSS STYLES
========================================================= */
export default function NutritionDieteticsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .nutri-page {
          --emerald: #176B55;
          --sage: #A8C3A0;
          --gold: #D6A85F;
          --cream: #FAF9F4;
          --light-bg: #F0F5EF;
          --dark-text: #24352F;
          --white: #FFFFFF;
          --border: rgba(23, 107, 85, 0.12);

          font-family: 'Plus Jakarta Sans', sans-serif;
          color: var(--dark-text);
          background-color: var(--cream);
          overflow-x: hidden;
          line-height: 1.7;
        }

        .nutri-page *, .nutri-page *::before, .nutri-page *::after {
          box-sizing: border-box;
        }

        .nutri-container {
          width: min(1200px, calc(100% - 40px));
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .nutri-section {
          padding: 85px 0;
          position: relative;
        }

        /* SECTION HEADERS */
        .nutri-section-header {
          text-align: center;
          max-width: 750px;
          margin: 0 auto 50px;
        }

        .nutri-section-header h2 {
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 800;
          color: var(--emerald);
          margin: 10px 0;
          letter-spacing: -1px;
        }

        .nutri-section-header p {
          color: #536760;
          font-size: 15px;
        }

        .nutri-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--emerald);
        }

        .nutri-eyebrow.light {
          color: var(--gold);
        }

        /* BUTTONS */
        .nutri-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .nutri-btn-primary {
          background: linear-gradient(135deg, var(--emerald), #0e4839);
          color: var(--white);
          box-shadow: 0 10px 25px rgba(23, 107, 85, 0.25);
        }

        .nutri-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(23, 107, 85, 0.35);
        }

        .nutri-btn-outline {
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: var(--white);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .nutri-btn-outline:hover {
          background: var(--white);
          color: var(--emerald);
        }

        .nutri-btn-outline-dark {
          border: 1px solid var(--emerald);
          color: var(--emerald);
          background: transparent;
        }

        .nutri-btn-outline-dark:hover {
          background: var(--emerald);
          color: var(--white);
        }

        .nutri-btn.full-width {
          width: 100%;
        }

        /* 1. HERO SECTION */
        .nutri-hero {
          position: relative;
          background: linear-gradient(135deg, #0e382d 0%, var(--emerald) 100%);
          color: var(--white);
          padding: 80px 0 90px;
          overflow: hidden;
        }

        .nutri-hero-glow-1, .nutri-hero-glow-2 {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .nutri-hero-glow-1 {
          width: 350px;
          height: 350px;
          background: rgba(214, 168, 95, 0.15);
          top: -100px;
          right: -50px;
        }

        .nutri-hero-glow-2 {
          width: 300px;
          height: 300px;
          background: rgba(168, 195, 160, 0.15);
          bottom: -50px;
          left: -50px;
        }

        .nutri-grid-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .nutri-hero-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 50px;
          align-items: center;
        }

        .nutri-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          color: var(--gold);
        }

        .nutri-hero-text h1 {
          font-size: clamp(34px, 4.2vw, 52px);
          font-weight: 800;
          line-height: 1.15;
          margin: 18px 0;
          letter-spacing: -1.5px;
        }

        .nutri-gradient-text {
          background: linear-gradient(135deg, #f3e5c8 0%, var(--gold) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nutri-hero-text p {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 28px;
          max-width: 520px;
        }

        .nutri-hero-btns {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .nutri-hero-visual {
          position: relative;
        }

        .nutri-hero-img-frame {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.15);
        }

        .nutri-hero-img-frame img {
          width: 100%;
          height: 380px;
          object-fit: cover;
        }

        .nutri-float-card {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          color: var(--dark-text);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          z-index: 4;
        }

        .card-top { top: 20px; left: -20px; }
        .card-bottom { bottom: 20px; right: -20px; }

        .nutri-float-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--light-bg);
          color: var(--emerald);
          display: grid;
          place-items: center;
        }

        .nutri-float-icon.gold {
          color: var(--gold);
        }

        .nutri-float-card strong { display: block; font-size: 12px; font-weight: 800; }
        .nutri-float-card span { font-size: 10px; color: #666; }

        /* 2. ABOUT SECTION */
        .nutri-about-section { background: var(--white); }
        .nutri-about-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 60px;
          align-items: center;
        }

        .nutri-profile-frame {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(23, 107, 85, 0.1);
        }

        .nutri-profile-frame img {
          width: 100%;
          height: 420px;
          object-fit: cover;
        }

        .nutri-profile-badge {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.95);
          padding: 14px;
          border-radius: 16px;
          color: var(--emerald);
        }

        .nutri-profile-badge strong { display: block; font-size: 14px; color: var(--dark-text); }
        .nutri-profile-badge span { font-size: 11px; color: #666; }

        .nutri-about-text h2 {
          font-size: clamp(26px, 3.2vw, 36px);
          font-weight: 800;
          color: var(--emerald);
          margin: 10px 0 14px;
        }

        .nutri-lead { font-size: 15px; font-weight: 700; color: var(--dark-text); margin-bottom: 10px; }
        .nutri-subtext { font-size: 14px; color: #536760; margin-bottom: 24px; }

        .nutri-qualifications-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .nutri-qual-card {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 14px;
          background: var(--light-bg);
          border-radius: 14px;
          border: 1px solid var(--border);
        }

        .nutri-check-icon { color: var(--emerald); flex-shrink: 0; margin-top: 2px; }
        .nutri-qual-card h4 { font-size: 12px; font-weight: 800; margin: 0; color: var(--dark-text); }
        .nutri-qual-card p { font-size: 10px; color: #666; margin: 2px 0 0; }

        /* 3. SERVICES */
        .nutri-services-section { background: var(--cream); }
        .nutri-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .nutri-service-card {
          background: var(--white);
          padding: 28px;
          border-radius: 20px;
          border: 1px solid var(--border);
          box-shadow: 0 8px 20px rgba(0,0,0,0.02);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s ease;
        }

        .nutri-service-card:hover {
          box-shadow: 0 15px 30px rgba(23, 107, 85, 0.08);
          border-color: var(--sage);
        }

        .nutri-svc-icon-wrap {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: var(--light-bg);
          color: var(--emerald);
          display: grid;
          place-items: center;
          margin-bottom: 18px;
        }

        .nutri-service-card h3 { font-size: 16px; font-weight: 800; color: var(--emerald); margin-bottom: 8px; }
        .nutri-service-card p { font-size: 13px; color: #536760; margin-bottom: 20px; line-height: 1.6; }

        .nutri-svc-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 800;
          color: var(--emerald);
          text-decoration: none;
        }

        /* 4. INTEGRATED CARE */
        .nutri-integrated-section { background: var(--white); }
        .nutri-integrated-box {
          background: linear-gradient(135deg, var(--emerald), #0e382d);
          border-radius: 28px;
          padding: 50px;
          color: var(--white);
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          align-items: center;
        }

        .nutri-integrated-content h2 { font-size: 32px; font-weight: 800; margin: 10px 0 14px; }
        .nutri-integrated-content p { font-size: 14px; color: rgba(255,255,255,0.85); margin-bottom: 20px; }

        .nutri-integrated-list { list-style: none; padding: 0; margin: 0; }
        .nutri-integrated-list li { display: flex; align-items: center; gap: 10px; font-size: 13px; margin-bottom: 8px; }

        .nutri-integrated-card {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 30px;
          text-align: center;
        }

        .nutri-gold-icon { color: var(--gold); margin-bottom: 10px; }
        .nutri-integrated-card h3 { font-size: 18px; font-weight: 800; }
        .nutri-integrated-card p { font-size: 12px; color: rgba(255,255,255,0.7); margin: 0; }

        /* 5. CARE PLANS */
        .nutri-plans-section { background: var(--cream); }
        .nutri-plans-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
          max-width: 900px;
          margin: 0 auto;
        }

        .nutri-plan-card {
          background: var(--white);
          padding: 35px;
          border-radius: 24px;
          border: 1px solid var(--border);
          position: relative;
          box-shadow: 0 10px 25px rgba(0,0,0,0.02);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .nutri-plan-card.highlighted {
          border: 2px solid var(--emerald);
          box-shadow: 0 15px 35px rgba(23, 107, 85, 0.1);
        }

        .nutri-popular-tag {
          position: absolute;
          top: -12px;
          right: 24px;
          background: var(--gold);
          color: var(--white);
          font-size: 10px;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .nutri-plan-badge { font-size: 11px; font-weight: 800; color: var(--emerald); text-transform: uppercase; }
        .nutri-plan-card h3 { font-size: 20px; font-weight: 800; color: var(--dark-text); margin: 6px 0 10px; }
        .nutri-plan-desc { font-size: 13px; color: #536760; margin-bottom: 20px; }

        .nutri-plan-divider { height: 1px; background: var(--border); margin-bottom: 20px; }

        .nutri-plan-features { list-style: none; padding: 0; margin: 0 0 25px; }
        .nutri-plan-features li { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--dark-text); margin-bottom: 10px; }
        .nutri-plan-features svg { color: var(--emerald); flex-shrink: 0; }

        /* 6. HOW IT WORKS */
        .nutri-how-section { background: var(--white); }
        .nutri-timeline-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .nutri-timeline-item {
          background: var(--light-bg);
          padding: 24px;
          border-radius: 18px;
          border: 1px solid var(--border);
        }

        .nutri-timeline-num {
          font-size: 12px;
          font-weight: 800;
          color: var(--gold);
          background: var(--white);
          padding: 4px 10px;
          border-radius: 8px;
          display: inline-block;
          margin-bottom: 12px;
        }

        .nutri-timeline-item h3 { font-size: 15px; font-weight: 800; color: var(--emerald); margin-bottom: 6px; }
        .nutri-timeline-item p { font-size: 12px; color: #536760; margin: 0; }

        /* 7. FAQ */
        .nutri-faq-section { background: var(--cream); }
        .nutri-faq-list { max-width: 750px; margin: 0 auto; }

        .nutri-faq-item {
          background: var(--white);
          border-radius: 14px;
          border: 1px solid var(--border);
          margin-bottom: 12px;
          overflow: hidden;
        }

        .nutri-faq-question {
          width: 100%;
          padding: 18px 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: transparent;
          border: none;
          font-size: 14px;
          font-weight: 800;
          color: var(--dark-text);
          text-align: left;
          cursor: pointer;
        }

        .nutri-faq-arrow { transition: transform 0.3s ease; color: var(--emerald); }
        .nutri-faq-arrow.rotate { transform: rotate(180deg); }

        .nutri-faq-answer {
          padding: 0 22px 18px;
          font-size: 13px;
          color: #536760;
        }

        /* 8. CONTACT CTA */
        .nutri-contact-section { background: var(--white); }
        .nutri-contact-card {
          background: linear-gradient(135deg, var(--emerald), #0e382d);
          border-radius: 28px;
          padding: 50px;
          color: var(--white);
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
        }

        .nutri-contact-info h2 { font-size: 32px; font-weight: 800; margin: 10px 0 14px; }
        .nutri-contact-info p { font-size: 14px; color: rgba(255,255,255,0.85); margin-bottom: 24px; }

        .nutri-contact-details { display: flex; flex-direction: column; gap: 12px; }
        .nutri-contact-item { display: flex; align-items: center; gap: 12px; font-size: 13px; color: rgba(255,255,255,0.9); }

        .nutri-action-box {
          background: var(--white);
          color: var(--dark-text);
          padding: 30px;
          border-radius: 20px;
          text-align: center;
        }

        .nutri-action-box h3 { font-size: 18px; font-weight: 800; color: var(--emerald); margin: 10px 0 4px; }
        .nutri-action-box p { font-size: 12px; color: #666; margin-bottom: 20px; }

        /* RESPONSIVE DESIGN */
        @media (max-width: 992px) {
          .nutri-hero-layout, .nutri-about-grid, .nutri-integrated-box, .nutri-contact-card {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .nutri-services-grid, .nutri-timeline-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .nutri-plans-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .nutri-services-grid, .nutri-timeline-grid, .nutri-qualifications-grid {
            grid-template-columns: 1fr;
          }

          .nutri-hero-btns {
            flex-direction: column;
          }

          .nutri-btn {
            width: 100%;
          }

          .nutri-float-card {
            display: none;
          }
        }
      `}</style>

      <main className="nutri-page">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <IntegratedCareSection />
        <CarePlansSection />
        <HowItWorksSection />
        <FaqSection />
        <ContactCtaSection />
      </main>
    </>
  );
}