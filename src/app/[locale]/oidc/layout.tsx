'use client';

import { Flex, Spin } from 'antd';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations('oidc');
  const tip = React.useMemo(() => {
    switch (pathname) {
      case '/oidc/logout': {
        return t('layout.dengChuZhong');
      }
      default: {
        return t('layout.jiaZaiZhong');
      }
    }
  }, [pathname]);
  return (
    <Flex
      align={'center'}
      justify={'center'}
      style={{
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        left: '0',
        zIndex: '10',
      }}
    >
      <Spin
        spinning
        style={{
          minWidth: '60px',
        }}
        tip={<span>{tip}</span>}
      >
        {children}
      </Spin>
    </Flex>
  );
}
