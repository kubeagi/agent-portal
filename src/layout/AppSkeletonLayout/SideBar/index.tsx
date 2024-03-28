'use client';

import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import React from 'react';

import { locales } from '@/i18n';

import Chats from './Chats';
import SideBarHeader from './SideBarHeader';
import UserInfoBottom from './UserInfoBottom';
import { useStyles } from './styles';

export default function SideBar() {
  const pathname: any = usePathname();
  const { styles } = useStyles();
  const is_no_sidebar_route = new RegExp(
    `^(?:\/(?:${locales.join('|')}))?\/oidc(?:\/.*|\/?|)|\/logout(?:\/.*|\/?)$`
  ).test(pathname);
  if (is_no_sidebar_route) return <></>;
  const showSidebar = ['/chat'].includes(pathname);
  return (
    <div className={classNames(styles.sidebar, showSidebar ? '' : 'need_hide_sidebar')}>
      <SideBarHeader />
      <Chats />
      <UserInfoBottom />
    </div>
  );
}
