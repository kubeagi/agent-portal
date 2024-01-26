import type { GetCurrentUserQuery } from '@tenx-ui/bff-client';
import { Avatar } from 'antd';
import React from 'react';

import { useStyles } from './styles';

interface SettingUserInfoProps {
  user: GetCurrentUserQuery['userCurrent'];
}

const SettingUserInfo = React.memo<SettingUserInfoProps>(({ user }) => {
  const { styles } = useStyles();
  return (
    <div className={styles.userinfo}>
      <Avatar size={100}>{user?.name?.slice(0, 1)?.toUpperCase() || '-'}</Avatar>
      <div className={styles.name}>{user?.name}</div>
      <div className={styles.userid}>id: {user?.name}</div>
    </div>
  );
});

export default SettingUserInfo;
