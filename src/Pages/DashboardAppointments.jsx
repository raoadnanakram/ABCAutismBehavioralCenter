import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  RefreshCw,
  Download,
  Search,
  SlidersHorizontal,
  ChevronDown,
  UserRound,
  Baby,
  Phone,
  Clock3,
  BriefcaseMedical,
  Eye,
  X,
  CheckCircle2,
  CircleAlert,
  CircleX,
  Timer,
  Users,
  CalendarCheck2,
  ClipboardList,
  MessageSquare,
  Mail,
} from "lucide-react";

export default function DashboardAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedAppointment, setSelectedAppointment] =
    useState(null);

  /* =========================================================
     FETCH APPOINTMENTS
  ========================================================= */

  const fetchAppointments = async (showSync = false) => {
    if (showSync) {
      setSyncing(true);
    } else {
      setLoading(true);
    }

    const token = localStorage.getItem("adminToken");

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        const enriched = Array.isArray(data.appointments)
          ? data.appointments.map((item) => ({
              ...item,
              status: item.status || "Pending",
            }))
          : [];

        setAppointments(enriched);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error(
        "Appointments fetch karne mein error:",
        error
      );

      setAppointments([]);
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  /* =========================================================
     HELPERS
  ========================================================= */

  const safeText = (value, fallback = "N/A") => {
    if (
      value === null ||
      value === undefined ||
      String(value).trim() === ""
    ) {
      return fallback;
    }

    return String(value);
  };

  const getInitials = (name = "") => {
    const value = String(name).trim();

    if (!value) return "NA";

    return value
      .split(/\s+/)
      .slice(0, 2)
      .map((word) =>
        word.charAt(0).toUpperCase()
      )
      .join("");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 size={14} />;

      case "Confirmed":
        return <CalendarCheck2 size={14} />;

      case "Cancelled":
        return <CircleX size={14} />;

      default:
        return <Timer size={14} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "status-completed";

      case "Confirmed":
        return "status-confirmed";

      case "Cancelled":
        return "status-cancelled";

      default:
        return "status-pending";
    }
  };

  /* =========================================================
     STATUS CHANGE
     
     IMPORTANT:
     Current backend source provided by you does not show
     a status-update API endpoint.

     Therefore this updates the current UI state only.
  ========================================================= */

  const handleStatusChange = async (id, newStatus) => {
    setAppointments((previous) =>
      previous.map((item) =>
        item._id === id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );

    /*
      If your backend later has an endpoint such as:

      PATCH /api/admin/appointments/:id/status

      then the API request can be added here.
    */
  };

  /* =========================================================
     FILTER DATA
  ========================================================= */

  const filteredAppointments = useMemo(() => {
    const query = searchTerm
      .trim()
      .toLowerCase();

    return appointments.filter((item) => {
      const parentName = safeText(
        item.name,
        ""
      ).toLowerCase();

      const childName = safeText(
        item.childName,
        ""
      ).toLowerCase();

      const phone = safeText(
        item.phone,
        ""
      ).toLowerCase();

      const service = safeText(
        item.service,
        ""
      ).toLowerCase();

      const matchesSearch =
        !query ||
        parentName.includes(query) ||
        childName.includes(query) ||
        phone.includes(query) ||
        service.includes(query);

      const matchesService =
        selectedService === "All" ||
        item.service === selectedService;

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesService &&
        matchesStatus
      );
    });
  }, [
    appointments,
    searchTerm,
    selectedService,
    statusFilter,
  ]);

  /* =========================================================
     UNIQUE SERVICES
  ========================================================= */

  const uniqueServices = useMemo(() => {
    const services = appointments
      .map((item) => item.service)
      .filter(Boolean);

    return [
      "All",
      ...new Set(services),
    ];
  }, [appointments]);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const stats = useMemo(() => {
    const total = appointments.length;

    const pending = appointments.filter(
      (item) => item.status === "Pending"
    ).length;

    const confirmed = appointments.filter(
      (item) => item.status === "Confirmed"
    ).length;

    const completed = appointments.filter(
      (item) => item.status === "Completed"
    ).length;

    const cancelled = appointments.filter(
      (item) => item.status === "Cancelled"
    ).length;

    return {
      total,
      pending,
      confirmed,
      completed,
      cancelled,
    };
  }, [appointments]);

  /* =========================================================
     CSV EXPORT
  ========================================================= */

  const exportToCSV = () => {
    if (filteredAppointments.length === 0) {
      alert("No appointment data available to export.");
      return;
    }

    const escapeCSV = (value) => {
      return `"${String(value ?? "")
        .replace(/"/g, '""')
        .replace(/\r?\n|\r/g, " ")}"`;
    };

    const headers = [
      "Parent Name",
      "Child Name",
      "Service",
      "Phone",
      "Date",
      "Time",
      "Status",
    ];

    const rows = filteredAppointments.map(
      (item) => [
        item.name || "",
        item.childName || "N/A",
        item.service || "N/A",
        item.phone || "N/A",
        item.date || "N/A",
        item.time || "N/A",
        item.status || "Pending",
      ]
    );

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) =>
        row.map(escapeCSV).join(",")
      ),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `ABC_Appointments_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedService("All");
    setStatusFilter("All");
  };

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&display=swap');

        .appointments-page {
          --abc-teal: #0f766e;
          --abc-teal-dark: #064e4a;
          --abc-teal-deep: #042f2e;
          --abc-teal-soft: #f0fdfa;
          --abc-teal-light: #ecfdf9;

          --abc-gold: #f59e0b;
          --abc-gold-soft: #fffbeb;

          --abc-navy: #091e1c;
          --abc-text: #334155;
          --abc-muted: #64748b;

          --abc-border: #e2e8f0;
          --abc-bg: #f4f8f7;

          width: 100%;
          min-width: 0;
          min-height: 100%;

          padding: clamp(18px, 2.5vw, 34px);

          position: relative;

          background:
            radial-gradient(
              circle at 5% 5%,
              rgba(20,184,166,.10),
              transparent 30%
            ),
            radial-gradient(
              circle at 95% 95%,
              rgba(245,158,11,.08),
              transparent 30%
            ),
            var(--abc-bg);

          overflow-x: hidden;

          font-family:
            'Plus Jakarta Sans',
            sans-serif;
        }

        .appointments-page *,
        .appointments-page button,
        .appointments-page input,
        .appointments-page select {
          box-sizing: border-box;

          font-family:
            'Plus Jakarta Sans',
            sans-serif;
        }

        /* =====================================================
           BACKGROUND
        ===================================================== */

        .appointment-orb {
          position: fixed;

          pointer-events: none;

          border-radius: 50%;

          filter: blur(110px);

          opacity: .28;

          z-index: 0;
        }

        .appointment-orb.one {
          width: 330px;
          height: 330px;

          background: rgba(20,184,166,.22);

          top: -130px;
          left: -100px;

          animation:
            appointmentFloat
            13s
            ease-in-out
            infinite
            alternate;
        }

        .appointment-orb.two {
          width: 380px;
          height: 380px;

          background: rgba(245,158,11,.13);

          right: -150px;
          bottom: -140px;

          animation:
            appointmentFloat
            15s
            ease-in-out
            infinite
            alternate-reverse;
        }

        @keyframes appointmentFloat {
          from {
            transform:
              translate(0,0)
              scale(1);
          }

          to {
            transform:
              translate(35px,45px)
              scale(1.08);
          }
        }

        /* =====================================================
           MAIN CARD
        ===================================================== */

        .appointments-shell {
          width: 100%;
          max-width: 1600px;

          margin: 0 auto;

          position: relative;

          z-index: 2;

          background:
            rgba(255,255,255,.97);

          border:
            1px solid rgba(15,118,110,.12);

          border-radius: 28px;

          box-shadow:
            0 25px 70px
            rgba(4,47,46,.10);

          overflow: hidden;

          animation:
            appointmentEntrance
            .65s
            cubic-bezier(.16,1,.3,1)
            both;
        }

        @keyframes appointmentEntrance {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .appointments-header {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 22px;

          padding: 30px 32px;

          border-bottom:
            1px solid #edf2f2;

          background:
            linear-gradient(
              180deg,
              #ffffff,
              #fbfefd
            );
        }

        .appointments-title-area {
          display: flex;

          align-items: center;

          gap: 17px;

          min-width: 0;
        }

        .appointments-icon {
          width: 62px;
          height: 62px;

          flex: 0 0 62px;

          display: grid;

          place-items: center;

          border-radius: 19px;

          color: white;

          background:
            linear-gradient(
              135deg,
              var(--abc-teal),
              var(--abc-teal-deep)
            );

          box-shadow:
            0 14px 30px
            rgba(15,118,110,.25);

          transition: .3s ease;
        }

        .appointments-icon:hover {
          transform:
            translateY(-3px)
            rotate(-2deg);
        }

        .appointments-kicker {
          display: block;

          margin-bottom: 5px;

          color: var(--abc-teal);

          font-family:
            'Outfit',
            sans-serif;

          font-size: 10px;

          font-weight: 900;

          letter-spacing: 2.2px;

          text-transform: uppercase;
        }

        .appointments-title {
          margin: 0;

          color: var(--abc-navy);

          font-family:
            'Outfit',
            sans-serif;

          font-size:
            clamp(24px,2.4vw,34px);

          line-height: 1.05;

          font-weight: 800;

          letter-spacing: -.7px;
        }

        .appointments-subtitle {
          margin: 8px 0 0;

          color: var(--abc-muted);

          font-size: 13px;

          font-weight: 500;

          line-height: 1.5;
        }

        /* =====================================================
           HEADER BUTTON
        ===================================================== */

        .header-actions {
          display: flex;

          align-items: center;

          gap: 10px;

          flex-shrink: 0;
        }

        .primary-button {
          min-height: 48px;

          padding: 0 17px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 9px;

          border: none;

          border-radius: 14px;

          color: white;

          background:
            linear-gradient(
              135deg,
              var(--abc-teal),
              var(--abc-teal-deep)
            );

          cursor: pointer;

          font-size: 12px;

          font-weight: 800;

          box-shadow:
            0 10px 24px
            rgba(15,118,110,.25);

          transition: .25s ease;

          white-space: nowrap;
        }

        .primary-button:hover {
          transform:
            translateY(-2px);

          box-shadow:
            0 15px 32px
            rgba(15,118,110,.32);
        }

        .primary-button:disabled {
          opacity: .65;

          cursor: not-allowed;

          transform: none;
        }

        .spin {
          animation:
            spin .8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* =====================================================
           STATISTICS
        ===================================================== */

        .appointment-stats {
          display: grid;

          grid-template-columns:
            repeat(5,minmax(0,1fr));

          gap: 12px;

          padding: 21px 32px;

          background: #fbfdfd;

          border-bottom:
            1px solid #edf2f2;
        }

        .appointment-stat {
          display: flex;

          align-items: center;

          gap: 12px;

          min-width: 0;

          padding: 14px;

          border:
            1px solid #e7eeee;

          border-radius: 16px;

          background: white;

          transition: .25s ease;
        }

        .appointment-stat:hover {
          transform:
            translateY(-3px);

          border-color:
            rgba(20,184,166,.24);

          box-shadow:
            0 12px 30px
            rgba(15,118,110,.08);
        }

        .stat-icon {
          width: 42px;
          height: 42px;

          flex: 0 0 42px;

          display: grid;

          place-items: center;

          border-radius: 13px;

          color: var(--abc-teal);

          background:
            var(--abc-teal-soft);
        }

        .stat-icon.pending {
          color: #b45309;

          background:
            var(--abc-gold-soft);
        }

        .stat-icon.confirmed {
          color: #2563eb;

          background: #eff6ff;
        }

        .stat-icon.completed {
          color: #15803d;

          background: #f0fdf4;
        }

        .stat-icon.cancelled {
          color: #dc2626;

          background: #fef2f2;
        }

        .stat-number {
          display: block;

          color: var(--abc-navy);

          font-family:
            'Outfit',
            sans-serif;

          font-size: 20px;

          font-weight: 800;

          line-height: 1.1;
        }

        .stat-label {
          display: block;

          margin-top: 4px;

          color: var(--abc-muted);

          font-size: 9px;

          font-weight: 700;

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;
        }

        /* =====================================================
           FILTER SECTION
        ===================================================== */

        .filter-section {
          padding: 22px 32px;

          border-bottom:
            1px solid #edf2f2;
        }

        .filter-top {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;

          margin-bottom: 12px;
        }

        .filter-heading {
          display: flex;

          align-items: center;

          gap: 8px;

          color: var(--abc-navy);

          font-family:
            'Outfit',
            sans-serif;

          font-size: 13px;

          font-weight: 800;
        }

        .filter-count {
          color: var(--abc-muted);

          font-size: 10px;

          font-weight: 700;
        }

        .filter-grid {
          display: grid;

          grid-template-columns:
            minmax(250px,1fr)
            minmax(180px,230px)
            minmax(160px,210px)
            auto;

          gap: 11px;

          align-items: center;
        }

        /* =====================================================
           SEARCH
        ===================================================== */

        .search-wrapper {
          position: relative;

          width: 100%;
        }

        .search-icon {
          position: absolute;

          left: 15px;

          top: 50%;

          transform:
            translateY(-50%);

          color: #94a3b8;

          pointer-events: none;
        }

        .search-input {
          width: 100%;

          height: 50px;

          padding:
            0 15px 0 45px;

          border:
            1px solid #dbe4e4;

          border-radius: 14px;

          outline: none;

          background: #f9fbfb;

          color: var(--abc-navy);

          font-size: 11px;

          font-weight: 600;

          transition: .25s ease;
        }

        .search-input::placeholder {
          color: #9aa7b7;
        }

        .search-input:hover,
        .search-input:focus {
          background: white;

          border-color:
            var(--abc-teal);

          box-shadow:
            0 0 0 4px
            rgba(20,184,166,.08);
        }

        /* =====================================================
           SELECTS
        ===================================================== */

        .select-wrapper {
          position: relative;
        }

        .filter-select {
          width: 100%;

          height: 50px;

          appearance: none;

          padding:
            0 40px 0 14px;

          border:
            1px solid #dbe4e4;

          border-radius: 14px;

          outline: none;

          background: #f9fbfb;

          color: var(--abc-text);

          font-size: 11px;

          font-weight: 700;

          cursor: pointer;

          transition: .25s ease;
        }

        .filter-select:hover,
        .filter-select:focus {
          background: white;

          border-color:
            var(--abc-teal);

          box-shadow:
            0 0 0 4px
            rgba(20,184,166,.08);
        }

        .select-chevron {
          position: absolute;

          right: 13px;

          top: 50%;

          transform:
            translateY(-50%);

          color: #64748b;

          pointer-events: none;
        }

        .clear-button {
          height: 50px;

          padding: 0 15px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          border:
            1px solid #e2e8f0;

          border-radius: 14px;

          color: #64748b;

          background: white;

          cursor: pointer;

          font-size: 10px;

          font-weight: 800;

          transition: .25s ease;

          white-space: nowrap;
        }

        .clear-button:hover {
          color: #dc2626;

          border-color:
            #fecaca;

          background: #fffafa;
        }

        /* =====================================================
           TABLE
        ===================================================== */

        .table-section {
          padding: 0 32px 32px;
        }

        .table-card {
          width: 100%;

          overflow: hidden;

          border:
            1px solid #e2e8f0;

          border-radius: 20px;

          background: white;

          box-shadow:
            0 8px 30px
            rgba(15,23,42,.035);
        }

        .table-scroll {
          width: 100%;

          overflow-x: auto;

          scrollbar-width: thin;

          scrollbar-color:
            #b8d8d4
            transparent;
        }

        .table-scroll::-webkit-scrollbar {
          height: 8px;
        }

        .table-scroll::-webkit-scrollbar-thumb {
          background:
            #b8d8d4;

          border-radius: 20px;
        }

        .appointments-table {
          width: 100%;

          min-width: 1180px;

          border-collapse: separate;

          border-spacing: 0;

          text-align: left;
        }

        .appointments-table th {
          height: 59px;

          padding: 0 17px;

          background:
            linear-gradient(
              180deg,
              #f9fbfb,
              #f4f8f8
            );

          color: #526174;

          border-bottom:
            1px solid #dfe8e8;

          font-family:
            'Outfit',
            sans-serif;

          font-size: 10px;

          font-weight: 900;

          letter-spacing: .75px;

          text-transform: uppercase;

          white-space: nowrap;
        }

        .appointments-table td {
          padding: 15px 17px;

          background: white;

          border-bottom:
            1px solid #eef2f2;

          color: var(--abc-text);

          vertical-align: middle;

          font-size: 11px;
        }

        .appointments-table tbody tr {
          transition: .2s ease;
        }

        .appointments-table tbody tr:hover td {
          background: #f8fcfb;
        }

        .appointments-table tbody tr:last-child td {
          border-bottom: none;
        }

        /* =====================================================
           PERSON
        ===================================================== */

        .person-cell {
          display: flex;

          align-items: center;

          gap: 10px;

          min-width: 175px;
        }

        .person-avatar {
          width: 39px;
          height: 39px;

          flex: 0 0 39px;

          display: grid;

          place-items: center;

          border-radius: 12px;

          color: var(--abc-teal);

          background:
            linear-gradient(
              135deg,
              #ecfdf9,
              #d9f7f1
            );

          border:
            1px solid
            rgba(20,184,166,.18);

          font-family:
            'Outfit',
            sans-serif;

          font-size: 10px;

          font-weight: 900;
        }

        .person-name {
          color: var(--abc-navy);

          font-size: 11px;

          font-weight: 800;

          white-space: nowrap;
        }

        .person-label {
          margin-top: 3px;

          color: #94a3b8;

          font-size: 8px;

          font-weight: 700;
        }

        /* =====================================================
           CHILD
        ===================================================== */

        .child-cell {
          display: flex;

          align-items: center;

          gap: 7px;

          font-weight: 700;

          white-space: nowrap;
        }

        .child-cell svg {
          color: var(--abc-teal);
        }

        /* =====================================================
           SERVICE
        ===================================================== */

        .service-badge {
          display: inline-flex;

          align-items: center;

          gap: 6px;

          max-width: 190px;

          padding: 7px 9px;

          border-radius: 10px;

          color: var(--abc-teal);

          background:
            var(--abc-teal-soft);

          border:
            1px solid
            rgba(20,184,166,.18);

          font-size: 9px;

          font-weight: 800;
        }

        /* =====================================================
           PHONE
        ===================================================== */

        .phone-cell {
          display: inline-flex;

          align-items: center;

          gap: 6px;

          color: #475569;

          font-size: 10px;

          font-weight: 700;

          white-space: nowrap;
        }

        .phone-cell svg {
          color: var(--abc-teal);
        }

        /* =====================================================
           DATE TIME
        ===================================================== */

        .date-time {
          min-width: 115px;
        }

        .date-line {
          display: flex;

          align-items: center;

          gap: 6px;

          color: var(--abc-navy);

          font-size: 10px;

          font-weight: 800;

          white-space: nowrap;
        }

        .date-line svg {
          color: var(--abc-teal);
        }

        .time-line {
          display: flex;

          align-items: center;

          gap: 5px;

          margin-top: 5px;

          color: #94a3b8;

          font-size: 9px;

          font-weight: 700;
        }

        /* =====================================================
           STATUS
        ===================================================== */

        .status-wrapper {
          position: relative;

          display: inline-block;
        }

        .status-select {
          min-width: 124px;

          height: 37px;

          appearance: none;

          padding:
            0 29px 0 30px;

          border-radius: 11px;

          outline: none;

          cursor: pointer;

          font-size: 9px;

          font-weight: 800;

          transition: .2s ease;
        }

        .status-select:hover {
          transform: translateY(-1px);
        }

        .status-select.status-pending {
          color: #b45309;

          border:
            1px solid #fde68a;

          background:
            #fffbeb;
        }

        .status-select.status-confirmed {
          color: #2563eb;

          border:
            1px solid #bfdbfe;

          background:
            #eff6ff;
        }

        .status-select.status-completed {
          color: #15803d;

          border:
            1px solid #bbf7d0;

          background:
            #f0fdf4;
        }

        .status-select.status-cancelled {
          color: #dc2626;

          border:
            1px solid #fecaca;

          background:
            #fef2f2;
        }

        .status-icon {
          position: absolute;

          left: 10px;

          top: 50%;

          transform:
            translateY(-50%);

          pointer-events: none;
        }

        .status-chevron {
          position: absolute;

          right: 8px;

          top: 50%;

          transform:
            translateY(-50%);

          pointer-events: none;

          opacity: .7;
        }

        /* =====================================================
           VIEW BUTTON
        ===================================================== */

        .view-button {
          min-height: 37px;

          padding: 0 12px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 6px;

          border:
            1px solid
            rgba(20,184,166,.22);

          border-radius: 10px;

          color: var(--abc-teal);

          background:
            var(--abc-teal-soft);

          cursor: pointer;

          font-size: 9px;

          font-weight: 800;

          white-space: nowrap;

          transition: .22s ease;
        }

        .view-button:hover {
          color: white;

          background:
            var(--abc-teal);

          transform:
            translateY(-2px);

          box-shadow:
            0 8px 18px
            rgba(15,118,110,.20);
        }

        /* =====================================================
           LOADING
        ===================================================== */

        .loading-state {
          min-height: 360px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          text-align: center;
        }

        .loading-ring {
          width: 42px;
          height: 42px;

          margin-bottom: 15px;

          border:
            3px solid #dcebea;

          border-top-color:
            var(--abc-teal);

          border-radius: 50%;

          animation:
            spin .8s linear infinite;
        }

        .loading-title {
          color: var(--abc-navy);

          font-size: 13px;

          font-weight: 800;
        }

        .loading-text {
          margin-top: 5px;

          color: #94a3b8;

          font-size: 10px;

          font-weight: 600;
        }

        /* =====================================================
           EMPTY
        ===================================================== */

        .empty-state {
          min-height: 350px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          padding: 40px;

          text-align: center;
        }

        .empty-icon {
          width: 58px;
          height: 58px;

          display: grid;

          place-items: center;

          margin-bottom: 13px;

          border-radius: 18px;

          color: var(--abc-teal);

          background:
            var(--abc-teal-soft);
        }

        .empty-title {
          margin: 0;

          color: var(--abc-navy);

          font-family:
            'Outfit',
            sans-serif;

          font-size: 18px;

          font-weight: 800;
        }

        .empty-text {
          max-width: 430px;

          margin: 7px 0 17px;

          color: var(--abc-muted);

          font-size: 10px;

          font-weight: 500;

          line-height: 1.6;
        }

        /* =====================================================
           MODAL
        ===================================================== */

        .appointment-modal-overlay {
          position: fixed;

          inset: 0;

          z-index: 9999;

          padding: 20px;

          display: flex;

          align-items: center;

          justify-content: center;

          background:
            rgba(2,20,18,.68);

          backdrop-filter:
            blur(10px);

          animation:
            modalFade
            .2s ease
            both;
        }

        @keyframes modalFade {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        .appointment-modal {
          width: 100%;

          max-width: 650px;

          max-height:
            calc(100vh - 40px);

          overflow-y: auto;

          border-radius: 25px;

          background: white;

          border:
            1px solid
            rgba(20,184,166,.18);

          box-shadow:
            0 35px 100px
            rgba(0,0,0,.30);

          animation:
            modalEnter
            .3s
            cubic-bezier(.16,1,.3,1)
            both;
        }

        @keyframes modalEnter {
          from {
            opacity: 0;

            transform:
              translateY(15px)
              scale(.96);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);
          }
        }

        .modal-header {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;

          padding: 21px 23px;

          border-bottom:
            1px solid #edf2f2;
        }

        .modal-heading {
          display: flex;

          align-items: center;

          gap: 11px;
        }

        .modal-icon {
          width: 43px;
          height: 43px;

          display: grid;

          place-items: center;

          border-radius: 13px;

          color: white;

          background:
            linear-gradient(
              135deg,
              var(--abc-teal),
              var(--abc-teal-deep)
            );
        }

        .modal-title {
          margin: 0;

          color: var(--abc-navy);

          font-family:
            'Outfit',
            sans-serif;

          font-size: 20px;

          font-weight: 800;
        }

        .modal-subtitle {
          margin: 3px 0 0;

          color: #94a3b8;

          font-size: 9px;

          font-weight: 600;
        }

        .modal-close {
          width: 37px;
          height: 37px;

          display: grid;

          place-items: center;

          border: none;

          border-radius: 11px;

          color: #64748b;

          background: #f1f5f5;

          cursor: pointer;

          transition: .2s ease;
        }

        .modal-close:hover {
          color: #dc2626;

          background: #fee2e2;

          transform:
            rotate(5deg);
        }

        .modal-body {
          padding: 22px;
        }

        .modal-person {
          display: flex;

          align-items: center;

          gap: 12px;

          margin-bottom: 18px;

          padding: 14px;

          border:
            1px solid #e7eeee;

          border-radius: 16px;

          background: #f9fbfb;
        }

        .modal-avatar {
          width: 46px;
          height: 46px;

          display: grid;

          place-items: center;

          border-radius: 13px;

          color: var(--abc-teal);

          background:
            #e3f8f3;

          font-family:
            'Outfit',
            sans-serif;

          font-weight: 900;
        }

        .modal-person-name {
          color: var(--abc-navy);

          font-family:
            'Outfit',
            sans-serif;

          font-size: 15px;

          font-weight: 800;
        }

        .modal-person-label {
          margin-top: 3px;

          color: #94a3b8;

          font-size: 9px;

          font-weight: 600;
        }

        .modal-grid {
          display: grid;

          grid-template-columns:
            repeat(2,minmax(0,1fr));

          gap: 10px;

          margin-bottom: 18px;
        }

        .modal-info {
          padding: 13px;

          border:
            1px solid #e7eeee;

          border-radius: 14px;

          background: white;
        }

        .modal-label {
          display: flex;

          align-items: center;

          gap: 6px;

          margin-bottom: 6px;

          color: #94a3b8;

          font-size: 8px;

          font-weight: 900;

          letter-spacing: .6px;

          text-transform: uppercase;
        }

        .modal-label svg {
          color: var(--abc-teal);
        }

        .modal-value {
          color: var(--abc-navy);

          font-size: 11px;

          font-weight: 750;

          word-break: break-word;
        }

        .notes-box {
          padding: 16px;

          border:
            1px solid #e5ecec;

          border-radius: 16px;

          background:
            linear-gradient(
              180deg,
              #f9fbfb,
              #f5f9f8
            );
        }

        .notes-title {
          display: flex;

          align-items: center;

          gap: 7px;

          margin-bottom: 8px;

          color: var(--abc-navy);

          font-family:
            'Outfit',
            sans-serif;

          font-size: 11px;

          font-weight: 800;
        }

        .notes-title svg {
          color: var(--abc-teal);
        }

        .notes-content {
          min-height: 75px;

          color: #475569;

          font-size: 11px;

          font-weight: 500;

          line-height: 1.7;

          white-space: pre-wrap;

          word-break: break-word;
        }

        .modal-actions {
          display: flex;

          gap: 9px;

          margin-top: 16px;
        }

        .modal-action {
          flex: 1;

          min-height: 42px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          border-radius: 11px;

          cursor: pointer;

          font-size: 9px;

          font-weight: 800;

          text-decoration: none;

          transition: .2s ease;
        }

        .modal-action.call {
          color: var(--abc-teal);

          border:
            1px solid
            rgba(20,184,166,.20);

          background:
            var(--abc-teal-soft);
        }

        .modal-action.call:hover {
          background:
            #dff8f2;
        }

        .modal-action.close {
          color: white;

          border: none;

          background:
            linear-gradient(
              135deg,
              var(--abc-teal),
              var(--abc-teal-deep)
            );
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1250px) {
          .appointment-stats {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
          }

          .filter-grid {
            grid-template-columns:
              minmax(220px,1fr)
              minmax(170px,220px)
              minmax(160px,200px);
          }

          .clear-button {
            width: 100%;
          }
        }

        @media (max-width: 1000px) {
          .appointments-header {
            align-items: flex-start;

            flex-direction: column;
          }

          .header-actions {
            width: 100%;
          }

          .header-actions .primary-button {
            flex: 1;
          }

          .filter-grid {
            grid-template-columns:
              1fr 1fr;
          }
        }

        @media (max-width: 720px) {
          .appointments-page {
            padding: 12px;
          }

          .appointments-shell {
            border-radius: 20px;
          }

          .appointments-header {
            padding: 22px 18px;
          }

          .appointments-icon {
            width: 51px;
            height: 51px;
            flex-basis: 51px;
            border-radius: 15px;
          }

          .appointments-title {
            font-size: 24px;
          }

          .appointments-subtitle {
            font-size: 10px;
          }

          .appointment-stats {
            grid-template-columns:
              repeat(2,minmax(0,1fr));

            padding:
              15px;
          }

          .filter-section {
            padding:
              18px 15px;
          }

          .filter-grid {
            grid-template-columns: 1fr;
          }

          .table-section {
            padding:
              0 15px 18px;
          }

          .modal-grid {
            grid-template-columns: 1fr;
          }

          .modal-body {
            padding: 18px;
          }

          .modal-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 430px) {
          .header-actions {
            flex-direction: column;
          }

          .header-actions .primary-button {
            width: 100%;
          }

          .appointment-stats {
            grid-template-columns: 1fr;
          }

          .filter-top {
            align-items: flex-start;

            flex-direction: column;
          }
        }
      `}</style>

      <div className="appointments-page">

        <div className="appointment-orb one" />
        <div className="appointment-orb two" />

        <main className="appointments-shell">

          {/* =====================================================
              HEADER
          ===================================================== */}

          <header className="appointments-header">

            <div className="appointments-title-area">

              <div className="appointments-icon">
                <CalendarDays
                  size={28}
                  strokeWidth={2.2}
                />
              </div>

              <div>

                <span className="appointments-kicker">
                  ABC ADMIN PORTAL
                </span>

                <h1 className="appointments-title">
                  Booked Appointments
                </h1>

                <p className="appointments-subtitle">
                  Manage, monitor and organize clinical
                  consultation schedules from one place.
                </p>

              </div>

            </div>

            <div className="header-actions">

              <button
                className="primary-button"
                onClick={() =>
                  fetchAppointments(true)
                }
                disabled={syncing}
              >
                <RefreshCw
                  size={16}
                  className={
                    syncing ? "spin" : ""
                  }
                />

                {syncing
                  ? "Syncing..."
                  : "Sync Live Data"}
              </button>

              <button
                className="primary-button"
                onClick={exportToCSV}
              >
                <Download size={16} />
                Export CSV
              </button>

            </div>

          </header>

          {/* =====================================================
              STATS
          ===================================================== */}

          <section className="appointment-stats">

            <div className="appointment-stat">

              <div className="stat-icon">
                <CalendarDays size={18} />
              </div>

              <div>
                <span className="stat-number">
                  {stats.total}
                </span>

                <span className="stat-label">
                  Total Appointments
                </span>
              </div>

            </div>

            <div className="appointment-stat">

              <div className="stat-icon pending">
                <Timer size={18} />
              </div>

              <div>
                <span className="stat-number">
                  {stats.pending}
                </span>

                <span className="stat-label">
                  Pending
                </span>
              </div>

            </div>

            <div className="appointment-stat">

              <div className="stat-icon confirmed">
                <CalendarCheck2 size={18} />
              </div>

              <div>
                <span className="stat-number">
                  {stats.confirmed}
                </span>

                <span className="stat-label">
                  Confirmed
                </span>
              </div>

            </div>

            <div className="appointment-stat">

              <div className="stat-icon completed">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <span className="stat-number">
                  {stats.completed}
                </span>

                <span className="stat-label">
                  Completed
                </span>
              </div>

            </div>

            <div className="appointment-stat">

              <div className="stat-icon cancelled">
                <CircleX size={18} />
              </div>

              <div>
                <span className="stat-number">
                  {stats.cancelled}
                </span>

                <span className="stat-label">
                  Cancelled
                </span>
              </div>

            </div>

          </section>

          {/* =====================================================
              FILTERS
          ===================================================== */}

          <section className="filter-section">

            <div className="filter-top">

              <div className="filter-heading">

                <SlidersHorizontal
                  size={15}
                />

                Appointment Filters

              </div>

              <div className="filter-count">

                Showing{" "}
                {filteredAppointments.length}{" "}
                of{" "}
                {appointments.length}

              </div>

            </div>

            <div className="filter-grid">

              {/* SEARCH */}

              <div className="search-wrapper">

                <Search
                  className="search-icon"
                  size={17}
                />

                <input
                  className="search-input"
                  type="text"
                  placeholder="Search parent, child, phone or service..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
                  }
                />

              </div>

              {/* SERVICE */}

              <div className="select-wrapper">

                <select
                  className="filter-select"
                  value={selectedService}
                  onChange={(e) =>
                    setSelectedService(
                      e.target.value
                    )
                  }
                >
                  <option value="All">
                    All Clinical Services
                  </option>

                  {uniqueServices
                    .filter(
                      (service) =>
                        service !== "All"
                    )
                    .map((service) => (
                      <option
                        key={service}
                        value={service}
                      >
                        {service}
                      </option>
                    ))}
                </select>

                <ChevronDown
                  className="select-chevron"
                  size={15}
                />

              </div>

              {/* STATUS */}

              <div className="select-wrapper">

                <select
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                >
                  <option value="All">
                    All Appointment Statuses
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Confirmed">
                    Confirmed
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>

                <ChevronDown
                  className="select-chevron"
                  size={15}
                />

              </div>

              {/* CLEAR */}

              <button
                className="clear-button"
                onClick={clearFilters}
              >
                <X size={14} />
                Clear Filters
              </button>

            </div>

          </section>

          {/* =====================================================
              TABLE
          ===================================================== */}

          <section className="table-section">

            <div className="table-card">

              {loading ? (

                <div className="loading-state">

                  <div className="loading-ring" />

                  <div className="loading-title">
                    Loading appointments securely...
                  </div>

                  <div className="loading-text">
                    Connecting with ABC administration server
                  </div>

                </div>

              ) : filteredAppointments.length ===
                0 ? (

                <div className="empty-state">

                  <div className="empty-icon">
                    <CalendarDays size={27} />
                  </div>

                  <h3 className="empty-title">
                    No Appointments Found
                  </h3>

                  <p className="empty-text">
                    There are no appointments matching
                    your current search or filters.
                  </p>

                  {(searchTerm ||
                    selectedService !== "All" ||
                    statusFilter !== "All") && (
                    <button
                      className="primary-button"
                      onClick={clearFilters}
                    >
                      <X size={14} />
                      Clear Filters
                    </button>
                  )}

                </div>

              ) : (

                <div className="table-scroll">

                  <table className="appointments-table">

                    <thead>

                      <tr>

                        <th>
                          Parent / Guardian
                        </th>

                        <th>
                          Child Name
                        </th>

                        <th>
                          Clinical Service
                        </th>

                        <th>
                          Phone Number
                        </th>

                        <th>
                          Date & Time
                        </th>

                        <th>
                          Status
                        </th>

                        <th>
                          Action
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredAppointments.map(
                        (item) => (

                          <tr
                            key={item._id}
                          >

                            {/* PARENT */}

                            <td>

                              <div className="person-cell">

                                <div className="person-avatar">
                                  {getInitials(
                                    item.name
                                  )}
                                </div>

                                <div>

                                  <div className="person-name">
                                    {safeText(
                                      item.name,
                                      "Unknown"
                                    )}
                                  </div>

                                  <div className="person-label">
                                    Parent / Guardian
                                  </div>

                                </div>

                              </div>

                            </td>

                            {/* CHILD */}

                            <td>

                              <div className="child-cell">

                                <Baby size={15} />

                                {safeText(
                                  item.childName
                                )}

                              </div>

                            </td>

                            {/* SERVICE */}

                            <td>

                              <span className="service-badge">

                                <BriefcaseMedical
                                  size={12}
                                />

                                {safeText(
                                  item.service
                                )}

                              </span>

                            </td>

                            {/* PHONE */}

                            <td>

                              <div className="phone-cell">

                                <Phone size={13} />

                                {safeText(
                                  item.phone
                                )}

                              </div>

                            </td>

                            {/* DATE */}

                            <td>

                              <div className="date-time">

                                <div className="date-line">

                                  <CalendarDays
                                    size={13}
                                  />

                                  {safeText(
                                    item.date
                                  )}

                                </div>

                                <div className="time-line">

                                  <Clock3
                                    size={11}
                                  />

                                  {safeText(
                                    item.time
                                  )}

                                </div>

                              </div>

                            </td>

                            {/* STATUS */}

                            <td>

                              <div className="status-wrapper">

                                <span
                                  className="status-icon"
                                  style={{
                                    color:
                                      item.status ===
                                      "Completed"
                                        ? "#15803d"
                                        : item.status ===
                                          "Confirmed"
                                        ? "#2563eb"
                                        : item.status ===
                                          "Cancelled"
                                        ? "#dc2626"
                                        : "#b45309",
                                  }}
                                >
                                  {getStatusIcon(
                                    item.status
                                  )}
                                </span>

                                <select
                                  className={`status-select ${getStatusClass(
                                    item.status
                                  )}`}
                                  value={
                                    item.status
                                  }
                                  onChange={(e) =>
                                    handleStatusChange(
                                      item._id,
                                      e.target.value
                                    )
                                  }
                                >

                                  <option value="Pending">
                                    Pending
                                  </option>

                                  <option value="Confirmed">
                                    Confirmed
                                  </option>

                                  <option value="Completed">
                                    Completed
                                  </option>

                                  <option value="Cancelled">
                                    Cancelled
                                  </option>

                                </select>

                                <ChevronDown
                                  className="status-chevron"
                                  size={12}
                                />

                              </div>

                            </td>

                            {/* ACTION */}

                            <td>

                              <button
                                className="view-button"
                                onClick={() =>
                                  setSelectedAppointment(
                                    item
                                  )
                                }
                              >
                                <Eye size={13} />
                                View Details
                              </button>

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </section>

        </main>

      </div>

      {/* =========================================================
          APPOINTMENT DETAILS MODAL
      ========================================================= */}

      {selectedAppointment && (

        <div
          className="appointment-modal-overlay"
          onClick={() =>
            setSelectedAppointment(null)
          }
        >

          <div
            className="appointment-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="modal-header">

              <div className="modal-heading">

                <div className="modal-icon">

                  <ClipboardList
                    size={21}
                  />

                </div>

                <div>

                  <h2 className="modal-title">
                    Appointment Details
                  </h2>

                  <p className="modal-subtitle">
                    Complete appointment information
                  </p>

                </div>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedAppointment(
                    null
                  )
                }
              >
                <X size={18} />
              </button>

            </div>

            {/* MODAL BODY */}

            <div className="modal-body">

              {/* PERSON */}

              <div className="modal-person">

                <div className="modal-avatar">

                  {getInitials(
                    selectedAppointment.name
                  )}

                </div>

                <div>

                  <div className="modal-person-name">

                    {safeText(
                      selectedAppointment.name,
                      "Unknown Parent"
                    )}

                  </div>

                  <div className="modal-person-label">

                    Appointment request received
                    through website

                  </div>

                </div>

              </div>

              {/* INFORMATION GRID */}

              <div className="modal-grid">

                <div className="modal-info">

                  <div className="modal-label">

                    <UserRound size={11} />

                    Parent / Guardian

                  </div>

                  <div className="modal-value">

                    {safeText(
                      selectedAppointment.name
                    )}

                  </div>

                </div>

                <div className="modal-info">

                  <div className="modal-label">

                    <Baby size={11} />

                    Child Name

                  </div>

                  <div className="modal-value">

                    {safeText(
                      selectedAppointment.childName
                    )}

                  </div>

                </div>

                <div className="modal-info">

                  <div className="modal-label">

                    <BriefcaseMedical
                      size={11}
                    />

                    Clinical Service

                  </div>

                  <div className="modal-value">

                    {safeText(
                      selectedAppointment.service
                    )}

                  </div>

                </div>

                <div className="modal-info">

                  <div className="modal-label">

                    <Phone size={11} />

                    Phone Number

                  </div>

                  <div className="modal-value">

                    {selectedAppointment.phone ? (
                      <a
                        href={`tel:${selectedAppointment.phone}`}
                        style={{
                          color:
                            "var(--abc-teal)",
                          textDecoration:
                            "none",
                        }}
                      >
                        {
                          selectedAppointment.phone
                        }
                      </a>
                    ) : (
                      "N/A"
                    )}

                  </div>

                </div>

                <div className="modal-info">

                  <div className="modal-label">

                    <CalendarDays
                      size={11}
                    />

                    Appointment Date

                  </div>

                  <div className="modal-value">

                    {safeText(
                      selectedAppointment.date
                    )}

                  </div>

                </div>

                <div className="modal-info">

                  <div className="modal-label">

                    <Clock3 size={11} />

                    Appointment Time

                  </div>

                  <div className="modal-value">

                    {safeText(
                      selectedAppointment.time
                    )}

                  </div>

                </div>

                <div className="modal-info">

                  <div className="modal-label">

                    <CircleAlert
                      size={11}
                    />

                    Current Status

                  </div>

                  <div className="modal-value">

                    {safeText(
                      selectedAppointment.status,
                      "Pending"
                    )}

                  </div>

                </div>

              </div>

              {/* NOTES */}

              <div className="notes-box">

                <div className="notes-title">

                  <MessageSquare
                    size={14}
                  />

                  Additional Notes / Information

                </div>

                <div className="notes-content">

                  {selectedAppointment.additionalInfo &&
                  String(
                    selectedAppointment.additionalInfo
                  ).trim() !== ""
                    ? selectedAppointment.additionalInfo
                    : "No additional notes were provided by the parent."}

                </div>

              </div>

              {/* MODAL ACTIONS */}

              <div className="modal-actions">

                {selectedAppointment.phone && (
                  <a
                    className="modal-action call"
                    href={`tel:${selectedAppointment.phone}`}
                  >
                    <Phone size={14} />
                    Call Parent
                  </a>
                )}

                {selectedAppointment.email && (
                  <a
                    className="modal-action call"
                    href={`mailto:${selectedAppointment.email}`}
                  >
                    <Mail size={14} />
                    Email
                  </a>
                )}

                <button
                  className="modal-action close"
                  onClick={() =>
                    setSelectedAppointment(
                      null
                    )
                  }
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </>
  );
}