import React from 'react';

import { getUserData } from '../../actions/user';
import DataControlClient from './DataControlClient';

export default async function DesktopPage() {
  const user = await getUserData();
  const props = {
    user,
  };
  // todo fetch server data
  return (
    <>
      <DataControlClient {...props} />
    </>
  );
}
