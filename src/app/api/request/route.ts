import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const requests = await prisma.memberRequest.findMany({
      orderBy: { id: "desc" },
    });

    const formattedRequests = requests.map((req:any) => ({
      ...req,
      fullname: `${req.firstName} ${req.lastName}`,
    }));

    return NextResponse.json(formattedRequests);
  } catch (error) {
    console.error("Failed to fetch requests:", error);
    return NextResponse.json(
      { message: "Error fetching requests" },
      { status: 500 }
    );
  }
}
