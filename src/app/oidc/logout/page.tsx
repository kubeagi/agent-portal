'use server';

import { redirect } from 'next/navigation';

import oidc from '@/config/oidc.mjs';
import { getOriginServerSide } from '@/utils';

export default async function LogoutServer() {
  const origin = getOriginServerSide();
  const { client, server } = oidc;
  const { redirect_uri } = client;
  const { url } = server;
  // todo build render err
  redirect(
    `${url}/logout/remove-auth-data?redirect=${encodeURIComponent(
      `${url}/auth?redirect_uri=${origin}${redirect_uri}&response_type=code&scope=openid+profile+email+groups+offline_access`
    )}`
  );
}
