'use client';

import React from 'react';

import AppLayout from '@/layout/AppLayout';
import AppNoAuthLayout from '@/layout/AppNoAuthLayout';
import AppSkeletonLayout from '@/layout/AppSkeletonLayout';
import { useAuthContext } from '@/layout/AuthLayout';

interface Props {
  children?: React.ReactNode;
}

const AppLayoutTemplate = React.memo<Props>(({ children }) => {
  const { authed } = useAuthContext() || { authed: undefined };
  if (authed === undefined) {
    return <AppSkeletonLayout>{children}</AppSkeletonLayout>;
  }
  const App = authed ? AppLayout : AppNoAuthLayout;
  return <App>{children}</App>;
});

export default AppLayoutTemplate;
