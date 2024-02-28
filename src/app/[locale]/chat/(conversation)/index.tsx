'use client';

import { createStyles } from 'antd-style';
import React from 'react';
import { Flexbox } from 'react-layout-kit';
import Chat from '@yuntijs/chat'

export const useStyles = createStyles(({ token }) => ({
  conversationWrapper: {
    position: 'relative',
    backgroundColor: token.colorBgLayout,
  },
}));

interface ConversationProps {
  data?: any;
}

const Conversation = React.memo<ConversationProps>(() => {
  const { styles } = useStyles();
  return (
    <>
      <link rel="stylesheet" href="/style/yunti-chat.min.css"/>
      <Flexbox className={styles.conversationWrapper} flex={1} horizontal>
        <Chat appName="just-chat" appNamespace="rag-eval" isDark={false} gpts={true}/>
      </Flexbox>
    </>
  );
});

export default Conversation;
