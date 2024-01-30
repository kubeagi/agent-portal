'use server';

import axios from 'axios';
import https from 'https';
import { type NextRequest, NextResponse } from 'next/server';

import oidc from '@/config/oidc.mjs';
import { btoa } from '@/utils';

const { client, server } = oidc;
const { url } = server;
const { client_id, client_secret } = client;

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const redirect_uri = searchParams.get('redirect_uri');
  const body = {
    grant_type: 'authorization_code',
    code,
    redirect_uri,
  };
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  const res: any = await axios.post(`${url}/token`, body, {
    headers: {
      'Authorization': `Basic ${btoa(`${client_id}:${client_secret}`)}`,
      'Content-Type': 'application/json',
    },
    httpsAgent,
    timeout: 10_000,
  });
  return NextResponse.json({ data: res.data });
}
