import { useState, useEffect } from "react";

const API = "https://chandra-residency-backend.onrender.com";

export default function AdminDashboard({ user, onLogout }) {
  const [tab, setTab] = useState("overview");
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [revenue, setRevenue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [revStart, setRevStart] = useState("");
  const [revEnd, setRevEnd] = useState("");
  const [newRoom, setNewRoom] = useState({ roomNumber: "", type: "", price: "" });
  const [newStaff, setNewStaff] = useState({ username: "", password: "" });
  const [staffMsg, setStaffMsg] = useState({ text: "", type: "" });
  const [staffList, setStaffList] = useState([]);
  const [msg, setMsg] = useState("");

  const token = user.token?.trim().replace(/^"|"$/g, "");
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/bookings?size=50`, { headers });
      const d = await res.json();
      setBookings(d.content || []);
    } catch { } finally { setLoading(false); }
  };

  const fetchRooms = async () => {
    try {
      const res = await fetch(`${API}/rooms`, { headers });
      const rData = await res.json();
      setRooms(Array.isArray(rData) ? rData : (rData.content || []));
    } catch { }
  };

  const fetchRevenue = async () => {
    if (!revStart || !revEnd) return;
    try {
      const res = await fetch(`${API}/bookings/revenue?start=${revStart}&end=${revEnd}`, { headers });
      setRevenue(await res.json());
    } catch { }
  };

  const createRoom = async () => {
    try {
      const res = await fetch(`${API}/rooms`, { method: "POST", headers, body: JSON.stringify({ ...newRoom, price: parseFloat(newRoom.price) }) });
      if (res.ok) { setMsg("Room created!"); setNewRoom({ roomNumber: "", type: "", price: "" }); fetchRooms(); }
    } catch { }
  };


  const createStaff = async () => {
    if (!newStaff.username || !newStaff.password) {
      setStaffMsg({ text: "Please fill all fields", type: "error" }); return;
    }
    if (newStaff.password.length < 6) {
      setStaffMsg({ text: "Password must be at least 6 characters", type: "error" }); return;
    }
    try {
      const res = await fetch(`${API}/auth/register?username=${encodeURIComponent(newStaff.username)}&password=${encodeURIComponent(newStaff.password)}&role=EMPLOYEE`, {
        method: "POST", headers
      });
      if (res.ok) {
        setStaffMsg({ text: `Staff account "${newStaff.username}" created successfully!`, type: "success" });
        setNewStaff({ username: "", password: "" });
      } else {
        const d = await res.json();
        setStaffMsg({ text: d.error || d.message || "Failed to create staff", type: "error" });
      }
    } catch { setStaffMsg({ text: "Something went wrong", type: "error" }); }
  };

  useEffect(() => { fetchBookings(); fetchRooms(); }, []);

  const totalRevenue = bookings.reduce((s, b) => s + (b.totalAmount || 0), 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        .dash { display: flex; min-height: 100vh; background: #0a0805; color: #e8d5b7; }
        .sidebar { width: 260px; background: #0f0a05; border-right: 1px solid rgba(212,175,55,0.15); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; }
        .sidebar-brand { padding: 32px 24px; border-bottom: 1px solid rgba(212,175,55,0.1); }
        .sidebar-logo { font-family: 'Cormorant Garamond', serif; font-size: 20px; color: #D4AF37; }
        .sidebar-role { font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #6a5a3a; margin-top: 4px; }
        .sidebar-nav { flex: 1; padding: 24px 16px; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; font-family: 'Montserrat', sans-serif; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: #6a5a3a; cursor: pointer; border-radius: 2px; transition: all 0.2s; margin-bottom: 4px; background: none; border: none; width: 100%; text-align: left; }
        .nav-item:hover { color: #D4AF37; background: rgba(212,175,55,0.05); }
        .nav-item.active { color: #D4AF37; background: rgba(212,175,55,0.08); border-left: 2px solid #D4AF37; }
        .sidebar-footer { padding: 16px; border-top: 1px solid rgba(212,175,55,0.1); }
        .logout-btn { width: 100%; background: transparent; border: 1px solid rgba(212,175,55,0.2); color: #6a5a3a; font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; padding: 12px; cursor: pointer; transition: all 0.3s; }
        .logout-btn:hover { border-color: #D4AF37; color: #D4AF37; }
        .main { margin-left: 260px; flex: 1; padding: 40px; min-height: 100vh; }
        .page-title { font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 300; color: #f0e6d0; margin-bottom: 8px; }
        .page-title em { font-style: italic; color: #D4AF37; }
        .page-sub { font-family: 'Montserrat', sans-serif; font-size: 12px; color: #6a5a3a; margin-bottom: 40px; }
        .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px; }
        .stat-card { background: #0f0a05; border: 1px solid rgba(212,175,55,0.1); padding: 28px; }
        .stat-label { font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #6a5a3a; margin-bottom: 12px; }
        .stat-val { font-family: 'Cormorant Garamond', serif; font-size: 36px; color: #D4AF37; }
        .stat-val.white { color: #f0e6d0; }
        .card { background: #0f0a05; border: 1px solid rgba(212,175,55,0.1); padding: 32px; margin-bottom: 24px; }
        .card-title { font-family: 'Cormorant Garamond', serif; font-size: 24px; color: #f0e6d0; margin-bottom: 24px; }
        .table { width: 100%; border-collapse: collapse; }
        .table th { font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #D4AF37; padding: 12px 16px; text-align: left; border-bottom: 1px solid rgba(212,175,55,0.15); }
        .table td { font-family: 'Montserrat', sans-serif; font-size: 12px; color: #8a7a5a; padding: 14px 16px; border-bottom: 1px solid rgba(212,175,55,0.06); }
        .table tr:hover td { background: rgba(212,175,55,0.03); }
        .badge { display: inline-block; font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 1px; padding: 3px 10px; }
        .badge-available { background: rgba(50,180,100,0.1); color: #50b464; border: 1px solid rgba(50,180,100,0.2); }
        .badge-booked { background: rgba(212,175,55,0.1); color: #D4AF37; border: 1px solid rgba(212,175,55,0.2); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 16px; align-items: end; margin-bottom: 16px; }
        .inp-group label { font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #D4AF37; display: block; margin-bottom: 8px; }
        .inp { background: #1a1005; border: 1px solid rgba(212,175,55,0.2); color: #f0e6d0; font-family: 'Montserrat', sans-serif; font-size: 13px; padding: 11px 14px; outline: none; width: 100%; }
        .inp:focus { border-color: rgba(212,175,55,0.5); }
        .btn-gold { background: #D4AF37; color: #0f0a05; border: none; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 12px 24px; cursor: pointer; transition: all 0.3s; white-space: nowrap; }
        .btn-gold:hover { background: #f0c93a; }
        .rev-display { background: rgba(212,175,55,0.06); border: 1px solid rgba(212,175,55,0.2); padding: 24px; margin-top: 16px; text-align: center; }
        .rev-amount { font-family: 'Cormorant Garamond', serif; font-size: 48px; color: #D4AF37; }
        .rev-label { font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #6a5a3a; margin-top: 8px; }
        .success-msg { background: rgba(50,180,100,0.1); border: 1px solid rgba(50,180,100,0.2); color: #50b464; font-family: 'Montserrat', sans-serif; font-size: 12px; padding: 12px; margin-bottom: 16px; }
        @media (max-width: 1024px) {
          .sidebar { width: 200px; }
          .main { margin-left: 200px; }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .sidebar { display: none; }
          .main { margin-left: 0; padding: 20px; }
          .stats-row { grid-template-columns: 1fr 1fr; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="dash">
        <div className="sidebar">
          <div className="sidebar-brand">
            <div className="sidebar-logo">Chandra Residency</div>
            <div className="sidebar-role">👑 Admin Panel</div>
          </div>
          <nav className="sidebar-nav">
            {[["📊", "overview", "Overview"], ["📅", "bookings", "Bookings"], ["🛏️", "rooms", "Rooms"], ["💰", "revenue", "Revenue"], ["👥", "staff", "Manage Staff"]].map(([icon, id, label]) => (
              <button key={id} className={`nav-item ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>{icon} {label}</button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={onLogout}>Sign Out</button>
          </div>
        </div>

        <main className="main">
          {tab === "overview" && (
            <>
              <h1 className="page-title">Good Morning, <em>Admin</em></h1>
              <p className="page-sub">Here's what's happening at Chandra Residency today</p>
              <div className="stats-row">
                <div className="stat-card"><div className="stat-label">Total Bookings</div><div className="stat-val">{bookings.length}</div></div>
                <div className="stat-card"><div className="stat-label">Total Rooms</div><div className="stat-val white">{rooms.length}</div></div>
                <div className="stat-card"><div className="stat-label">Available Rooms</div><div className="stat-val" style={{ color: "#50b464" }}>{rooms.filter(r => r.status === "AVAILABLE").length}</div></div>
                <div className="stat-card"><div className="stat-label">Total Revenue</div><div className="stat-val">₹{totalRevenue.toLocaleString()}</div></div>
              </div>
              <div className="card">
                <div className="card-title">Recent Bookings</div>
                <div style={{ overflowX: "auto" }}>
                  <table className="table">
                    <thead><tr><th>Guest</th><th>Room</th><th>Check-in</th><th>Check-out</th><th>Amount</th></tr></thead>
                    <tbody>
                      {bookings.slice(0, 5).map(b => (
                        <tr key={b.id}><td>{b.customerName}</td><td>{b.roomNumber} ({b.roomType})</td><td>{b.checkIn}</td><td>{b.checkOut}</td><td>₹{b.totalAmount?.toLocaleString()}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {tab === "bookings" && (
            <>
              <h1 className="page-title">All <em>Bookings</em></h1>
              <p className="page-sub">Complete list of all guest bookings</p>
              <div className="card">
                <div style={{ overflowX: "auto" }}>
                  <table className="table">
                    <thead><tr><th>#</th><th>Guest Name</th><th>Phone</th><th>Room</th><th>Type</th><th>Check-in</th><th>Check-out</th><th>Amount</th></tr></thead>
                    <tbody>
                      {bookings.map(b => (
                        <tr key={b.id}><td>{b.id}</td><td>{b.customerName}</td><td>{b.customerPhone}</td><td>{b.roomNumber}</td><td>{b.roomType}</td><td>{b.checkIn}</td><td>{b.checkOut}</td><td>₹{b.totalAmount?.toLocaleString()}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {tab === "rooms" && (
            <>
              <h1 className="page-title">Manage <em>Rooms</em></h1>
              <p className="page-sub">Add and view all hotel rooms</p>
              <div className="card">
                <div className="card-title">Add New Room</div>
                {msg && <div className="success-msg">✅ {msg}</div>}
                <div className="form-row">
                  <div className="inp-group"><label>Room Number</label><input className="inp" placeholder="e.g. 101" value={newRoom.roomNumber} onChange={e => setNewRoom({ ...newRoom, roomNumber: e.target.value })} /></div>
                  <div className="inp-group"><label>Type</label><input className="inp" placeholder="e.g. Deluxe" value={newRoom.type} onChange={e => setNewRoom({ ...newRoom, type: e.target.value })} /></div>
                  <div className="inp-group"><label>Price / Night (₹)</label><input className="inp" type="number" placeholder="e.g. 2500" value={newRoom.price} onChange={e => setNewRoom({ ...newRoom, price: e.target.value })} /></div>
                  <button className="btn-gold" onClick={createRoom}>Add Room</button>
                </div>
              </div>
              <div className="card">
                <div className="card-title">All Rooms</div>
                <div style={{ overflowX: "auto" }}>
                  <table className="table">
                    <thead><tr><th>#</th><th>Room Number</th><th>Type</th><th>Price/Night</th><th>Status</th></tr></thead>
                    <tbody>
                      {rooms.map(r => (
                        <tr key={r.id}><td>{r.id}</td><td>{r.roomNumber}</td><td>{r.type}</td><td>₹{r.price?.toLocaleString()}</td><td><span className={`badge ${r.status === "AVAILABLE" ? "badge-available" : "badge-booked"}`}>{r.status}</span></td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {tab === "revenue" && (
            <>
              <h1 className="page-title">Revenue <em>Report</em></h1>
              <p className="page-sub">Calculate revenue for any date range</p>
              <div className="card">
                <div className="card-title">Calculate Revenue</div>
                <div className="form-row">
                  <div className="inp-group"><label>Start Date</label><input className="inp" type="date" value={revStart} onChange={e => setRevStart(e.target.value)} /></div>
                  <div className="inp-group"><label>End Date</label><input className="inp" type="date" value={revEnd} onChange={e => setRevEnd(e.target.value)} /></div>
                  <div />
                  <button className="btn-gold" onClick={fetchRevenue}>Calculate</button>
                </div>
                {revenue !== null && (
                  <div className="rev-display">
                    <div className="rev-amount">₹{revenue.toLocaleString()}</div>
                    <div className="rev-label">Total Revenue · {revStart} to {revEnd}</div>
                  </div>
                )}
              </div>
              <div className="card">
                <div className="card-title">Revenue Summary</div>
                <div className="stats-row">
                  <div className="stat-card"><div className="stat-label">Total All-time</div><div className="stat-val">₹{totalRevenue.toLocaleString()}</div></div>
                  <div className="stat-card"><div className="stat-label">Total Bookings</div><div className="stat-val white">{bookings.length}</div></div>
                  <div className="stat-card"><div className="stat-label">Avg per Booking</div><div className="stat-val">₹{bookings.length ? Math.round(totalRevenue / bookings.length).toLocaleString() : 0}</div></div>
                </div>
              </div>
            </>
          )}

          {tab === "staff" && (
            <>
              <h1 className="page-title">Manage <em>Staff</em></h1>
              <p className="page-sub">Create login credentials for your hotel staff</p>
              <div className="card">
                <div className="card-title">Add New Staff Member</div>
                {staffMsg.text && (
                  <div style={{ background: staffMsg.type === "success" ? "rgba(50,180,100,0.1)" : "rgba(180,50,50,0.1)", border: `1px solid ${staffMsg.type === "success" ? "rgba(50,180,100,0.2)" : "rgba(180,50,50,0.3)"}`, color: staffMsg.type === "success" ? "#50b464" : "#e07070", fontFamily: "'Montserrat', sans-serif", fontSize: "12px", padding: "12px 16px", marginBottom: "20px" }}>
                    {staffMsg.text}
                  </div>
                )}
                <div className="form-row" style={{ gridTemplateColumns: "1fr 1fr auto" }}>
                  <div className="inp-group">
                    <label>Username</label>
                    <input className="inp" placeholder="e.g. ravi_frontdesk" value={newStaff.username} onChange={e => setNewStaff({ ...newStaff, username: e.target.value })} />
                  </div>
                  <div className="inp-group">
                    <label>Password</label>
                    <input className="inp" type="password" placeholder="Min 6 characters" value={newStaff.password} onChange={e => setNewStaff({ ...newStaff, password: e.target.value })} />
                  </div>
                  <button className="btn-gold" onClick={createStaff}>Create Staff</button>
                </div>
                <div style={{ marginTop: "16px", padding: "16px", background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.1)" }}>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", color: "#6a5a3a", lineHeight: "1.8" }}>
                    ℹ️ &nbsp; Staff accounts are created with <strong style={{ color: "#D4AF37" }}>EMPLOYEE</strong> role. They can log in via the <strong style={{ color: "#D4AF37" }}>Staff Login</strong> button on the website and will see the Employee Dashboard with booking management tools.
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-title">How Staff Login Works</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                  {[
                    ["1️⃣", "Admin creates staff account", "You set the username and password here"],
                    ["2️⃣", "Staff visits the website", "They click the 👷 Staff Login button on the navbar"],
                    ["3️⃣", "Staff logs in & works", "They see bookings, create new bookings, view rooms"],
                  ].map(([num, title, desc]) => (
                    <div key={title} style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.1)", padding: "24px" }}>
                      <div style={{ fontSize: "24px", marginBottom: "12px" }}>{num}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#D4AF37", marginBottom: "8px" }}>{title}</div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: "#6a5a3a", lineHeight: "1.6" }}>{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}