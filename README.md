# Vaishnavi Trivedi — Minimal Dark Portfolio

A clean, minimal, dark portfolio built with **Vue 3**, **Vite**, and **Three.js**, centered around a reactive 3D liquid pearl orb.

## Tech Stack
- **Framework:** Vue 3 (`<script setup>`, Composition API)
- **Bundler:** Vite
- **3D Graphics:** Three.js (installed via npm) with custom GLSL vertex & fragment ShaderMaterial (derivatives, iridescent palette, fresnel, specular, vertex noise displacement)
- **Typography:** Bricolage Grotesque (300/400/600) & JetBrains Mono (400)
- **Backend / Serverless Counter:** `/api/visit.js` with Upstash Redis atomic `INCR`

---

## Visitor Counter Setup on Vercel

The portfolio displays an atomic visitor counter (`Visitor 0001` in the top navbar and contact section).
It includes:
1. **Atomic INCR** using Upstash Redis.
2. **Client persistence** (`localStorage['vt_no']`) so returning visitors in the same browser keep their assigned number.
3. **Bot filtering** by user-agent and **rate-limiting by IP** (1 visit increment per IP every 60 seconds).
4. **Graceful fallback:** If Redis credentials are not present (e.g., local development), it automatically falls back cleanly without breaking the UI.

### Vercel + Upstash Redis Setup Steps

1. Create a free Redis database on [Upstash](https://console.upstash.com/redis).
2. Go to your database details and copy:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
3. In your Vercel Project Settings:
   - Go to **Settings** > **Environment Variables**.
   - Add:
     - `UPSTASH_REDIS_REST_URL` = `https://<your-db>.upstash.io`
     - `UPSTASH_REDIS_REST_TOKEN` = `<your-token>`
4. Deploy the project to Vercel (`vercel` or push to your Git repo). Vercel will automatically host the `/api/visit.js` serverless function.

---

## Local Development

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
