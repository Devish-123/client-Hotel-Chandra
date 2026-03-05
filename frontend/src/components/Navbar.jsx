import { useState } from "react";

export default function Navbar({ navigate, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", page: "home" },
    { label: "Rooms", page: "rooms" },
    { label: "Reservation", page: "reservation" },
    { label: "About", page: "about" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          background: rgba(15, 10, 5, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between;
          height: 75px;
        }
        .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: #D4AF37; letter-spacing: 2px; cursor: pointer; display: flex; flex-direction: column; line-height: 1.1; }
        .nav-logo span { font-size: 11px; color: #a08c5b; letter-spacing: 4px; font-weight: 300; font-family: 'Montserrat', sans-serif; text-transform: uppercase; }
        .nav-links { display: flex; align-items: center; gap: 28px; }
        .nav-link { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: #c8b89a; cursor: pointer; background: none; border: none; padding: 4px 0; position: relative; transition: color 0.3s; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #D4AF37; transition: width 0.3s; }
        .nav-link:hover, .nav-link.active { color: #D4AF37; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .btn-group { display: flex; gap: 10px; align-items: center; }
        .staff-btn { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; border: none; padding: 10px 18px; cursor: pointer; transition: all 0.3s; }
        .staff-btn.employee { background: transparent; color: #D4AF37; border: 1px solid rgba(212,175,55,0.4); }
        .staff-btn.employee:hover { background: rgba(212,175,55,0.08); border-color: #D4AF37; transform: translateY(-1px); }
        .staff-btn.admin { background: #D4AF37; color: #0f0a05; }
        .staff-btn.admin:hover { background: #f0c93a; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(212,175,55,0.3); }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: #D4AF37; transition: all 0.3s; }
        .mobile-menu { display: none; position: fixed; top: 75px; left: 0; right: 0; background: rgba(15,10,5,0.98); padding: 20px 40px 30px; border-bottom: 1px solid rgba(212,175,55,0.2); z-index: 999; flex-direction: column; gap: 16px; }
        .mobile-menu.open { display: flex; }
        .mobile-btn-group { display: flex; gap: 10px; flex-wrap: wrap; }
        @media (max-width: 768px) { .nav-links { display: none; } .hamburger { display: flex; } .navbar { padding: 0 20px; } }
      `}</style>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => navigate("home")}>
          Chandra Residency
          <span>Chittoor • Est. 2000</span>
        </div>
        <div className="nav-links">
          {links.map(l => (
            <button key={l.page} className={`nav-link ${currentPage === l.page ? "active" : ""}`} onClick={() => navigate(l.page)}>
              {l.label}
            </button>
          ))}
          <div className="btn-group">
            <button className="staff-btn employee" onClick={() => navigate("staff-login")}>👷 Staff Login</button>
            <button className="staff-btn admin" onClick={() => navigate("admin-login")}>👑 Admin Login</button>
          </div>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map(l => (
          <button key={l.page} className="nav-link" onClick={() => { navigate(l.page); setMenuOpen(false); }}>{l.label}</button>
        ))}
        <div className="mobile-btn-group">
          <button className="staff-btn employee" onClick={() => { navigate("staff-login"); setMenuOpen(false); }}>👷 Staff Login</button>
          <button className="staff-btn admin" onClick={() => { navigate("admin-login"); setMenuOpen(false); }}>👑 Admin Login</button>
        </div>
      </div>
    </>
  );
}