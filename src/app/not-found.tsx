'use client';

import { Button } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { useStyles } from '../styles/not-found-styles';

const NotFound = () => {
  const { styles } = useStyles();
  const router = useRouter();
  const t = useTranslations('app');
  return (
    <div className={styles.wrapper404}>
      <div className={styles.content}>
        <div className={styles.imgBg}></div>
        <div className={styles.text}>{t('not_found.henBaoQianYeMian')}</div>
        <div className={styles.btn}>
          <Button
            ghost
            onClick={() => {
              router.push(`/chat`);
            }}
            size="large"
            type="primary"
          >
            {t('not_found.fanHuiShouYe')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
