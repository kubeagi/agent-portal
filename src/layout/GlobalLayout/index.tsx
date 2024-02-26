'use client';

import { ThemeMode } from 'antd-style';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { useStore } from '@/store';

import ThemeLayout from './ThemeLayout';

interface GlobalLayoutProps extends PropsWithChildren {
  theme: ThemeMode | undefined; // theme from cookie;
  locale: string;
}

const GlobalLayout = React.memo<GlobalLayoutProps>(({ children, theme, locale }) => {
  const store = useStore({
    theme,
  });
  return (
    <Provider store={store}>
      <ThemeLayout
        antdLocale={locale?.startsWith('zh') ? zhCN : enUS}
        locale={locale}
        theme={theme}
      >
        {children}
      </ThemeLayout>
    </Provider>
  );
});

export default GlobalLayout;
