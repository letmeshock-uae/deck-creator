"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

// Dynamically import the editor since it requires browser APIs
const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
});

interface EditorProps {
    initialContent: string;
    initialBgImage: string;
    initialBgColor: string;
    onSave: (data: { content: string; bgImage: string; bgColor: string }) => Promise<void>;
}

export default function Editor({ initialContent, initialBgImage, initialBgColor, onSave }: EditorProps) {
    const [content, setContent] = useState(initialContent);
    const [bgImage, setBgImage] = useState(initialBgImage);
    const [bgColor, setBgColor] = useState(initialBgColor || "#000000");
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
                method: "POST",
                body: file,
            });
            if (response.ok) {
                const data = await response.json();
                setBgImage(data.url);
            } else {
                alert("Upload failed. Make sure Vercel Blob is configured correctly.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = async () => {
        setSaveStatus("saving");
        try {
            await onSave({ content, bgImage, bgColor });
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch {
            setSaveStatus("idle");
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-background overflow-hidden rounded-lg border border-white/10 relative">
            {/* Dark mode overrides for EasyMDE */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .editor-toolbar {
                    background-color: rgba(255, 255, 255, 0.05) !important;
                    border: none !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
                    opacity: 1 !important;
                }
                .editor-toolbar button {
                    color: rgba(255, 255, 255, 0.7) !important;
                }
                .editor-toolbar button.active, .editor-toolbar button:hover {
                    background-color: rgba(255, 255, 255, 0.1) !important;
                    border-color: transparent !important;
                    color: white !important;
                }
                .editor-toolbar i.separator {
                    border-left: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-right: none !important;
                }
                .CodeMirror {
                    background-color: transparent !important;
                    color: rgba(255, 255, 255, 0.9) !important;
                    border: none !important;
                    font-family: inherit !important;
                    font-size: 16px;
                }
                .CodeMirror-cursor {
                    border-left: 1px solid white !important;
                }
                .editor-preview {
                    background-color: var(--color-background) !important;
                    color: rgba(255, 255, 255, 0.9) !important;
                }
            `}} />

            {/* Slide Settings Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex gap-6 items-center flex-wrap">
                <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center justify-between mb-1">
                        <label className="text-xs text-white/50 uppercase tracking-wider font-semibold">Background Image URL</label>
                        <label className="text-xs bg-white text-black px-2 py-0.5 rounded cursor-pointer hover:bg-white/80 transition-colors font-medium">
                            {isUploading ? "Uploading..." : "Upload File"}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileUpload}
                                disabled={isUploading}
                            />
                        </label>
                    </div>
                    <input
                        type="text"
                        value={bgImage}
                        onChange={(e) => setBgImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-white/30 transition-colors"
                        disabled={isUploading}
                    />
                </div>
                <div>
                    <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider font-semibold">Fallback Color</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="w-8 h-8 rounded cursor-pointer bg-transparent border-none p-0"
                        />
                        <span className="text-sm font-mono text-white/70">{bgColor}</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <SimpleMdeReact
                    value={content}
                    onChange={setContent}
                    options={{
                        spellChecker: false,
                        status: false,
                        autosave: { enabled: false, uniqueId: "axion-editor" },
                    }}
                />
            </div>
            <div className="p-4 bg-white/5 border-t border-white/10 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saveStatus === "saving"}
                    className={`px-6 py-2 rounded-md font-semibold transition-colors ${saveStatus === "saved"
                        ? "bg-emerald-500 text-white"
                        : "bg-white text-black hover:bg-white/90 disabled:opacity-50"
                        }`}
                >
                    {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "✓ Saved" : "Save Content"}
                </button>
            </div>
        </div>
    );
}
