import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // No custom logic, do this for EVERYTHING.
    response.headers.set('Cache-Control', 'public, max-age=604800, immutable');

    return response;
}

export const config = {
    // Match literally every path.
    matcher: ['/*'],
};