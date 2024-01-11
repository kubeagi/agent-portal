'use client';

import { SettingOutlined } from '@ant-design/icons';
import { ActionIcon } from '@lobehub/ui';
import { Button, Space } from 'antd';
import { Settings } from 'lucide-react';
import Image from 'next/image';

import LogoSvg from '@/../public/logo.svg';

import TextComponent from './(component)';
import { useStyles } from './styles';

export default function Test() {
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
        <LogoSvg className={styles.logo} height={37} width={180} />
        <Image alt="logo" className={styles.logo} height={37} src={'/logo.svg'} width={180} />
      </div>

      <Space>
        <Button>
          <SettingOutlined />
        </Button>
        <ActionIcon icon={Settings} size="large" />
      </Space>

      <TextComponent />
    </main>
  );
}
