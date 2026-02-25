import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "@vercel/postgres";

export async function GET() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS "settings" (
                "id" text PRIMARY KEY NOT NULL,
                "logo_url" text,
                "admin_password_hash" text,
                "updated_at" timestamp
            );
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS "slides" (
                "id" text PRIMARY KEY NOT NULL,
                "title" text NOT NULL,
                "content_markdown" text NOT NULL,
                "background_image_url" text,
                "background_color" text,
                "order_index" integer DEFAULT 0 NOT NULL,
                "is_active" boolean DEFAULT true,
                "created_at" timestamp DEFAULT now()
            );
        `;

        return NextResponse.json({ success: true, message: "Tables created successfully" });
    } catch (error: any) {
        console.error("Init DB error", error);
        return NextResponse.json({ error: "Failed to initialize db", details: error?.message || String(error) }, { status: 500 });
    }
}
