// import { sdk } from '@tenx-ui/bff-client';
import type { Metadata } from 'next';
import React from 'react';

import SettingClient from './SettingClient';

export const metadata: Metadata = {
  title: '个人设置',
};

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
