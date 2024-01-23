import type { Metadata } from 'next';

import oidc from '@/config/oidc.mjs';

const {
  client: { origin },
} = oidc;

const APP_NAME = 'AgileGPT';
const APP_DEFAULT_TITLE = APP_NAME;
const APP_TITLE_TEMPLATE = '%s - ' + APP_NAME;
const APP_DESCRIPTION = 'Agile GPTs';

const metadata: Metadata = {
  applicationName: APP_NAME,
  metadataBase: new URL(origin || 'http://localhost:3000'),
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    // metadataBase: 'https://tenxcloud.com',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export default metadata;
