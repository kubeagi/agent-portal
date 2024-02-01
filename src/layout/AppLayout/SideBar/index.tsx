'use client';

import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import React from 'react';

import Chats from './Chats';
import SideBarHeader from './SideBarHeader';
import UserInfoBottom from './UserInfoBottom';
import { useStyles } from './styles';

export default function SideBar() {
  const { styles } = useStyles();
  const pathname: any = usePathname();
  const showSidebar = ['/chat'].includes(pathname);
  return (
    <div className={classNames(styles.sidebar, showSidebar ? '' : 'hide_sidebar')}>
      <SideBarHeader />
      <Chats />
      <UserInfoBottom />
    </div>
  );
}
