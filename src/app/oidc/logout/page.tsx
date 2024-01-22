'use server';

import oidc from '@/config/oidc.mjs'
import { redirect } from 'next/navigation';

export default async function LogoutServer() {
  const { client, server } = oidc;
  const { redirect_uri, origin } = client;
  const { url } = server;
  redirect(`${url}/oidc/logout/remove-auth-data?redirect=${encodeURIComponent(
    `${url}/oidc/auth?redirect_uri=${origin}${redirect_uri}&response_type=code&scope=openid+profile+email+groups+offline_access`
  )}`);
}
