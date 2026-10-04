import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  Users,
  Brain,
  MessageCircle,
  Activity,
  CalendarCheck,
  Phone,
  CheckCircle2,
  Star,
  BookOpen,
  Smile,
  Compass,
  Award,
  Target,
  SmilePlus,
  Zap,
  Feather,
  HelpCircle,
  Utensils
} from "lucide-react";

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
    transition: { staggerChildren: 0.08 },
  },
};

const viewport = { once: true, amount: 0.12 };

/* =========================================================
    REUSABLE SECTION HEADER
========================================================= */

const SectionHeader = ({ eyebrow, title, description }) => {
  return (
    <motion.div
      className="ot-section-header"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <span className="ot-eyebrow">
        <Sparkles size={14} />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </motion.div>
  );
};

/* =========================================================
    1. COMPACT & ULTRA-ATTRACTIVE HERO SECTION
========================================================= */

const HeroSection = () => {
  return (
    <section className="ot-hero-modern">
      {/* Dynamic Background Glows & Shapes */}
      <div className="ot-hero-glow-accent ot-glow-cyan" />
      <div className="ot-hero-glow-accent ot-glow-coral" />
      <div className="ot-hero-grid-pattern" />

      <div className="ot-container ot-hero-layout">
        {/* Left Content Column */}
        <motion.div
          className="ot-hero-text-content"
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="ot-hero-pill-badge"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Sparkles size={15} className="ot-pulse-icon" />
            <span>ABC CENTER • PEDIATRIC CARE</span>
          </motion.div>

          <h1>
            Building Skills. <br />
            <span className="ot-gradient-text-teal">Supporting Independence.</span> <br />
            <span className="ot-gradient-text-coral">Empowering Every Child.</span>
          </h1>

          <p>
            Our Occupational Therapy program supports children in developing the skills they need to participate, learn, play, and become more independent in everyday life.
          </p>

          <div className="ot-hero-btn-group">
            <motion.a 
              href="#approach" 
              className="ot-btn ot-btn-glow-primary"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Explore Our Approach</span>
              <ArrowRight size={16} />
            </motion.a>

            <motion.a 
              href="/book-a-free-consult" 
              className="ot-btn ot-btn-frosted"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <CalendarCheck size={16} />
              <span>Book Assessment</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Right Visual Composition Column */}
        <motion.div
          className="ot-hero-visual-composition"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          <div className="ot-hero-main-photo-frame">
            <img
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1000&q=85"
              alt="Child engaged in occupational therapy"
              loading="lazy"
            />
            <div className="ot-photo-vignette" />
          </div>

          {/* Floating Interactive Glass Cards */}
          <motion.div 
            className="ot-hero-float-tag ot-tag-top-left"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <div className="ot-tag-icon-wrap cyan">
              <Activity size={16} />
            </div>
            <div>
              <strong>Fine Motor</strong>
              <span>Dexterity & Strength</span>
            </div>
          </motion.div>

          <motion.div 
            className="ot-hero-float-tag ot-tag-top-right"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          >
            <div className="ot-tag-icon-wrap coral">
              <Brain size={16} />
            </div>
            <div>
              <strong>Sensory Regulation</strong>
              <span>Processing & Balance</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    2. INTRODUCTION / WHAT IS OCCUPATIONAL THERAPY
========================================================= */

const IntroSection = () => {
  const skillCards = [
    { title: "Fine Motor Development", desc: "Building hand and finger strength for grasping and manipulation.", icon: Zap },
    { title: "Gross Motor Coordination", desc: "Enhancing balance, posture, and large muscle group control.", icon: Activity },
    { title: "Hand-Eye Coordination", desc: "Connecting visual information with precise motor actions.", icon: Target },
    { title: "Visual-Motor Skills", desc: "Translating visual perceptions into accurate physical movements.", icon: Sparkles },
    { title: "Pre-Writing & Handwriting", desc: "Developing foundational strokes, letter formation, and legibility.", icon: BookOpen },
    { title: "Self-Care Skills", desc: "Fostering autonomy in dressing, grooming, and hygiene routines.", icon: Smile },
    { title: "Feeding Functional Skills", desc: "Supporting comfortable mealtime participation and utensil handling.", icon: Utensils },
    { title: "Attention & Participation", desc: "Improving focus, task persistence, and classroom engagement.", icon: Brain },
    { title: "Play Skills", desc: "Promoting imaginative play, sharing, and peer collaboration.", icon: Users },
    { title: "School Readiness", desc: "Preparing children with executive function and classroom habits.", icon: Award },
    { title: "Sensory Processing", desc: "Helping children interpret and respond to environmental stimuli.", icon: Feather },
    { title: "Independence", desc: "Empowering children to accomplish daily tasks with confidence.", icon: Star },
  ];

  return (
    <section className="ot-section ot-intro-section" id="approach">
      <div className="ot-container">
        <div className="ot-intro-bento-hero">
          <motion.div 
            className="ot-intro-text-box"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <span className="ot-eyebrow">
              <Sparkles size={14} /> UNDERSTANDING OCCUPATIONAL THERAPY
            </span>
            <h2>What Is Occupational Therapy?</h2>
            <p className="ot-lead">
              Occupational therapy helps children develop skills required for everyday activities and meaningful participation at home, school, and in the community.
            </p>
            <p className="ot-subtext">
              Through structured guidance, play, and evidence-based interventions, our specialists enable children to overcome developmental hurdles and reach their full potential.
            </p>
          </motion.div>

          <motion.div 
            className="ot-intro-media-box"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="ot-media-card-inner">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=85"
                alt="Occupational therapy session with children"
                loading="lazy"
              />
              <div className="ot-media-floating-badge">
                <Award size={22} />
                <div>
                  <strong>REX Medical Center</strong>
                  <span>Pediatric Excellence</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="ot-bento-skills-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {skillCards.map((card, index) => {
            const IconComp = card.icon;
            return (
              <motion.div
                className="ot-modern-skill-card"
                key={index}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.015 }}
              >
                <div className="ot-modern-skill-top">
                  <div className="ot-modern-skill-icon">
                    <IconComp size={20} />
                  </div>
                  <span className="ot-skill-num">0{index + 1}</span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    3. SENSORY INTEGRATION — FEATURE SECTION
========================================================= */

const SensoryIntegrationSection = () => {
  const sensoryItems = [
    { title: "Touch", desc: "Processing tactile inputs from textures, temperatures, and physical contact safely.", icon: Feather },
    { title: "Movement & Balance", desc: "Understanding body position in space and gravitational security through vestibular input.", icon: Activity },
    { title: "Body Awareness", desc: "Proprioceptive feedback from muscles and joints for coordinated movement.", icon: Users },
    { title: "Visual Processing", desc: "Interpreting visual details, spatial orientation, and environmental tracking.", icon: Sparkles },
    { title: "Auditory Processing", desc: "Filtering sounds, responding to verbal cues, and tolerating ambient noise levels.", icon: MessageCircle },
    { title: "Oral Sensory Experiences", desc: "Managing different food textures, temperatures, and oral motor feedback.", icon: Utensils },
  ];

  return (
    <section className="ot-section ot-sensory-section">
      <div className="ot-container">
        <SectionHeader
          eyebrow="Sensory Integration"
          title="Sensory Integration"
          description="Helping Children Understand & Respond to Their World"
        />

        <div className="ot-sensory-orbit-container">
          <div className="ot-orbit-center-card">
            <div className="ot-orbit-pulse" />
            <Brain size={42} />
            <strong>Sensory Processing</strong>
            <span>Core Integration</span>
          </div>

          <div className="ot-sensory-cards-wrapper">
            {sensoryItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  className="ot-sensory-card"
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="ot-sensory-icon">
                    <IconComp size={22} />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
    4. WHO MAY BENEFIT?
========================================================= */

const WhoMayBenefitSection = () => {
  const benefits = [
    "Fine Motor Skills",
    "Handwriting",
    "Coordination",
    "Attention & Participation",
    "Self-Care",
    "Dressing & Grooming",
    "Feeding-Related Functional Skills",
    "Sensory Processing",
    "Play Skills",
    "School Readiness",
    "Motor Planning",
    "Daily Routines",
    "Functional Independence"
  ];

  return (
    <section className="ot-section ot-benefit-section">
      <div className="ot-container">
        <SectionHeader
          eyebrow="Targeted Support"
          title="Who May Benefit?"
          description="Support Designed Around Real-Life Needs"
        />

        <motion.div 
          className="ot-benefit-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {benefits.map((benefit, i) => (
            <motion.div
              className="ot-benefit-item"
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className="ot-benefit-dot">
                <CheckCircle2 size={18} />
              </div>
              <span>{benefit}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="ot-multidisciplinary-panel"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="ot-panel-icon">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h4>Comprehensive Multidisciplinary Care</h4>
            <p>
              Occupational therapy may be incorporated into multidisciplinary support for children with developmental delays, autism, learning difficulties, neurological conditions, or other developmental needs following appropriate professional assessment.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    5. FINE MOTOR & PRE-WRITING SECTION
========================================================= */

const FineMotorSection = () => {
  const fineMotorSkills = [
    "Hand Strength",
    "Finger Coordination",
    "Pencil Grasp",
    "Hand-Eye Coordination",
    "Bilateral Hand Use",
    "Cutting Skills",
    "Drawing",
    "Tracing",
    "Coloring",
    "Pre-Writing Patterns",
    "Handwriting Readiness"
  ];

  const stages = [
    { title: "GRIP", desc: "Finger and thumb foundation" },
    { title: "CONTROL", desc: "Pencil manipulation and pressure" },
    { title: "COORDINATION", desc: "Two-handed harmony" },
    { title: "PRE-WRITING", desc: "Shapes, strokes, and lines" },
    { title: "HANDWRITING", desc: "Fluent letter formation" },
  ];

  return (
    <section className="ot-section ot-finemotor-section">
      <div className="ot-container">
        <SectionHeader
          eyebrow="Little Hands, Big Skills"
          title="Fine Motor & Pre-Writing Skills"
          description="Targeted exercises and play activities designed to build precision, strength, and confidence in writing."
        />

        <motion.div 
          className="ot-fm-chips-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {fineMotorSkills.map((skill, idx) => (
            <motion.div
              className="ot-fm-chip"
              key={idx}
              variants={fadeUp}
              whileHover={{ scale: 1.05, y: -3 }}
            >
              <Zap size={16} />
              <span>{skill}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="ot-progress-roadmap">
          <h3>Progression Pathway</h3>
          <div className="ot-roadmap-steps">
            {stages.map((stage, sIdx) => (
              <motion.div
                className="ot-roadmap-step"
                key={sIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ delay: sIdx * 0.15 }}
              >
                <div className="ot-roadmap-badge">0{sIdx + 1}</div>
                <strong>{stage.title}</strong>
                <span>{stage.desc}</span>
                {sIdx < stages.length - 1 && <div className="ot-roadmap-connector" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
    6. PLAY & DEVELOPMENT
========================================================= */

const PlayDevelopmentSection = () => {
  const playCards = [
    { title: "Exploration", desc: "Discovering textures, objects, and spatial surroundings.", icon: Compass },
    { title: "Imagination", desc: "Fostering creative thinking and role-play scenarios.", icon: Sparkles },
    { title: "Problem-Solving", desc: "Navigating puzzles, obstacles, and cognitive challenges.", icon: Brain },
    { title: "Social Interaction", desc: "Engaging in cooperative play, sharing, and communication.", icon: Users },
    { title: "Motor Development", desc: "Building agility, endurance, and physical confidence.", icon: Activity },
    { title: "Communication", desc: "Expressing ideas, emotions, and needs through interactive play.", icon: MessageCircle },
    { title: "Attention", desc: "Sustaining focus during preferred and guided play tasks.", icon: Target },
    { title: "Independence", desc: "Making choices and leading activities with self-assurance.", icon: SmilePlus },
  ];

  return (
    <section className="ot-section ot-play-section">
      <div className="ot-container">
        <SectionHeader
          eyebrow="Learning Through Play"
          title="Play & Development"
          description="Play provides children with natural opportunities to learn, grow, and interact."
        />

        <div className="ot-play-statement-box">
          <Smile size={32} />
          <h3>“Play is an important occupation of childhood.”</h3>
        </div>

        <motion.div 
          className="ot-play-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {playCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                className="ot-play-card"
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className="ot-play-icon">
                  <Icon size={22} />
                </div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    7. FEEDING & ORAL-MOTOR SUPPORT
========================================================= */

const FeedingSection = () => {
  return (
    <section className="ot-section ot-feeding-section">
      <div className="ot-container ot-two-column">
        <motion.div
          className="ot-feeding-content"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <span className="ot-eyebrow">
            <Utensils size={14} /> CLINICAL SUPPORT
          </span>
          <h2>Feeding & Oral-Motor Support</h2>
          <p className="ot-lead">
            Occupational therapy may contribute to functional feeding skills, postural positioning, self-feeding mechanics, and sensory aspects of eating where appropriate and within professional scope.
          </p>
          <p className="ot-subtext">
            We collaborate closely with families to ensure mealtime is a comfortable, stress-free, and nourishing experience for every child.
          </p>
        </motion.div>

        <motion.div
          className="ot-feeding-alert-card"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="ot-alert-icon">
            <HelpCircle size={28} />
          </div>
          <h3>Important Clinical Notice</h3>
          <p>
            Children with swallowing difficulties, feeding safety concerns, or suspected dysphagia should be assessed and managed by an appropriately qualified <strong>Speech & Language Pathologist</strong> / feeding and swallowing professional, with dietitian support where needed.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    8. FAMILY-CENTERED THERAPY
========================================================= */

const FamilyTherapySection = () => {
  const familyCards = [
    { title: "Home Activities", desc: "Practical exercises tailored for home environments." },
    { title: "Sensory Support Strategies", desc: "Managing sensory overload in daily settings." },
    { title: "Fine Motor Activities", desc: "Fun games using everyday household items." },
    { title: "Self-Care Practice", desc: "Steps toward dressing and hygiene autonomy." },
    { title: "Play Ideas", desc: "Engaging games that build developmental milestones." },
    { title: "Routine Development", desc: "Establishing predictable, calm daily schedules." },
    { title: "Supporting Independence", desc: "Encouraging self-reliance in age-appropriate tasks." },
  ];

  return (
    <section className="ot-section ot-family-section">
      <div className="ot-container">
        <SectionHeader
          eyebrow="Family Partnership"
          title="Therapy Doesn't Stop When the Session Ends"
          description="Parents and caregivers are an essential part of every child's developmental journey."
        />

        <motion.div 
          className="ot-family-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {familyCards.map((item, idx) => (
            <motion.div
              className="ot-family-card"
              key={idx}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="ot-family-check">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="ot-family-quote-banner"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <Heart size={26} />
          <p>Parents and caregivers are an important part of a child's developmental journey.</p>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    9. MULTIDISCIPLINARY CHILD DEVELOPMENT
========================================================= */

const MultidisciplinarySection = () => {
  const teamServices = [
    { title: "Special Education", icon: BookOpen },
    { title: "Speech & Language Pathology", icon: MessageCircle },
    { title: "Physiotherapy", icon: Activity },
    { title: "Nutrition & Dietetics", icon: Utensils },
    { title: "Psychology", icon: Brain },
    { title: "Parents & Family", icon: Users },
  ];

  return (
    <section className="ot-section ot-multidisciplinary-section">
      <div className="ot-container">
        <SectionHeader
          eyebrow="Collaborative Care"
          title="One Child. One Team. A Coordinated Approach."
          description="Our specialists work hand-in-hand to provide seamless, holistic care tailored to your child's needs."
        />

        <div className="ot-hub-container">
          <motion.div 
            className="ot-hub-center"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <Smile size={32} />
            <strong>The Child</strong>
            <span>Center of Care</span>
          </motion.div>

          <div className="ot-hub-services-grid">
            {teamServices.map((svc, i) => {
              const IconComp = svc.icon;
              return (
                <motion.div
                  className="ot-hub-service-card"
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  <div className="ot-hub-icon">
                    <IconComp size={22} />
                  </div>
                  <span>{svc.title}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
    10. OUR OCCUPATIONAL THERAPY JOURNEY
========================================================= */

const JourneySection = () => {
  const steps = [
    { num: "01", title: "Initial Assessment", desc: "Understand the child's developmental strengths, challenges, routines, and functional needs." },
    { num: "02", title: "Goal Setting", desc: "Develop individualized and meaningful goals together with parents/caregivers." },
    { num: "03", title: "Individualized Therapy", desc: "Provide structured, play-based occupational therapy and sensory-focused activities." },
    { num: "04", title: "Family Education", desc: "Provide practical strategies for supporting skills at home." },
    { num: "05", title: "Progress Monitoring", desc: "Track functional progress and participation." },
    { num: "06", title: "Review & Adaptation", desc: "Modify goals and intervention strategies according to the child's changing needs." },
  ];

  return (
    <section className="ot-section ot-journey-section">
      <div className="ot-container">
        <SectionHeader
          eyebrow="Step-by-Step Path"
          title="Our Occupational Therapy Journey"
          description="A clear, collaborative roadmap designed to guide your child toward independence and success."
        />

        <div className="ot-journey-grid">
          {steps.map((st, idx) => (
            <motion.div
              className="ot-journey-card"
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="ot-journey-number">{st.num}</div>
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
    11. INDIVIDUALIZED OCCUPATIONAL THERAPY
========================================================= */

const IndividualizedSection = () => {
  const chips = [
    "Age",
    "Developmental Level",
    "Functional Abilities",
    "Sensory Needs",
    "Learning Style",
    "Family Priorities",
    "School Requirements",
    "Individual Goals"
  ];

  return (
    <section className="ot-section ot-individualized-section">
      <div className="ot-container ot-two-column">
        <motion.div
          className="ot-ind-content"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <span className="ot-eyebrow">
            <Compass size={14} /> TAILORED INTERVENTION
          </span>
          <h2>Every Child Has Different Strengths.</h2>
          <p className="ot-lead">
            There is no single therapy approach that works identically for every child.
          </p>

          <div className="ot-ind-chips-wrap">
            {chips.map((chip, i) => (
              <span className="ot-ind-chip" key={i}>
                <CheckCircle2 size={14} />
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="ot-ind-quote-card"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <span className="ot-big-quote-mark">“</span>
          <p>
            The focus is not simply on completing exercises — it is on helping children participate more successfully in real-life activities.
          </p>
          <strong>ABC CENTER Therapy Team</strong>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    12. PREMIUM CTA SECTION
========================================================= */

const CtaSection = () => {
  return (
    <section className="ot-cta-section" id="contact">
      <div className="ot-cta-bg-glow" />
      <div className="ot-container">
        <motion.div
          className="ot-cta-inner"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="ot-cta-icon-wrap">
            <Heart size={32} />
          </div>
          <span className="ot-cta-eyebrow">LET'S GROW TOGETHER</span>
          <h2>Helping Children Build Skills for Everyday Life</h2>
          <p>Every child deserves support that understands their strengths, needs, and goals.</p>

          <div className="ot-cta-buttons">
            <motion.a 
              href="/book-a-free-consult" 
              className="ot-btn ot-btn-white"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <CalendarCheck size={18} />
              <span>Book an Assessment</span>
              <ArrowRight size={17} />
            </motion.a>
            <motion.a 
              href="/about/our-team" 
              className="ot-btn ot-btn-transparent"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone size={17} />
              <span>Contact Our Team</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    MAIN COMPONENT WITH EMBEDDED STYLES
========================================================= */

export default function OccupationalTherapyPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .ot-page {
          --navy: #003B5C;
          --teal: #00A8CD;
          --cyan: #E8F8FB;
          --coral: #FF5271;
          --yellow: #FFF4C7;
          --white: #FFFFFF;
          --bg-light: #F7FBFC;
          --text-dark: #183B4D;
          --border: rgba(0, 168, 205, 0.15);

          font-family: "Plus Jakarta Sans", sans-serif;
          color: var(--text-dark);
          background: var(--bg-light);
          overflow-x: hidden;
          line-height: 1.7;
        }

        .ot-page *, .ot-page *::before, .ot-page *::after {
          box-sizing: border-box;
        }

        .ot-page img {
          display: block;
          width: 100%;
        }

        .ot-page a {
          text-decoration: none;
        }

        .ot-container {
          width: min(1200px, calc(100% - 40px));
          margin: 0 auto;
          position: relative;
          z-index: 3;
        }

        .ot-section {
          position: relative;
          padding: 85px 0;
        }

        .ot-two-column {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 65px;
          align-items: center;
        }

        /* SECTION HEADER */
        .ot-section-header {
          max-width: 780px;
          margin: 0 auto 50px;
          text-align: center;
        }

        .ot-section-header h2 {
          margin: 10px 0 14px;
          font-size: clamp(28px, 3.5vw, 40px);
          line-height: 1.18;
          font-weight: 800;
          letter-spacing: -1.2px;
          color: var(--navy);
        }

        .ot-section-header p {
          margin: 0 auto;
          max-width: 700px;
          color: #556c78;
          font-size: 15px;
          line-height: 1.7;
        }

        .ot-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--teal);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .ot-eyebrow svg {
          color: var(--coral);
        }

        /* BUTTONS */
        .ot-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 48px;
          padding: 0 22px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 800;
          overflow: hidden;
          isolation: isolate;
          transition: transform .3s ease, box-shadow .3s ease, background .3s ease, border-color .3s ease, color .3s ease;
        }

        .ot-btn-glow-primary {
          color: white;
          background: linear-gradient(135deg, var(--teal), #007a99);
          box-shadow: 0 12px 25px rgba(0,168,205,0.3);
        }

        .ot-btn-glow-primary:hover {
          background: linear-gradient(135deg, var(--navy), var(--teal));
          box-shadow: 0 16px 35px rgba(0,59,92,0.35);
        }

        .ot-btn-frosted {
          color: var(--navy);
          border: 1px solid rgba(0,59,92,0.15);
          background: white;
          box-shadow: 0 8px 20px rgba(0,59,92,0.05);
        }

        .ot-btn-frosted:hover {
          background: var(--cyan);
          border-color: var(--teal);
        }

        .ot-btn-white {
          color: var(--teal);
          background: white;
          box-shadow: 0 12px 30px rgba(0,0,0,.15);
        }

        .ot-btn-transparent {
          color: white;
          border: 1px solid rgba(255,255,255,.4);
          background: rgba(255,255,255,.08);
          backdrop-filter: blur(10px);
        }

        /* =========================================================
           1. COMPACT & ULTRA-ATTRACTIVE HERO STYLES
        ========================================================= */
        .ot-hero-modern {
          position: relative;
          min-height: auto;
          padding: 70px 0 75px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: linear-gradient(135deg, #002235 0%, var(--navy) 50%, #004973 100%);
        }

        .ot-hero-glow-accent {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
          z-index: 1;
        }

        .ot-glow-cyan {
          width: 400px;
          height: 400px;
          background: rgba(0, 168, 205, 0.2);
          top: -120px;
          right: -80px;
        }

        .ot-glow-coral {
          width: 320px;
          height: 320px;
          background: rgba(255, 82, 113, 0.15);
          bottom: -80px;
          left: -80px;
        }

        .ot-hero-grid-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          z-index: 1;
        }

        .ot-hero-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.85fr);
          align-items: center;
          gap: 50px;
          z-index: 2;
        }

        .ot-hero-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          border: 1px solid rgba(0, 168, 205, 0.35);
          border-radius: 50px;
          color: #4cd5f5;
          background: rgba(0, 168, 205, 0.1);
          backdrop-filter: blur(10px);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .ot-pulse-icon {
          animation: pulseIcon 2s infinite ease-in-out;
        }

        @keyframes pulseIcon {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }

        .ot-hero-text-content h1 {
          margin: 16px 0 14px;
          color: white;
          font-size: clamp(32px, 4vw, 48px);
          line-height: 1.12;
          font-weight: 800;
          letter-spacing: -1.5px;
        }

        .ot-gradient-text-teal {
          background: linear-gradient(135deg, #4cd5f5 0%, #00a8cd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .ot-gradient-text-coral {
          background: linear-gradient(135deg, #ff8fa3 0%, var(--coral) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .ot-hero-text-content > p {
          max-width: 540px;
          margin: 0 0 24px 0;
          color: rgba(255, 255, 255, 0.82);
          font-size: 14px;
          line-height: 1.7;
        }

        .ot-hero-btn-group {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        /* Right Composition Styles */
        .ot-hero-visual-composition {
          position: relative;
          width: 100%;
        }

        .ot-hero-main-photo-frame {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0,0,0,0.4);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .ot-hero-main-photo-frame img {
          height: 380px;
          object-fit: cover;
          transform: scale(1.02);
          transition: transform 0.5s ease;
        }

        .ot-hero-main-photo-frame:hover img {
          transform: scale(1.05);
        }

        .ot-photo-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 34, 53, 0.4), transparent 60%);
          pointer-events: none;
        }

        .ot-hero-float-tag {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(15px);
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          border: 1px solid rgba(255, 255, 255, 0.4);
          z-index: 5;
        }

        .ot-tag-icon-wrap {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          color: white;
        }

        .ot-tag-icon-wrap.cyan { background: var(--teal); box-shadow: 0 6px 15px rgba(0,168,205,0.3); }
        .ot-tag-icon-wrap.coral { background: var(--coral); box-shadow: 0 6px 15px rgba(255,82,113,0.3); }

        .ot-hero-float-tag strong {
          display: block;
          font-size: 12px;
          font-weight: 800;
          color: var(--navy);
        }

        .ot-hero-float-tag span {
          display: block;
          font-size: 10px;
          color: #607d8b;
          font-weight: 600;
        }

        .ot-tag-top-left { top: 20px; left: -25px; }
        .ot-tag-top-right { bottom: 20px; right: -25px; }

        /* 2. REDESIGNED INTRO & BENTO SKILLS SECTION */
        .ot-intro-section { background: white; }
        .ot-intro-bento-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 50px;
          align-items: center;
          margin-bottom: 60px;
          background: linear-gradient(135deg, var(--cyan), #f4fbfd);
          padding: 45px;
          border-radius: 28px;
          border: 1px solid rgba(0,168,205,0.2);
          box-shadow: 0 15px 40px rgba(0,59,92,0.04);
        }

        .ot-intro-text-box h2 {
          font-size: clamp(26px, 3.2vw, 38px);
          font-weight: 800;
          letter-spacing: -1px;
          line-height: 1.18;
          margin: 10px 0 14px 0;
          color: var(--navy);
        }

        .ot-lead {
          margin: 0 0 16px 0;
          color: #4a6572;
          font-size: 15px;
          line-height: 1.75;
          font-weight: 600;
        }

        .ot-subtext {
          margin: 0;
          color: #607d8b;
          font-size: 14px;
          line-height: 1.75;
        }

        .ot-intro-media-box {
          position: relative;
        }

        .ot-media-card-inner {
          position: relative;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0,59,92,0.12);
        }

        .ot-media-card-inner img {
          height: 340px;
          object-fit: cover;
        }

        .ot-media-floating-badge {
          position: absolute;
          bottom: 16px;
          left: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,59,92,0.12);
          color: var(--teal);
        }

        .ot-media-floating-badge strong {
          display: block;
          font-size: 11px;
          color: var(--navy);
        }

        .ot-media-floating-badge span {
          display: block;
          font-size: 10px;
          color: #607d8b;
        }

        .ot-bento-skills-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .ot-modern-skill-card {
          padding: 22px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0,59,92,0.03);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .ot-modern-skill-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .ot-modern-skill-icon {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          background: var(--cyan);
          color: var(--teal);
          border-radius: 12px;
        }

        .ot-skill-num {
          font-size: 11px;
          font-weight: 800;
          color: #a0b2be;
          letter-spacing: 1px;
        }

        .ot-modern-skill-card h3 {
          margin: 0 0 6px;
          font-size: 15px;
          font-weight: 800;
          color: var(--navy);
        }

        .ot-modern-skill-card p {
          margin: 0;
          font-size: 12px;
          color: #607d8b;
          line-height: 1.6;
        }

        /* 3. SENSORY INTEGRATION */
        .ot-sensory-section { background: var(--cyan); }
        .ot-sensory-orbit-container {
          position: relative;
          max-width: 900px;
          margin: 35px auto 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 35px;
        }

        .ot-orbit-center-card {
          position: relative;
          width: 180px;
          height: 180px;
          background: linear-gradient(135deg, var(--navy), var(--teal));
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          box-shadow: 0 20px 45px rgba(0,59,92,0.2);
          z-index: 3;
        }

        .ot-orbit-pulse {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 2px dashed rgba(0,168,205,0.4);
          animation: spinOrb 20s linear infinite;
        }

        @keyframes spinOrb {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .ot-orbit-center-card strong { font-size: 14px; margin-top: 4px; }
        .ot-orbit-center-card span { font-size: 11px; opacity: 0.85; }

        .ot-sensory-cards-wrapper {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          width: 100%;
        }

        .ot-sensory-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 20px;
          background: white;
          border-radius: 18px;
          border: 1px solid var(--border);
          box-shadow: 0 8px 25px rgba(0,59,92,0.04);
        }

        .ot-sensory-icon {
          display: grid;
          width: 42px;
          height: 42px;
          flex: 0 0 42px;
          place-items: center;
          background: var(--cyan);
          color: var(--teal);
          border-radius: 12px;
        }

        .ot-sensory-card h3 {
          margin: 0 0 4px;
          font-size: 14px;
          font-weight: 800;
          color: var(--navy);
        }

        .ot-sensory-card p {
          margin: 0;
          font-size: 12px;
          color: #607d8b;
          line-height: 1.6;
        }

        /* 4. WHO MAY BENEFIT? */
        .ot-benefit-section { background: white; }
        .ot-benefit-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .ot-benefit-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px 18px;
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 14px;
          font-size: 12px;
          font-weight: 700;
          color: var(--navy);
          box-shadow: 0 4px 12px rgba(0,59,92,0.02);
        }

        .ot-benefit-dot {
          display: grid;
          place-items: center;
          color: var(--teal);
        }

        .ot-multidisciplinary-panel {
          display: flex;
          align-items: center;
          gap: 22px;
          margin-top: 40px;
          padding: 26px;
          background: linear-gradient(135deg, var(--cyan), #f0fbff);
          border: 1px solid rgba(0,168,205,0.25);
          border-radius: 22px;
          box-shadow: 0 12px 30px rgba(0,59,92,0.04);
        }

        .ot-panel-icon {
          display: grid;
          width: 58px;
          height: 58px;
          flex: 0 0 58px;
          place-items: center;
          background: var(--teal);
          color: white;
          border-radius: 16px;
          box-shadow: 0 8px 18px rgba(0,168,205,0.25);
        }

        .ot-multidisciplinary-panel h4 {
          margin: 0 0 6px;
          font-size: 17px;
          font-weight: 800;
          color: var(--navy);
        }

        .ot-multidisciplinary-panel p {
          margin: 0;
          font-size: 13px;
          color: #4a6572;
          line-height: 1.65;
        }

        /* 5. FINE MOTOR & PRE-WRITING */
        .ot-finemotor-section { background: var(--bg-light); }
        .ot-fm-chips-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          max-width: 850px;
          margin: 0 auto 40px;
        }

        .ot-fm-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 50px;
          font-size: 12px;
          font-weight: 700;
          color: var(--navy);
          box-shadow: 0 4px 12px rgba(0,59,92,0.03);
        }

        .ot-fm-chip svg {
          color: var(--teal);
        }

        .ot-progress-roadmap {
          background: white;
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 30px;
          box-shadow: 0 12px 35px rgba(0,59,92,0.04);
        }

        .ot-progress-roadmap h3 {
          text-align: center;
          margin: 0 0 25px;
          font-size: 18px;
          font-weight: 800;
          color: var(--navy);
        }

        .ot-roadmap-steps {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          position: relative;
        }

        .ot-roadmap-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          padding: 8px;
        }

        .ot-roadmap-badge {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          background: var(--cyan);
          color: var(--teal);
          font-weight: 800;
          font-size: 12px;
          border-radius: 50%;
          margin-bottom: 10px;
          box-shadow: 0 4px 12px rgba(0,168,205,0.12);
        }

        .ot-roadmap-step strong {
          font-size: 12px;
          color: var(--navy);
          margin-bottom: 4px;
        }

        .ot-roadmap-step span {
          font-size: 11px;
          color: #607d8b;
          line-height: 1.4;
        }

        .ot-roadmap-connector {
          position: absolute;
          top: 19px;
          right: -50%;
          width: 100%;
          height: 2px;
          background: rgba(0,168,205,0.25);
          z-index: 1;
        }

        /* 6. PLAY & DEVELOPMENT */
        .ot-play-section { background: white; }
        .ot-play-statement-box {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          max-width: 700px;
          margin: 0 auto 40px;
          padding: 20px 26px;
          background: linear-gradient(135deg, var(--yellow), #fff9e6);
          border: 1px solid rgba(255,183,3,0.3);
          border-radius: 18px;
          text-align: center;
          color: #856404;
          box-shadow: 0 8px 25px rgba(255,183,3,0.08);
        }

        .ot-play-statement-box h3 {
          margin: 0;
          font-size: 17px;
          font-weight: 800;
        }

        .ot-play-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .ot-play-card {
          padding: 22px;
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 18px;
          box-shadow: 0 6px 20px rgba(0,59,92,0.03);
        }

        .ot-play-icon {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          background: var(--cyan);
          color: var(--teal);
          border-radius: 12px;
          margin-bottom: 14px;
        }

        .ot-play-card h4 {
          margin: 0 0 6px;
          font-size: 15px;
          font-weight: 800;
          color: var(--navy);
        }

        .ot-play-card p {
          margin: 0;
          font-size: 12px;
          color: #607d8b;
          line-height: 1.6;
        }

        /* 7. FEEDING & ORAL-MOTOR SUPPORT */
        .ot-feeding-section { background: var(--bg-light); }
        .ot-feeding-content h2 {
          font-size: clamp(26px, 3.2vw, 38px);
          font-weight: 800;
          letter-spacing: -1px;
          line-height: 1.18;
          margin: 10px 0 14px 0;
          color: var(--navy);
        }

        .ot-feeding-alert-card {
          padding: 30px;
          background: white;
          border: 1px solid rgba(255,82,113,0.25);
          border-left: 5px solid var(--coral);
          border-radius: 22px;
          box-shadow: 0 12px 35px rgba(0,59,92,0.05);
        }

        .ot-alert-icon {
          display: grid;
          width: 48px;
          height: 48px;
          place-items: center;
          background: rgba(255,82,113,0.12);
          color: var(--coral);
          border-radius: 12px;
          margin-bottom: 14px;
        }

        .ot-feeding-alert-card h3 {
          margin: 0 0 8px;
          font-size: 17px;
          font-weight: 800;
          color: var(--navy);
        }

        .ot-feeding-alert-card p {
          margin: 0;
          font-size: 13px;
          color: #556c78;
          line-height: 1.7;
        }

        /* 8. FAMILY-CENTERED THERAPY */
        .ot-family-section { background: white; }
        .ot-family-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 35px;
        }

        .ot-family-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 20px;
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0,59,92,0.02);
        }

        .ot-family-check {
          display: grid;
          width: 34px;
          height: 34px;
          flex: 0 0 34px;
          place-items: center;
          background: var(--cyan);
          color: var(--teal);
          border-radius: 10px;
        }

        .ot-family-card h4 {
          margin: 0 0 4px;
          font-size: 14px;
          font-weight: 800;
          color: var(--navy);
        }

        .ot-family-card p {
          margin: 0;
          font-size: 12px;
          color: #607d8b;
          line-height: 1.55;
        }

        .ot-family-quote-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          max-width: 750px;
          margin: 0 auto;
          padding: 20px 26px;
          background: linear-gradient(135deg, var(--navy), #00507a);
          border-radius: 18px;
          color: white;
          text-align: center;
          box-shadow: 0 12px 35px rgba(0,59,92,0.18);
        }

        .ot-family-quote-banner svg {
          color: var(--coral);
          flex: 0 0 24px;
        }

        .ot-family-quote-banner p {
          margin: 0;
          font-size: 14px;
          font-weight: 700;
          font-style: italic;
        }

        /* 9. MULTIDISCIPLINARY CHILD DEVELOPMENT */
        .ot-multidisciplinary-section { background: var(--cyan); }
        .ot-hub-container {
          position: relative;
          max-width: 800px;
          margin: 35px auto 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 35px;
        }

        .ot-hub-center {
          width: 160px;
          height: 160px;
          background: white;
          border: 4px solid var(--teal);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--navy);
          text-align: center;
          box-shadow: 0 15px 35px rgba(0,168,205,0.18);
          z-index: 3;
        }

        .ot-hub-center svg {
          color: var(--teal);
          margin-bottom: 4px;
        }

        .ot-hub-center strong { font-size: 14px; font-weight: 800; }
        .ot-hub-center span { font-size: 11px; color: #607d8b; }

        .ot-hub-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          width: 100%;
        }

        .ot-hub-service-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0,59,92,0.04);
        }

        .ot-hub-icon {
          display: grid;
          width: 40px;
          height: 40px;
          flex: 0 0 40px;
          place-items: center;
          background: var(--cyan);
          color: var(--teal);
          border-radius: 12px;
        }

        .ot-hub-service-card span {
          font-size: 12px;
          font-weight: 800;
          color: var(--navy);
        }

        /* 10. OUR OCCUPATIONAL THERAPY JOURNEY */
        .ot-journey-section { background: white; }
        .ot-journey-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .ot-journey-card {
          padding: 26px;
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0,59,92,0.03);
          position: relative;
        }

        .ot-journey-number {
          display: inline-block;
          font-size: 11px;
          font-weight: 800;
          color: var(--teal);
          background: var(--cyan);
          padding: 5px 10px;
          border-radius: 6px;
          margin-bottom: 14px;
        }

        .ot-journey-card h3 {
          margin: 0 0 6px;
          font-size: 16px;
          font-weight: 800;
          color: var(--navy);
        }

        .ot-journey-card p {
          margin: 0;
          font-size: 12px;
          color: #607d8b;
          line-height: 1.65;
        }

        /* 11. INDIVIDUALIZED OCCUPATIONAL THERAPY */
        .ot-individualized-section { background: var(--bg-light); }
        .ot-ind-content h2 {
          font-size: clamp(26px, 3.2vw, 38px);
          font-weight: 800;
          letter-spacing: -1px;
          line-height: 1.18;
          margin: 10px 0 14px 0;
          color: var(--navy);
        }

        .ot-ind-chips-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 20px;
        }

        .ot-ind-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 14px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
          color: var(--navy);
          box-shadow: 0 3px 10px rgba(0,59,92,0.02);
        }

        .ot-ind-chip svg {
          color: var(--teal);
        }

        .ot-ind-quote-card {
          position: relative;
          padding: 38px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 24px;
          box-shadow: 0 15px 40px rgba(0,59,92,0.06);
          text-align: center;
        }

        .ot-big-quote-mark {
          position: absolute;
          top: 10px;
          left: 24px;
          font-size: 70px;
          color: rgba(0,168,205,0.12);
          font-family: serif;
          line-height: 1;
        }

        .ot-ind-quote-card p {
          position: relative;
          z-index: 2;
          margin: 0 0 16px;
          font-size: 15px;
          font-weight: 700;
          color: var(--navy);
          line-height: 1.75;
          font-style: italic;
        }

        .ot-ind-quote-card strong {
          font-size: 11px;
          color: var(--teal);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* 12. PREMIUM CTA SECTION */
        .ot-cta-section {
          position: relative;
          padding: 85px 0;
          background: linear-gradient(135deg, var(--navy), #00507a);
          color: white;
          overflow: hidden;
        }

        .ot-cta-bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(0,168,205,0.25), transparent 60%);
          pointer-events: none;
        }

        .ot-cta-inner {
          max-width: 750px;
          margin: 0 auto;
          text-align: center;
        }

        .ot-cta-icon-wrap {
          display: grid;
          width: 64px;
          height: 64px;
          margin: 0 auto 16px;
          place-items: center;
          color: var(--teal);
          border-radius: 18px;
          background: white;
          box-shadow: 0 12px 30px rgba(0,0,0,0.2);
        }

        .ot-cta-eyebrow {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--yellow);
          text-transform: uppercase;
        }

        .ot-cta-inner h2 {
          font-size: clamp(26px, 3.5vw, 40px);
          font-weight: 800;
          letter-spacing: -1px;
          margin: 10px 0 14px 0;
          line-height: 1.15;
          color: white;
        }

        .ot-cta-inner p {
          font-size: 14px;
          color: rgba(255,255,255,0.85);
          margin: 0 0 26px 0;
        }

        .ot-cta-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }

        /* RESPONSIVE MEDIA QUERIES */
        @media (max-width: 1100px) {
          .ot-bento-skills-grid, .ot-benefit-grid, .ot-play-grid { grid-template-columns: repeat(2, 1fr); }
          .ot-intro-bento-hero { grid-template-columns: 1fr; padding: 30px; }
          .ot-sensory-cards-wrapper, .ot-hub-services-grid { grid-template-columns: repeat(2, 1fr); }
          .ot-roadmap-steps { grid-template-columns: repeat(3, 1fr); row-gap: 25px; }
          .ot-roadmap-connector { display: none; }
          .ot-family-grid, .ot-journey-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 900px) {
          .ot-hero-layout, .ot-two-column { grid-template-columns: 1fr; gap: 40px; }
          .ot-hero-text-content { text-align: center; }
          .ot-hero-btn-group { justify-content: center; }
        }

        @media (max-width: 640px) {
          .ot-bento-skills-grid, .ot-benefit-grid, .ot-play-grid, .ot-sensory-cards-wrapper, .ot-hub-services-grid, .ot-roadmap-steps, .ot-family-grid, .ot-journey-grid { grid-template-columns: 1fr; }
          .ot-multidisciplinary-panel { flex-direction: column; text-align: center; }
          .ot-hero-float-tag { display: none; }
        }
      `}</style>

      <main className="ot-page">
        <HeroSection />
        <IntroSection />
        <SensoryIntegrationSection />
        <WhoMayBenefitSection />
        <FineMotorSection />
        <PlayDevelopmentSection />
        <FeedingSection />
        <FamilyTherapySection />
        <MultidisciplinarySection />
        <JourneySection />
        <IndividualizedSection />
        <CtaSection />
      </main>
    </>
  );
}