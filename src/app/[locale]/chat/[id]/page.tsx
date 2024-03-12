'use client';

import { createStyles } from 'antd-style';
import dynamic from 'next/dynamic';
import React from 'react';

// import Loading from '@/components/Loading';
// import Conversation from '../(conversation)';

const useStyles = createStyles(({ token, css }) => {
  return {
    containers: css`
      position: relative;
      width: 100%;
      background-color: ${token.colorBgBase};
    `,
  };
});

const Conversation = dynamic(() => import('../(conversation)'), {
  ssr: false, // 禁用服务端渲染
  // loading: () => <Loading loading />,
});

export default function Chat(props: { params: any; searchParams: any }) {
  const { styles } = useStyles();
  return (
    <div className={styles.containers}>
      <Conversation {...props} />
    </div>
  );
}
