import { PropsWithChildren, memo } from 'react';

import AppLayout from '@/layout/AppLayout';

const AppLayoutDesktop = memo<PropsWithChildren>(({ children }) => {
  return <AppLayout>{children}</AppLayout>;
});

export default AppLayoutDesktop;
