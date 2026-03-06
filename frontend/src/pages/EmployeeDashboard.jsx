import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const API = "https://chandra-residency-backend.onrender.com";

export default function EmployeeDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [form, setForm] = useState({ roomId: "", customerName: "", customerPhone: "", checkIn: "", checkOut: "", discount: "" });
  const [actionLoading, setActionLoading] = useState(null);
  const [dataReady, setDataReady] = useState(false);

  const token = user.token?.trim().replace(/^"|"$/g, "");
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  console.log("Auth header:", `Bearer ${token?.substring(0, 20)}...`);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bRes, rRes] = await Promise.all([
        fetch(`${API}/bookings?size=50`, { headers }),
        fetch(`${API}/rooms`, { headers }),
      ]);
      const bData = await bRes.json();
      setBookings(bData.content || []);
      const rData = await rRes.json();
      setRooms(Array.isArray(rData) ? rData : (rData.content || []));
    } catch { } finally { setLoading(false); }
  };

  const createBooking = async () => {
    if (!form.roomId || !form.customerName || !form.customerPhone || !form.checkIn || !form.checkOut) {
      setMsg({ text: "Please fill all fields", type: "error" }); return;
    }
    try {
      const res = await fetch(`${API}/bookings`, {
        method: "POST", headers,
        body: JSON.stringify({ roomId: parseInt(form.roomId), customerName: form.customerName, customerPhone: form.customerPhone, checkIn: form.checkIn, checkOut: form.checkOut, discount: form.discount ? parseFloat(form.discount) : 0 }),
      });
      if (res.ok) {
        setMsg({ text: "Booking created successfully!", type: "success" });
        setForm({ roomId: "", customerName: "", customerPhone: "", checkIn: "", checkOut: "", discount: "" });
        fetchData();
      } else {
        const d = await res.json();
        setMsg({ text: d.error || "Booking failed", type: "error" });
      }
    } catch { setMsg({ text: "Something went wrong", type: "error" }); }
  };

  const deleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    setActionLoading(`booking-${bookingId}`);
    try {
      const res = await fetch(`${API}/bookings/${bookingId}`, {
        method: "DELETE", headers,
      });
      if (res.ok) {
        setMsg({ text: "Booking deleted successfully!", type: "success" });
        await fetchData();
      } else {
        const d = await res.json();
        setMsg({ text: d.error || "Delete failed", type: "error" });
      }
    } catch { setMsg({ text: "Something went wrong", type: "error" }); }
    finally { setActionLoading(null); }
  };

  useEffect(() => { 
    const load = async () => {
      setLoading(true);
      await fetchData();
      setDataReady(true);
      setLoading(false);
    };
    load();
  }, []);

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
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; font-family: 'Montserrat', sans-serif; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: #6a5a3a; cursor: pointer; transition: all 0.2s; margin-bottom: 4px; background: none; border: none; width: 100%; text-align: left; }
        .nav-item:hover { color: #D4AF37; background: rgba(212,175,55,0.05); }
        .nav-item.active { color: #D4AF37; background: rgba(212,175,55,0.08); border-left: 2px solid #D4AF37; }
        .sidebar-footer { padding: 16px; border-top: 1px solid rgba(212,175,55,0.1); }
        .logout-btn { width: 100%; background: transparent; border: 1px solid rgba(212,175,55,0.2); color: #6a5a3a; font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; padding: 12px; cursor: pointer; transition: all 0.3s; }
        .logout-btn:hover { border-color: #D4AF37; color: #D4AF37; }
        .main { margin-left: 260px; flex: 1; padding: 40px; animation: fadeIn 0.3s ease-in; }
        @keyframes fadeIn { from { opacity: 0.9; } to { opacity: 1; } }
        .page-title { font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 300; color: #f0e6d0; margin-bottom: 8px; }
        .page-title em { font-style: italic; color: #D4AF37; }
        .page-sub { font-family: 'Montserrat', sans-serif; font-size: 12px; color: #6a5a3a; margin-bottom: 40px; }
        .card { background: #0f0a05; border: 1px solid rgba(212,175,55,0.1); padding: 32px; margin-bottom: 24px; transition: all 0.3s ease; }
        .card-title { font-family: 'Cormorant Garamond', serif; font-size: 24px; color: #f0e6d0; margin-bottom: 24px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
        .inp-group label { font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #D4AF37; display: block; margin-bottom: 8px; }
        .inp { background: #1a1005; border: 1px solid rgba(212,175,55,0.2); color: #f0e6d0; font-family: 'Montserrat', sans-serif; font-size: 13px; padding: 12px 14px; outline: none; width: 100%; }
        .inp:focus { border-color: rgba(212,175,55,0.5); }
        select.inp option { background: #1a1005; }
        .btn-gold { background: #D4AF37; color: #0f0a05; border: none; font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 14px 32px; cursor: pointer; transition: all 0.3s; }
        .btn-gold:hover { background: #f0c93a; }
        .table { width: 100%; border-collapse: collapse; }\n        .table tbody { transition: opacity 0.3s ease; }\n        .table tr { transition: background-color 0.2s ease; }
        .table th { font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #D4AF37; padding: 12px 16px; text-align: left; border-bottom: 1px solid rgba(212,175,55,0.15); }
        .table td { font-family: 'Montserrat', sans-serif; font-size: 12px; color: #8a7a5a; padding: 14px 16px; border-bottom: 1px solid rgba(212,175,55,0.06); }
        .msg-success { background: rgba(50,180,100,0.1); border: 1px solid rgba(50,180,100,0.2); color: #50b464; font-family: 'Montserrat', sans-serif; font-size: 12px; padding: 12px 16px; margin-bottom: 20px; }
        .msg-error { background: rgba(180,50,50,0.1); border: 1px solid rgba(180,50,50,0.3); color: #e07070; font-family: 'Montserrat', sans-serif; font-size: 12px; padding: 12px 16px; margin-bottom: 20px; }
        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 32px; }
        .stat-card { background: #0f0a05; border: 1px solid rgba(212,175,55,0.1); padding: 24px; }
        .stat-label { font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #6a5a3a; margin-bottom: 10px; }
        .stat-val { font-family: 'Cormorant Garamond', serif; font-size: 36px; color: #D4AF37; }
        .btn-delete { background: #d32f2f; color: white; border: none; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; padding: 6px 12px; cursor: pointer; transition: all 0.3s; border-radius: 2px; }
        .btn-delete:hover { background: #e53935; }
        .btn-delete:disabled, .btn-gold:disabled { opacity: 0.6; cursor: not-allowed; }
        @media (max-width: 768px) {
          .sidebar { display: none; }
          .main { margin-left: 0; padding: 20px; }
          .form-grid { grid-template-columns: 1fr; }
          .stats-row { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="dash">
        <div className="sidebar">
          <div className="sidebar-brand">
            <div className="sidebar-logo">Chandra Residency</div>
            <div className="sidebar-role">👷 Employee Panel</div>
          </div>
          <nav className="sidebar-nav">
            {[["📅", "bookings", "Bookings"], ["➕", "new-booking", "New Booking"], ["🛏️", "rooms", "View Rooms"]].map(([icon, id, label]) => (
              <button key={id} className={`nav-item ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>{icon} {label}</button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={() => { onLogout(); navigate("/"); }}>Sign Out</button>
          </div>
        </div>

        <main className="main">
          {loading && !dataReady && (
            <div style={{ textAlign: "center", padding: "60px 40px", color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>⏳</div>
              <div>Loading dashboard...</div>
            </div>
          )}
          {dataReady && (
          <>
          {tab === "bookings" && (
            <>
              <h1 className="page-title">All <em>Bookings</em></h1>
              <p className="page-sub">View all current and past bookings</p>
              <div className="stats-row">
                <div className="stat-card"><div className="stat-label">Total Bookings</div><div className="stat-val">{bookings.length}</div></div>
                <div className="stat-card"><div className="stat-label">Available Rooms</div><div className="stat-val" style={{ color: "#50b464" }}>{rooms.filter(r => r.status === "AVAILABLE").length}</div></div>
                <div className="stat-card"><div className="stat-label">Total Rooms</div><div className="stat-val" style={{ color: "#f0e6d0" }}>{rooms.length}</div></div>
              </div>
              <div className="card">
                <div style={{ overflowX: "auto" }}>
                  <table className="table">
                    <thead><tr><th>#</th><th>Guest Name</th><th>Phone</th><th>Room</th><th>Check-in</th><th>Check-out</th><th>Amount</th><th>Action</th></tr></thead>
                    <tbody>
                      {bookings.map(b => (
                        <tr key={b.id}><td>{b.id}</td><td>{b.customerName}</td><td>{b.customerPhone}</td><td>{b.roomNumber} ({b.roomType})</td><td>{b.checkIn}</td><td>{b.checkOut}</td><td>₹{b.totalAmount?.toLocaleString()}</td><td><button className="btn-delete" disabled={actionLoading === `booking-${b.id}`} onClick={() => deleteBooking(b.id)}>{actionLoading === `booking-${b.id}` ? "⏳" : "🗑️"}</button></td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {tab === "new-booking" && (
            <>
              <h1 className="page-title">New <em>Booking</em></h1>
              <p className="page-sub">Create a new guest booking</p>
              <div className="card">
                <div className="card-title">Booking Details</div>
                {msg.text && <div className={msg.type === "success" ? "msg-success" : "msg-error"}>{msg.text}</div>}
                <div className="form-grid">
                  <div className="inp-group">
                    <label>Select Room</label>
                    <select className="inp" value={form.roomId} onChange={e => setForm({ ...form, roomId: e.target.value })}>
                      <option value="">-- Select a room --</option>
                      {rooms.map(r => <option key={r.id} value={r.id}>Room {r.roomNumber} — {r.type} — ₹{r.price}/night</option>)}
                    </select>
                  </div>
                  <div className="inp-group">
                    <label>Guest Name</label>
                    <input className="inp" placeholder="Full name" value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })} />
                  </div>
                  <div className="inp-group">
                    <label>Phone Number</label>
                    <input className="inp" placeholder="10-digit mobile" value={form.customerPhone} onChange={e => setForm({ ...form, customerPhone: e.target.value })} />
                  </div>
                  <div className="inp-group">
                    <label>Check-in Date</label>
                    <input className="inp" type="date" value={form.checkIn} onChange={e => setForm({ ...form, checkIn: e.target.value })} />
                  </div>
                  <div className="inp-group">
                    <label>Check-out Date</label>
                    <input className="inp" type="date" value={form.checkOut} onChange={e => setForm({ ...form, checkOut: e.target.value })} />
                  </div>
                  <div className="inp-group">
                    <label>Discount Amount (₹)</label>
                    <input className="inp" type="number" placeholder="0" min="0" value={form.discount} onChange={e => setForm({ ...form, discount: e.target.value })} />
                  </div>
                </div>
                <button className="btn-gold" onClick={createBooking}>Create Booking →</button>
              </div>
            </>
          )}

          {tab === "rooms" && (
            <>
              <h1 className="page-title">Available <em>Rooms</em></h1>
              <p className="page-sub">Current room status and details</p>
              <div className="card">
                <div style={{ overflowX: "auto" }}>
                  <table className="table">
                    <thead><tr><th>#</th><th>Room Number</th><th>Type</th><th>Price/Night</th><th>Status</th></tr></thead>
                    <tbody>
                      {rooms.map(r => (
                        <tr key={r.id}>
                          <td>{r.id}</td><td>{r.roomNumber}</td><td>{r.type}</td><td>₹{r.price?.toLocaleString()}</td>
                          <td><span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", padding: "3px 10px", background: r.status === "AVAILABLE" ? "rgba(50,180,100,0.1)" : "rgba(212,175,55,0.1)", color: r.status === "AVAILABLE" ? "#50b464" : "#D4AF37", border: `1px solid ${r.status === "AVAILABLE" ? "rgba(50,180,100,0.2)" : "rgba(212,175,55,0.2)"}` }}>{r.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          </>
          )}
        </main>
      </div>
    </>
  );
}