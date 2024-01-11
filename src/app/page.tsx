// import DesktopPage from './(desktop)';
// import { isMobileDevice } from '@/utils';
// import { getUserData } from './actions/user';
// export default async function Page() {
//   const user = await getUserData();
//   const mobile = isMobileDevice();
//   const Page = mobile ? DesktopPage : DesktopPage;
//   // return user.username;
//   return (
//     <Page />
//   )
// }
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/chat');
}
