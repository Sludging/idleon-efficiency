// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');
const nextBuildId = require('next-build-id')

const useCDN = ["production", "preview"].includes(process.env.NODE_ENV)
// I use this to prefix the next.js files uploaded to the S3 bucket. 
// This will allow me to clean it up periodically without fear of deleting latest code.
const currentPatch = "2.0.0"

const moduleExports = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  experimental: {
    optimizePackageImports: ['styled-components', 'grommet', 'grommet-icons', 'firebase', 'firebaseui'],
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 604800,
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.idleonefficiency.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.buymeacoffee.com',
      },
    ],
  },
  sentry: {
    hideSourceMaps: true,
    disableServerWebpackPlugin: true,
  },
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  // Use the CDN in production and unchanged for local and preview.
  assetPrefix: useCDN ? `https://cdn2.idleonefficiency.com/${currentPatch}/` : undefined,
  // uncomment below if you want to test locally using 'serve' -> npx serve@latest out
  //output: "export",
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
