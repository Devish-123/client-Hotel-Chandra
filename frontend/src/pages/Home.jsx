import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const amenities = [
    { icon: "🏊", title: "Swimming Pool", desc: "Pristine outdoor pool" },
    { icon: "🍽️", title: "Restaurant", desc: "Authentic Andhra cuisine" },
    { icon: "📶", title: "Free WiFi", desc: "High-speed throughout" },
    { icon: "🅿️", title: "Free Parking", desc: "Secure parking" },
    { icon: "👨‍👩‍👧", title: "Family Friendly", desc: "For all ages" },
    { icon: "🌿", title: "Garden View", desc: "Scenic surroundings" },
    { icon: "❄️", title: "AC Rooms", desc: "Climate-controlled" },
    { icon: "🛎️", title: "24/7 Service", desc: "Always available" },
  ];

  const rooms = [
    { type: "Standard Room", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80" },
    { type: "Deluxe Room", img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80" },
    { type: "Royal Suite", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80" },
  ];

  return (
    <div className="page-enter">
      <style>{`
        /* HERO VIDEO */
        .hero-video {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; z-index: 0;
          transition: opacity 0.8s ease;
        }
        .hero-video-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(
            160deg,
            rgba(20,8,4,0.75) 0%,
            rgba(20,8,4,0.55) 40%,
            rgba(27,58,107,0.35) 100%
          );
        }
        /* HERO */
        .hero {
          min-height: 100vh; position: relative;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(160deg, #1A0E08 0%, #2C1810 40%, #1B3A6B22 100%);
          overflow: hidden; padding: 0 24px;
        }
        .hero-ornament { z-index: 2;
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            radial-gradient(ellipse at 20% 80%, rgba(123,45,62,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(27,58,107,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 60%);
        }
        .hero-pattern { position: absolute; inset: 0; opacity: 0.03;
          background-image: repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%),
            repeating-linear-gradient(-45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%);
          background-size: 24px 24px;
        }
        .hero-content { text-align: center; position: relative; z-index: 3; max-width: 860px; animation: fadeUp 0.9s ease forwards; }
        @keyframes fadeUp { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }
        .hero-crown { font-size: 36px; margin-bottom: 16px; animation: fadeUp 0.7s ease forwards; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 12px;
          font-family: var(--font-body); font-size: 10px; font-weight: 600;
          letter-spacing: 5px; text-transform: uppercase; color: var(--gold);
          margin-bottom: 28px;
        }
        .hero-badge::before, .hero-badge::after { content: ''; width: 30px; height: 1px; background: var(--gold); }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(48px, 10vw, 100px);
          font-weight: 500; color: var(--ivory); line-height: 1;
          margin-bottom: 16px;
        }
        .hero-title em { font-style: italic; color: var(--gold); display: block; }
        .hero-sub {
          font-family: var(--font-display); font-style: italic;
          font-size: clamp(16px, 2.5vw, 22px);
          color: var(--cream-text); margin-bottom: 12px;
        }
        .hero-loc {
          font-family: var(--font-body); font-size: 11px;
          letter-spacing: 4px; text-transform: uppercase;
          color: var(--muted-text); margin-bottom: 48px;
        }
        .hero-loc span { color: var(--gold); }
        .hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .hero-scroll { z-index: 3;
          position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
          font-family: var(--font-body); font-size: 9px; letter-spacing: 4px;
          text-transform: uppercase; color: var(--muted-text);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          animation: bobble 2.5s ease-in-out infinite;
        }
        @keyframes bobble { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        .hero-scroll::after { content:"↓"; color: var(--gold); font-size: 14px; }

        /* STATS BAR */
        .stats-bar {
          background: var(--deep-red);
          background: linear-gradient(90deg, var(--deep-red) 0%, #9B3D52 50%, var(--deep-red) 100%);
          padding: 32px 40px;
          display: flex; justify-content: center; gap: 80px; flex-wrap: wrap;
          border-top: 1px solid rgba(201,168,76,0.2);
          border-bottom: 1px solid rgba(201,168,76,0.2);
        }
        .stat-item { text-align: center; }

        /* ABOUT SECTION */
        .about-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: center;
        }
        .about-img-wrap { position: relative; }
        .about-img { width: 100%; height: 480px; object-fit: cover; display: block; }
        .about-badge {
          position: absolute; bottom: -20px; right: -20px;
          background: var(--gold); padding: 24px 32px; text-align: center;
        }
        .about-badge-num { font-family: var(--font-display); font-size: 40px; color: var(--dark-wood); line-height: 1; }
        .about-badge-txt { font-family: var(--font-body); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--dark-wood-light); margin-top: 4px; }
        .about-text { font-family: var(--font-body); font-size: 14px; line-height: 1.9; color: var(--muted-text); margin-bottom: 16px; }

        /* AMENITIES */
        .amen-bg { background: var(--dark-wood-mid); }
        .amen-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: rgba(201,168,76,0.1); margin-top: 50px;
        }
        .amen-card {
          background: var(--dark-wood-mid); padding: 32px 24px;
          transition: background 0.3s;
        }
        .amen-card:hover { background: var(--dark-wood-light); }
        .amen-icon { font-size: 28px; margin-bottom: 14px; }
        .amen-title { font-family: var(--font-display); font-size: 18px; color: var(--gold); margin-bottom: 6px; }
        .amen-desc { font-family: var(--font-body); font-size: 12px; color: var(--muted-text); }

        /* ROOMS PREVIEW */
        .rooms-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 50px; }
        .room-card { position: relative; overflow: hidden; cursor: pointer; }
        .room-card:hover .room-img { transform: scale(1.06); }
        .room-img { width: 100%; height: 240px; object-fit: cover; transition: transform 0.6s; display: block; }
        .room-overlay {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: linear-gradient(transparent, rgba(20,8,4,0.95));
          padding: 40px 24px 24px;
        }
        .room-type { font-family: var(--font-display); font-size: 22px; color: var(--ivory); margin-bottom: 4px; }
        .room-price { font-family: var(--font-body); font-size: 12px; color: var(--gold); letter-spacing: 1px; }
        .room-book {
          position: absolute; top: 16px; right: 16px;
          font-family: var(--font-body); font-size: 10px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          background: rgba(201,168,76,0.9); color: var(--dark-wood);
          border: none; padding: 8px 14px; cursor: pointer;
          opacity: 0; transition: opacity 0.3s;
        }
        .room-card:hover .room-book { opacity: 1; }

        /* CTA */
        .cta-section {
          background: linear-gradient(135deg, var(--royal-blue) 0%, var(--dark-wood) 60%);
          padding: 100px 40px; text-align: center;
          position: relative; overflow: hidden;
        }
        .cta-section::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%);
        }
        .cta-phone { font-family: var(--font-display); font-size: clamp(28px, 5vw, 48px); color: var(--gold); margin: 20px 0 36px; position: relative; }

        /* FOOTER */
        .footer-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 60px; padding-bottom: 40px; border-bottom: 1px solid rgba(201,168,76,0.1); }
        .footer-brand { font-family: var(--font-display); font-size: 24px; color: var(--gold); margin-bottom: 16px; }
        .footer-text { font-family: var(--font-body); font-size: 13px; color: var(--muted-text); line-height: 1.8; }
        .footer-heading { font-family: var(--font-body); font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; }
        .footer-item { font-family: var(--font-body); font-size: 13px; color: var(--muted-text); line-height: 2.2; }
        .footer-bottom { max-width: 1200px; margin: 24px auto 0; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .footer-copy { font-family: var(--font-body); font-size: 11px; color: #4A3A2A; }

        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .about-badge { right: 0; }
          .amen-grid { grid-template-columns: repeat(2,1fr); }
          .rooms-grid { grid-template-columns: 1fr; }
          .stats-bar { gap: 32px; padding: 24px 20px; }
          .footer-grid { grid-template-columns: 1fr; gap: 32px; }
          .cta-section { padding: 70px 20px; }
        }
        @media (max-width: 480px) {
          .amen-grid { grid-template-columns: 1fr 1fr; }
          .hero-btns { flex-direction: column; align-items: center; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        {/* 🎬 REPLACE src WITH YOUR REAL VIDEO URL */}
        <video
          className="hero-video"
          autoPlay muted playsInline
          poster="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1400&q=80"
          ref={el => {
            if (!el) return;
            el.onended = null;
            el.ontimeupdate = () => {
              const remaining = el.duration - el.currentTime;
              if (remaining <= 1.5) {
                el.style.opacity = Math.max(0, remaining / 1.5);
              } else {
                el.style.opacity = 1;
              }
              if (remaining <= 0.05) {
                el.style.opacity = 0;
                setTimeout(() => {
                  el.currentTime = 0;
                  el.play();
                  el.style.transition = "opacity 0.8s ease";
                  el.style.opacity = 1;
                }, 50);
              }
            };
          }}
        >
          <source src="https://res.cloudinary.com/dafd3ierm/video/upload/emergency_asnfqi.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
        <div className="hero-ornament" />
        <div className="hero-content">
          <div className="hero-crown">👑</div>
          <div className="hero-badge">Welcome to Royal Hospitality</div>
          <h1 className="hero-title">
            Chandra
            <em>Residency</em>
          </h1>
          <p className="hero-sub">Where Every Stay Becomes a Royal Memory</p>
          <p className="hero-loc">Thotapalyam · <span>Chittoor</span> · Andhra Pradesh</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navigate("/reservation")}>Make a Reservation</button>
            <button className="btn-outline" onClick={() => navigate("/rooms")}>Explore Rooms</button>
          </div>
        </div>
        <div className="hero-scroll">Scroll</div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        {[["3.6★","Google Rating"],["20+","Years of Excellence"],["50+","Rooms Available"],["1000+","Happy Guests"]].map(([n,l]) => (
          <div className="stat-item" key={l}>
            <div className="stat-num">{n}</div>
            <div className="stat-lbl">{l}</div>
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <div style={{ background: "var(--dark-wood)" }}>
        <div className="section">
          <div className="about-grid">
            <div className="about-img-wrap">
              <img className="about-img" src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700&q=80" alt="Chandra Residency" />
              <div className="about-badge">
                <div className="about-badge-num">20+</div>
                <div className="about-badge-txt">Years of Service</div>
              </div>
            </div>
            <div>
              <p className="tag">Our Heritage</p>
              <h2 className="heading-lg">A Legacy of<br /><span className="gold-italic">Royal Hospitality</span></h2>
              <div className="divider"><div className="divider-diamond" /></div>
              <p className="about-text">Chandra Residency has been a cornerstone of hospitality in Chittoor for over 20 years. Located in Thotapalyam, we have welcomed thousands of guests with warmth and royal comfort.</p>
              <p className="about-text">Whether you're here for business, pilgrimage to Tirupati, or leisure — experience the grandeur of a Nizam-inspired stay in the heart of Andhra Pradesh.</p>
              <br />
              <button className="btn-outline" onClick={() => navigate("/about")}>Our Story</button>
            </div>
          </div>
        </div>
      </div>

      {/* AMENITIES */}
      <div className="amen-bg">
        <div className="section">
          <p className="tag" style={{textAlign:"center"}}>Facilities</p>
          <h2 className="heading-lg" style={{textAlign:"center"}}>World-Class <span className="gold-italic">Amenities</span></h2>
          <div className="amen-grid">
            {amenities.map(a => (
              <div className="amen-card" key={a.title}>
                <div className="amen-icon">{a.icon}</div>
                <div className="amen-title">{a.title}</div>
                <div className="amen-desc">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROOMS */}
      <div style={{ background: "var(--dark-wood)" }}>
        <div className="section">
          <p className="tag">Accommodation</p>
          <h2 className="heading-lg">Our <span className="gold-italic">Rooms & Suites</span></h2>
          <div className="rooms-grid">
            {rooms.map(r => (
              <div className="room-card" key={r.type} onClick={() => navigate("/rooms")}>
                <img className="room-img" src={r.img} alt={r.type} />
                <div className="room-overlay">
                  <div className="room-type">{r.type}</div>
                  
                </div>
                <button className="room-book">Book Now</button>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:"40px" }}>
            <button className="btn-outline" onClick={() => navigate("/rooms")}>View All Rooms</button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <p className="tag" style={{position:"relative"}}>Make a Reservation</p>
        <h2 className="heading-lg" style={{position:"relative"}}>Ready for a <span className="gold-italic">Royal Stay?</span></h2>
        <div className="cta-phone">📞 094900 15875</div>
        <button className="btn-red" onClick={() => navigate("/reservation")} style={{position:"relative"}}>View Reservation Details</button>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Chandra Residency</div>
            <p className="footer-text">A premier hotel in the heart of Chittoor offering royal hospitality and comfort since 2000. Your home away from home in Andhra Pradesh.</p>
          </div>
          <div>
            <div className="footer-heading">Quick Links</div>
            {["Home","Rooms","Reservation","About"].map(l=><div className="footer-item" key={l}>{l}</div>)}
          </div>
          <div>
            <div className="footer-heading">Contact</div>
            <div className="footer-item">📍 Sundarayyar Street, Chittoor</div>
            <div className="footer-item">Andhra Pradesh 517001</div>
            <div className="footer-item">📞 094900 15875</div>
            <div className="footer-item">⏰ Check-in: 2:00 PM</div>
            <div className="footer-item">⏰ Check-out: 12:00 PM</div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2024 Chandra Residency. All rights reserved.</div>
          <div style={{fontFamily:"var(--font-body)",fontSize:"11px",color:"var(--gold)"}}>⭐ 3.6 on Google Reviews</div>
        </div>
      </footer>
    </div>
  );
}