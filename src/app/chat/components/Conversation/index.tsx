'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

interface ConversationProps {
  data?: any;
}

const Conversation = React.memo<ConversationProps>(() => {
  const pathname = usePathname();
  return (
    <Flexbox flex={1} height={'100%'} horizontal style={{ position: 'relative' }}>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div>对话框</div>
        <div>{pathname}</div>
      </div>
    </Flexbox>
  );
});

export default Conversation;
