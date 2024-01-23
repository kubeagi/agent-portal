'use client';

import { CodepenCircleOutlined, SlackSquareOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { ChevronRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { useStyles } from './styles';

const SidebarHeader = () => {
  const { styles } = useStyles();
  return (
    <Flex className={styles.sidebarHeader} vertical>
      <div className={styles.logo}>
        <Link href="/chat">AgileGPT</Link>
      </div>
      <Flex className={styles.btns} vertical>
        <Link className={styles.linkItem} href="/">
          <CodepenCircleOutlined />
          <span className={styles.btnName}>创建智能体</span>
          <ChevronRight color={'rgb(204, 204, 204)'} />
        </Link>
        <Link className={styles.linkItem} href="/">
          <SlackSquareOutlined />
          <span className={styles.btnName}>发现智能体</span>
          <ChevronRight color={'rgb(204, 204, 204)'} />
        </Link>
      </Flex>
      <Flex align={'center'} className={styles.chatsTitle} justify={'space-between'}>
        <div className={styles._title}>对话</div>
        <div className={styles.newbtn}>
          <MessageCircle /> 新对话
        </div>
      </Flex>
    </Flex>
  );
};

export default SidebarHeader;
