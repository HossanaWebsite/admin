import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
// get
export async function GET() {
  try {
    const donations = await prisma.donation.findMany({
      orderBy: {
        dateOfDonation: 'desc',
      },
    });

    return NextResponse.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
// post
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const donation = await prisma.donation.create({
      data: {
        donorName: body.donorName,
        amount: body.amount,
        paymentMethod: body.paymentMethod,
        dateOfDonation: new Date(body.dateOfDonation),
        notes: body.notes || null,
      },
    });

    return NextResponse.json(donation, { status: 201 });
  } catch (error) {
    console.error('Error adding donation:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// delete
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await prisma.donation.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Donation deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting donation:", error);
    return NextResponse.json({ error: "Failed to delete donation" }, { status: 500 });
  }
}
