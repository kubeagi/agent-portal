import {
  Bot,
  Cog,
  Info,
  LogOut,
  MessageCircleMore,
  MonitorDown,
  Settings,
  Share2,
  User2Icon,
} from 'lucide-react';
import React from 'react';

import BtnsBlock, { Btn } from '@/components/BtnsBlock';

import { useStyles } from './styles';

// interface SettingBtnListProps {}

const SettingBtnList = React.memo<any>(() => {
  const { styles, theme } = useStyles();
  const btnsUser: Btn[] = React.useMemo(
    () => [
      {
        icon: User2Icon,
        title: '个人资料',
        href: '/setting/user-info',
      },
      {
        icon: Cog,
        title: '数据控制',
        href: '/setting/data-control',
      },
      {
        icon: Settings,
        title: '账号设置',
      },
    ],
    []
  );

  const btnsMy: Btn[] = React.useMemo(
    () => [
      {
        icon: Bot,
        icon_bg: theme.colorSuccess,
        title: '我的智能体',
        href: '/chat',
      },
    ],
    []
  );

  const btnsActions: Btn[] = React.useMemo(
    () => [
      {
        icon: Share2,
        title: '分享',
      },
      {
        icon: MonitorDown,
        title: '添加至桌面',
      },
      {
        icon: MessageCircleMore,
        title: '使用反馈',
      },
      {
        icon: Info,
        title: '关于',
      },
    ],
    []
  );

  const btnsSetting: Btn[] = React.useMemo(
    () => [
      {
        icon: LogOut,
        title: '退出登录',
      },
    ],
    []
  );
  return (
    <div className={styles.btnlist}>
      <BtnsBlock btns={btnsMy} />
      <BtnsBlock btns={btnsUser} />
      <BtnsBlock btns={btnsActions} />
      <BtnsBlock btns={btnsSetting} />
    </div>
  );
});

export default SettingBtnList;
