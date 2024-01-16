import React from 'react';

import { getUserData } from '../actions/user';
import SettingClient from './SettingClient/Index';

export default async function DesktopPage() {
  const user = await getUserData();
  const props = {
    user,
  };
  // todo fetch server data
  return (
    <>
      <SettingClient {...props} />
    </>
  );
}
