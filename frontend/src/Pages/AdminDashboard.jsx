import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    document.title = 'Admin Dashboard';
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token } })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => setPhone(d.phone))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <header className="bg-[#003B5C] text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm opacity-90">{phone}</span>
          <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold">
            Logout
          </button>
        </div>
      </header>

      <main className="p-6">
        <h2 className="text-2xl font-bold text-[#003B5C] mb-2">Welcome Admin 👋</h2>
        <p className="text-slate-600">Yahan se aap apna dashboard build karna shuru kar sakte hain.</p>
      </main>
    </div>
  );
}