import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Web Gallery is hidden from nav and blocked at the URL layer.
 * See `web-gallerytab.md` in the repo root for how to restore it.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/web' || pathname.startsWith('/web/')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/web', '/web/:path*']
};
