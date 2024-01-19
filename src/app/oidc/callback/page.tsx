'use server';

import React from 'react';
import oidc from '@/config/oidc.mjs';
import Callback from './Callback';

export default async function CallbackServer({ searchParams }: any) {
  const { code } = searchParams;
  const { origin, redirect_uri } = oidc.client
  const res = await fetch(`${origin}/oidc/token?code=${code}&redirect_uri=${origin}${redirect_uri}`, {
    method: 'POST',
  });
  const data = await res.json();
  return <Callback data={data} />;
}
