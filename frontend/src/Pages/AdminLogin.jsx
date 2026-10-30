import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { api, setToken, getToken } from '../api';

/* ==========================================================================
   BRAND THEME CONFIGURATION
   ========================================================================= */
const THEME = {
  navy: '#003B5C',
  deepNavy: '#001E30',
  cyan: '#1CA7C7',
  coral: '#F5456B',
  amber: '#F5A623',
};

/* ==========================================================================
   DYNAMIC BACKGROUND WITH AMBIENT PARTICLES
   ========================================================================= */
function AmbientBackground() {
  const reduceMotion = useReducedMotion();

  // Floating ambient light particles
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        size: Math.random() * 6 + 3,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 8 + 7,
        delay: Math.random() * 4,
        color: i % 3 === 0 ? THEME.cyan : i % 3 === 1 ? THEME.coral : THEME.amber,
      })),
    []
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Deep Mesh Gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 12% 18%, #0d5573 0%, transparent 45%),
            radial-gradient(circle at 88% 82%, #8a243a 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, #032b42 0%, #001624 100%)
          `,
        }}
      />

      {/* Modern Sub-pixel Dot Matrix Grid */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.7) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.7) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Major Atmospheric Glow Orbs */}
      <motion.div
        animate={
          reduceMotion
            ? {}
            : {
                x: [0, 35, -25, 0],
                y: [0, -30, 20, 0],
                scale: [1, 1.12, 0.96, 1],
              }
        }
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-32 -top-24 h-[550px] w-[550px] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(28,167,199,0.35) 0%, transparent 70%)' }}
      />

      <motion.div
        animate={
          reduceMotion
            ? {}
            : {
                x: [0, -40, 25, 0],
                y: [0, 35, -20, 0],
                scale: [1, 1.08, 0.94, 1],
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -right-32 top-1/4 h-[520px] w-[520px] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(245,69,107,0.28) 0%, transparent 70%)' }}
      />

      {/* Floating Sparkle Particles */}
      {!reduceMotion &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              backgroundColor: p.color,
              boxShadow: `0 0 14px ${p.color}`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.85, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

      {/* Tech Rings (Desktop Aesthetic) */}
      <div className="absolute -left-20 bottom-10 hidden lg:block">
        <motion.div
          animate={reduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="h-80 w-80 rounded-full border border-dashed border-white/[0.08]"
        />
        <motion.div
          animate={reduceMotion ? {} : { rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-8 rounded-full border border-cyan-400/10"
        />
      </div>
    </div>
  );
}

/* ==========================================================================
   OFFICIAL BRAND LOGO COMPONENT
   ========================================================================= */
function CenterLogo({ className = 'h-12 w-auto' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      className="group relative inline-flex items-center justify-center rounded-2xl border border-white/80 bg-white/95 px-5 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.25)] backdrop-blur-md"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <img
        src="/Logo.png"
        alt="ABC Autism Behavioral Center"
        className={`${className} object-contain transition-all duration-300 drop-shadow-sm`}
        onError={(e) => {
          if (e.target.src.indexOf('Logo%20(2).png') === -1) {
            e.target.src = '/Logo (2).png';
          }
        }}
      />
    </motion.div>
  );
}

/* ==========================================================================
   INTERACTIVE VALUE PILL
   ========================================================================= */
function ValuePill({ color, label, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="inline-flex cursor-default items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/[0.14]"
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
      <span>{label}</span>
      {icon && <span className="text-[10px] opacity-75">{icon}</span>}
    </motion.div>
  );
}

/* ==========================================================================
   MAIN ADMIN LOGIN COMPONENT
   ========================================================================= */
export default function AdminLogin() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Staff Portal | ABC Autism Behavioral Center';

    if (getToken()) {
      navigate('/dashboard', { replace: true });
    }

    if (new URLSearchParams(window.location.search).get('expired')) {
      setMsg('Your session has expired for security reasons. Please sign in again.');
    }
  }, [navigate]);

  // Monitor CapsLock key
  const handleKeyDown = (e) => {
    if (e.getModifierState) {
      setCapsLockActive(e.getModifierState('CapsLock'));
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);

    try {
      const data = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          phone: phone.trim(),
          password,
        }),
      });

      setToken(data.token);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setMsg(err.message || 'Authentication error. Please verify your phone & password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-[#001E30] px-4 py-8 font-sans text-slate-800 antialiased sm:px-6 lg:px-8">
      
      {/* Background Atmosphere & Ambient Light */}
      <AmbientBackground />

      {/* Main Grid Layout */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-12 lg:gap-14">

        {/* =================================================================
            LEFT COLUMN: BRAND SHOWCASE & EDITORIAL TYPOGRAPHY (Desktop)
           ================================================================= */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hidden flex-col justify-between space-y-8 text-white lg:col-span-7 lg:flex"
        >
          {/* Top Logo & Status */}
          <div className="flex items-center justify-between">
            <CenterLogo className="h-12 w-auto" />

            <div className="flex items-center gap-2 rounded-full border border-[#1CA7C7]/30 bg-[#1CA7C7]/10 px-3.5 py-1 text-xs font-semibold text-[#1CA7C7] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1CA7C7] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1CA7C7]" />
              </span>
              <span>Encrypted Staff Gateway</span>
            </div>
          </div>

          {/* Interactive Core Pillars */}
          <div className="flex flex-wrap items-center gap-2.5">
            <ValuePill color={THEME.amber} label="Support" icon="✦" />
            <ValuePill color={THEME.coral} label="Learn" icon="✦" />
            <ValuePill color={THEME.cyan} label="Grow" icon="✦" />
            <span className="text-xs text-slate-400">| Behavior & Child Development</span>
          </div>

          {/* Editorial & Emotional Headline with Luxury Font Pairing */}
          <div className="space-y-4">
            <h1 className="text-[38px] font-bold leading-[1.18] tracking-tight text-white xl:text-[48px]">
              <span className="block font-medium tracking-tight text-slate-100 opacity-95">
                Every child's journey
              </span>
              
              <span className="block text-white">
                deserves a{' '}
                <span className="font-serif font-medium italic text-[#1CA7C7] underline decoration-[#1CA7C7]/30 decoration-wavy decoration-1 underline-offset-8">
                  compassionate,
                </span>
              </span>

              <span className="mt-1 block font-serif font-extrabold italic tracking-normal">
                <span className="bg-gradient-to-r from-[#F5456B] via-[#F5A623] to-[#1CA7C7] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(245,69,107,0.35)]">
                  brighter tomorrow.
                </span>
              </span>
            </h1>

            <p className="max-w-md text-sm font-normal leading-relaxed text-slate-300">
              Welcome to the administrative portal for ABC Autism Behavioral Center. Securely access clinical therapy trackers, behavioral assessments, and student progress records.
            </p>
          </div>

          {/* Therapist Daily Inspiration Card */}
          <motion.div
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.07] to-white/[0.02] p-5 shadow-lg backdrop-blur-xl"
          >
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1CA7C7] to-[#04507A] text-white shadow-md">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[#F5A623]">Clinical Note of the Day</p>
                <p className="text-xs italic text-slate-200">
                  "Children with autism don't lack the ability to learn; they just need us to teach in a way that respects their unique brilliance."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Trust & Compliance Footer */}
          <div className="flex items-center gap-6 border-t border-white/10 pt-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-[#1CA7C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>HIPAA Compliant Standard</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>256-Bit SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </motion.div>

        {/* =================================================================
            RIGHT COLUMN: INTERACTIVE IRIDESCENT LOGIN CARD
           ================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="mx-auto w-full max-w-[430px] lg:col-span-5"
        >
          {/* Card Border Glowing Wrap */}
          <div className="group relative">
            
            {/* Dynamic Iridescent Glowing Border */}
            <div
              className="absolute -inset-[2px] rounded-[30px] opacity-75 blur-[4px] transition-all duration-700 group-hover:opacity-100 group-hover:blur-[8px]"
              style={{
                background: 'linear-gradient(135deg, #1CA7C7, #F5456B, #F5A623, #1CA7C7)',
                backgroundSize: '300% 300%',
                animation: 'borderGlow 8s ease infinite',
              }}
            />

            {/* Inner Glass Card */}
            <div className="relative overflow-hidden rounded-[28px] border border-white/90 bg-white/[0.96] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
              
              {/* Top Accent Gradient Line */}
              <div
                className="absolute inset-x-0 top-0 h-1.5"
                style={{
                  background: 'linear-gradient(90deg, #F5A623, #F5456B 50%, #1CA7C7)',
                }}
              />

              {/* Mobile View: Top Brand Header */}
              <div className="mb-6 flex flex-col items-center text-center lg:hidden">
                <CenterLogo className="h-10 w-auto" />
                <div className="mt-3 flex gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F5A623]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F5456B]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1CA7C7]" />
                </div>
              </div>

              {/* Form Heading */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1CA7C7]">
                    ABC Clinical Management
                  </span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                    Staff v2.4
                  </span>
                </div>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-[#00283F]">
                  Welcome back<span className="text-[#F5456B]">.</span>
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Please log in with your assigned staff credentials.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Phone Field */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Phone Number
                  </label>
                  <div className="group/field relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/field:text-[#1CA7C7]">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <rect x="6" y="2.5" width="12" height="19" rx="2.5" strokeWidth="1.8" />
                        <path d="M10 18h4" strokeLinecap="round" strokeWidth="1.8" />
                      </svg>
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter registered phone number"
                      autoComplete="tel"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm font-semibold text-[#003B5C] outline-none transition-all duration-200 placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1CA7C7] focus:bg-white focus:ring-4 focus:ring-[#1CA7C7]/15"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Password
                    </label>
                    {capsLockActive && (
                      <motion.span
                        initial={{ opacity: 0, y: -3 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600"
                      >
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        CAPS LOCK ON
                      </motion.span>
                    )}
                  </div>
                  <div className="group/field relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/field:text-[#1CA7C7]">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <rect x="4" y="10" width="16" height="11" rx="2.5" strokeWidth="1.8" />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeWidth="1.8" />
                        <circle cx="12" cy="15.5" r="1.5" fill="currentColor" />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onKeyDown={handleKeyDown}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter secret password"
                      autoComplete="current-password"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-11 text-sm font-semibold text-[#003B5C] outline-none transition-all duration-200 placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1CA7C7] focus:bg-white focus:ring-4 focus:ring-[#1CA7C7]/15"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Station & Security Note */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex cursor-pointer select-none items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-[#1CA7C7] transition focus:ring-[#1CA7C7]"
                    />
                    <span className="text-xs font-medium text-slate-600">Remember station</span>
                  </label>
                  <span className="cursor-pointer text-xs font-semibold text-[#04507A] hover:underline">
                    IT Support
                  </span>
                </div>

                {/* Animated Error Alert */}
                <AnimatePresence mode="wait">
                  {msg && (
                    <motion.div
                      key={msg}
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.95 }}
                      className="overflow-hidden rounded-xl border border-rose-200 bg-rose-50/90 p-3 shadow-sm backdrop-blur-md"
                    >
                      <div className="flex items-start gap-2.5 text-xs text-rose-700">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="12" cy="12" r="9" strokeWidth="2" />
                          <path strokeLinecap="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
                        </svg>
                        <div className="flex-1 font-medium">{msg}</div>
                        <button
                          type="button"
                          onClick={() => setMsg('')}
                          className="text-rose-400 hover:text-rose-700"
                        >
                          ✕
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Shimmer Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={loading ? {} : { scale: 1.02, y: -1 }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="group/btn relative mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#F5456B] via-[#ea335a] to-[#d4234b] text-sm font-bold text-white shadow-[0_10px_25px_rgba(245,69,107,0.35)] transition-all hover:shadow-[0_14px_32px_rgba(245,69,107,0.45)] disabled:cursor-not-allowed disabled:opacity-75"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full" />

                  {loading ? (
                    <div className="flex items-center gap-2.5">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      <span>Verifying Credentials...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Sign In to Dashboard</span>
                      <motion.svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </motion.svg>
                    </div>
                  )}
                </motion.button>
              </form>

              {/* Secure Credentials Notice */}
              <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-center">
                <p className="text-[11px] font-medium text-slate-500">
                  Strictly for ABC Autism Behavioral Center staff.
                  <br />
                  Unauthorized access attempts are monitored and recorded.
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-5 flex items-center justify-center gap-2 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F5A623]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F5456B]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1CA7C7]" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400">
                  ABC AUTISM BEHAVIORAL CENTER
                </span>
              </div>

            </div>
          </div>
        </motion.div>

      </div>

      {/* Embedded Google Fonts & Keyframe Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600;1,700&display=swap');

        h1 span.font-serif {
          font-family: 'Playfair Display', Georgia, serif;
        }

        body, main {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }

        @keyframes borderGlow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </main>
  );
}