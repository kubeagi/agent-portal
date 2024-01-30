'use client';

import Axios from 'axios';
import { configure } from 'axios-hooks';

import { AUTH_DATA } from './constants';

export const getAuthData = () => {
  try {
    if (typeof window === 'undefined') throw new Error('should in client side');
    return JSON.parse(localStorage.getItem(AUTH_DATA) || '{}');
  } catch (error) {
    console.warn('getAuthData failed', error);
    return {};
  }
};

export const initAxios = () => {
  const { token } = getAuthData();
  if (!token) return;
  const { token_type, id_token } = token;
  const authHeaders = {
    authorization: `${token_type} ${id_token}`,
  };
  const axios = Axios.create({
    headers: authHeaders,
  });
  configure({ axios });
};
