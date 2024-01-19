'use server';

import oidc from '@/config/oidc.mjs';
import queryString from 'query-string';
import { redirect } from 'next/navigation';
// import { getUserData } from '@/app/actions/user';

const { client, server } = oidc;
const { url } = server;
const { client_id, redirect_uri, origin } = client;

export default async function AuthServer() {
  const query = queryString.stringify({
    client_id,
    redirect_uri: `${origin}${redirect_uri}`,
    response_type: 'code',
    scope: 'openid profile email groups offline_access',
  });
  // todo validate
  // const user = await getUserData();
  // if (!user) {
  //   redirect(`${url}/oidc/auth?${query}`);
  // }
  redirect(`${url}/oidc/auth?${query}`);
}
