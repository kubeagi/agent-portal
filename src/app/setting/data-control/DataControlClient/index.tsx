'use client';

import { Button, Card, Flex, Switch, Table } from 'antd';
import classNames from 'classnames';
import React from 'react';

import BtnsBlock, { Btn } from '@/components/BtnsBlock';
import ReturnBtn from '@/components/ReturnBtn';

import { useStyles } from './styles';

interface Props {
  user: {
    name: string;
  };
}

const DataControlClient: React.FC<Props> = () => {
  const { styles } = useStyles();
  const [checked, setChecked] = React.useState(false);

  const btns1: Btn[] = React.useMemo(
    () => [
      {
        title: '聊天记录应用',
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
        title: '删除所有聊天记录',
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
        <ReturnBtn title="数据控制" to="/setting" />
        <Flex className={'scrollBar'} justify={'center'}>
          <div className={classNames(styles.content)}>
            <BtnsBlock
              btns={btns1}
              extra="将此浏览器上的新聊天记录保存到您的历史记录中，并允许我们应用您的聊天记录，改进我们的模型。关闭开关，将不会保留您的聊天记录。此设置不在浏览器或设备之间同步。"
            />
            <BtnsBlock btns={btns_del_all} />
            <Card bordered={false} title="分享链接">
              <Table
                className={styles.table}
                columns={[
                  {
                    dataIndex: 'name',
                    title: '对话名称',
                    width: '50%',
                  },
                  {
                    dataIndex: 'time',
                    title: '分享时间',
                    width: '50%',
                  },
                  {
                    dataIndex: 'opera',
                    title: '操作',
                    width: 120,
                    render: () => {
                      return (
                        <Button danger type="primary">
                          删除
                        </Button>
                      );
                    },
                  },
                ]}
                dataSource={[
                  {
                    name: '对话1',
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
