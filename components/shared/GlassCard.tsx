import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export default function GlassCard({ children, className, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "glass-panel rounded-3xl p-8 backdrop-blur-2xl transition-all duration-300",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
