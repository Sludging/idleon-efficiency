import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@200&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@800&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@650&display=swap" rel="stylesheet" />
                    <script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"></script>
                    {/* <link rel="icon" href="/favicon.ico" /> */}
                    <meta
                        name="description"
                        content="Idleon Efficiency Website"
                    />
                    <meta name="og:title" content="Idleon Efficiency" />
                    <meta name="twitter:card" content="summary_large_image" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;