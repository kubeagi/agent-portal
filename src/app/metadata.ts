import type { Metadata } from 'next';

import { getOriginServerSide } from '@/utils';

const APP_NAME = 'AgileGPT';
const APP_DEFAULT_TITLE = APP_NAME;
const APP_TITLE_TEMPLATE = '%s - ' + APP_NAME;
const APP_DESCRIPTION = 'Agile GPTs';

const metadata: Metadata = {
  applicationName: APP_NAME,
  metadataBase: new URL('http://localhost:3000'),
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

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const origin = getOriginServerSide();
  return Object.assign(
    metadata,
    origin
      ? {
          metadataBase: new URL(origin),
        }
      : {}
  );
}
