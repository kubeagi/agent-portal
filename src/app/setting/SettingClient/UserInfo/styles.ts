import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  userinfo: {
    textAlign: 'center',
    marginBottom: 24,
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
}));
