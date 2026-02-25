"use client";

import React, { Suspense } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MermaidBox from "./MermaidBox";

interface SlideContentProps {
    content: string;
}

export default function SlideContent({ content }: SlideContentProps) {
    return (
        <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code(props) {
                        const { children, className, node, ...rest } = props;
                        const match = /language-(\w+)/.exec(className || "");
                        const isMermaid = match && match[1] === "mermaid";

                        if (isMermaid) {
                            return (
                                <Suspense fallback={<div className="w-full h-32 animate-pulse bg-white/5 rounded-lg" />}>
                                    <MermaidBox chart={String(children).replace(/\n$/, "")} />
                                </Suspense>
                            );
                        }

                        return (
                            <code {...rest} className={className}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
