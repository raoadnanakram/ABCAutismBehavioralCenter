import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Heart, 
  Users, 
  ShieldCheck, 
  Smile, 
  MessageCircle, 
  Activity, 
  Target, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Compass, 
  Award, 
  Clock, 
  Layers, 
  ChevronRight,
  Stethoscope,
  BookMarked,
  Apple,
  Footprints,
  Baby,
  Building2,
  Calendar,
  PhoneCall
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function ABCBehaviouralCentrePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full font-sans text-slate-800 bg-[#F8F9FC] overflow-x-hidden selection:bg-[#0F9D9A] selection:text-white">
      
      {/* ================= 1. HERO SECTION (Compact Size) ================= */}
      <section className="relative w-full bg-gradient-to-br from-[#172554] via-[#102a5c] to-[#0F9D9A] text-white flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        {/* Animated Gradient Background Blobs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], x: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#0F9D9A]/20 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0], y: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-[#F47C7C]/15 rounded-full blur-[120px] pointer-events-none"
        />

        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-12 left-[15%] text-[#F6C945]/30">
            <Sparkles size={32} />
          </motion.div>
          <motion.div animate={{ y: [20, -20, 20] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-16 left-[10%] text-[#E8F8F5]/20">
            <Brain size={40} />
          </motion.div>
          <motion.div animate={{ y: [-18, 18, -18] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute top-16 right-[15%] text-[#F47C7C]/30">
            <Heart size={36} />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          
          {/* Small Badge */}
          <motion.div variants={slideUp} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#E8F8F5] text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
              <Sparkles size={12} className="text-[#F6C945]" />
              ABA THERAPY • PSYCHOLOGY • CHILD DEVELOPMENT
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight text-white"
          >
            <motion.span variants={slideUp} className="block">Understanding Behaviour.</motion.span>
            <motion.span variants={slideUp} className="block text-[#F6C945]">Building Skills.</motion.span>
            <motion.span variants={slideUp} className="block">Supporting Development.</motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={slideUp} 
            initial="hidden" 
            animate="visible"
            className="text-slate-200 text-sm sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
          >
            At ABC Centre, our ABA Therapy and Psychology services provide individualized support for children who may benefit from structured behavioral, developmental, emotional, and psychological interventions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={slideUp} 
            initial="hidden" 
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
          >
            <motion.a 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="/book-a-free-consult" 
              className="w-full sm:w-auto bg-[#F47C7C] hover:bg-[#e06b6b] text-white font-bold px-7 py-3 rounded-full shadow-xl shadow-[#F47C7C]/30 transition-all flex items-center justify-center gap-2 group text-sm"
            >
              <span>Book an Assessment</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a 
              whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.98 }}
              href="/about/our-team" 
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold px-7 py-3 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>Meet Our Team</span>
            </motion.a>
          </motion.div>

          {/* Glassmorphism Information Card Overlapping */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-3xl shadow-2xl text-left"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F9D9A]/30 flex items-center justify-center text-[#E8F8F5] flex-shrink-0">
                <Target size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Individualized Care</h3>
                <p className="text-slate-300 text-[11px] mt-0.5">Tailored programs engineered around each child's specific developmental goals.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6C945]/30 flex items-center justify-center text-[#F6C945] flex-shrink-0">
                <Brain size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Evidence-Informed</h3>
                <p className="text-slate-300 text-[11px] mt-0.5">Structured ABA and psychological methodologies backed by clinical research.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F47C7C]/30 flex items-center justify-center text-[#F47C7C] flex-shrink-0">
                <Users size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Family Partnership</h3>
                <p className="text-slate-300 text-[11px] mt-0.5">Collaborative caregiver coaching ensuring consistency across home and clinic.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= 2. INTRODUCTION SECTION ================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side Content */}
          <motion.div 
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="inline-block bg-[#E8F8F5] text-[#0F9D9A] border border-[#0F9D9A]/30 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
              INDIVIDUALIZED SUPPORT
            </span>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#172554] leading-tight">
              Every Child Learns Differently.
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              At ABC Centre, we recognize that developmental milestones, communication styles, and behavioral needs vary greatly from one child to another. Our multidisciplinary approach bridges applied behavior analysis and psychological care to create a nurturing environment where children can thrive.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F8F5] text-[#0F9D9A] flex items-center justify-center flex-shrink-0 font-bold">✓</div>
                <span className="text-slate-700 font-medium text-sm sm:text-base">Comprehensive developmental & diagnostic assessments</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F8F5] text-[#0F9D9A] flex items-center justify-center flex-shrink-0 font-bold">✓</div>
                <span className="text-slate-700 font-medium text-sm sm:text-base">Structured intervention plans focused on functional independence</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F8F5] text-[#0F9D9A] flex items-center justify-center flex-shrink-0 font-bold">✓</div>
                <span className="text-slate-700 font-medium text-sm sm:text-base">Compassionate team of BCBAs, psychologists, and therapists</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Animated Circular Visual */}
          <motion.div 
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-6 flex items-center justify-center relative min-h-[420px]"
          >
            {/* Outer Orbiting Ring */}
            <div className="absolute w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full border border-dashed border-[#0F9D9A]/30 animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-[240px] sm:w-[300px] h-[240px] sm:h-[300px] rounded-full border border-[#172554]/10" />

            {/* Central Element */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-[#172554] to-[#0F9D9A] text-white flex flex-col items-center justify-center shadow-2xl z-10 p-4 text-center"
            >
              <ShieldCheck size={36} className="text-[#F6C945] mb-1" />
              <span className="font-serif font-bold text-sm tracking-wide">ABC CENTRE</span>
              <span className="text-[10px] text-slate-200">Holistic Growth</span>
            </motion.div>

            {/* Orbiting Icons */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-0 w-full h-full pointer-events-none">
              
              {/* Brain Icon */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center text-[#0F9D9A]">
                <Brain size={26} />
              </div>

              {/* Heart Icon */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center text-[#F47C7C]">
                <Heart size={26} />
              </div>

              {/* Communication Icon */}
              <div className="absolute top-1/2 left-4 -translate-y-1/2 w-14 h-14 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center text-[#172554]">
                <MessageCircle size={26} />
              </div>

              {/* Learning Icon */}
              <div className="absolute top-1/2 right-4 -translate-y-1/2 w-14 h-14 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center text-[#F6C945]">
                <BookOpen size={26} />
              </div>

            </motion.div>

          </motion.div>

        </div>
      </section>

      {/* ================= 3. ABA THERAPY SECTION ================= */}
      <section className="py-24 bg-[#F8FAFC] border-t border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="bg-[#172554]/10 text-[#172554] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
              EVIDENCE-INFORMED INTERVENTION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#172554]">
              Applied Behavior Analysis (ABA)
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Structured support designed around meaningful, functional goals to enhance learning, independence, and social connection.
            </p>
          </div>

          {/* Attractive Large Feature Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#172554] to-[#102a5c] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Background Decorative Glow */}
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#0F9D9A]/30 rounded-full blur-3xl pointer-events-none" />

            <div className="lg:col-span-8 space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <span className="bg-[#0F9D9A] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow">
                  Evidence-Informed Approach
                </span>
                <span className="bg-[#F6C945] text-[#172554] text-xs font-bold px-3.5 py-1 rounded-full shadow">
                  Individualized Program
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                Empowering children through positive reinforcement and skill acquisition.
              </h3>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                ABA therapy focuses on understanding how behavior works, how it is affected by the environment, and how learning takes place. Our clinical programs break down complex tasks into manageable, rewarding steps to foster lifelong capabilities.
              </p>

              {/* Progress Indicator */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Functional Skill Mastery & Generalization</span>
                  <span className="text-[#F6C945]">95% Success Milestone</span>
                </div>
                <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "95%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#0F9D9A] to-[#F6C945] rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center relative z-10">
              <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-center p-6 shadow-xl">
                <Brain size={56} className="text-[#F6C945] mb-2 animate-pulse" />
                <span className="font-bold text-sm text-white">Clinical Excellence</span>
              </div>
            </div>
          </motion.div>

          {/* Responsive Grid of ABA Support Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Communication & Language", desc: "Building expressive & receptive functional communication.", icon: MessageCircle, color: "#0F9D9A" },
              { title: "Social Interaction & Play", desc: "Encouraging peer engagement, turn-taking, and cooperative play.", icon: Users, color: "#F47C7C" },
              { title: "Attention & Learning Readiness", desc: "Enhancing focus, following instructions, and cognitive engagement.", icon: Target, color: "#F6C945" },
              { title: "Adaptive & Daily Living Skills", desc: "Promoting independence in daily routines and household tasks.", icon: Footprints, color: "#172554" },
              { title: "Self-Care & Independence", desc: "Mastering hygiene, dressing, eating, and personal management.", icon: Smile, color: "#0F9D9A" },
              { title: "Positive Behavior Development", desc: "Replacing challenging behaviors with adaptive functional alternatives.", icon: ShieldCheck, color: "#F47C7C" },
              { title: "Emotional & Behavioral Regulation", desc: "Teaching self-calming strategies and constructive emotional responses.", icon: Heart, color: "#F6C945" },
              { title: "School Readiness", desc: "Preparing children for classroom environments and academic settings.", icon: BookOpen, color: "#172554" },
              { title: "Parent & Caregiver Guidance", desc: "Equipping families with effective coaching for home consistency.", icon: Users, color: "#0F9D9A" },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-7 rounded-2xl shadow-md border border-slate-100 hover:border-[#0F9D9A]/50 hover:shadow-xl transition-all group relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: item.color }} />
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                        <IconComponent size={24} className="transform group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-xs font-bold text-slate-300 group-hover:text-[#172554] transition-colors">0{idx + 1}</span>
                    </div>

                    <h4 className="font-bold text-[#172554] text-lg mb-2 group-hover:text-[#0F9D9A] transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-[#0F9D9A] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore Area</span>
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 4. PSYCHOLOGY SECTION ================= */}
      <section className="py-24 bg-[#E8F8F5] px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-6 space-y-6"
            >
              <span className="bg-[#0F9D9A]/20 text-[#0F9D9A] border border-[#0F9D9A]/30 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
                EMOTIONAL & PSYCHOLOGICAL CARE
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#172554]">
                Psychology & Behavioral Support
              </h2>

              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                Understanding emotions. Building coping skills. Strengthening relationships. Our clinical psychologists provide compassionate evaluation and evidence-based therapy to support children and families through emotional and developmental milestones.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white/80 p-4 rounded-xl shadow-sm border border-[#0F9D9A]/20">
                  <h4 className="font-bold text-[#172554] text-sm">Emotional Regulation</h4>
                  <p className="text-xs text-slate-600 mt-1">Helping children identify and manage intense feelings effectively.</p>
                </div>
                <div className="bg-white/80 p-4 rounded-xl shadow-sm border border-[#0F9D9A]/20">
                  <h4 className="font-bold text-[#172554] text-sm">Anxiety Management</h4>
                  <p className="text-xs text-slate-600 mt-1">Practical coping strategies tailored for young minds.</p>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Illustration */}
            <motion.div 
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-6 flex justify-center"
            >
              <div className="relative w-full max-w-lg aspect-square rounded-3xl bg-gradient-to-tr from-[#172554] to-[#0F9D9A] p-8 shadow-2xl flex flex-col justify-between text-white overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#F6C945]/30 rounded-full blur-2xl" />
                
                <div className="space-y-3 relative z-10">
                  <span className="bg-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase">Clinical Psychology</span>
                  <h3 className="font-serif text-3xl font-bold">Nurturing Resilience & Mental Well-being</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                    <Smile size={28} className="text-[#F6C945] mb-2" />
                    <h4 className="font-bold text-sm">Self-Esteem</h4>
                    <p className="text-[11px] text-slate-200 mt-1">Building confidence and self-worth.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                    <Users size={28} className="text-[#F47C7C] mb-2" />
                    <h4 className="font-bold text-sm">Family Support</h4>
                    <p className="text-[11px] text-slate-200 mt-1">Counseling and caregiver guidance.</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Interactive Psychology Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {[
              { title: "Emotional & Behavioral Support", icon: Heart },
              { title: "Social & Emotional Development", icon: Smile },
              { title: "Anxiety & Stress Management", icon: ShieldCheck },
              { title: "Emotional Regulation", icon: Activity },
              { title: "Attention & Behavioral Concerns", icon: Target },
              { title: "Self-Esteem & Confidence", icon: Sparkles },
              { title: "Social Skills", icon: Users },
              { title: "Parenting & Caregiver Guidance", icon: MessageCircle },
              { title: "Developmental & Behavioral Assessment", icon: Brain },
              { title: "Family Support & Counseling", icon: BookOpen }
            ].map((card, idx) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-[#0F9D9A]/30 hover:shadow-lg transition-all relative overflow-hidden group cursor-pointer"
                >
                  {/* Accent Line Animating from Left to Right on Hover */}
                  <div className="absolute top-0 left-0 h-1 w-0 bg-[#0F9D9A] group-hover:w-full transition-all duration-500" />

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F8F5] text-[#0F9D9A] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-115">
                      <IconComp size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#172554] text-base group-hover:text-[#0F9D9A] transition-colors">
                        {card.title}
                      </h4>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 5. "LOOK BEYOND THE BEHAVIOUR" FEATURE SECTION ================= */}
      <section className="py-24 bg-[#172554] text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0F9D9A]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#F6C945] font-extrabold text-xs uppercase tracking-widest bg-[#F6C945]/10 px-4 py-1.5 rounded-full border border-[#F6C945]/30">
              PHILOSOPHY OF CARE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
              Look Beyond the Behaviour.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Our goal is not simply to manage a behavior, but to understand the individual behind it, uncover their unique strengths, and build meaningful avenues for growth.
            </p>
          </div>

          {/* 4 Large Animated Feature Cards + Central Diagram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Understand", desc: "Identify strengths, needs, communication styles and learning patterns." },
              { step: "02", title: "Support", desc: "Develop individualized and meaningful intervention strategies." },
              { step: "03", title: "Develop", desc: "Build communication, functional, emotional and social skills." },
              { step: "04", title: "Empower", desc: "Encourage independence, confidence and meaningful participation." }
            ].map((feat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-[#0F9D9A] transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-extrabold text-[#F6C945] tracking-widest">{feat.step}</span>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-[#0F9D9A] transition-colors">
                      <Target size={20} />
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-3 text-white group-hover:text-[#0F9D9A] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-xs font-bold text-[#F6C945]">
                  <span>Core Pillar</span>
                  <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 6. INDIVIDUALIZED PROGRAM SECTION ================= */}
      <section className="py-24 bg-[#F8FAFC] px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="bg-[#172554]/10 text-[#172554] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
              STRUCTURED PATHWAY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#172554]">
              Every Program Starts With the Individual.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Our step-by-step clinical process ensures clarity, consistency, and measurable progress at every stage of development.
            </p>
          </div>

          {/* Visual Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              { title: "Assessment", desc: "Comprehensive clinical evaluation of strengths & needs." },
              { title: "Goal Setting", desc: "Defining clear, functional, and achievable milestones." },
              { title: "Intervention", desc: "Delivering customized ABA and psychology sessions." },
              { title: "Progress Review", desc: "Regular data-driven analysis of skill acquisition." },
              { title: "Adaptation", desc: "Refining strategies to ensure continuous growth." }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex flex-col justify-between relative group hover:border-[#0F9D9A] transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#172554] text-white font-bold flex items-center justify-center text-sm mb-4 shadow-sm group-hover:bg-[#0F9D9A] transition-colors">
                    0{idx + 1}
                  </div>
                  <h4 className="font-bold text-[#172554] text-base mb-2">{step.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] font-bold text-[#0F9D9A]">
                  <span>Step {idx + 1} of 5</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 7. MULTIDISCIPLINARY APPROACH ================= */}
      <section className="py-24 bg-[#102a5c] text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0F9D9A]/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#0F9D9A] font-extrabold text-xs uppercase tracking-widest bg-[#0F9D9A]/10 px-4 py-1.5 rounded-full border border-[#0F9D9A]/30">
              HOLISTIC COLLABORATION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
              Care That Works Together.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              ABA Therapy and Psychology can work alongside other developmental services when appropriate to provide a unified support network.
            </p>
          </div>

          {/* Interactive Floating Service Cards Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Speech & Language Therapy", desc: "Enhancing verbal and non-verbal communication skills.", icon: MessageCircle },
              { title: "Occupational Therapy & Sensory Integration", desc: "Supporting sensory processing and motor independence.", icon: Activity },
              { title: "Physiotherapy", desc: "Improving gross motor function, balance, and physical mobility.", icon: Footprints },
              { title: "Special Education", desc: "Targeted academic support and individualized learning strategies.", icon: BookOpen },
              { title: "Nutrition & Dietetics", desc: "Guidance on feeding dynamics, nutrition, and dietary health.", icon: Apple },
              { title: "Early Childhood Education", desc: "Foundational developmental stimulation for young learners.", icon: Baby }
            ].map((service, idx) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:border-[#0F9D9A] transition-all group cursor-pointer shadow-xl flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0F9D9A]/30 text-[#E8F8F5] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0F9D9A] transition-colors">
                    <ServiceIcon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base mb-1 group-hover:text-[#F6C945] transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 8. GOALS SECTION ================= */}
      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="bg-[#172554]/10 text-[#172554] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
              CORE OUTCOMES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#172554]">
              Supporting Meaningful Development
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Our interventions target critical developmental milestones designed to elevate everyday quality of life.
            </p>
          </div>

          {/* 6 Large Animated Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Communication", desc: "Expressive, receptive, and functional social interaction.", number: "01", icon: MessageCircle },
              { title: "Functional Skills", desc: "Practical abilities necessary for daily living and autonomy.", number: "02", icon: Target },
              { title: "Emotional Well-being", desc: "Regulation, self-awareness, and psychological resilience.", number: "03", icon: Heart },
              { title: "Learning", desc: "Cognitive development, curiosity, and academic readiness.", number: "04", icon: BookOpen },
              { title: "Independence", desc: "Self-care, decision-making, and personal confidence.", number: "05", icon: ShieldCheck },
              { title: "Everyday Participation", desc: "Successful engagement in family, school, and community life.", number: "06", icon: Users }
            ].map((goal, idx) => {
              const GoalIcon = goal.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-200 hover:border-[#0F9D9A] transition-all relative overflow-hidden group shadow-sm hover:shadow-xl flex flex-col justify-between"
                >
                  <div className="absolute -right-4 -bottom-4 font-serif text-8xl font-black text-slate-200/50 select-none pointer-events-none group-hover:text-[#0F9D9A]/10 transition-colors">
                    {goal.number}
                  </div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-[#172554] text-white flex items-center justify-center mb-6 shadow-md group-hover:bg-[#0F9D9A] transition-colors">
                      <GoalIcon size={24} />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#172554] mb-3 group-hover:text-[#0F9D9A] transition-colors">
                      {goal.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {goal.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 9. PARENT & CAREGIVER SUPPORT ================= */}
      <section className="py-24 bg-[#F6C945]/15 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="bg-[#F6C945] text-[#172554] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
              FAMILY PARTNERSHIP
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#172554]">
              Families Are Part of the Journey.
            </h2>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              We believe parent and caregiver collaboration is essential for long-term success. We provide practical guidance, training, and emotional support so families feel confident reinforcing positive strategies at home.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-[#172554] text-white flex items-center justify-center font-bold text-xs border-2 border-white">FC</div>
                <div className="w-10 h-10 rounded-full bg-[#0F9D9A] text-white flex items-center justify-center font-bold text-xs border-2 border-white">PG</div>
                <div className="w-10 h-10 rounded-full bg-[#F47C7C] text-white flex items-center justify-center font-bold text-xs border-2 border-white">MS</div>
              </div>
              <div className="text-xs text-slate-700 font-semibold">
                Dedicated parent coaching programs & support workshops.
              </div>
            </div>
          </motion.div>

          {/* 3 Cards */}
          <motion.div 
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { title: "Guidance", desc: "Expert coaching for daily routines & behavior management.", icon: Compass },
              { title: "Collaboration", desc: "Regular team meetings and progress updates.", icon: Users },
              { title: "Confidence", desc: "Empowering families with proven developmental tools.", icon: Heart }
            ].map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-md border border-[#F6C945]/40 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#F6C945]/30 text-[#172554] flex items-center justify-center mb-4">
                      <CardIcon size={20} />
                    </div>
                    <h4 className="font-bold text-[#172554] text-lg mb-2">{card.title}</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* ================= 10. WHY ABC CENTRE ================= */}
      <section className="py-24 bg-[#172554] text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#0F9D9A] font-extrabold text-xs uppercase tracking-widest bg-[#0F9D9A]/10 px-4 py-1.5 rounded-full border border-[#0F9D9A]/30">
              THE ABC ADVANTAGE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
              Why Families Trust ABC Centre
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Built on clinical rigor, warmth, and an unwavering commitment to each child's potential.
            </p>
          </div>

          {/* 4 Animated Qualitative Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Individualized Support", desc: "Tailored interventions engineered around unique child profiles.", icon: Target },
              { title: "Multidisciplinary Care", desc: "Seamless integration of ABA therapy, psychology, and developmental services.", icon: Layers },
              { title: "Family-Centred Approach", desc: "Active caregiver participation ensuring consistency across environments.", icon: Heart },
              { title: "Progress-Focused Intervention", desc: "Data-driven tracking to evaluate milestones and refine strategies.", icon: Activity }
            ].map((feat, idx) => {
              const FeatIcon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-[#0F9D9A] transition-all flex flex-col justify-between shadow-xl group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#0F9D9A]/20 text-[#0F9D9A] flex items-center justify-center mb-6 group-hover:bg-[#0F9D9A] group-hover:text-white transition-colors">
                      <FeatIcon size={24} />
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-3 text-white">
                      {feat.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-xs font-bold text-[#0F9D9A]">
                    <span>Verified Standard</span>
                    <CheckCircle2 size={14} className="ml-2" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 11. FINAL CTA SECTION ================= */}
      <section id="contact-form" className="py-24 bg-gradient-to-br from-[#172554] via-[#102a5c] to-[#0F9D9A] text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Glowing Orb */}
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F47C7C]/20 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          
          <div className="space-y-4">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-[#F6C945] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block">
              TAKE THE NEXT STEP
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Individualized Goals.<br />
              <span className="text-[#F6C945]">Positive Progress.</span><br />
              Meaningful Development.
            </h2>

            <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Discover how personalized ABA Therapy and Psychology support can help your child develop meaningful skills and greater independence.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="/book-a-free-consult"
              className="w-full sm:w-auto bg-[#F47C7C] hover:bg-[#e06b6b] text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-[#F47C7C]/30 transition-all flex items-center justify-center gap-2"
            >
              <Calendar size={18} />
              <span>Book an Assessment</span>
            </motion.a>

            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="#services"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold px-8 py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Child Development Services</span>
            </motion.a>
          </div>

          {/* Glassmorphism Contact Quick Bar */}
          <div className="mt-12 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-4 text-sm">
            <div className="flex items-center gap-2">
              <PhoneCall size={18} className="text-[#F6C945]" />
              <span>Speak with our Clinical Team</span>
            </div>
           
          </div>

        </div>
      </section>

    </div>
  );
}