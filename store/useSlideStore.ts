import { create } from 'zustand';

interface SlideState {
    currentIndex: number;
    direction: number;
    totalSlides: number;
    setSlides: (total: number) => void;
    nextSlide: () => void;
    prevSlide: () => void;
    goToSlide: (index: number) => void;
}

export const useSlideStore = create<SlideState>((set) => ({
    currentIndex: 0,
    direction: 0,
    totalSlides: 0,
    setSlides: (total) => set({ totalSlides: total }),
    nextSlide: () => set((state) => {
        if (state.currentIndex < state.totalSlides - 1) {
            return { currentIndex: state.currentIndex + 1, direction: 1 };
        }
        return state;
    }),
    prevSlide: () => set((state) => {
        if (state.currentIndex > 0) {
            return { currentIndex: state.currentIndex - 1, direction: -1 };
        }
        return state;
    }),
    goToSlide: (index) => set((state) => {
        if (index >= 0 && index < state.totalSlides && index !== state.currentIndex) {
            return { currentIndex: index, direction: index > state.currentIndex ? 1 : -1 };
        }
        return state;
    })
}));
