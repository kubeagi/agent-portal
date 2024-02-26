import { getTranslations } from 'next-intl/server';
import React from 'react';

import SettingClient from './SettingClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'setting' });
  return {
    title: t('page.geRenSheZhi'),
  };
}

export default async function SettingPage() {
  // swr SSR example, will be removed in the future
  // see https://github.com/vercel/swr/blob/main/examples/server-render/pages/index.js
  // const userData = await sdk
  //   .getCurrentUser(undefined, {
  //     Authorization: 'bearer <id_token>',
  //   })
  //   .catch(error => {
  //     console.warn('getCurrentUser failed', error);
  //   });

  return (
    <>
      <SettingClient />
    </>
  );
}
