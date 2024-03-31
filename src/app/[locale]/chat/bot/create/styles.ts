import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => {
  return {
    BotCreate: {
      width: '100%',
      background: token.colorBgLayout,
      position: 'relative',
    },
    content: {
      'paddingTop': '64px',
      'paddingBottom': '24px',
      '.ant-input, .ant-select-selector': {
        borderColor: 'transparent !important',
      },
      '.ant-input:focus, .ant-select-focused >.ant-select-selector': {
        borderColor: `${token.colorPrimaryActive} !important`,
      },
    },
    uploadText: {
      'border': 0,
      'background': 'none',
      '& > div': {
        marginTop: 4,
      },
    },
    avatarImg: {
      borderRadius: '50%',
    },
    leftContent: {
      width: '40%',
      padding: '24px 40px 0 60px',
    },
    rightContent: {
      width: '60%',
      background: token.colorWhite,
    },
    tag: {
      position: 'relative',
      top: '20px',
      left: '40px',
    },
    uploadAvatar: {
      textAlign: 'center',
    },
    uploadFile: {
      background: token.colorWhite,
      color: token.colorTextPlaceholder,
      padding: '10px 20px 10px 20px',
      borderRadius: token.borderRadius,
    },
    uploadIcon: {
      marginRight: '4px',
    },
    menuIcon: {
      marginRight: '4px',
      color: token.colorPrimary,
    },
  };
});
