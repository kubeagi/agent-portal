'use client';

import { LOGIN_REDIRECT } from './constants';

export { sdk as bff } from '@yuntijs/arcadia-bff-sdk';
export { sdk as bffClient } from '@yuntijs/bff-client';

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

interface ParsedToken {
  alg: string;
  kid: string;
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  at_hash: string;
  c_hash: string;
  email: string;
  email_verified: boolean;
  groups: string[];
  name: string;
  preferred_username: string;
}

/**
 * 判断 auth 是否过期。
 * @param {string} id_token token.id_token without last part。
 */

function parseToken(token: string[]): ParsedToken {
  return token
    .map(str => {
      try {
        return JSON.parse(atob(str));
      } catch (error) {
        console.warn('parer token err', error);
      }
      return {};
    })
    .reduce(
      (pr, cu) => ({
        ...pr,
        ...cu,
      }),
      {}
    );
}

export function isTokenExpired(id_token?: string): boolean {
  if (!id_token) {
    return true;
  }
  const id_token_split_arr = (() => {
    const arr = id_token.split('.');
    arr.pop();
    return arr;
  })();
  const expiredTimestampInMs = parseToken(id_token_split_arr).exp * 1000;
  return Date.now() >= expiredTimestampInMs;
}

/**
 * 设置登录 redirect
 * @param {string} redirectUrl: e.g. '/chat'.
 */
export function setLoginRedirect(redirectUrl: string) {
  setCookie(LOGIN_REDIRECT, redirectUrl);
}

/**
 * 获取登录 redirect
 */
export function getLoginRedirect(cookieString: string) {
  return getCookie(cookieString, LOGIN_REDIRECT);
}

/**
 * 移除登录 redirect
 */
export function delLoginRedirect() {
  setCookie(LOGIN_REDIRECT, '', -1);
}
