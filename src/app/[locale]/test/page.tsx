'use client';

import { SettingOutlined } from '@ant-design/icons';
import { ActionIcon } from '@lobehub/ui';
import { Button, List, Space, Spin } from 'antd';
import { Settings } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import LogoSvg from '@/../public/logo.svg';
import { useAxiosRequest } from '@/utils/axios';

import TextComponent from './(component)';
import { useStyles } from './styles';

const app_name = 'bjwswang';
const app_namespace = 'rag-eval';

const Test = React.memo<any>(() => {
  const { styles } = useStyles();
  const body = {
    data: {
      // app_name,
      // app_namespace,
    },
  };
  // 如果需要刷新页面就自动调用接口, 需要用封装后的 useAxiosRequest, 避免 axios hooks 初始化前就调用
  const [{ data, loading, error }, loadList] = useAxiosRequest(
    {
      url: '/kubeagi-apis/chat/conversations',
      method: 'POST',
    },
    {}, // use axios options
    body // 可选: loadList 回调参数
  );

  // 如果执行某 action, 比如创建可以直接使用 useAxios
  // const [{ data, loading, error }, excute] = useAxios(
  //   {
  //     url: '/kubeagi-apis/xxxx',
  //     method: 'POST',
  //   },
  //   {
  //     manual: true,
  //   },
  // );
  // ...
  // somewhere: excute([config[, options]])
  // 推荐使用 useAxios / useAxiosRequest, 也可以直接使用 axios 的 instance:
  // const axios = createCustomAxios()

  const [{ data: get_test_data, loading: get_test_loading, error: get_test_error }, loadStat] =
    useAxiosRequest({
      url: '/kubeagi-apis/bff/model/files/chunks?fileName=abc.csv&bucket=arcadia&bucketPath=dataset/dataset/v1&etag=aaaaaaa&md5=bbbbb',
      headers: {
        namespace: 'arcadia',
      },
    });

  return (
    <div className={styles.wrapper}>
      <Spin spinning={loading || get_test_loading}>
        <div>
          <Button
            onClick={() => {
              loadList(body);
              loadStat();
            }}
          >
            刷新
          </Button>
        </div>
        <div
          style={{
            whiteSpace: 'pre-line',
            textAlign: 'center',
          }}
        >
          <div>
            hooks (axios.get) test: <br />
            <b>
              {get_test_data ? (
                <>res: {JSON.stringify(get_test_data)}</>
              ) : (
                <>error: {JSON.stringify(get_test_error)}</>
              )}
            </b>
            <br />
            <br />
          </div>
          <div>
            hooks (axios.post) conversations:{' '}
            {`\n(app_name: ${app_name}, app_namespace: ${app_namespace})`}
          </div>
          <List
            bordered
            dataSource={data}
            renderItem={(item: any) => <List.Item>{item?.messages?.[0]?.query}</List.Item>}
          />
        </div>
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
