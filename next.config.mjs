import nextPWA from '@ducanh2912/next-pwa';
import analyzer from '@next/bundle-analyzer';
import { execSync } from 'child_process';
import webpack from 'webpack';
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

const getLastCommitHash = () => {
  try {
    return execSync('git rev-parse HEAD').toString().trim();
  } catch (error) {
    console.warn('Get last commit hash faild =>', error);
    return '-';
  }
};

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


/**
* Licensed Materials
* (C) Copyright 2024 KubeAGI. All Rights Reserved.
* @date 1702870032801
* @hash 72dd15d6d9b660cb4f7b47c2374332bf10afc7e7
*/

// const site = 'k8s.com.cn';
const bannerFlag = 'Licensed Materials'; // `Licensed Materials - Property of ${site}`;
const banner = `${bannerFlag}
(C) Copyright 2024 KubeAGI. All Rights Reserved.
@date ${Date.now()}
@hash ${getLastCommitHash()}`; 

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
  reactStrictMode: isProd,
  transpilePackages: ['antd', '@ant-design', 'antd-style', '@lobehub/ui', 'antd-mobile'],
  webpack: (config, { isServer }) => {
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
    if (!isServer) { // client side
      config.plugins.push(new webpack.BannerPlugin({
        banner,
        exclude: /\.svg$/,
      }));
    }

    return config;
  },
}

export default isProd ?
  withBundleAnalyzer(withPWA(withNextIntl(nextConfig)))
  :
  withNextIntl(nextConfig);
