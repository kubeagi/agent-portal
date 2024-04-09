'use client';

import { Button } from 'antd';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { useStyles } from '../../styles/not-found-styles';

const NotFound = () => {
  const { styles } = useStyles();
  const router = useRouter();
  const t = useTranslations('app');
  return (
    <div className={styles.wrapper404}>
      <div className={styles.content}>
        <div className={styles.imgBg}>
          <Image alt={'404'} height={420} src={'/404/404.jpg'} width={500} />
        </div>
        <div className={styles.text}>{t('not_found.henBaoQianYeMian')}</div>
        <div className={styles.btn}>
          <Button
            ghost
            onClick={() => {
              router.push(`/`);
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
