'use client';

import { type GetCurrentUserQuery, sdk } from '@tenx-ui/bff-client';
import React from 'react';

import ReturnBtn from '@/components/ReturnBtn';

import BtnList from './BtnList';
import UserInfo from './UserInfo';
import { useStyles } from './styles';

interface SettingProps {
  userData?: GetCurrentUserQuery;
}

const Setting = React.memo<SettingProps>(() => {
  const { styles } = useStyles();
  const { data } = sdk.useGetCurrentUser();
  return (
    <div className={styles.setting}>
      <div>
        <ReturnBtn />
        <div className={'scrollBar'}>
          <div className={styles.content}>
            <UserInfo user={data?.userCurrent} />
            <BtnList />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Setting;
