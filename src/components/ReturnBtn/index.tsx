'use client';

import { ActionIcon } from '@lobehub/ui';
import { Flex } from 'antd';
import { createStyles } from 'antd-style';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const useStyles = createStyles(({ css, token }) => ({
  returnBtn: {
    padding: '0 16px',
    height: '64px',
    position: 'fixed',
    top: 0,
    width: '100%',
  },
  btn: {
    borderRadius: '12px !important',
    svg: {
      width: 25,
      height: 25,
    },
  },
}));

interface ReturnBtnProps {
  to?: string;
}

const ReturnBtn = React.memo<ReturnBtnProps>(props => {
  const { to } = props;
  const { styles } = useStyles();
  return (
    <Flex align={'center'} className={styles.returnBtn}>
      <Link href={to || '/chat'}>
        <ActionIcon className={styles.btn} icon={ChevronLeft} />
      </Link>
    </Flex>
  );
});

export default ReturnBtn;
