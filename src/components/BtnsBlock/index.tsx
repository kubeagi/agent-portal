'use client';

import { ActionIcon } from '@lobehub/ui';
import { Button, Flex } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

export const useStyles = createStyles(({ token }) => ({
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
    'backgroundColor': token.colorBgBase,
    'paddingLeft': '16px',
    'cursor': 'pointer',
    '&:hover': {
      backgroundColor: token.controlItemBgHover,
      animation: 'inactivelink-hover-animation 150ms ease forwards',
      // content: {
      //   boxSadow: 'unset',
      // }
    },
  },
  content: {
    flex: '1 1',
    padding: '12px 12px 12px 0',
    minHeight: '56px',
    boxShadow: '0 -1px 0 rgba(0, 0 ,0 ,.05)',
  },
  content_left: {
    'flex': '1 1',
    'fontSize': 16,
    'fontWeight': '500',
    'lineHeight': '22px',
    'textAlign': 'left',
    'paddingLeft': 'unset',
    '&:hover': {
      backgroundColor: 'inherit !important',
    },
    '&:hover.ant-btn-dangerous': {
      color: `${token.colorError} !important`,
    },
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
  extra: {
    color: token.colorTextTertiary,
    fontSize: token.fontSize,
    transform: 'translateY(-16px)',
  },
  btn_extra: {
    color: token.colorTextTertiary,
  },
}));

export interface Btn {
  icon?: any;
  title: string;
  onClick?: () => void;
  btn_extra?: React.ReactNode | string; // extra + onClick 显示箭头
  href?: string; // href 显示箭头
  danger?: boolean;
  action?: React.ReactNode | string; // action 和 href 二选一
  icon_bg?: string;
}

export interface BtnsBlockProps {
  btns: Btn[];
  extra?: string;
}

const BtnsBlock = React.memo<BtnsBlockProps>(props => {
  const { styles, theme } = useStyles();
  const { btns, extra } = props;
  const t = useTranslations('BtnsBlock');
  return (
    <>
      <div className={styles.btns}>
        {btns.map((item, idx) => {
          const icon = item.icon;
          const icon_bg = item.icon_bg || theme.colorPrimary;
          const key = item.title + idx;
          const children = (
            <Flex align={'center'} className={styles.btn} key={key} onClick={item.onClick}>
              {icon ? (
                <div className={styles.icon} style={{ backgroundColor: icon_bg }}>
                  <ActionIcon color={'white'} icon={icon} />
                </div>
              ) : null}
              <Flex align={'center'} className={styles.content}>
                <Button className={styles.content_left} danger={item.danger} type="text">
                  {item.title || t('index.moRenBiaoTi')}
                </Button>
                {item.btn_extra ? (
                  <Flex
                    align={'center'}
                    className={classNames(styles.content_right, styles.btn_extra)}
                  >
                    {item.btn_extra}
                  </Flex>
                ) : null}
                {item.href || item.btn_extra ? (
                  <Flex align={'center'} className={styles.content_right}>
                    <ChevronRight color={'rgb(204, 204, 204)'} />
                  </Flex>
                ) : null}
                {item.action ? (
                  <Flex align={'center'} className={styles.content_right}>
                    {item.action}
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
      {extra ? <div className={styles.extra}>{extra}</div> : null}
    </>
  );
});

export default BtnsBlock;
