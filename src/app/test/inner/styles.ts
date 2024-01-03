import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  container: {
    color: token.yellow1,
    textAlign: 'center',
    div: {
      marginBottom: 26
    }
  },
}));