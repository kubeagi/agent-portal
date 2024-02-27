import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => {
  return {
    wrapper404: {
      height: '100vh',
      width: '100vw',
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
      backgroundImage: 'url(/404/404.png)',
      height: '420px',
      width: '500px',
      maxWidth: '100vw',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      marginBottom: '24px',
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
