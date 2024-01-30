'use client';

import { SettingOutlined } from '@ant-design/icons';
import { ActionIcon } from '@lobehub/ui';
import { Button, Empty, List, Space, Spin } from 'antd';
import useAxios from 'axios-hooks';
import { Settings } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import LogoSvg from '@/../public/logo.svg';

import TextComponent from './(component)';
import { useStyles } from './styles';

const app_name = 'bjwswang';
const app_namespace = 'rag-eval';

const Test = React.memo<any>(() => {
  const { styles } = useStyles();
  const [{ data, loading, error }, getList] = useAxios(
    {
      url: '/kubeagi-apis/chat/conversations',
      method: 'POST',
    },
    { manual: true }
  );
  React.useEffect(() => {
    getList({
      data: {
        app_name,
        app_namespace,
      },
    }).catch((error_: Error) => {
      if (error_.name === 'CanceledError') {
        console.warn('dev bug, render twice ?');
      }
    });
  }, []);
  return (
    <div className={styles.wrapper}>
      <Spin spinning={loading}>
        {!data || loading ? (
          <Empty />
        ) : (
          <div
            style={{
              whiteSpace: 'pre-line',
              textAlign: 'left',
            }}
          >
            <div>
              axios.get conversations:{' '}
              {`\n(app_name: ${app_name}, app_namespace: ${app_namespace})`}
            </div>
            <List
              bordered
              dataSource={data}
              renderItem={(item: any) => <List.Item>{item?.messages?.[0]?.query}</List.Item>}
              style={{ backgroundColor: 'white', marginTop: 16, width: 500 }}
            />
          </div>
        )}
        {error ? <div>{JSON.stringify(error)}</div> : null}
      </Spin>
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
    </div>
  );
});

export default Test;
