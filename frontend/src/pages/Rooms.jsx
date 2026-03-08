import { useNavigate } from "react-router-dom";

export default function Rooms() {
  const navigate = useNavigate();
  const rooms = [
    { type: "Standard Room",  beds: "1 Double Bed", size: "250 sq ft", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80", features: ["AC", "WiFi", "TV", "Hot Water", "Housekeeping"] },
    { type: "Deluxe Room",  beds: "1 King Bed", size: "350 sq ft", img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=700&q=80", features: ["AC", "WiFi", "Smart TV", "Mini Fridge", "Garden View", "Bathtub"] },
    { type: "Family Room",  beds: "2 Double Beds", size: "450 sq ft", img: "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=700&q=80", features: ["AC", "WiFi", "TV", "Sofa", "Extra Space", "Kids Friendly"] },
    { type: "Royal Suite",  beds: "1 King + Living Room", size: "600 sq ft", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&q=80", features: ["AC", "WiFi", "Smart TV", "Kitchenette", "Jacuzzi", "Pool View"] },
    { type: "Executive Room",  beds: "1 King Bed", size: "400 sq ft", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=700&q=80", features: ["AC", "WiFi", "Work Desk", "Smart TV", "Coffee Machine"] },
    { type: "Budget Room",  beds: "1 Single Bed", size: "180 sq ft", img: "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?w=700&q=80", features: ["AC", "WiFi", "TV", "Hot Water"] },
  ];

  return (
    <div className="page-enter page-wrap">
      <style>{`
        .rooms-hero { background: linear-gradient(135deg, var(--dark-wood-mid), var(--dark-wood)); padding: 70px 40px; text-align: center; border-bottom: 1px solid var(--gold-dim); }
        .room-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid rgba(201,168,76,0.12); margin-bottom: 24px; overflow: hidden; transition: border-color 0.3s; }
        .room-row:hover { border-color: rgba(201,168,76,0.35); }
        .room-row.reverse { direction: rtl; }
        .room-row.reverse > * { direction: ltr; }
        .room-img-wrap { position: relative; overflow: hidden; height: 320px; }
        .room-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; display: block; }
        .room-row:hover .room-img-wrap img { transform: scale(1.04); }
        .room-num { position: absolute; top: 20px; left: 20px; font-family: var(--font-display); font-size: 11px; color: var(--gold); letter-spacing: 3px; background: rgba(20,8,4,0.8); padding: 6px 12px; }
        .room-info { background: var(--dark-wood-mid); padding: 40px; display: flex; flex-direction: column; justify-content: center; }
        .room-badge { font-family: var(--font-body); font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--deep-red); margin-bottom: 12px; }
        .room-title { font-family: var(--font-display); font-size: 30px; color: var(--ivory); margin-bottom: 8px; }
        .room-meta { display: flex; gap: 20px; margin-bottom: 20px; }
        .room-meta-item { font-family: var(--font-body); font-size: 12px; color: var(--muted-text); }
        .room-meta-item span { color: var(--gold); }
        .room-features { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
        .room-feat { font-family: var(--font-body); font-size: 11px; color: var(--cream-text); background: rgba(201,168,76,0.06); border: 1px solid rgba(201,168,76,0.15); padding: 5px 12px; }
        .room-price-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .room-price { font-family: var(--font-display); font-size: 32px; color: var(--gold); }
        .room-price small { font-family: var(--font-body); font-size: 12px; color: var(--muted-text); }
        .rooms-cta { background: var(--deep-red); padding: 60px 40px; text-align: center; margin-top: 20px; }
        @media (max-width: 768px) {
          .room-row, .room-row.reverse { grid-template-columns: 1fr; direction: ltr; }
          .room-img-wrap { height: 220px; }
          .room-info { padding: 24px 20px; }
          .rooms-hero { padding: 50px 20px; }
          .rooms-cta { padding: 40px 20px; }
        }
      `}</style>

      <div className="rooms-hero">
        <p className="tag">Accommodation</p>
        <h1 className="heading-xl">Our <span className="gold-italic">Rooms & Suites</span></h1>
        <p style={{fontFamily:"var(--font-body)",fontSize:"14px",color:"var(--muted-text)",marginTop:"16px"}}>Choose from our carefully curated collection of rooms designed for your comfort</p>
      </div>

      <div className="section">
        {rooms.map((r, i) => (
          <div className={`room-row ${i % 2 === 1 ? "reverse" : ""}`} key={r.type}>
            <div className="room-img-wrap">
              <img src={r.img} alt={r.type} />
              <div className="room-num">ROOM {String(i+1).padStart(2,"0")}</div>
            </div>
            <div className="room-info">
              <div className="room-badge">● Available</div>
              <div className="room-title">{r.type}</div>
              <div className="room-meta">
                <div className="room-meta-item"><span>🛏 </span>{r.beds}</div>
                <div className="room-meta-item"><span>📐 </span>{r.size}</div>
              </div>
              <div className="room-features">
                {r.features.map(f => <span className="room-feat" key={f}>{f}</span>)}
              </div>
              <div className="room-price-row">
                <div className="room-price">{r.price} <small>/ night</small></div>
                <button className="btn-primary" onClick={() => navigate("/reservation")}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rooms-cta">
        <p style={{fontFamily:"var(--font-display)",fontStyle:"italic",fontSize:"22px",color:"var(--ivory)",marginBottom:"8px"}}>Need help choosing the right room?</p>
        <p style={{fontFamily:"var(--font-body)",fontSize:"22px",color:"var(--gold)",margin:"12px 0 28px"}}>📞 094900 15875</p>
        <button className="btn-primary" onClick={() => navigate("/reservation")}>Make a Reservation</button>
      </div>
    </div>
  );
}
