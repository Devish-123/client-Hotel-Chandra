import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Reservation from "./pages/Reservation";
import About from "./pages/About";
import StaffLogin from "./pages/StaffLogin";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) setUser({ token, role });
  }, []);

  const navigate = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const handleLogin = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setUser({ token, role });
    navigate(role === "ADMIN" ? "admin" : "employee");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    navigate("home");
  };

  // Show dashboards if logged in
  if (user?.role === "ADMIN") return <AdminDashboard user={user} onLogout={handleLogout} />;
  if (user?.role === "EMPLOYEE") return <EmployeeDashboard user={user} onLogout={handleLogout} />;

  return (
    <div>
      <Navbar navigate={navigate} currentPage={page} />
      {page === "home" && <Home navigate={navigate} />}
      {page === "rooms" && <Rooms navigate={navigate} />}
      {page === "reservation" && <Reservation />}
      {page === "about" && <About />}
      {/* Staff login — EMPLOYEE role only */}
      {page === "staff-login" && <StaffLogin onLogin={handleLogin} navigate={navigate} role="EMPLOYEE" />}
      {/* Admin login — ADMIN role only */}
      {page === "admin-login" && <StaffLogin onLogin={handleLogin} navigate={navigate} role="ADMIN" />}
    </div>
  );
}