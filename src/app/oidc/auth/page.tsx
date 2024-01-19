'use server';

import React from 'react';

import oidc from '@/config/oidc.mjs';

import Auth from './Auth';

export default async function AuthServer() {
  return <Auth oidc={oidc} />;
}
