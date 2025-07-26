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
import { WebVitals } from '../components/web-vitals';
import { RouterTracker } from '../components/routerTracker';
import { Suspense } from 'react';
import type { Metadata } from 'next'
import Nitro from '../lib/nitro';

export const metadata: Metadata = {
    metadataBase: new URL(`https://www.idleonefficiency.com`),
    title: { default: "Idleon Efficiency", template: "Idleon Efficiency | %s" },
    description: "A website dedicated to helping players become more efficient in the idle MMO Legends of Idleon.",
    openGraph: {
        type: 'website',
        locale: 'en_us',
        url: 'https://www.idleonefficiency.com/',
        siteName: 'Idleon Efficiency',
        images: [
            {
                url: "https://www.idleonefficiency.com/title-image.png",
                width: 1200,
                height: 627,
                alt: 'Idleon Efficiency',
                type: 'image/png'
            }
        ]
    },
    keywords: ["Idleon", "Idle On", "Idle MMO", "Idle Games"],
    category: "gaming",
    bookmarks: ['https://www.idleonefficiency.com/'],
    other: {
        propeller: "212136656dc025f7fb532bc66fd47bf8",
    },
    alternates: {
        canonical: './',
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode
}) {
    
    const demoAds = process.env.NEXT_PUBLIC_DEMO_ADS === "true";
    
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
                <Nitro demo={demoAds} />
            </body>
        </html>
    )
}
