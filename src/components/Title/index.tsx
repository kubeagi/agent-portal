'use client';

import { Flex } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';

export const useStyles = createStyles(() => ({
  TitleCom: {
    padding: '0 24px',
    height: '64px',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 9,
    overflowY: 'auto',
  },
  title: {
    flex: '1 1',
    alignItems: 'center',
    display: 'flex',
    fontWeight: 590,
    fontSize: 16,
    flexDirection: 'column',
    marginLeft: '-40px',
  },
  leftTitle: {
    fontWeight: 590,
    fontSize: 16,
  },
  layout: {
    width: '100%',
  },
}));

interface TitleComProps {
  to?: string;
  title?: string;
  isLeftTitle?: boolean;
  extra?: React.ReactNode;
}

const TitleCom = React.memo<TitleComProps>(props => {
  const { extra, isLeftTitle } = props;
  const { styles } = useStyles();
  return (
    <Flex align={'center'} className={styles.TitleCom}>
      {isLeftTitle ? (
        <Flex align="center" className={styles.layout} justify="space-between">
          <div className={styles.leftTitle}>{props.title}</div>
          {extra}
        </Flex>
      ) : (
        <div className={styles.title}>{props.title}</div>
      )}
    </Flex>
  );
});

export default TitleCom;
