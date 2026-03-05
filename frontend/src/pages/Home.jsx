export default function Home() {
  const amenities = [
    { icon: "🏊", title: "Swimming Pool", desc: "Relax in our pristine outdoor pool" },
    { icon: "🍽️", title: "Restaurant", desc: "Authentic Andhra cuisine & continental" },
    { icon: "📶", title: "Free WiFi", desc: "High-speed internet throughout" },
    { icon: "🅿️", title: "Free Parking", desc: "Secure parking for all guests" },
    { icon: "👨‍👩‍👧", title: "Family Friendly", desc: "Activities for guests of all ages" },
    { icon: "🌿", title: "Garden View", desc: "Lush gardens & scenic surroundings" },
    { icon: "❄️", title: "AC Rooms", desc: "Climate-controlled comfort" },
    { icon: "🛎️", title: "24/7 Service", desc: "Round-the-clock assistance" },
  ];

  const rooms = [
    { type: "Standard Room", price: "₹1,800", desc: "Comfortable & cozy stay", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80" },
    { type: "Deluxe Room", price: "₹2,500", desc: "Spacious with premium amenities", img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80" },
    { type: "Suite", price: "₹4,000", desc: "The ultimate luxury experience", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0f0a05; color: #e8d5b7; }

        /* HERO */
        .hero {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0a05 0%, #1a1005 50%, #0f0a05 100%);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden; padding: 100px 40px 60px;
        }
        .hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 60% 50%, rgba(212,175,55,0.08) 0%, transparent 60%);
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-content {
          text-align: center; position: relative; z-index: 2; max-width: 800px;
          animation: fadeUp 1s ease forwards;
        }
        @keyframes fadeUp { from { opacity:0; transform: translateY(30px); } to { opacity:1; transform: translateY(0); } }
        .hero-badge {
          display: inline-block; font-family: 'Montserrat', sans-serif;
          font-size: 11px; letter-spacing: 5px; text-transform: uppercase;
          color: #D4AF37; border: 1px solid rgba(212,175,55,0.4);
          padding: 8px 24px; margin-bottom: 32px;
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 10vw, 96px); font-weight: 300;
          color: #f0e6d0; line-height: 1.05; margin-bottom: 12px;
          letter-spacing: -1px;
        }
        .hero-title em { font-style: italic; color: #D4AF37; }
        .hero-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(18px, 3vw, 26px); font-weight: 300;
          color: #a08c5b; margin-bottom: 20px; letter-spacing: 1px;
        }
        .hero-location {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px; letter-spacing: 3px; color: #7a6a4a;
          text-transform: uppercase; margin-bottom: 48px;
        }
        .hero-location span { color: #D4AF37; }
        .hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .btn-primary {
          font-family: 'Montserrat', sans-serif; font-size: 12px;
          font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
          background: #D4AF37; color: #0f0a05; border: none;
          padding: 16px 40px; cursor: pointer; transition: all 0.3s;
        }
        .btn-primary:hover { background: #f0c93a; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(212,175,55,0.3); }
        .btn-outline {
          font-family: 'Montserrat', sans-serif; font-size: 12px;
          font-weight: 500; letter-spacing: 2px; text-transform: uppercase;
          background: transparent; color: #D4AF37;
          border: 1px solid rgba(212,175,55,0.5);
          padding: 16px 40px; cursor: pointer; transition: all 0.3s;
        }
        .btn-outline:hover { border-color: #D4AF37; background: rgba(212,175,55,0.05); }
        .hero-scroll {
          position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          font-family: 'Montserrat', sans-serif; font-size: 10px;
          letter-spacing: 3px; text-transform: uppercase; color: #7a6a4a;
          animation: bounce 2s infinite;
        }
        @keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
        .hero-scroll::after { content: '↓'; font-size: 16px; color: #D4AF37; }

        /* STATS */
        .stats { background: #D4AF37; padding: 40px; display: flex; justify-content: center; gap: 80px; flex-wrap: wrap; }
        .stat { text-align: center; }
        .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 600; color: #0f0a05; line-height: 1; }
        .stat-label { font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #3a2e10; margin-top: 4px; }

        /* SECTION */
        .section { padding: 100px 40px; max-width: 1200px; margin: 0 auto; }
        .section-tag { font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #D4AF37; margin-bottom: 16px; }
        .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 5vw, 56px); font-weight: 300; color: #f0e6d0; line-height: 1.1; margin-bottom: 20px; }
        .section-title em { font-style: italic; color: #D4AF37; }
        .section-desc { font-family: 'Montserrat', sans-serif; font-size: 14px; line-height: 1.8; color: #8a7a5a; max-width: 600px; }
        .divider { width: 60px; height: 1px; background: #D4AF37; margin: 24px 0; }

        /* AMENITIES */
        .amenities-bg { background: #0a0805; }
        .amenities-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1px; background: rgba(212,175,55,0.1); margin-top: 60px; }
        .amenity-card { background: #0f0a05; padding: 36px 28px; transition: background 0.3s; }
        .amenity-card:hover { background: #1a1005; }
        .amenity-icon { font-size: 32px; margin-bottom: 16px; }
        .amenity-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; color: #D4AF37; margin-bottom: 8px; }
        .amenity-desc { font-family: 'Montserrat', sans-serif; font-size: 12px; color: #6a5a3a; line-height: 1.6; }

        /* ROOMS */
        .rooms-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; margin-top: 60px; }
        .room-card { position: relative; overflow: hidden; cursor: pointer; }
        .room-card:hover .room-img { transform: scale(1.05); }
        .room-img { width: 100%; height: 260px; object-fit: cover; transition: transform 0.6s; display: block; }
        .room-info { background: #1a1005; padding: 28px; border: 1px solid rgba(212,175,55,0.1); border-top: none; }
        .room-type { font-family: 'Cormorant Garamond', serif; font-size: 24px; color: #f0e6d0; margin-bottom: 6px; }
        .room-desc { font-family: 'Montserrat', sans-serif; font-size: 12px; color: #6a5a3a; margin-bottom: 16px; }
        .room-footer { display: flex; align-items: center; justify-content: space-between; }
        .room-price { font-family: 'Cormorant Garamond', serif; font-size: 22px; color: #D4AF37; }
        .room-price span { font-family: 'Montserrat', sans-serif; font-size: 11px; color: #6a5a3a; }
        .room-btn { font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #D4AF37; background: none; border: 1px solid rgba(212,175,55,0.3); padding: 8px 16px; cursor: pointer; transition: all 0.3s; }
        .room-btn:hover { background: #D4AF37; color: #0f0a05; }

        /* CTA */
        .cta-section { background: linear-gradient(135deg, #1a1005, #0f0a05); padding: 100px 40px; text-align: center; border-top: 1px solid rgba(212,175,55,0.1); border-bottom: 1px solid rgba(212,175,55,0.1); }
        .cta-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 5vw, 64px); font-weight: 300; color: #f0e6d0; margin-bottom: 16px; }
        .cta-subtitle { font-family: 'Montserrat', sans-serif; font-size: 13px; color: #8a7a5a; letter-spacing: 2px; margin-bottom: 40px; }
        .cta-phone { font-family: 'Cormorant Garamond', serif; font-size: 36px; color: #D4AF37; margin-bottom: 32px; }

        /* FOOTER */
        .footer { background: #080503; padding: 60px 40px 30px; }
        .footer-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 60px; padding-bottom: 40px; border-bottom: 1px solid rgba(212,175,55,0.1); }
        .footer-brand { font-family: 'Cormorant Garamond', serif; font-size: 24px; color: #D4AF37; margin-bottom: 16px; }
        .footer-text { font-family: 'Montserrat', sans-serif; font-size: 12px; color: #5a4a2a; line-height: 1.8; }
        .footer-heading { font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #D4AF37; margin-bottom: 20px; }
        .footer-item { font-family: 'Montserrat', sans-serif; font-size: 12px; color: #5a4a2a; line-height: 2; }
        .footer-bottom { max-width: 1200px; margin: 0 auto; padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .footer-copy { font-family: 'Montserrat', sans-serif; font-size: 11px; color: #3a2e10; }
        .footer-rating { font-family: 'Montserrat', sans-serif; font-size: 11px; color: #D4AF37; }

        @media (max-width: 768px) {
          .stats { gap: 40px; }
          .section { padding: 70px 20px; }
          .footer-grid { grid-template-columns: 1fr; gap: 40px; }
          .footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">Welcome to Luxury</div>
          <h1 className="hero-title">Chandra<br /><em>Residency</em></h1>
          <p className="hero-subtitle">Where Every Stay Becomes a Memory</p>
          <p className="hero-location">Thotapalyam • <span>Chittoor</span> • Andhra Pradesh</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navigate("reservation")}>Make a Reservation</button>
            <button className="btn-outline" onClick={() => navigate("rooms")}>Explore Rooms</button>
          </div>
        </div>
        <div className="hero-scroll">Scroll</div>
      </section>

      {/* STATS */}
      <div className="stats">
        {[["3.6★", "Google Rating"], ["20+", "Years of Excellence"], ["50+", "Rooms Available"], ["1000+", "Happy Guests"]].map(([num, label]) => (
          <div className="stat" key={label}>
            <div className="stat-num">{num}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <div style={{ background: "#0f0a05" }}>
        <div className="section" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div>
            <p className="section-tag">About Us</p>
            <h2 className="section-title">A Legacy of<br /><em>Hospitality</em></h2>
            <div className="divider" />
            <p className="section-desc">
              Nestled in the heart of Chittoor, Chandra Residency has been a symbol of warm hospitality and refined comfort for over two decades. Located at Thotapalyam, we offer a serene escape with world-class amenities and the warmth of traditional Andhra hospitality.
            </p>
            <br />
            <p className="section-desc">
              Whether you're visiting for business or leisure, exploring the nearby Kaundinya Wildlife Sanctuary or the historic temples of Chittoor — we ensure your stay is nothing short of exceptional.
            </p>
            <br />
            <button className="btn-outline" onClick={() => navigate("about")} style={{ marginTop: "8px" }}>Learn More</button>
          </div>
          <div style={{ position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700&q=80" alt="Hotel" style={{ width: "100%", height: "500px", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: "-20px", left: "-20px", background: "#D4AF37", padding: "24px 32px" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", color: "#0f0a05", lineHeight: 1 }}>20+</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", letterSpacing: "2px", color: "#3a2e10", textTransform: "uppercase" }}>Years of Service</div>
            </div>
          </div>
        </div>
      </div>

      {/* AMENITIES */}
      <div className="amenities-bg">
        <div className="section">
          <p className="section-tag">Facilities</p>
          <h2 className="section-title">World-Class<br /><em>Amenities</em></h2>
          <div className="divider" />
          <p className="section-desc">Everything you need for a perfect stay, all under one roof.</p>
          <div className="amenities-grid">
            {amenities.map(a => (
              <div className="amenity-card" key={a.title}>
                <div className="amenity-icon">{a.icon}</div>
                <div className="amenity-title">{a.title}</div>
                <div className="amenity-desc">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROOMS PREVIEW */}
      <div style={{ background: "#0f0a05" }}>
        <div className="section">
          <p className="section-tag">Accommodation</p>
          <h2 className="section-title">Our <em>Rooms</em></h2>
          <div className="divider" />
          <p className="section-desc">Thoughtfully designed spaces for ultimate comfort and relaxation.</p>
          <div className="rooms-grid">
            {rooms.map(r => (
              <div className="room-card" key={r.type}>
                <img className="room-img" src={r.img} alt={r.type} />
                <div className="room-info">
                  <div className="room-type">{r.type}</div>
                  <div className="room-desc">{r.desc}</div>
                  <div className="room-footer">
                    <div className="room-price">{r.price} <span>/ night</span></div>
                    <button className="room-btn" onClick={() => navigate("reservation")}>Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <button className="btn-outline" onClick={() => navigate("rooms")}>View All Rooms</button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <p className="section-tag" style={{ textAlign: "center" }}>Make a Reservation</p>
        <h2 className="cta-title">Ready for an<br /><em>Unforgettable Stay?</em></h2>
        <p className="cta-subtitle">Call us directly to book your room</p>
        <div className="cta-phone">📞 094900 15875</div>
        <button className="btn-primary" onClick={() => navigate("reservation")}>View Reservation Details</button>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Chandra Residency</div>
            <p className="footer-text">A premier hotel in the heart of Chittoor, offering world-class hospitality and comfort since 2000. Your home away from home in Andhra Pradesh.</p>
          </div>
          <div>
            <div className="footer-heading">Quick Links</div>
            {["Home", "Rooms", "Reservation", "About"].map(l => (
              <div className="footer-item" key={l}>{l}</div>
            ))}
          </div>
          <div>
            <div className="footer-heading">Contact</div>
            <div className="footer-item">📍 Thotapalyam, Chittoor</div>
            <div className="footer-item">Andhra Pradesh 517001</div>
            <div className="footer-item">📞 094900 15875</div>
            <div className="footer-item">⏰ Check-in: 2:00 PM</div>
            <div className="footer-item">⏰ Check-out: 12:00 PM</div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2024 Chandra Residency. All rights reserved.</div>
          <div className="footer-rating">⭐ 3.6 on Google Reviews</div>
        </div>
      </footer>
    </>
  );
}