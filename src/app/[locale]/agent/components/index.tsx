'use client';

import { FireOutlined } from '@ant-design/icons';
import { sdk as bff } from '@yuntijs/arcadia-bff-sdk';
import { Avatar, Button, Col, Empty, Row, Spin, Tooltip } from 'antd';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { AgentProps, GPTNode } from '@/app/[locale]/agent/type';
import TitleCom from '@/components/Title';

import TagContent from './TagContent';
import { useStyles } from './styles';

const layout = {
  xs: {
    span: 24,
  },
  sm: {
    span: 12,
  },
  md: {
    span: 12,
  },
  lg: {
    span: 12,
  },
  xl: {
    span: 8,
  },
  xxl: {
    span: 6,
  },
};

const Agent = React.memo<AgentProps>(({ agentData, TZH_AGENT_CATEGORY }) => {
  const t = useTranslations('components');
  const { styles } = useStyles();
  const [selectedTag, setSelectedTags] = useState(TZH_AGENT_CATEGORY[0]);
  // const [pageSize, setPageSize] = useState(-1);
  // const [page, setPage] = useState(1);
  const { data: ListData, loading } = bff.useListGpTs(
    {
      input: {
        category: selectedTag,
        page: 1,
        pageSize: -1,
      },
    },
    { fallbackData: agentData }
  );

  const router = useRouter();
  // const searchParams = useSearchParams()

  useEffect(() => {
    // console.log(searchParams.get('classification'))
  }, []);

  const handleSelectTagChange = (tag: string) => {
    setSelectedTags(tag);
  };
  const nodes = (ListData?.GPT?.listGPT?.nodes || []) as GPTNode[];
  return (
    <div className={styles.agentContainer}>
      <div className={styles.agentContent}>
        <TitleCom
          extra={
            <Button
              onClick={() => {
                router.push('/oidc/auth');
              }}
            >
              {t('index.dengLu')}
            </Button>
          }
          isLeftTitle
          title={t('index.faXianAIZhi')}
        />
        <div>
          <div className={styles.main}>
            <TagContent
              TZH_AGENT_CATEGORY={TZH_AGENT_CATEGORY}
              handleSelectTagChange={handleSelectTagChange}
              selectedTag={selectedTag}
            />
            <div className={classNames(styles.content, 'scrollBar')}>
              <Spin spinning={loading}>
                <Row gutter={[16, 16]}>
                  {nodes.length > 0 ? (
                    nodes
                      .filter(item => item?.category?.includes(selectedTag))
                      .map((item, index) => (
                        <Col {...layout} key={index}>
                          <a
                            className={styles.card}
                            href={`/chat/new?appNamespace=${item.name?.split(
                              '/'
                            )?.[0]}&appName=${item.name?.split('/')?.[1]}`}
                          >
                            <div className={styles.left}>
                              <Avatar shape="square" size={72} src={item.icon} />
                            </div>
                            <div className={styles.right}>
                              <div className={styles.title}>{item.displayName}</div>
                              <Tooltip title={item.description || '-'}>
                                <div className={styles.desc}>{item.description || '-'}</div>
                              </Tooltip>
                              <div className={styles.info}>
                                <span className={styles.heat}>
                                  <FireOutlined /> {item.hot} w
                                </span>
                                <span className={styles.creator}>@{item.creator}</span>
                              </div>
                            </div>
                          </a>
                        </Col>
                      ))
                  ) : (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      style={{ flex: 1, marginTop: '20vh' }}
                    />
                  )}
                </Row>
              </Spin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Agent;
