'use client'
 
import { NextWebVitalsMetric } from 'next/app'
import { useReportWebVitals } from 'next/web-vitals'
import { handleWebVitals } from '../lib/gtag';
 
export function WebVitals() {
  useReportWebVitals((metric: NextWebVitalsMetric) => {
    if (process.env.NEXT_PUBLIC_APP_STAGE === 'dev') {
      console.debug(metric);
    }
    else {
      handleWebVitals(metric);
    }
  })

  return <></>
}