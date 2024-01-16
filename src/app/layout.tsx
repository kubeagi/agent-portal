import type { Metadata } from 'next';

import GlobalLayout from '@/layout/GlobalLayout';
import StyleRegistry from '@/layout/StyleRegistry';

export const metadata: Metadata = {
  title: 'Agent Portal',
  description: 'Agent Portal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // dir === ltr | rtl
  return (
    <html dir={'ltr'} lang="en">
      <body>
        <StyleRegistry>
          <GlobalLayout>{children}</GlobalLayout>
        </StyleRegistry>
      </body>
    </html>
  );
}
