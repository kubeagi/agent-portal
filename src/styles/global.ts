import { css } from 'antd-style';

export default ({ prefixCls }: { prefixCls: string }) => css`
  html,
  body,
  #__next,
  .${prefixCls}-app {
    position: relative;
    overscroll-behavior: none;
    height: 100% !important;
    min-height: 100% !important;
  }

  ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  .showScrollBar:hover::-webkit-scrollbar {
    display: inline;
    display: initial;
    width: 7px;
    height: 0;
  }

  .showScrollBar:hover::-webkit-scrollbar-track {
    background: transparent;
  }

  .showScrollBar:hover::-webkit-scrollbar-thumb {
    background-color: #ccc;
    background-clip: padding-box;
    border-bottom: 1px solid transparent;
  }

  [dir='ltr'] .showScrollBar:hover::-webkit-scrollbar-thumb {
    border-right: 1px solid transparent;
    border-radius: 6px 8px 8px;
  }

  [dir='rtl'] .showScrollBar:hover::-webkit-scrollbar-thumb {
    border-left: 1px solid transparent;
    border-radius: 8px 6px 8px 8px;
  }

  .showScrollBar:hover::-webkit-scrollbar-thumb:hover {
    background-color: #999;
    background-clip: padding-box;
  }

  [dir='ltr'] .showScrollBar:hover::-webkit-scrollbar-thumb:hover {
    border-right: 1px solid transparent;
  }

  [dir='rtl'] .showScrollBar:hover::-webkit-scrollbar-thumb:hover {
    border-left: 1px solid transparent;
  }

  p {
    margin-bottom: 0;
  }

  @media (max-width: 575px) {
    * {
      ::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
      }
    }
  }
`;
