'use client';

import { ActionIcon } from '@lobehub/ui';
import { Skeleton, Space } from 'antd';
import { createStyles } from 'antd-style';
import { LogIn } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

export const useStyles = createStyles(({ token }) => {
  const defaultHeight = '60px';
  return {
    userinfo: {
      lineHeight: defaultHeight,
      height: defaultHeight,
      width: '100%',
      padding: '0 12px',
      overflowY: 'hidden',
      borderTop: `1px solid ${token.colorSplit}`,
      alignItems: 'center',
      display: 'flex',
    },
    skeletonUserinfo: {
      'height': defaultHeight,
      'display': 'flex',
      'alignItems': 'center',
      'paddingTop': '15px',
      '.ant-skeleton': {
        'height': '40px',
        'paddingLeft': '12px',
        'display': 'block',
        '.ant-skeleton-header': {
          paddingInlineEnd: '12px',
        },
        '.ant-skeleton-paragraph': {
          marginBottom: 0,
          paddingTop: '7px',
        },
      },
    },
    checkIcon: {
      marginRight: 8,
      verticalAlign: 'bottom',
      width: '15px',
    },
    hideIcon: {
      marginRight: 8,
      verticalAlign: 'bottom',
      width: '15px',
      color: 'rgba(0, 0, 0, 0)',
    },
    icons: {
      textAlign: 'right',
      lineHeight: defaultHeight,
      paddingTop: '10px',
    },
    avator: {
      minWidth: '38px',
    },
    username: {
      width: 'calc(100% - 80px)',
      cursor: 'pointer',
    },
    hover: {
      'height': '40px',
      'lineHeight': '40px',
      'padding': '0 12px',
      '.ant-typography': {
        lineHeight: '40px',
        maxWidth: 'calc(100% - 40px)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '&:hover': {
        color: 'rgba(0, 0, 0, 0.88)',
        backgroundColor: token.controlItemBgHover,
        borderRadius: '12px',
      },
    },
  };
});

export default function UserInfoBottom() {
  const t = useTranslations();
  const { styles } = useStyles();
  const router = useRouter();
  return (
    <Flexbox className={styles.userinfo} distribution={'space-between'} horizontal>
      <div className={styles.username}>
        <div className={styles.skeletonUserinfo}>
          <Skeleton avatar={{ size: 28 }} paragraph={{ rows: 1 }} title={false} />
        </div>
      </div>
      <div className={styles.icons}>
        <Space>
          <ActionIcon
            icon={LogIn}
            onClick={() => {
              router.push('/oidc/auth');
            }}
            style={{
              borderRadius: '12px',
            }}
            title={t('components.index.dengLu')}
          />
          {/* <ActionIcon
            icon={Phone}
            title={'下载应用'}
          /> */}
        </Space>
      </div>
    </Flexbox>
  );
}
