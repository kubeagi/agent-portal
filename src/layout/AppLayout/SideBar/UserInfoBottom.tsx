'use client';

import { ActionIcon } from '@lobehub/ui';
import { Avatar, Space, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { Moon, Settings, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Flexbox } from 'react-layout-kit';
import { useDispatch, useSelector } from 'react-redux';

const { Text } = Typography;

export const useStyles = createStyles(() => {
  const defaultHeight = '60px';
  return {
    userinfo: {
      lineHeight: defaultHeight,
      height: defaultHeight,
      width: '100%',
      padding: '0 12px',
      overflowY: 'hidden',
      borderTop: '1px solid rgba(0, 0, 0, .06)',
      alignItems: 'center',
      display: 'flex',
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
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
        borderRadius: '12px',
      },
    },
  };
});

function UserInfoBottom() {
  const user = {
    name: 'testtesttesttesttesttesttesttesttesttesttesttest',
  }; // await getUserData()
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const theme = useSelector((store: any) => store.theme);
  const router = useRouter();
  return (
    <Flexbox className={styles.userinfo} distribution={'space-between'} horizontal>
      <div className={styles.username}>
        <Flexbox className={styles.hover} distribution={'start'} horizontal>
          <div className={styles.avator}>
            <Avatar size={28} />
          </div>
          <Text ellipsis>{user.name}</Text>
        </Flexbox>
      </div>
      <div className={styles.icons}>
        <Space>
          <ActionIcon
            icon={theme === 'light' ? Sun : Moon}
            onClick={() => {
              dispatch({
                type: 'TRIGGER_SHEME',
                theme: theme === 'light' ? 'dark' : 'light',
              });
            }}
            style={{
              borderRadius: '12px',
            }}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'}`}
          />
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

export default UserInfoBottom;
