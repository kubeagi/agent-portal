import React from 'react';

import { User } from '@/types/user';

import Chats from './Chats';
import SideBarHeader from './SideBarHeader';
import UserInfoBottom from './UserInfoBottom';
import styles from './index.module.css';

export default function SideBar({ user }: { user: User }) {
  return (
    <div className={styles.sidebar}>
      <SideBarHeader />
      <Chats />
      <UserInfoBottom user={user} />
    </div>
  );
}
