import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  account: {
    'height': '100%',
    'width': '100%',
    'backgroundColor': token.colorBgLayout,
    'position': 'relative',
    '& > div': {
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      paddingBottom: '40px',
      paddingTop: '64px',
    },
    '.ant-skeleton-title': {
      marginBottom: 'unset',
    },
  },
  sub: {
    width: '100%',
  },
  content: {
    paddingTop: 16,
    paddingBottom: 42,
    width: 600,
  },
  table: {
    '.ant-table-tbody > tr:last-child > td': {
      borderBottom: 'unset',
    },
  },
}));
