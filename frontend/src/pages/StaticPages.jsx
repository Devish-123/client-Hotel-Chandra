import { useNavigate } from "react-router-dom";

export function Reservation() {
  return (
    <div className="page-enter page-wrap">
      <style>{`
        .res-hero { background: linear-gradient(135deg, var(--dark-wood-mid), var(--dark-wood)); padding: 70px 40px; text-align: center; border-bottom: 1px solid var(--gold-dim); }
        .res-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 40px; }
        .res-card { background: var(--dark-wood-mid); border: 1px solid rgba(201,168,76,0.15); padding: 48px 36px; text-align: center; transition: border-color 0.3s; }
        .res-card:hover { border-color: var(--gold-dim); }
        .res-card-icon { font-size: 44px; margin-bottom: 20px; }
        .res-card-title { font-family: var(--font-display); font-size: 26px; color: var(--gold); margin-bottom: 12px; }
        .res-card-desc { font-family: var(--font-body); font-size: 13px; color: var(--muted-text); line-height: 1.8; margin-bottom: 24px; }
        .res-card-num { font-family: var(--font-display); font-size: 30px; color: var(--ivory); margin-bottom: 24px; }
        .res-link { font-family: var(--font-body); font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; background: var(--gold); color: var(--dark-wood); border: none; padding: 14px 32px; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.3s; }
        .res-link:hover { background: var(--gold-light); }
        .res-info { background: var(--dark-wood-mid); border: 1px solid rgba(201,168,76,0.15); padding: 48px; }
        .res-info-title { font-family: var(--font-display); font-size: 28px; color: var(--ivory); margin-bottom: 28px; }
        .res-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .res-info-item { font-family: var(--font-body); font-size: 13px; color: var(--cream-text); padding: 16px; background: rgba(201,168,76,0.04); border-left: 2px solid var(--gold); }
        .res-info-item strong { color: var(--gold); display: block; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
        @media (max-width: 768px) {
          .res-grid { grid-template-columns: 1fr; }
          .res-info-grid { grid-template-columns: 1fr; }
          .res-hero { padding: 50px 20px; }
          .res-info { padding: 28px 20px; }
        }
      `}</style>
      <div className="res-hero">
        <p className="tag">Reservations</p>
        <h1 className="heading-xl">Book Your <span className="gold-italic">Stay</span></h1>
      </div>
      <div className="section">
        <div className="res-grid">
          <div className="res-card">
            <div className="res-card-icon">📞</div>
            <div className="res-card-title">Call to Book</div>
            <div className="res-card-desc">Speak directly with our reception for instant confirmation and personalized service.</div>
            <div className="res-card-num">094900 15875</div>
            <a href="tel:+919490015875" className="res-link">Call Now</a>
          </div>
          <div className="res-card">
            <div className="res-card-icon">💬</div>
            <div className="res-card-title">WhatsApp Us</div>
            <div className="res-card-desc">Quick responses and easy booking confirmation via WhatsApp.</div>
            <div className="res-card-num">094900 15875</div>
            <a href="https://wa.me/919490015875" target="_blank" rel="noreferrer" className="res-link">WhatsApp</a>
          </div>
        </div>
        <div className="res-info">
          <div className="res-info-title">Reservation Information</div>
          <div className="res-info-grid">
            {[["Check-in Time","2:00 PM onwards"],["Check-out Time","12:00 PM noon"],["Cancellation","24 hours notice"],["Payment","Cash, UPI, Card"],["ID Proof","Aadhaar / Passport"],["Pet Policy","Not allowed"],["Smoking","Non-smoking available"],["Extra Bed","On request"]].map(([k,v])=>(
              <div className="res-info-item" key={k}><strong>{k}</strong>{v}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    <div className="page-enter page-wrap">
      <style>{`
        .about-hero { padding: 70px 40px; text-align: center; background: linear-gradient(135deg, var(--dark-wood-mid), var(--dark-wood)); border-bottom: 1px solid var(--gold-dim); }
        .ab-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; margin-bottom: 80px; }
        .ab-img { width: 100%; height: 460px; object-fit: cover; display: block; }
        .ab-text { font-family: var(--font-body); font-size: 14px; color: var(--muted-text); line-height: 1.9; margin-bottom: 16px; }
        .nearby-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: rgba(201,168,76,0.1); }
        .nearby-card { background: var(--dark-wood); padding: 32px 20px; text-align: center; }
        .nearby-icon { font-size: 28px; margin-bottom: 12px; }
        .nearby-name { font-family: var(--font-display); font-size: 16px; color: var(--gold); margin-bottom: 6px; }
        .nearby-dist { font-family: var(--font-body); font-size: 11px; color: var(--muted-text); }
        .contact-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 60px; }
        .contact-card { background: var(--dark-wood-mid); border: 1px solid rgba(201,168,76,0.15); padding: 36px; text-align: center; }
        .contact-title { font-family: var(--font-display); font-size: 22px; color: var(--gold); margin-bottom: 12px; }
        .contact-text { font-family: var(--font-body); font-size: 13px; color: var(--muted-text); line-height: 1.9; }
        @media (max-width: 900px) {
          .ab-grid { grid-template-columns: 1fr; gap: 40px; }
          .nearby-grid { grid-template-columns: repeat(2,1fr); }
          .contact-grid { grid-template-columns: 1fr; }
          .about-hero { padding: 50px 20px; }
        }
        @media (max-width: 480px) { .nearby-grid { grid-template-columns: 1fr; } }
      `}</style>
      <div className="about-hero">
        <p className="tag">Our Story</p>
        <h1 className="heading-xl">About <span className="gold-italic">Us</span></h1>
      </div>
      <div className="section">
        <div className="ab-grid">
          <img className="ab-img" src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700&q=80" alt="Chandra Residency" />
          <div>
            <p className="tag">Our Heritage</p>
            <h2 className="heading-lg">Two Decades of<br /><span className="gold-italic">Warm Hospitality</span></h2>
            <div className="divider"><div className="divider-diamond" /></div>
            <p className="ab-text">Chandra Residency has been a cornerstone of hospitality in Chittoor for over 20 years. Located in Thotapalyam, we have welcomed thousands of guests from across India.</p>
            <p className="ab-text">Our commitment to exceptional service and authentic Andhra hospitality has earned us a loyal clientele and stellar reputation in the region.</p>
          </div>
        </div>
        <p className="tag" style={{textAlign:"center",marginBottom:"32px"}}>Nearby Attractions</p>
        <div className="nearby-grid">
          {[["🦅","Kaundinya Wildlife","45 km"],["🌊","Swami Pushkarini","12 km"],["🛕","Srikalahasti Temple","35 km"],["🏔️","Talakona Falls","80 km"],["🛕","Tirupati Balaji","95 km"],["🌿","Horsley Hills","120 km"]].map(([i,n,d])=>(
            <div className="nearby-card" key={n}>
              <div className="nearby-icon">{i}</div>
              <div className="nearby-name">{n}</div>
              <div className="nearby-dist">{d} away</div>
            </div>
          ))}
        </div>
        <div className="contact-grid">
          {[["📍 Address","Thotapalyam, Chittoor\nAndhra Pradesh 517001"],["📞 Phone","094900 15875\nAvailable 24/7"],["⏰ Hours","Check-in: 2:00 PM\nCheck-out: 12:00 PM"]].map(([t,c])=>(
            <div className="contact-card" key={t}>
              <div className="contact-title">{t}</div>
              <div className="contact-text">{c.split("\n").map((l,i)=><span key={i}>{l}<br/></span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
