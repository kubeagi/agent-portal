'use server';

import classnames from 'classnames';
import React from 'react';

import { getChatList } from '@/app/actions/chats';

import ChatItem from './Item';
import styles from './index.module.css';

const Chats: any = async () => {
  const list = await getChatList();
  return (
    <div className={classnames(styles.chats, 'scrollBar')}>
      <div className={styles.content}>
        {list.map((item: any, idx: number) => (
          <ChatItem data={item} key={item.name + idx} />
        ))}
      </div>
    </div>
  );
};

export default Chats;
