// // lib/auth.ts
// // lib/auth.ts
// import jwt from 'jsonwebtoken';
// import { cookies } from 'next/headers';

// export function getUserFromCookie() {
//   const token = cookies().get('token')?.value;
//   if (!token) return null;

//   try {
//     return jwt.verify(token, process.env.JWT_SECRET!) as { userId: number; role: string };
//   } catch {
//     return null;
//   }
// }



import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export function getUserFromCookie() {
  const cookieJar = cookies();
  console.log("cookies() type:", typeof cookieJar);

  const token = cookieJar.get('token')?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: number; role: string };
  } catch {
    return null;
  }
}
