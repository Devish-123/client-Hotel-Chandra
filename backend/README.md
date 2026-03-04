# Chandra Residency — Hotel Management Backend

Spring Boot REST API for hotel room & booking management.

---

## 🚀 Deploy on Railway

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/chandra-residency-backend.git
git push -u origin main
```

### Step 2 — Deploy on Railway
1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **New Project → Deploy from GitHub Repo**
3. Select your repo
4. Go to **Variables** tab and add all variables from `.env.example`

### Step 3 — Set Environment Variables on Railway

| Variable | Value |
|---|---|
| `DB_URL` | Your Neon PostgreSQL URL |
| `DB_USERNAME` | Your Neon DB username |
| `DB_PASSWORD` | Your Neon DB password |
| `JWT_SECRET` | Any random 32+ character string |
| `PORT` | 8080 |

Railway will give you a public URL like:
`https://chandra-residency-backend.up.railway.app`

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register user |
| POST | `/auth/login` | Public | Login → returns JWT token |

### Rooms (ADMIN only)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/rooms` | Create a room |
| GET | `/rooms` | Get all rooms |

### Bookings (ADMIN + EMPLOYEE)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/bookings` | Create booking |
| GET | `/bookings` | Get all bookings (paginated) |
| GET | `/bookings/revenue?start=YYYY-MM-DD&end=YYYY-MM-DD` | Revenue (ADMIN only) |

---

## 🔐 Using JWT

After login, include the token in every request:
```
Authorization: Bearer <your_token_here>
```

---

## 🛠️ Tech Stack
- Java 17
- Spring Boot 3.5
- Spring Security + JWT
- PostgreSQL (Neon Cloud)
- Maven
