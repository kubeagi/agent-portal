'use client';

import { Flex, Typography } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

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
      'width': '100%',
      '&:hover': activeStyle,
      '&:active': {
        backgroundColor: token.controlItemBgActiveDisabled,
      },
      '&:hover .showBtn': {
        display: 'block',
      },
      '&:not(:first-child)': {
        marginTop: 1,
      },
    },
    activeItem: {
      ...activeStyle,
      '&:active': {
        backgroundColor: `${token.controlItemBgHover} !important`,
      },
    },
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
          color: token.colorTextBase,
          transform: 'scale(1.5)',
        },
      },
    },
    dropmenus: {
      '.ant-btn-link': {
        'padding': 0,
        '.ant-btn-icon': {
          verticalAlign: 'text-bottom',
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
  const { locale } = useParams();
  const id = 'chatItem' + data.id;
  return (
    <Link className={classNames(styles.chatItem)} href={`/${locale}/oidc/auth`} id={id}>
      <Flex
        align={'center'}
        gap={8}
        justify={'space-between'}
        style={{
          maxWidth: '100%',
        }}
      >
        <div className={styles.icon}>
          <Image alt="default_chat" height={42} src="/default_chat.png" width={42} />
        </div>
        <div className={styles.content}>
          <Typography.Paragraph className={styles.title} ellipsis>
            {data.title}
          </Typography.Paragraph>
          <Typography.Paragraph className={styles.msg} ellipsis>
            {data.desc}
          </Typography.Paragraph>
        </div>
      </Flex>
    </Link>
  );
};

export default ChatItem;
