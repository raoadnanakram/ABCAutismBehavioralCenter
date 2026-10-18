import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api, getToken, clearToken } from '../api';

const IDLE = 5 * 60 * 1000;
const TABS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'appointment', label: 'Appointments', icon: '📅' },
  { id: 'contact', label: 'Contact Messages', icon: '✉️' },
  { id: 'career', label: 'Career Applications', icon: '💼' },
  { id: 'security', label: 'Security & System', icon: '🔒' },
];
const META = {
  appointment: { label: 'Appointments', color: '#F5456B', icon: '📅' },
  contact: { label: 'Contact Messages', color: '#1CA7C7', icon: '✉️' },
  career: { label: 'Career Applications', color: '#F5A623', icon: '💼' },
};
const STATUS_STYLE = {
  new: 'bg-pink-100 text-pink-700',
  read: 'bg-cyan-100 text-cyan-700',
  replied: 'bg-emerald-100 text-emerald-700',
  closed: 'bg-slate-200 text-slate-600',
};
const STATUSES = ['new', 'read', 'replied', 'closed'];

const fmt = (d) =>
  new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const wa = (p) => 'https://wa.me/' + String(p).replace(/\D/g, '').replace(/^0/, '92');
const parse = (s) => { try { return JSON.parse(s || '{}'); } catch { return {}; } };
const detail = (r) => { const x = parse(r.extra); return r.type === 'appointment' ? x.service : r.type === 'career' ? x.position : r.subject; };

function useIdle(onTimeout) {
  const last = useRef(Date.now());
  const [warn, setWarn] = useState(null);
  useEffect(() => {
    const bump = () => { last.current = Date.now(); };
    const evs = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    evs.forEach((e) => window.addEventListener(e, bump, { passive: true }));
    const tick = setInterval(() => {
      const idle = Date.now() - last.current;
      if (idle >= IDLE) onTimeout();
      else if (idle >= IDLE - 30000) setWarn(Math.ceil((IDLE - idle) / 1000));
      else setWarn(null);
    }, 1000);
    const beat = setInterval(() => {
      if (Date.now() - last.current < 120000) api('/auth/me').catch(() => {});
    }, 120000);
    return () => { evs.forEach((e) => window.removeEventListener(e, bump)); clearInterval(tick); clearInterval(beat); };
  }, [onTimeout]);
  return warn;
}

function CountUp({ value }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf; const start = performance.now();
    const step = (t) => { const p = Math.min(1, (t - start) / 800); setN(Math.round(value * p)); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{n}</>;
}

function StatCard({ label, value, icon, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} whileHover={{ y: -6 }}
      className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10" style={{ background: color }} />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-1 text-3xl font-bold text-[#003B5C]"><CountUp value={value} /></p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl" style={{ background: color + '22' }}>{icon}</div>
      </div>
    </motion.div>
  );
}

function Chart({ series }) {
  const max = Math.max(1, ...series.map((s) => s.c));
  return (
    <div className="flex items-end gap-3">
      {series.map((s, i) => (
        <div key={s.d} className="group flex flex-1 flex-col items-center">
          <div className="relative h-40 w-full">
            <motion.div
              initial={{ height: 0 }} animate={{ height: `${(s.c / max) * 100}%` }} transition={{ delay: i * 0.07, duration: 0.6 }}
              className="absolute bottom-0 w-full min-h-[4px] rounded-t-lg bg-gradient-to-t from-[#003B5C] to-[#1CA7C7] transition-colors group-hover:from-[#F5456B] group-hover:to-[#F5A623]"
            >
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-semibold text-slate-600 opacity-0 transition group-hover:opacity-100">{s.c}</span>
            </motion.div>
          </div>
          <span className="mt-2 text-[11px] text-slate-500">{s.d.slice(5)}</span>
        </div>
      ))}
    </div>
  );
}

