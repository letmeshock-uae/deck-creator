import SlideEngineWrapper from "@/components/vibe/SlideEngineWrapper";
import { db } from "@/lib/db";
import { slides } from "@/lib/db/schema";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch active slides, ordered by orderIndex
  const allSlides = await db.select().from(slides).orderBy(slides.orderIndex);

  return <SlideEngineWrapper slides={allSlides} />;
}
