import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  tagContent: {
    'margin': `0 0 20px 0`,
    'width': `100%`,
    '@media (max-width: 879px)': {
      '& .ant-radio-group': {
        display: 'flex !important',
        flexWrap: 'nowrap !important' as 'nowrap',
      },
    },
    '& .ant-radio-group': {
      display: 'inline-flex',
      gap: '8px',
      flexWrap: 'wrap',
    },
  },
  btnListOverflow: {
    display: 'flex',
    overflow: 'auto',
  },
  btnListHidden: {
    display: 'box',
    overflow: 'hidden',
  },

  arrows: {},
  arrow: {
    'color': 'rgb(204, 204, 204)',
    'position': 'absolute',
    'alignItems': 'center',
    'cursor': 'pointer',
    'display': 'flex',
    'height': '30px',
    'justifyContent': 'flex-end',
    'zIndex': '3',
    'width': '30px',
    '&:hover': {
      color: token.colorPrimary,
      cursor: 'pointer',
    },
  },
  shadowLeft: {
    position: 'absolute',
    background: `linear-gradient(to left,transparent,${token.colorBgBase} 100%)`,
    height: '36px',
    pointerEvents: 'none',
    width: '52px',
    left: '0',
    zIndex: '3',
  },
  shadowRight: {
    position: 'absolute',
    background: `linear-gradient(to right,transparent,${token.colorBgBase} 100%)`,
    height: '36px',
    pointerEvents: 'none',
    width: '52px',
    right: '10px',
    zIndex: '3',
  },
  left: {
    left: '0',
  },
  right: {
    right: '10px',
  },
  btn: {
    'whiteSpace': 'nowrap',
    '&.ant-radio-button-wrapper': {
      borderInlineStart: `1px solid ${token.colorBorder}`,
      borderRadius: '12px',
    },
    '&.ant-radio-button-wrapper:not(:first-child)::before': {
      backgroundColor: 'transparent',
    },
    '&.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)': {
      borderColor: token.colorPrimary,
    },
  },
}));
