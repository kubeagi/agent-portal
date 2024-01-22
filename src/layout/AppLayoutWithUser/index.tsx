'use server';

import { getUserData } from '@/app/actions/user';
import AppLayout from '@/layout/AppLayout';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUserData();
  return <AppLayout user={user}>{children}</AppLayout>;
}
