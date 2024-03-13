'use client';

import { Flex, Spin } from 'antd';
import { createStyles } from 'antd-style';
import { useTranslations } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

import LogoSvg from '@/../public/svg/logo.svg';

export const useStyles = createStyles(({ token }) => ({
  wrapper: {
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    left: '0',
    zIndex: '10',
    backgroundColor: token.colorBgBase,
  },
  spin: {
    minWidth: '60px',
  },
  logo: {
    width: '140px !important',
    height: '32px !important',
    left: '50%',
    margin: 0,
    transform: 'translateX(-50%)',
    marginTop: '-30px !important',
  },
}));

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { styles } = useStyles();
  const t = useTranslations('oidc');
  const { locale } = useParams();
  const tip = React.useMemo(() => {
    switch (pathname) {
      case `/${locale}/oidc/logout`: {
        return;
        // return t('layout.dengChuZhong');
      }
      default: {
        return t('layout.jiaZaiZhong');
      }
    }
  }, [pathname]);
  return (
    <Flex align={'center'} className={styles.wrapper} justify={'center'}>
      <Spin
        className={styles.spin}
        indicator={<LogoSvg className={styles.logo} height={32} width={140} />}
        spinning={!!tip}
        tip={<span>{tip}</span>}
      >
        {children}
      </Spin>
    </Flex>
  );
}
