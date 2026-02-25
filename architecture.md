# System Design & Architecture

## 1. Architecture Style
**Feature-Sliced Modular Monolith**: Logic is grouped by domain (Slides, Auth, Editor) within the Next.js `app/` directory.

## 2. Rendering Policy
- **Server Components (RSC)**: Used for fetching slide data from the DB and initial layout rendering for SEO/Performance.
- **Client Components**: 
    - `PresentationEngine`: Handles Framer Motion orchestration and gesture detection (Drag/Scroll).
    - `MermaidRenderer`: Client-side rendering for diagrams.
    - `AdminEditor`: Interactive forms and state.

## 3. API & Auth Strategy
- **Auth**: Simple Middleware-based check for the `/admin` route. A session cookie is set upon entering `theDatum2026!`.
- **API**: Next.js Route Handlers (`/api/slides`) using REST for CRUD operations.

## 4. Data Layer
- **ORM**: Drizzle ORM for low-latency SQL operations.
- **Database**: PostgreSQL (Local/Vercel Postgres).
- **Storage**: Vercel Blob for background images and logo uploads.

## 5. Transition Logic (The "Index 4" Clone)
We will replicate the "Index 4" feel using **Framer Motion `AnimatePresence`** and `clip-path`.
- **Exit**: `clip-path: inset(0% 0% 100% 0%)` (Wipe up).
- **Enter**: `clip-path: inset(100% 0% 0% 0%)` animating to `inset(0% 0% 0% 0%)`.