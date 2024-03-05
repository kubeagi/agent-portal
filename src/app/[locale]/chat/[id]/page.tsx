'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// import Loading from '@/components/Loading';
// import Conversation from '../(conversation)';

const Conversation = dynamic(() => import('../(conversation)'), {
  ssr: false, // 禁用服务端渲染
  // loading: () => <Loading loading />,
});

export default function Chat(props: { params: any; searchParams: any }) {
  return (
    <>
      <Conversation {...props} />
    </>
  );
}
