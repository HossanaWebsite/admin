// app/api/auth/signout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set('token', '', { maxAge: 0 });
  return res;
}
