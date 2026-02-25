import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { slides } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export async function GET() {
    try {
        const data = await db.select().from(slides).orderBy(slides.orderIndex);
        return NextResponse.json(data);
    } catch (error) {
        console.error("GET slides error", error);
        return NextResponse.json({ error: "Failed to fetch slides" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newSlide = {
            id: crypto.randomUUID(),
            title: body.title || "New Slide",
            contentMarkdown: body.contentMarkdown || "# Hello",
            backgroundImageUrl: body.backgroundImageUrl || "",
            backgroundColor: body.backgroundColor || "",
            orderIndex: body.orderIndex || 0,
        };

        // SQLite doesn't natively return the inserted row like Postgres using .returning()
        // So we insert, then fetch, or just return the object we built.
        await db.insert(slides).values(newSlide);
        return NextResponse.json(newSlide);
    } catch (error) {
        console.error("POST slide error", error);
        return NextResponse.json({ error: "Failed to create slide" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...updateData } = body;

        await db.update(slides)
            .set(updateData)
            .where(eq(slides.id, id));

        // Fetch it back to return the updated record
        const updated = await db.select().from(slides).where(eq(slides.id, id)).get();
        return NextResponse.json(updated);
    } catch (error) {
        console.error("PUT slide error", error);
        return NextResponse.json({ error: "Failed to update slide" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await db.delete(slides).where(eq(slides.id, id));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE slide error", error);
        return NextResponse.json({ error: "Failed to delete slide" }, { status: 500 });
    }
}
