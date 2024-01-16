import { Theme, css } from 'antd-style';

export default ({ token }: { prefixCls: string; token: Theme }) => css`
  .${token.prefixCls}-popover {
    z-index: 1100;
  }
  .${token.prefixCls}-upload-wrapper.${token.prefixCls}-upload-picture-circle-wrapper
    .${token.prefixCls}-upload.${token.prefixCls}-upload-select {
    margin-inline-end: 0;
  }
`;
