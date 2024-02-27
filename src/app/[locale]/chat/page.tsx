'use client';

import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import React from 'react';

import { useAxiosRequest } from '@/utils/axios';
import { DEFAULT_CHAT } from '@/utils/constants';

const Conversation = dynamic(
  () => import('./(conversation)'),
  { ssr: false } // 禁用服务端渲染
);

export default function Chat() {
  const [{ data }] = useAxiosRequest({
    url: '/kubeagi-apis/chat/conversations',
    method: 'POST',
  });
  if (data?.[0]?.id && data?.[0]?.id !== DEFAULT_CHAT) {
    redirect(`/chat/${data?.[0]?.id}`);
  }
  return (
    <>
      <Conversation />
    </>
  );
}
