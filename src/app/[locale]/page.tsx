'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import EmptyPage from '@/components/EmptyPage';
import { useAuthContext } from '@/layout/AuthLayout';

export default function RootPage(props: { params: { locale: string } }) {
  const locale = props?.params?.locale;
  const router = useRouter();
  const { authed } = useAuthContext();
  React.useEffect(() => {
    if (authed === undefined) return; // 未验证
    if (authed) {
      // 有效认证
      router.push(`${locale ? `/${locale}` : ''}/chat`);
    } else {
      // 无效认证
      router.push(`${locale ? `/${locale}` : ''}/agent`);
    }
  }, [authed]);
  return <EmptyPage />;
}
