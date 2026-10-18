
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { api, setToken, getToken } from '../api';

const COLORS = {
  navy: '#003B5C',
  deepNavy: '#00283F',
  blue: '#04507A',
  pink: '#F5456B',
  yellow: '#F5A623',
  cyan: '#1CA7C7',
  white: '#FFFFFF',
};

const entrance = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
};

function FloatingOrb({ color, className, duration = 9, delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ background: color, willChange: 'transform' }}
      animate={
        reduceMotion
          ? {}
          : {
              x: [0, 25, -12, 0],
              y: [0, -30, 12, 0],
              scale: [1, 1.08, 0.96, 1],
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

function BrandLogo({ mobile = false }) {
  return (
    <motion.div
      whileHover={{ scale: 1.035, y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className={`inline-flex items-center justify-center rounded-xl bg-white ${
        mobile ? 'w-[180px] p-1.5' : 'w-[220px] p-2'
      }`}
    >
      <img
        src="/Logo (2).png"
        alt="ABC Autism Behavioral Center"
        className="h-auto w-full object-contain"
      />
    </motion.div>
  );
}

function BrandPill({ color, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
      <span
        className="h-2 w-2 rounded-full"
        style={{
          background: color,
          boxShadow: `0 0 12px ${color}90`,
        }}
      />
      {children}
    </span>
  );
}

function FieldIcon({ type }) {
  if (type === 'phone') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.7" className="h-5 w-5">
        <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
        <path d="M10 18h4" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" className="h-5 w-5">
      <rect x="4" y="10" width="16" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v3" strokeLinecap="round" />
    </svg>
  );
}

function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
  rightElement,
  autoComplete,
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="group relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-[#1CA7C7]">
          <FieldIcon type={icon} />
        </span>

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-11 pr-12 text-sm font-medium text-[#003B5C] outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1CA7C7] focus:bg-white focus:ring-4 focus:ring-[#1CA7C7]/15"
        />

        {rightElement && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminLogin() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.title = 'Admin Login | ABC Autism Behavioral Center';

    if (getToken()) {
      navigate('/dashboard', { replace: true });
    }

    if (new URLSearchParams(window.location.search).get('expired')) {
      setMsg(
        'Security ki wajah se session khatam ho gaya. Dobara login karein.'
      );
    }
  }, [navigate]);

  // Existing authentication logic preserved.
  const login = async (e) => {
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
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const floatingAnimation = reduceMotion
    ? {}
    : {
        y: [0, -5, 0],
      };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#00283F] px-4 py-7 sm:px-6">

      {/* BACKGROUND GRADIENT */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 12% 12%, #0C5870 0%, transparent 43%), radial-gradient(ellipse at 88% 88%, #063D60 0%, transparent 45%), linear-gradient(135deg, #00283F, #003B5C 52%, #012C45)',
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        <FloatingOrb
          color="#F5456B35"
          className="-left-24 top-10 h-72 w-72 sm:h-96 sm:w-96"
          duration={9}
        />

        <FloatingOrb
          color="#1CA7C735"
          className="-right-24 top-0 h-80 w-80 sm:h-[430px] sm:w-[430px]"
          duration={11}
          delay={1}
        />

        <FloatingOrb
          color="#F5A62325"
          className="-bottom-36 left-[25%] h-72 w-72 sm:h-96 sm:w-96"
          duration={10}
          delay={2}
        />

        {/* Rotating decorative rings */}
        <motion.div
          className="absolute -right-16 top-[15%] hidden h-64 w-64 rounded-full border border-white/10 lg:block"
          animate={reduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="absolute -right-2 top-[20%] hidden h-44 w-44 rounded-full border border-[#1CA7C7]/20 lg:block"
          animate={reduceMotion ? {} : { rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="absolute left-[8%] top-[20%] hidden h-2 w-2 rounded-full bg-[#F5A623] shadow-[0_0_20px_#F5A623] lg:block"
          animate={reduceMotion ? {} : { opacity: [0.3, 1, 0.3], scale: [1, 1.6, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-[18%] right-[10%] hidden h-2 w-2 rounded-full bg-[#F5456B] shadow-[0_0_20px_#F5456B] lg:block"
          animate={reduceMotion ? {} : { opacity: [0.3, 1, 0.3], scale: [1, 1.6, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </div>

      {/* MAIN LAYOUT */}
      <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">

        {/* DESKTOP BRANDING */}
        <motion.section
          variants={entrance}
          initial="hidden"
          animate="visible"
          className="hidden text-white lg:block"
        >
          <BrandLogo />

          <div className="mt-8 flex flex-wrap gap-2">
            <BrandPill color={COLORS.yellow}>Support</BrandPill>
            <BrandPill color={COLORS.pink}>Learn</BrandPill>
            <BrandPill color={COLORS.cyan}>Grow</BrandPill>
          </div>

          <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-[1.13] tracking-tight xl:text-[58px]">
            Care that helps
            <br />
            every child
            <br />
            <span className="font-serif italic text-[#F5456B]">
              shine brighter.
            </span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-7 text-slate-200">
            Welcome to the ABC Autism Behavioral Center
            administration portal. Manage your work with
            care, confidence, and a secure experience.
          </p>

          <div className="mt-8 grid max-w-md grid-cols-3 border-t border-white/15 pt-5">
            <div className="pr-3">
              <p className="text-lg font-extrabold text-[#F5A623]">Support</p>
              <p className="mt-1 text-xs text-slate-300">Compassionate care</p>
            </div>

            <div className="border-x border-white/15 px-3">
              <p className="text-lg font-extrabold text-[#F5456B]">Learn</p>
              <p className="mt-1 text-xs text-slate-300">Individual growth</p>
            </div>

            <div className="pl-3">
              <p className="text-lg font-extrabold text-[#1CA7C7]">Grow</p>
              <p className="mt-1 text-xs text-slate-300">Brighter futures</p>
            </div>
          </div>

          <div className="mt-8 flex max-w-md items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1CA7C7]/15 text-[#1CA7C7]">
              <FieldIcon type="password" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Secure Administration
              </p>
              <p className="mt-1 text-xs text-slate-300">
                For authorized staff access.
              </p>
            </div>
          </div>
        </motion.section>

        {/* COMPACT LOGIN CARD */}
        <motion.section
          initial={{ opacity: 0, y: 30, scale: 0.94 }}
          animate={{
            opacity: 1,
            y: reduceMotion ? 0 : [0, -4, 0],
            scale: 1,
          }}
          transition={{
            opacity: { duration: 0.65, delay: 0.1 },
            scale: { duration: 0.65, delay: 0.1 },
            y: reduceMotion
              ? { duration: 0 }
              : { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="mx-auto w-full max-w-[400px]"
        >
          <div className="group relative">

            {/* Animated glowing border */}
            <motion.div
              aria-hidden="true"
              className="absolute -inset-[2px] rounded-[27px] blur-[2px]"
              style={{
                background:
                  'linear-gradient(135deg, #F5A623, #F5456B, #1CA7C7, #F5A623)',
                backgroundSize: '300% 300%',
              }}
              animate={
                reduceMotion
                  ? {}
                  : {
                      backgroundPosition: [
                        '0% 50%',
                        '100% 50%',
                        '0% 50%',
                      ],
                      opacity: [0.45, 0.9, 0.45],
                    }
              }
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <div className="relative overflow-hidden rounded-[25px] border border-white/80 bg-white shadow-[0_25px_70px_rgba(0,0,0,0.30)] transition-shadow duration-500 group-hover:shadow-[0_30px_85px_rgba(0,0,0,0.40)]">

              <div
                className="h-1 w-full"
                style={{
                  background:
                    'linear-gradient(90deg, #F5A623, #F5456B, #1CA7C7)',
                }}
              />

              <div className="p-5 sm:p-7">

                {/* Mobile logo */}
                <div className="mb-5 flex flex-col items-center lg:hidden">
                  <BrandLogo mobile />

                  <div className="mt-3 flex gap-2">
                    <BrandPill color={COLORS.yellow}>Support</BrandPill>
                    <BrandPill color={COLORS.pink}>Learn</BrandPill>
                    <BrandPill color={COLORS.cyan}>Grow</BrandPill>
                  </div>
                </div>

                {/* Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="mb-6"
                >
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.06 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F5456B] to-[#dc3156] text-white shadow-lg shadow-[#F5456B]/25"
                  >
                    <svg viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.7"
                      className="h-6 w-6">
                      <rect x="4" y="10" width="16" height="11" rx="2.5" />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                      <path d="M12 14v3" strokeLinecap="round" />
                    </svg>
                  </motion.div>

                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1CA7C7]">
                    ADMINISTRATION PORTAL
                  </p>

                  <h2 className="text-[27px] font-extrabold leading-tight tracking-tight text-[#003B5C]">
                    Welcome back
                    <span className="text-[#F5456B]">.</span>
                  </h2>

                  <p className="mt-2 text-[13px] leading-5 text-slate-500">
                    Sign in to access your dashboard.
                  </p>
                </motion.div>

                {/* LOGIN FORM */}
                <form onSubmit={login} className="space-y-4">

                  <InputField
                    label="Phone Number"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    icon="phone"
                    autoComplete="tel"
                  />

                  <InputField
                    label="Password"
                    type={show ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    icon="password"
                    autoComplete="current-password"
                    rightElement={
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.88 }}
                        onClick={() => setShow(!show)}
                        aria-label={show ? 'Hide password' : 'Show password'}
                        aria-pressed={show}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-[#1CA7C7]/10 hover:text-[#003B5C] focus:outline-none focus:ring-2 focus:ring-[#1CA7C7]/40"
                      >
                        {show ? (
                          <svg viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="1.7"
                            className="h-5 w-5">
                            <path d="M3 3l18 18" strokeLinecap="round" />
                            <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                            <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.5 4.1 9.5 7-.4 1.2-1.2 2.4-2.2 3.4" />
                            <path d="M6.2 6.2C4.2 7.6 2.9 9.6 2.5 12c.8 2.7 4.3 7 9.5 7 1.1 0 2.2-.2 3.2-.6" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="1.7"
                            className="h-5 w-5">
                            <path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </motion.button>
                    }
                  />

                  {/* Error and session messages */}
                  <AnimatePresence mode="wait">
                    {msg && (
                      <motion.div
                        key={msg}
                        initial={{ opacity: 0, y: -8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        role="alert"
                        aria-live="polite"
                        className="overflow-hidden"
                      >
                        <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-700">
                          <svg viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="1.8"
                            className="mt-0.5 h-4 w-4 shrink-0">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 8v4m0 4h.01" strokeLinecap="round" />
                          </svg>
                          <span>{msg}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Animated login button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={
                      loading || reduceMotion
                        ? {}
                        : {
                            y: -2,
                            scale: 1.015,
                            boxShadow: '0 12px 28px rgba(245,69,107,0.32)',
                          }
                    }
                    whileTap={loading ? {} : { scale: 0.975 }}
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 18,
                    }}
                    className="group/button relative mt-1 flex h-[50px] w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#F5456B] px-4 text-sm font-bold text-white shadow-lg shadow-[#F5456B]/20 transition-colors duration-300 hover:bg-[#003B5C] focus:outline-none focus:ring-4 focus:ring-[#F5456B]/25 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/button:translate-x-full" />

                    {loading ? (
                      <>
                        <motion.span
                          animate={reduceMotion ? {} : { rotate: 360 }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                          className="h-4 w-4 rounded-full border-2 border-white/35 border-t-white"
                        />
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In to Dashboard</span>
                        <motion.svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-4 w-4"
                          animate={
                            reduceMotion ? {} : { x: [0, 3, 0] }
                          }
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <path d="M5 12h14m-6-6 6 6-6 6"
                            strokeLinecap="round"
                            strokeLinejoin="round" />
                        </motion.svg>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Security note */}
                <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-[#1CA7C7]/15 bg-[#1CA7C7]/[0.055] p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#1CA7C7] shadow-sm">
                    <svg viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.8"
                      className="h-4 w-4">
                      <path d="M12 3 20 6v5c0 5-3.4 8-8 10-4.6-2-8-5-8-10V6l8-3Z" />
                      <path d="m8.5 12 2.3 2.3 4.7-5"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#003B5C]">
                      Secure administration
                    </p>
                    <p className="mt-1 text-[11px] leading-4 text-slate-500">
                      Use your authorized credentials and keep
                      your password private.
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-5 border-t border-slate-100 pt-4 text-center">
                  <p className="text-xs font-semibold text-slate-500">
                    ABC Autism Behavioral Center
                  </p>

                  <div className="mt-2 flex items-center justify-center gap-1.5">
                    <motion.span
                      animate={reduceMotion ? {} : { scale: [1, 1.35, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-1.5 w-1.5 rounded-full bg-[#F5A623]"
                    />
                    <motion.span
                      animate={reduceMotion ? {} : { scale: [1, 1.35, 1] }}
                      transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
                      className="h-1.5 w-1.5 rounded-full bg-[#F5456B]"
                    />
                    <motion.span
                      animate={reduceMotion ? {} : { scale: [1, 1.35, 1] }}
                      transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
                      className="h-1.5 w-1.5 rounded-full bg-[#1CA7C7]"
                    />
                  </div>

                  <p className="mt-2 text-[9px] font-medium tracking-[0.18em] text-slate-400">
                    SUPPORT · LEARN · GROW
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Background animation styling */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
