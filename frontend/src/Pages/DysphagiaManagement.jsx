import React, { useState } from "react"; 
import { motion, AnimatePresence } from "framer-motion"; 
import { 
  ShieldCheck, 
  Activity, 
  Apple, 
  Utensils, 
  Droplets, 
  HeartPulse, 
  ClipboardCheck, 
  UserRound, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Brain, 
  Sparkles, 
  BookOpen, 
  HeartHandshake, 
  Star, 
  ChevronRight, 
} from "lucide-react"; 

/* =========================================================
    HERO SHOWCASE (photo + floating cards) + EXTRA EFFECTS
    -> Apni photo lagani ho to HERO_IMGS ki pehli entry ko
       apne path se badal dein, e.g. "/images/hero.jpg"
========================================================= */
const HERO_IMGS = [
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
];

const SHOW_ICONS = {
  heart: ["M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"],
  sparkles: ["M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z", "M19 16l.7 1.8L21.5 18.5l-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z"],
  check: ["M22 11.08V12a10 10 0 1 1-5.93-9.14", "M22 4 12 14.01l-3-3"],
  activity: ["M22 12h-4l-3 9L9 3l-3 9H2"],
  shield: ["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"],
  message: ["M7.9 20A9 9 0 1 0 4 16.1L2 22Z"],
  book: ["M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"],
  utensils: ["M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", "M7 2v20", "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"],
  smile: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M8 14s1.5 2 4 2 4-2 4-2", "M9 9h.01", "M15 9h.01"],
};

const ShowIcon = ({ name }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {(SHOW_ICONS[name] || SHOW_ICONS.sparkles).map((d, i) => (
      <path key={i} d={d} />
    ))}
  </svg>
);

const ShowBadge = ({ data, position }) => (
  <div className={`fx-show-badge fx-show-badge-${position}`}>
    <span className="fx-show-ico" style={{ color: data.color, background: `${data.color}1f` }}>
      <ShowIcon name={data.icon} />
    </span>
    <div>
      <strong>{data.title}</strong>
      <span className="fx-sub">{data.sub}</span>
    </div>
  </div>
);

const HeroShowcase = ({ top, bottom, light = false, alt = "" }) => (
  <div className={`fx-show ${light ? "fx-show-light" : ""}`}>
    <div className="fx-show-frame">
      <img
        src={HERO_IMGS[0]}
        alt={alt}
        data-i="0"
        onError={(e) => {
          const next = Number(e.currentTarget.dataset.i || 0) + 1;
          if (HERO_IMGS[next]) {
            e.currentTarget.dataset.i = String(next);
            e.currentTarget.src = HERO_IMGS[next];
          } else {
            e.currentTarget.style.display = "none";
          }
        }}
      />
    </div>
    <ShowBadge data={top} position="top" />
    <ShowBadge data={bottom} position="bottom" />
  </div>
);

