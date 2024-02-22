import { Metadata } from 'next';
import React from 'react';

import oidc from '@/config/oidc.mjs';

import AccountClient from './AccountClient';

const { server } = oidc;
const { url } = server;

export const metadata: Metadata = {
  title: '账号设置',
};

export default async function SettingAccountPage() {
  const props = {
    url,
  };
  return (
    <>
      <AccountClient {...props} />
    </>
  );
}
