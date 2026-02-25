"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/shared/GlassCard";
import Logo from "@/components/shared/Logo";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push("/admin/dashboard");
                router.refresh();
            } else {
                setError("Invalid password");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-primary flex flex-col items-center justify-center p-4">
            <div className="mb-12">
                <Logo />
            </div>

            <GlassCard className="w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 tracking-tight">Admin Access</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            placeholder="Enter password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                            required
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-white text-black font-semibold rounded-lg px-4 py-3 hover:bg-white/90 disabled:opacity-50 transition-colors"
                    >
                        {isLoading ? "Authenticating..." : "Enter"}
                    </button>
                </form>
            </GlassCard>
        </div>
    );
}
