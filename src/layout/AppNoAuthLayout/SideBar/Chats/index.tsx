'use client';

import classnames from 'classnames';
import { useTranslations } from 'next-intl';
import React from 'react';

import { DEFAULT_CHAT } from '@/utils/constants';

import ChatItem from './Item';
import { useStyles } from './styles';

const Chats: any = () => {
  const { styles } = useStyles();
  const t = useTranslations('Chats');

  const default_chat_obj: any = React.useMemo(() => {
    return {
      id: DEFAULT_CHAT,
      title: t('index.moRenDuiHua'),
      desc: t('index.duiHuaBaLaBa'),
    };
  }, []);

  // todo: 未登录时从后端获取默认对话 ?
  // const [{ data }, getList] = useAxiosRequest({
  //   url: '/kubeagi-apis/chat/conversations',
  //   method: 'POST',
  // });
  // const list = useMemo(() => {
  //   const res =
  //     data?.map((item: any) => ({
  //       title: item.messages?.[0]?.query,
  //       desc: item.messages?.[0]?.answer,
  //       ...item,
  //     })) || [];
  //   return res;
  // }, [data]);

  return (
    <div className={classnames(styles.chats, 'scrollBar')}>
      <div className={styles.content}>
        {[
          default_chat_obj,
          // ...list,
        ].map((item: any, idx: number) => (
          <ChatItem
            data={item}
            key={item.key + '' + idx}
            reload={(isActiveChat?: boolean) => {
              // getList();
              if (isActiveChat) {
                document.querySelector(`.${styles.chats}`)?.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Chats;
