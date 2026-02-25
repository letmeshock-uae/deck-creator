import { Variants } from "framer-motion";

// Match pure GSAP power4.inOut ease and duration
export const VIBE_TRANSITION = {
    duration: 1.25,
    ease: [0.76, 0, 0.24, 1] as const, // Approximate GSAP power4.inOut
};

// Outgoing fade has a different transition in GSAP (duration: 0.4, sine)
const EXIT_TRANSITION = {
    duration: 0.5,
    ease: 'easeOut' as const,
};

// Index 4 animation physics (Main Container)
export const SLIDE_VARIANTS = {
    enter: (direction: number) => ({
        y: direction > 0 ? "100%" : "-100%",
        scale: 1,
        opacity: 1,
        zIndex: 99, // Needs to be on top during entry
    }),
    center: {
        y: "0%",
        scale: 1,
        opacity: 1,
        zIndex: 99,
        transition: VIBE_TRANSITION,
    },
    exit: (direction: number) => ({
        y: direction > 0 ? "-20%" : "20%",
        scale: 0.9,
        opacity: 0,
        zIndex: 1, // Remains underneath
        transition: EXIT_TRANSITION,
    }),
};

// The counter-movement for the inner content (shutter effect payload)
export const CONTENT_VARIANTS = {
    enter: (direction: number) => ({
        // GSAP specifies yPercent: -direction * 50 for the inner image
        y: direction > 0 ? "-50%" : "50%",
    }),
    center: {
        y: "0%",
        transition: VIBE_TRANSITION,
    },
    exit: {
        y: "0%",
        transition: EXIT_TRANSITION,
    },
};
