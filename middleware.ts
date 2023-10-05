// https://nextjs.org/docs/pages/building-your-application/routing/middleware#conditional-statements
import { NextRequest, NextResponse } from 'next/server';

const requiredAuthPaths = ['/admin', '/cart'];
const retrictedAuthPaths = ['/login'];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isPathProtected = requiredAuthPaths
    .concat(retrictedAuthPaths)
    .some((path) => pathname.includes(path));
  const token = req.cookies.get('token');

  if (isPathProtected) {
    const isRequiredAuthPath = requiredAuthPaths.some((path) => pathname.includes(path));

    if (!token && isRequiredAuthPath) {
      const url = new URL(`/login`, req.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }

    const isRetrictedAuthPath = retrictedAuthPaths.some((path) => pathname.includes(path));

    if (token && isRetrictedAuthPath) {
      const url = new URL(`/`, req.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
