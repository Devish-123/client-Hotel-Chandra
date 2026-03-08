import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const links = [
    { label: "Home", path: "/" },
    { label: "Rooms", path: "/rooms" },
    { label: "Reservation", path: "/reservation" },
    { label: "About", path: "/about" },
  ];

  const isActive = (path) => location.pathname === path;
  const go = (path) => { navigate(path); setMenuOpen(false); };

  return (
    <>
      <style>{`
        .nb {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          height: var(--navbar-height);
          background: ${scrolled ? "rgba(28,14,8,0.98)" : "rgba(28,14,8,0.92)"};
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(201,168,76,${scrolled ? "0.3" : "0.15"});
          padding: 0 48px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.3s;
        }
        .nb-logo {
          font-family: var(--font-display); font-size: 20px; font-weight: 600;
          color: var(--gold); cursor: pointer; background: none; border: none;
          display: flex; flex-direction: column; line-height: 1.15; text-align: left;
        }
        .nb-logo span {
          font-family: var(--font-body); font-size: 9px; font-weight: 400;
          letter-spacing: 5px; text-transform: uppercase; color: var(--muted-text);
        }
        .nb-links { display: flex; align-items: center; gap: 32px; }
        .nb-link {
          font-family: var(--font-body); font-size: 11px; font-weight: 500;
          letter-spacing: 2.5px; text-transform: uppercase; color: var(--cream-text);
          background: none; border: none; cursor: pointer; padding: 4px 0;
          position: relative; transition: color 0.3s;
        }
        .nb-link::after {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1px; background: var(--gold); transition: width 0.3s;
        }
        .nb-link:hover, .nb-link.on { color: var(--gold); }
        .nb-link:hover::after, .nb-link.on::after { width: 100%; }
        .nb-btns { display: flex; gap: 10px; }
        .nb-btn {
          font-family: var(--font-body); font-size: 10px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 9px 16px; cursor: pointer; transition: all 0.3s; border: none;
        }
        .nb-btn.staff {
          background: transparent; color: var(--gold);
          border: 1px solid rgba(201,168,76,0.35);
        }
        .nb-btn.staff:hover { background: rgba(201,168,76,0.08); border-color: var(--gold); }
        .nb-btn.admin { background: var(--gold); color: var(--dark-wood); }
        .nb-btn.admin:hover { background: var(--gold-light); box-shadow: 0 4px 16px rgba(201,168,76,0.3); }
        .nb-ham {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; background: none; border: none; padding: 6px; z-index: 10;
        }
        .nb-ham span {
          display: block; width: 22px; height: 2px; background: var(--gold);
          transition: all 0.3s; transform-origin: center;
        }
        .nb-ham.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nb-ham.open span:nth-child(2) { opacity: 0; }
        .nb-ham.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mob-menu {
          position: fixed; top: var(--navbar-height); left: 0; right: 0; bottom: 0;
          background: rgba(20,10,5,0.98); backdrop-filter: blur(20px);
          z-index: 999; display: flex; flex-direction: column;
          padding: 40px 28px; gap: 8px;
          transform: translateX(100%); transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .mob-menu.open { transform: translateX(0); }
        .mob-link {
          font-family: var(--font-display); font-size: 28px; font-weight: 400;
          color: var(--cream-text); background: none; border: none;
          cursor: pointer; padding: 12px 0; text-align: left;
          border-bottom: 1px solid rgba(201,168,76,0.08);
          transition: color 0.2s;
        }
        .mob-link:hover, .mob-link.on { color: var(--gold); }
        .mob-btns { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
        .mob-btn {
          font-family: var(--font-body); font-size: 12px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase; padding: 15px;
          cursor: pointer; transition: all 0.3s; border: none; text-align: center;
        }
        .mob-btn.staff { background: transparent; color: var(--gold); border: 1px solid rgba(201,168,76,0.4); }
        .mob-btn.admin { background: var(--gold); color: var(--dark-wood); }
        @media (max-width: 900px) {
          .nb { padding: 0 20px; }
          .nb-links { display: none; }
          .nb-ham { display: flex; }
        }
      `}</style>

      <nav className="nb">
        <button className="nb-logo" onClick={() => go("/")}>
          Chandra Residency
          <span>Chittoor · Est. 2000</span>
        </button>

        <div className="nb-links">
          {links.map(l => (
            <button key={l.path} className={`nb-link ${isActive(l.path) ? "on" : ""}`} onClick={() => go(l.path)}>
              {l.label}
            </button>
          ))}
          <div className="nb-btns">
            <button className="nb-btn staff" onClick={() => go("/staff-login")}>👷 Staff</button>
            <button className="nb-btn admin" onClick={() => go("/admin-login")}>👑 Admin</button>
          </div>
        </div>

        <button className={`nb-ham ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mob-menu ${menuOpen ? "open" : ""}`}>
        {links.map(l => (
          <button key={l.path} className={`mob-link ${isActive(l.path) ? "on" : ""}`} onClick={() => go(l.path)}>
            {l.label}
          </button>
        ))}
        <div className="mob-btns">
          <button className="mob-btn staff" onClick={() => go("/staff-login")}>👷 Staff Login</button>
          <button className="mob-btn admin" onClick={() => go("/admin-login")}>👑 Admin Login</button>
        </div>
      </div>
    </>
  );
}
