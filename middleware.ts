// https://nextjs.org/docs/pages/building-your-application/routing/middleware#conditional-statements
import { NextRequest, NextResponse } from 'next/server';

const requiredAuthPaths = ['/admin'];
const retrictedAuthPaths = ['/login'];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isPathProtected = requiredAuthPaths
    .concat(retrictedAuthPaths)
    ?.map((path) => pathname.startsWith(path))
    .includes(true);
  const res = NextResponse.next();
  if (isPathProtected) {
    const token = req.cookies.get('token');
    if (!token) {
      const url = new URL(`/login`, req.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }

    if (token) {
      const url = new URL(`/`, req.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }
  return res;
}
