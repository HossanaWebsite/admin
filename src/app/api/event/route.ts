// app/api/events/route.ts (if using App Router)
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const event = await prisma.event.create({
      data: {
        uniqueId: body.slug,
        slug: body.slug,
        title: body.title,
        eventName: body.title,
        summary: body.summary,
        url: body.url,
        image: body.image,
        picPath: body.image,
        day: body.day, // like 'Feb 15'
        date: new Date(body.date), // e.g. '2025-02-15T13:00:00'
        start: new Date(body.start), // e.g. '2025-02-15T13:00:00'
        end: new Date(body.end),     // e.g. '2025-02-15T16:00:00'
        location: body.location,
        organizer: body.organizer, // must be object { phone, email }
        paragraphs: body.paragraphs, // must be array of strings
        isActive: body.isActive ?? true,
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
