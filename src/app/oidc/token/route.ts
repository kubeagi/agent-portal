'use server';

import https from 'https';
import { type NextRequest, NextResponse } from 'next/server';
import fetch, { RequestInit } from 'node-fetch';

import oidc from '@/config/oidc.mjs';
import { btoa } from '@/utils';

const { client, server } = oidc;
const { url } = server;
const { client_id, client_secret } = client;

function fetchWithTimeout(url: string, options: RequestInit, timeout = 3000) {
  const fetchPromise = fetch(url, options);
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Request timed out'));
    }, timeout);
  });
  return Promise.race([fetchPromise, timeoutPromise]);
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const redirect_uri = searchParams.get('redirect_uri');
  const body = {
    grant_type: 'authorization_code',
    code,
    redirect_uri,
  };
  const res: any = await fetchWithTimeout(
    `${url}/token`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${client_id}:${client_secret}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      agent: new https.Agent({
        rejectUnauthorized: false,
      }),
    },
    10_000
  );
  const data = await res.json();
  return NextResponse.json({ data });
}
