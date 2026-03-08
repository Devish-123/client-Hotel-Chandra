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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, { method: "POST" });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Invalid credentials"); }
      const rawToken = await res.text();
      const token = rawToken.trim().replace(/^"|"$/g, "");
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role !== expectedRole) throw new Error(isAdmin ? "Access denied. Admin only." : "Access denied. Staff only.");
      onLogin(token, payload.role);
      navigate(isAdmin ? "/admin" : "/staff");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="page-enter" style={{ minHeight:"100vh", background:"var(--dark-wood)", display:"flex", alignItems:"center", justifyContent:"center", padding:"100px 20px 40px", position:"relative", overflow:"hidden" }}>
      <style>{`
        .login-bg { position:absolute; inset:0; background: radial-gradient(ellipse at 30% 70%, rgba(123,45,62,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(27,58,107,0.1) 0%, transparent 50%); }
        .login-pattern { position:absolute; inset:0; opacity:0.025; background-image: repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%), repeating-linear-gradient(-45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%); background-size:24px 24px; }
        .login-card { background:var(--dark-wood-mid); border:1px solid rgba(201,168,76,0.2); padding:56px 52px; width:100%; max-width:460px; position:relative; z-index:2; }
        .login-top { text-align:center; margin-bottom:32px; }
        .login-icon { font-size:38px; margin-bottom:12px; }
        .login-brand { font-family:var(--font-display); font-size:24px; color:var(--gold); }
        .login-sub { font-family:var(--font-body); font-size:9px; letter-spacing:4px; text-transform:uppercase; color:var(--muted-text); margin-top:4px; }
        .login-divider { width:36px; height:1px; background:var(--gold-dim); margin:20px auto; }
        .login-role { display:flex; align-items:center; justify-content:center; gap:8px; font-family:var(--font-body); font-size:10px; letter-spacing:3px; text-transform:uppercase; padding:10px; margin-bottom:24px; }
        .login-error { background:rgba(123,45,62,0.2); border:1px solid rgba(123,45,62,0.4); color:#e08090; font-family:var(--font-body); font-size:12px; padding:12px 16px; margin-bottom:20px; text-align:center; }
        .login-fgroup { margin-bottom:20px; }
        .login-btn { width:100%; border:none; font-family:var(--font-body); font-size:11px; font-weight:600; letter-spacing:3px; text-transform:uppercase; padding:15px; cursor:pointer; transition:all 0.3s; margin-top:8px; }
        .login-btn:disabled { opacity:0.6; cursor:not-allowed; }
        .login-back { text-align:center; margin-top:24px; }
        .login-back button { font-family:var(--font-body); font-size:11px; color:var(--muted-text); background:none; border:none; cursor:pointer; transition:color 0.3s; letter-spacing:1px; }
        .login-back button:hover { color:var(--gold); }
        @media (max-width:480px) { .login-card { padding:36px 24px; } }
      `}</style>
      <div className="login-bg" />
      <div className="login-pattern" />
      <div className="login-card">
        <div className="login-top">
          <div className="login-icon">{isAdmin ? "👑" : "👷"}</div>
          <div className="login-brand">Chandra Residency</div>
          <div className="login-sub">{isAdmin ? "Admin Portal" : "Staff Portal"}</div>
        </div>
        <div className="login-divider" />
        <div className="login-role" style={{ background: isAdmin ? "rgba(201,168,76,0.06)" : "rgba(27,58,107,0.1)", border: `1px solid ${isAdmin ? "rgba(201,168,76,0.2)" : "rgba(27,58,107,0.3)"}`, color: isAdmin ? "var(--gold)" : "#7eb8d4" }}>
          {isAdmin ? "👑" : "👷"} {isAdmin ? "Administrator Access Only" : "Staff Access Only"}
        </div>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="login-fgroup">
            <label className="form-label">Username</label>
            <input className="form-inp" type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="login-fgroup">
            <label className="form-label">Password</label>
            <input className="form-inp" type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button className="login-btn" type="submit" disabled={loading}
            style={{ background: isAdmin ? "var(--gold)" : "var(--royal-blue)", color: isAdmin ? "var(--dark-wood)" : "var(--ivory)" }}>
            {loading ? "Signing in..." : `Sign In as ${isAdmin ? "Admin" : "Staff"} →`}
          </button>
        </form>
        <div className="login-back">
          <button onClick={() => navigate("/")}>← Back to Website</button>
        </div>
      </div>
    </div>
  );
}
