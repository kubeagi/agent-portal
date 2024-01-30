import type { Metadata } from 'next';

import AppLayout from '@/layout/AppLayout';
import { isMobileDevice } from '@/utils';

export const metadata: Metadata = {
  title: 'Test Page',
  description: 'Test Page',
};

export default function TestPageLayout({ children }: { children: React.ReactNode }) {
  const mobile = isMobileDevice();
  return (
    <AppLayout>
      <div
        style={{
          padding: '111px',
          width: '100%',
          backgroundColor: '#f5f5f5',
          overflowY: 'auto',
        }}
      >
        <div>Device is mobile ? {mobile ? 'yes' : 'no'}</div>
        {children}
      </div>
    </AppLayout>
  );
}
