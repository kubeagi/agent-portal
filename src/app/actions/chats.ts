'use server';

import axios from 'axios';

export async function getChatList() {
  // Fetch data from external API
  const data: any = await axios.get(`https://api.github.com/repos/kubeagi/agent-portal`);
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
