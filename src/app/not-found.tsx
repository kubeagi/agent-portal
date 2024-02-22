'use client';

import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { useStyles } from '../styles/not-found-styles';

const NotFound = () => {
  const { styles } = useStyles();
  const router = useRouter();
  return (
    <div className={styles.wrapper404}>
      <div className={styles.content}>
        <div className={styles.imgBg}></div>
        <div className={styles.text}>很抱歉，页面不小心迷路了</div>
        <div className={styles.btn}>
          <Button
            ghost
            onClick={() => {
              router.push('/chat');
            }}
            size="large"
            type="primary"
          >
            返回首页
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
