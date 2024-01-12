'use client';

import { App } from 'antd';
import { ThemeProvider } from 'antd-style';
import 'antd/dist/reset.css';
import React from 'react';
import { Provider } from 'react-redux';

import { useStore } from '@/store';
import { GlobalStyle } from '@/styles';
import themeConfig from '@/theme/themeConfig';

// import './globals.css';

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const store = useStore();
  return (
    <Provider store={store}>
      <ThemeProvider {...themeConfig}>
        <GlobalStyle />
        <App style={{ minHeight: 'inherit', width: 'inherit', fontFamily: 'inherit' }}>
          {children}
        </App>
      </ThemeProvider>
    </Provider>
  );
}
