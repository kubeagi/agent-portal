'use client';

import { Button } from 'antd';
import { createStyles } from 'antd-style';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';

export const useStyles = createStyles(() => {
  const defaultHeight = '40px';
  return {
    noauthBottomWrapper: {
      lineHeight: defaultHeight,
      width: '100%',
      padding: '8px 12px 0 12px',
      overflowY: 'hidden',
    },
    loginBtn: {
      'width': '100%',
      'marginBottom': 8,
      '.ant-btn': {
        width: '100%',
      },
    },
    others: {
      marginBottom: 8,
    },
    icons: {
      textAlign: 'right',
      lineHeight: defaultHeight,
      height: defaultHeight,
    },
    aboutus: {
      width: 'calc(100% - 80px)',
      cursor: 'pointer',
    },
  };
});

export default function UserInfoBottom() {
  const t = useTranslations();
  const { styles } = useStyles();
  const router = useRouter();
  return (
    <div className={styles.noauthBottomWrapper}>
      <div className={styles.loginBtn}>
        <Button
          onClick={() => {
            router.push('/oidc/auth');
          }}
          size="large"
          type="primary"
        >
          {t('components.index.dengLu')}
        </Button>
      </div>
      {/* <Flexbox
        className={styles.others}
        distribution={'space-between'} horizontal
      >
        <div className={styles.aboutus}>
          aboutus
        </div>
        <div className={styles.icons}>
          <Space>
            <ActionIcon
              icon={Phone}
              title={'下载应用'}
            />
          </Space>
        </div>
      </Flexbox> */}
    </div>
  );
}
