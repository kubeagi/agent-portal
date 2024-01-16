'use server';

type User = {
  name: string;
  full_name: string;
};

export async function getUserData() {
  // Fetch data from external API
  const res = await fetch(`https://api.github.com/repos/kubeagi/agent-portal`, {
    // cache: 'no-store',
    next: {
      revalidate: 5,
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
