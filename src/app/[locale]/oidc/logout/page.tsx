'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { AUTH_DATA } from '@/utils/constants';

export default function Logout() {
  const router = useRouter();
  React.useEffect(() => {
    window.localStorage.removeItem(AUTH_DATA);
    // router.push('/oidc/remove-auth-and-login'); // 暂时屏蔽登出, 参考, 跳转到未登录的状态
    router.push('/');
  });
  return <></>;
}
