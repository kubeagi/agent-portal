import React from 'react';

import { getUserData } from '../actions/user';
import Setting from './components/Setting/Index';

export default async function DesktopPage() {
  const user = await getUserData();
  const props = {
    user,
  };
  return (
    <>
      <Setting {...props} />
    </>
  );
}
