import nextPWA from '@ducanh2912/next-pwa';
import withLess from 'next-with-less';
import analyzer from '@next/bundle-analyzer';

const isProd = process.env.NODE_ENV === 'production';

const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  workboxOptions: {
    skipWaiting: true,
  },
});

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

export default isProd ? withBundleAnalyzer(withPWA(withLess(nextConfig))) : withLess(nextConfig);
