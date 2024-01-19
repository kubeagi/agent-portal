'use server';

import React from 'react';

import oidc from '@/config/oidc.mjs';

import Callback from './Callback';

export default async function CallbackServer() {
  return <Callback redirect_uri={oidc.client.redirect_uri} />;
}
