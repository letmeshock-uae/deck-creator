"use client";

import Logo from "./Logo";

interface PresentationLayoutProps {
    children: React.ReactNode;
    currentSlide: number;
    totalSlides: number;
}

export default function PresentationLayout({ children, currentSlide, totalSlides }: PresentationLayoutProps) {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-background text-primary">
            {/* Top Left Logo */}
            <div className="absolute top-8 left-8 z-[100]">
                <Logo />
            </div>

            {/* Top Right Counter */}
            <div className="absolute top-8 right-8 z-[100] mix-blend-difference font-mono text-sm tracking-widest opacity-70 pointer-events-none">
                {String(currentSlide).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
            </div>

            {/* Background/Children */}
            {children}
        </div>
    );
}
