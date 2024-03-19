import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { css } from 'styled-components';
import { Rubik } from 'next/font/google';

import { dark, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { AppProvider } from '../data/appContext';

import Script from 'next/script'
import { useRouter } from 'next/router'

import { handleWebVitals } from '../lib/gtag';

import '../public/icons/assets/sheets/spritesheet_colosseums.css';
import Layout from '../components/layout';

import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import { useEffect } from 'react';
import { AuthStoreProvider } from '../lib/providers/authStoreProvider';

const rubik = Rubik({ subsets: ['latin'], weight: ["400", "500", "700"], display: "swap" })

const customTheme = deepMerge(dark, {
  global: {
    font: {
      family: rubik.style.fontFamily,
      size: "14px",
    },
    elevation: {
      dark: {
        navigation: '-7px 8px 16px 0 rgba(0,0,0,0.17)',
        dropdown: 'rgb(1, 4, 9) 0px 8px 24px 0px',
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
      "green-2": "#20DB93",
      "orange-1": "#cb4b0f",
      "grey-1": "#30333A",
      "grey-2": "#828D99",
      "grey-3": "#4C4F54",
      "dark-1": "#1E2127",
      "dark-2": "#1B1D24",
      "dark-3": "#1B1C22",
      "aqua": "#c9fffd",
      "yellow-1": "#ffecc9",
      "background": "#1B1D24",
      "white-1": "#30333A",
      "white-2": "#efefef",
      "placeholder": "#96979a",
      "Common": "#d5d5d5",
      "Uncommon": "#7be08e",
      "Rare": "#7897d5",
      "Epic": "#bc93ff",
      "Legendary": "#e49c5f",
      "blue-1": "#19243A",
      "blue-2": "#283F70",
      "blue-3": "#6dcdff",
      "gold-1": "#ffc142",
      "stamp-positive-1": "#137547",
      "stamp-positive-2": "#054a29",
      "stamp-negative-1": "#d62839",
      "stamp-negative-2": "#780000",
    }
  },
  notification: {
    toast: {
      container: {
        elevation: 'navigation',
        width: 'large',
        background: 'dark-2',
        pad: 'medium',
        border: {
          color: 'grey-1'
        }
      }
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
      extend: ({ }) => css`
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
    _pwGA4PageviewId: string
    dataLayer: any
  }

// Ad related things
var pwUnits = [
  // Disabled for now, I don't like it.
  // {
  //   type: 'bottom_rail'
  // },
  {
    type: 'corner_ad_video'
  },
  {
    type: 'left_rail'
  },
  {
    type: 'right_rail'
  }
]

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
        strategy="afterInteractive"
        src={`https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window._pwGA4PageviewId = ''.concat(Date.now().toString());
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function () {
              window.dataLayer.push(arguments);
            };
            window.gtag('js', new Date());
            window.gtag('config', 'G-RDM3GQEGMB', {
              'send_page_view': false,
              page_path: window.location.pathname
            });
            window.gtag('event', 'ramp_js', {
              'send_to': 'G-RDM3GQEGMB',
              'pageview_id': window._pwGA4PageviewId
            });
        `}}
      />
      <Ramp PUB_ID='1025192' WEBSITE_ID='74808' pwUnits={pwUnits} />
      <Grommet theme={customTheme} full>
        <AuthStoreProvider>
          <AppProvider>
            <DefaultSeo {...SEO} />
              <Layout>
                <Component {...pageProps} />
              </Layout>
          </AppProvider>
        </AuthStoreProvider>
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
