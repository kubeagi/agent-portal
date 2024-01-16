import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  sidebarHeader: {
    overflow: 'hidden',
    background: 'white',
  },
  btns: {
    flex: '1 1 0%',
    padding: 8,
    borderBottom: '1px solid rgba(0,0,0,.06)',
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
    'color': 'black',
    'fontWeight': 600,
    'fontSize': 16,
    '&:hover': {
      translate: 'all .15s',
      color: 'black',
      backgroundColor: 'rgba(0, 0, 0, .06)',
    },
    '.anticon': {
      fontSize: 42,
      color: token.colorPrimary,
    },
  },
  logo: {
    height: '50px',
    lineHeight: '50px',
    borderBottom: '1px solid #E5E5E5',
    color: token.colorPrimary,
    padding: '0 1rem',
    fontWeight: 'bolder',
    fontSize: '24px',
    cursor: 'pointer',
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
      backgroundColor: 'rgba(0, 0, 0, .06)',
    },
    'svg': {
      marginRight: 8,
      width: 20,
    },
  },
}));
