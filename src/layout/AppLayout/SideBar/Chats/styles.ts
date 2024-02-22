import { createStyles } from 'antd-style';

export const useStyles = createStyles(() => ({
  chats: {
    position: 'relative',
    flex: '1 1 0%',
  },
  content: {
    'paddingLeft': 8,
    'paddingBottom': 16,
    '.ant-typography': {
      marginBottom: 'unset',
    },
  },
  emptyItem: {
    'padding': '12px 16px 0 16px',
    '.ant-skeleton-header': {
      paddingInlineEnd: '8px',
    },
  },
}));
