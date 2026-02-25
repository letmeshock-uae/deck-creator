"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWheel, useDrag } from "@use-gesture/react";
import { useSlideStore } from "@/store/useSlideStore";
import { SLIDE_VARIANTS, CONTENT_VARIANTS } from "@/lib/animations";

interface SlideData {
    id: string;
    title: string;
    content: React.ReactNode;
    bgImage?: string;
    bgColor?: string;
}

interface SlideEngineProps {
    slides: SlideData[];
}

export default function SlideEngine({ slides }: SlideEngineProps) {
    const { currentIndex, direction, setSlides, nextSlide, prevSlide } = useSlideStore();
    const containerRef = useRef<HTMLDivElement>(null);

    // Debounce scroll
    const isTransitioning = useRef(false);

    useEffect(() => {
        setSlides(slides.length);
    }, [slides.length, setSlides]);

    const handleNext = () => {
        if (isTransitioning.current) return;
        isTransitioning.current = true;
        nextSlide();
        setTimeout(() => { isTransitioning.current = false; }, 1300);
    };

    const handlePrev = () => {
        if (isTransitioning.current) return;
        isTransitioning.current = true;
        prevSlide();
        setTimeout(() => { isTransitioning.current = false; }, 1300);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") handleNext();
            if (e.key === "ArrowUp" || e.key === "ArrowLeft") handlePrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    // Gestures (Wheel & Drag)
    useWheel(({ direction: [, yDir], active }) => {
        if (!active || isTransitioning.current) return;
        if (yDir > 0) handleNext();
        else if (yDir < 0) handlePrev();
    }, { target: containerRef, preventDefault: true });

    useDrag(({ direction: [, yDir], swipe: [, swipeY] }) => {
        if (swipeY > 0 || yDir > 0) handleNext();
        else if (swipeY < 0 || yDir < 0) handlePrev();
    }, { target: containerRef });

    if (slides.length === 0) return null;

    const currentSlideData = slides[currentIndex];

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden touch-none select-none bg-black">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={SLIDE_VARIANTS}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full overflow-hidden"
                >
                    {/* The Inner Parallax Container (Shutter Effect) */}
                    <motion.div
                        variants={CONTENT_VARIANTS}
                        custom={direction}
                        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
                        style={{
                            backgroundImage: currentSlideData.bgImage ? `url(${currentSlideData.bgImage})` : undefined,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Overlay for better text legibility if there is a bg image */}
                        {currentSlideData.bgImage && <div className="absolute inset-0 bg-black/40 z-0" />}

                        {/* Solid Background overlay if no custom image is supplied */}
                        {!currentSlideData.bgImage && (
                            <div
                                className="absolute inset-0 z-0"
                                style={{ backgroundColor: currentSlideData.bgColor || 'var(--color-background)' }}
                            />
                        )}

                        <div className="relative z-10 w-full max-w-5xl px-8">
                            <h1 className="text-[5vw] tracking-tighter font-black mb-8 leading-none">
                                {currentSlideData.title}
                            </h1>
                            <div className="text-xl leading-relaxed text-white/90">
                                {currentSlideData.content}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div >
    );
}
