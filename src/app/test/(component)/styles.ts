import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  pathname: {
    paddingTop: '20px',
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
    paddingTop: '20vh',
  },
}));