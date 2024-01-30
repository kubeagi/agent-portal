'use server';

import axios from 'axios';

import { User } from '@/types/user';

export async function getUserData() {
  // todo
  // 1. use api / sdk
  // 2. error handle

  const res = await axios.get(`https://api.github.com/repos/kubeagi/agent-portal`);
  const data: any = res;
  const user: User = {
    name: data.name,
    full_name: data.full_name,
  };

  // Pass data to the page via props
  return user;
}
