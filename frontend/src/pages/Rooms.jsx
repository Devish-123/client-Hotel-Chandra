import { useNavigate } from "react-router-dom";

export default function Rooms() {
  const navigate = useNavigate();
  const rooms = [
    { type: "Standard Room", price: "₹1,800", beds: "1 Double Bed", size: "250 sq ft", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80", features: ["AC", "WiFi", "TV", "Hot Water", "Daily Housekeeping"] },
    { type: "Deluxe Room", price: "₹2,500", beds: "1 King Bed", size: "350 sq ft", img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80", features: ["AC", "WiFi", "Smart TV", "Mini Fridge", "Garden View", "Bathtub"] },
    { type: "Family Room", price: "₹3,200", beds: "2 Double Beds", size: "450 sq ft", img: "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=600&q=80", features: ["AC", "WiFi", "TV", "Sofa", "Extra Space", "Kids Friendly"] },
    { type: "Suite", price: "₹4,000", beds: "1 King Bed + Living Room", size: "600 sq ft", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", features: ["AC", "WiFi", "Smart TV", "Kitchenette", "Jacuzzi", "Pool View", "Premium Toiletries"] },
    { type: "Executive Room", price: "₹3,500", beds: "1 King Bed", size: "400 sq ft", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80", features: ["AC", "WiFi", "Work Desk", "Smart TV", "Coffee Machine", "City View"] },
    { type: "Budget Room", price: "₹1,200", beds: "1 Single Bed", size: "180 sq ft", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80", features: ["AC", "WiFi", "TV", "Hot Water"] },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .rooms-page { background: #0f0a05; min-height: 100vh; padding-top: 75px; }
        .rooms-hero { background: linear-gradient(135deg, #1a1005, #0f0a05); padding: 80px 40px; text-align: center; border-bottom: 1px solid rgba(212,175,55,0.1); }
        .rooms-hero-tag { font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #D4AF37; margin-bottom: 16px; }
        .rooms-hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(40px, 6vw, 72px); font-weight: 300; color: #f0e6d0; }
        .rooms-hero-title em { font-style: italic; color: #D4AF37; }
        .rooms-hero-sub { font-family: 'Montserrat', sans-serif; font-size: 13px; color: #6a5a3a; margin-top: 16px; letter-spacing: 1px; }
        .rooms-container { max-width: 1200px; margin: 0 auto; padding: 80px 40px; }
        .rooms-list { display: flex; flex-direction: column; gap: 40px; }
        .room-card-h { display: grid; grid-template-columns: 1fr 1.4fr; overflow: hidden; border: 1px solid rgba(212,175,55,0.1); transition: border-color 0.3s; }
        .room-card-h:hover { border-color: rgba(212,175,55,0.4); }
        .room-card-h:nth-child(even) { direction: rtl; }
        .room-card-h:nth-child(even) > * { direction: ltr; }
        .room-img-wrap { overflow: hidden; height: 340px; }
        .room-img-h { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; display: block; }
        .room-card-h:hover .room-img-h { transform: scale(1.04); }
        .room-body { background: #1a1005; padding: 50px 44px; display: flex; flex-direction: column; justify-content: center; }
        .room-badge { display: inline-block; font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #D4AF37; border: 1px solid rgba(212,175,55,0.3); padding: 5px 14px; margin-bottom: 20px; }
        .room-name { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 400; color: #f0e6d0; margin-bottom: 8px; }
        .room-meta { font-family: 'Montserrat', sans-serif; font-size: 12px; color: #6a5a3a; letter-spacing: 1px; margin-bottom: 24px; }
        .room-features { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
        .feature-tag { font-family: 'Montserrat', sans-serif; font-size: 11px; color: #a08c5b; background: rgba(212,175,55,0.06); border: 1px solid rgba(212,175,55,0.15); padding: 4px 12px; }
        .room-bottom { display: flex; align-items: center; justify-content: space-between; }
        .room-rate { font-family: 'Cormorant Garamond', serif; font-size: 30px; color: #D4AF37; }
        .room-rate span { font-family: 'Montserrat', sans-serif; font-size: 12px; color: #6a5a3a; }
        .book-btn { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; background: #D4AF37; color: #0f0a05; border: none; padding: 14px 32px; cursor: pointer; transition: all 0.3s; }
        .book-btn:hover { background: #f0c93a; transform: translateY(-2px); }
        .call-strip { background: #D4AF37; padding: 32px 40px; text-align: center; }
        .call-strip p { font-family: 'Montserrat', sans-serif; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #3a2e10; margin-bottom: 8px; }
        .call-strip h3 { font-family: 'Cormorant Garamond', serif; font-size: 32px; color: #0f0a05; }
        @media (max-width: 768px) {
          .room-card-h { grid-template-columns: 1fr; }
          .room-card-h:nth-child(even) { direction: ltr; }
          .room-img-wrap { height: 240px; }
          .room-body { padding: 32px 24px; }
          .rooms-container { padding: 60px 20px; }
        }
      `}</style>
      <div className="rooms-page">
        <div className="rooms-hero">
          <p className="rooms-hero-tag">Accommodation</p>
          <h1 className="rooms-hero-title">Our <em>Rooms & Suites</em></h1>
          <p className="rooms-hero-sub">Choose from our carefully curated collection of rooms designed for your comfort</p>
        </div>
        <div className="rooms-container">
          <div className="rooms-list">
            {rooms.map((r, i) => (
              <div className="room-card-h" key={r.type}>
                <div className="room-img-wrap">
                  <img className="room-img-h" src={r.img} alt={r.type} />
                </div>
                <div className="room-body">
                  <div className="room-badge">Room {String(i + 1).padStart(2, "0")}</div>
                  <div className="room-name">{r.type}</div>
                  <div className="room-meta">{r.beds} &nbsp;•&nbsp; {r.size}</div>
                  <div className="room-features">
                    {r.features.map(f => <span className="feature-tag" key={f}>{f}</span>)}
                  </div>
                  <div className="room-bottom">
                    <div className="room-rate">{r.price} <span>/ night</span></div>
                    <button className="book-btn" onClick={() => navigate("reservation")}>Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="call-strip">
          <p>To book your room</p>
          <h3>📞 Call us: 094900 15875</h3>
        </div>
      </div>
    </>
  );
}