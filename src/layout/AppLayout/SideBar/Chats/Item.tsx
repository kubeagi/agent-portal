'use client';

import { EllipsisOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, MenuProps, Typography } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { MinusCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

import { DEFAULT_CHAT } from '@/utils/constants';

export const useStyles = createStyles(({ token }) => {
  const activeStyle = {
    color: token.colorTextBase,
    backgroundColor: token.controlItemBgHover,
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
      'color': token.colorTextBase,
      '&:hover': activeStyle,
      '&:hover .showBtn': {
        display: 'block',
      },
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
      display: 'flex',
      flexDirection: 'column',
      flexGrow: '1',
      overflow: 'hidden',
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '24px',
    },
    msg: {
      color: token.colorTextSecondary,
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '24px',
    },
    itemBtn: {
      'display': 'none',
      'position': 'absolute',
      'top': '20px',
      'right': '25px',
      '.ant-btn': {
        'padding': '4px 10px',
        'border': 'unset',
        'boxShadow': '0 1px 8px 0 rgba(0,0,0,.12)',
        '.anticon': {
          color: 'black',
          transform: 'scale(1.5)',
        },
      },
    },
    dropmenus: {
      '.ant-btn-link': {
        'padding': 0,
        '.ant-btn-icon': {
          verticalAlign: 'bottom',
        },
      },
    },
  };
});

interface Props {
  data: {
    id: string;
    title: string;
    desc: string;
    app_namespace: string;
    app_name: string;
  };
}

const ChatItem: any = (props: Props) => {
  const { data } = props;
  const { styles } = useStyles();
  const { id: activeChat, locale } = useParams();
  const pathname = usePathname();
  const CHAT_OTHER_PAGES = React.useMemo(() => new Set([`/${locale}/chat/bot/create`]), [locale]);
  const isChatPage = pathname.startsWith(`/${locale}/chat`) && !CHAT_OTHER_PAGES.has(pathname);
  const isDefaultChat = data.id === DEFAULT_CHAT;

  const items: MenuProps['items'] = React.useMemo(
    () => [
      {
        key: '1',
        label: (
          <Button
            danger
            icon={<MinusCircle size={18} />}
            onClick={e => {
              e.preventDefault();
              // console.log('del conver' + data.id) // todo
            }}
            type="link"
          >
            删除对话
          </Button>
        ),
      },
    ],
    [data]
  );
  const id = 'chatItem' + data.id;
  return (
    <Link
      className={classNames(
        styles.chatItem,
        isChatPage &&
          (activeChat === data.id || (!activeChat && isDefaultChat) ? styles.activeItem : '')
      )}
      href={
        isDefaultChat
          ? `/${locale}/chat`
          : `/${locale}/chat/${data.id}?appName=${data.app_name}&appNamespace=${data.app_namespace}`
      }
      id={id}
    >
      <Flex
        align={'center'}
        gap={8}
        justify={'space-between'}
        style={{
          maxWidth: '100%',
        }}
      >
        <div className={styles.icon}>
          <GoogleOutlined />
        </div>
        <div className={styles.content}>
          <Typography.Paragraph className={styles.title} ellipsis>
            {data.title}
          </Typography.Paragraph>
          <Typography.Paragraph className={styles.msg} ellipsis>
            {data.desc}
          </Typography.Paragraph>
          {isDefaultChat ? null : (
            <div className={classNames(styles.itemBtn, 'showBtn')}>
              <Dropdown
                getPopupContainer={() => document.querySelector('#' + id) || document.body}
                menu={{ items }}
                overlayClassName={styles.dropmenus}
                placement="bottomLeft"
              >
                <Button
                  onClick={e => {
                    e.preventDefault();
                  }}
                >
                  <EllipsisOutlined />
                </Button>
              </Dropdown>
            </div>
          )}
        </div>
      </Flex>
    </Link>
  );
};

export default ChatItem;
