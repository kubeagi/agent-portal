'use server';

import { redirect } from 'next/navigation';
import queryString from 'query-string';

import oidc from '@/config/oidc.mjs';
import { getOriginServerSide } from '@/utils';

// import { getUserData } from '@/app/actions/user';

const { client, server } = oidc;
const { url } = server;
const { client_id, redirect_uri } = client;

export default async function AuthServer() {
  const origin = getOriginServerSide();
  const query = queryString.stringify({
    client_id,
    redirect_uri: `${origin}${redirect_uri}`,
    response_type: 'code',
    scope: 'openid profile email groups offline_access',
  });
  // todo validate
  // const user = await getUserData();
  // if (!user) {
  //   redirect(`${url}/auth?${query}`);
  // }
  redirect(`${url}/auth?${query}`);
}
