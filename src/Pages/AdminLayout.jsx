import React, { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  ShieldCheck,
  Trash2,
  Clock3,
  ChevronRight,
  Menu,
  X,
  Database,
  LockKeyhole,
  Sparkles,
  CircleCheck,
  AlertTriangle,
  RefreshCw,
  Mail,
  CalendarCheck2,
  TimerReset,
  Info,
  Check,
  Activity,
} from "lucide-react";
import {
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [warning, setWarning] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());

  const [stats, setStats] = useState({
    appointments: 0,
    contacts: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [liveStreamActive, setLiveStreamActive] = useState(true);

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("adminSettings");
      return saved
        ? JSON.parse(saved)
        : {
            autoDeleteDays: 30,
            autoDeleteContacts: true,
            autoDeleteAppointments: true,
            appointmentNotifications: true,
            contactNotifications: true,
          };
    } catch {
      return {
        autoDeleteDays: 30,
        autoDeleteContacts: true,
        autoDeleteAppointments: true,
        appointmentNotifications: true,
        contactNotifications: true,
      };
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchStats = async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true);
      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/login");
        return;
      }

      setLoadingStats(true);

      const [appointmentsResponse, contactsResponse] = await Promise.all([
        fetch("http://localhost:5000/api/admin/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/admin/contacts", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (
        appointmentsResponse.status === 401 ||
        contactsResponse.status === 401
      ) {
        localStorage.removeItem("adminToken");
        navigate("/login");
        return;
      }

      const appointmentsData = await appointmentsResponse.json();
      const contactsData = await contactsResponse.json();

      setStats({
        appointments: Array.isArray(appointmentsData)
          ? appointmentsData.length
          : appointmentsData?.appointments?.length || 0,
        contacts: Array.isArray(contactsData)
          ? contactsData.length
          : contactsData?.contacts?.length || 0,
      });
    } catch (error) {
      console.error("Dashboard stats error:", error);
    } finally {
      setLoadingStats(false);
      setTimeout(() => setRefreshing(false), 500);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (!liveStreamActive) return;
    const livePoll = setInterval(() => fetchStats(), 15000);

    const handleStorageSync = (e) => {
      if (e.key === "adminToken" && !e.newValue) {
        navigate("/login");
      }
      if (e.key === "adminSettings" && e.newValue) {
        try {
          setSettings(JSON.parse(e.newValue));
        } catch (err) {
          console.error("Sync error:", err);
        }
      }
    };

    window.addEventListener("storage", handleStorageSync);
    return () => {
      clearInterval(livePoll);
      window.removeEventListener("storage", handleStorageSync);
    };
  }, [liveStreamActive, navigate]);

  const saveSettings = () => {
    localStorage.setItem("adminSettings", JSON.stringify(settings));
    setSettingsOpen(false);
  };

  useEffect(() => {
    let inactivityTimer;
    let warningTimer;

    const logoutAdmin = () => {
      localStorage.removeItem("adminToken");
      setWarning(false);
      navigate("/login");
      alert("Your admin session expired because of inactivity. Please login again.");
    };

    const showWarning = () => setWarning(true);

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      clearTimeout(warningTimer);
      setWarning(false);
      warningTimer = setTimeout(showWarning, 270000);
      inactivityTimer = setTimeout(logoutAdmin, 300000);
    };

    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      clearTimeout(warningTimer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [navigate]);

  const pageInfo = useMemo(() => {
    if (location.pathname.includes("appointments")) {
      return {
        title: "Appointments Management",
        subtitle: "Real-time patient schedule control & monitoring",
        icon: CalendarDays,
      };
    }
    if (location.pathname.includes("contacts")) {
      return {
        title: "Client Inquiries",
        subtitle: "Active contact submissions and user feedback inbox",
        icon: MessageSquare,
      };
    }
    if (location.pathname.includes("settings")) {
      return {
        title: "Admin Settings",
        subtitle: "Configure automated rules, retention, and preferences",
        icon: Settings,
      };
    }
    return {
      title: "Executive Overview",
      subtitle: "Welcome back to your live management hub",
      icon: LayoutDashboard,
    };
  }, [location.pathname]);

  const PageIcon = pageInfo.icon;

  const navigationItems = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Appointments", path: "/admin/appointments", icon: CalendarDays, badge: stats.appointments },
    { label: "Contacts", path: "/admin/contacts", icon: MessageSquare, badge: stats.contacts },
  ];

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  const handleNavigation = (path) => {
    setMobileSidebar(false);
    navigate(path);
  };

  const logout = () => {
    setLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const formattedTime = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const formattedDate = currentTime.toLocaleDateString([], { weekday: "long", year: "numeric", month: "short", day: "numeric" });

  const notifications = [];
  if (settings.appointmentNotifications && stats.appointments > 0) {
    notifications.push({ icon: CalendarCheck2, title: "Appointments active", text: `${stats.appointments} appointment record${stats.appointments === 1 ? "" : "s"} currently registered.` });
  }
  if (settings.contactNotifications && stats.contacts > 0) {
    notifications.push({ icon: Mail, title: "New client inquiries", text: `${stats.contacts} contact submission${stats.contacts === 1 ? "" : "s"} pending review.` });
  }
  if (notifications.length === 0) {
    notifications.push({ icon: CircleCheck, title: "System Optimized", text: "All live database metrics are up to date." });
  }

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

    :root {
      --teal-darkest: #021a19;
      --teal-dark: #042f2e;
      --teal-primary: #0f766e;
      --teal-glow: #14b8a6;
      --teal-accent: #2dd4bf;
      --teal-subtle: #f0fdfa;
      
      --bg-canvas: #f8fafc;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --border-color: rgba(15, 118, 110, 0.12);
      
      --sidebar-width: 280px;
      --shadow-premium: 0 10px 30px -5px rgba(4, 47, 46, 0.08), 0 0 1px 1px rgba(15, 118, 110, 0.06);
      --shadow-hover: 0 20px 40px -10px rgba(4, 47, 46, 0.14);
    }

    * { box-sizing: border-box; letter-spacing: -0.01em; }
    html, body, #root { min-height: 100%; margin: 0; }
    
    body {
      font-family: 'Inter', sans-serif;
      background: var(--bg-canvas);
      color: var(--text-main);
      -webkit-font-smoothing: antialiased;
    }

    .admin-shell {
      min-height: 100vh;
      display: flex;
      background: linear-gradient(135deg, #f0fdfa 0%, #f8fafc 50%, #f4f6f8 100%);
      position: relative;
    }

    /* Unique Glassmorphic Sidebar */
    .admin-sidebar {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: var(--sidebar-width);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      background: linear-gradient(180deg, #022c2a 0%, #042120 50%, #011615 100%);
      border-right: 1px solid rgba(20, 184, 166, 0.15);
      box-shadow: 10px 0 40px rgba(2, 26, 25, 0.3);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sidebar-brand {
      height: 90px;
      padding: 0 24px;
      display: flex;
      align-items: center;
      gap: 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      background: rgba(255, 255, 255, 0.02);
    }

    .brand-logo {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      color: white;
      background: linear-gradient(135deg, var(--teal-glow), var(--teal-primary));
      box-shadow: 0 8px 20px rgba(20, 184, 166, 0.4);
    }

    .brand-title {
      color: white;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 13px;
      font-weight: 700;
      line-height: 1.3;
    }

    .brand-subtitle {
      margin-top: 2px;
      color: var(--teal-glow);
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .sidebar-section {
      padding: 24px 16px 12px;
    }

    .sidebar-section-label {
      padding: 0 12px 10px;
      color: rgba(255, 255, 255, 0.35);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .nav-item {
      position: relative;
      width: 100%;
      height: 48px;
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 0 16px;
      border: 1px solid transparent;
      border-radius: 14px;
      color: rgba(255, 255, 255, 0.65);
      background: transparent;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .nav-item:hover {
      color: white;
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.06);
      transform: translateX(3px);
    }

    .nav-item.active {
      color: white;
      background: linear-gradient(135deg, rgba(20, 184, 166, 0.25), rgba(15, 118, 110, 0.15));
      border-color: rgba(45, 212, 191, 0.3);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 15px rgba(20, 184, 166, 0.15);
    }

    .nav-icon {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      border-radius: 10px;
      color: rgba(255, 255, 255, 0.8);
      background: rgba(255, 255, 255, 0.04);
      transition: 0.2s;
    }

    .nav-item.active .nav-icon {
      color: var(--teal-accent);
      background: rgba(20, 184, 166, 0.25);
    }

    .nav-label {
      flex: 1;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 13px;
      font-weight: 600;
      text-align: left;
    }

    .nav-badge {
      min-width: 24px;
      height: 22px;
      padding: 0 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      color: white;
      background: var(--teal-primary);
      font-size: 10px;
      font-weight: 800;
      box-shadow: 0 0 10px rgba(20, 184, 166, 0.4);
    }

    .sidebar-bottom {
      margin-top: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: rgba(0, 0, 0, 0.15);
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    .security-box {
      padding: 14px;
      border: 1px solid rgba(20, 184, 166, 0.15);
      border-radius: 14px;
      background: rgba(4, 47, 46, 0.4);
    }

    .security-title {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #5eead4;
      font-size: 11px;
      font-weight: 700;
    }

    .security-description {
      margin-top: 4px;
      color: rgba(255, 255, 255, 0.5);
      font-size: 10px;
      line-height: 1.4;
    }

    .security-status {
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
      color: #34d399;
      font-size: 10px;
      font-weight: 700;
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #34d399;
      box-shadow: 0 0 8px #34d399;
      animation: pulseDot 2s infinite;
    }

    @keyframes pulseDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.7); }
    }

    .logout-button {
      width: 100%;
      height: 46px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 16px;
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: 14px;
      color: #fca5a5;
      background: rgba(239, 68, 68, 0.08);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .logout-button:hover {
      color: #ffffff;
      background: rgba(239, 68, 68, 0.25);
      border-color: rgba(239, 68, 68, 0.4);
      transform: translateY(-1px);
    }

    .logout-label {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12px;
      font-weight: 700;
    }

    /* Main Content Area */
    .admin-main {
      flex: 1;
      margin-left: var(--sidebar-width);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 1;
    }

    .top-header {
      position: sticky;
      top: 0;
      z-index: 800;
      height: 88px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 36px;
      background: rgba(248, 250, 252, 0.85);
      border-bottom: 1px solid var(--border-color);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .mobile-menu-button {
      width: 42px;
      height: 42px;
      display: none;
      place-items: center;
      border: 1px solid var(--border-color);
      border-radius: 12px;
      color: var(--teal-primary);
      background: white;
      cursor: pointer;
    }

    .page-icon {
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      border-radius: 14px;
      color: white;
      background: linear-gradient(135deg, var(--teal-primary), var(--teal-glow));
      box-shadow: 0 8px 20px rgba(15, 118, 110, 0.25);
    }

    .header-title {
      margin: 0;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 16px;
      font-weight: 800;
      color: var(--text-main);
    }

    .header-subtitle {
      margin: 2px 0 0;
      color: var(--text-muted);
      font-size: 11px;
      font-weight: 500;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .clock-box {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding-right: 8px;
      border-right: 1px solid var(--border-color);
    }

    .clock-time {
      color: var(--text-main);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 13px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }

    .clock-date {
      margin-top: 1px;
      color: var(--text-muted);
      font-size: 10px;
      font-weight: 600;
    }

    .header-icon-button {
      position: relative;
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border: 1px solid var(--border-color);
      border-radius: 12px;
      color: var(--text-muted);
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .header-icon-button:hover {
      color: var(--teal-primary);
      border-color: var(--teal-glow);
      transform: translateY(-2px);
      box-shadow: var(--shadow-premium);
    }

    .notification-dot {
      position: absolute;
      top: 9px;
      right: 9px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #ef4444;
      box-shadow: 0 0 8px #ef4444;
    }

    .profile-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 14px 6px 6px;
      border: 1px solid var(--border-color);
      border-radius: 16px;
      background: white;
      box-shadow: var(--shadow-premium);
    }

    .profile-avatar {
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      border-radius: 12px;
      color: white;
      background: linear-gradient(135deg, var(--teal-dark), var(--teal-primary));
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12px;
      font-weight: 800;
    }

    .profile-info {
      display: flex;
      flex-direction: column;
    }

    .profile-name {
      color: var(--text-main);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12px;
      font-weight: 700;
    }

    .profile-role {
      color: var(--teal-primary);
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .admin-content {
      padding: 36px;
      max-width: 1600px;
      width: 100%;
      margin: 0 auto;
      flex: 1;
    }

    /* Unique Hero Banner */
    .overview-hero {
      position: relative;
      overflow: hidden;
      padding: 42px;
      border-radius: 28px;
      background: radial-gradient(circle at 90% 10%, rgba(20, 184, 166, 0.3) 0%, transparent 40%),
                  linear-gradient(135deg, #022c2a 0%, #042625 50%, #011615 100%);
      color: white;
      box-shadow: 0 25px 50px -12px rgba(4, 47, 46, 0.25);
      margin-bottom: 32px;
      border: 1px solid rgba(20, 184, 166, 0.2);
    }

    .hero-grid {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: 1.4fr 0.6fr;
      gap: 30px;
      align-items: center;
    }

    .hero-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 999px;
      color: #99f6e4;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .hero-title {
      margin: 16px 0 0;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: clamp(26px, 2.5vw, 36px);
      font-weight: 800;
      line-height: 1.15;
    }

    .hero-title span {
      color: #5eead4;
      text-shadow: 0 0 30px rgba(94, 234, 212, 0.3);
    }

    .hero-description {
      margin: 14px 0 0;
      color: rgba(255, 255, 255, 0.7);
      font-size: 13px;
      line-height: 1.7;
      max-width: 620px;
    }

    .hero-actions {
      display: flex;
      gap: 14px;
      margin-top: 26px;
    }

    .hero-button {
      min-height: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 0 20px;
      border-radius: 14px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .hero-button-primary {
      color: #022c2a;
      background: #5eead4;
      border: none;
      box-shadow: 0 10px 25px rgba(94, 234, 212, 0.3);
    }

    .hero-button-primary:hover {
      background: #2dd4bf;
      transform: translateY(-2px);
      box-shadow: 0 15px 30px rgba(94, 234, 212, 0.4);
    }

    .hero-button-secondary {
      color: white;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .hero-button-secondary:hover {
      background: rgba(255, 255, 255, 0.12);
      transform: translateY(-2px);
    }

    /* Section & Stats Grid */
    .section-heading {
      margin: 32px 0 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .section-heading h2 {
      margin: 0;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 16px;
      font-weight: 800;
      color: var(--text-main);
    }

    .section-heading p {
      margin: 3px 0 0;
      color: var(--text-muted);
      font-size: 11px;
      font-weight: 500;
    }

    .refresh-button {
      min-height: 38px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 0 14px;
      border: 1px solid var(--border-color);
      border-radius: 12px;
      color: var(--teal-primary);
      background: white;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.02);
      transition: all 0.2s ease;
    }

    .refresh-button:hover {
      background: var(--teal-subtle);
      border-color: var(--teal-glow);
      transform: translateY(-1px);
    }

    .refresh-spin { animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .stat-card {
      padding: 26px;
      border: 1px solid var(--border-color);
      border-radius: 22px;
      background: white;
      box-shadow: var(--shadow-premium);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .stat-card::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--teal-primary), var(--teal-glow));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-hover);
      border-color: rgba(20, 184, 166, 0.3);
    }

    .stat-card:hover::after {
      opacity: 1;
    }

    .stat-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .stat-icon {
      width: 46px;
      height: 46px;
      display: grid;
      place-items: center;
      border-radius: 14px;
      color: var(--teal-primary);
      background: var(--teal-subtle);
      border: 1px solid rgba(20, 184, 166, 0.15);
    }

    .stat-label {
      margin-top: 18px;
      color: var(--text-muted);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .stat-number {
      margin-top: 6px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 34px;
      font-weight: 800;
      color: var(--text-main);
    }

    .stat-footer {
      margin-top: 14px;
      padding-top: 14px;
      border-top: 1px dashed var(--border-color);
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--teal-primary);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
    }

    /* Features Grid */
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 24px;
    }

    .feature-card {
      padding: 24px;
      border: 1px solid var(--border-color);
      border-radius: 20px;
      background: white;
      box-shadow: var(--shadow-premium);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-hover);
      border-color: rgba(20, 184, 166, 0.3);
    }

    .feature-icon {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      color: var(--teal-primary);
      border-radius: 12px;
      background: var(--teal-subtle);
    }

    .feature-title {
      margin-top: 16px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 14px;
      font-weight: 700;
      color: var(--text-main);
    }

    .feature-text {
      margin-top: 6px;
      color: var(--text-muted);
      font-size: 12px;
      line-height: 1.6;
    }

    /* Unique Glassmorphic Logout Modal */
    .custom-modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 5000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: rgba(2, 26, 25, 0.75);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      animation: overlayFadeIn 0.3s ease forwards;
    }

    @keyframes overlayFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .custom-modal-card {
      width: 100%;
      max-width: 420px;
      background: linear-gradient(145deg, #042f2e 0%, #021c1b 100%);
      border: 1px solid rgba(45, 212, 191, 0.3);
      border-radius: 28px;
      padding: 36px;
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.7), 0 0 40px rgba(20, 184, 166, 0.2);
      text-align: center;
      animation: modalScaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes modalScaleUp {
      from { opacity: 0; transform: scale(0.9) translateY(20px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .custom-modal-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 20px auto;
      display: grid;
      place-items: center;
      border-radius: 20px;
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #f87171;
      box-shadow: 0 0 25px rgba(239, 68, 68, 0.25);
    }

    .custom-modal-title {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 20px;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 8px 0;
    }

    .custom-modal-text {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.7);
      margin: 0 0 30px 0;
      line-height: 1.6;
    }

    .custom-modal-actions {
      display: flex;
      gap: 14px;
    }

    .modal-btn-cancel, .modal-btn-confirm {
      flex: 1;
      min-height: 46px;
      border-radius: 14px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s ease;
    }

    .modal-btn-cancel {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #ffffff;
    }

    .modal-btn-cancel:hover {
      background: rgba(255, 255, 255, 0.12);
      transform: translateY(-1px);
    }

    .modal-btn-confirm {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      border: none;
      color: #ffffff;
      box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
    }

    .modal-btn-confirm:hover {
      background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
      transform: translateY(-1px);
      box-shadow: 0 12px 30px rgba(239, 68, 68, 0.6);
    }

    /* Dropdown & Settings Overlays */
    .dropdown-wrapper { position: relative; }
    .notification-dropdown {
      position: absolute;
      right: 0;
      top: 52px;
      width: 320px;
      padding: 14px;
      border: 1px solid var(--border-color);
      border-radius: 18px;
      background: white;
      box-shadow: var(--shadow-hover);
      z-index: 999;
      animation: dropdownIn 0.2s ease;
    }

    @keyframes dropdownIn {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .dropdown-heading {
      padding: 6px 8px 12px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-color);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12px;
      font-weight: 700;
    }

    .notification-item {
      display: flex;
      gap: 12px;
      padding: 12px 8px;
      border-bottom: 1px solid rgba(15,118,110,0.05);
    }

    .notification-icon {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      color: var(--teal-primary);
      background: var(--teal-subtle);
      border-radius: 10px;
    }

    .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 3000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: rgba(2, 26, 25, 0.6);
      backdrop-filter: blur(8px);
    }

    .settings-modal {
      width: min(700px, 100%);
      max-height: 90vh;
      overflow-y: auto;
      border-radius: 24px;
      background: white;
      box-shadow: 0 30px 90px rgba(0, 0, 0, 0.25);
      border: 1px solid var(--border-color);
    }

    .settings-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 22px 26px;
      border-bottom: 1px solid var(--border-color);
      background: #fafafa;
    }

    .settings-body { padding: 26px; }

    .setting-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 16px;
      border: 1px solid var(--border-color);
      border-radius: 16px;
      margin-bottom: 14px;
      background: #fdfefe;
    }

    .toggle {
      width: 44px;
      height: 24px;
      position: relative;
      border-radius: 999px;
      background: #cbd5e1;
      border: none;
      cursor: pointer;
      transition: 0.25s;
    }

    .toggle::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      transition: 0.25s;
    }

    .toggle.on { background: var(--teal-primary); }
    .toggle.on::after { transform: translateX(20px); }

    .retention-select {
      min-width: 120px;
      height: 38px;
      padding: 0 12px;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12px;
      font-weight: 700;
      color: var(--text-main);
      background: #fdfefe;
      outline: none;
    }

    .settings-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 18px 26px;
      border-top: 1px solid var(--border-color);
      background: #fafafa;
    }

    .modal-button {
      min-height: 40px;
      padding: 0 16px;
      border-radius: 12px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s;
    }

    .modal-button-cancel {
      border: 1px solid var(--border-color);
      background: white;
      color: var(--text-muted);
    }
    .modal-button-cancel:hover { background: #f1f5f9; }

    .modal-button-save {
      border: none;
      color: white;
      background: var(--teal-primary);
      box-shadow: 0 4px 15px rgba(15, 118, 110, 0.3);
    }
    .modal-button-save:hover { background: #0d655e; }

    .sidebar-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 900;
      background: rgba(2, 26, 25, 0.5);
      backdrop-filter: blur(4px);
    }

    @media (max-width: 950px) {
      .feature-grid { grid-template-columns: 1fr; }
      .hero-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 850px) {
      .admin-sidebar { transform: translateX(-105%); }
      .admin-sidebar.mobile-open { transform: translateX(0); }
      .admin-main { margin-left: 0; }
      .mobile-menu-button { display: grid; }
      .sidebar-overlay { display: block; }
      .stats-grid { grid-template-columns: 1fr; }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="admin-shell">
        <div className={`sidebar-overlay ${mobileSidebar ? "active" : ""}`} onClick={() => setMobileSidebar(false)} />

        {/* SIDEBAR */}
        <aside className={`admin-sidebar ${mobileSidebar ? "mobile-open" : ""}`}>
          <div className="sidebar-brand">
            <div className="brand-logo">
              <ShieldCheck size={24} strokeWidth={2.2} />
            </div>
            <div className="brand-text">
              <div className="brand-title">ABC Autism<br />Behavioural Center</div>
              <div className="brand-subtitle">Control Hub</div>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-label">Main Navigation</div>
            <nav className="sidebar-nav">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item);
                return (
                  <button
                    key={item.path}
                    type="button"
                    className={`nav-item ${active ? "active" : ""}`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <span className="nav-icon"><Icon size={18} strokeWidth={2} /></span>
                    <span className="nav-label">{item.label}</span>
                    {typeof item.badge === "number" && <span className="nav-badge">{item.badge}</span>}
                    <ChevronRight className="nav-arrow" size={14} style={{ opacity: active ? 1 : 0.4 }} />
                  </button>
                );
              })}

              <button
                type="button"
                className="nav-item"
                onClick={() => {
                  setSettingsOpen(true);
                  setMobileSidebar(false);
                }}
              >
                <span className="nav-icon"><Settings size={18} strokeWidth={2} /></span>
                <span className="nav-label">Settings</span>
                <ChevronRight className="nav-arrow" size={14} style={{ opacity: 0.4 }} />
              </button>
            </nav>
          </div>

          <div className="sidebar-bottom">
            <div className="security-box">
              <div className="security-title">
                <LockKeyhole size={13} /> Secure Token Guard
              </div>
              <div className="security-description">Active real-time cryptographic tracking.</div>
              <div className="security-status">
                <span className="status-dot" /> Live Stream Sync
              </div>
            </div>
            <button type="button" className="logout-button" onClick={logout}>
              <LogOut size={16} />
              <span className="logout-label">Sign Out Session</span>
            </button>
          </div>
        </aside>

        {/* MAIN AREA */}
        <main className="admin-main">
          <header className="top-header">
            <div className="header-left">
              <button className="mobile-menu-button" onClick={() => setMobileSidebar(true)} aria-label="Open menu">
                <Menu size={18} />
              </button>
              <div className="page-icon">
                <PageIcon size={18} strokeWidth={2} />
              </div>
              <div>
                <h1 className="header-title">{pageInfo.title}</h1>
                <p className="header-subtitle">{pageInfo.subtitle}</p>
              </div>
            </div>

            <div className="header-actions">
              <div className="clock-box">
                <div className="clock-time">{formattedTime}</div>
                <div className="clock-date">{formattedDate}</div>
              </div>

              <div className="dropdown-wrapper">
                <button className="header-icon-button" onClick={() => setNotificationsOpen(!notificationsOpen)} aria-label="Notifications">
                  <Bell size={16} />
                  {notifications.length > 0 && <span className="notification-dot" />}
                </button>

                {notificationsOpen && (
                  <div className="notification-dropdown">
                    <div className="dropdown-heading">
                      <strong>Notifications</strong>
                      <span style={{ color: "var(--teal-primary)" }}>Real-Time Feed</span>
                    </div>
                    {notifications.map((notification, index) => {
                      const Icon = notification.icon;
                      return (
                        <div className="notification-item" key={index}>
                          <div className="notification-icon"><Icon size={15} /></div>
                          <div>
                            <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-main)" }}>{notification.title}</div>
                            <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{notification.text}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <button className="header-icon-button" onClick={() => setSettingsOpen(true)} aria-label="Settings">
                <Settings size={16} />
              </button>

              <div className="profile-card">
                <div className="profile-avatar">RA</div>
                <div className="profile-info">
                  <div className="profile-name">Rao Adnan</div>
                  <div className="profile-role">Super Admin</div>
                </div>
              </div>
            </div>
          </header>

          <section className="admin-content">
            {location.pathname === "/admin" || location.pathname === "/admin/" ? (
              <>
                <section className="overview-hero">
                  <div className="hero-grid">
                    <div>
                      <div className="hero-eyebrow">
                        <Sparkles size={12} /> Live Management Console
                      </div>
                      <h2 className="hero-title">
                        Command your center<br />
                        <span>smarter & securely in real-time.</span>
                      </h2>
                      <p className="hero-description">
                        Monitor live appointment counts, view incoming client contact submissions instantly, and maintain strict control over your clinical administrative workflows.
                      </p>
                      <div className="hero-actions">
                        <button className="hero-button hero-button-primary" onClick={() => navigate("/admin/appointments")}>
                          <CalendarDays size={15} /> View Appointments <ChevronRight size={14} />
                        </button>
                        <button className="hero-button hero-button-secondary" onClick={() => navigate("/admin/contacts")}>
                          <MessageSquare size={15} /> View Inquiries
                        </button>
                      </div>
                    </div>
                    <div style={{ display: "grid", placeItems: "center" }}>
                      <Activity size={68} color="#5eead4" strokeWidth={1.5} style={{ filter: "drop-shadow(0 0 20px rgba(94,234,212,0.4))" }} />
                    </div>
                  </div>
                </section>

                <div className="section-heading">
                  <div>
                    <h2>Live Overview Metrics</h2>
                    <p>Synchronized directly from the live database backend</p>
                  </div>
                  <button className="refresh-button" onClick={() => fetchStats(true)}>
                    <RefreshCw size={13} className={refreshing ? "refresh-spin" : ""} />
                    {refreshing ? "Syncing..." : "Sync Live Data"}
                  </button>
                </div>

                <div className="stats-grid">
                  <div className="stat-card" onClick={() => navigate("/admin/appointments")} style={{ cursor: "pointer" }}>
                    <div className="stat-top">
                      <div className="stat-icon"><CalendarDays size={20} /></div>
                      <Clock3 size={15} color="#94a3b8" />
                    </div>
                    <div className="stat-label">Total Appointments</div>
                    <div className="stat-number">{loadingStats ? "..." : stats.appointments}</div>
                    <div className="stat-footer">
                      <CircleCheck size={13} /> Active records registered <ChevronRight size={14} style={{ marginLeft: "auto" }} />
                    </div>
                  </div>

                  <div className="stat-card" onClick={() => navigate("/admin/contacts")} style={{ cursor: "pointer" }}>
                    <div className="stat-top">
                      <div className="stat-icon"><MessageSquare size={20} /></div>
                      <Clock3 size={15} color="#94a3b8" />
                    </div>
                    <div className="stat-label">Client Inquiries</div>
                    <div className="stat-number">{loadingStats ? "..." : stats.contacts}</div>
                    <div className="stat-footer">
                      <CircleCheck size={13} /> Pending submissions inbox <ChevronRight size={14} style={{ marginLeft: "auto" }} />
                    </div>
                  </div>
                </div>

                <div className="section-heading">
                  <div>
                    <h2>Administration Tools</h2>
                    <p>Quick access shortcuts for key management panels</p>
                  </div>
                </div>

                <div className="feature-grid">
                  <div className="feature-card" onClick={() => navigate("/admin/appointments")}>
                    <div className="feature-icon"><CalendarCheck2 size={18} /></div>
                    <div className="feature-title">Appointment Management</div>
                    <div className="feature-text">Review, filter, and monitor all booked patient consultations seamlessly.</div>
                  </div>
                  <div className="feature-card" onClick={() => navigate("/admin/contacts")}>
                    <div className="feature-icon"><Mail size={18} /></div>
                    <div className="feature-title">Client Inquiries</div>
                    <div className="feature-text">Inspect user contact queries and coordinate follow-up actions.</div>
                  </div>
                  <div className="feature-card" onClick={() => setSettingsOpen(true)}>
                    <div className="feature-icon"><TimerReset size={18} /></div>
                    <div className="feature-title">Data & System Settings</div>
                    <div className="feature-text">Configure automated retention parameters and alert notifications.</div>
                  </div>
                </div>
              </>
            ) : (
              children || <Outlet />
            )}
          </section>
        </main>

        {warning && (
          <div style={{ position: "fixed", right: 28, bottom: 28, zIndex: 4000, display: "flex", gap: 14, padding: 18, borderRadius: 16, background: "#fefce8", color: "#78350f", border: "1px solid rgba(245,158,11,0.3)", boxShadow: "0 20px 40px rgba(120,53,15,0.15)" }}>
            <AlertTriangle size={18} style={{ color: "#d97706", flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: "12px", fontWeight: 800 }}>Session Expiring Soon</div>
              <div style={{ fontSize: "11px", marginTop: 2, color: "#92400e" }}>Move your cursor to keep the session active.</div>
            </div>
          </div>
        )}

        {settingsOpen && (
          <div className="modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setSettingsOpen(false); }}>
            <div className="settings-modal">
              <div className="settings-header">
                <div>
                  <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Administration Settings</h3>
                  <p style={{ margin: "2px 0 0", fontSize: "11px", color: "var(--text-muted)" }}>Customize preferences and retention parameters</p>
                </div>
                <button className="modal-button modal-button-cancel" onClick={() => setSettingsOpen(false)} style={{ width: 36, height: 36, padding: 0, display: "grid", placeItems: "center" }}><X size={16} /></button>
              </div>
              <div className="settings-body">
                <div className="setting-row">
                  <div>
                    <strong style={{ fontSize: "12px", color: "var(--text-main)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Automatic Contact Cleanup</strong>
                    <div style={{ fontSize: "11px", color: 'var(--text-muted)', marginTop: 2 }}>Flag old submissions for automated storage pruning.</div>
                  </div>
                  <button className={`toggle ${settings.autoDeleteContacts ? "on" : ""}`} onClick={() => setSettings(prev => ({ ...prev, autoDeleteContacts: !prev.autoDeleteContacts }))} />
                </div>
                <div className="setting-row">
                  <div>
                    <strong style={{ fontSize: "12px", color: "var(--text-main)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Retention Period</strong>
                    <div style={{ fontSize: "11px", color: 'var(--text-muted)', marginTop: 2 }}>Choose duration before archived records prune.</div>
                  </div>
                  <select className="retention-select" value={settings.autoDeleteDays} onChange={(e) => setSettings(prev => ({ ...prev, autoDeleteDays: Number(e.target.value) }))}>
                    <option value={7}>7 Days</option>
                    <option value={30}>30 Days</option>
                    <option value={90}>90 Days</option>
                  </select>
                </div>
              </div>
              <div className="settings-footer">
                <button className="modal-button modal-button-cancel" onClick={() => setSettingsOpen(false)}>Cancel</button>
                <button className="modal-button modal-button-save" onClick={saveSettings}><Check size={14} style={{ marginRight: 6 }} /> Save Preferences</button>
              </div>
            </div>
          </div>
        )}

        {/* CUSTOM UNIQUE LOGOUT MODAL */}
        {logoutModalOpen && (
          <div className="custom-modal-overlay">
            <div className="custom-modal-card">
              <div className="custom-modal-icon">
                <LogOut size={28} />
              </div>
              <h3 className="custom-modal-title">Sign Out Confirmation</h3>
              <p className="custom-modal-text">
                Are you sure you want to securely log out from the administrator panel?
              </p>
              <div className="custom-modal-actions">
                <button 
                  className="modal-btn-cancel" 
                  onClick={() => setLogoutModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="modal-btn-confirm" 
                  onClick={confirmLogout}
                >
                  Yes, Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}