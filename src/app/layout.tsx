'use client';

import { ThemeProvider } from 'antd-style';
import type { Metadata } from 'next';
import './globals.css';
import themeConfig from '@/theme/themeConfig';
import StyleRegistry from '@/layout/StyleRegistry';
import { GlobalStyle } from '@/styles';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';

// export const metadata: Metadata = {
//   title: 'Agent Portal',
//   description: 'Agent Portal',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyleRegistry>
          <ThemeProvider
            {...themeConfig}
          >
            <GlobalStyle />
            {/* <ConfigProvider
              theme={themeConfig.theme}
            > */}
              {children}
              {/* <AntdRegistry>{children}</AntdRegistry> */}
            {/* </ConfigProvider> */}
          </ThemeProvider>
        </StyleRegistry>
      </body>
    </html>
  )
}
