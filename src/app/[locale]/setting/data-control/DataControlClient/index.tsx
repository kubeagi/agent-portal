'use client';

import { Button, Card, Flex, Switch, Table } from 'antd';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import React from 'react';

import BtnsBlock, { Btn } from '@/components/BtnsBlock';
import ReturnBtn from '@/components/ReturnBtn';

import { useStyles } from './styles';

interface Props {
  user?: {
    name: string;
  };
}

const DataControlClient: React.FC<Props> = () => {
  const { styles } = useStyles();
  const [checked, setChecked] = React.useState(false);
  const t = useTranslations('DataControlClient');

  const btns1: Btn[] = React.useMemo(
    () => [
      {
        title: t('index.liaoTianJiLuYing'),
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
  const btns_del_all: Btn[] = React.useMemo(
    () => [
      {
        title: t('index.shanChuSuoYouLiao'),
        danger: true,
        onClick: () => {
          console.warn('handel del all');
        },
      },
    ],
    [checked]
  );
  return (
    <div className={classNames(styles.dataControl)}>
      <div>
        <ReturnBtn title={t('index.shuJuKongZhi')} to="/setting" />
        <Flex className={'scrollBar'} justify={'center'}>
          <div className={classNames(styles.content)}>
            <BtnsBlock btns={btns1} extra={t('index.jiangCiLiuLanQi')} />
            <BtnsBlock btns={btns_del_all} />
            <Card bordered={false} title={t('index.fenXiangLianJie')}>
              <Table
                className={styles.table}
                columns={[
                  {
                    dataIndex: 'name',
                    title: t('index.duiHuaMingCheng'),
                    width: '50%',
                  },
                  {
                    dataIndex: 'time',
                    title: t('index.fenXiangShiJian'),
                    width: '50%',
                  },
                  {
                    dataIndex: 'opera',
                    title: t('index.caoZuo'),
                    width: 120,
                    render: () => {
                      return (
                        <Button danger type="primary">
                          {t('index.shanChu')}
                        </Button>
                      );
                    },
                  },
                ]}
                dataSource={[
                  {
                    name: t('index.duiHua'),
                    time: '2024-01-01 08:08:08',
                  },
                ]}
                pagination={false}
              />
            </Card>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default DataControlClient;
