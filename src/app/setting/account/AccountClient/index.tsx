'use client';

import { sdk } from '@tenx-ui/bff-client';
import { App, Flex, Skeleton, SkeletonProps, Switch } from 'antd';
import classNames from 'classnames';
import React from 'react';

import BtnsBlock, { Btn } from '@/components/BtnsBlock';
import ReturnBtn from '@/components/ReturnBtn';

import { useStyles } from './styles';

interface Props {
  url: string | undefined;
}

const AccountClient: React.FC<Props> = ({ url }) => {
  const { styles } = useStyles();
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
        title: '个性化内容推荐',
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
        title: '手机',
        btn_extra: user?.phone || <Skeleton {...skeletonProps} />,
        onClick: () => {
          window.open(`${url}/management/account`);
        },
      },
      {
        title: '微信',
        // btn_extra: user?.phone,
        onClick: () => {
          // todo 服务端渲染刷新时报错了, 但是清缓存刷新可以正常交互, 只在dev模式下有问题, 待处理 dynamic ?
          // dynamic BtnsBlock 会闪一下(没有 block 占位), 再细分 dynamic ?
          modal.confirm({
            title: user?.name,
          });
        },
      },
      {
        title: '邮箱',
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
        title: '注销账户',
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
        <ReturnBtn title="账号设置" to="/setting" />
        <Flex className={'scrollBar'} justify={'center'}>
          <div className={classNames(styles.content)}>
            <BtnsBlock btns={btnsUser} />
            <BtnsBlock btns={btns1} extra="通过你的偏好特征，向你推荐可能感兴趣的内容。" />
            <BtnsBlock btns={btns_del_all} />
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default AccountClient;
