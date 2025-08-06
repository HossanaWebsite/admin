
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { error } from 'console'
// import { jwtVerify } from '@edge-runtime/jwt'
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = ['/signin', '/signup', '/testimonial','/access-denied','error-404']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('token')?.value

  console.log("pathName",pathname)
  // console.log("pathName",token)

   // Allow only frontend-originated API requests
  if (pathname.startsWith("/api/")) {
    const referer = req.headers.get("referer") || "";
    const originHeader = req.headers.get("origin") || "";

    console.log(originHeader ,"O header")
    console.log(referer ,"ref")
    console.log("web url",process.env.WEB_URL)

    const allowedOrigin = process.env.WEB_URL || ''; // or your production domain

    // Check if referer or origin header matches allowed origin
    if (referer.startsWith(allowedOrigin) || originHeader === allowedOrigin) {
      return NextResponse.next();
    }

    // Reject requests without proper origin/referrer
    return NextResponse.json({message: "Forbidden" }, { status: 403 });
    // return new Response("Forbidden", { status: 403 });
  }

  // 1. Allow public paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // 2. If not logged in at all
  if (!token) {
    console.log("md1")
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  try {
    // 3. Decode the token and extract role
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    // console.log(payload,payload.role)

    // console.log("decoded00",decoded)

    // 4. Only admin can access protected routes (including "/")
    if (payload?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/access-denied', req.url)) // or show a 403 page if you prefer
    }

    return NextResponse.next()
  } catch (err) {
    console.log("m21",err)
    
    return NextResponse.redirect(new URL('/signin', req.url))
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
