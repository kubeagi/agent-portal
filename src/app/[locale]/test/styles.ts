import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => {
  return {
    wrapper: {
      'display': 'flex',
      'flexDirection': 'column',
      'alignItems': 'center',
      'justifyContent': 'space-between',

      'minHeight': '60vh',
      'padding': '2rem',
      '.ant-spin-nested-loading': {
        'width': '100%',
        '.ant-list': {
          backgroundColor: 'white',
          margin: '16px auto',
          width: 500,
        },
      },
    },
    logo: {
      // filter: 'invert(1) drop-shadow(0 0 0.3rem #ffffff70)'
      position: 'relative',
    },
    description: {
      display: 'inherit',
      justifyContent: 'inherit',
      alignItems: 'inherit',
      fontSize: '0.85rem',
      width: '100%',
      zIndex: 2,
      maxWidth: 'var(--max-width)',
      a: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
      },
      p: {
        position: 'relative',
        margin: 0,
        padding: '16px',
        backgroundColor: 'rgba(var(--callout-rgb), 0.5)',
        border: '1px solid rgba(var(--callout-border-rgb), 0.3)',
        borderRadius: 'var(--border-radius)',
      },
    },

    code: css`
      font-weight: 700;
    `,

    center: css`
      position: relative;

      display: flex;
      align-items: center;
      justify-content: center;

      padding: 4rem 0;
      &::before {
        width: 480px;
        height: 360px;
        margin-left: -400px;

        background: var(--secondary-glow);
        border-radius: 50%;
      }

      &::after {
        z-index: -1;
        width: 240px;
        height: 180px;
        background: var(--primary-glow);
      }

      &::before,
      &::after {
        content: '';

        position: absolute;
        left: 50%;
        transform: translateZ(0);

        filter: blur(45px);
      }
    `,
  };
});
