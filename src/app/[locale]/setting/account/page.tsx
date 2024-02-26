import { getTranslations } from 'next-intl/server';
import React from 'react';

import oidc from '@/config/oidc.mjs';

import AccountClient from './AccountClient';

const { server } = oidc;
const { url } = server;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'AccountClient' });
  return {
    title: t('index.zhangHaoSheZhi'),
  };
}

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
