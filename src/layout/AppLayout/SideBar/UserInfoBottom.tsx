'use client';

import { ActionIcon } from '@lobehub/ui';
import { sdk } from '@tenx-ui/bff-client';
import { Avatar, Dropdown, Skeleton, Space, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { Check, Monitor, Moon, Settings, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Flexbox } from 'react-layout-kit';
import { useDispatch, useSelector } from 'react-redux';

const { Text } = Typography;

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
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const theme = useSelector((store: any) => store.theme);
  const router = useRouter();
  const { data } = sdk.useGetCurrentUser();
  const user = data?.userCurrent;
  const getTitle = (type: string, text: string) => {
    if (type === theme) {
      return (
        <span>
          <Check className={styles.checkIcon} />
          {text}
        </span>
      );
    }
    return (
      <span>
        <Check className={styles.hideIcon} />
        {text}
      </span>
    );
  };
  const items = [
    {
      key: 'light',
      label: getTitle('light', '亮色模式'),
    },
    {
      key: 'dark',
      label: getTitle('dark', '黑暗模式'),
    },
    {
      key: 'auto',
      label: getTitle('auto', '跟随系统'),
    },
  ];
  return (
    <Flexbox className={styles.userinfo} distribution={'space-between'} horizontal>
      <div className={styles.username}>
        {user?.name ? (
          <Flexbox className={styles.hover} distribution={'start'} horizontal>
            <div className={styles.avator}>
              <Avatar size={28} />
            </div>
            <Text ellipsis>{user?.name}</Text>
          </Flexbox>
        ) : (
          <div className={styles.skeletonUserinfo}>
            <Skeleton avatar={{ size: 28 }} paragraph={{ rows: 1 }} title={false} />
          </div>
        )}
      </div>
      <div className={styles.icons}>
        <Space>
          <Dropdown
            menu={{
              items,
              onClick: ({ key }) => {
                if (theme === key) return;
                dispatch({
                  type: 'TRIGGER_SHEME',
                  theme: key,
                });
              },
            }}
            placement="top"
          >
            <ActionIcon
              icon={(() => {
                if (theme === 'auto') {
                  return Monitor;
                }
                return theme === 'light' ? Sun : Moon;
              })()}
              onClick={() => {
                if (theme === 'auto') return;
                dispatch({
                  type: 'TRIGGER_SHEME',
                  theme: theme === 'light' ? 'dark' : 'light',
                });
              }}
              style={{
                borderRadius: '12px',
              }}
              // title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'}`}
            />
          </Dropdown>
          <ActionIcon
            icon={Settings}
            onClick={() => {
              router.push('/setting');
            }}
            style={{
              borderRadius: '12px',
            }}
            title={'设置'}
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
