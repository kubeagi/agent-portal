'use client'

import Link from 'next/link';
import { Button } from 'antd';
import { usePathname } from 'next/navigation';
import { useStyles } from './styles';

export default function Text() {
  const pathname = usePathname();
  const { styles } = useStyles();
  return (
    <main className={styles.container}>
      <div><Link href="/">back to Home</Link></div>
      <Button>Pathname: <span>{pathname}</span></Button>
    </main>
  )
}
