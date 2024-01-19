'use client';

import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import React from 'react';

import oidc from '@/config/oidc.mjs';

const { client, server, AUTH_DATA } = oidc;
const { url } = server;
const { client_id, redirect_uri } = client;

export default function Auth() {
  const router = useRouter();
  React.useEffect(() => {
    const authData = localStorage.getItem(AUTH_DATA);
    if (authData) {
      // todo validate auth
      router.push('/chat');
      return;
    }
    const query = queryString.stringify({
      client_id,
      redirect_uri: `${window.location.origin}${redirect_uri}`,
      response_type: 'code',
      scope: 'openid profile email groups offline_access',
    });
    window.location.href = `${url}/oidc/auth?${query}`;
  }, []);
  return <> </>;
}
