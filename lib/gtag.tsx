import type { NextWebVitalsMetric } from 'next/app'

declare const window: Window &
    typeof globalThis & {
        gtag: any
    }


export const handleWebVitals = (metric: NextWebVitalsMetric) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', metric.name, {
            // Built-in params:
            value: metric.value, // Use `delta` so the value can be summed.
            // Custom params:
            metric_id: metric.id, // Needed to aggregate events.
            event_label: metric.id, // id unique to current page load
            metric_value: metric.value, // Optional.
            event_startTime: metric.startTime,
            event_category: metric.label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
            non_interaction: true, // avoids affecting bounce rate.
        });
    }
}

export interface EventProps {
    action: string,
    category: string,
    label?: string,
    value: number
}

export const sendEvent = ({ action, category, label, value }: EventProps) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        })
    }
}

export const loginEvent = (method: string) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', "login", {
            method: method
        })
    }
}