'use client';

import { App, ConfigProvider } from 'antd';
import { ThemeMode, ThemeProvider } from 'antd-style';
import 'antd/dist/reset.css';
import { Locale } from 'antd/lib/locale';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

import { useAuthContext } from '@/layout/AuthLayout';
import { GlobalStyle } from '@/styles';
import { dark, default_theme, light } from '@/theme/themeConfig';
import { initAxiosHooks } from '@/utils/axios';
import { isTokenExpired, setCookie } from '@/utils/client';
import { AUTH_DATA } from '@/utils/constants';

import { useAxiosConfig } from '../../AxiosConfigLayout';

interface Props extends PropsWithChildren {
  theme?: ThemeMode; // 刷新页面时, 从 cookie 获取保存的 theme, 作为初始值
  client_theme?: 'dark' | 'light' | undefined; // client theme
  antdLocale: Locale;
  locale: string;
}

const ThemeLayout = React.memo<Props>(
  ({ children, theme: init_page_theme, client_theme, antdLocale, locale }) => {
    const { setAxiosConfigured, isAxiosConfigured } = useAxiosConfig();
    const { setAuthed } = useAuthContext();
    const [theme, setTheme] = React.useState<ThemeMode | undefined>(
      init_page_theme === 'auto' ? client_theme || 'auto' : init_page_theme
    );
    const [mediaQuery, setMediaQuery] = React.useState<any>();
    const theme_from_store = useSelector((store: any) => store.theme);
    const pathname = usePathname();

    const NO_AUTH_ROUTES = React.useMemo(
      () =>
        new Set([
          `/${locale}/oidc/callback`,
          `/${locale}/oidc/logout`,
          `/${locale}/oidc/remove-auth-and-login`,
          `/${locale}/oidc/auth`,
        ]),
      [locale]
    );
    React.useEffect(() => {
      if (NO_AUTH_ROUTES.has(pathname)) {
        return;
      }
      const auth = localStorage.getItem(AUTH_DATA);
      let authObj: any;
      try {
        authObj = JSON.parse(auth || '{}');
      } catch {
        // console.warn('no auth or parse auth err', _);
      }
      if (!auth || isTokenExpired(authObj?.token.id_token)) {
        // router.push('/oidc/auth'); // 暂时屏蔽 => 自动跳转认证
        setAuthed(false);
        return;
      }
      setAuthed(true);
      if (!isAxiosConfigured) {
        setAxiosConfigured(initAxiosHooks());
      }
    }, [pathname]);

    const handleThemeChange = React.useCallback(
      (e: MediaQueryListEvent) => {
        if (theme_from_store !== 'auto') return;
        if (e.matches) {
          // 系统为: 暗黑模式
          setCookie('client_theme', 'dark');
          setTheme('dark');
        } else {
          // 系统为: 正常（亮色）模式
          setCookie('client_theme', 'light');
          setTheme('light');
        }
      },
      [theme_from_store, setTheme]
    );

    React.useEffect(() => {
      setMediaQuery(window.matchMedia('(prefers-color-scheme: dark)'));
    }, []);
    React.useEffect(() => {
      if (mediaQuery) {
        mediaQuery.addListener(handleThemeChange);
        return () => {
          mediaQuery.removeListener(handleThemeChange);
        };
      }
    }, [mediaQuery, handleThemeChange]);
    React.useEffect(() => {
      if (theme_from_store !== 'auto' && theme_from_store !== theme) {
        setTheme(theme_from_store);
      }
      if (theme_from_store === 'auto' && mediaQuery) {
        handleThemeChange(mediaQuery);
        return;
      }
    }, [theme_from_store, mediaQuery]);
    const themeConfig = React.useMemo(
      () =>
        theme === 'auto'
          ? default_theme
          : merge(cloneDeep(default_theme), theme === 'dark' ? dark : light),
      [theme]
    );
    return (
      <ThemeProvider
        themeMode={theme} // 主题模式; ps: themeMode 和 appearance 都可以实现效果, themeMode 更贴合目前功能的含义
        // themeMode="auto"
        // appearance={theme} // 外观样式 https://github.com/ant-design/antd-style/issues/52#issuecomment-1563747195
        {...themeConfig}
      >
        <GlobalStyle />
        <ConfigProvider locale={antdLocale}>
          <App style={{ minHeight: 'inherit', width: 'inherit', fontFamily: 'inherit' }}>
            {children}
          </App>
        </ConfigProvider>
      </ThemeProvider>
    );
  }
);

export default ThemeLayout;
