import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => {
  return {
    wrapper404: {
      height: '100vh',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 10,
      backgroundColor: token.colorBgBase,
    },

    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
    },

    imgBg: {
      height: '420px',
      width: '500px',
      maxWidth: '100vw',
      marginBottom: '24px',
      paddingLeft: '35px',
    },

    text: {
      fontSize: '24px',
      marginBottom: '24px',
    },
    btn: {
      '.ant-btn': {
        paddingLeft: '30px',
        paddingRight: '30px',
        fontSize: '16px',
        height: 'auto',
      },
    },
  };
});
