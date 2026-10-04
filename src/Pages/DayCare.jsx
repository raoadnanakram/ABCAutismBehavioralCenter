import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Users,
  Apple,
  Brain,
  MessageCircle,
  Activity,
  Moon,
  Palette,
  Music,
  Puzzle,
  Blocks,
  Utensils,
  Droplets,
  Dumbbell,
  Footprints,
  Clock3,
  Stethoscope,
  GraduationCap,
  Accessibility,
  HeartHandshake,
  Phone,
  CalendarCheck,
  CheckCircle2,
  Smile,
  Home,
  Shield,
  ClipboardCheck,
  Ambulance,
  Syringe,
  UserCheck,
  Star,
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

const fadeRight = {
  hidden: { opacity: 0, x: 45 },
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

const SectionHeader = ({ eyebrow, title, description, light = false }) => {
  return (
    <motion.div
      className={`dc-section-header ${light ? "dc-section-header-light" : ""}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <span className="dc-eyebrow">
        <Sparkles size={14} />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </motion.div>
  );
};

/* =========================================================
    HERO SECTION (Fully animated with hover interactions)
========================================================= */

const Hero = () => {
  return (
    <section className="dc-hero">
      <div className="dc-hero-bg-glow" />

      <div className="dc-container dc-hero-grid">
        <motion.div
          className="dc-hero-content"
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="dc-hero-badge"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Sparkles size={15} />
            <span>ABC AUTISM BEHAVIORAL CENTER</span>
          </motion.div>

          <h1>
            Empowering Potential.
            <span className="hero-pink"> Inspiring Growth.</span>
            <span className="hero-yellow"> Nurturing Care.</span>
          </h1>

          <p>
            Specialized behavioral therapy, early intervention, and comprehensive
            child development support tailored to unique developmental needs in a
            safe, compassionate environment.
          </p>

          <div className="dc-hero-actions">
            <motion.a 
              href="/book-a-free-consult" 
              className="dc-btn dc-btn-primary"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <CalendarCheck size={18} />
              <span>Book Consultation</span>
              <ArrowRight size={17} />
            </motion.a>

            <motion.a 
              href="#program" 
              className="dc-btn dc-btn-glass"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Explore Programs</span>
              <ArrowRight size={16} />
            </motion.a>
          </div>

          <div className="dc-trust-row">
            <div>
              <CheckCircle2 size={18} />
              <span>Tailored Plans</span>
            </div>
            <div>
              <ShieldCheck size={18} />
              <span>Evidence-Informed</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="dc-hero-visual"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="dc-glass-card"
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="dc-glass-header">
              <span className="dc-badge-tag">EXPERT CARE</span>
              <div className="dc-glass-icon">
                <MessageCircle size={22} />
              </div>
            </div>

            <div className="dc-glass-body">
              <h3>Unlock Potential</h3>
              <p>Building confidence and clarity through specialized behavioral guidance.</p>
            </div>

            <div className="dc-glass-footer">
              <div className="dc-footer-pill">
                <Star size={14} />
                <span>Active Support Program • Customized Milestones</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    INTRO
========================================================= */

const IntroSection = () => {
  const features = [
    [ShieldCheck, "Safety & Supervision"],
    [BookOpen, "Early Learning"],
    [Palette, "Play-Based Activities"],
    [Users, "Social Interaction"],
    [Clock3, "Healthy Routines"],
    [Heart, "Emotional Wellbeing"],
  ];

  return (
    <section className="dc-section dc-intro">
      <div className="dc-container dc-two-column">
        <motion.div
          className="dc-image-card"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <img
            src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1000&q=85"
            alt="Child participating in creative learning"
            loading="lazy"
          />
          <div className="dc-image-badge">
            <div className="dc-image-badge-icon">
              <HeartHandshake size={22} />
            </div>
            <div>
              <strong>ABC Center</strong>
              <span>A place where children thrive</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="dc-content"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <span className="dc-eyebrow">
            <Sparkles size={14} />
            Our Approach
          </span>
          <h2>
            More Than Care.
            <span>A Specialized Support System.</span>
          </h2>
          <p className="dc-lead">
            Every child deserves an environment where they feel safe, valued,
            and supported. We combine developmental frameworks, behavioral care,
            early learning, and structured play to foster steady growth.
          </p>

          <motion.div
            className="dc-mini-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {features.map(([Icon, title]) => (
              <motion.div
                className="dc-mini-card"
                key={title}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className="dc-mini-icon">
                  <Icon size={19} />
                </div>
                <span>{title}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    APPROACH TIMELINE
========================================================= */

const ApproachTimeline = () => {
  const items = [
    [ShieldCheck, "Safety", "A secure and supervised environment."],
    [BookOpen, "Learning", "Age-appropriate early learning experiences."],
    [Puzzle, "Play", "Learning naturally through exploration."],
    [Users, "Social Development", "Building communication and cooperation."],
    [Apple, "Healthy Habits", "Supporting healthy daily routines."],
    [Footprints, "Independence", "Encouraging confidence and self-help skills."],
  ];

  return (
    <section className="dc-section dc-approach">
      <div className="dc-container">
        <SectionHeader
          eyebrow="How We Support Growth"
          title="A Thoughtful Approach to Child Development"
          description="Our daily environment is designed around the whole child, combining care, learning, play, and positive routine reinforcement."
        />

        <motion.div
          className="dc-approach-timeline"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {items.map(([Icon, title, text], index) => (
            <motion.div
              className="dc-approach-item"
              variants={fadeUp}
              key={title}
              whileHover={{ y: -7 }}
            >
              <div className="dc-approach-number">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="dc-approach-icon">
                <Icon size={23} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    WHAT WE OFFER
========================================================= */

const OfferSection = () => {
  const cards = [
    {
      icon: ShieldCheck,
      label: "CARE",
      title: "Safe & Caring Environment",
      text: "A supervised, child-friendly setting designed around comfort, safety, and individual needs.",
    },
    {
      icon: BookOpen,
      label: "LEARNING",
      title: "Early Learning Activities",
      text: "Age-appropriate activities encouraging language, cognitive, social, and motor development.",
    },
    {
      icon: Puzzle,
      label: "PLAY",
      title: "Play-Based Learning",
      text: "Children learn naturally through play, exploration, creativity, and guided interaction.",
    },
    {
      icon: Users,
      label: "SOCIAL",
      title: "Social & Emotional Development",
      text: "Encouraging sharing, communication, confidence, cooperation, and emotional expression.",
    },
    {
      icon: Apple,
      label: "NUTRITION",
      title: "Nutrition & Healthy Eating",
      text: "Supporting healthy food choices, hydration, meal routines, and positive habits.",
    },
    {
      icon: Brain,
      label: "DEVELOPMENT",
      title: "Behavioral Guidance",
      text: "A nurturing environment supporting cognitive, language, physical, and behavioral milestones.",
    },
    {
      icon: Activity,
      label: "MOVEMENT",
      title: "Active Play & Movement",
      text: "Opportunities for movement, coordination, gross-motor play, and physical activity.",
    },
    {
      icon: Moon,
      label: "ROUTINE",
      title: "Rest & Daily Routine",
      text: "Predictable routines that help children feel secure while supporting development.",
    },
  ];

  return (
    <section className="dc-section dc-offers">
      <div className="dc-container">
        <SectionHeader
          eyebrow="What We Offer"
          title="Care Designed Around Every Child"
          description="A balanced experience combining nurturing care, specialized guidance, learning, play, and supportive routines."
        />

        <motion.div
          className="dc-offer-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.article
                className="dc-offer-card"
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.015 }}
                key={card.title}
              >
                <div className="dc-offer-top">
                  <div className="dc-offer-icon">
                    <Icon size={25} />
                  </div>
                  <span>{card.label}</span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <a href="#contact" className="dc-card-link">
                  Learn More <ArrowRight size={16} />
                </a>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    PLAY BASED LEARNING
========================================================= */

const PlayLearning = () => {
  const activities = [
    [BookOpen, "Storytelling"],
    [Palette, "Drawing & Coloring"],
    [Music, "Music & Movement"],
    [Puzzle, "Puzzles"],
    [Blocks, "Building Activities"],
    [Sparkles, "Sensory Play"],
    [Smile, "Pretend Play"],
    [GraduationCap, "Educational Games"],
  ];

  return (
    <section className="dc-section dc-play-section">
      <div className="dc-container dc-two-column dc-play-grid">
        <motion.div
          className="dc-play-image"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <img
            src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85"
            alt="Children playing and learning"
            loading="lazy"
          />
          <div className="dc-play-label">
            <Sparkles size={18} /> Learning Through Play
          </div>
        </motion.div>

        <motion.div
          className="dc-play-content"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <span className="dc-eyebrow">
            <Puzzle size={14} /> Play-Based Learning
          </span>
          <h2>
            Children Learn Best
            <span>When They Explore.</span>
          </h2>
          <p>
            Play provides children with opportunities to explore ideas,
            communicate, solve problems, develop coordination, and build relationships.
          </p>

          <motion.div
            className="dc-activity-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {activities.map(([Icon, title]) => (
              <motion.div
                className="dc-activity-pill"
                variants={fadeUp}
                whileHover={{ scale: 1.04, y: -4 }}
                key={title}
              >
                <Icon size={17} />
                <span>{title}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    SOCIAL DEVELOPMENT
========================================================= */

const SocialDevelopment = () => {
  const skills = [
    "Sharing",
    "Turn-Taking",
    "Communication",
    "Cooperation",
    "Confidence",
    "Emotional Expression",
    "Positive Peer Interaction",
  ];

  return (
    <section className="dc-section dc-social">
      <div className="dc-container">
        <SectionHeader
          eyebrow="Social & Emotional Development"
          title="Growing Together"
          description="Children are supported in developing meaningful relationships, communication skills, confidence, and positive interaction."
        />

        <motion.div
          className="dc-social-flex-container"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div className="dc-social-center-badge" variants={scaleIn}>
            <div className="dc-social-center-icon">
              <Heart size={36} />
            </div>
            <strong>Growing Together</strong>
            <span>Supportive Environment</span>
          </motion.div>

          <div className="dc-social-cards-grid">
            {skills.map((skill, index) => (
              <motion.div
                className="dc-social-pill-card"
                key={skill}
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <CheckCircle2 size={18} />
                <span>{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    NUTRITION
========================================================= */

const Nutrition = () => {
  const nutrition = [
    [Apple, "Balanced Meals"],
    [Utensils, "Healthy Food Choices"],
    [Droplets, "Hydration"],
    [Clock3, "Regular Meal Routines"],
    [Heart, "Appropriate Portions"],
    [Sparkles, "Healthy Eating Habits"],
  ];

  return (
    <section className="dc-section dc-nutrition">
      <div className="dc-container dc-two-column">
        <motion.div
          className="dc-nutrition-content"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <span className="dc-eyebrow">
            <Apple size={14} /> Nutrition & Healthy Eating
          </span>
          <h2>
            Healthy Habits
            <span>Begin Early.</span>
          </h2>
          <p>
            Nutrition is an important part of daily routines, supporting healthy
            eating habits and positive mealtime participation.
          </p>

          <div className="dc-nutrition-grid">
            {nutrition.map(([Icon, title]) => (
              <motion.div
                className="dc-nutrition-item"
                key={title}
                whileHover={{ x: 5 }}
              >
                <Icon size={19} />
                <span>{title}</span>
              </motion.div>
            ))}
          </div>

          <div className="dc-info-note">
            <ShieldCheck size={19} />
            <p>
              For children with food allergies, intolerances, or special dietary
              requirements, individual arrangements are discussed with parents
              and specialists.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="dc-nutrition-image"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <img
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=85"
            alt="Healthy food and nutrition"
            loading="lazy"
          />
          <div className="dc-nutrition-bubble">
            <Apple size={22} />
            <strong>Healthy Choices</strong>
            <span>Healthy routines start early.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    DEVELOPMENT
========================================================= */

const Development = () => {
  const areas = [
    [Brain, "Cognitive", "Problem-solving, memory, concepts and early learning."],
    [MessageCircle, "Language", "Listening, vocabulary, communication and storytelling."],
    [Activity, "Physical", "Movement, coordination, balance and physical activities."],
    [Users, "Social", "Sharing, cooperation, interaction and group participation."],
    [Heart, "Emotional", "Confidence, independence, expression and routines."],
  ];

  return (
    <section className="dc-section dc-development">
      <div className="dc-container">
        <SectionHeader
          eyebrow="Developmental Support"
          title="Supporting the Whole Child"
          description="Our environment encourages development across multiple domains while respecting each child's individual pace."
        />

        <motion.div
          className="dc-development-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {areas.map(([Icon, title, text], index) => (
            <motion.div
              className={`dc-development-card dc-development-${index}`}
              variants={fadeUp}
              whileHover={{ y: -9, scale: 1.015 }}
              key={title}
            >
              <div className="dc-development-icon">
                <Icon size={28} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="dc-development-line" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    ACTIVE PLAY
========================================================= */

const ActivePlay = () => {
  const items = [
    [Activity, "Indoor Movement"],
    [Footprints, "Outdoor Play"],
    [Dumbbell, "Gross-Motor Games"],
    [Music, "Dance & Music"],
    [Activity, "Age-Appropriate Exercise"],
    [Accessibility, "Coordination Activities"],
  ];

  return (
    <section className="dc-active">
      <div className="dc-active-bg" />
      <div className="dc-container">
        <motion.div
          className="dc-active-inner"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="dc-active-heading">
            <span className="dc-eyebrow dc-eyebrow-light">
              <Activity size={14} /> Active Play & Movement
            </span>
            <h2>
              Move, Explore,
              <span>Discover.</span>
            </h2>
            <p>
              Children need opportunities to move, explore, and develop physical
              skills through enjoyable age-appropriate activities.
            </p>
          </div>

          <motion.div
            className="dc-active-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {items.map(([Icon, title]) => (
              <motion.div
                className="dc-active-card"
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                key={title}
              >
                <Icon size={22} />
                <span>{title}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="dc-active-note">
            <Stethoscope size={18} />
            <span>
              For children requiring specialized physical support, activities can
              be coordinated with qualified specialists when appropriate.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    DAILY ROUTINE
========================================================= */

const DailyRoutine = () => {
  const steps = [
    [Home, "Arrival & Settling"],
    [Smile, "Free Play"],
    [BookOpen, "Learning Activity"],
    [Apple, "Snack / Meal"],
    [Sparkles, "Creative or Sensory Activity"],
    [Activity, "Active Play"],
    [Utensils, "Lunch"],
    [Moon, "Rest / Quiet Time"],
    [BookOpen, "Story / Group Activity"],
    [Heart, "Free Play & Departure"],
  ];

  return (
    <section className="dc-section dc-routine">
      <div className="dc-container">
        <SectionHeader
          eyebrow="Rest & Daily Routine"
          title="A Day Designed Around Predictability & Growth"
          description="A predictable routine helps children feel secure while giving them opportunities to learn, play, and rest."
        />

        <div className="dc-routine-timeline">
          {steps.map(([Icon, title], index) => (
            <motion.div
              className="dc-routine-step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: index * 0.06, ease }}
              key={title}
            >
              <div className="dc-routine-number">{index + 1}</div>
              <div className="dc-routine-card">
                <div className="dc-routine-icon">
                  <Icon size={20} />
                </div>
                <span>{title}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="dc-routine-caption">
          Daily schedules are adjusted according to children's age groups and individual needs.
        </p>
      </div>
    </section>
  );
};

/* =========================================================
    MULTIDISCIPLINARY
========================================================= */

const Multidisciplinary = () => {
  const professionals = [
    [GraduationCap, "Special Educator"],
    [MessageCircle, "Speech & Language Pathologist"],
    [Activity, "Physiotherapist"],
    [Accessibility, "Occupational Therapist"],
    [Apple, "Nutritionist / Dietitian"],
    [Brain, "Behavioral Specialist / Psychologist"],
  ];

  return (
    <section className="dc-section dc-multi">
      <div className="dc-container">
        <SectionHeader
          eyebrow="Special Education & Developmental Support"
          title="Supporting Every Child's Journey"
          description="Our center works as part of a multidisciplinary care team to support communication, learning, movement, and daily living skills."
        />

        <motion.div
          className="dc-professional-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {professionals.map(([Icon, title]) => (
            <motion.div
              className="dc-professional-card"
              variants={fadeUp}
              whileHover={{ y: -7, scale: 1.015 }}
              key={title}
            >
              <div className="dc-professional-icon">
                <Icon size={24} />
              </div>
              <div>
                <span>PROFESSIONAL SUPPORT</span>
                <h3>{title}</h3>
              </div>
              <ArrowRight size={18} className="dc-professional-arrow" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    PARENT PARTNERSHIP
========================================================= */

const ParentPartnership = () => {
  const items = [
    "Daily Routine",
    "Meals & Snacks",
    "Sleep / Rest",
    "Participation",
    "Learning Activities",
    "General Wellbeing",
    "Developmental Progress",
    "Observed Concerns",
  ];

  return (
    <section className="dc-section dc-parent">
      <div className="dc-container dc-two-column">
        <motion.div
          className="dc-parent-image"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="dc-parent-glow" />
          <img
            src="https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=1000&q=85"
            alt="Parent and child spending time together"
            loading="lazy"
          />
          <div className="dc-parent-quote">
            <Heart size={18} />
            <span>Parents are an important part of the child's care team.</span>
          </div>
        </motion.div>

        <motion.div
          className="dc-parent-content"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <span className="dc-eyebrow">
            <HeartHandshake size={14} /> Parent Partnership
          </span>
          <h2>
            We Believe Parents
            <span>Are Part of the Team.</span>
          </h2>
          <p>
            We maintain continuous communication with parents and guardians
            regarding daily experiences, wellbeing, routines, and developmental progress.
          </p>

          <div className="dc-parent-list">
            {items.map((item) => (
              <motion.div key={item} whileHover={{ x: 5 }}>
                <CheckCircle2 size={17} />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    SAFETY
========================================================= */

const SafetySection = () => {
  const items = [
    [Shield, "Child Supervision"],
    [UserCheck, "Authorized Pickup"],
    [Phone, "Emergency Contacts"],
    [Stethoscope, "Illness Management"],
    [Sparkles, "Hygiene & Sanitation"],
    [Utensils, "Safe Food Handling"],
    [Syringe, "Medication Policies"],
    [Ambulance, "Emergency Response"],
    [ClipboardCheck, "Accident Documentation"],
    [MessageCircle, "Parent Communication"],
  ];

  return (
    <section className="dc-safety">
      <div className="dc-safety-pattern" />
      <div className="dc-container">
        <motion.div
          className="dc-safety-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <span className="dc-eyebrow dc-eyebrow-light">
            <ShieldCheck size={14} /> Safety & Wellbeing
          </span>
          <h2>
            Your Child's Safety
            <span>Is Our Priority.</span>
          </h2>
          <p>Clear safety procedures help create a secure environment for everyone.</p>
        </motion.div>

        <motion.div
          className="dc-safety-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {items.map(([Icon, title]) => (
            <motion.div
              className="dc-safety-card"
              variants={fadeUp}
              whileHover={{ y: -5, scale: 1.015 }}
              key={title}
            >
              <Icon size={21} />
              <span>{title}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    PROGRAMS
========================================================= */

const Programs = () => {
  const programs = [
    {
      icon: Clock3,
      title: "Half-Day Care",
      text: "Ideal for parents who need quality developmental care for part of the day.",
    },
    {
      icon: CalendarCheck,
      title: "Full-Day Care",
      text: "Structured care, learning, play, meals, rest, and therapy throughout the day.",
    },
    {
      icon: CalendarCheck,
      title: "Flexible / Occasional Care",
      text: "For families requiring center support on selected days, subject to availability.",
    },
    {
      icon: Brain,
      title: "Behavioral Intervention Program",
      text: "Specialized day programs combined with targeted developmental therapies.",
      featured: true,
    },
  ];

  return (
    <section className="dc-section dc-programs" id="programs">
      <div className="dc-container">
        <SectionHeader
          eyebrow="Our Programs"
          title="Flexible Care for Different Family Needs"
          description="Choose the type of program that best fits your schedule and developmental goals."
        />

        <motion.div
          className="dc-program-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <motion.div
                className={`dc-program-card ${program.featured ? "featured" : ""}`}
                variants={fadeUp}
                whileHover={{ y: -9, scale: 1.015 }}
                key={program.title}
              >
                {program.featured && (
                  <div className="dc-featured-label">Core Program</div>
                )}
                <div className="dc-program-icon">
                  <Icon size={25} />
                </div>
                <h3>{program.title}</h3>
                <p>{program.text}</p>
                <a href="#contact" className="dc-program-link">
                  Explore Program <ArrowRight size={16} />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    CTA
========================================================= */

const CTA = () => {
  return (
    <section className="dc-cta" id="contact">
      <div className="dc-cta-circle dc-cta-circle-one" />
      <div className="dc-cta-circle dc-cta-circle-two" />

      <div className="dc-container">
        <motion.div
          className="dc-cta-inner"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="dc-cta-icon">
            <HeartHandshake size={30} />
          </div>
          <span className="dc-cta-label">LET'S GROW TOGETHER</span>
          <h2>
            Looking for Specialized Behavioral &
            <span>Development Support?</span>
          </h2>
          <p>Come visit us, meet our specialists, and learn about our programs.</p>

          <div className="dc-cta-actions">
            <motion.a 
              href="/contact" 
              className="dc-btn dc-btn-white"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <CalendarCheck size={18} />
              <span>Schedule a Visit</span>
              <ArrowRight size={17} />
            </motion.a>
            <motion.a 
              href="/contact" 
              className="dc-btn dc-btn-transparent"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              Enquire About Admission
            </motion.a>
            <motion.a 
              href="/contact" 
              className="dc-btn dc-btn-transparent"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone size={17} />
              <span>Contact Us</span>
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

export default function DayCare() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .daycare-page {
          --teal: #087F8C;
          --dark-teal: #056873;
          --aqua: #DFF7F5;
          --yellow: #F9C74F;
          --coral: #FF7A7A;
          --navy: #173B4D;
          --bg: #F8FCFC;
          --white: #FFFFFF;
          --border: rgba(8,127,140,.13);

          font-family: "Plus Jakarta Sans", sans-serif;
          color: var(--navy);
          background: var(--bg);
          overflow-x: hidden;
          line-height: 1.65;
        }

        .daycare-page *, .daycare-page *::before, .daycare-page *::after {
          box-sizing: border-box;
        }

        .daycare-page img {
          display: block;
          width: 100%;
        }

        .daycare-page a {
          text-decoration: none;
        }

        .dc-container {
          width: min(1200px, calc(100% - 40px));
          margin: 0 auto;
          position: relative;
          z-index: 3;
        }

        .dc-section {
          position: relative;
          padding: 85px 0;
        }

        .dc-two-column {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 65px;
          align-items: center;
        }

        /* SECTION HEADER */
        .dc-section-header {
          max-width: 780px;
          margin: 0 auto 50px;
          text-align: center;
        }

        .dc-section-header h2 {
          margin: 12px 0 16px;
          font-size: clamp(28px, 3.5vw, 42px);
          line-height: 1.18;
          font-weight: 800;
          letter-spacing: -1.2px;
        }

        .dc-section-header p {
          margin: 0 auto;
          max-width: 700px;
          color: #556c78;
          font-size: 15px;
          line-height: 1.75;
        }

        .dc-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--teal);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .dc-eyebrow svg {
          color: var(--yellow);
        }

        .dc-eyebrow-light {
          color: rgba(255,255,255,.92);
        }

        /* BUTTONS */
        .dc-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 48px;
          padding: 0 20px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 800;
          overflow: hidden;
          isolation: isolate;
          transition: transform .3s ease, box-shadow .3s ease, background .3s ease, border-color .3s ease, color .3s ease;
        }

        .dc-btn-primary {
          color: white;
          background: var(--teal);
          box-shadow: 0 12px 25px rgba(8,127,140,.22);
        }

        .dc-btn-primary:hover {
          background: var(--dark-teal);
        }

        .dc-btn-glass {
          color: white;
          border: 1px solid rgba(255,255,255,.25);
          background: rgba(255,255,255,.1);
          backdrop-filter: blur(10px);
        }

        .dc-btn-glass:hover {
          background: rgba(255,255,255,.2);
          border-color: white;
        }

        .dc-btn-white {
          color: var(--teal);
          background: white;
          box-shadow: 0 12px 30px rgba(0,0,0,.12);
        }

        .dc-btn-transparent {
          color: white;
          border: 1px solid rgba(255,255,255,.4);
          background: rgba(255,255,255,.08);
          backdrop-filter: blur(10px);
        }

        /* HERO SECTION */
        .dc-hero {
          position: relative;
          min-height: 600px;
          padding: 90px 0 110px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: linear-gradient(135deg, #0f3d4c 0%, #173b4d 50%, #08303a 100%);
        }

        .dc-hero-bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 80% 30%, rgba(8,127,140,0.3), transparent 40%);
          pointer-events: none;
        }

        .dc-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
          align-items: center;
          gap: 50px;
        }

        .dc-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 50px;
          color: var(--yellow);
          background: rgba(255,255,255,.06);
          backdrop-filter: blur(10px);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .dc-hero-content h1 {
          margin: 20px 0 18px;
          color: white;
          font-size: clamp(36px, 4.2vw, 56px);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -1.8px;
        }

        .dc-hero-content h1 .hero-pink {
          display: block;
          color: var(--coral);
        }

        .dc-hero-content h1 .hero-yellow {
          display: block;
          color: var(--yellow);
        }

        .dc-hero-content > p {
          max-width: 580px;
          margin: 0;
          color: rgba(255,255,255,.8);
          font-size: 15px;
          line-height: 1.8;
        }

        .dc-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 26px;
        }

        .dc-trust-row {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 28px;
        }

        .dc-trust-row div {
          display: flex;
          align-items: center;
          gap: 7px;
          color: rgba(255,255,255,.85);
          font-size: 12px;
          font-weight: 700;
        }

        .dc-trust-row svg {
          color: var(--yellow);
        }

        /* Glass Card Visual */
        .dc-glass-card {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border-radius: 26px;
          padding: 32px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
          color: white;
          text-align: center;
        }

        .dc-glass-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .dc-badge-tag {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: rgba(255,255,255,0.7);
        }

        .dc-glass-icon {
          width: 54px;
          height: 54px;
          margin: 0 auto;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--teal), var(--coral));
          box-shadow: 0 0 25px rgba(8,127,140,0.5);
          color: white;
        }

        .dc-glass-body h3 {
          font-size: 22px;
          font-weight: 800;
          margin: 0 0 8px;
        }

        .dc-glass-body p {
          color: rgba(255,255,255,0.75);
          font-size: 13px;
          margin: 0 0 22px;
          line-height: 1.6;
        }

        .dc-glass-footer {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px 16px;
          border-radius: 12px;
        }

        .dc-footer-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          color: var(--yellow);
        }

        /* INTRO */
        .dc-intro { background: var(--bg); }
        .dc-image-card { position: relative; }
        .dc-image-card img { height: 460px; object-fit: cover; border-radius: 26px; box-shadow: 0 22px 50px rgba(23,59,77,.1); }
        .dc-image-badge {
          position: absolute; left: 22px; bottom: 22px;
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px; border-radius: 16px;
          background: rgba(255,255,255,.95); backdrop-filter: blur(12px);
          box-shadow: 0 15px 35px rgba(23,59,77,.12);
        }
        .dc-image-badge-icon {
          display: grid; width: 42px; height: 42px; place-items: center; color: white; border-radius: 12px; background: var(--teal);
        }
        .dc-image-badge strong { color: var(--navy); font-size: 12px; display: block; }
        .dc-image-badge span { color: #6e818a; font-size: 10px; display: block; }
        .dc-lead { margin: 0 0 24px 0; color: #5a707a; font-size: 15px; line-height: 1.8; }

        .dc-content h2 {
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 800;
          letter-spacing: -1.2px;
          line-height: 1.18;
          margin: 12px 0 16px 0;
        }

        .dc-content h2 span {
          display: block;
          color: var(--teal);
        }

        .dc-mini-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .dc-mini-card {
          display: flex; align-items: center; gap: 11px; padding: 12px 14px;
          border: 1px solid var(--border); border-radius: 14px; background: white;
          box-shadow: 0 8px 20px rgba(23,59,77,.04);
        }
        .dc-mini-icon {
          display: grid; width: 36px; height: 36px; place-items: center; color: var(--teal); border-radius: 10px; background: var(--aqua);
        }
        .dc-mini-card span { color: var(--navy); font-size: 11px; font-weight: 700; }

        /* APPROACH */
        .dc-approach { background: white; }
        .dc-approach-timeline { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .dc-approach-item {
          padding: 24px 20px; text-align: left; border: 1px solid var(--border);
          border-radius: 20px; background: white; box-shadow: 0 10px 25px rgba(23,59,77,.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .dc-approach-item:hover {
          box-shadow: 0 18px 35px rgba(8,127,140,.1);
          border-color: rgba(8,127,140,0.3);
        }
        .dc-approach-number { margin-bottom: 10px; color: rgba(8,127,140,.5); font-size: 11px; font-weight: 800; }
        .dc-approach-icon { display: grid; width: 48px; height: 48px; margin-bottom: 14px; place-items: center; color: var(--teal); border-radius: 14px; background: var(--aqua); }
        .dc-approach-item h3 { margin: 0 0 6px; color: var(--navy); font-size: 15px; font-weight: 800; }
        .dc-approach-item p { margin: 0; color: #687d86; font-size: 12px; line-height: 1.65; }

        /* OFFERS */
        .dc-offers { background: #f4fbfb; }
        .dc-offer-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .dc-offer-card {
          position: relative; min-height: 270px; padding: 24px; border: 1px solid var(--border);
          border-radius: 22px; background: white; box-shadow: 0 10px 25px rgba(23,59,77,.04);
        }
        .dc-offer-top { display: flex; align-items: center; justify-content: space-between; }
        .dc-offer-icon { display: grid; width: 50px; height: 50px; place-items: center; color: var(--teal); border-radius: 14px; background: var(--aqua); }
        .dc-offer-top span { font-size: 10px; font-weight: 800; color: #8298a2; letter-spacing: 1px; }
        .dc-offer-card h3 { margin: 20px 0 8px; color: var(--navy); font-size: 15px; font-weight: 800; }
        .dc-offer-card p { margin: 0 0 35px; color: #6a7f88; font-size: 12px; line-height: 1.7; }
        .dc-card-link { position: absolute; left: 24px; bottom: 22px; display: inline-flex; align-items: center; gap: 6px; color: var(--teal); font-size: 11px; font-weight: 800; }

        /* PLAY */
        .dc-play-section { background: white; }
        .dc-play-image { position: relative; }
        .dc-play-image img { height: 460px; object-fit: cover; border-radius: 26px; box-shadow: 0 22px 50px rgba(23,59,77,.1); }
        .dc-play-label {
          position: absolute; left: 22px; bottom: 22px; display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 16px; color: var(--navy); border-radius: 12px; background: white;
          box-shadow: 0 14px 30px rgba(23,59,77,.12); font-size: 11px; font-weight: 800;
        }
        .dc-activity-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 24px; }
        .dc-activity-pill {
          display: flex; align-items: center; gap: 9px; padding: 12px 14px; color: var(--navy);
          border: 1px solid var(--border); border-radius: 12px; background: #fbfefe; font-size: 11px; font-weight: 700;
        }
        .dc-activity-pill svg { color: var(--teal); }

        /* SOCIAL DEVELOPMENT */
        .dc-social { background: var(--aqua); }
        .dc-social-flex-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 35px;
          max-width: 900px;
          margin: 0 auto;
        }
        .dc-social-center-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 28px 45px;
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 45px rgba(8,127,140,0.12);
          border: 1px solid rgba(8,127,140,0.15);
          text-align: center;
        }
        .dc-social-center-icon {
          width: 60px;
          height: 60px;
          display: grid;
          place-items: center;
          background: var(--aqua);
          color: var(--teal);
          border-radius: 18px;
          margin-bottom: 12px;
        }
        .dc-social-center-badge strong {
          font-size: 18px;
          color: var(--navy);
          font-weight: 800;
        }
        .dc-social-center-badge span {
          font-size: 12px;
          color: #6c828d;
          font-weight: 600;
          margin-top: 2px;
        }
        .dc-social-cards-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          width: 100%;
        }
        .dc-social-pill-card {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 18px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 14px;
          color: var(--navy);
          font-size: 12px;
          font-weight: 700;
          box-shadow: 0 8px 20px rgba(23,59,77,0.04);
        }
        .dc-social-pill-card svg {
          color: var(--teal);
        }

        /* NUTRITION */
        .dc-nutrition { background: white; }
        .dc-nutrition-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 22px; }
        .dc-nutrition-item { display: flex; align-items: center; gap: 9px; padding: 11px 13px; border: 1px solid var(--border); border-radius: 12px; background: #fbfefe; }
        .dc-nutrition-item span { color: var(--navy); font-size: 11px; font-weight: 700; }
        .dc-info-note { display: flex; gap: 10px; margin-top: 18px; padding: 14px; border-left: 3px solid var(--yellow); border-radius: 12px; background: #fffaf0; }
        .dc-info-note p { margin: 0; font-size: 12px; color: #6d7b82; line-height: 1.6; }
        .dc-nutrition-image { position: relative; }
        .dc-nutrition-image img { height: 460px; object-fit: cover; border-radius: 26px; }
        .dc-nutrition-bubble { position: absolute; right: 22px; bottom: 22px; display: flex; flex-direction: column; padding: 14px 18px; border-radius: 14px; background: rgba(255,255,255,.95); box-shadow: 0 15px 35px rgba(23,59,77,.12); }
        .dc-nutrition-bubble strong { font-size: 12px; color: var(--navy); margin-top: 4px; }
        .dc-nutrition-bubble span { font-size: 10px; color: #788c95; }

        /* DEVELOPMENT */
        .dc-development { background: #f4fbfb; }
        .dc-development-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .dc-development-card { position: relative; min-height: 230px; padding: 22px; border: 1px solid var(--border); border-radius: 22px; background: white; box-shadow: 0 10px 25px rgba(23,59,77,.04); }
        .dc-development-icon { display: grid; width: 52px; height: 52px; place-items: center; color: var(--teal); border-radius: 15px; background: var(--aqua); margin-bottom: 15px; }
        .dc-development-card h3 { margin: 0 0 6px; font-size: 15px; font-weight: 800; color: var(--navy); }
        .dc-development-card p { margin: 0; font-size: 12px; color: #6a7f88; line-height: 1.65; }
        .dc-development-line { position: absolute; left: 22px; bottom: 20px; width: 30px; height: 3px; border-radius: 10px; background: var(--yellow); }

        /* ACTIVE PLAY */
        .dc-active { position: relative; padding: 95px 0; color: white; background: var(--dark-teal); }
        .dc-active-heading { max-width: 700px; margin-bottom: 40px; }
        .dc-active-heading h2 { font-size: clamp(28px, 3.5vw, 40px); font-weight: 800; letter-spacing: -1.2px; margin: 12px 0 14px 0; }
        .dc-active-heading h2 span { color: var(--yellow); }
        .dc-active-heading p { color: rgba(255,255,255,0.8); font-size: 14px; margin: 0; }
        .dc-active-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .dc-active-card { display: flex; min-height: 110px; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 15px; text-align: center; border: 1px solid rgba(255,255,255,.12); border-radius: 18px; background: rgba(255,255,255,.07); }
        .dc-active-card span { font-size: 12px; font-weight: 700; color: white; }
        .dc-active-card svg { color: var(--yellow); }
        .dc-active-note { display: flex; align-items: center; gap: 10px; margin-top: 22px; padding: 14px 16px; border: 1px solid rgba(255,255,255,.1); border-radius: 14px; background: rgba(255,255,255,.06); color: rgba(255,255,255,.8); font-size: 11px; }

        /* ROUTINE */
        .dc-routine { background: white; }
        .dc-routine-timeline { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; row-gap: 25px; }
        .dc-routine-number { display: grid; width: 44px; height: 44px; margin: 0 auto 10px; place-items: center; color: white; border: 4px solid white; border-radius: 50%; background: var(--teal); font-size: 11px; font-weight: 800; box-shadow: 0 5px 15px rgba(8,127,140,0.2); }
        .dc-routine-card { display: flex; min-height: 95px; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 12px; text-align: center; border: 1px solid var(--border); border-radius: 16px; background: #fbfefe; box-shadow: 0 6px 15px rgba(23,59,77,0.03); }
        .dc-routine-card span { font-size: 11px; font-weight: 700; color: var(--navy); }
        .dc-routine-caption { text-align: center; margin-top: 30px; font-size: 12px; color: #768a93; font-weight: 600; }

        /* MULTIDISCIPLINARY */
        .dc-multi { background: #f4fbfb; }
        .dc-professional-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
        .dc-professional-card { display: flex; align-items: center; gap: 14px; min-height: 100px; padding: 16px; border: 1px solid var(--border); border-radius: 18px; background: white; box-shadow: 0 8px 20px rgba(23,59,77,0.03); }
        .dc-professional-icon { display: grid; width: 48px; height: 48px; flex: 0 0 48px; place-items: center; color: var(--teal); border-radius: 14px; background: var(--aqua); }
        .dc-professional-card span { font-size: 9px; font-weight: 800; color: #8298a2; letter-spacing: 0.8px; display: block; margin-bottom: 2px; }
        .dc-professional-card h3 { font-size: 13px; font-weight: 800; color: var(--navy); margin: 0; }
        .dc-professional-arrow { margin-left: auto; color: #b0c2cb; }

        /* PARENT PARTNERSHIP */
        .dc-parent { background: white; }
        .dc-parent-image { position: relative; }
        .dc-parent-image img { height: 480px; object-fit: cover; border-radius: 26px; box-shadow: 0 22px 50px rgba(23,59,77,.1); }
        .dc-parent-quote { position: absolute; right: 22px; bottom: 22px; display: flex; align-items: center; gap: 10px; max-width: 260px; padding: 14px; border-radius: 14px; background: rgba(255,255,255,.95); box-shadow: 0 15px 35px rgba(23,59,77,.12); }
        .dc-parent-quote span { font-size: 11px; color: var(--navy); font-weight: 700; }
        .dc-parent-content h2 { font-size: clamp(28px, 3.5vw, 40px); font-weight: 800; letter-spacing: -1.2px; margin: 12px 0 16px 0; }
        .dc-parent-content h2 span { display: block; color: var(--teal); }
        .dc-parent-content p { color: #5a707a; font-size: 15px; line-height: 1.8; margin: 0 0 22px 0; }
        .dc-parent-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .dc-parent-list div { display: flex; align-items: center; gap: 8px; padding: 11px 12px; border-radius: 12px; background: #f6fbfb; border: 1px solid var(--border); }
        .dc-parent-list span { font-size: 11px; font-weight: 700; color: var(--navy); }
        .dc-parent-list svg { color: var(--teal); }

        /* SAFETY */
        .dc-safety { position: relative; padding: 95px 0; color: white; background: #075d69; }
        .dc-safety-heading { max-width: 700px; margin: 0 auto 40px; text-align: center; }
        .dc-safety-heading h2 { font-size: clamp(28px, 3.5vw, 40px); font-weight: 800; letter-spacing: -1.2px; margin: 12px 0 12px 0; }
        .dc-safety-heading h2 span { color: var(--yellow); }
        .dc-safety-heading p { color: rgba(255,255,255,0.8); font-size: 14px; margin: 0; }
        .dc-safety-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
        .dc-safety-card { display: flex; min-height: 100px; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 14px; text-align: center; border: 1px solid rgba(255,255,255,.12); border-radius: 16px; background: rgba(255,255,255,.07); }
        .dc-safety-card span { font-size: 11px; font-weight: 700; color: white; }
        .dc-safety-card svg { color: var(--yellow); }

        /* PROGRAMS */
        .dc-programs { background: var(--bg); }
        .dc-program-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .dc-program-card { position: relative; min-height: 280px; padding: 24px; border: 1px solid var(--border); border-radius: 22px; background: white; box-shadow: 0 10px 25px rgba(23,59,77,.04); }
        .dc-program-card.featured { border-color: rgba(249, 199, 79, 0.6); box-shadow: 0 15px 35px rgba(249, 199, 79, 0.15); }
        .dc-program-icon { display: grid; width: 50px; height: 50px; place-items: center; color: var(--teal); border-radius: 14px; background: var(--aqua); margin-bottom: 18px; }
        .dc-program-card h3 { font-size: 16px; font-weight: 800; color: var(--navy); margin: 0 0 8px; }
        .dc-program-card p { font-size: 12px; color: #6a7f88; line-height: 1.7; margin: 0 0 30px; }
        .dc-program-link { position: absolute; left: 24px; bottom: 22px; display: inline-flex; align-items: center; gap: 6px; color: var(--teal); font-size: 11px; font-weight: 800; }
        .dc-featured-label { position: absolute; right: 16px; top: 16px; padding: 5px 8px; color: #8a6700; border-radius: 6px; background: #fff2c6; font-size: 8px; font-weight: 800; text-transform: uppercase; }

        /* CTA */
        .dc-cta { position: relative; padding: 95px 0; background: linear-gradient(135deg, var(--teal), var(--dark-teal)); color: white; }
        .dc-cta-inner { max-width: 800px; margin: 0 auto; text-align: center; }
        .dc-cta-icon { display: grid; width: 64px; height: 64px; margin: 0 auto 16px; place-items: center; color: var(--teal); border-radius: 18px; background: white; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
        .dc-cta-label { font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: var(--yellow); text-transform: uppercase; }
        .dc-cta-inner h2 { font-size: clamp(28px, 3.5vw, 42px); font-weight: 800; letter-spacing: -1.2px; margin: 12px 0 14px 0; line-height: 1.15; }
        .dc-cta-inner h2 span { display: block; color: var(--yellow); }
        .dc-cta-inner p { font-size: 15px; color: rgba(255,255,255,0.85); margin: 0 0 28px 0; }
        .dc-cta-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }

        /* RESPONSIVE MEDIA QUERIES */
        @media (max-width: 1100px) {
          .dc-offer-grid, .dc-program-grid { grid-template-columns: repeat(2, 1fr); }
          .dc-development-grid, .dc-safety-grid { grid-template-columns: repeat(3, 1fr); }
          .dc-approach-timeline, .dc-routine-timeline { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 900px) {
          .dc-hero-grid, .dc-two-column { grid-template-columns: 1fr; gap: 40px; }
          .dc-hero-content { text-align: center; }
          .dc-approach-timeline, .dc-routine-timeline, .dc-professional-grid, .dc-active-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .dc-offer-grid, .dc-program-grid, .dc-development-grid, .dc-safety-grid, .dc-approach-timeline, .dc-routine-timeline, .dc-professional-grid, .dc-active-grid, .dc-mini-grid, .dc-parent-list, .dc-nutrition-grid, .dc-activity-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <main className="daycare-page">
        <Hero />
        <IntroSection />
        <ApproachTimeline />
        <OfferSection />
        <PlayLearning />
        <SocialDevelopment />
        <Nutrition />
        <Development />
        <ActivePlay />
        <DailyRoutine />
        <Multidisciplinary />
        <ParentPartnership />
        <SafetySection />
        <Programs />
        <CTA />
      </main>
    </>
  );
}