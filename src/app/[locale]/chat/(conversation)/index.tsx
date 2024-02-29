'use client';

import Chat from '@yuntijs/chat';
import { createStyles } from 'antd-style';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';
import { Flexbox } from 'react-layout-kit';
import { useSelector } from 'react-redux';

import useDark from '@/app/[locale]/chat/(conversation)/useDark';

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
  const params = useParams();
  const searchParams = useSearchParams();
  const theme = useSelector((store: any) => store.theme);
  const isDark =
    theme === 'dark' ||
    (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  useDark(isDark);
  return (
    <>
      <Flexbox className={styles.conversationWrapper} flex={1} horizontal>
        <Chat
          appName={searchParams.get('appName') || ''}
          appNamespace={searchParams.get('appNamespace') || ''}
          conversationId={params.id as string}
          gpts
          isDark={isDark}
        />
      </Flexbox>
    </>
  );
});

export default Conversation;
