import type { Metadata } from 'next';
import React from 'react';

import SettingClient from './SettingClient/Index';

export const metadata: Metadata = {
  title: '个人设置',
};

export default async function DesktopPage() {
  return (
    <>
      <SettingClient />
    </>
  );
}
