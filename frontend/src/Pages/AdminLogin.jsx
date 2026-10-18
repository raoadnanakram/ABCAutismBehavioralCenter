import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api, setToken, getToken } from '../api';

export default function AdminLogin() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Admin Login';
    if (getToken()) navigate('/dashboard', { replace: true });
    if (new URLSearchParams(window.location.search).get('expired'))
      setMsg('Security ki wajah se session khatam ho gaya. Dobara login karein.');
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      const data = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ phone: phone.trim(), password }),
      });
      setToken(data.token);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setMsg(err.message);
    }
    setLoading(false);
  };

  const blob = (color, size, x, y, d) => (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-40"
      style={{ background: color, width: size, height: size, left: x, top: y }}
      animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
      transition={{ duration: d, repeat: Infinity, ease: 'easeInOut' }}
    />
  );

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#003B5C] via-[#04507a] to-[#003B5C] px-4">
      {blob('#F5456B', 320, '-5%', '60%', 7)}
      {blob('#1CA7C7', 380, '70%', '-10%', 9)}
      {blob('#F5A623', 260, '60%', '65%', 8)}

      <motion.form
        onSubmit={login}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F5A623] via-[#F5456B] to-[#1CA7C7] text-2xl text-white shadow-lg">
          🔐
        </div>
        <h1 className="text-center text-2xl font-bold text-[#003B5C]">Admin Login</h1>
        <p className="mb-6 text-center text-sm text-slate-500">ABC Autism Behavioral Center</p>

        <input
          type="tel" placeholder="Phone number" value={phone}
          onChange={(e) => setPhone(e.target.value)} required
          className="mb-3 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1CA7C7] focus:ring-4 focus:ring-[#1CA7C7]/20"
        />
        <div className="relative mb-4">
          <input
            type={show ? 'text' : 'password'} placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-[#1CA7C7] focus:ring-4 focus:ring-[#1CA7C7]/20"
          />
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3 text-xl">
            {show ? '🙈' : '👁️'}
          </button>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full rounded-xl bg-[#F5456B] py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#003B5C] hover:shadow-xl disabled:opacity-60"
        >
          {loading ? 'Please wait...' : 'Login'}
        </button>
        {msg && <p className="mt-4 text-center text-sm text-red-600">{msg}</p>}
      </motion.form>
    </section>
  );
}