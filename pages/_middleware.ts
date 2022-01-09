import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
    const hostname = req.headers.get('host')

    // If localhost, assign the host value manually
    // If prod, get the custom domain/subdomain value by removing the root URL
    // (in the case of "test.vercel.app", "vercel.app" is the root URL)
    const currentHost =
        process.env.NODE_ENV == 'production' && hostname
            ? hostname.replace(`${process.env.ROOT_URL}`, '').replace('.', '')
            : process.env.CURR_HOST
    if (
        !pathname.includes('.') && // exclude all files in the public folder
        !pathname.startsWith('/api') && // exclude all API routes
        currentHost != "" // exclude the base domain
    ) {
        // rewrite to the current hostname under the pages/sites folder
        // the main logic component will happen in pages/sites/[site]/index.tsx
        return NextResponse.rewrite(`/_profile/${currentHost}${pathname}`)
    }
}