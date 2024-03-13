import { theme } from 'antd';
import { ThemeProviderProps as AntDThemeProviderProps } from 'antd-style';

export type ThemeProviderProps = AntDThemeProviderProps<any>;

const colorPrimary = '#A060EE';

const default_theme_props: ThemeProviderProps = Object.freeze({
  customToken: {
    testHeight: '50px',
    colorPrimaryTest: '#f85a5a',
  },
  theme: {
    algorithm: theme.defaultAlgorithm,
    token: {
      colorPrimary,
      borderRadius: 12,
      colorLink: colorPrimary,
    },
  },
});

const light_theme_props: ThemeProviderProps = Object.freeze({
  theme: {
    token: {
      colorBgBase: '#fff',
      colorBgLayout: '#f5f5f5',
      colorSplit: 'rgba(0, 0, 0, 0.06)',
    },
  },
});

const datk_theme_props: ThemeProviderProps = Object.freeze({
  theme: {
    token: {
      colorBgBase: '#000',
      colorBgLayout: '#141414',
      colorTextBase: '#fff',
      colorSplit: 'rgba(255, 255, 255, .16)',
      colorText: 'rgba(255, 255, 255, .85)',
      colorTextSecondary: 'rgba(255, 255, 255, .65)',
      colorTextTertiary: 'rgba(255, 255, 255, .45)',
      colorTextQuaternary: 'rgba(255, 255, 255, .25)',
    },
  },
});

export const light = light_theme_props;
export const dark = datk_theme_props;
export const default_theme = default_theme_props;
