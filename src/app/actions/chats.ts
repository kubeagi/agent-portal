'use server';

export async function getChatList() {
  // Fetch data from external API
  const res = await fetch(`https://api.github.com/repos/kubeagi/agent-portal`, {
    // cache: 'no-store',
    next: {
      revalidate: 5,
    },
  });
  const data: any = await res.json();
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
