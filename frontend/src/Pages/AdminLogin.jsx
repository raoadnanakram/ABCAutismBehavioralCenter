import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api, setToken, getToken } from '../api';

export default function AdminLogin() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Staff Portal | ABC Autism Behavioral Center';

    if (getToken()) {
      navigate('/dashboard', { replace: true });
    }

    if (new URLSearchParams(window.location.search).get('expired')) {
      setMsg('Session expired for security. Please sign in again.');
    }
  }, [navigate]);

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
      setMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#001E30] px-4 py-8 font-sans antialiased sm:px-6">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#1CA7C7]/20 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#F5456B]/15 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 h-[450px] w-[450px] rounded-full bg-[#F5A623]/10 blur-[130px]" />
        
        {/* Subtle geometric dot grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* CONTAINER */}
      <div className="relative z-10 mx-auto grid w-full max-w-4xl items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">

        {/* LEFT COLUMN: HERO / BRANDING (Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="hidden space-y-6 lg:block"
        >
          {/* Brand Logo Container */}
          <div className="inline-block rounded-2xl bg-white p-3 shadow-xl shadow-black/20">
            <img
              src="/Logo (2).png"
              alt="ABC Autism Behavioral Center"
              className="h-11 w-auto object-contain"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-[#1CA7C7] backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1CA7C7]" />
            Authorized Personnel Only
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white xl:text-[44px]">
            Empowering growth, <br />
            inspiring every child to{' '}
            <span className="bg-gradient-to-r from-[#F5456B] via-[#F5A623] to-[#1CA7C7] bg-clip-text text-transparent">
              shine brighter.
            </span>
          </h1>

          <p className="max-w-md text-sm leading-relaxed text-slate-300">
            Welcome to the ABC Autism Behavioral Center administrative hub. Please authenticate to access therapist records, progress reports, and operations.
          </p>

          {/* Pillars */}
          <div className="flex items-center gap-6 pt-2">
            {[
              { label: 'Support', desc: 'Compassionate Care', color: '#F5A623' },
              { label: 'Learn', desc: 'Targeted Growth', color: '#F5456B' },
              { label: 'Grow', desc: 'Brighter Future', color: '#1CA7C7' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white">{item.label}</p>
                  <p className="text-[11px] text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT COLUMN: LOGIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="mx-auto w-full max-w-sm"
        >
          {/* Card Wrapper with Subtle Border Glow */}
          <div className="relative rounded-3xl border border-white/15 bg-white/95 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
            
            {/* Top Color Accent Bar */}
            <div className="absolute inset-x-8 top-0 h-1 bg-gradient-to-r from-[#F5A623] via-[#F5456B] to-[#1CA7C7] rounded-b-full" />

            {/* Mobile Header / Logo */}
            <div className="mb-6 flex flex-col items-center text-center lg:hidden">
              <div className="mb-3 rounded-xl bg-white p-2 shadow-sm">
                <img
                  src="/Logo (2).png"
                  alt="ABC Logo"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <h2 className="text-xl font-bold text-[#00283F]">Staff Portal</h2>
              <p className="text-xs text-slate-500">Sign in to your dashboard</p>
            </div>

            {/* Desktop Header */}
            <div className="mb-6 hidden lg:block">
              <h2 className="text-2xl font-bold tracking-tight text-[#00283F]">
                Staff Sign In
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Enter your authorized credentials to continue.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Phone Input */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +60 12-345 6789"
                    autoComplete="tel"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-10 pr-3.5 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1CA7C7] focus:bg-white focus:ring-4 focus:ring-[#1CA7C7]/15"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="4" y="10" width="16" height="11" rx="2.5" strokeWidth="2" />
                      <path strokeLinecap="round" strokeWidth="2" d="M8 10V7a4 4 0 018 0v3" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-10 pr-10 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1CA7C7] focus:bg-white focus:ring-4 focus:ring-[#1CA7C7]/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition hover:text-slate-600 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Alert Message */}
              <AnimatePresence mode="wait">
                {msg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -6, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-600">
                      <svg className="h-4 w-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="font-medium">{msg}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={loading ? {} : { scale: 1.01 }}
                whileTap={loading ? {} : { scale: 0.98 }}
                className="relative mt-2 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#F5456B] to-[#e6355b] text-sm font-semibold text-white shadow-lg shadow-[#F5456B]/25 transition hover:shadow-xl hover:shadow-[#F5456B]/35 disabled:cursor-not-allowed disabled:opacity-75"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </motion.button>
            </form>

            {/* Card Footer info */}
            <div className="mt-6 border-t border-slate-100 pt-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-400">
                <svg className="h-3.5 w-3.5 text-[#1CA7C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>End-to-End Encrypted Staff Portal</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </main>
  );
}