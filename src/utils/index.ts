import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

/**
 * check mobile device in server
 */
export const isMobileDevice = () => {
  if (typeof process === 'undefined') {
    throw new TypeError('[Server method] you are importing a server-only module outside of server');
  }

  const { get } = headers();
  const ua = get('user-agent');

  // console.debug(ua);
  const device = new UAParser(ua || '').getDevice();
  return device.type === 'mobile';
};

export const atob = (encodedData: string) => {
  return Buffer.from(encodedData, 'base64').toString();
};

export const btoa = (stringToEncode: string) => {
  return Buffer.from(stringToEncode).toString('base64');
};

export const getOriginServerSide = () => {
  const heads = headers();
  if (!heads.get('x-forwarded-proto') || !heads.get('host')) {
    throw new Error('get origin err');
  }
  return `${heads.get('x-forwarded-proto')}://${heads.get('host')}`;
};
