'use client';

import Link from 'next/link';
import { useStyles } from './styles';
import LogoSvg from '@/../public/logo.svg';
import Image from 'next/image';

export default function Home() {
  const { styles } = useStyles();
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
      </div>

      <div className={styles.center}>
        <LogoSvg
          className={styles.logo}
          width={180}
          height={37}
        />
        <Image
          src={'/logo.svg'}
          alt="logo"
          className={styles.logo}
          width={180}
          height={37}
        />
      </div>

      <div className={styles.grid}>
        <Link
          href="/test"
          className={styles.card}
        >
          <h2>
            Text
          </h2>
          <p>link to /text.</p>
        </Link>

      </div>
    </main>
  )
}
