'use client';

import { FireOutlined } from '@ant-design/icons';
import { sdk as bff } from '@yuntijs/arcadia-bff-sdk';
import { Avatar, Button, Col, Row, Spin, Tooltip } from 'antd';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
// import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import ReturnBtn from '@/components/ReturnBtn';

import TagContent from './TagContent';
import { useStyles } from './styles';

interface AgentProps {
  agentData?: any;
}

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

const Agent = React.memo<AgentProps>(({ agentData }) => {
  const t = useTranslations('components');
  const { styles } = useStyles();
  const [selectedTag, setSelectedTags] = useState(t('index.tuiJian'));
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
  // const router = useRouter();
  // const searchParams = useSearchParams()

  useEffect(() => {
    // console.log(searchParams.get('classification'))
  }, []);

  const handleSelectTagChange = tag => {
    setSelectedTags(tag);
  };

  return (
    <div className={styles.agentContainer}>
      <div className={styles.agentContent}>
        <ReturnBtn
          extra={<Button>{t('index.dengLu')}</Button>}
          isLeftTitle
          title={t('index.faXianAIZhi')}
          to="/chat"
        />
        <div>
          <div className={styles.main}>
            <TagContent handleSelectTagChange={handleSelectTagChange} />
            <div className={classNames(styles.content, 'scrollBar')}>
              <Spin spinning={loading}>
                <Row gutter={[16, 16]}>
                  {(ListData?.GPT?.listGPT?.nodes || [])
                    .filter(item => item.category.includes(selectedTag))
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
                    ))}
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
