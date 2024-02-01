'use client';

export { sdk as bffClient } from '@tenx-ui/bff-client';
export { sdk as bff } from '@yuntijs/arcadia-bff-sdk';

export const getCookie = (cookieString: string, cookieName: string) => {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(cookieString);
  const ca = decodedCookie.split(';');

  for (const cookie of ca) {
    const c = cookie.trim();
    if (c.startsWith(name)) {
      return c.slice(name.length);
    }
  }
  return '';
};

/**
 * 设置一个 cookie。
 * @param {string} name Cookie 的名称。
 * @param {string} value Cookie 的值。
 * @param {number} [days] Cookie 的过期时间（天数）。如果不设置，默认为会话 Cookie。
 * @param {string} [path] Cookie 的路径。默认为根路径 '/'。
 */
export const setCookie = (name: string, value: string, days?: number, path?: string) => {
  let expires = '';

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days || 1) * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  if (typeof window.document === 'object') {
    // eslint-disable-next-line unicorn/no-document-cookie
    window.document.cookie = `${name}=${value}${expires}; path=${path || '/'}`;
  }
};
