
import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate required fields
    if (
      !data.uniqueId ||
      !data.slug ||
      !data.title ||
      !data.summary ||
      !data.url ||
      !data.image ||
      !data.picPath ||
      !data.day ||
      !data.eventName ||
      !data.location ||
      !data.start ||
      !data.end ||
      !data.date ||
      !data.organizer
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check for duplicate uniqueId
    const existingEvent = await prisma.event.findUnique({
      where: { uniqueId: data.uniqueId },
    });

    if (existingEvent) {
      return NextResponse.json(
        { error: "Event with this uniqueId already exists." },
        { status: 409 }
      );
    }

    const createdEvent = await prisma.event.create({
      data: {
        uniqueId: data.uniqueId,
        slug: data.slug,
        title: data.title,
        summary: data.summary,
        url: data.url,
        image: data.image,
        picPath: data.picPath,
        day: data.day,
        eventName: data.eventName,
        location: data.location,
        start: new Date(data.start),
        end: new Date(data.end),
        date: new Date(data.date),
        paragraphs: data.paragraphs || [],
        organizer: data.organizer,
      },
    });

    return NextResponse.json({ success: true, event: createdEvent });
  } catch (error) {
    console.error("POST /api/event error:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}



export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { id: "desc" },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json({ message: "Failed to fetch events." }, { status: 500 });
  }
}
