import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  pathname: {
    marginTop: '20px',
    lineHeight: token.testHeight,
    color: token.colorPrimaryTest,
  },
  link: {
    color: token.colorPrimary,
    fontWeight: 'bold',
  },
  container: {
    color: token.yellow7,
    textAlign: 'center',
  },
}));
