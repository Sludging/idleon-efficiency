import { GoogleAnalytics } from '@next/third-parties/google'
import StyledComponentsRegistry from "../lib/registry";
import Script from "next/script";
import { customTheme } from "../lib/grommetTheme";
import { Box, Grommet, Main } from 'grommet';
import { Navigation } from '../components/navigation';
import { HeaderComponent } from '../components/header/header';
import ContentWrapper from '../components/contentWrapper';
import { FooterComponent } from '../components/footer/footer';
import { AuthStoreProvider } from '../lib/providers/authStoreProvider';
import { AppDataStoreProvider } from '../lib/providers/appDataStoreProvider';
import Ramp from '../lib/ramp';
import { WebVitals } from '../components/web-vitals';
import { RouterTracker } from '../components/routerTracker';
import { Suspense } from 'react';

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

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <Suspense>
                    <WebVitals />
                    <RouterTracker />
                </Suspense>
                <StyledComponentsRegistry>
                    <Grommet theme={customTheme} full>
                        <AuthStoreProvider>
                            <AppDataStoreProvider>
                                <Box flex margin={{ horizontal: "auto" }} height={{ min: "100%" }}>
                                    <HeaderComponent />
                                    <Navigation />
                                    <Main>
                                        <ContentWrapper>
                                            {children}
                                        </ContentWrapper>
                                    </Main>
                                    <FooterComponent />
                                </Box>
                            </AppDataStoreProvider>
                        </AuthStoreProvider>
                    </Grommet>
                </StyledComponentsRegistry>
                <GoogleAnalytics gaId="G-RDM3GQEGMB" />
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
            </body>
        </html>
    )
}