'use client';

import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { useAuthContext } from '@/layout/AuthLayout';

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  const { authed } = useAuthContext();
  if (authed === false) {
    // 无效认证
    redirect('/agent');
  }
  return children;
}
