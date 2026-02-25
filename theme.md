# Design Tokens & Tailwind Mapping

## 1. Typography
- **Primary Font**: `Google Sans Flex`, sans-serif (Variable weight 100-900).
- **Scale**:
    - `text-slide-title`: 5vw, tracking-tighter, font-black.
    - `text-slide-content`: 1.25rem, leading-relaxed.

## 2. Color Palette
- **Primary**: `hsl(0, 0%, 100%)` (White text/elements).
- **Background**: `hsl(0, 0%, 5%)` (Near black).
- **Glass-Surface**: `rgba(255, 255, 255, 0.05)`.
- **Glass-Stroke**: `rgba(255, 255, 255, 0.1)`.

## 3. Glassmorphism
- **Effect**: `backdrop-blur: 24px`.
- **Border**: `1px solid var(--glass-stroke)`.

## 4. Animation Configs (Framer Motion)
```typescript
export const VIBE_TRANSITION = {
  type: "spring",
  stiffness: 70,
  damping: 20,
  mass: 1
};

export const SLIDE_WIPE = {
  initial: { clipPath: 'inset(100% 0% 0% 0%)' },
  animate: { clipPath: 'inset(0% 0% 0% 0%)' },
  exit: { clipPath: 'inset(0% 0% 100% 0%)' },
  transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] }
};