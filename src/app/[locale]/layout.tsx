import type { Viewport } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { cookies } from 'next/headers';
import React from 'react';

import AppLayoutTemplate from '@/layout/AppLayoutTemplate';
import AuthLayout from '@/layout/AuthLayout';
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

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();
  // dir === ltr | rtl
  return (
    <html dir={'ltr'} lang={locale}>
      <body>
        <PWAHandlerLayout>
          <AxiosConfigLayout>
            <AuthLayout>
              <StyleRegistry>
                <NextIntlClientProvider locale={locale} messages={messages}>
                  <GlobalLayout locale={locale} theme={cookies().get('theme')?.value || 'auto'}>
                    <AppLayoutTemplate>{children}</AppLayoutTemplate>
                  </GlobalLayout>
                </NextIntlClientProvider>
              </StyleRegistry>
            </AuthLayout>
          </AxiosConfigLayout>
        </PWAHandlerLayout>
      </body>
    </html>
  );
}
