'use server';

import React from 'react';

import oidc from '@/config/oidc.mjs';
import { getOriginServerSide } from '@/utils';

import Callback from './Callback';

export default async function CallbackServer(props: any) {
  const { searchParams } = props;
  const { code } = searchParams;
  const { redirect_uri } = oidc.client;
  const origin = getOriginServerSide();
  const res = await fetch(
    `${origin}/oidc/token?code=${code}&redirect_uri=${origin}${redirect_uri}`,
    {
      method: 'POST',
    }
  );
  const data = await res?.json();
  return <Callback data={data} />;
}
