import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  setting: {
    'width': '100%',
    'background': token.colorBgLayout,
    'position': 'relative',
    '& > div': {
      height: '100%',
    },
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '64px 16px 24px 16px',
  },
}));
