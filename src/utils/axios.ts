'use client';

import Axios, { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import useAxios, { Options, UseAxiosResult, configure } from 'axios-hooks';
import merge from 'lodash/merge';
import { useEffect } from 'react';

import { useAxiosConfig } from '@/layout/AxiosConfigLayout';

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

export const createCustomAxios = (configs?: CreateAxiosDefaults): AxiosInstance => {
  const { token } = getAuthData();
  if (!token) {
    throw new Error('create axios instance error');
  }
  const { token_type, id_token } = token;
  const authHeaders = {
    authorization: `${token_type} ${id_token}`,
  };
  const _configs = merge(
    {
      headers: authHeaders,
    },
    configs || {}
  );
  return Axios.create(_configs);
};

export const initAxiosHooks = () => {
  const axios = createCustomAxios();
  configure({ axios });
  return true; // 初始化成功 返回标记
};

export const useAxiosRequest = (
  config: AxiosRequestConfig,
  options?: Options,
  executeConfig?: AxiosRequestConfig,
  executeOptions?: Options
): UseAxiosResult => {
  const { isAxiosConfigured } = useAxiosConfig();
  const _options = Object.assign(
    {
      manual: true, // 手动执行
    },
    options
  );
  const [{ data, loading, error }, execute, manualCancel] = useAxios(config, _options);

  useEffect(() => {
    if (isAxiosConfigured) {
      execute(executeConfig, executeOptions); // 进入页面且 isAxiosConfigured 执行接口调用
    }
  }, [isAxiosConfigured, execute]);

  return [{ data, loading, error }, execute, manualCancel];
};