const FX_CSS = `
        @keyframes fxKenBurns {
          from { transform: scale(1.04) translate3d(0, 0, 0); }
          to   { transform: scale(1.18) translate3d(-2.5%, -1.5%, 0); }
        }
        @keyframes fxFloat {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50%      { transform: translate3d(14px, -26px, 0) scale(1.15); }
        }
        @keyframes fxShimmer {
          from { background-position: 0% 50%; }
          to   { background-position: 100% 50%; }
        }
        @keyframes fxProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes fxBob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }

        /* ---------- SCROLL PROGRESS BAR ---------- */
        @supports (animation-timeline: scroll()) {
          .fx-root::before {
            content: ""; position: fixed; top: 0; left: 0;
            width: 100%; height: 4px; z-index: 9999;
            transform-origin: 0 50%; transform: scaleX(0);
            background: linear-gradient(90deg, #00A8CD, #F5A623, #FF5271);
            animation: fxProgress linear both;
            animation-timeline: scroll(root block);
          }
        }

        @media (prefers-reduced-motion: no-preference) {
          :root { scroll-behavior: smooth; }
        }

        @keyframes fxShowIn {
          from { opacity: 0; transform: translateY(26px) scale(.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fxKeyframesDummy { from { opacity: 1; } to { opacity: 1; } }

        /* ---------- HERO SHOWCASE (photo + floating cards) ---------- */
        .fx-show {
          position: relative; width: 100%; max-width: 520px;
          margin: 0 auto; padding: 22px 0;
          animation: fxShowIn .95s cubic-bezier(.22, 1, .36, 1) .15s both;
        }
        .fx-show-frame {
          position: relative; aspect-ratio: 4 / 3.5; overflow: hidden;
          border-radius: 36px; border: 3px solid rgba(255, 255, 255, .5);
          background: linear-gradient(135deg, #0b5c7a, #1b8aa5);
          box-shadow: 0 34px 70px -22px rgba(0, 0, 0, .6);
        }
        .fx-show-frame img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          max-width: none; transition: transform 1.3s cubic-bezier(.22, 1, .36, 1);
        }
        .fx-show:hover .fx-show-frame img { transform: scale(1.07); }
        .fx-show-frame::after {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(180deg, rgba(255,255,255,.08) 0%, transparent 35%, rgba(0,20,40,.22) 100%);
        }
        .fx-show-light .fx-show-frame {
          border-color: #fff; box-shadow: 0 34px 60px -22px rgba(15, 60, 90, .4);
        }
        .fx-show-badge {
          position: absolute; z-index: 2; display: flex; align-items: center; gap: 12px;
          padding: 12px 20px 12px 12px; border-radius: 20px; background: #fff;
          box-shadow: 0 24px 50px -14px rgba(0, 20, 40, .45);
          animation: fxBob 4.6s ease-in-out infinite;
          transition: box-shadow .35s ease;
          cursor: default;
        }
        .fx-show-badge:hover { box-shadow: 0 30px 60px -12px rgba(0, 20, 40, .6); }
        .fx-show-badge-top { top: 34px; left: -28px; }
        .fx-show-badge-bottom { bottom: 38px; right: -28px; animation-delay: -2.3s; }
        .fx-show-ico {
          display: grid; place-items: center; width: 44px; height: 44px;
          border-radius: 14px; flex: 0 0 44px;
          transition: transform .5s cubic-bezier(.34, 1.56, .64, 1);
        }
        .fx-show-badge:hover .fx-show-ico { transform: rotate(-10deg) scale(1.12); }
        .fx-show-ico svg { width: 22px; height: 22px; }
        .fx-show-badge strong {
          display: block; color: #0f2f45; font-size: 14px; font-weight: 800; line-height: 1.25;
        }
        .fx-show-badge span.fx-sub {
          display: block; margin-top: 2px; color: #6b7c88; font-size: 12px; font-weight: 500; line-height: 1.25;
        }
        @media (max-width: 640px) {
          .fx-show-badge-top { left: -6px; top: 22px; }
          .fx-show-badge-bottom { right: -6px; bottom: 26px; }
          .fx-show-badge { padding: 9px 14px 9px 9px; }
          .fx-show-ico { width: 38px; height: 38px; flex-basis: 38px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fx-show, .fx-show-badge { animation: none !important; }
        }

        /* ---------- ANIMATED GRADIENT HEADLINES ---------- */
        .fx-root .bg-clip-text {
          background-size: 220% 100%;
          animation: fxShimmer 5s ease-in-out infinite alternate;
        }

        /* ---------- CARD HOVER (glow + lift feel) ---------- */
        .fx-root :is([class*="rounded-2xl"], [class*="rounded-3xl"], [class*="rounded-[2"], article)[class*="border"]:not([class*="transition"]) {
          transition: box-shadow .4s ease, border-color .4s ease, background-color .4s ease;
        }
        .fx-root :is([class*="rounded-2xl"], [class*="rounded-3xl"], [class*="rounded-[2"], article)[class*="border"]:not([class*="transition"]):hover {
          box-shadow: 0 26px 50px -16px rgba(0, 20, 40, .38), 0 0 34px -8px rgba(0, 168, 205, .45);
        }

        /* ---------- ICON WIGGLE ON CARD HOVER ---------- */
        .fx-root .lucide:not([class*="transition"]):not([class*="animate"]) {
          transition: transform .5s cubic-bezier(.34, 1.56, .64, 1);
        }
        .fx-root :is([class*="rounded-2xl"], [class*="rounded-3xl"], [class*="rounded-[2"], article)[class*="border"]:hover .lucide:not([class*="transition"]):not([class*="animate"]) {
          transform: scale(1.22) rotate(-9deg);
        }

        /* ---------- PILLS / CHIPS ---------- */
        .fx-root :is([class*="rounded-full"], [class*="rounded-xl"])[class*="border"]:not([class*="transition"]):not(a):not(button) {
          transition: box-shadow .35s ease, background-color .35s ease;
        }
        .fx-root :is([class*="rounded-full"], [class*="rounded-xl"])[class*="border"]:not([class*="transition"]):not(a):not(button):hover {
          box-shadow: 0 10px 26px -8px rgba(0, 168, 205, .5);
        }

        /* ---------- BUTTON SHINE SWEEP ---------- */
        .fx-root :is(a, button):is([class*="rounded-xl"], [class*="rounded-full"], [class*="rounded-2xl"], [class*="rounded-lg"])[class*="px-"] {
          position: relative; overflow: hidden; isolation: isolate;
        }
        .fx-root :is(a, button):is([class*="rounded-xl"], [class*="rounded-full"], [class*="rounded-2xl"], [class*="rounded-lg"])[class*="px-"]::after {
          content: ""; position: absolute; top: 0; left: -130%;
          width: 55%; height: 100%; z-index: 1; pointer-events: none;
          background: linear-gradient(100deg, transparent, rgba(255, 255, 255, .42), transparent);
          transform: skewX(-20deg);
          transition: left .85s cubic-bezier(.22, 1, .36, 1);
        }
        .fx-root :is(a, button):is([class*="rounded-xl"], [class*="rounded-full"], [class*="rounded-2xl"], [class*="rounded-lg"])[class*="px-"]:hover::after {
          left: 150%;
        }

        @media (prefers-reduced-motion: reduce) {
          .fx-hero-photo img, .fx-orb, .fx-root .bg-clip-text { animation: none !important; }
        }
`;


 
export default function IntegratedDysphagiaPage() { 
  const [activePathwayStep, setActivePathwayStep] = useState(0); 
 
  const pathwaySteps = [ 
    { 
      step: "01", 
      title: "Initial Assessment", 
      subtitle: "Comprehensive Diagnostics", 
      icon: ClipboardCheck, 
      details: [ 
        "Swallowing difficulties", 
        "Nutritional status", 
        "Weight changes", 
        "Food and fluid intake", 
        "Hydration status", 
        "Feeding route", 
        "Medical and dietary history", 
      ], 
    }, 
    { 
      step: "02", 
      title: "Swallowing Management", 
      subtitle: "Speech Pathology Support", 
      icon: Brain, 
      details: [ 
        "Swallowing strategies", 
        "Therapeutic exercises", 
        "Positioning recommendations", 
        "Consistency recommendations", 
        "Caregiver education", 
        "Ongoing rehabilitation", 
      ], 
    }, 
    { 
      step: "03", 
      title: "Nutrition Plan", 
      subtitle: "Dietary Alignment", 
      icon: Utensils, 
      details: [ 
        "Caloric targets", 
        "Protein optimization", 
        "Safe fluid scheduling", 
        "Micronutrients", 
        "Meal frequency pacing", 
        "Overall nutritional intake", 
      ], 
    }, 
    { 
      step: "04", 
      title: "NG Tube Support", 
      subtitle: "Enteral Nutrition", 
      icon: Droplets, 
      details: [ 
        "Energy calculation", 
        "Formula selection", 
        "Feeding schedule", 
        "Feed volume & frequency", 
        "Water requirements", 
        "Tolerance monitoring", 
      ], 
    }, 
    { 
      step: "05", 
      title: "Multidisciplinary Follow-Up", 
      subtitle: "Continuous Care", 
      icon: Activity, 
      details: [ 
        "Iterative SLP & Dietitian reviews", 
        "Progress tracking", 
        "Plan adaptation", 
        "Clinical check-ins", 
        "Long-term monitoring", 
      ], 
    }, 
  ]; 
 
  const journeyItems = [ 
    { 
      step: "ASSESS", 
      desc: "Comprehensive clinical intake.", 
      icon: ClipboardCheck, 
    }, 
    { 
      step: "UNDERSTAND", 
      desc: "Uncovering unique requirements.", 
      icon: Brain, 
    }, 
    { 
      step: "PLAN", 
      desc: "Coordinating SLP & Dietitian goals.", 
      icon: ClipboardCheck, 
    }, 
    { 
      step: "SUPPORT", 
      desc: "Executing safe feeding strategies.", 
      icon: HeartHandshake, 
    }, 
    { 
      step: "MONITOR", 
      desc: "Tracking clinical & nutritional status.", 
      icon: Activity, 
    }, 
    { 
      step: "ADAPT", 
      desc: "Fine-tuning as recovery progresses.", 
      icon: Sparkles, 
    }, 
  ]; 
 
  const goals = [ 
    { 
      title: "Safe Swallowing", 
      desc: "Minimizing aspiration risk and protecting airway safety.", 
      icon: ShieldCheck, 
      color: "sky", 
    }, 
    { 
      title: "Adequate Nutrition", 
      desc: "Fulfilling daily macro and micronutrient requirements.", 
      icon: Apple, 
      color: "yellow", 
    }, 
    { 
      title: "Hydration", 
      desc: "Maintaining safe fluid balance and preventing dehydration.", 
      icon: Droplets, 
      color: "sky", 
    }, 
    { 
      title: "Functional Eating", 
      desc: "Promoting comfort and independence during meal times.", 
      icon: Utensils, 
      color: "red", 
    }, 
    { 
      title: "Nutritional Stability", 
      desc: "Preventing malnutrition and supporting steady weight management.", 
      icon: Activity, 
      color: "yellow", 
    }, 
    { 
      title: "Ongoing Monitoring", 
      desc: "Regular clinical reviews to adapt care as health evolves.", 
      icon: HeartPulse, 
      color: "red", 
    }, 
  ]; 
 
  return ( 
    <div className="fx-root min-h-screen bg-[#081827] text-slate-100 font-sans selection:bg-yellow-400/30 selection:text-yellow-300 overflow-x-hidden">
      <style>{FX_CSS}</style> 
 
      {/* ========================================================= 
          HERO SECTION 
      ========================================================= */} 
      <section className="relative overflow-hidden bg-[#081827] pt-14 pb-16 lg:pt-20 lg:pb-20"> 
 
        {/* Decorative Background */} 
        <div className="absolute inset-0 pointer-events-none overflow-hidden"> 
          <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-sky-400/10 blur-[120px]" /> 
          <div className="absolute top-20 right-[-120px] h-[420px] w-[420px] rounded-full bg-yellow-400/10 blur-[120px]" /> 
          <div className="absolute bottom-[-200px] left-1/3 h-[400px] w-[400px] rounded-full bg-red-400/10 blur-[120px]" /> 
 
          <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]" /> 
        </div> 
 
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
 
          {/* Top Badge */} 
          <motion.div 
            initial={{ opacity: 0, y: -15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            className="flex justify-center mb-7" 
          > 
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] text-yellow-300 backdrop-blur-xl shadow-lg" 
            > 
              <Sparkles className="h-3.5 w-3.5 text-yellow-400" /> 
              <span> 
                Speech & Swallowing • Nutrition • NG Tube Feeding 
              </span> 
            </div> 
          </motion.div> 
 
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center"> 
 
            {/* Hero Content */} 
            <div className="lg:col-span-7 text-center lg:text-left"> 
 
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.7 }} 
              > 
                <div className="inline-flex items-center gap-2 mb-5 text-xs font-bold uppercase tracking-widest text-sky-300"> 
                  <span className="h-px w-8 bg-sky-400" /> 
                  Integrated Clinical Care 
                  <span className="h-px w-8 bg-sky-400 lg:hidden" /> 
                </div> 
 
                <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black tracking-tight leading-[1.05] text-white"> 
                  Swallowing Safely. 
                  <br /> 
 
                  <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-300 bg-clip-text text-transparent"> 
                    Meeting Nutritional Needs. 
                  </span> 
 
                  <br /> 
 
                  <span className="font-serif italic font-normal text-slate-300 text-3xl sm:text-4xl lg:text-5xl"> 
                    One Coordinated Care Plan. 
                  </span> 
                </h1> 
              </motion.div> 
 
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.7, delay: 0.1 }} 
                className="mt-6 max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed text-slate-300" 
              > 
                Our multidisciplinary program brings together Speech & 
                Language Pathology and Clinical Nutrition to provide 
                coordinated care for individuals experiencing swallowing 
                difficulties or requiring nutritional support. 
              </motion.p> 
 
              {/* CTA */} 
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.7, delay: 0.2 }} 
                className="mt-7 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3" 
              > 
                <a 
                  href="/book-a-free-consult" 
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 px-7 py-3.5 text-sm font-extrabold text-[#081827] shadow-[0_12px_35px_rgba(250,204,21,0.25)] transition-all duration-300 hover:-translate-y-1" 
                > 
                  Book an Assessment 
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /> 
                </a> 
 
                <a 
                  href="#pathway" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-sky-300/30 bg-sky-400/10 px-7 py-3.5 text-sm font-bold text-sky-200 backdrop-blur-md transition-all duration-300 hover:bg-sky-400/20 hover:-translate-y-1" 
                > 
                  Explore Care Pathway 
                  <ChevronRight className="w-4 h-4" /> 
                </a> 
              </motion.div> 
 
              {/* Trust Points */} 
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.8, delay: 0.4 }} 
                className="mt-7 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 text-xs text-slate-400" 
              > 
                {[ 
                  "Individualized Care", 
                  "Multidisciplinary Support", 
                  "Family-Centered Approach", 
                ].map((item, index) => ( 
                  <div key={index} className="flex items-center gap-1.5"> 
                    <CheckCircle className="w-3.5 h-3.5 text-sky-400" /> 
                    {item} 
                  </div> 
                ))} 
              </motion.div> 
            </div> 
 
            <div className="lg:col-span-5">
