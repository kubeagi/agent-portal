import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text',
  description: 'Text Page',
}

export default function TestPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{
      padding: '111px',
    }}>{children}</div>
  )
}
