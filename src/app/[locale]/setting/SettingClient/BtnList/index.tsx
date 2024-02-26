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
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';

import BtnsBlock, { Btn } from '@/components/BtnsBlock';
import { useInstallPrompt } from '@/layout/PWAHandlerLayout';

import { useStyles } from './styles';

// interface SettingBtnListProps {}

const SettingBtnList = React.memo<any>(() => {
  const router = useRouter();
  const t = useTranslations();
  const { styles, theme } = useStyles();
  const installPrompt: any = useInstallPrompt();
  const btnsUser: Btn[] = React.useMemo(
    () => [
      {
        icon: User2Icon,
        title: t('BtnList.index.geRenZiLiao'),
        href: '/setting/user-info',
      },
      {
        icon: Cog,
        title: t('DataControlClient.index.shuJuKongZhi'),
        href: '/setting/data-control',
      },
      {
        icon: Settings,
        title: t('AccountClient.index.zhangHaoSheZhi'),
        href: '/setting/account',
      },
    ],
    []
  );

  const btnsMy: Btn[] = React.useMemo(
    () => [
      {
        icon: Bot,
        icon_bg: theme.colorSuccess,
        title: t('BtnList.index.woDeZhiNengTi'),
        href: '/chat',
      },
    ],
    []
  );

  const btnsActions: Btn[] = React.useMemo(
    () => [
      {
        icon: Share2,
        title: t('BtnList.index.fenXiang'),
      },
      {
        icon: MonitorDown,
        title: t('BtnList.index.tianJiaZhiZhuoMian'),
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
        title: t('BtnList.index.shiYongFanKui'),
      },
      {
        icon: Info,
        title: t('BtnList.index.guanYu'),
        href: '/test',
      },
    ],
    [installPrompt]
  );

  const btnsSetting: Btn[] = React.useMemo(
    () => [
      {
        icon: LogOut,
        title: t('BtnList.index.tuiChuDengLu'),
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
