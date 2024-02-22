import { Metadata } from 'next';
import React from 'react';

// import { getUserData } from '../../actions/user';
import DataControlClient from './DataControlClient';

export const metadata: Metadata = {
  title: '数据控制',
};

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
