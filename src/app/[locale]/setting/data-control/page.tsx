import { getTranslations } from 'next-intl/server';
import React from 'react';

import DataControlClient from './DataControlClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'DataControlClient' });
  return {
    title: t('index.shuJuKongZhi'),
  };
}

export default async function SettingDataControlPage() {
  // const user = await getUserData();
  const props = {
    // user,
  };
  return (
    <>
      <DataControlClient {...props} />
    </>
  );
}
