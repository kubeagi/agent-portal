'use client';

import { Skeleton } from 'antd';
import classnames from 'classnames';
import React from 'react';

import { useStyles } from './styles';

const EMPTY_ITEMS = [1, 2, 3, 4];

const Chats: any = () => {
  const { styles } = useStyles();
  return (
    <div className={classnames(styles.chats, 'scrollBar')}>
      <div className={styles.content}>
        {EMPTY_ITEMS.map(item => {
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
        })}
      </div>
    </div>
  );
};

export default Chats;
