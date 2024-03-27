'use client';

import { sdk } from '@yuntijs/bff-client';
import { App, Flex, Skeleton, SkeletonProps, Switch } from 'antd';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import React from 'react';

import BtnsBlock, { Btn } from '@/components/BtnsBlock';
import ReturnBtn from '@/components/ReturnBtn';

import { useStyles } from './styles';

interface Props {
  url: string | undefined;
}

const AccountClient: React.FC<Props> = ({ url }) => {
  const { styles } = useStyles();
  const t = useTranslations('AccountClient');
  const [checked, setChecked] = React.useState(false);
  const { modal } = App.useApp();
  const { data } = sdk.useGetCurrentUser();
  const user = data?.userCurrent;
  const skeletonProps: SkeletonProps = {
    paragraph: false,
    style: {
      width: 120,
    },
  };
  const btns1: Btn[] = React.useMemo(
    () => [
      {
        title: t('index.geXingHuaNeiRong'),
        action: (
          <Switch
            checked={checked}
            onChange={_checked => {
              setChecked(_checked);
            }}
          />
        ),
      },
    ],
    [checked]
  );
  const btnsUser: Btn[] = React.useMemo(
    () => [
      {
        title: t('index.shouJi'),
        btn_extra: user?.phone || <Skeleton {...skeletonProps} />,
        onClick: () => {
          window.open(`${url}/management/account`);
        },
      },
      {
        title: t('index.weiXin'),
        // btn_extra: user?.phone,
        onClick: () => {
          // dynamic BtnsBlock 会闪一下(没有 block 占位), 再细分 dynamic ?
          modal.confirm({
            title: user?.name,
          });
        },
      },
      {
        title: t('index.youXiang'),
        btn_extra: user?.email || <Skeleton {...skeletonProps} />,
        onClick: () => {
          window.open(`${url}/management/account`);
        },
      },
    ],
    [user, modal]
  );
  const btns_del_all: Btn[] = React.useMemo(
    () => [
      {
        title: t('index.zhuXiaoZhangHu'),
        danger: true,
        onClick: () => {
          console.warn('delete user');
        },
      },
    ],
    [checked]
  );
  return (
    <div className={classNames(styles.account)}>
      <div>
        <ReturnBtn title={t('index.zhangHaoSheZhi')} to="/setting" />
        <Flex className={'scrollBar'} justify={'center'}>
          <div className={classNames(styles.content)}>
            <BtnsBlock btns={btnsUser} />
            <BtnsBlock btns={btns1} extra={t('index.tongGuoNiDePian')} />
            <BtnsBlock btns={btns_del_all} />
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default AccountClient;
