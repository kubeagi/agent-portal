'use client';

import { Button } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useStyles } from './styles';

export default function Text() {
  const pathname = usePathname();
  const { styles } = useStyles();
  return (
    <main className={styles.container}>
      <div>
        <Link href="/test">back to Test</Link>
      </div>
      <div>
        <a href="/test">back to Test, test a 链接中的文字</a>
      </div>
      <Button>
        Pathname: <span>{pathname}</span>
      </Button>
      <div>
        line 2 Pathname: <span>{pathname}</span> 文字的力量
      </div>
    </main>
  );
}
