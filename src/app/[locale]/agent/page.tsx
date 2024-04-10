import { sdk as bff } from '@yuntijs/arcadia-bff-sdk';
import { Flex } from 'antd';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import Agent from './components';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale });
  return {
    title: t('components.index.faXianAIZhi'),
  };
}

export default async function Page() {
  const agentData = await bff
    .listGPTs({
      input: {
        page: 1,
        pageSize: 20,
      },
    })
    .catch(error => {
      console.warn('getAgent failed', error);
    });

  const cateData = await bff.listGPTCategory().catch(error => {
    console.warn('getGPTCategory failed', error);
  });
  return (
    <Flex style={{ overflow: 'hidden', flex: 1 }}>
      <Agent agentData={agentData} cateData={cateData} />
    </Flex>
  );
}
