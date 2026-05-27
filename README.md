# Verify Influencers

A full-stack web application for validating health & wellness claims made by social-media influencers. Users can browse influencers, inspect the claims they've made, and see each claim scored and categorized as **Verified**, **Questionable**, or **Debunked**, backed by linked research.

🔗 **Live demo:** https://verify-influencers-ebon.vercel.app

---

## Features

- **Influencer directory & leaderboard** — browse influencers and rank them by trust score.
- **Claim tracking** — every claim is stored with its source link, category, and date.
- **Trust scoring** — claims are scored and bucketed into Verified / Questionable / Debunked based on recency and language confidence.
- **Research library** — supporting studies organized by category (Sleep, Nutrition, Hormones, Performance, etc.).
- **Authentication** — JWT access/refresh tokens with secure, httpOnly cookies and Redis-backed refresh-token storage.
- **Admin dashboard** — protected, admin-only interface for adding influencers, claims, and research.

## Tech stack

**Frontend:** React 18, Vite, React Router, Zustand, Tailwind CSS, Framer Motion, Recharts, Axios
**Backend:** Node.js, Express, MongoDB (Mongoose), Redis (ioredis), JWT, bcryptjs
**Services:** Cloudinary (media), Stripe (payments)
**Hosting:** Vercel (frontend static build + serverless Express API)

## Architecture

```
/api/[...all].js     Vercel serverless entry — boots the Express app and connects to Mongo
/backend             Express API (routes, controllers, models, middleware, lib)
/frontend            React + Vite single-page app
```

The same Express app runs locally via `node backend/server.js` and as a Vercel serverless function in production. Client-side routes fall back to `index.html` via a rewrite in `vercel.json`.

## Getting started

### Prerequisites
- Node.js 18+
- A MongoDB connection string
- A Redis instance (e.g. Upstash)

### 1. Install dependencies
```bash
npm install
npm install --prefix frontend
```

### 2. Configure environment variables
Create a `.env` file in the project root:
```bash
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_URL=your_redis_url
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
STRIPE_SECRET_KEY=...

# CORS — comma-separated list of allowed origins (your deployed frontend URL)
CLIENT_URL=https://your-app.vercel.app

# Optional — raises PubMed rate limits and identifies your app to NCBI
PUBMED_API_KEY=
PUBMED_EMAIL=you@example.com
```

### 3. Run in development
```bash
# Terminal 1 — API (http://localhost:5000)
npm run dev

# Terminal 2 — frontend (http://localhost:5173)
npm run dev --prefix frontend
```

### 4. Build for production
```bash
npm run build
```

### Tests
```bash
npm test
```
Unit tests (Vitest) cover request validation, the PubMed evidence mapping, and the claim-score logic. CI runs tests + frontend lint on every push/PR via GitHub Actions.

## API overview

| Method | Endpoint                         | Access      | Description                          |
|--------|----------------------------------|-------------|--------------------------------------|
| POST   | `/api/auth/signup`               | Public      | Create an account                    |
| POST   | `/api/auth/login`                | Public      | Log in                               |
| POST   | `/api/auth/logout`               | Public      | Log out                              |
| POST   | `/api/auth/refresh-token`        | Public      | Rotate the access token              |
| GET    | `/api/auth/profile`              | Auth        | Get the current user                 |
| GET    | `/api/influencers`               | Public      | List influencers                     |
| GET    | `/api/influencers/:id`           | Public      | Get one influencer                   |
| POST   | `/api/influencers`               | Admin       | Add influencer(s)                    |
| GET    | `/api/claims?name=`              | Public      | Get claims for an influencer         |
| GET    | `/api/claims/verify?q=`          | Public      | PubMed evidence + citations for a claim |
| POST   | `/api/claims`                    | Admin       | Add a claim                          |
| GET    | `/api/research?categories=`      | Public      | Get research by category             |
| POST   | `/api/research`                  | Admin       | Add research                         |

---

![Verify-1](https://github.com/user-attachments/assets/c5d9b283-e17d-4801-9d71-a50808bbfa41)

![Verify-2](https://github.com/user-attachments/assets/b5e8508e-e006-45a9-898a-19f26481e00e)

![Verify-3](https://github.com/user-attachments/assets/92875c46-6ac1-4153-8568-74b116eb067d)
