import { UserOutlined } from '@ant-design/icons';
import type { GetCurrentUserQuery } from '@yuntijs/bff-client';
import { Avatar, Skeleton } from 'antd';
import classNames from 'classnames';
import React from 'react';

import { useStyles } from './styles';

interface SettingUserInfoProps {
  user: GetCurrentUserQuery['userCurrent'];
}

const SettingUserInfo = React.memo<SettingUserInfoProps>(({ user }) => {
  const { styles } = useStyles();
  return user?.name ? (
    <div className={styles.userinfo}>
      <Avatar icon={<UserOutlined />} size={100} />
      <div className={styles.name}>{user?.name}</div>
      <div className={styles.userid}>id: {user?.name}</div>
    </div>
  ) : (
    <div className={styles.userinfo}>
      <Skeleton
        avatar={{ size: 100 }}
        className={styles.avatorSkeleton}
        paragraph={false}
        title={false}
      />
      <Skeleton className={classNames(styles.name, styles.emptyline)} paragraph={false} />
      <Skeleton
        className={classNames(styles.emptylineUserid, styles.emptyline)}
        paragraph={false}
      />
    </div>
  );
});

export default SettingUserInfo;
