'use server';

import classnames from 'classnames';
import React from 'react';

import { getChatList } from '@/app/actions/chats';
import { DEFAULT_CHAT } from '@/utils/constants';

import ChatItem from './Item';
import styles from './index.module.css';

const default_chat_obj: any = {
  key: DEFAULT_CHAT,
  value: '默认对话',
};

const Chats: any = async () => {
  const list = await getChatList();
  return (
    <div className={classnames(styles.chats, 'scrollBar')}>
      <div className={styles.content}>
        {[default_chat_obj, ...list].map((item: any, idx: number) => (
          <ChatItem data={item} key={item.key + '' + idx} />
        ))}
      </div>
    </div>
  );
};

export default Chats;
