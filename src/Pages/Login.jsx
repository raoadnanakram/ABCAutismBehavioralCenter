import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLoginSuccess }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('adminToken', data.token);
        
        // Agar prop pass hua hai toh woh call ho jayega, warna direct navigate ho jayega
        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess();
        } else {
          navigate("/admin");
        }
      } else {
        setError(data.message || 'Invalid phone number or password.');
      }
    } catch (err) {
      console.error("Connection error:", err);
      setError('Server ke sath connection nahi ho saka.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        :root {
          --teal-glow: #14b8a6;
          --teal-deep: #0f766e;
          --gold-accent: #fbbf24;
          --gold-deep: #d97706;
          --bg-space: #030f0d;
        }

        *, *::before, *::after { box-sizing: border-box; }

        body {
          margin: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--bg-space);
          color: #1e293b;
          overflow-x: hidden;
        }

        /* Cinematic Universe Page Layout */
        .cinematic-page {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 24px;
          background: radial-gradient(circle at 15% 20%, rgba(20, 184, 166, 0.22) 0%, transparent 45%),
                      radial-gradient(circle at 85% 80%, rgba(251, 191, 36, 0.18) 0%, transparent 45%),
                      linear-gradient(135deg, #020a09 0%, #06221f 100%);
        }

        /* Animated Aurora Background Waves */
        .aurora-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }

        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.5;
          animation: auroraMove 15s ease-in-out infinite alternate;
        }
        .blob-1 { width: 450px; height: 450px; background: rgba(13, 148, 136, 0.3); top: -100px; left: -100px; }
        .blob-2 { width: 500px; height: 500px; background: rgba(245, 158, 11, 0.25); bottom: -120px; right: -100px; animation-delay: -7s; }

        @keyframes auroraMove {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          100% { transform: translate(50px, 40px) scale(1.12) rotate(10deg); }
        }

        /* Master Glass Card with Glowing Border */
        .cinematic-card-wrap {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1120px;
          border-radius: 36px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.04));
          padding: 2px;
          box-shadow: 0 35px 90px rgba(0, 0, 0, 0.55), 0 0 50px rgba(20, 184, 166, 0.15);
          animation: cardSlideUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes cardSlideUp {
          0% { opacity: 0; transform: translateY(40px) scale(0.96); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        .cinematic-card-inner {
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(35px) saturate(180%);
          border-radius: 34px;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          overflow: hidden;
          position: relative;
        }

        /* Left Brand Showcase Section */
        .brand-panel {
          background: linear-gradient(145deg, #042f2e 0%, #0d9488 50%, #032b28 100%);
          color: white;
          padding: 64px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .brand-panel::before {
          content: '';
          position: absolute;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, transparent 70%);
          top: -60px; right: -60px;
          border-radius: 50%;
        }

        .admin-badge-animated {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: 8px 18px;
          border-radius: 50px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          width: fit-content;
          backdrop-filter: blur(12px);
          animation: badgePulse 3s ease-in-out infinite;
        }

        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 rgba(251, 191, 36, 0); }
          50% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.4); }
        }

        .brand-logo-glow {
          width: 76px; height: 76px;
          background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.08));
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          font-size: 26px;
          font-weight: 900;
          color: #fff;
          box-shadow: 0 15px 35px rgba(0,0,0,0.25);
          margin: 28px 0;
          position: relative;
          animation: logoFloat 4s ease-in-out infinite alternate;
        }

        @keyframes logoFloat {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-6px) rotate(-2deg); }
        }

        .brand-logo-glow::after {
          content: '';
          position: absolute;
          width: 12px; height: 12px;
          background: var(--gold-accent);
          border-radius: 50%;
          top: 8px; right: 8px;
          box-shadow: 0 0 15px var(--gold-accent);
          animation: statusBlink 2s infinite;
        }

        @keyframes statusBlink {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }

        .brand-panel h1 {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(32px, 3.8vw, 46px);
          font-weight: 800;
          line-height: 1.12;
          margin: 0 0 14px 0;
          letter-spacing: -1px;
        }

        .brand-panel h1 span {
          color: var(--gold-accent);
          display: block;
          text-shadow: 0 5px 25px rgba(245, 158, 11, 0.3);
        }

        .brand-tagline-box {
          background: rgba(0, 0, 0, 0.2);
          border-left: 3px solid var(--gold-accent);
          padding: 12px 16px;
          border-radius: 0 12px 12px 0;
          margin-bottom: 24px;
        }

        .brand-tagline-box p {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #fef08a;
          margin: 0;
          letter-spacing: 0.3px;
        }

        .brand-panel p.description {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.75;
          max-width: 400px;
          margin: 0 0 32px 0;
        }

        .feature-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .chip {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          padding: 8px 14px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          backdrop-filter: blur(10px);
          transition: transform 0.3s, background 0.3s;
        }
        .chip:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.15);
        }

        /* Right Form Section */
        .form-panel {
          padding: 64px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: linear-gradient(180deg, #ffffff 0%, #f0fdfc 100%);
        }

        .form-header {
          margin-bottom: 28px;
        }

        .form-header h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 6px 0;
          letter-spacing: -0.5px;
        }

        .form-header h2 span {
          color: var(--teal-deep);
        }

        .form-header p {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }

        .error-notification {
          background: #fff1f2;
          border: 1px solid #fecdd3;
          color: #be123c;
          padding: 13px 16px;
          border-radius: 14px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 22px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 25px rgba(190, 18, 60, 0.08);
          animation: errorShake 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }

        @keyframes errorShake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-group label {
          display: block;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #334155;
          margin-bottom: 8px;
        }

        .input-field-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-symbol {
          position: absolute;
          left: 16px;
          font-size: 16px;
          z-index: 2;
          pointer-events: none;
        }

        .input-field-wrapper input {
          width: 100%;
          height: 54px;
          padding: 0 50px;
          background: #f8fafc;
          border: 1.5px solid #cbd5e1;
          border-radius: 16px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          outline: none;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .input-field-wrapper input:hover {
          border-color: var(--teal-glow);
          background: #fff;
        }

        .input-field-wrapper input:focus {
          border-color: var(--teal-deep);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.15), 0 10px 25px rgba(13, 148, 136, 0.1);
          transform: translateY(-1px);
        }

        .password-toggle-action {
          position: absolute;
          right: 14px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 6px;
          color: #64748b;
          border-radius: 10px;
          transition: background 0.2s, transform 0.2s;
        }
        .password-toggle-action:hover {
          background: rgba(0,0,0,0.06);
          color: #0f172a;
          transform: scale(1.1);
        }

        .cinematic-submit-btn {
          width: 100%;
          height: 56px;
          background: linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #115e59 100%);
          background-size: 200% auto;
          color: white;
          border: none;
          border-radius: 16px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 0 12px 30px rgba(13, 148, 136, 0.38), inset 0 1px 0 rgba(255,255,255,0.25);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          margin-top: 12px;
          position: relative;
          overflow: hidden;
        }

        .cinematic-submit-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          transition: 0.6s;
        }

        .cinematic-submit-btn:hover:not(:disabled) {
          background-position: right center;
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(13, 148, 136, 0.5), inset 0 1px 0 rgba(255,255,255,0.4);
        }

        .cinematic-submit-btn:hover:not(:disabled)::before {
          left: 100%;
        }

        .cinematic-submit-btn:disabled {
          opacity: 0.85;
          cursor: not-allowed;
        }

        .loader-spinner {
          width: 20px; height: 20px;
          border: 2.5px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spinAnimation 0.8s linear infinite;
        }

        @keyframes spinAnimation {
          to { transform: rotate(360deg); }
        }

        .form-footer-copy {
          text-align: center;
          margin-top: 26px;
          font-size: 11px;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        @media (max-width: 950px) {
          .cinematic-card-inner {
            grid-template-columns: 1fr;
          }
          .brand-panel {
            display: none;
          }
          .form-panel {
            padding: 48px 28px;
          }
        }
      `}</style>

      <div className="cinematic-page">
        <div className="aurora-bg">
          <div className="aurora-blob blob-1"></div>
          <div className="aurora-blob blob-2"></div>
        </div>

        <div className="cinematic-card-wrap">
          <div className="cinematic-card-inner">
            
            {/* Left Brand Showcase Area */}
            <div className="brand-panel">
              <div>
                <div className="admin-badge-animated">🛡️ Authorized Admin Gateway</div>
                <div className="brand-logo-glow">ABC</div>
                <h1>
                  ABC Autism
                  <span>Behavioural Center</span>
                </h1>
                
                <div className="brand-tagline-box">
                  <p>✨ "Empowering growth, shaping futures, and leading professional behavioral care with excellence."</p>
                </div>

                <p className="description">
                  Secure administration dashboard designed for seamless clinical management, appointment control, and specialized client care tracking.
                </p>
              </div>

              <div className="feature-chips">
                <div className="chip">🔒 Encrypted Session</div>
                <div className="chip">⚡ High Speed Sync</div>
                <div className="chip">📊 Central Control</div>
              </div>
            </div>

            {/* Right Interactive Form Area */}
            <div className="form-panel">
              <div className="form-header">
                <h2>Admin <span>Login</span></h2>
                <p>Sign in with your administrator credentials</p>
              </div>

              {error && (
                <div className="error-notification">
                  <span>⚠️</span> {error}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <label>Phone Number</label>
                  <div className="input-field-wrapper">
                    <span className="input-symbol">📞</span>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="03001234567"
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <div className="input-field-wrapper">
                    <span className="input-symbol">🔒</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter secure password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-action"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password view"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <button type="submit" className="cinematic-submit-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="loader-spinner"></div>
                      Authenticating Portal...
                    </>
                  ) : (
                    <>
                      Access Administrator Dashboard &rarr;
                    </>
                  )}
                </button>
              </form>

              <div className="form-footer-copy">
                &copy; {new Date().getFullYear()} ABC Autism Behavioural Center. All Rights Reserved.
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}