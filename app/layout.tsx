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
            </body>
        </html>
    )
}