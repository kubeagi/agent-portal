import { Flex } from 'antd';

import SideBar from './SideBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <SideBar />
      {children}
    </Flex>
  );
}
