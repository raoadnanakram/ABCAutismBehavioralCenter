import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  RefreshCw,
  Download,
  MessageSquare,
  Mail,
  Phone,
  CalendarDays,
  Eye,
  X,
  ChevronDown,
  Inbox,
  FileText,
  Copy,
  Check,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

const CONTACTS_API_URL =
  "http://localhost:5000/api/admin/contacts";

const cleanValue = (value, fallback = "N/A") => {
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
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

const formatDate = (date) => {
  if (!date) return "N/A";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "N/A";
  }

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (date) => {
  if (!date) return "N/A";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "N/A";
  }

  return parsed.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const escapeCSV = (value) => {
  return `"${String(value ?? "")
    .replace(/"/g, '""')
    .replace(/\r?\n|\r/g, " ")}"`;
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&display=swap');

  :root {
    --abc-teal: #0f766e;
    --abc-teal-dark: #064e4a;
    --abc-teal-deep: #042f2e;
    --abc-teal-light: #ecfdf9;
    --abc-teal-soft: #f0fdfa;

    --abc-gold: #f59e0b;
    --abc-gold-soft: #fffbeb;

    --abc-navy: #0b2523;
    --abc-text: #334155;
    --abc-muted: #64748b;

    --abc-border: #e2e8f0;
    --abc-bg: #f7faf9;

    --abc-shadow:
      0 25px 70px rgba(4, 47, 46, 0.10);

    --abc-shadow-soft:
      0 12px 35px rgba(15, 118, 110, 0.08);
  }

  * {
    box-sizing: border-box;
  }

  .contacts-page {
    isolation: isolate;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    min-height: calc(100vh - 86px);
    position: relative;

    padding: clamp(18px, 2.5vw, 34px);

    background:
      radial-gradient(
        circle at 5% 5%,
        rgba(20, 184, 166, 0.10),
        transparent 32%
      ),
      radial-gradient(
        circle at 95% 95%,
        rgba(245, 158, 11, 0.08),
        transparent 30%
      ),
      #f4f8f7;

    overflow-x: hidden;
  }

  .contacts-page *,
  .contacts-page button,
  .contacts-page input,
  .contacts-page select {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .contacts-page .contacts-bg-orb {
    position: fixed;
    pointer-events: none;
    border-radius: 50%;
    filter: blur(100px);
    z-index: 0;
    opacity: 0.32;
  }

  .contacts-page .contacts-bg-orb.one {
    width: 350px;
    height: 350px;
    background: rgba(20, 184, 166, 0.18);
    top: -150px;
    left: -100px;
  }

  .contacts-page .contacts-bg-orb.two {
    width: 400px;
    height: 400px;
    background: rgba(245, 158, 11, 0.12);
    right: -160px;
    bottom: -160px;
  }

  .contacts-page .contacts-shell {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;

    position: relative;
    z-index: 2;

    background: rgba(255, 255, 255, 0.96);

    border: 1px solid rgba(15, 118, 110, 0.12);
    border-radius: 28px;

    box-shadow: var(--abc-shadow);

    overflow: hidden;

    animation:
      contactsEntrance
      0.65s
      cubic-bezier(.16,1,.3,1)
      both;
  }

  @keyframes contactsEntrance {
    from {
      opacity: 0;
      transform: translateY(18px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .contacts-page .contacts-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 24px;

    padding: 30px 32px;

    border-bottom: 1px solid #edf2f2;

    background:
      linear-gradient(
        180deg,
        #ffffff 0%,
        #fbfefd 100%
      );
  }

  .contacts-page .contacts-title-area {
    display: flex;
    align-items: center;
    gap: 17px;

    min-width: 0;
  }

  .contacts-page .contacts-title-icon {
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
        var(--abc-teal) 0%,
        var(--abc-teal-deep) 100%
      );

    box-shadow:
      0 14px 30px rgba(15, 118, 110, 0.25);

    transition: 0.3s ease;
  }

  .contacts-page .contacts-title-icon:hover {
    transform: translateY(-3px) rotate(2deg);
  }

  .contacts-page .contacts-kicker {
    display: block;

    margin-bottom: 5px;

    color: var(--abc-teal);

    font-family: 'Outfit', sans-serif;

    font-size: 10px;
    font-weight: 900;

    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .contacts-page .contacts-title {
    margin: 0;

    color: var(--abc-navy);

    font-family: 'Outfit', sans-serif;

    font-size: clamp(24px, 2.4vw, 34px);

    line-height: 1.05;

    font-weight: 800;

    letter-spacing: -0.7px;
  }

  .contacts-page .contacts-subtitle {
    margin: 8px 0 0;

    color: var(--abc-muted);

    font-size: 13px;
    font-weight: 500;

    line-height: 1.55;
  }

  .contacts-page .header-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .contacts-page .action-button {
    min-height: 48px;

    padding: 0 17px;

    border: 1px solid transparent;

    border-radius: 14px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    gap: 9px;

    cursor: pointer;

    font-size: 12px;
    font-weight: 800;

    transition:
      transform .25s ease,
      box-shadow .25s ease,
      background .25s ease;
  }

  .contacts-page .action-button:hover {
    transform: translateY(-2px);
  }

  .contacts-page .action-button.primary {
    color: white;

    background:
      linear-gradient(
        135deg,
        var(--abc-teal),
        var(--abc-teal-deep)
      );

    box-shadow:
      0 10px 24px rgba(15, 118, 110, 0.25);
  }

  .contacts-page .action-button.primary:hover {
    box-shadow:
      0 15px 32px rgba(15, 118, 110, 0.32);
  }

  .contacts-page .action-button.secondary {
    color: var(--abc-teal);

    background: var(--abc-teal-soft);

    border-color:
      rgba(20, 184, 166, 0.18);
  }

  .contacts-page .action-button.secondary:hover {
    background: var(--abc-teal-light);
  }

  .contacts-page .action-button:disabled {
    cursor: not-allowed;
    opacity: 0.65;
    transform: none;
  }

  .contacts-page .spin {
    animation: spin .8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .contacts-page .stats-grid {
    display: grid;

    grid-template-columns:
      repeat(4, minmax(0, 1fr));

    gap: 14px;

    padding: 22px 32px;

    background: #fbfdfd;

    border-bottom: 1px solid #edf2f2;
  }

  .contacts-page .stat-card {
    display: flex;
    align-items: center;

    gap: 13px;

    min-width: 0;

    padding: 15px;

    border-radius: 17px;

    background: white;

    border: 1px solid #e7eeee;

    transition:
      transform .25s ease,
      box-shadow .25s ease,
      border-color .25s ease;
  }

  .contacts-page .stat-card:hover {
    transform: translateY(-3px);

    border-color:
      rgba(20, 184, 166, 0.25);

    box-shadow:
      0 12px 30px rgba(15, 118, 110, 0.08);
  }

  .contacts-page .stat-icon {
    width: 42px;
    height: 42px;

    flex: 0 0 42px;

    display: grid;
    place-items: center;

    border-radius: 13px;

    color: var(--abc-teal);

    background: var(--abc-teal-soft);
  }

  .contacts-page .stat-card.gold .stat-icon {
    color: #b45309;
    background: var(--abc-gold-soft);
  }

  .contacts-page .stat-content {
    min-width: 0;
  }

  .contacts-page .stat-number {
    display: block;

    color: var(--abc-navy);

    font-family: 'Outfit', sans-serif;

    font-size: 21px;
    font-weight: 800;

    line-height: 1.1;
  }

  .contacts-page .stat-label {
    display: block;

    margin-top: 4px;

    color: var(--abc-muted);

    font-size: 10px;
    font-weight: 700;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .contacts-page .filter-section {
    padding: 22px 32px;

    border-bottom: 1px solid #edf2f2;
  }

  .contacts-page .filter-top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 16px;

    margin-bottom: 12px;
  }

  .contacts-page .filter-heading {
    display: flex;
    align-items: center;
    gap: 8px;

    color: var(--abc-navy);

    font-family: 'Outfit', sans-serif;

    font-size: 13px;
    font-weight: 800;
  }

  .contacts-page .result-count {
    color: var(--abc-muted);

    font-size: 11px;
    font-weight: 700;
  }

  .contacts-page .filter-grid {
    display: grid;

    grid-template-columns:
      minmax(260px, 1fr)
      minmax(190px, 250px)
      auto;

    gap: 12px;

    align-items: center;
  }

  .contacts-page .search-wrapper {
    position: relative;
    width: 100%;
  }

  .contacts-page .search-icon {
    position: absolute;

    left: 16px;
    top: 50%;

    transform: translateY(-50%);

    color: #94a3b8;

    pointer-events: none;
  }

  .contacts-page .search-input {
    width: 100%;

    height: 50px;

    padding: 0 16px 0 46px;

    border:
      1px solid #dbe4e4;

    border-radius: 14px;

    outline: none;

    background: #f9fbfb;

    color: var(--abc-navy);

    font-size: 12px;
    font-weight: 600;

    transition:
      border .25s ease,
      box-shadow .25s ease,
      background .25s ease;
  }

  .contacts-page .search-input::placeholder {
    color: #9aa7b7;
  }

  .contacts-page .search-input:hover {
    background: white;

    border-color:
      rgba(20, 184, 166, .35);
  }

  .contacts-page .search-input:focus {
    background: white;

    border-color:
      var(--abc-teal);

    box-shadow:
      0 0 0 4px rgba(20, 184, 166, .10);
  }

  .contacts-page .select-wrapper {
    position: relative;
  }

  .contacts-page .select-icon {
    position: absolute;

    right: 14px;
    top: 50%;

    transform: translateY(-50%);

    color: #64748b;

    pointer-events: none;
  }

  .contacts-page .subject-select {
    width: 100%;

    height: 50px;

    padding:
      0 42px 0 15px;

    appearance: none;

    border:
      1px solid #dbe4e4;

    border-radius: 14px;

    outline: none;

    background: #f9fbfb;

    color: var(--abc-text);

    font-size: 12px;
    font-weight: 700;

    cursor: pointer;

    transition: .25s ease;
  }

  .contacts-page .subject-select:hover,
  .contacts-page .subject-select:focus {
    background: white;

    border-color:
      var(--abc-teal);

    box-shadow:
      0 0 0 4px rgba(20, 184, 166, .08);
  }

  .contacts-page .clear-filter-btn {
    height: 50px;

    padding: 0 16px;

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

    font-size: 11px;
    font-weight: 800;

    transition: .25s ease;
  }

  .contacts-page .clear-filter-btn:hover {
    color: #dc2626;

    border-color:
      #fecaca;

    background: #fffafa;
  }

  .contacts-page .table-section {
    padding: 0 32px 32px;
  }

  .contacts-page .table-card {
    width: 100%;

    overflow: hidden;

    border:
      1px solid #e2e8f0;

    border-radius: 20px;

    background: white;

    box-shadow:
      0 8px 30px rgba(15, 23, 42, 0.035);
  }

  .contacts-page .table-scroll {
    width: 100%;

    overflow-x: auto;
    overflow-y: hidden;

    scrollbar-width: thin;
    scrollbar-color: #b8d8d4 transparent;
  }

  .contacts-page .table-scroll::-webkit-scrollbar {
    height: 8px;
  }

  .contacts-page .table-scroll::-webkit-scrollbar-thumb {
    background: #b8d8d4;
    border-radius: 20px;
  }

  .contacts-page .contacts-table {
    width: 100%;

    min-width: 1100px;

    border-collapse: separate;
    border-spacing: 0;

    text-align: left;
  }

  .contacts-page .contacts-table th {
    height: 60px;

    padding: 0 18px;

    color: #526174;

    background:
      linear-gradient(
        180deg,
        #f9fbfb,
        #f4f8f8
      );

    border-bottom:
      1px solid #dfe8e8;

    font-family: 'Outfit', sans-serif;

    font-size: 10px;
    font-weight: 900;

    letter-spacing: .85px;

    text-transform: uppercase;

    white-space: nowrap;
  }

  .contacts-page .contacts-table td {
    padding: 16px 18px;

    border-bottom:
      1px solid #eef2f2;

    color: var(--abc-text);

    background: white;

    font-size: 12px;

    vertical-align: middle;
  }

  .contacts-page .contacts-table tbody tr {
    transition:
      background .2s ease,
      transform .2s ease;
  }

  .contacts-page .contacts-table tbody tr:hover td {
    background: #f8fcfb;
  }

  .contacts-page .contacts-table tbody tr:last-child td {
    border-bottom: none;
  }

  .contacts-page .person-cell {
    display: flex;
    align-items: center;
    gap: 11px;

    min-width: 175px;
  }

  .contacts-page .avatar {
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
      1px solid rgba(20, 184, 166, .18);

    font-family: 'Outfit', sans-serif;

    font-size: 11px;
    font-weight: 900;
  }

  .contacts-page .person-name {
    color: var(--abc-navy);

    font-size: 12px;
    font-weight: 800;

    white-space: nowrap;
  }

  .contacts-page .person-role {
    margin-top: 3px;

    color: #94a3b8;

    font-size: 9px;
    font-weight: 700;
  }

  .contacts-page .contact-value {
    display: inline-flex;
    align-items: center;
    gap: 7px;

    color: #475569;

    font-size: 11px;
    font-weight: 650;

    white-space: nowrap;
  }

  .contacts-page .contact-value svg {
    color: var(--abc-teal);
    flex-shrink: 0;
  }

  .contacts-page .contact-value a {
    color: inherit;
    text-decoration: none;
  }

  .contacts-page .contact-value a:hover {
    color: var(--abc-teal);
  }

  .contacts-page .subject-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;

    max-width: 190px;

    padding: 7px 10px;

    border-radius: 10px;

    color: var(--abc-teal);

    background: var(--abc-teal-soft);

    border:
      1px solid rgba(20, 184, 166, .18);

    font-size: 10px;
    font-weight: 800;
  }

  .contacts-page .message-preview {
    width: 270px;
    max-width: 270px;

    color: #64748b;

    font-size: 11px;
    font-weight: 500;

    line-height: 1.5;

    white-space: nowrap;

    overflow: hidden;
    text-overflow: ellipsis;
  }

  .contacts-page .date-cell {
    display: flex;
    align-items: center;
    gap: 7px;

    color: #64748b;

    font-size: 10px;
    font-weight: 700;

    white-space: nowrap;
  }

  .contacts-page .date-cell svg {
    color: var(--abc-teal);
  }

  .contacts-page .view-button {
    min-height: 38px;

    padding: 0 13px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    gap: 7px;

    border:
      1px solid rgba(20, 184, 166, .25);

    border-radius: 11px;

    color: var(--abc-teal);

    background: #f0fdfa;

    cursor: pointer;

    font-size: 10px;
    font-weight: 800;

    white-space: nowrap;

    transition:
      transform .22s ease,
      background .22s ease,
      color .22s ease,
      box-shadow .22s ease;
  }

  .contacts-page .view-button:hover {
    color: white;

    background: var(--abc-teal);

    transform: translateY(-2px);

    box-shadow:
      0 8px 18px rgba(15, 118, 110, .20);
  }

  .contacts-page .loading-state {
    padding: 80px 25px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;
  }

  .contacts-page .loading-ring {
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

  .contacts-page .loading-title {
    color: var(--abc-navy);

    font-size: 13px;
    font-weight: 800;
  }

  .contacts-page .loading-subtitle {
    margin-top: 5px;

    color: #94a3b8;

    font-size: 10px;
    font-weight: 600;
  }

  .contacts-page .empty-state {
    padding: 75px 25px;

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
  }

  .contacts-page .empty-icon {
    width: 58px;
    height: 58px;

    display: grid;
    place-items: center;

    border-radius: 18px;

    color: var(--abc-teal);

    background: var(--abc-teal-soft);

    margin-bottom: 14px;
  }

  .contacts-page .empty-title {
    margin: 0;

    color: var(--abc-navy);

    font-family: 'Outfit', sans-serif;

    font-size: 18px;
    font-weight: 800;
  }

  .contacts-page .empty-text {
    max-width: 400px;

    margin: 7px 0 18px;

    color: var(--abc-muted);

    font-size: 11px;
    font-weight: 500;

    line-height: 1.6;
  }

  .contacts-page .modal-overlay {
    position: fixed;

    inset: 0;

    z-index: 9999;

    padding: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    background:
      rgba(2, 20, 18, .68);

    backdrop-filter: blur(10px);

    animation:
      modalFade .2s ease both;
  }

  @keyframes modalFade {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .contacts-page .contact-modal {
    width: 100%;
    max-width: 650px;

    max-height: calc(100vh - 40px);

    overflow-y: auto;

    border-radius: 26px;

    background: white;

    border:
      1px solid rgba(20, 184, 166, .18);

    box-shadow:
      0 35px 100px rgba(0,0,0,.30);

    animation:
      modalEnter .3s cubic-bezier(.16,1,.3,1) both;
  }

  @keyframes modalEnter {
    from {
      opacity: 0;
      transform: translateY(15px) scale(.96);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .contacts-page .modal-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 15px;

    padding: 22px 24px;

    border-bottom:
      1px solid #edf2f2;
  }

  .contacts-page .modal-title-area {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .contacts-page .modal-icon {
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

  .contacts-page .modal-title {
    margin: 0;

    color: var(--abc-navy);

    font-family: 'Outfit', sans-serif;

    font-size: 20px;
    font-weight: 800;
  }

  .contacts-page .modal-subtitle {
    margin: 3px 0 0;

    color: #94a3b8;

    font-size: 10px;
    font-weight: 600;
  }

  .contacts-page .modal-close {
    width: 38px;
    height: 38px;

    display: grid;
    place-items: center;

    border: none;

    border-radius: 11px;

    color: #64748b;

    background: #f1f5f5;

    cursor: pointer;

    transition: .2s ease;
  }

  .contacts-page .modal-close:hover {
    color: #dc2626;
    background: #fee2e2;

    transform: rotate(5deg);
  }

  .contacts-page .modal-content {
    padding: 24px;
  }

  .contacts-page .modal-profile {
    display: flex;
    align-items: center;
    gap: 13px;

    margin-bottom: 20px;

    padding: 15px;

    border:
      1px solid #e7eeee;

    border-radius: 17px;

    background: #f9fbfb;
  }

  .contacts-page .modal-profile-avatar {
    width: 47px;
    height: 47px;

    display: grid;
    place-items: center;

    border-radius: 14px;

    color: var(--abc-teal);

    background: #e3f8f3;

    font-family: 'Outfit', sans-serif;

    font-weight: 900;
  }

  .contacts-page .modal-profile-name {
    color: var(--abc-navy);

    font-family: 'Outfit', sans-serif;

    font-size: 15px;
    font-weight: 800;
  }

  .contacts-page .modal-profile-sub {
    margin-top: 3px;

    color: #94a3b8;

    font-size: 10px;
    font-weight: 600;
  }

  .contacts-page .modal-info-grid {
    display: grid;

    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: 11px;

    margin-bottom: 20px;
  }

  .contacts-page .info-box {
    min-width: 0;

    padding: 13px;

    border:
      1px solid #e8eeee;

    border-radius: 14px;

    background: white;
  }

  .contacts-page .info-label {
    display: flex;
    align-items: center;
    gap: 6px;

    margin-bottom: 6px;

    color: #94a3b8;

    font-size: 9px;
    font-weight: 800;

    text-transform: uppercase;

    letter-spacing: .6px;
  }

  .contacts-page .info-label svg {
    color: var(--abc-teal);
  }

  .contacts-page .info-value {
    color: var(--abc-navy);

    font-size: 11px;
    font-weight: 700;

    word-break: break-word;
  }

  .contacts-page .info-value a {
    color: var(--abc-teal);
    text-decoration: none;
  }

  .contacts-page .message-box {
    padding: 17px;

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

  .contacts-page .message-box-title {
    display: flex;
    align-items: center;
    gap: 7px;

    margin-bottom: 9px;

    color: var(--abc-navy);

    font-family: 'Outfit', sans-serif;

    font-size: 12px;
    font-weight: 800;
  }

  .contacts-page .message-box-title svg {
    color: var(--abc-teal);
  }

  .contacts-page .message-content {
    min-height: 110px;

    color: #475569;

    font-size: 12px;
    font-weight: 500;

    line-height: 1.75;

    white-space: pre-wrap;

    word-break: break-word;
  }

  .contacts-page .modal-actions {
    display: flex;
    gap: 9px;

    margin-top: 17px;
  }

  .contacts-page .modal-action {
    flex: 1;

    min-height: 43px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    gap: 7px;

    border-radius: 12px;

    cursor: pointer;

    font-size: 10px;
    font-weight: 800;

    transition: .2s ease;
  }

  .contacts-page .modal-action.copy {
    color: var(--abc-teal);

    border:
      1px solid rgba(20, 184, 166, .20);

    background: var(--abc-teal-soft);

    text-decoration: none;
  }

  .contacts-page .modal-action.copy:hover {
    background: #dff8f2;
  }

  .contacts-page .modal-action.close {
    color: white;

    border: none;

    background:
      linear-gradient(
        135deg,
        var(--abc-teal),
        var(--abc-teal-deep)
      );
  }

  @media (max-width: 1200px) {
    .contacts-page .stats-grid {
      grid-template-columns:
        repeat(2, minmax(0, 1fr));
    }

    .contacts-page .filter-grid {
      grid-template-columns:
        minmax(220px, 1fr)
        minmax(180px, 220px);
    }

    .contacts-page .clear-filter-btn {
      width: 100%;
    }
  }

  @media (max-width: 900px) {
    .contacts-page .contacts-header {
      align-items: flex-start;
      flex-direction: column;
    }

    .contacts-page .header-actions {
      width: 100%;
    }

    .contacts-page .header-actions .action-button {
      flex: 1;
    }

    .contacts-page .filter-grid {
      grid-template-columns: 1fr;
    }

    .contacts-page .filter-section,
    .contacts-page .table-section,
    .contacts-page .contacts-header,
    .contacts-page .stats-grid {
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  @media (max-width: 700px) {
    .contacts-page {
      padding: 10px;
    }
  }

  @media (max-width: 650px) {
    .contacts-page .contacts-shell {
      border-radius: 20px;
    }

    .contacts-page .contacts-header {
      padding: 22px 18px;
    }

    .contacts-page .contacts-title-area {
      align-items: flex-start;
    }

    .contacts-page .contacts-title-icon {
      width: 50px;
      height: 50px;
      flex-basis: 50px;
      border-radius: 15px;
    }

    .contacts-page .contacts-title {
      font-size: 24px;
    }

    .contacts-page .contacts-subtitle {
      font-size: 11px;
    }

    .contacts-page .stats-grid {
      grid-template-columns: 1fr 1fr;

      padding: 15px;
    }

    .contacts-page .stat-card {
      padding: 12px;
    }

    .contacts-page .stat-number {
      font-size: 18px;
    }

    .contacts-page .filter-section {
      padding: 18px 15px;
    }

    .contacts-page .table-section {
      padding: 0 15px 18px;
    }

    .contacts-page .modal-overlay {
      padding: 10px;
    }

    .contacts-page .modal-info-grid {
      grid-template-columns: 1fr;
    }

    .contacts-page .modal-content {
      padding: 18px;
    }

    .contacts-page .modal-actions {
      flex-direction: column;
    }
  }

  @media (max-width: 430px) {
    .contacts-page .header-actions {
      flex-direction: column;
    }

    .contacts-page .header-actions .action-button {
      width: 100%;
    }

    .contacts-page .stats-grid {
      grid-template-columns: 1fr;
    }

    .contacts-page .filter-top-row {
      align-items: flex-start;
      flex-direction: column;
    }
  }
`;

export default function DashboardContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedContact, setSelectedContact] = useState(null);

  const [copied, setCopied] = useState("");

  /* =========================================================
     FETCH CONTACTS
  ========================================================= */

  const fetchContacts = useCallback(async (showSync = false) => {
    if (showSync) {
      setSyncing(true);
    } else {
      setLoading(true);
    }

    const token = localStorage.getItem("adminToken");

    if (!token) {
      console.warn("adminToken not found.");
      setContacts([]);
      setLoading(false);
      setSyncing(false);
      return;
    }

    try {
      const response = await fetch(CONTACTS_API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const contentType =
        response.headers.get("content-type") || "";

      let data = null;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        throw new Error(
          text ||
            `Server returned status ${response.status}`
        );
      }

      if (response.status === 401) {
        localStorage.removeItem("adminToken");

        throw new Error(
          "Your admin session has expired. Please login again."
        );
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            `Request failed with status ${response.status}`
        );
      }

      if (data?.success) {
        setContacts(
          Array.isArray(data.contacts)
            ? data.contacts
            : []
        );
      } else {
        setContacts([]);
        console.warn(
          "Contacts API returned unsuccessful response:",
          data?.message
        );
      }
    } catch (error) {
      console.error(
        "Contacts fetch karne mein error:",
        error
      );

      setContacts([]);
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  }, []);

  useEffect(() => {
    void fetchContacts(false);
  }, [fetchContacts]);

  /* =========================================================
     FILTERING
  ========================================================= */

  const filteredContacts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return contacts.filter((item) => {
      const name = cleanValue(
        item.name,
        ""
      ).toLowerCase();

      const email = cleanValue(
        item.email,
        ""
      ).toLowerCase();

      const phone = cleanValue(
        item.phone,
        ""
      ).toLowerCase();

      const subject = cleanValue(
        item.subject,
        ""
      ).toLowerCase();

      const message = cleanValue(
        item.message,
        ""
      ).toLowerCase();

      const matchesSearch =
        !query ||
        name.includes(query) ||
        email.includes(query) ||
        phone.includes(query) ||
        subject.includes(query) ||
        message.includes(query);

      const matchesSubject =
        selectedSubject === "All" ||
        cleanValue(
          item.subject,
          "General Inquiry"
        ) === selectedSubject;

      return matchesSearch && matchesSubject;
    });
  }, [
    contacts,
    searchTerm,
    selectedSubject,
  ]);

  const uniqueSubjects = useMemo(() => {
    const subjects = contacts
      .map((item) =>
        cleanValue(
          item.subject,
          "General Inquiry"
        )
      )
      .filter(Boolean);

    return [
      "All",
      ...new Set(subjects),
    ];
  }, [contacts]);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const stats = useMemo(() => {
    const total = contacts.length;

    const withEmail = contacts.filter(
      (item) =>
        item.email &&
        String(item.email).trim()
    ).length;

    const withPhone = contacts.filter(
      (item) =>
        item.phone &&
        String(item.phone).trim()
    ).length;

    const today = new Date();

    const todayCount = contacts.filter(
      (item) => {
        if (!item.createdAt) {
          return false;
        }

        const date = new Date(
          item.createdAt
        );

        if (Number.isNaN(date.getTime())) {
          return false;
        }

        return (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() ===
            today.getFullYear()
        );
      }
    ).length;

    return {
      total,
      withEmail,
      withPhone,
      todayCount,
    };
  }, [contacts]);

  /* =========================================================
     CSV EXPORT
  ========================================================= */

  const exportToCSV = () => {
    if (filteredContacts.length === 0) {
      window.alert(
        "No contact data available to export."
      );

      return;
    }

    const headers = [
      "Name",
      "Email",
      "Phone",
      "Subject",
      "Message",
      "Date Received",
    ];

    const rows = filteredContacts.map(
      (item) => [
        item.name || "",
        item.email || "",
        item.phone || "",
        item.subject ||
          "General Inquiry",
        item.message || "",
        item.createdAt
          ? formatDateTime(
              item.createdAt
            )
          : "",
      ]
    );

    const csvContent = [
      headers
        .map(escapeCSV)
        .join(","),
      ...rows.map((row) =>
        row
          .map(escapeCSV)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `ABC_Contacts_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =========================================================
     COPY
  ========================================================= */

  const copyText = async (
    value,
    type
  ) => {
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        String(value)
      );

      setCopied(type);

      window.setTimeout(() => {
        setCopied("");
      }, 1600);
    } catch (error) {
      console.error(
        "Copy failed:",
        error
      );
    }
  };

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSubject("All");
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <style>{styles}</style>

      <div className="contacts-page">
        <div className="contacts-bg-orb one" />
        <div className="contacts-bg-orb two" />

        <main className="contacts-shell">

          {/* HEADER */}

          <header className="contacts-header">
            <div className="contacts-title-area">
              <div className="contacts-title-icon">
                <MessageSquare
                  size={28}
                  strokeWidth={2.2}
                />
              </div>

              <div>
                <span className="contacts-kicker">
                  ABC ADMIN PORTAL
                </span>

                <h1 className="contacts-title">
                  Contact Messages
                </h1>

                <p className="contacts-subtitle">
                  Review, manage and respond
                  to inquiries received
                  through your website.
                </p>
              </div>
            </div>

            <div className="header-actions">
              <button
                type="button"
                className="action-button secondary"
                onClick={() =>
                  fetchContacts(true)
                }
                disabled={syncing}
              >
                <RefreshCw
                  size={16}
                  className={
                    syncing
                      ? "spin"
                      : ""
                  }
                />

                {syncing
                  ? "Syncing..."
                  : "Sync Live Data"}
              </button>

              <button
                type="button"
                className="action-button primary"
                onClick={exportToCSV}
              >
                <Download size={16} />
                Export CSV
              </button>
            </div>
          </header>

          {/* STATISTICS */}

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Inbox size={19} />
              </div>

              <div className="stat-content">
                <span className="stat-number">
                  {stats.total}
                </span>

                <span className="stat-label">
                  Total Messages
                </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Mail size={19} />
              </div>

              <div className="stat-content">
                <span className="stat-number">
                  {stats.withEmail}
                </span>

                <span className="stat-label">
                  Email Available
                </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Phone size={19} />
              </div>

              <div className="stat-content">
                <span className="stat-number">
                  {stats.withPhone}
                </span>

                <span className="stat-label">
                  Phone Available
                </span>
              </div>
            </div>

            <div className="stat-card gold">
              <div className="stat-icon">
                <Sparkles size={19} />
              </div>

              <div className="stat-content">
                <span className="stat-number">
                  {stats.todayCount}
                </span>

                <span className="stat-label">
                  Received Today
                </span>
              </div>
            </div>
          </section>

          {/* FILTERS */}

          <section className="filter-section">
            <div className="filter-top-row">
              <div className="filter-heading">
                <SlidersHorizontal size={15} />
                Message Filters
              </div>

              <div className="result-count">
                Showing{" "}
                {filteredContacts.length}{" "}
                of {contacts.length}
              </div>
            </div>

            <div className="filter-grid">
              <div className="search-wrapper">
                <Search
                  className="search-icon"
                  size={17}
                />

                <input
                  className="search-input"
                  type="text"
                  placeholder="Search name, email, phone, subject or message..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="select-wrapper">
                <select
                  className="subject-select"
                  value={selectedSubject}
                  onChange={(e) =>
                    setSelectedSubject(
                      e.target.value
                    )
                  }
                >
                  <option value="All">
                    All Inquiry Subjects
                  </option>

                  {uniqueSubjects
                    .filter(
                      (subject) =>
                        subject !==
                        "All"
                    )
                    .map((subject) => (
                      <option
                        key={subject}
                        value={subject}
                      >
                        {subject}
                      </option>
                    ))}
                </select>

                <ChevronDown
                  className="select-icon"
                  size={16}
                />
              </div>

              <button
                type="button"
                className="clear-filter-btn"
                onClick={clearFilters}
              >
                <X size={14} />
                Clear Filters
              </button>
            </div>
          </section>

          {/* TABLE */}

          <section className="table-section">
            <div className="table-card">
              {loading ? (
                <div className="loading-state">
                  <div className="loading-ring" />

                  <div className="loading-title">
                    Loading messages
                    securely...
                  </div>

                  <div className="loading-subtitle">
                    Connecting with ABC
                    administration server
                  </div>
                </div>
              ) : filteredContacts.length ===
                0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <Inbox size={26} />
                  </div>

                  <h3 className="empty-title">
                    No Contact Messages
                    Found
                  </h3>

                  <p className="empty-text">
                    There are no messages
                    matching your current
                    search or subject
                    filter.
                  </p>

                  {(searchTerm ||
                    selectedSubject !==
                      "All") && (
                    <button
                      type="button"
                      className="action-button secondary"
                      onClick={
                        clearFilters
                      }
                    >
                      <X size={15} />
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="table-scroll">
                  <table className="contacts-table">
                    <thead>
                      <tr>
                        <th>Sender</th>
                        <th>Email Address</th>
                        <th>Phone Number</th>
                        <th>Subject</th>
                        <th>
                          Message Preview
                        </th>
                        <th>Date Received</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredContacts.map(
                        (item, index) => (
                          <tr
                            key={
                              item._id ||
                              `${item.email || "contact"}-${item.createdAt || index}-${index}`
                            }
                          >
                            <td>
                              <div className="person-cell">
                                <div className="avatar">
                                  {getInitials(
                                    item.name
                                  )}
                                </div>

                                <div>
                                  <div className="person-name">
                                    {cleanValue(
                                      item.name,
                                      "Unknown Sender"
                                    )}
                                  </div>

                                  <div className="person-role">
                                    Website
                                    Inquiry
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="contact-value">
                                <Mail
                                  size={14}
                                />

                                {item.email ? (
                                  <a
                                    href={`mailto:${item.email}`}
                                  >
                                    {
                                      item.email
                                    }
                                  </a>
                                ) : (
                                  "N/A"
                                )}
                              </div>
                            </td>

                            <td>
                              <div className="contact-value">
                                <Phone
                                  size={14}
                                />

                                {item.phone ? (
                                  <a
                                    href={`tel:${item.phone}`}
                                  >
                                    {
                                      item.phone
                                    }
                                  </a>
                                ) : (
                                  "N/A"
                                )}
                              </div>
                            </td>

                            <td>
                              <span className="subject-badge">
                                <MessageSquare
                                  size={12}
                                />

                                {cleanValue(
                                  item.subject,
                                  "General Inquiry"
                                )}
                              </span>
                            </td>

                            <td>
                              <div
                                className="message-preview"
                                title={
                                  item.message ||
                                  ""
                                }
                              >
                                {cleanValue(
                                  item.message,
                                  "No message content"
                                )}
                              </div>
                            </td>

                            <td>
                              <div className="date-cell">
                                <CalendarDays
                                  size={13}
                                />

                                {formatDate(
                                  item.createdAt
                                )}
                              </div>
                            </td>

                            <td>
                              <button
                                type="button"
                                className="view-button"
                                onClick={() =>
                                  setSelectedContact(
                                    item
                                  )
                                }
                              >
                                <Eye size={14} />
                                Read Full
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

        {/* FULL MESSAGE MODAL */}

        {selectedContact && (
          <div
            className="modal-overlay"
            onClick={() =>
              setSelectedContact(null)
            }
          >
            <div
              className="contact-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              {/* MODAL HEADER */}

              <div className="modal-top">
                <div className="modal-title-area">
                  <div className="modal-icon">
                    <MessageSquare
                      size={21}
                    />
                  </div>

                  <div>
                    <h2 className="modal-title">
                      Inquiry Details
                    </h2>

                    <p className="modal-subtitle">
                      Complete contact
                      message information
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="modal-close"
                  aria-label="Close message"
                  onClick={() =>
                    setSelectedContact(
                      null
                    )
                  }
                >
                  <X size={18} />
                </button>
              </div>

              {/* MODAL CONTENT */}

              <div className="modal-content">
                <div className="modal-profile">
                  <div className="modal-profile-avatar">
                    {getInitials(
                      selectedContact.name
                    )}
                  </div>

                  <div>
                    <div className="modal-profile-name">
                      {cleanValue(
                        selectedContact.name,
                        "Unknown Sender"
                      )}
                    </div>

                    <div className="modal-profile-sub">
                      Contact inquiry
                      received through
                      website
                    </div>
                  </div>
                </div>

                {/* INFORMATION */}

                <div className="modal-info-grid">
                  <div className="info-box">
                    <div className="info-label">
                      <Mail size={12} />
                      Email
                    </div>

                    <div className="info-value">
                      {selectedContact.email ? (
                        <a
                          href={`mailto:${selectedContact.email}`}
                        >
                          {
                            selectedContact.email
                          }
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </div>

                  <div className="info-box">
                    <div className="info-label">
                      <Phone size={12} />
                      Phone
                    </div>

                    <div className="info-value">
                      {selectedContact.phone ? (
                        <a
                          href={`tel:${selectedContact.phone}`}
                        >
                          {
                            selectedContact.phone
                          }
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </div>

                  <div className="info-box">
                    <div className="info-label">
                      <FileText
                        size={12}
                      />
                      Subject
                    </div>

                    <div className="info-value">
                      {cleanValue(
                        selectedContact.subject,
                        "General Inquiry"
                      )}
                    </div>
                  </div>

                  <div className="info-box">
                    <div className="info-label">
                      <CalendarDays
                        size={12}
                      />
                      Received
                    </div>

                    <div className="info-value">
                      {formatDateTime(
                        selectedContact.createdAt
                      )}
                    </div>
                  </div>
                </div>

                {/* MESSAGE */}

                <div className="message-box">
                  <div className="message-box-title">
                    <MessageSquare
                      size={15}
                    />
                    Full Message
                  </div>

                  <div className="message-content">
                    {cleanValue(
                      selectedContact.message,
                      "No message text provided."
                    )}
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="modal-actions">
                  {selectedContact.email && (
                    <a
                      className="modal-action copy"
                      href={`mailto:${selectedContact.email}`}
                    >
                      <Mail size={14} />
                      Reply by Email
                    </a>
                  )}

                  {selectedContact.phone && (
                    <a
                      className="modal-action copy"
                      href={`tel:${selectedContact.phone}`}
                    >
                      <Phone size={14} />
                      Call
                    </a>
                  )}

                  <button
                    type="button"
                    className="modal-action copy"
                    onClick={() =>
                      copyText(
                        selectedContact.message,
                        "message"
                      )
                    }
                  >
                    {copied ===
                    "message" ? (
                      <Check size={14} />
                    ) : (
                      <Copy size={14} />
                    )}

                    {copied ===
                    "message"
                      ? "Copied"
                      : "Copy Message"}
                  </button>

                  <button
                    type="button"
                    className="modal-action close"
                    onClick={() =>
                      setSelectedContact(
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
      </div>
    </>
  );
} 