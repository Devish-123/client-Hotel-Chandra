import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Reservation from "./pages/Reservation";
import About from "./pages/About";
import StaffLogin from "./pages/StaffLogin";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

// Scrolls to top on every route change + prevents flicker
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PublicLayout({ user, onLogin }) {
  if (user?.role === "ADMIN") return <Navigate to="/admin" replace />;
  if (user?.role === "EMPLOYEE") return <Navigate to="/staff" replace />;

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/about" element={<About />} />
        <Route path="/staff-login" element={<StaffLogin onLogin={onLogin} role="EMPLOYEE" />} />
        <Route path="/admin-login" element={<StaffLogin onLogin={onLogin} role="ADMIN" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function ProtectedRoute({ user, requiredRole, children }) {
  if (!user || user.role !== requiredRole) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      try {
        // Check if token is expired
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        if (isExpired) {
          // Token expired — clear and go to home
          localStorage.removeItem("token");
          localStorage.removeItem("role");
        } else {
          setUser({ token, role });
        }
      } catch {
        // Invalid token — clear it
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      }
    }
    setReady(true);
  }, []);

  const handleLogin = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setUser({ token, role });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

  // Don't render until auth state is resolved — prevents flicker
  if (!ready) return (
    <div style={{ minHeight:"100vh", background:"var(--dark-wood)", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ fontFamily:"var(--font-display)", fontSize:"24px", color:"var(--gold)" }}>✦</div>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={
          <ProtectedRoute user={user} requiredRole="ADMIN">
            <AdminDashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/staff/*" element={
          <ProtectedRoute user={user} requiredRole="EMPLOYEE">
            <EmployeeDashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/*" element={
          <PublicLayout user={user} onLogin={handleLogin} />
        } />
      </Routes>
    </BrowserRouter>
  );
}