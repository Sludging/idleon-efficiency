import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { css } from 'styled-components';

import { useEffect } from 'react';
import { dark, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { AuthProvider } from '../data/firebase/authContext';
import { AppProvider } from '../data/appContext';

import Script from 'next/script'
import Head from 'next/head'
import { useRouter } from 'next/router'

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
import '../public/icons/assets/sheets/spritesheet_28x36.css';
import '../public/icons/assets/sheets/spritesheet_31x43.css';
import '../public/icons/assets/sheets/spritesheet_34x34.css';
import '../public/icons/assets/sheets/spritesheet_66x66.css';
import '../public/icons/assets/sheets/spritesheet_96x80.css';
import '../public/icons/assets/sheets/spritesheet_43x44.css';
import '../public/icons/assets/sheets/spritesheet_50x50.css';
import '../public/icons/assets/sheets/spritesheet_78x78.css';
import '../public/icons/assets/sheets/spritesheet_20x25.css';
import '../public/icons/assets/sheets/spritesheet_72x72.css';
import '../public/icons/assets/sheets/spritesheet_60x40.css';
import '../public/icons/assets/sheets/spritesheet_62x62.css';
import '../public/icons/assets/sheets/spritesheet_constellations.css';
import Layout from '../components/layout';

import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

const customTheme = deepMerge(dark, {
  global: {
    font: {
      family: "Rubik",
      size: "14px",
    },
    elevation: {
      dark: {
        navigation: '-7px 8px 16px 0 rgba(0,0,0,0.17)',
      }
    },
    colors: {
      text: {
        dark: "#efefef",
        light: '#444444'
      },
      "brand": "#0376E3",
      "accent-1": "#FF3E82",
      "accent-2": "#BEC2CC",
      "accent-3": "#6B747F",
      "accent-4": "#22252B",
      "green-1": "#668e29",
      "orange-1": "#cb4b0f",
      "grey-1": "#30333A",
      "grey-2": "#828D99",
      "grey-3": "#4C4F54",
      "dark-1": "#1E2127",
      "dark-2": "#1B1D24",
      "background": "#1B1D24",
      "white-1": "#30333A",
      "placeholder": "#96979a"
    }
  },
  formField: {
    border: undefined
  },
  button: {
    border: {
      radius: undefined,
    },
    primary: {
      extend: ({}) => css`
        font-size: 16px;
      `
    }
  },
  tab: {
    active: {
      background: 'dark-1',
      color: 'brand',
    },
    border: {
      side: "bottom",
      color: "none",
      active: {
        color: "brand"
      }
    },
    color: 'accent-2',
    extend: ({ }) => css`
      font-size: 16px;
    `,
  },
});

declare const window: Window &
  typeof globalThis & {
    gtag: any
  }

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window.gtag !== 'undefined') {
        window.gtag('config', "G-RDM3GQEGMB", {
          page_path: url,
        })
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }

  }, [router.events])

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <Grommet theme={customTheme} full>
        <AuthProvider>
          <AppProvider>
            <DefaultSeo {...SEO} />
            <Layout>
              <Component {...pageProps} />
            </Layout>
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
