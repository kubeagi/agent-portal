'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

import oidc from '@/config/oidc.mjs';

const { client, AUTH_DATA } = oidc;
const { redirect_uri } = client;

export default function Auth() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const code = searchParams.get('code');
  const fetchAuth = async () => {
    fetch(`/oidc/token?code=${code}&redirect_uri=${location.origin}${redirect_uri}`, {
      method: 'POST',
    })
      .then(res => res.json())
      .then(res => {
        if (res.data?.errors) {
          console.warn(res.data?.errors);
          return;
        }
        if (res.data) {
          localStorage.setItem(AUTH_DATA, JSON.stringify(res.data));
          dispatch({
            type: 'SAVE_AUTH_DATA',
            authData: res.data,
          });
          router.push('/chat');
        }
      });
  };
  React.useEffect(() => {
    fetchAuth();
  }, []);
  return <> </>;
}
