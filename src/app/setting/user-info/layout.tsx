import { PropsWithChildren, memo } from 'react';

const Layout = memo<PropsWithChildren>(({ children }) => {
  return <>{children}</>;
});

export default Layout;
