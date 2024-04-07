import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

import { locales } from './i18n';
import { LOCALE } from './utils/constants';

const isProd = process.env.NODE_ENV === 'production';
const APIPrefix = process.env.API_PREFIX;

export default async function middleware(request: NextRequest) {
  if (!isProd && request.nextUrl.pathname.startsWith(APIPrefix)) {
    return;
  }

  const acceptLanguage =
    request.headers.get('accept-language')?.split(';')?.[0]?.split(',')?.[0]?.split('-')?.[0] || '';
  const defaultLocale: string =
    request.cookies.get(LOCALE)?.value || locales.includes(acceptLanguage) ? acceptLanguage : 'en';

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
  });
  const response = handleI18nRouting(request);

  response.headers.set(LOCALE, defaultLocale);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    // '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    // `/(${locales.join('|')})/:path*`,

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',

    // '!(manifest.json)',
  ],
};
