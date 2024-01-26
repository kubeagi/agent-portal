'use server';

import { User } from '@/types/user';
import requestSsr from '@/utils/request.ssr';

export async function getUserData() {
  // todo
  // 1. use api / sdk
  // 2. error handle

  const res = await requestSsr.get({
    url: `https://api.github.com/repos/kubeagi/agent-portal`,
    options: {
      // cache: 'no-store', // 每次都请求动态数据
      next: {
        revalidate: 5, // 缓存
      },
    },
  });
  const data: any = res;
  const user: User = {
    name: data.name,
    full_name: data.full_name,
  };

  // Pass data to the page via props
  return user;
}
