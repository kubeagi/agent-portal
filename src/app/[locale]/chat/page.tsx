'use client';

// import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import EmptyPage from '@/components/EmptyPage';
import { useAxiosRequest } from '@/utils/axios';
import { DEFAULT_CHAT } from '@/utils/constants';

// const Conversation = dynamic(
//   () => import('./(conversation)'),
//   { ssr: false } // 禁用服务端渲染
// );

export default function Chat() {
  const router = useRouter();
  const { locale } = useParams();
  const [{ data }] = useAxiosRequest({
    url: '/kubeagi-apis/chat/conversations',
    method: 'POST',
  });
  React.useEffect(() => {
    const first_chat = data?.[0];
    if (first_chat?.id && first_chat?.id !== DEFAULT_CHAT) {
      router.push(
        `/${locale}/chat/${first_chat?.id}?appName=${first_chat?.app_name}&appNamespace=${first_chat?.app_namespace}`
      );
    }
  }, [data]);
  return (
    <>
      {/* 暂时屏蔽, 暂无默认 chat */}
      {/* <Conversation /> */}
      <EmptyPage />
    </>
  );
}
