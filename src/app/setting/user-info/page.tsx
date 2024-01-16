import React from 'react';

import { getUserData } from '../../actions/user';
import UserInfoClient from './UserInfoClient';

export default async function DesktopPage() {
  const user = await getUserData();
  const props = {
    user,
  };
  // todo fetch server data
  return (
    <>
      <UserInfoClient {...props} />
    </>
  );
}
