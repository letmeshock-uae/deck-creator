"use client";

import PresentationLayout from "@/components/shared/PresentationLayout";
import SlideEngine from "@/components/vibe/SlideEngine";
import SlideContent from "@/components/vibe/SlideContent";
import { useSlideStore } from "@/store/useSlideStore";

export default function SlideEngineWrapper({ slides }: { slides: any[] }) {
    const { currentIndex } = useSlideStore();

    const formattedSlides = slides.map(s => ({
        id: s.id,
        title: s.title,
        content: <SlideContent content={s.contentMarkdown} />,
        bgImage: s.backgroundImageUrl || undefined,
        bgColor: s.backgroundColor || undefined
    }));

    if (formattedSlides.length === 0) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-black text-white/50">
                No slides found. Please add slides in the Admin Dashboard.
            </div>
        );
    }

    return (
        <PresentationLayout currentSlide={currentIndex + 1} totalSlides={formattedSlides.length}>
            <SlideEngine slides={formattedSlides} />
        </PresentationLayout>
    );
}
