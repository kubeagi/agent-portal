'use client';

import { Spin } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';
import { useSelector } from 'react-redux';

export const useStyles = createStyles(({ token }) => ({
  wrapper: {
    'height': '100%',
    'position': 'relative',
    'width': '100%',
    'backgroundColor': token.colorBgBase,
    '.ant-spin-nested-loading': {
      height: '100%',
    },
    '.ant-spin': {
      left: '50% !important',
      position: 'absolute',
      top: '50% !important',
      transform: 'translate(-50%, -50%)',
    },
  },
}));

export default function Loading({
  children,
  loading,
}: {
  children?: React.ReactNode;
  loading?: boolean;
}) {
  const { styles } = useStyles();
  const pageLoading = useSelector((store: any) => store.pageLoading);
  return (
    <div className={styles.wrapper}>
      <Spin spinning={!!pageLoading || loading}>{children}</Spin>
    </div>
  );
}
