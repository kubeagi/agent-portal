import { getTranslations } from 'next-intl/server';
import React from 'react';

import UserInfoClient from './UserInfoClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'BtnList' });
  return {
    title: t('index.geRenZiLiao'),
  };
}

export default async function UserinfoPage() {
  const props = {};
  return (
    <>
      <UserInfoClient {...props} />
    </>
  );
}
