'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useStyles } from './styles';

export default function Text() {
  const pathname = usePathname();
  const { styles } = useStyles();
  return (
    <div className={styles.container}>
      <div>
        <Link className={styles.link} href="/">
          back to Home
        </Link>
      </div>
      <div>
        Pathname: <span className={styles.pathname}>{pathname}</span>
      </div>
      <div>
        <Link href="/test/inner">go to Inner</Link>
      </div>
    </div>
  );
}
