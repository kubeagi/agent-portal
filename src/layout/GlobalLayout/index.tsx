'use client';

import { App } from 'antd';
import { ThemeProvider } from 'antd-style';
import 'antd/dist/reset.css';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Provider } from 'react-redux';

import oidc from '@/config/oidc.mjs';
import { useStore } from '@/store';
import { GlobalStyle } from '@/styles';
import themeConfig from '@/theme/themeConfig';

const { AUTH_DATA } = oidc;

// import './globals.css';

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const [initialState, setInitState] = React.useState<any>();
  const pathname = usePathname();
  const router = useRouter();
  React.useEffect(() => {
    if (pathname === '/oidc/callback') {
      return;
    }
    const auth = localStorage.getItem(AUTH_DATA);
    if (!auth) {
      router.push('/oidc/auth');
    }
    setInitState({
      theme: localStorage.getItem('theme') || 'light',
      activeChat: 'name',
    });
  }, [ pathname ]);
  const store = useStore(initialState);
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
