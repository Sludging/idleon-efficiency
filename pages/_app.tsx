import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { dark, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { AuthProvider } from '../data/firebase/authContext';
import { AppProvider } from '../data/appContext';

import Script from 'next/script'
import Head from 'next/head'

import { handleWebVitals } from '../lib/gtag';

import '../public/icons/assets/sheets/spritesheet_36x36.css';
import '../public/icons/assets/sheets/spritesheet_70x70.css';
import '../public/icons/assets/sheets/spritesheet_21x21.css';
import '../public/icons/assets/sheets/spritesheet_23x27.css';
import '../public/icons/assets/sheets/spritesheet_38x36.css';
import '../public/icons/assets/sheets/spritesheet_41x50.css';
import '../public/icons/assets/sheets/spritesheet_56x56.css';
import '../public/icons/assets/sheets/spritesheet_88x76.css';
import '../public/icons/assets/sheets/spritesheet_43x43.css';

const customTheme = deepMerge(dark, {
  tab: {
    active: {
      background: 'dark-1',
      color: 'accent-1',
    },
    color: 'grey'
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter()

  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     if (typeof window.gtag !== 'undefined') {
  //       window.gtag('config', "G-RDM3GQEGMB", {
  //         page_path: url,
  //       })
  //     }
  //   }
  //   router.events.on('routeChangeComplete', handleRouteChange)
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //   }
  // }, [router.events])

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-RDM3GQEGMB`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RDM3GQEGMB', {
                page_path: window.location.pathname,
              });
            `,
        }}
      />
      <Head>
        <title>Idleon Efficiency</title>
      </Head>
      <Grommet theme={customTheme} full>
        <AuthProvider>
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
        </AuthProvider>
      </Grommet>
    </>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (process.env.NEXT_PUBLIC_APP_STAGE === 'dev') {
    console.debug(metric);
  }
  else {
    handleWebVitals(metric);
  }
}


export default MyApp
