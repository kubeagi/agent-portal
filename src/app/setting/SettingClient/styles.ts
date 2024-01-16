import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  setting: {
    height: '100%',
    width: '100%',
    background: token.colorBgLayout,
    overflowY: 'auto',
    position: 'relative',
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
    paddingTop: '64px',
  },
}));
