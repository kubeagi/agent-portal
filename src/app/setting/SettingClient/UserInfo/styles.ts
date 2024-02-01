import { createStyles } from 'antd-style';

export const useStyles = createStyles(() => ({
  userinfo: {
    textAlign: 'center',
    marginBottom: 24,
    height: 164,
    overflow: 'hidden',
  },
  name: {
    fontSize: '18px',
    fontWeight: 500,
    marginTop: '16px',
  },
  userid: {
    color: '#999',
    fontSize: '12px',
    fontWeight: 500,
  },
  emptyline: {
    width: '120px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  emptylineUserid: {
    'height': 18,
    '.ant-skeleton-title': {
      marginBottom: 'unset',
    },
  },
  avatorSkeleton: {
    '.ant-skeleton-header': {
      paddingInlineEnd: 'unset',
    },
  },
}));
