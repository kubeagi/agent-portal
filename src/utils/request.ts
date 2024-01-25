'use client';

import { IOptions, IRequest, IRequestResponse, IUploadRequestOptions } from '@tenx-ui/request';
import RequestCore from '@tenx-ui/request/es/core';
import { mergeHeaders } from '@tenx-ui/request/es/helpers';

import { AUTH_DATA } from './constants';

export type Options = IOptions;

export type UploadRequestOptions = IUploadRequestOptions;

export const getAuthData = () => {
  try {
    if (typeof window === 'undefined') throw new Error('should in client side');
    return JSON.parse(localStorage.getItem(AUTH_DATA) || '{}');
  } catch (error) {
    console.warn('getAuthData failed', error);
    return {};
  }
};

const getFullUrl = (url: string) => {
  if (/^https?:\/\//.test(url)) {
    return url;
  }
  return `${url}`;
};

type addAuthHeadersOptions = Options | UploadRequestOptions;
const addAuthHeaders = <T extends addAuthHeadersOptions>(options: T): T => {
  const authData = getAuthData();
  // 本地存储不存在认证信息时跳过添加认证
  if (!authData || !authData.token) {
    return options;
  }
  // `options.headers` 中已经存在认证信息时跳过添加认证
  options.headers = mergeHeaders(options.headers, {});
  if (options.headers.authorization) {
    return options;
  }
  const { token, project } = authData;
  const { token_type, id_token } = token || {};
  const authHeaders: HeadersInit = {
    authorization: `${token_type} ${id_token}`,
  };
  /* if (process.env.UMI_ENV !== 'prod') {
    // user-portal api
    if (url.indexOf(userPortalApiUrl) === 0) {
      authHeaders.username = username;
      authHeaders.token = token;
    }
  } */
  if (project) {
    authHeaders.project = project;
  }
  options.headers = mergeHeaders(authHeaders, options.headers);
  return options;
};

export interface RequestParams {
  /** 请求地址 */
  url: string;
  /** 请求配置选项 */
  options?: Options;
}
export interface RequestUploadParams {
  /** 上传地址 */
  url: string;
  /** 上传配置选项 */
  options: UploadRequestOptions;
}
export interface RequestInstance<R = false> {
  <T = any>(params: RequestParams): Promise<IRequestResponse<T>>;
  <T = any>(params: RequestParams): Promise<T>;
  upload: (params: RequestParams) => { abort(): void };
  download: RequestInstance<R>;
  get: RequestInstance<R>;
  post: RequestInstance<R>;
  delete: RequestInstance<R>;
  put: RequestInstance<R>;
  patch: RequestInstance<R>;
  head: RequestInstance<R>;
  options: RequestInstance<R>;
  rpc: RequestInstance<R>;
  extendOptions: (options: IOptions) => void;
}
const getRequestInstance = (initOptions: IOptions): RequestInstance => {
  const coreInstance = new RequestCore(initOptions);
  const requestInstance = (params: RequestParams) => {
    let { url, options = {} } = params;
    // url => full url
    url = getFullUrl(url);
    // add auth headers
    options = addAuthHeaders(options, url);
    return coreInstance.request(url, options);
  };

  requestInstance.upload = (params: RequestUploadParams) => {
    let { url, options } = params;
    // url => full url
    url = getFullUrl(url);
    // add auth headers
    options = addAuthHeaders(options, url);
    return coreInstance.upload(url, options);
  };

  requestInstance.download = (params: RequestParams) => {
    let { url, options = {} } = params;
    // url => full url
    url = getFullUrl(url);
    // add auth headers
    options = addAuthHeaders(options, url);
    return coreInstance.download(url, options);
  };

  // 请求语法糖
  const METHODS = ['get', 'post', 'delete', 'put', 'patch', 'head', 'options', 'rpc'];
  for (const method of METHODS) {
    requestInstance[method] = (params: RequestParams) => {
      const { url, options = {} } = params;
      return requestInstance({
        url,
        options: { ...options, method },
      });
    };
  }

  requestInstance.extendOptions = coreInstance.extendOptions.bind(coreInstance);

  return requestInstance as RequestInstance;
};

type IResponse = Response | undefined;

export class ResponseError<D = any> extends Error {
  name: string;
  data: D;
  request: IRequest;
  _response: IResponse;
  response: D;
  type: string;
  status?: number;
  options: IOptions;

  constructor(
    response: IResponse,
    text: string,
    data: D,
    request: IRequest,
    type = 'ResponseError'
  ) {
    super(text || response?.statusText);
    this.name = 'ResponseError';
    this.data = data;
    this.request = request;
    this._response = response;
    this.response = data;
    this.type = type;
    this.status = response?.status;
    this.options = request.options;
  }
}
export default getRequestInstance({
  requestType: 'json',
  parseResponse: true,
  responseType: 'json',
  throwErrIfParseFail: false,
  filterResponseNullKeys: true,
  errorHandler: e => {
    // 兼容老的报错格式
    throw new ResponseError(e.response, 'http error', e.data, e.request, 'HttpError');
  },
});
