'use client';

import { Divider, List, Skeleton } from 'antd';
import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAxiosRequest } from '@/utils/axios';

// import { DEFAULT_CHAT } from '@/utils/constants';
import ChatItem from './Item';
import { useStyles } from './styles';

const default_load_size = 10;

// const default_chat_obj: any = {
//   id: DEFAULT_CHAT,
//   title: I18N.Chats.index.moRenDuiHua,
//   desc: I18N.Chats.index.duiHuaBaLaBa,
// };

const EMPTY_ITEMS = [1, 2, 3, 4];

const Chats: any = () => {
  const { styles } = useStyles();
  const [allData, setAllData] = React.useState<any>([]);
  const [showData, setShowData] = React.useState<any>([]);

  const [{ data }, getList] = useAxiosRequest({
    url: '/kubeagi-apis/chat/conversations',
    method: 'POST',
  });

  React.useEffect(() => {
    const _all =
      data?.map((item: any) => ({
        title: item.messages?.[0]?.query || item.app_name,
        desc: item.messages?.[0]?.answer,
        ...item,
      })) || [];
    setAllData(_all);
    setShowData(cloneDeep(_all).splice(0, default_load_size));
  }, [data]);

  const loadMoreData = React.useCallback(() => {
    if (allData.length === showData.length) return; // 删除最后一条会调用一次 next, 暂时用此屏蔽再次 setData
    setShowData((pre: any) => [
      ...pre,
      ...cloneDeep(allData).splice(pre.length, default_load_size),
    ]);
  }, [allData, showData]);

  const delDom = React.useCallback(
    (record?: any, isActiveChat?: boolean) => {
      setShowData((pre: any) => pre.filter((_item: any) => _item.id !== record.id));
      setAllData((pre: any) => pre.filter((_item: any) => _item.id !== record.id));
      if (isActiveChat) {
        document.querySelector(`.${styles.chats}`)?.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    },
    [setShowData, setAllData]
  );

  const renderEmpty = React.useCallback(() => {
    return EMPTY_ITEMS.map(item => {
      return (
        <Skeleton
          avatar={{ size: 42 }}
          className={styles.emptyItem}
          key={item}
          paragraph={{
            rows: 2,
          }}
          title={false}
        />
      );
    });
  }, []);
  return (
    <div className={classnames(styles.chats, 'scrollBar')} id={'infinite_' + styles.chats}>
      <div className={styles.content}>
        {data && showData.length > 0 ? (
          <InfiniteScroll
            dataLength={showData.length}
            endMessage={
              allData.length > default_load_size ? (
                <Divider className={styles.dividerText} plain>
                  我是有底线的
                </Divider>
              ) : null
            }
            hasMore={showData.length < allData.length}
            loader={
              <Skeleton
                avatar={{ size: 42 }}
                className={styles.emptyItem}
                key={'empty'}
                paragraph={{
                  rows: 2,
                }}
                title={false}
              />
            }
            next={loadMoreData}
            scrollableTarget={'infinite_' + styles.chats}
          >
            <List
              bordered={false}
              dataSource={showData}
              renderItem={(item: any, idx) => (
                <List.Item key={item.id + idx}>
                  <ChatItem
                    data={item}
                    delDom={delDom}
                    key={item.key + '' + idx}
                    reload={() => {
                      getList();
                    }}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        ) : (
          renderEmpty()
        )}
      </div>
    </div>
  );
};

export default Chats;
