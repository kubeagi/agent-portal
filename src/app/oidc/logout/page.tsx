'use server';

import React from 'react';

import oidc from '@/config/oidc.mjs';

import Logout from './Logout';

export default async function LogoutServer() {
  return <Logout oidc={oidc} />;
}
