import type { Viewport } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { cookies } from 'next/headers';
import Script from 'next/script';
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
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`(function() {
  const setCookie = (name, value, days, path) => {
    let expires = '';
  
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days || 1) * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    if (typeof window.document === 'object') {
      // eslint-disable-next-line unicorn/no-document-cookie
      window.document.cookie = name + "=" + value + expires + "; path=" + (path || '/');
    }
  };
  if (window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setCookie('client_theme', 'dark');
  } else {
    setCookie('client_theme', 'light');
  }
})();`}
        </Script>
      </head>
      <body>
        <PWAHandlerLayout>
          <AxiosConfigLayout>
            <AuthLayout>
              <StyleRegistry>
                <NextIntlClientProvider locale={locale} messages={messages}>
                  <GlobalLayout
                    client_theme={cookies().get('client_theme')?.value}
                    locale={locale}
                    theme={cookies().get('theme')?.value || 'auto'}
                  >
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
