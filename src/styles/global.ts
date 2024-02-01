import { css } from 'antd-style';

export default ({ prefixCls, token }: { prefixCls: string; token: any }) => css`
  html,
  body,
  #__next,
  .${prefixCls}-app {
    position: relative;
    overscroll-behavior: none;
    height: 100% !important;
    min-height: 100% !important;
  }

  body {
    color: CanvasText;
    color-scheme: light dark;
    background-color: Canvas !important;
  }

  ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
  .scrollBar {
    position: relative;
    z-index: 1;

    overflow-y: scroll;

    width: 100%;
    max-height: 100%;
  }
  .scrollBar:not(:hover) {
    padding-right: 7px;
  }
  .scrollBar:hover::-webkit-scrollbar {
    display: initial;
    width: 7px;
    height: 0;
  }

  .scrollBar:hover::-webkit-scrollbar-track {
    background: transparent;
  }

  .scrollBar:hover::-webkit-scrollbar-thumb {
    background-color: #ccc;
    background-clip: padding-box;
    border-bottom: 1px solid transparent;
  }

  [dir='ltr'] .scrollBar:hover::-webkit-scrollbar-thumb {
    border-right: 1px solid transparent;
    border-radius: 6px 8px 8px;
  }

  [dir='rtl'] .scrollBar:hover::-webkit-scrollbar-thumb {
    border-left: 1px solid transparent;
    border-radius: 8px 6px 8px 8px;
  }

  .scrollBar:hover::-webkit-scrollbar-thumb:hover {
    background-color: #999;
    background-clip: padding-box;
  }

  [dir='ltr'] .scrollBar:hover::-webkit-scrollbar-thumb:hover {
    border-right: 1px solid transparent;
  }

  [dir='rtl'] .scrollBar:hover::-webkit-scrollbar-thumb:hover {
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

  @keyframes inactivelink-hover-animation {
    0% {
      background-color: transparent;
    }
    to {
      background-color: ${token.controlItemBgHover};
    }
  }
`;
