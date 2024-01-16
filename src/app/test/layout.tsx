import type { Metadata } from 'next';

import { isMobileDevice } from '@/utils';

export const metadata: Metadata = {
  title: 'Text',
  description: 'Text Page',
};

export default function TestPageLayout({ children }: { children: React.ReactNode }) {
  const mobile = isMobileDevice();
  return (
    <div
      style={{
        padding: '111px',
      }}
    >
      <div>Device is mobile ? {mobile ? 'yes' : 'no'}</div>
      {children}
    </div>
  );
}
