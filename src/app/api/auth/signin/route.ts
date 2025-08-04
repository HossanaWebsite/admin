// app/api/auth/signin/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.isActive) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const res = NextResponse.json({ success: true });

  res.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
