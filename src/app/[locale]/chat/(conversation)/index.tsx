'use client';

import Chat from '@yuntijs/chat';
import { createStyles } from 'antd-style';
import React from 'react';
import { Flexbox } from 'react-layout-kit';
import { useSelector } from 'react-redux';

export const useStyles = createStyles(({ token }) => ({
  conversationWrapper: {
    position: 'relative',
    backgroundColor: token.colorBgLayout,
  },
  chatContainer: {
    width: '100%',
  },
}));

interface ConversationProps {
  params?: any;
  searchParams?: any;
}

const Conversation = React.memo<ConversationProps>(({ params, searchParams }) => {
  const { styles } = useStyles();
  const theme = useSelector((store: any) => store.theme);
  const isDark =
    theme === 'dark' ||
    (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <>
      <Flexbox className={styles.conversationWrapper} flex={1} horizontal>
        <div className={styles.chatContainer}>
          <Chat
            appName={searchParams.appName || ''}
            appNamespace={searchParams.appNamespace || ''}
            conversationId={params.id === 'new' ? undefined : (params.id as string)}
            gpts
            isDark={isDark}
          />
        </div>
      </Flexbox>
    </>
  );
});

export default Conversation;
