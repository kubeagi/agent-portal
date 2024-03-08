'use client';

import { createStyles } from 'antd-style';
import React from 'react';

export const useStyles = createStyles(({ token }) => ({
  wrapper: {
    height: '100%',
    position: 'relative',
    width: '100%',
    backgroundColor: token.colorBgBase,
  },
}));

export default function EmptyPage({ children }: { children?: React.ReactNode }) {
  const { styles } = useStyles();
  return <div className={styles.wrapper}>{children}</div>;
}
