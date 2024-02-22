import type { Viewport } from 'next';
import { cookies, headers } from 'next/headers';

import AppLayout from '@/layout/AppLayout';
import AxiosConfigLayout from '@/layout/AxiosConfigLayout';
import GlobalLayout from '@/layout/GlobalLayout';
import PWAHandlerLayout from '@/layout/PWAHandlerLayout';
import StyleRegistry from '@/layout/StyleRegistry';

export { generateMetadata } from './metadata';

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // dir === ltr | rtl
  const { get } = headers();
  const locale = get('accept-language');
  return (
    <html dir={'ltr'} lang="en">
      <body>
        <PWAHandlerLayout>
          <AxiosConfigLayout>
            <StyleRegistry>
              <GlobalLayout locale={locale} theme={cookies().get('theme')?.value || 'auto'}>
                <AppLayout>{children}</AppLayout>
              </GlobalLayout>
            </StyleRegistry>
          </AxiosConfigLayout>
        </PWAHandlerLayout>
      </body>
    </html>
  );
}
