import { Flex } from 'antd';

import { User } from '@/types/user';

import SideBar from './SideBar';

export default function AppLayout({ children, user }: { children: React.ReactNode; user?: User }) {
  return (
    <Flex
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <SideBar user={user} />
      {children}
    </Flex>
  );
}
