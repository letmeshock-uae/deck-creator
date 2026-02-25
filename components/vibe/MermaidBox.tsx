"use client";

import { useEffect, useRef, useState, useId } from 'react';
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    fontFamily: "var(--font-google-sans), sans-serif",
});

export default function MermaidBox({ chart }: { chart: string }) {
    const reactId = useId();
    // Mermaid needs HTML valid IDs, so strip colons from useId
    const [id] = useState(`mermaid-${reactId.replace(/:/g, '')}`);
    const [svg, setSvg] = useState<string>('');
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chart && id && elementRef.current) {
            mermaid.render(id, chart)
                .then(({ svg }) => {
                    if (elementRef.current) {
                        elementRef.current.innerHTML = svg;
                    }
                })
                .catch((e) => console.error(e));
        }
    }, [chart, id]);

    return (
        <div
            ref={elementRef}
            className="flex justify-center my-8 p-4 bg-white/5 border border-white/10 rounded-xl"
        />
    );
}
