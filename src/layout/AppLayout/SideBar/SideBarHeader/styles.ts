import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  sidebarHeader: {
    overflow: 'hidden',
    backgroundColor: token.colorBgBase,
  },
  btns: {
    'flex': '1 1 0%',
    'padding': 8,
    'borderBottom': `1px solid ${token.colorSplit}`,
    '.anticon': {
      color: token.colorPrimary,
    },
  },
  btnName: {
    flex: '1 1 0%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  linkItem: {
    'padding': '8px 12px',
    'borderRadius': '12px',
    'display': 'flex',
    'alignItems': 'center',
    'gap': '12px',
    'color': token.colorText,
    'fontWeight': 600,
    'fontSize': 16,
    '&:hover': {
      translate: 'all .15s',
      color: token.colorText,
      backgroundColor: token.controlItemBgHover,
    },
    '.anticon': {
      fontSize: 42,
      color: token.colorPrimary,
    },
  },
  logo: {
    height: '50px',
    lineHeight: '50px',
    borderBottom: `1px solid ${token.colorSplit}`,
    color: token.colorPrimary,
    padding: '0 1rem',
    fontWeight: 'bolder',
    fontSize: '24px',
    cursor: 'pointer',
    a: {
      verticalAlign: 'sub',
    },
    svg: {
      fill: token.colorTextBase,
    },
  },
  chatsTitle: {
    padding: '8px 8px 8px 20px',
  },
  _title: {
    fontSize: 16,
    fontWeight: 600,
  },
  newbtn: {
    'display': 'flex',
    'alignItems': 'center',
    'cursor': 'pointer',
    'color': token.colorPrimary,
    'padding': '8px 12px',
    'borderRadius': '12px',
    '&:hover': {
      translate: 'all .15s',
      backgroundColor: token.controlItemBgHover,
    },
    'svg': {
      marginRight: 8,
      width: 20,
    },
  },
}));
