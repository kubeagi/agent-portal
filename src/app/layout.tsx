import type { Viewport } from 'next';

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
  return (
    <html dir={'ltr'} lang="en">
      <body>
        <StyleRegistry>
          <GlobalLayout>
            <PWAHandlerLayout>{children}</PWAHandlerLayout>
          </GlobalLayout>
        </StyleRegistry>
      </body>
    </html>
  );
}
