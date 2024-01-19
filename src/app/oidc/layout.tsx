'use client';

import { Flex, Spin } from 'antd';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const tip = React.useMemo(() => {
    switch (pathname) {
      case '/oidc/logout': {
        return '登出中...';
      }
      default: {
        return '加载中...';
      }
    }
  }, [pathname]);
  return (
    <Flex
      align={'center'}
      justify={'center'}
      style={{
        height: '100vh',
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
