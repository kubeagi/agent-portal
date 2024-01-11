import { ThemeProviderProps as AntDThemeProviderProps } from 'antd-style';

export type ThemeProviderProps = AntDThemeProviderProps<any>;

const colorPrimary = '#2c4ddc';

const theme_props: ThemeProviderProps = {
  customToken: {
    testHeight: '50px',
    colorPrimaryTest: '#f85a5a',
    // colorBgLayout: 'red',
  },
  theme: {
    token: {
      colorPrimary,
      colorLink: colorPrimary,
    },
  },
};

export default theme_props;
