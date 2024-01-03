import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => {
  return {
    main: css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 6rem;
      min-height: 100vh;
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
      }
    },

    code: css`
      font-weight: 700;
      font-family: var(--font-mono);
    `,

    grid: css`
      display: grid;
      grid-template-columns: repeat(4, minmax(25%, auto));
      max-width: 100%;
      width: var(--max-width);
      a {
        color: inherit;
      }
    `,

    card: css`
      padding: 1rem 1.2rem;
      border-radius: var(--border-radius);
      background: rgba(var(--card-rgb), 0);
      border: 1px solid rgba(var(--card-border-rgb), 0);
      transition: background 200ms, border 200ms;
      
      span {
        display: inline-block;
        transition: transform 200ms;
      }

      h2 {
        font-weight: 600;
        margin-bottom: 0.7rem;
      }

      p {
        margin: 0;
        opacity: 0.6;
        font-size: 0.9rem;
        line-height: 1.5;
        max-width: 30ch;
      }
      &:hover {
        background: rgba(var(--card-rgb), 0.1);
        border: 1px solid rgba(var(--card-border-rgb), 0.15);
      }
    `,

    center: css`
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      padding: 4rem 0;
      &::before {
        background: var(--secondary-glow);
        border-radius: 50%;
        width: 480px;
        height: 360px;
        margin-left: -400px;
      }

      &::after {
        background: var(--primary-glow);
        width: 240px;
        height: 180px;
        z-index: -1;
      }

      &::before, &::after {
        content: '';
        left: 50%;
        position: absolute;
        filter: blur(45px);
        transform: translateZ(0);
      }
    `,
  }
})