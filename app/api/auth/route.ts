import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { password } = await request.json();
        const correctPassword = process.env.ADMIN_PASSWORD || "theDatum2026!";

        if (password === correctPassword) {
            const response = NextResponse.json({ success: true });
            response.cookies.set({
                name: "axion_admin_auth",
                value: "true",
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 1 week
            });
            return response;
        }

        return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
