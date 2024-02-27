import dynamic from 'next/dynamic';
import React from 'react';

const Conversation = dynamic(
  () => import('../(conversation)'),
  { ssr: false } // 禁用服务端渲染
);

export default async function Chat() {
  return (
    <>
      <Conversation />
    </>
  );
}
