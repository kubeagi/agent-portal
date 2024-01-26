'use server';

import requestSsr from '@/utils/request.ssr';

export async function getChatList() {
  // Fetch data from external API
  const data: any = await requestSsr.get({
    url: `https://api.github.com/repos/kubeagi/agent-portal`,
    options: {
      // cache: 'no-store', // 每次都请求动态数据
      next: {
        revalidate: 5, // 缓存
      },
    },
  });
  const list: any = [
    {
      key: 'name',
      value: data.name,
    },

    {
      key: 'full_name',
      value: data.full_name,
    },
  ];

  return list || [];
}
