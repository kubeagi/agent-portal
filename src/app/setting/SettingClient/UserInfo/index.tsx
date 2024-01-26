import { User } from '@tenx-ui/bff-client';
import { Avatar } from 'antd';
import React from 'react';

import { useStyles } from './styles';

interface SettingUserInfoProps {
  user: User;
}

const SettingUserInfo = React.memo<SettingUserInfoProps>(({ user }) => {
  const { styles } = useStyles();
  return (
    <div className={styles.userinfo}>
      <Avatar size={100}>V</Avatar>
      <div className={styles.name}>{user?.name}</div>
      <div className={styles.userid}>id: {user?.name}</div>
    </div>
  );
});

export default SettingUserInfo;
