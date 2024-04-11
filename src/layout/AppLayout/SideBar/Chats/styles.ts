import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
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
    '.ant-list-item': {
      padding: 0,
      borderBlockEnd: 'unset',
      marginBottom: '1px',
    },
  },
  emptyItem: {
    'padding': '16px 16px 0 12px',
    '.ant-skeleton-header': {
      paddingInlineEnd: '8px',
    },
  },
  dividerText: {
    color: `${token.colorTextDescription} !important`,
  },
  scroll: {
    paddingBottom: 70,
  },
}));
