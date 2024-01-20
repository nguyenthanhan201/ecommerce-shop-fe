// https://nextjs.org/docs/pages/building-your-application/routing/middleware#conditional-statements
import { NextRequest, NextResponse } from 'next/server';

const requiredAuthPaths = ['/admin', '/cart'];
const retrictedAuthPaths = ['/login'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPathProtected = requiredAuthPaths
    .concat(retrictedAuthPaths)
    .some((path) => pathname.includes(path));
  const token = request.cookies.get('token');

  if (isPathProtected) {
    const isRequiredAuthPath = requiredAuthPaths.some((path) => pathname.includes(path));

    if (!token && isRequiredAuthPath) {
      const url = new URL(`/login`, request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }

    const isRetrictedAuthPath = retrictedAuthPaths.some((path) => pathname.includes(path));

    if (token && isRetrictedAuthPath) {
      const url = new URL(`/`, request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // have to write manual like this because const is not allowed
  matcher: ['/admin/:path*', '/cart', '/login']
};
