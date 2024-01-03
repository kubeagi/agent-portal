'use client';

import { App } from 'antd';
import { ThemeProvider } from 'antd-style';

import StyleRegistry from '@/layout/StyleRegistry';
import { GlobalStyle } from '@/styles';
import themeConfig from '@/theme/themeConfig';

import './globals.css';

// export const metadata: Metadata = {
//   title: 'Agent Portal',
//   description: 'Agent Portal',
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyleRegistry>
          <ThemeProvider {...themeConfig}>
            <GlobalStyle />
            <App style={{ minHeight: 'inherit', width: 'inherit', fontFamily: 'inherit' }}>
              {children}
            </App>
            {/* <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#2c4ddc',
                  colorLink: 'red',
                }
              }}
            >
              {children}
            </ConfigProvider> */}
          </ThemeProvider>
        </StyleRegistry>
      </body>
    </html>
  );
}
