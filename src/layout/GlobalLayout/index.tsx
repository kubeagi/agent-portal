'use client';

import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { useStore } from '@/store';

import ThemeLayout from './ThemeLayout';

interface GlobalLayoutProps extends PropsWithChildren {
  theme: string; // theme from cookie;
}

const GlobalLayout = React.memo<GlobalLayoutProps>(({ children, theme }) => {
  const store = useStore({
    // theme: 'light',
    theme,
  });
  return (
    <Provider store={store}>
      <ThemeLayout theme={theme}>{children}</ThemeLayout>
    </Provider>
  );
});

export default GlobalLayout;
