import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  agentContainer: {
    'width': '100%',
    'position': 'relative',
    'backgroundColor': token.colorBgBase,
    '& > div': {
      height: '100%',
    },
  },
  agentContent: {
    margin: '0 auto',
  },
  main: {
    height: 'calc(100vh - 84px)',
    padding: '64px 24px 24px 24px',
  },
  content: {},
  tag: {
    minWidth: '108px',
    textAlign: 'center',
    height: '36px',
    lineHeight: '36px',
    border: '1px solid #E5E5E5',
    fontSize: '14px',
    marginBottom: 8,
  },
  card: {
    display: 'flex',
    backgroundColor: token.colorBgLayout,
    padding: 16,
    borderRadius: '16px',
    cursor: 'pointer',
  },
  left: {
    height: '72px',
    width: '72px',
    marginRight: 12,
    img: {
      objectFit: 'cover',
      verticalAlign: 'middle',
      borderRadius: 12,
    },
  },
  right: {
    flex: 1,
    width: `calc(100% - 75px)`,
  },
  title: {
    marginTop: '5px',
    fontSize: '15px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 700,
    color: token.colorTextBase,
  },
  desc: {
    color: token.colorTextDescription,
    fontSize: 14,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  info: {
    fontSize: 12,
    marginTop: 4,
    color: token.colorTextDescription,
    display: 'flex',
  },
  heat: {
    width: 50,
  },
  creator: {
    flex: 1,
  },
}));
