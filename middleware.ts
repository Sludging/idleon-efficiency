import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // No custom logic, do this for EVERYTHING.
    response.headers.set('Cache-Control', 'public, s-maxage=86400, max-age=86400, immutable');
    response.headers.set('CDN-Cache-Control', 'public, s-maxage=86400, max-age=86400, immutable');
    response.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=604800, max-age=604800, immutable');

    return response;
}

export const config = {
    // Match everything except next static files, the favicon and API calls.
    // Also explicitly match on root.
    matcher: [
      '/((?!api|_next/static|favicon.ico).*)',
      '/', // explicit matcher for root route
    ],
  };