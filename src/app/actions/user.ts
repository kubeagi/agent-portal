'use server';

import { User } from '@/types/user';

export async function getUserData() {
  // todo
  // 1. use api
  // 2. error handle

  const res = await fetch(`https://api.github.com/repos/kubeagi/agent-portal`, {
    // cache: 'no-store', // 每次都请求动态数据
    next: {
      revalidate: 5, // 缓存
    },
  });
  const data: any = await res.json();
  const user: User = {
    name: data.name,
    full_name: data.full_name,
  };

  // Pass data to the page via props
  return user;
}
