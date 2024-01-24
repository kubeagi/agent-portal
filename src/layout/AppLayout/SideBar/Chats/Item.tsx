'use client';

import { GoogleOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

import { DEFAULT_CHAT } from '@/utils/constants';

export const useStyles = createStyles(({ token }) => {
  const activeStyle = {
    color: 'black',
    backgroundColor: 'rgba(0, 0, 0, .06)',
    transition: 'all .15s',
  };
  return {
    chatItem: {
      'alignItems': 'center',
      'borderRadius': '16px',
      'display': 'flex',
      'flexShrink': '0',
      'height': '74px',
      'overflow': 'visible',
      'padding': '0 12px',
      'position': 'relative',
      'color': 'black',
      '&:hover': activeStyle,
      '&:not(:first-child)': {
        marginTop: 1,
      },
    },
    activeItem: activeStyle,
    icon: {
      'display': 'flex',
      '.anticon': {
        fontSize: 48,
        color: token.colorPrimary,
      },
    },
    content: {
      flex: '1 1 0%',
    },
    title: {
      alignItems: 'center',
      display: 'flex',
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '24px',
    },
    msg: {
      color: '#666',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '24px',
    },
  };
});

const CHAT_OTHER_PAGES = new Set(['/chat/bot/create']);
interface Props {
  data: {
    key: string;
    value: string;
  };
}

const ChatItem: any = (props: Props) => {
  const { data } = props;
  const { styles } = useStyles();
  const { id: activeChat } = useParams();
  const pathname = usePathname();
  const isChatPage = pathname.startsWith('/chat') && !CHAT_OTHER_PAGES.has(pathname);
  const isDefaultChat = data.key === DEFAULT_CHAT;
  return (
    <Link
      className={classNames(
        styles.chatItem,
        isChatPage &&
          (activeChat === data.key || (!activeChat && isDefaultChat) ? styles.activeItem : '')
      )}
      href={isDefaultChat ? '/chat' : `/chat/${data.key}`}
    >
      <Flex align={'center'} gap={8} justify={'space-between'}>
        <div className={styles.icon}>
          <GoogleOutlined />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{data.key}</div>
          <Typography.Text className={styles.msg} ellipsis>
            {data.value}
          </Typography.Text>
        </div>
      </Flex>
    </Link>
  );
};

export default ChatItem;
