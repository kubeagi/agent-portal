import { sdk as bff } from '@yuntijs/arcadia-bff-sdk';
import { Flex } from 'antd';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { AGENT_CATEGORY_INDEXES } from '@/utils/constants';

import Agent from './components';

export default async function Page() {
  const agentData = await bff
    .listGPTs({
      input: {
        page: 1,
        pageSize: 99,
      },
    })
    .catch(error => {
      console.warn('getAgent failed', error);
    });
  const t_zh = await getTranslations({ locale: 'zh' });
  const TZH_AGENT_CATEGORY = AGENT_CATEGORY_INDEXES.map(item => t_zh(item));
  return (
    <Flex style={{ overflow: 'hidden', flex: 1 }}>
      <Agent TZH_AGENT_CATEGORY={TZH_AGENT_CATEGORY} agentData={agentData} />
    </Flex>
  );
}
