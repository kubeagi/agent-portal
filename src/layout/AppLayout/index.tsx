'use client';

import { Flexbox } from 'react-layout-kit';

import ChatList from './ChatList';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flexbox flex={1} height={'100vh'} horizontal width={'100vw'}>
      <ChatList />
      {children}
    </Flexbox>
  );
}
