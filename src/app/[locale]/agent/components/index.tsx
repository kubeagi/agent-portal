'use client';

import { FireOutlined, PlusOutlined } from '@ant-design/icons';
import { sdk as bff } from '@yuntijs/arcadia-bff-sdk';
import { Button, Col, Row, Spin, Tooltip } from 'antd';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import React, { useState } from 'react';

import TitleCom from '@/components/Title';
import { useAuthContext } from '@/layout/AuthLayout';
import { setLoginRedirect } from '@/utils/client';

import TagContent from './TagContent';
import { useStyles } from './styles';

interface AgentProps {
  agentData?: any;
  cateData?: any;
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

const Agent = React.memo<AgentProps>(({ agentData, cateData }) => {
  const t = useTranslations();
  const { authed } = useAuthContext();
  const router = useRouter();
  const [category] = useQueryState('category');
  const { styles } = useStyles();
  // ""，表示推荐标签"
  const [selectedTag, setSelectedTags] = useState(category || '');
  // const [pageSize, setPageSize] = useState(-1);
  // const [page, setPage] = useState(1);
  const { data: ListData = [], loading } = bff.useListGpTs(
    {
      input: {
        category: selectedTag,
        page: 1,
        pageSize: -1,
      },
    },
    // agentData 是"推荐"选项的数据，所以非“推荐”选项的fallbackData数据就是[]
    { fallbackData: selectedTag ? [] : agentData }
  );

  const handleSelectTagChange = tag => {
    setSelectedTags(tag);
  };
  const getTitleExtra = () => {
    if (authed === undefined) return; // 未进行验证
    return authed ? (
      <Button
        icon={<PlusOutlined />}
        // onClick={() => router.push('/chat/bot/create')}
        size="large"
        type="primary"
      >
        {t('SideBarHeader.index.chuangJianZhiNengTi')}
      </Button>
    ) : (
      <Button onClick={() => router.push('/oidc/auth')}>{t('components.index.dengLu')}</Button>
    );
  };
  return (
    <div className={styles.agentContainer}>
      <div className={styles.agentContent}>
        <TitleCom extra={getTitleExtra()} isLeftTitle title={t('components.index.faXianAIZhi')} />
        <div>
          <div className={styles.main}>
            <TagContent
              cateList={cateData?.GPT?.listGPTCategory || []}
              handleSelectTagChange={handleSelectTagChange}
              selectedTag={selectedTag}
            />
            <div className={classNames(styles.content, 'scrollBar')}>
              <Spin spinning={loading}>
                <Row gutter={[16, 16]}>
                  {(ListData?.GPT?.listGPT?.nodes || []).map((item, index) => (
                    <Col {...layout} key={index}>
                      <Link
                        className={styles.card}
                        href={
                          authed
                            ? `/chat/new?appNamespace=${item.name?.split(
                                '/'
                              )?.[0]}&appName=${item.name?.split('/')?.[1]}`
                            : '/oidc/auth'
                        }
                        onClick={() => {
                          if (!authed) {
                            setLoginRedirect(
                              `/chat/new?appNamespace=${item.name?.split(
                                '/'
                              )?.[0]}&appName=${item.name?.split('/')?.[1]}`
                            );
                          }
                        }}
                      >
                        <div className={styles.left}>
                          <Image alt={item.displayName} height={72} src={item.icon} width={72} />
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
                      </Link>
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
