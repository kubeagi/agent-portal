
import config from './src/config/oidc.mjs';
const oidcUrl = config.server.url;
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  compress: isProd,
  typescript: {
    ignoreBuildErrors: true,
  },
  // productionBrowserSourceMaps: true,
  experimental: {
    forceSwcTransforms: true,
    // turbo: { // dev with turbo
    //   rules: {
    //     '*.svg': {
    //       loaders: ['@svgr/webpack'],
    //       as: '*.js',
    //     },
    //   },
    // },
    webVitalsAttribution: ['CLS', 'LCP']
  },
  images: {
    unoptimized: !isProd,
  },
  reactStrictMode: true,
  transpilePackages: ['antd', '@ant-design', 'antd-style', '@lobehub/ui', 'antd-mobile'],
  // async rewrites() {
  //   return [
  //     {
  //       source: '/oidc/token',
  //       destination: `${oidcUrl}/oidc/token`,
  //       secure: false,
  //     },
  //   ]
  // },
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    // to fix shikiji compile error
    // refs: https://github.com/antfu/shikiji/issues/23
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
}

export default nextConfig
