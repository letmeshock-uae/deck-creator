"use client";

import { useState, useEffect } from "react";
import SortableList from "@/components/admin/SortableList";
import Editor from "@/components/admin/Editor";
import Logo from "@/components/shared/Logo";

// Extract up to 50 characters of plain text from markdown for naming
const generateTitle = (markdown: string) => {
    // Strip common markdown characters to get plain readable text
    const plainText = markdown.replace(/[#*`_>\[\]]/g, '').trim();
    if (!plainText) return "Untitled Slide";

    return plainText.length > 50
        ? `${plainText.substring(0, 50)}...`
        : plainText;
};

export default function DashboardPage() {
    const [slidesData, setSlidesData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null);

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const res = await fetch("/api/slides");
            if (!res.ok) throw new Error("Network response was not ok");
            const data = await res.json();
            setSlidesData(data || []);
        } catch (err) {
            console.error("DB fetching error", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateSlide = async () => {
        try {
            const initialContent = "# Slide\nStart typing here...";
            const res = await fetch("/api/slides", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: generateTitle(initialContent),
                    contentMarkdown: initialContent,
                    orderIndex: slidesData.length,
                }),
            });
            if (res.ok) {
                const newSlide = await res.json();
                setSlidesData([...slidesData, newSlide]);
                setSelectedSlideId(newSlide.id);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteSlide = async (id: string) => {
        if (!confirm("Are you sure you want to delete this slide?")) return;
        try {
            const res = await fetch(`/api/slides?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setSlidesData(slidesData.filter((s) => s.id !== id));
                if (selectedSlideId === id) setSelectedSlideId(null);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveEditor = async (data: { content: string, bgImage: string, bgColor: string }) => {
        if (!selectedSlideId) return;
        const currentSlide = slidesData.find((s) => s.id === selectedSlideId);
        if (!currentSlide) return;

        const newTitle = generateTitle(data.content);

        try {
            const res = await fetch("/api/slides", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...currentSlide,
                    contentMarkdown: data.content,
                    title: newTitle,
                    backgroundImageUrl: data.bgImage,
                    backgroundColor: data.bgColor
                }),
            });
            if (res.ok) {
                const updated = await res.json();
                setSlidesData(slidesData.map((s) => (s.id === updated.id ? updated : s)));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleReorder = async (newItems: any[]) => {
        setSlidesData(newItems);
        // In a real app, you'd send a bulk update or promise.all here
        for (let i = 0; i < newItems.length; i++) {
            if (newItems[i].orderIndex !== i) {
                await fetch("/api/slides", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: newItems[i].id, orderIndex: i }),
                });
            }
        }
    };

    const selectedSlide = slidesData.find((s) => s.id === selectedSlideId);

    return (
        <div className="min-h-screen bg-background text-primary p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex items-center justify-between mb-12">
                    <Logo />
                    <nav className="flex items-center gap-4">
                        <span className="text-white/60 text-sm">v1.0 Admin</span>
                        <form action="/api/auth/logout" method="POST">
                            <button className="text-sm px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                                Logout
                            </button>
                        </form>
                    </nav>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Slide List */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Slides Timeline</h2>
                            <button
                                onClick={handleCreateSlide}
                                className="text-sm px-4 py-1.5 bg-white text-black font-semibold rounded-md hover:bg-white/90 transition-colors"
                            >
                                + Add Slide
                            </button>
                        </div>

                        {isLoading ? (
                            <div className="animate-pulse flex flex-col gap-4">
                                <div className="h-12 bg-white/5 rounded-lg w-full"></div>
                                <div className="h-12 bg-white/5 rounded-lg w-full"></div>
                            </div>
                        ) : slidesData.length === 0 ? (
                            <div className="text-white/40 text-sm text-center py-8 border border-dashed border-white/10 rounded-lg">
                                No slides yet. Click "Add Slide" to begin.
                            </div>
                        ) : (
                            <SortableList
                                items={slidesData}
                                onReorder={handleReorder}
                                onEdit={setSelectedSlideId}
                                onDelete={handleDeleteSlide}
                                selectedId={selectedSlideId}
                            />
                        )}
                    </div>

                    {/* Right Column: Editor */}
                    <div className="lg:col-span-2">
                        {selectedSlide ? (
                            <div className="h-[600px] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                                {/* Provide a unique key to force Editor unmount/mount on slide change */}
                                <Editor
                                    key={selectedSlide.id}
                                    initialContent={selectedSlide.contentMarkdown || ""}
                                    initialBgImage={selectedSlide.backgroundImageUrl || ""}
                                    initialBgColor={selectedSlide.backgroundColor || "#000000"}
                                    onSave={handleSaveEditor}
                                />
                            </div>
                        ) : (
                            <div className="w-full h-[600px] bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/30">
                                Select or create a slide to edit
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