function Modal({ item, onClose, onStatus, onDelete }) {
  if (!item) return null;
  const x = parse(item.extra);
  const rows = [['Name', item.name], ['Phone', item.phone], ['Email', item.email], ['Subject', item.subject], ...Object.entries(x), ['Message', item.message], ['Received', fmt(item.created_at)],
    ['Owner mail', item.mail_sent & 1 ? 'Sent ✓' : 'Not sent'], ['User mail', item.mail_sent & 2 ? 'Sent ✓' : 'Not sent']].filter(([, v]) => v);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#003B5C]">{META[item.type].icon} {META[item.type].label.replace(/s$/, '')}</h3>
          <button onClick={onClose} className="text-2xl text-slate-400 hover:text-[#F5456B]">×</button>
        </div>
        <div className="space-y-2">
          {rows.map(([k, v]) => (
            <div key={k} className="flex gap-3 border-b border-slate-100 pb-2 text-sm">
              <span className="w-28 shrink-0 capitalize text-slate-500">{k}</span>
              <span className="break-words font-medium text-slate-800">{String(v)}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button key={s} onClick={() => onStatus(item.id, s)} className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition hover:scale-105 ${item.status === s ? STATUS_STYLE[s] + ' ring-2 ring-offset-1 ring-current' : 'bg-slate-100 text-slate-500'}`}>{s}</button>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <a href={`mailto:${item.email}`} onClick={() => onStatus(item.id, 'replied')} className="rounded-xl bg-[#003B5C] py-2 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1CA7C7]">Email</a>
          <a href={wa(item.phone)} target="_blank" rel="noreferrer" className="rounded-xl bg-emerald-500 py-2 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-600">WhatsApp</a>
          <button onClick={() => onDelete(item.id)} className="rounded-xl bg-[#F5456B] py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-red-600">Delete</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [menu, setMenu] = useState(false);
  const [phone, setPhone] = useState('');
  const [stats, setStats] = useState(null);
  const [list, setList] = useState({ rows: [], total: 0, page: 1, pages: 1 });
  const [q, setQ] = useState('');
  const [statusF, setStatusF] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sel, setSel] = useState(null);
  const [toast, setToast] = useState('');
  const [sys, setSys] = useState(null);
  const [logins, setLogins] = useState([]);
  const [pw, setPw] = useState({ cur: '', n1: '', n2: '' });

  const logout = useCallback(() => { clearToken(); navigate('/login', { replace: true }); }, [navigate]);
  const warn = useIdle(() => { clearToken(); window.location.href = '/login?expired=1'; });
  const say = (m) => { setToast(m); setTimeout(() => setToast(''), 3000); };

  useEffect(() => {
    document.title = 'Admin Dashboard';
    if (!getToken()) { navigate('/login', { replace: true }); return; }
    api('/auth/me').then((d) => setPhone(d.phone)).catch(() => {});
  }, [navigate]);

  const loadStats = useCallback(() => api('/admin/stats').then(setStats).catch(() => {}), []);
  useEffect(() => { loadStats(); const t = setInterval(loadStats, 60000); return () => clearInterval(t); }, [loadStats]);

  const loadList = useCallback(async () => {
    if (!META[tab]) return;
    setLoading(true);
    try { setList(await api('/admin/submissions?' + new URLSearchParams({ type: tab, status: statusF, q, page }))); }
    catch (e) { say(e.message); }
    setLoading(false);
  }, [tab, statusF, q, page]);
  useEffect(() => { const t = setTimeout(loadList, 250); return () => clearTimeout(t); }, [loadList]);

  useEffect(() => {
    if (tab !== 'security') return;
    api('/admin/system').then(setSys).catch(() => {});
    api('/admin/logins').then(setLogins).catch(() => {});
  }, [tab]);

  const goTab = (id) => { setTab(id); setPage(1); setQ(''); setStatusF(''); setMenu(false); };

  const setStatus = async (id, status) => {
    await api(`/admin/submissions/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
    setSel((s) => (s && s.id === id ? { ...s, status } : s));
    loadList(); loadStats();
  };
  const open = (row) => { setSel(row); if (row.status === 'new') setStatus(row.id, 'read'); };
  const remove = async (id) => {
    if (!window.confirm('Kya aap waqai delete karna chahte hain?')) return;
    await api(`/admin/submissions/${id}`, { method: 'DELETE' });
    setSel(null); say('Deleted'); loadList(); loadStats();
  };
  const exportCsv = async () => {
    const res = await fetch('/api/admin/export?type=' + tab, { headers: { Authorization: 'Bearer ' + getToken() } });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(await res.blob());
    a.download = `${tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };
  const changePw = async (e) => {
    e.preventDefault();
    if (pw.n1 !== pw.n2) return say('Naya password dono jagah same likhein');
    try {
      await api('/auth/change-password', { method: 'POST', body: JSON.stringify({ currentPassword: pw.cur, newPassword: pw.n1 }) });
      setPw({ cur: '', n1: '', n2: '' }); say('Password badal gaya ✓');
    } catch (err) { say(err.message); }
  };

  const nb = (id) => (stats && stats.newByType && stats.newByType[id]) || 0;

  return (
    <div className="min-h-screen bg-[#F4F8FB] lg:flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gradient-to-b from-[#003B5C] to-[#02263b] p-5 text-white transition-transform lg:static lg:translate-x-0 ${menu ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#F5A623] via-[#F5456B] to-[#1CA7C7] text-lg font-black">ABC</div>
          <div><p className="font-bold leading-tight">Admin Panel</p><p className="text-xs text-white/60">Autism Behavioral Center</p></div>
        </div>
        <nav className="space-y-1">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => goTab(t.id)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition hover:translate-x-1 hover:bg-white/10 ${tab === t.id ? 'bg-white/15 shadow-inner' : ''}`}>
              <span className="text-lg">{t.icon}</span><span className="flex-1">{t.label}</span>
              {nb(t.id) > 0 && <span className="animate-pulse rounded-full bg-[#F5456B] px-2 py-0.5 text-xs font-bold">{nb(t.id)}</span>}
            </button>
          ))}
        </nav>
        <button onClick={logout} className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/10 py-3 text-sm font-semibold transition hover:bg-[#F5456B]">Logout</button>
      </aside>
      {menu && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setMenu(false)} />}

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex items-center justify-between bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <button className="text-2xl lg:hidden" onClick={() => setMenu(true)}>☰</button>
            <h1 className="text-lg font-bold text-[#003B5C]">{TABS.find((t) => t.id === tab).label}</h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600"><span className="hidden sm:inline">👤 {phone}</span></div>
        </header>

        <main className="p-5">
          {tab === 'overview' && stats && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                <StatCard label="Total Submissions" value={stats.total} icon="📥" color="#003B5C" delay={0} />
                <StatCard label="New / Unread" value={stats.new} icon="🔔" color="#F5456B" delay={0.08} />
                <StatCard label="Aaj ke" value={stats.today} icon="📆" color="#F5A623" delay={0.16} />
                <StatCard label="Appointments" value={stats.types.appointment} icon="📅" color="#1CA7C7" delay={0.24} />
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-2">
                  <h3 className="mb-6 font-semibold text-[#003B5C]">Last 7 din ki submissions</h3>
                  <Chart series={stats.series} />
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <h3 className="mb-4 font-semibold text-[#003B5C]">Status</h3>
                  {STATUSES.map((s) => (
                    <div key={s} className="mb-3">
                      <div className="mb-1 flex justify-between text-sm capitalize"><span>{s}</span><b>{stats.status[s]}</b></div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${stats.total ? (stats.status[s] / stats.total) * 100 : 0}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-gradient-to-r from-[#1CA7C7] to-[#F5456B]" />
                      </div>
                    </div>
                  ))}
                  <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                    {Object.entries(META).map(([k, m]) => (
                      <div key={k} className="rounded-xl p-2 transition hover:scale-105" style={{ background: m.color + '18' }}>
                        <div className="text-lg">{m.icon}</div><b>{stats.types[k]}</b>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="mb-4 font-semibold text-[#003B5C]">Recent Activity</h3>
                {stats.recent.length === 0 && <p className="text-sm text-slate-500">Abhi koi submission nahi aayi.</p>}
                {stats.recent.map((r) => (
                  <button key={r.id} onClick={() => open(r)} className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50 hover:pl-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full text-lg" style={{ background: META[r.type].color + '22' }}>{META[r.type].icon}</span>
                    <span className="flex-1"><b className="block text-sm text-slate-800">{r.name}</b><span className="text-xs text-slate-500">{META[r.type].label} · {fmt(r.created_at)}</span></span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLE[r.status]}`}>{r.status}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {META[tab] && (
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="🔍 Search naam, email, phone..." className="min-w-[200px] flex-1 rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-[#1CA7C7] focus:ring-4 focus:ring-[#1CA7C7]/20" />
                <select value={statusF} onChange={(e) => { setStatusF(e.target.value); setPage(1); }} className="rounded-xl border border-slate-300 px-3 py-2">
                  <option value="">All status</option>{STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={exportCsv} className="rounded-xl bg-[#003B5C] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1CA7C7]">⬇ Export CSV</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead><tr className="border-b text-slate-500"><th className="p-3">Name</th><th className="p-3">Phone</th><th className="p-3">Detail</th><th className="p-3">Date</th><th className="p-3">Status</th></tr></thead>
                  <tbody>
                    {list.rows.map((r) => (
                      <tr key={r.id} onClick={() => open(r)} className="cursor-pointer border-b border-slate-100 transition hover:bg-[#1CA7C7]/5">
                        <td className="p-3 font-semibold text-slate-800">{r.name}</td>
                        <td className="p-3">{r.phone}</td>
                        <td className="p-3 text-slate-500">{detail(r) || '-'}</td>
                        <td className="p-3 whitespace-nowrap text-slate-500">{fmt(r.created_at)}</td>
                        <td className="p-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLE[r.status]}`}>{r.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!loading && list.rows.length === 0 && <p className="py-10 text-center text-slate-500">Koi record nahi mila.</p>}
                {loading && <p className="py-10 text-center text-slate-400">Loading...</p>}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                <span>Total: <b>{list.total}</b></span>
                <div className="flex items-center gap-2">
                  <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded-lg bg-slate-100 px-3 py-1 transition hover:bg-[#F5456B] hover:text-white disabled:opacity-40">‹ Prev</button>
                  <span>{list.page} / {list.pages}</span>
                  <button disabled={page >= list.pages} onClick={() => setPage(page + 1)} className="rounded-lg bg-slate-100 px-3 py-1 transition hover:bg-[#F5456B] hover:text-white disabled:opacity-40">Next ›</button>
                </div>
              </div>
            </div>
          )}

          {tab === 'security' && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <p className="text-sm text-slate-500">Database (MySQL)</p>
                  <p className={`mt-1 text-lg font-bold ${sys?.db.connected ? 'text-emerald-600' : 'text-red-600'}`}>{sys ? (sys.db.connected ? '● Connected' : '● Disconnected') : '...'}</p>
                  {sys?.db.tables && <p className="mt-2 text-xs text-slate-500">admins: {sys.db.tables.admins} · submissions: {sys.db.tables.submissions} · logins: {sys.db.tables.login_logs}</p>}
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <p className="text-sm text-slate-500">Email service</p>
                  <p className={`mt-1 text-lg font-bold ${sys && sys.mail.apiKey && sys.mail.sender && sys.mail.owner ? 'text-emerald-600' : 'text-amber-600'}`}>{sys ? (sys.mail.apiKey && sys.mail.sender && sys.mail.owner ? '● Configured' : '● Setup incomplete') : '...'}</p>
                  {sys && <p className="mt-2 text-xs text-slate-500">API key {sys.mail.apiKey ? '✓' : '✗'} · Sender {sys.mail.sender ? '✓' : '✗'} · Owner email {sys.mail.owner ? '✓' : '✗'}</p>}
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <p className="text-sm text-slate-500">Server</p>
                  <p className="mt-1 text-lg font-bold text-[#003B5C]">{sys ? `Node ${sys.server.node}` : '...'}</p>
                  {sys && <p className="mt-2 text-xs text-slate-500">Uptime: {sys.server.uptimeMin} min</p>}
                </div>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <form onSubmit={changePw} className="rounded-2xl bg-white p-5 shadow-sm">
                  <h3 className="mb-4 font-semibold text-[#003B5C]">Password badlein</h3>
                  {[['cur', 'Maujooda password'], ['n1', 'Naya password (10+ chars, harf + number)'], ['n2', 'Naya password dobara']].map(([k, ph]) => (
                    <input key={k} type="password" required placeholder={ph} value={pw[k]} onChange={(e) => setPw({ ...pw, [k]: e.target.value })} className="mb-3 w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-[#1CA7C7] focus:ring-4 focus:ring-[#1CA7C7]/20" />
                  ))}
                  <button className="w-full rounded-xl bg-[#F5456B] py-2 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#003B5C]">Update Password</button>
                </form>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <h3 className="mb-4 font-semibold text-[#003B5C]">Login History</h3>
                  <div className="max-h-72 space-y-2 overflow-y-auto">
                    {logins.map((l, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-xs">
                        <span className={`h-2.5 w-2.5 rounded-full ${l.success ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        <span className="flex-1"><b>{l.phone}</b> · {l.ip}<br /><span className="text-slate-500">{fmt(l.created_at)}</span></span>
                        <span className={l.success ? 'text-emerald-600' : 'text-red-600'}>{l.success ? 'Success' : 'Failed'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <AnimatePresence>{sel && <Modal item={sel} onClose={() => setSel(null)} onStatus={setStatus} onDelete={remove} />}</AnimatePresence>

      <AnimatePresence>
        {warn !== null && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-2xl bg-[#F5456B] px-6 py-4 text-white shadow-2xl">
            ⏳ Inactivity ki wajah se {warn} second mein logout ho jayega. Mouse hilayen.
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="fixed right-5 top-20 z-[60] rounded-xl bg-[#003B5C] px-5 py-3 text-sm text-white shadow-xl">{toast}</motion.div>}
      </AnimatePresence>
    </div>
  );
}