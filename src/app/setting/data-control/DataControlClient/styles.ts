import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  dataControl: {
    'height': '100%',
    'width': '100%',
    'background': token.colorBgLayout,
    'position': 'relative',
    '& > div': {
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      paddingBottom: '40px',
      paddingTop: '64px',
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
