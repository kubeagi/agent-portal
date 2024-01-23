import classNames from 'classnames';
import { headers } from 'next/headers';
import React from 'react';

import { User } from '@/types/user';

import Chats from './Chats';
import SideBarHeader from './SideBarHeader';
import UserInfoBottom from './UserInfoBottom';
import styles from './index.module.css';

export default function SideBar(props: any | User) {
  const { user } = props;
  const heads = headers();
  const pathname: any = heads.get('next-url'); // get pathname server side
  const showSidebar = ['/chat'].includes(pathname);
  return (
    <div className={classNames(styles.sidebar, showSidebar ? '' : styles.hide_sidebar)}>
      <SideBarHeader />
      <Chats />
      <UserInfoBottom user={user} />
    </div>
  );
}
