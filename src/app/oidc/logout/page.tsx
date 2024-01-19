'use client';

import React from 'react';

import oidc from '@/config/oidc.mjs';

const { client, AUTH_DATA, server } = oidc;
const { redirect_uri } = client;
const { url } = server;

export default function Auth() {
  React.useEffect(() => {
    localStorage.removeItem(AUTH_DATA);
    window.location.href = `${url}/oidc/logout/remove-auth-data?redirect=${encodeURIComponent(
      `${url}/oidc/auth?redirect_uri=${location.origin}${redirect_uri}&response_type=code&scope=openid+profile+email+groups+offline_access`
    )}`;
  }, []);
  return <> </>;
}
