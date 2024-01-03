import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => {
  return {
    main: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      min-height: 100vh;
      padding: 6rem;
    `,
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
        padding: '1rem',
        backgroundColor: 'rgba(var(--callout-rgb), 0.5)',
        border: '1px solid rgba(var(--callout-border-rgb), 0.3)',
        borderRadius: 'var(--border-radius)',
      },
    },

    code: css`
      font-weight: 700;
    `,

    grid: css`
      display: grid;
      grid-template-columns: repeat(4, minmax(25%, auto));
      width: var(--max-width);
      max-width: 100%;
      a {
        color: inherit;
      }
    `,

    card: css`
      padding: 1rem 1.2rem;

      background: rgba(var(--card-rgb), 0);
      border: 1px solid rgba(var(--card-border-rgb), 0);
      border-radius: var(--border-radius);

      transition:
        background 200ms,
        border 200ms;

      span {
        display: inline-block;
        transition: transform 200ms;
      }

      h2 {
        margin-bottom: 0.7rem;
        font-weight: 600;
      }

      p {
        max-width: 30ch;
        margin: 0;

        font-size: 0.9rem;
        line-height: 1.5;

        opacity: 0.6;
      }
      &:hover {
        background: rgba(var(--card-rgb), 0.1);
        border: 1px solid rgba(var(--card-border-rgb), 0.15);
      }
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
