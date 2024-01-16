'use client';

import React from 'react';

import ReturnBtn from '@/components/ReturnBtn';

import BtnList from './BtnList';
import UserInfo from './UserInfo';
import { useStyles } from './styles';

interface SettingProps {
  user: {
    name: string;
  };
}

const Setting = React.memo<SettingProps>(({ user }: SettingProps) => {
  const { styles } = useStyles();
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
