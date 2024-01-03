import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text',
  description: 'Text Page',
}

export default function InnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div data-title="inner">{children}</div>
  )
}
