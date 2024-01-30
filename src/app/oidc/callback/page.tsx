'use server';

import axios from 'axios';
import https from 'https';
import React from 'react';

import oidc from '@/config/oidc.mjs';
import { getOriginServerSide } from '@/utils';

import Callback from './Callback';

export default async function CallbackServer(props: any) {
  const { searchParams } = props;
  const { code } = searchParams;
  const { redirect_uri } = oidc.client;
  const origin = getOriginServerSide();
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  const res: any = await axios.post(
    `${origin}/oidc/token?code=${code}&redirect_uri=${origin}${redirect_uri}`,
    {},
    {
      httpsAgent,
    }
  );
  return <Callback data={res?.data} />;
}
