'use client';

import { CodepenCircleOutlined, SlackSquareOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { ChevronRight, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

import { useStyles } from './styles';

const SidebarHeader = () => {
  const t = useTranslations('SideBarHeader');
  const { styles } = useStyles();
  return (
    <Flex className={styles.sidebarHeader} vertical>
      <div className={styles.logo}>
        <Link href="/chat">AgileGPT</Link>
      </div>
      <Flex className={styles.btns} vertical>
        <Link className={styles.linkItem} href="/chat/bot/create">
          <CodepenCircleOutlined />
          <span className={styles.btnName}>{t('index.chuangJianZhiNengTi')}</span>
          <ChevronRight color={'rgb(204, 204, 204)'} />
        </Link>
        <Link className={styles.linkItem} href="/agent">
          <SlackSquareOutlined />
          <span className={styles.btnName}>{t('index.faXianZhiNengTi')}</span>
          <ChevronRight color={'rgb(204, 204, 204)'} />
        </Link>
      </Flex>
      <Flex align={'center'} className={styles.chatsTitle} justify={'space-between'}>
        <div className={styles._title}>{t('index.duiHua')}</div>
        <div className={styles.newbtn}>
          <MessageCircle /> {t('index.xinDuiHua')}
        </div>
      </Flex>
    </Flex>
  );
};

export default SidebarHeader;
