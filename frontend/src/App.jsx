import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Reservation from "./pages/Reservation";
import About from "./pages/About";
import StaffLogin from "./pages/StaffLogin";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

function PublicLayout({ user, onLogin, onLogout }) {
  const [auth, setAuth] = useState(user);

  useEffect(() => { setAuth(user); }, [user]);

  // If already logged in redirect to dashboard
  if (auth?.role === "ADMIN") return <Navigate to="/admin" replace />;
  if (auth?.role === "EMPLOYEE") return <Navigate to="/staff" replace />;

  return (
    <>
      <Navbar />
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

function ProtectedRoute({ user, requiredRole, children, onLogout }) {
  if (!user || user.role !== requiredRole) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) setUser({ token, role });
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

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin dashboard */}
        <Route path="/admin/*" element={
          <ProtectedRoute user={user} requiredRole="ADMIN" onLogout={handleLogout}>
            <AdminDashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        {/* Employee dashboard */}
        <Route path="/staff/*" element={
          <ProtectedRoute user={user} requiredRole="EMPLOYEE" onLogout={handleLogout}>
            <EmployeeDashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        {/* Public pages */}
        <Route path="/*" element={
          <PublicLayout user={user} onLogin={handleLogin} onLogout={handleLogout} />
        } />
      </Routes>
    </BrowserRouter>
  );
}