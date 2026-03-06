import { useNavigate } from "react-router-dom";
import { useState } from "react";

const API = "https://chandra-residency-backend.onrender.com";

export default function StaffLogin({ onLogin, role }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isAdmin = role === "ADMIN";
  const expectedRole = isAdmin ? "ADMIN" : "EMPLOYEE";
  const title = isAdmin ? "Admin Login" : "Staff Login";
  const icon = isAdmin ? "👑" : "👷";
  const accent = isAdmin ? "#D4AF37" : "#7eb8d4";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, { method: "POST" });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Invalid credentials"); }
      const rawToken = await res.text();
      const token = rawToken.trim().replace(/^"|"$/g, ""); // strip quotes if any
      console.log("Token received:", token ? "YES (length: " + token.length + ")" : "NO");
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Role check — block wrong role
      if (payload.role !== expectedRole) {
        throw new Error(isAdmin
          ? "Access denied. This login is for Admins only."
          : "Access denied. This login is for Staff only."
        );
      }
      onLogin(token, payload.role);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .login-page {
          min-height: 100vh; background: #0a0805;
          display: flex; align-items: center; justify-content: center;
          padding: 100px 20px 40px; position: relative; overflow: hidden;
        }
        .login-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%); }
        .login-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px); background-size: 40px 40px; }
        .login-card { background: #0f0a05; border: 1px solid rgba(212,175,55,0.2); padding: 60px 56px; width: 100%; max-width: 460px; position: relative; z-index: 2; animation: fadeUp 0.5s ease forwards; }
        @keyframes fadeUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
        .login-icon { font-size: 40px; text-align: center; margin-bottom: 12px; }
        .login-logo { font-family: 'Cormorant Garamond', serif; font-size: 26px; color: #D4AF37; text-align: center; margin-bottom: 4px; }
        .login-sub { font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: #6a5a3a; text-align: center; margin-bottom: 32px; }
        .login-divider { width: 40px; height: 1px; background: rgba(212,175,55,0.3); margin: 0 auto 32px; }
        .login-title { font-family: 'Cormorant Garamond', serif; font-size: 32px; color: #f0e6d0; text-align: center; margin-bottom: 8px; }
        .login-desc { font-family: 'Montserrat', sans-serif; font-size: 12px; color: #6a5a3a; text-align: center; margin-bottom: 32px; }
        .form-group { margin-bottom: 20px; }
        .form-label { font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #D4AF37; display: block; margin-bottom: 8px; }
        .form-input { width: 100%; background: #1a1005; border: 1px solid rgba(212,175,55,0.2); color: #f0e6d0; font-family: 'Montserrat', sans-serif; font-size: 14px; padding: 14px 16px; outline: none; transition: border-color 0.3s; }
        .form-input:focus { border-color: rgba(212,175,55,0.6); }
        .form-input::placeholder { color: #4a3a1a; }
        .login-btn { width: 100%; border: none; font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; padding: 16px; cursor: pointer; transition: all 0.3s; margin-top: 8px; }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .login-error { background: rgba(180,50,50,0.1); border: 1px solid rgba(180,50,50,0.3); color: #e07070; font-family: 'Montserrat', sans-serif; font-size: 12px; padding: 12px 16px; margin-bottom: 20px; text-align: center; }
        .login-back { text-align: center; margin-top: 24px; }
        .login-back button { font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 1px; color: #6a5a3a; background: none; border: none; cursor: pointer; transition: color 0.3s; }
        .login-back button:hover { color: #D4AF37; }
        .role-strip { display: flex; align-items: center; justify-content: center; gap: 8px; font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; padding: 10px 20px; border-radius: 0; margin-bottom: 28px; }
      `}</style>
      <div className="login-page">
        <div className="login-bg" />
        <div className="login-grid" />
        <div className="login-card">
          <div className="login-icon">{icon}</div>
          <div className="login-logo">Chandra Residency</div>
          <div className="login-sub">{title}</div>
          <div className="login-divider" />

          {/* Role indicator strip */}
          <div className="role-strip" style={{ background: isAdmin ? "rgba(212,175,55,0.08)" : "rgba(126,184,212,0.08)", border: `1px solid ${isAdmin ? "rgba(212,175,55,0.25)" : "rgba(126,184,212,0.25)"}`, color: isAdmin ? "#D4AF37" : "#7eb8d4" }}>
            {icon} {isAdmin ? "Administrator Access Only" : "Staff Access Only"}
          </div>

          {error && <div className="login-error">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input className="form-input" type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button className="login-btn" type="submit" disabled={loading}
              style={{ background: isAdmin ? "#D4AF37" : "#7eb8d4", color: "#0f0a05" }}>
              {loading ? "Signing in..." : `Sign In as ${isAdmin ? "Admin" : "Staff"} →`}
            </button>
          </form>
          <div className="login-back">
            <button onClick={() => navigate("/")}>← Back to Website</button>
          </div>
        </div>
      </div>
    </>
  );
}