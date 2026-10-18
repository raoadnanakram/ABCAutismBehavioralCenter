import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Admin Login';
    if (localStorage.getItem('token')) navigate('/dashboard', { replace: true });
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.message || 'Login fail ho gaya');
      } else {
        localStorage.setItem('token', data.token);
        navigate('/dashboard', { replace: true });
      }
    } catch {
      setMsg('Server se connect nahi ho saka');
    }
    setLoading(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4">
      <form onSubmit={login} className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-[#003B5C] text-center mb-6">Admin Login</h1>

        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-4 py-3 mb-3 outline-none focus:border-[#003B5C]"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-4 py-3 mb-4 outline-none focus:border-[#003B5C]"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#003B5C] text-white py-3 rounded-lg font-semibold disabled:opacity-60"
        >
          {loading ? 'Please wait...' : 'Login'}
        </button>

        {msg && <p className="text-red-600 text-sm text-center mt-4">{msg}</p>}
      </form>
    </section>
  );
}