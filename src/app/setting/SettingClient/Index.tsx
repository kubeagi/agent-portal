'use client';

import React from 'react';

import ReturnBtn from '@/components/ReturnBtn';
import { bffClient } from '@/utils/client';

import BtnList from './BtnList';
import UserInfo from './UserInfo';
import { useStyles } from './styles';

// interface SettingProps {}

const Setting = React.memo(() => {
  const { styles } = useStyles();
  const { data } = bffClient.useGetCurrentUser();
  const user: any = data?.userCurrent;
  return (
    <div className={styles.setting}>
      <div>
        <ReturnBtn />
        <div className={'scrollBar'}>
          <div className={styles.content}>
            <UserInfo user={user} />
            <BtnList />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Setting;
