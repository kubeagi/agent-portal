import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Text / Inner',
  description: 'Text Inner Page',
};

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return <div data-title="inner">{children}</div>;
}
