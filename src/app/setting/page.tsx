import type { Metadata } from 'next';
import React from 'react';

import { getUserData } from '../actions/user';
import SettingClient from './SettingClient/Index';

export const metadata: Metadata = {
  title: '个人设置',
};

export default async function DesktopPage() {
  const user = await getUserData();
  const props = {
    user,
  };
  return (
    <>
      <SettingClient {...props} />
    </>
  );
}
