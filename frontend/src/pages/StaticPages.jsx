export function Reservation() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .res-page { background: #0f0a05; min-height: 100vh; padding-top: 75px; }
        .res-hero { background: linear-gradient(135deg, #1a1005, #0f0a05); padding: 80px 40px; text-align: center; border-bottom: 1px solid rgba(212,175,55,0.1); }
        .res-tag { font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #D4AF37; margin-bottom: 16px; }
        .res-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(40px, 6vw, 72px); font-weight: 300; color: #f0e6d0; }
        .res-title em { font-style: italic; color: #D4AF37; }
        .res-body { max-width: 900px; margin: 0 auto; padding: 80px 40px; }
        .res-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
        .res-card { background: #1a1005; border: 1px solid rgba(212,175,55,0.15); padding: 48px; text-align: center; }
        .res-card-icon { font-size: 48px; margin-bottom: 20px; }
        .res-card-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: #D4AF37; margin-bottom: 12px; }
        .res-card-desc { font-family: 'Montserrat', sans-serif; font-size: 13px; color: #6a5a3a; line-height: 1.8; margin-bottom: 28px; }
        .res-card-num { font-family: 'Cormorant Garamond', serif; font-size: 32px; color: #f0e6d0; margin-bottom: 20px; }
        .res-btn { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; background: #D4AF37; color: #0f0a05; border: none; padding: 14px 32px; cursor: pointer; transition: all 0.3s; text-decoration: none; display: inline-block; }
        .res-btn:hover { background: #f0c93a; }
        .res-info { margin-top: 60px; background: #1a1005; border: 1px solid rgba(212,175,55,0.15); padding: 48px; }
        .res-info-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: #f0e6d0; margin-bottom: 24px; }
        .res-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .res-info-item { font-family: 'Montserrat', sans-serif; font-size: 13px; color: #8a7a5a; padding: 16px; background: rgba(212,175,55,0.04); border-left: 2px solid #D4AF37; }
        .res-info-item strong { color: #D4AF37; display: block; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
        @media (max-width: 768px) {
          .res-grid { grid-template-columns: 1fr; }
          .res-info-grid { grid-template-columns: 1fr; }
          .res-body { padding: 60px 20px; }
        }
      `}</style>
      <div className="res-page">
        <div className="res-hero">
          <p className="res-tag">Reservations</p>
          <h1 className="res-title">Book Your <em>Stay</em></h1>
        </div>
        <div className="res-body">
          <div className="res-grid">
            <div className="res-card">
              <div className="res-card-icon">📞</div>
              <div className="res-card-title">Call to Book</div>
              <div className="res-card-desc">Speak directly with our reception team for instant confirmation and personalized assistance.</div>
              <div className="res-card-num">094900 15875</div>
              <a href="tel:+919490015875" className="res-btn">Call Now</a>
            </div>
            <div className="res-card">
              <div className="res-card-icon">💬</div>
              <div className="res-card-title">WhatsApp Us</div>
              <div className="res-card-desc">Send us a message on WhatsApp for quick responses and easy booking confirmation.</div>
              <div className="res-card-num">094900 15875</div>
              <a href="https://wa.me/919490015875" target="_blank" rel="noreferrer" className="res-btn">WhatsApp</a>
            </div>
          </div>
          <div className="res-info">
            <div className="res-info-title">Reservation Information</div>
            <div className="res-info-grid">
              {[
                ["Check-in Time", "2:00 PM onwards"],
                ["Check-out Time", "12:00 PM noon"],
                ["Cancellation", "24 hours notice required"],
                ["Payment", "Cash, UPI, Card accepted"],
                ["ID Proof", "Aadhaar / Passport required"],
                ["Pet Policy", "Not allowed"],
                ["Smoking", "Non-smoking rooms available"],
                ["Extra Bed", "Available on request"],
              ].map(([k, v]) => (
                <div className="res-info-item" key={k}><strong>{k}</strong>{v}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function About() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .about-page { background: #0f0a05; min-height: 100vh; padding-top: 75px; color: #e8d5b7; }
        .about-hero { padding: 80px 40px; text-align: center; background: linear-gradient(135deg, #1a1005, #0f0a05); border-bottom: 1px solid rgba(212,175,55,0.1); }
        .about-tag { font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #D4AF37; margin-bottom: 16px; }
        .about-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(40px, 6vw, 72px); font-weight: 300; color: #f0e6d0; }
        .about-title em { font-style: italic; color: #D4AF37; }
        .about-body { max-width: 1100px; margin: 0 auto; padding: 80px 40px; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; margin-bottom: 80px; }
        .about-img { width: 100%; height: 450px; object-fit: cover; }
        .about-text-tag { font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #D4AF37; margin-bottom: 16px; }
        .about-text-title { font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 300; color: #f0e6d0; margin-bottom: 20px; line-height: 1.2; }
        .about-text-title em { font-style: italic; color: #D4AF37; }
        .about-divider { width: 50px; height: 1px; background: #D4AF37; margin-bottom: 24px; }
        .about-text { font-family: 'Montserrat', sans-serif; font-size: 13px; color: #8a7a5a; line-height: 1.9; margin-bottom: 16px; }
        .nearby-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1px; background: rgba(212,175,55,0.1); }
        .nearby-card { background: #0f0a05; padding: 32px 24px; text-align: center; }
        .nearby-icon { font-size: 28px; margin-bottom: 12px; }
        .nearby-name { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: #D4AF37; margin-bottom: 6px; }
        .nearby-dist { font-family: 'Montserrat', sans-serif; font-size: 11px; color: #6a5a3a; }
        .contact-strip { background: #1a1005; border: 1px solid rgba(212,175,55,0.15); padding: 48px; margin-top: 60px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; text-align: center; }
        .contact-item-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; color: #D4AF37; margin-bottom: 10px; }
        .contact-item-text { font-family: 'Montserrat', sans-serif; font-size: 12px; color: #6a5a3a; line-height: 1.8; }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .contact-strip { grid-template-columns: 1fr; }
          .about-body { padding: 60px 20px; }
        }
      `}</style>
      <div className="about-page">
        <div className="about-hero">
          <p className="about-tag">Our Story</p>
          <h1 className="about-title">About <em>Chandra Residency</em></h1>
        </div>
        <div className="about-body">
          <div className="about-grid">
            <img className="about-img" src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700&q=80" alt="Hotel" />
            <div>
              <p className="about-text-tag">Our Heritage</p>
              <h2 className="about-text-title">Two Decades of<br /><em>Warm Hospitality</em></h2>
              <div className="about-divider" />
              <p className="about-text">Chandra Residency has been a cornerstone of hospitality in Chittoor for over 20 years. Located in Thotapalyam, we have welcomed thousands of guests from across India and around the world.</p>
              <p className="about-text">Our commitment to providing exceptional service, comfortable accommodations, and authentic Andhra hospitality has earned us a loyal clientele and a stellar reputation in the region.</p>
              <p className="about-text">Whether you're here for business, pilgrimage, or leisure, we ensure every guest leaves with memories to cherish.</p>
            </div>
          </div>

          <div>
            <p className="about-text-tag" style={{ textAlign: "center", marginBottom: "40px" }}>Nearby Attractions</p>
            <div className="nearby-grid">
              {[
                ["🦅", "Kaundinya Wildlife Sanctuary", "45 km away"],
                ["🌊", "Swami Pushkarini Lake", "12 km away"],
                ["🛕", "Srikalahasti Temple", "35 km away"],
                ["🏔️", "Talakona Waterfalls", "80 km away"],
                ["🛕", "Tirupati Balaji", "95 km away"],
                ["🌿", "Horsley Hills", "120 km away"],
              ].map(([icon, name, dist]) => (
                <div className="nearby-card" key={name}>
                  <div className="nearby-icon">{icon}</div>
                  <div className="nearby-name">{name}</div>
                  <div className="nearby-dist">{dist}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-strip">
            <div>
              <div className="contact-item-title">📍 Address</div>
              <div className="contact-item-text">Thotapalyam, Chittoor<br />Andhra Pradesh 517001</div>
            </div>
            <div>
              <div className="contact-item-title">📞 Phone</div>
              <div className="contact-item-text">094900 15875<br />Available 24/7</div>
            </div>
            <div>
              <div className="contact-item-title">⏰ Hours</div>
              <div className="contact-item-text">Check-in: 2:00 PM<br />Check-out: 12:00 PM</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