<HeroShowcase top={{ icon: "shield", title: "Safe Swallowing", sub: "Speech pathology support", color: "#0EA5E9" }} bottom={{ icon: "utensils", title: "Nutrition Plan", sub: "Dietitian guided", color: "#E8A317" }} />
</div>

          </div> 
 
          {/* Hero Feature Cards */} 
          <motion.div 
            initial={{ opacity: 0, y: 25 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.45 }} 
            className="grid md:grid-cols-3 gap-4 mt-12" 
          > 
            {[ 
              { 
                title: "Swallowing Therapy", 
                desc: "Dysphagia management and consistency recommendations.", 
                icon: Brain, 
                color: "sky", 
              }, 
              { 
                title: "Nutrition Management", 
                desc: "Individualized meal planning and dietary alignment.", 
                icon: Apple, 
                color: "yellow", 
              }, 
              { 
                title: "NG Tube Support", 
                desc: "Enteral nutrition planning and tolerance monitoring.", 
                icon: Droplets, 
                color: "red", 
              }, 
            ].map((item, index) => { 
              const Icon = item.icon; 
 
              const styles = { 
                sky: { 
                  border: "border-sky-300/15", 
                  iconBg: "bg-sky-400/10", 
                  icon: "text-sky-300", 
                }, 
                yellow: { 
                  border: "border-yellow-300/15", 
                  iconBg: "bg-yellow-400/10", 
                  icon: "text-yellow-300", 
                }, 
                red: { 
                  border: "border-red-300/15", 
                  iconBg: "bg-red-400/10", 
                  icon: "text-red-300", 
                }, 
              }; 
 
              const style = styles[item.color]; 
 
              return ( 
                <motion.div 
                  key={index} 
                  whileHover={{ y: -5 }} 
                  className={`group rounded-2xl border ${style.border} bg-white/[0.04] backdrop-blur-md p-5 transition-all duration-300 hover:bg-white/[0.07]`} 
                > 
                  <div className="flex items-start gap-4"> 
                    <div 
                      className={`h-11 w-11 rounded-xl ${style.iconBg} ${style.icon} flex items-center justify-center shrink-0`} 
                    > 
                      <Icon className="w-5 h-5" /> 
                    </div> 
 
                    <div> 
                      <h3 className="text-sm font-extrabold text-white mb-1"> 
                        {item.title} 
                      </h3> 
                      <p className="text-xs leading-relaxed text-slate-400"> 
                        {item.desc} 
                      </p> 
                    </div> 
                  </div> 
                </motion.div> 
              ); 
            })} 
          </motion.div> 
        </div> 
      </section> 
 
      {/* ========================================================= 
          COLLABORATIVE APPROACH 
      ========================================================= */} 
      <section className="relative py-20 lg:py-24 bg-[#F8FAFC] text-slate-800 overflow-hidden"> 
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-sky-100 blur-3xl opacity-60" /> 
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-yellow-100 blur-3xl opacity-60" /> 
 
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
 
          <div className="text-center max-w-3xl mx-auto mb-14"> 
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-600 mb-4"> 
              <Sparkles className="w-3.5 h-3.5" /> 
              Collaborative Care 
            </span> 
 
            <h2 className="text-3xl sm:text-4xl font-black text-[#12304A] tracking-tight mb-4"> 
              A Collaborative Approach to{" "} 
              <span className="text-sky-500">Safe Swallowing</span> &{" "} 
              <span className="text-yellow-500">Adequate Nutrition</span> 
            </h2> 
 
            <p className="text-slate-500 text-base sm:text-lg"> 
              Two clinical perspectives. One coordinated care plan. 
            </p> 
          </div> 
 
          <div className="grid lg:grid-cols-2 gap-7"> 
 
            {/* SLP Card */} 
            <motion.div 
              whileHover={{ y: -7 }} 
              className="relative overflow-hidden rounded-[2rem] bg-white border border-sky-100 p-7 sm:p-9 shadow-xl shadow-sky-100/40" 
            > 
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-sky-400 to-sky-300" /> 
 
              <div className="flex items-center gap-4 mb-7"> 
                <div className="h-14 w-14 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center"> 
                  <Brain className="w-7 h-7" /> 
                </div> 
 
                <div> 
                  <p className="text-xs font-bold uppercase tracking-widest text-sky-500"> 
                    Discipline 01 
                  </p> 
                  <h3 className="text-xl sm:text-2xl font-black text-[#12304A]"> 
                    Speech & Language Pathologist 
                  </h3> 
                </div> 
              </div> 
 
              <ul className="space-y-3"> 
                {[ 
                  "Swallowing assessment", 
                  "Dysphagia management", 
                  "Swallowing rehabilitation", 
                  "Food and fluid consistency recommendations", 
                  "Compensatory strategies", 
                  "Swallowing exercises where appropriate", 
                ].map((item, idx) => ( 
                  <li 
                    key={idx} 
                    className="flex items-center gap-3 rounded-xl bg-sky-50/60 px-4 py-3 text-sm font-medium text-slate-700" 
                  > 
                    <CheckCircle className="w-4 h-4 text-sky-500 shrink-0" /> 
                    {item} 
                  </li> 
                ))} 
              </ul> 
            </motion.div> 
 
            {/* Dietitian Card */} 
            <motion.div 
              whileHover={{ y: -7 }} 
              className="relative overflow-hidden rounded-[2rem] bg-white border border-yellow-100 p-7 sm:p-9 shadow-xl shadow-yellow-100/40" 
            > 
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-400 to-red-400" /> 
 
              <div className="flex items-center gap-4 mb-7"> 
                <div className="h-14 w-14 rounded-2xl bg-yellow-50 text-yellow-500 flex items-center justify-center"> 
                  <Apple className="w-7 h-7" /> 
                </div> 
 
                <div> 
                  <p className="text-xs font-bold uppercase tracking-widest text-yellow-500"> 
                    Discipline 02 
                  </p> 
                  <h3 className="text-xl sm:text-2xl font-black text-[#12304A]"> 
                    Clinical Nutritionist / Dietitian 
                  </h3> 
                </div> 
              </div> 
 
              <ul className="space-y-3"> 
                {[ 
                  "Nutritional assessment", 
                  "Energy & protein requirements", 
                  "Texture-modified meal planning", 
                  "Hydration management", 
                  "Malnutrition prevention/management", 
                  "Oral nutrition support", 
                  "NG tube feeding and enteral nutrition planning", 
                  "Nutritional progress monitoring", 
                ].map((item, idx) => ( 
                  <li 
                    key={idx} 
                    className="flex items-center gap-3 rounded-xl bg-yellow-50/60 px-4 py-3 text-sm font-medium text-slate-700" 
                  > 
                    <CheckCircle className="w-4 h-4 text-yellow-500 shrink-0" /> 
                    {item} 
                  </li> 
                ))} 
              </ul> 
            </motion.div> 
          </div> 
        </div> 
      </section> 
 
      {/* ========================================================= 
          TWO SIDES 
      ========================================================= */} 
      <section className="relative py-20 lg:py-24 bg-[#081827] overflow-hidden"> 
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-sky-400/5 blur-[100px]" /> 
 
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
 
          <div className="text-center max-w-3xl mx-auto mb-14"> 
            <span className="text-yellow-300 text-xs font-black uppercase tracking-widest"> 
              One Philosophy 
            </span> 
 
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white"> 
              Two Sides of the Same{" "} 
              <span className="text-sky-300">Care Plan</span> 
            </h2> 
 
            <p className="mt-4 text-slate-400 text-base sm:text-lg"> 
              Seamlessly integrating swallowing safety and nutritional 
              fulfillment. 
            </p> 
          </div> 
 
          <div className="grid lg:grid-cols-12 gap-7 items-center"> 
 
            {/* Left */} 
            <div className="lg:col-span-4 rounded-[2rem] border border-sky-300/15 bg-white/[0.04] backdrop-blur-xl p-7 shadow-2xl text-center"> 
              <div className="mx-auto h-14 w-14 rounded-2xl bg-sky-400/10 text-sky-300 flex items-center justify-center"> 
                <ShieldCheck className="w-7 h-7" /> 
              </div> 
 
              <h3 className="mt-5 text-xl font-black text-white uppercase tracking-wider"> 
                Safe Swallowing 
              </h3> 
 
              <div className="mt-6 space-y-3 text-sm text-slate-300 font-medium"> 
                <div className="rounded-xl border border-white/10 bg-white/5 p-3"> 
                  Assessment 
                </div> 
                <div className="text-sky-300 font-black">↓</div> 
                <div className="rounded-xl border border-white/10 bg-white/5 p-3"> 
                  Swallowing Management 
                </div> 
                <div className="text-sky-300 font-black">↓</div> 
                <div className="rounded-xl border border-white/10 bg-white/5 p-3"> 
                  Safe Oral Intake 
                </div> 
              </div> 
            </div> 
 
            {/* Center */} 
            <div className="lg:col-span-4 flex justify-center"> 
              <div className="relative h-52 w-52"> 
 
                <div className="absolute inset-0 rounded-full border border-dashed border-sky-300/20 animate-[spin_20s_linear_infinite]" /> 
 
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-sky-400 via-sky-500 to-yellow-400 p-[2px] shadow-[0_0_70px_rgba(56,189,248,0.2)]"> 
                  <div className="h-full w-full rounded-full bg-[#081827] flex flex-col items-center justify-center"> 
                    <HeartPulse className="w-9 h-9 text-yellow-300 mb-2" /> 
                    <span className="text-xs font-black tracking-[0.2em] text-white"> 
                      INTEGRATED 
                    </span> 
                    <span className="text-xs font-black tracking-[0.2em] text-sky-300"> 
                      CARE 
                    </span> 
                  </div> 
                </div> 
              </div> 
            </div> 
 
            {/* Right */} 
            <div className="lg:col-span-4 rounded-[2rem] border border-yellow-300/15 bg-white/[0.04] backdrop-blur-xl p-7 shadow-2xl text-center"> 
              <div className="mx-auto h-14 w-14 rounded-2xl bg-yellow-400/10 text-yellow-300 flex items-center justify-center"> 
                <Apple className="w-7 h-7" /> 
              </div> 
 
              <h3 className="mt-5 text-xl font-black text-white uppercase tracking-wider"> 
                Adequate Nutrition 
              </h3> 
 
              <div className="mt-6 space-y-3 text-sm text-slate-300 font-medium"> 
                <div className="rounded-xl border border-white/10 bg-white/5 p-3"> 
                  Nutrition Assessment 
                </div> 
                <div className="text-yellow-300 font-black">↓</div> 
                <div className="rounded-xl border border-white/10 bg-white/5 p-3"> 
                  Individualized Nutrition Plan 
                </div> 
                <div className="text-yellow-300 font-black">↓</div> 
                <div className="rounded-xl border border-white/10 bg-white/5 p-3"> 
                  Adequate Nutrition 
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
      </section> 
 
      {/* ========================================================= 
          CARE PATHWAY 
      ========================================================= */} 
      <section 
        id="pathway" 
        className="relative py-20 lg:py-24 bg-[#0D2235] overflow-hidden" 
      > 
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-sky-400/10 blur-[120px]" /> 
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-yellow-400/10 blur-[120px]" /> 
 
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
 
          <div className="text-center max-w-3xl mx-auto mb-14"> 
            <span className="inline-flex rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-1.5 text-xs font-black tracking-widest text-sky-300"> 
              CLINICAL ROADMAP 
            </span> 
 
            <h2 className="mt-5 text-3xl sm:text-5xl font-black text-white"> 
              Dysphagia{" "} 
              <span className="text-yellow-300">Care Pathway</span> 
            </h2> 
 
            <p className="mt-4 text-slate-400 text-base sm:text-lg"> 
              A structured 5-step clinical journey designed around changing 
              swallowing and nutritional needs. 
            </p> 
          </div> 
 
          {/* Tabs */} 
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-7"> 
            {pathwaySteps.map((item, idx) => { 
              const TabIcon = item.icon; 
              const isActive = activePathwayStep === idx; 
 
              return ( 
                <button 
                  key={idx} 
                  onClick={() => setActivePathwayStep(idx)} 
                  className={`group p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${ 
                    isActive 
                      ? "bg-sky-400/10 border-sky-300 shadow-lg shadow-sky-400/10 scale-[1.02]" 
                      : "bg-white/[0.025] border-white/10 hover:border-sky-300/30" 
                  }`} 
                > 
                  <div className="flex items-center justify-between mb-3"> 
                    <span 
                      className={`text-xs font-mono font-black ${ 
                        isActive ? "text-yellow-300" : "text-slate-500" 
                      }`} 
                    > 
                      {item.step} 
                    </span> 
 
                    <TabIcon 
                      className={`w-5 h-5 ${ 
                        isActive ? "text-sky-300" : "text-slate-500" 
                      }`} 
                    /> 
                  </div> 
 
                  <h4 className="text-xs sm:text-sm font-bold text-white"> 
                    {item.title} 
                  </h4> 
                </button> 
              ); 
            })} 
          </div> 
 
          {/* Active Stage */} 
          <AnimatePresence mode="wait"> 
            <motion.div 
              key={activePathwayStep} 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }} 
              transition={{ duration: 0.35 }} 
              className={`rounded-[2rem] border-2 p-7 sm:p-10 shadow-2xl relative overflow-hidden ${ 
                activePathwayStep === 3 
                  ? "border-red-300/40 bg-gradient-to-br from-red-400/10 via-sky-400/5 to-transparent" 
                  : "border-white/10 bg-white/[0.035]" 
              }`} 
            > 
              <div className="absolute top-0 right-0 h-60 w-60 rounded-full bg-sky-400/5 blur-3xl" /> 
 
              <div className="relative grid lg:grid-cols-12 gap-8 items-center"> 
 
                <div className="lg:col-span-5"> 
                  <span className="inline-flex px-3.5 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-300/20 text-yellow-300 font-mono text-xs font-black"> 
                    STAGE {pathwaySteps[activePathwayStep].step} OF 05 
                  </span> 
 
                  <h3 className="mt-5 text-3xl sm:text-4xl font-black text-white"> 
                    {pathwaySteps[activePathwayStep].title} 
                  </h3> 
 
                  <p className="mt-3 text-sm font-black uppercase tracking-wider text-sky-300"> 
                    {pathwaySteps[activePathwayStep].subtitle} 
                  </p> 
 
                  <p className="mt-5 text-slate-400 text-sm leading-relaxed"> 
                    Detailed clinical parameters and protocol standards 
                    evaluated and managed during this phase of the 
                    multidisciplinary pathway. 
                  </p> 
                </div> 
 
                <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3"> 
                  {pathwaySteps[activePathwayStep].details.map( 
                    (detail, idx) => ( 
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, x: 10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: idx * 0.04 }} 
                        className="flex items-center gap-3 bg-white/[0.04] border border-white/10 p-4 rounded-xl" 
                      > 
                        <CheckCircle className="w-4 h-4 text-sky-300 shrink-0" /> 
                        <span className="text-sm text-slate-300 font-medium"> 
                          {detail} 
                        </span> 
                      </motion.div> 
                    ) 
                  )} 
                </div> 
              </div> 
 
              {activePathwayStep === 3 && ( 
                <div className="relative mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-2 text-xs font-bold"> 
                  {[ 
                    "Nutritional Needs", 
                    "Formula", 
                    "Feeding Schedule", 
                    "Hydration", 
                    "Monitoring", 
                  ].map((item, idx, arr) => ( 
                    <React.Fragment key={item}> 
                      <span className="px-3 py-1.5 rounded-lg bg-[#081827] border border-white/10 text-white"> 
                        {item} 
                      </span> 
                      {idx < arr.length - 1 && ( 
                        <span className="text-red-300">→</span> 
                      )} 
                    </React.Fragment> 
                  ))} 
                </div> 
              )} 
            </motion.div> 
          </AnimatePresence> 
        </div> 
      </section> 
 
      {/* ========================================================= 
          CARE JOURNEY 
      ========================================================= */} 
      <section className="py-20 lg:py-24 bg-[#F8FAFC] text-slate-800"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
 
          <div className="text-center max-w-3xl mx-auto mb-14"> 
            <span className="inline-flex rounded-full bg-yellow-50 border border-yellow-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-yellow-600"> 
              Your Roadmap 
            </span> 
 
            <h2 className="mt-4 text-3xl sm:text-4xl font-black text-[#12304A]"> 
              Your <span className="text-sky-500">Care Journey</span> 
            </h2> 
 
            <p className="mt-4 text-slate-500 text-base sm:text-lg"> 
              A seamless roadmap from initial evaluation to ongoing adaptation. 
            </p> 
          </div> 
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4"> 
            {journeyItems.map((item, idx) => { 
              const Icon = item.icon; 
 
              return ( 
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -7 }} 
                  className="group bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:border-sky-200 transition-all duration-300" 
                > 
                  <div className="flex items-center justify-between mb-5"> 
                    <span className="text-xs font-mono font-black text-sky-500"> 
                      0{idx + 1} 
                    </span> 
 
                    <div className="h-9 w-9 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center group-hover:bg-yellow-50 group-hover:text-yellow-500 transition-colors"> 
                      <Icon className="w-4 h-4" /> 
                    </div> 
                  </div> 
 
                  <h3 className="text-sm font-black text-[#12304A]"> 
                    {item.step} 
                  </h3> 
 
                  <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100 leading-relaxed"> 
                    {item.desc} 
                  </p> 
                </motion.div> 
              ); 
            })} 
          </div> 
        </div> 
      </section> 
 
      {/* ========================================================= 
          TWO LEVELS OF CARE 
      ========================================================= */} 
      <section className="py-20 lg:py-24 bg-[#081827]"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
 
          <div className="text-center max-w-3xl mx-auto mb-14"> 
            <span className="text-yellow-300 text-xs font-black uppercase tracking-widest"> 
              Personalized Support 
            </span> 
 
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white"> 
              Two Levels of <span className="text-sky-300">Care</span> 
            </h2> 
 
            <p className="mt-4 text-slate-400 text-base sm:text-lg"> 
              Support can be tailored according to swallowing status, 
              nutritional needs and feeding requirements. 
            </p> 
          </div> 
 
          <div className="grid lg:grid-cols-2 gap-7"> 
 
            {/* Level 1 */} 
            <motion.div 
              whileHover={{ y: -6 }} 
              className="rounded-[2rem] bg-white p-7 sm:p-9 shadow-2xl" 
            > 
              <div className="flex items-center justify-between mb-6"> 
                <span className="px-4 py-1.5 rounded-full bg-sky-500 text-white text-xs font-black tracking-wider"> 
                  LEVEL 01 
                </span> 
 
                <ShieldCheck className="w-6 h-6 text-sky-500" /> 
              </div> 
 
              <h3 className="text-2xl font-black text-[#12304A]"> 
                Integrated Dysphagia Care 
              </h3> 
 
              <p className="mt-3 text-slate-500 text-sm italic"> 
                “For individuals with dysphagia who are primarily eating 
                orally.” 
              </p> 
 
              <div className="mt-6 text-xs font-black text-sky-500 uppercase tracking-wider"> 
                SLP + DIETITIAN 
              </div> 
 
              <ul className="mt-5 space-y-3"> 
                {[ 
                  "Swallowing Management", 
                  "Individualized Nutrition", 
                  "Texture-Modified Meal Planning", 
                ].map((item, idx) => ( 
                  <li 
                    key={idx} 
                    className="flex items-center gap-3 text-sm text-slate-700" 
                  > 
                    <CheckCircle className="w-4 h-4 text-sky-500 shrink-0" /> 
                    {item} 
                  </li> 
                ))} 
              </ul> 
 
              <div className="mt-8 rounded-xl border border-sky-200 bg-sky-50 py-3.5 text-center text-sm font-bold text-sky-600"> 
                Standard Care Tier 
              </div> 
            </motion.div> 
 
            {/* Level 2 */} 
            <motion.div 
              whileHover={{ y: -6 }} 
              className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#102D44] to-[#081827] border border-yellow-300/30 p-7 sm:p-9 shadow-2xl" 
            > 
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-yellow-400/10 blur-3xl" /> 
 
              <div className="relative"> 
                <div className="flex items-center justify-between mb-6"> 
                  <span className="px-4 py-1.5 rounded-full bg-yellow-400 text-[#081827] text-xs font-black tracking-wider"> 
                    LEVEL 02 
                  </span> 
 
                  <Activity className="w-6 h-6 text-yellow-300" /> 
                </div> 
 
                <h3 className="text-2xl font-black text-white"> 
                  Advanced Dysphagia & Enteral Care 
                </h3> 
 
                <p className="mt-3 text-slate-300 text-sm italic"> 
                  “For individuals with dysphagia who also have inadequate 
                  oral intake, malnutrition, or require NG tube feeding.” 
                </p> 
 
                <div className="mt-6 text-xs font-black text-yellow-300 uppercase tracking-wider"> 
                  SLP + DIETITIAN + ENTERAL NUTRITION SUPPORT 
                </div> 
 
                <ul className="mt-5 space-y-3"> 
                  {[ 
                    "Everything in Integrated Dysphagia Care", 
                    "NG feeding regimen & enteral formula assessment", 
                    "Detailed hydration plan & malnutrition management", 
                    "Caregiver training & frequent multidisciplinary case review", 
                  ].map((item, idx) => ( 
                    <li 
                      key={idx} 
                      className="flex items-center gap-3 text-sm text-slate-300" 
                    > 
                      <CheckCircle className="w-4 h-4 text-yellow-300 shrink-0" /> 
                      {item} 
                    </li> 
                  ))} 
                </ul> 
 
                <div className="mt-8 rounded-xl bg-yellow-400 py-3.5 text-center text-sm font-black text-[#081827]"> 
                  Advanced Clinical Tier 
                </div> 
              </div> 
            </motion.div> 
          </div> 
        </div> 
      </section> 
 
      {/* ========================================================= 
          MULTIDISCIPLINARY TEAM 
      ========================================================= */} 
      <section className="py-20 lg:py-24 bg-[#F8FAFC] text-slate-900"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> 
 
          <div className="max-w-3xl mx-auto mb-14"> 
            <span className="inline-flex rounded-full bg-sky-50 border border-sky-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-sky-600"> 
              Team-Based Care 
            </span> 
 
            <h2 className="mt-4 text-3xl sm:text-4xl font-black text-[#12304A]"> 
              Two Disciplines.{" "} 
              <span className="text-sky-500">One Coordinated Plan.</span> 
            </h2> 
 
            <p className="mt-4 text-slate-500 text-base sm:text-lg"> 
              Collaborative clinical integration centered around the 
              individual. 
            </p> 
          </div> 
 
          <div className="relative max-w-lg mx-auto py-8"> 
 
            <div className="relative w-72 h-72 mx-auto rounded-full border-2 border-dashed border-sky-300 flex items-center justify-center bg-white shadow-2xl"> 
 
              <div className="absolute inset-6 rounded-full bg-sky-50/50" /> 
 
              <div className="relative w-36 h-36 rounded-full bg-[#12304A] text-white flex flex-col items-center justify-center p-3 shadow-xl z-10"> 
                <UserRound className="w-7 h-7 text-yellow-300 mb-1" /> 
 
                <span className="text-[10px] font-black uppercase tracking-wider"> 
                  PATIENT / 
                </span> 
 
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-300"> 
                  CLIENT 
                </span> 
              </div> 
 
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 bg-sky-500 text-white px-5 py-3 rounded-2xl shadow-lg font-black text-sm"> 
                SLP 
              </div> 
 
              <div className="absolute -right-14 top-1/2 -translate-y-1/2 bg-red-500 text-white px-5 py-3 rounded-2xl shadow-lg font-black text-sm"> 
                DIETITIAN 
              </div> 
            </div> 
 
            <div className="mt-8"> 
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#12304A] text-white font-black text-sm shadow-xl"> 
                <HeartPulse className="w-4 h-4 text-yellow-300" /> 
                COORDINATED CARE PLAN 
              </div> 
            </div> 
 
            <div className="flex flex-wrap justify-center gap-2.5 mt-7"> 
              {[ 
                "Swallowing", 
                "Nutrition", 
                "Hydration", 
                "Feeding", 
                "Rehabilitation", 
                "Monitoring", 
              ].map((tag, idx) => ( 
                <span 
                  key={idx} 
                  className="px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-600 shadow-sm hover:border-sky-300 hover:text-sky-600 transition-colors" 
                > 
                  {tag} 
                </span> 
              ))} 
            </div> 
          </div> 
        </div> 
      </section> 
 
      {/* ========================================================= 
          CLINICAL GOALS 
      ========================================================= */} 
      <section className="py-20 lg:py-24 bg-[#081827]"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
 
          <div className="text-center max-w-3xl mx-auto mb-14"> 
            <span className="text-yellow-300 text-xs font-black uppercase tracking-widest"> 
              What We Focus On 
            </span> 
 
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white"> 
              Clinical <span className="text-sky-300">Goals</span> 
            </h2> 
 
            <p className="mt-4 text-slate-400 text-base sm:text-lg"> 
              Measurable outcomes directed toward safety, stability, and 
              quality of life. 
            </p> 
          </div> 
 
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"> 
            {goals.map((goal, idx) => { 
              const GoalIcon = goal.icon; 
 
              const iconStyles = { 
                sky: "bg-sky-400/10 text-sky-300", 
                yellow: "bg-yellow-400/10 text-yellow-300", 
                red: "bg-red-400/10 text-red-300", 
              }; 
 
              return ( 
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -6 }} 
                  className="group bg-[#0D2235] border border-white/10 hover:border-sky-300/20 p-7 rounded-[1.7rem] shadow-xl transition-all duration-300" 
                > 
                  <div 
                    className={`w-12 h-12 rounded-2xl ${iconStyles[goal.color]} flex items-center justify-center mb-6`} 
                  > 
                    <GoalIcon className="w-6 h-6" /> 
                  </div> 
 
                  <h3 className="text-xl font-black text-white mb-2"> 
                    {goal.title} 
                  </h3> 
 
                  <p className="text-sm text-slate-400 leading-relaxed"> 
                    {goal.desc} 
                  </p> 
 
                  <div className="mt-6 h-1 w-8 rounded-full bg-sky-400 group-hover:w-16 transition-all duration-300" /> 
                </motion.div> 
              ); 
            })} 
          </div> 
        </div> 
      </section> 
 
      {/* ========================================================= 
          CAREGIVER SUPPORT 
      ========================================================= */} 
      <section className="py-20 lg:py-24 bg-gradient-to-b from-[#FFFDF5] to-[#F8FAFC] text-slate-900"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
 
          <div className="text-center max-w-3xl mx-auto mb-14"> 
            <span className="inline-flex rounded-full bg-yellow-50 border border-yellow-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-yellow-600"> 
              Family-Centered 
            </span> 
 
            <h2 className="mt-4 text-3xl sm:text-4xl font-black text-[#12304A]"> 
              Supporting Families{" "} 
              <span className="text-red-500">& Caregivers</span> 
            </h2> 
 
            <p className="mt-4 text-slate-500 text-base sm:text-lg"> 
              Empowering families through education, practical guidance, and 
              close collaboration to ensure confidence at home. 
            </p> 
          </div> 
 
          <div className="grid md:grid-cols-3 gap-6"> 
            {[ 
              { 
                title: "Understand", 
                desc: "Clear education regarding swallowing safety, diet textures, and nutritional targets.", 
                icon: BookOpen, 
                color: "sky", 
              }, 
              { 
                title: "Prepare", 
                desc: "Practical guidance on meal preparation, feeding techniques, and equipment management.", 
                icon: Users, 
                color: "yellow", 
              }, 
              { 
                title: "Support", 
                desc: "Continuous emotional and clinical reassurance from our multidisciplinary team.", 
                icon: HeartHandshake, 
                color: "red", 
              }, 
            ].map((item, idx) => { 
              const ItemIcon = item.icon; 
 
              const colors = { 
                sky: "bg-sky-50 text-sky-500", 
                yellow: "bg-yellow-50 text-yellow-500", 
                red: "bg-red-50 text-red-500", 
              }; 
 
              return ( 
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -7 }} 
                  className="bg-white border border-slate-200 p-7 rounded-[1.7rem] shadow-lg hover:shadow-2xl transition-all duration-300" 
                > 
                  <div 
                    className={`w-14 h-14 rounded-2xl ${colors[item.color]} flex items-center justify-center mb-6`} 
                  > 
                    <ItemIcon className="w-7 h-7" /> 
                  </div> 
 
                  <h3 className="text-2xl font-black text-[#12304A] mb-3"> 
                    {item.title} 
                  </h3> 
 
                  <p className="text-slate-500 text-sm leading-relaxed"> 
                    {item.desc} 
                  </p> 
                </motion.div> 
              ); 
            })} 
          </div> 
        </div> 
      </section> 
 
      {/* ========================================================= 
          CLINICAL NOTE 
      ========================================================= */} 
      <section className="py-16 bg-[#081827]"> 
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> 
 
          <div className="relative overflow-hidden bg-white text-[#12304A] rounded-[2rem] shadow-2xl p-7 sm:p-9"> 
 
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-sky-400 via-yellow-400 to-red-400" /> 
 
            <div className="flex flex-col sm:flex-row items-start gap-5"> 
 
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center shrink-0"> 
                <ShieldCheck className="w-6 h-6" /> 
              </div> 
 
              <div> 
                <div className="flex items-center gap-2 mb-2"> 
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> 
 
                  <h3 className="text-xl font-black"> 
                    Individualized Clinical Planning 
                  </h3> 
                </div> 
 
                <p className="text-slate-500 text-sm leading-relaxed"> 
                  Swallowing management, food and fluid recommendations, and 
                  enteral nutrition plans are individualized according to 
                  clinical assessment and the person’s needs. NG tube feeding 
                  should be undertaken when medically indicated and managed by 
                  appropriately qualified healthcare professionals. 
                </p> 
              </div> 
            </div> 
          </div> 
        </div> 
      </section> 
 
      {/* ========================================================= 
          FINAL CTA 
      ========================================================= */} 
      <section className="relative py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-[#0D2235] via-[#081827] to-sky-950"> 
 
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-sky-400/10 blur-[120px]" /> 
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-[120px]" /> 
 
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8"> 
 
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-400/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-yellow-300 mb-6"> 
            <Sparkles className="w-4 h-4" /> 
            Start Your Care Journey 
          </div> 
 
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white"> 
            Coordinated Care. 
            <br /> 
            <span className="text-sky-300">Meaningful Support.</span> 
          </h2> 
 
          <p className="mt-6 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"> 
            From swallowing management to nutritional support, our 
            multidisciplinary approach brings the right expertise together 
            around the individual. 
          </p> 
 
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"> 
 
            <a 
              href="/book-a-free-consult" 
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-[#081827] font-black px-8 py-4 shadow-[0_15px_40px_rgba(250,204,21,0.2)] transition-all duration-300 hover:-translate-y-1" 
            > 
              Book an Assessment 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /> 
            </a> 
 
            <a 
              href="#pathway" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-sky-300/30 bg-sky-400/10 hover:bg-sky-400/20 text-sky-100 font-bold px-8 py-4 transition-all duration-300 hover:-translate-y-1" 
            > 
              Explore Care Pathway 
              <ChevronRight className="w-4 h-4" /> 
            </a> 
          </div> 
 
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-slate-500"> 
            <span>Speech & Swallowing Therapy</span> 
            <span className="text-yellow-400">•</span> 
            <span>Nutrition Management</span> 
            <span className="text-sky-400">•</span> 
            <span>NG Tube Feeding</span> 
          </div> 
        </div> 
      </section> 
 
    </div> 
  ); 
}