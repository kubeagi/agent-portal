'use client';

import { ActionIcon } from '@lobehub/ui';
import { Flex } from 'antd';
import { createStyles } from 'antd-style';
import { ChevronRight, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const useStyles = createStyles(() => ({
  btns: {
    marginBottom: 16,
    borderRadius: 16,
    maxHeight: '100%',
    overflowY: 'auto',
    width: '100%',
  },
  linkWrapper: {
    'color': 'inherit',
    '&:hover': {
      color: 'inherit',
    },
  },
  btn: {
    'width': '100%',
    'background': 'white',
    'paddingLeft': '16px',
    'cursor': 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .06)',
      transition: 'all .15s',
    },
  },
  content: {
    flex: '1 1',
    padding: '12px 12px 12px 0',
    minHeight: '56px',
  },
  content_left: {
    flex: '1 1',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: '22px',
  },
  content_right: {
    marginLeft: '8px',
  },
  icon: {
    marginRight: 16,
    borderRadius: '10px',
    svg: {
      width: '20px',
      height: '20px',
    },
  },
}));

export interface Btn {
  icon: any;
  title: string;
  onClick?: () => void;
  href?: string;
  icon_bg?: string;
}

export interface BtnsBlockProps {
  btns: Btn[];
}

const BtnsBlock = React.memo<BtnsBlockProps>(props => {
  const { styles, theme } = useStyles();
  const { btns } = props;
  return (
    <div className={styles.btns}>
      {btns.map((item, idx) => {
        const icon = item.icon || User;
        const icon_bg = item.icon_bg || theme.colorPrimary;
        const key = item.title + idx;
        const children = (
          <Flex align={'center'} className={styles.btn} key={key}>
            <div className={styles.icon} style={{ backgroundColor: icon_bg }}>
              <ActionIcon color={'white'} icon={icon} />
            </div>
            <Flex align={'center'} className={styles.content}>
              <div className={styles.content_left}>{item.title || '默认标题'}</div>
              {item.href ? (
                <Flex align={'center'} className={styles.content_right}>
                  <ChevronRight color={'rgb(204, 204, 204)'} />
                </Flex>
              ) : null}
            </Flex>
          </Flex>
        );
        if (item.href) {
          return (
            <Link className={styles.linkWrapper} href={item.href} key={'link-wrapper-' + key}>
              {children}
            </Link>
          );
        }
        return children;
      })}
    </div>
  );
});

export default BtnsBlock;
