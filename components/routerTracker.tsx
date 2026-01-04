"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function RouterTracker() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleRouteChange = (url: string) => {
        if (typeof window.gtag !== 'undefined') {
            window.gtag('config', "G-RDM3GQEGMB", {
                page_path: url,
            })
        }
    }
    useEffect(() => {
        const url = pathname + (searchParams?.toString() ?? "")
        handleRouteChange(url)
    }, [pathname, searchParams])

    return <></>
}
