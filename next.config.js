/**
 * @type {import('next').NextConfig}
 */

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');
const nextBuildId = require('next-build-id')

const useCDN = ["production", "preview"].includes(process.env.VERCEL_ENV)
// I use this to prefix the next.js files uploaded to the S3 bucket. 
// This will allow me to clean it up periodically without fear of deleting latest code.
let currentPatch = "2.2.6"

if (process.env.VERCEL_ENV == "preview") {
  currentPatch += "-preview";
}

const moduleExports = {
  // New in 16
  turbopack: {},
  output: 'export',
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  experimental: {
    optimizePackageImports: ['styled-components', 'grommet', 'grommet-icons', 'firebase'],
    turbopackFileSystemCacheForDev: true
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
      {
        protocol: 'https',
        hostname: 'community.fastly.steamstatic.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/ads.txt',
        destination: 'https://api.nitropay.com/v1/ads-2146.txt',
        permanent: true,
      },
    ]
  },
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  // Use the CDN in production and unchanged for local and preview.
  assetPrefix: useCDN ? `https://cdn2.idleonefficiency.com/${currentPatch}/` : undefined,
  // uncomment below if you want to test locally using 'serve' -> npx serve@latest out
  //output: "export",
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, {
  silent: true,
  disableServerWebpackPlugin: true,
  sourcemaps: {
    disable: true,
  }
});
