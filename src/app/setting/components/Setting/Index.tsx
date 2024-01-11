'use client';

import React from 'react';

import { useStyles } from './styles';

interface SettingProps {
  user: {
    name: string;
  };
}

const Setting = React.memo<SettingProps>(({ user }: SettingProps) => {
  const { styles } = useStyles();
  return <div className={styles.setting}>设置 {user.name}</div>;
});

export default Setting;
