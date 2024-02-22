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
import { useRouter } from 'next/navigation';
import React from 'react';

import BtnsBlock, { Btn } from '@/components/BtnsBlock';
import { useInstallPrompt } from '@/layout/PWAHandlerLayout';

import { useStyles } from './styles';

// interface SettingBtnListProps {}

const SettingBtnList = React.memo<any>(() => {
  const router = useRouter();
  const { styles, theme } = useStyles();
  const installPrompt: any = useInstallPrompt();
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
        onClick: () => {
          if (installPrompt) {
            console.warn('installPrompt', installPrompt);
            installPrompt.prompt();

            // 等待用户做出选择
            installPrompt.userChoice.then(
              (choiceResult: { outcome: 'accepted' | 'dismissed'; platform: string }) => {
                if (choiceResult.outcome === 'accepted') {
                  // console.warn('用户接受了安装应用');
                } else {
                  // console.warn('用户拒绝了安装应用');
                }

                // 清除 installPrompt，因为它不能被重用
                // setInstallPrompt(null);
              }
            );
          }
        },
      },
      {
        icon: MessageCircleMore,
        title: '使用反馈',
      },
      {
        icon: Info,
        title: '关于',
        href: '/test',
      },
    ],
    [installPrompt]
  );

  const btnsSetting: Btn[] = React.useMemo(
    () => [
      {
        icon: LogOut,
        title: '退出登录',
        onClick: () => {
          router.push('/oidc/logout');
        },
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
