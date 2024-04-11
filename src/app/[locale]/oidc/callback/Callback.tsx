'use client';

import { notification } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

import { delLoginRedirect, getLoginRedirect } from '@/utils/client';
import { AUTH_DATA } from '@/utils/constants';

export default function Callback({ data: res }: { data: any }) {
  const dispatch = useDispatch();
  const t = useTranslations('callback');
  const router = useRouter();
  const saveAuth = async () => {
    const redirectUrl: string = getLoginRedirect(document.cookie);
    if (redirectUrl) {
      delLoginRedirect();
    }
    if (res?.data?.errors || !res?.data) {
      console.warn(res?.data?.errors);
      notification.warning({
        message: t('Callback.renZhengShiBaiQing'),
      });
      setTimeout(() => {
        router.push('/oidc/logout');
      }, 5000);
      return;
    }
    if (res?.data) {
      localStorage.setItem(
        AUTH_DATA,
        JSON.stringify({
          token: res.data,
        })
      );
      dispatch({
        type: 'SAVE_AUTH_DATA',
        authData: res.data,
      });
      router.push(redirectUrl || '/');
    }
  };
  React.useEffect(() => {
    saveAuth();
  }, []);
  return <> </>;
}
