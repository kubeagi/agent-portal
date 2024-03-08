import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  sidebar: {
    'position': 'relative',
    'display': 'flex',
    'flexDirection': 'column',
    'flexShrink': '0',
    'width': '336px',
    'height': '100%',
    'backgroundColor': token.colorBgBase,
    // 处理 [dir='ltr'] 和 [dir='rtl']
    'html[dir="ltr"] &': {
      borderRight: `1px solid ${token.colorSplit}`,
    },
    'html[dir="rtl"] &': {
      borderLeft: `1px solid ${token.colorSplit}`,
    },

    // 媒体查询
    '@media (max-width: 879px)': {
      '&[sidebar-visible="false"]': {
        'boxShadow': 'none',

        '& button': {
          opacity: 0,
        },
      },

      'html[dir="ltr"] &': {
        left: 0,
        borderRight: '1px solid',
        zIndex: 9,
      },

      'html[dir="rtl"] &': {
        right: 0,
        borderLeft: '1px solid',
        zIndex: 9,
      },

      '&': {
        'position': 'absolute',
        'width': '100%',
        'transition': 'var(--slide-transition)',

        '&.hide_sidebar': {
          display: 'none',
        },
      },

      '[dir] &': {
        border: 'transparent',
      },

      '[sidebar-visible="false"]': {
        '[dir="ltr"] &': {
          transform: 'translate(-200%)',
        },
        '[dir="rtl"] &': {
          transform: 'translate(200%)',
        },
      },
    },
  },
}));
