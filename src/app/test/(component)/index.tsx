'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStyles } from './styles';

export default function Text() {
  const pathname = usePathname();
  const { styles } = useStyles();
  return (
    <main className={styles.container}>
      <div><Link href="/" className={styles.link}>back to Home</Link></div>
      <div>Pathname: <span className={styles.pathname}>{pathname}</span></div>
      <div><Link href="/test/inner" className={styles.link}>go to Inner</Link></div>
    </main>
  )
}
