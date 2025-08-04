import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  testimony: z.string().min(5, "Testimony must be at least 5 characters"),
  pic: z.string().optional().nullable(),
});
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = testimonialSchema.parse(body);

    const testimonial = await prisma.testimonial.create({
      data: {
        name: parsed.name,
        position: parsed.position,
        testimony: parsed.testimony,
        pic: parsed.pic || null,
      },
    });

    return NextResponse.json({ success: true, testimonial }, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create testimonial" },
      { status: 400 }
    );
  }
}
