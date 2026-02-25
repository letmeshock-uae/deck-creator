ROADMAP.md`


# Phased Implementation Plan

## Phase 1: Zero-Gravity Setup
- [ ] Initialize Next.js 16 with Google Sans Flex configuration.
- [ ] Set up Tailwind config with Glassmorphism utilities.
- [ ] Create `PresentationLayout` (Top-left Logo area, Top-right Slide counter).

## Phase 2: Core Engine (The "Vibe")
- [ ] Implement `SlideEngine` with Framer Motion `AnimatePresence`.
- [ ] Integrate `useWheel` and `useDrag` from `@use-gesture/react` for slide switching.
- [ ] Build `MermaidRenderer` component.

## Phase 3: Admin Matrix
- [ ] Build `/admin/login` (Password input only).
- [ ] Create Slide Dashboard (List view with reordering via `dnd-kit`).
- [ ] Implement Markdown Editor (using `react-simplemde-editor` or similar).
- [ ] Connect Drizzle ORM + Postgres for data persistence.

## Phase 4: Refinement
- [ ] Add loading skeletons for slide transitions.
- [ ] Implement Vercel Blob for image uploads.
- [ ] Final polish on "Index 4" clip-path animations.