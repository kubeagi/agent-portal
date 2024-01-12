import React from 'react';

import Chats from './Chats';
import SideBarHeader from './SideBarHeader';
import UserInfoBottom from './UserInfoBottom';
import styles from './index.module.css';

const ChatList = () => {
  return (
    <div className={styles.sidebar}>
      <SideBarHeader />
      <Chats />
      <UserInfoBottom />
    </div>
  );
};

export default ChatList;
