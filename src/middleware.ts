import createMiddleware from 'next-intl/middleware';

import { locales } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'zh',
});

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
