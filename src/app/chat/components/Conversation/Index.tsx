import React from 'react';
import { Flexbox } from 'react-layout-kit';

interface ConversationProps {}

const Conversation = React.memo<ConversationProps>(() => {
  return (
    <Flexbox flex={1} height={'100%'} horizontal style={{ position: 'relative' }}>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div>对话框</div>
      </div>
    </Flexbox>
  );
});

export default Conversation;
