import { sdk as bff } from '@yuntijs/arcadia-bff-sdk';
import React from 'react';

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

  return (
    <>
      <Agent agentData={agentData} />
    </>
  );
}
