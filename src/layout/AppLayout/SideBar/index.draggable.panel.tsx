'use client';

import { DraggablePanel, DraggablePanelContainer } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { useTranslations } from 'next-intl';
import React from 'react';

import UserInfoBottom from './UserInfoBottom';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: column;
  `,
  drawer: {
    // backgroundColor: token.colorBgLayout,
    position: 'relative',
  },
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
  part: css`
    margin-bottom: 30vh;
  `,
}));

const ChatList = () => {
  const { styles } = useStyles();
  const t = useTranslations('SideBar');

  return (
    <DraggablePanel
      className={styles.drawer}
      classNames={{
        content: styles.content,
      }}
      maxWidth={400}
      minWidth={200}
      mode={'fixed'}
      placement={'left'}
    >
      <DraggablePanelContainer
        style={{
          flex: '1',
          height: '100%',
          maxHeight: '100vh',
          minWidth: 200,
          overflow: 'auto',
        }}
      >
        <h3 className={styles.part}>{t('index.zhiNengTiLieBiao')}</h3>
        <h3>{t('index.duiHuaLieBiao')}</h3>
        <UserInfoBottom />
      </DraggablePanelContainer>
    </DraggablePanel>
  );
};

export default ChatList;
