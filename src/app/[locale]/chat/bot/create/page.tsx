'use client';

import {
  FolderFilled,
  GlobalOutlined,
  LinkOutlined,
  LoadingOutlined,
  LockOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Flex, Form, Input, Select, Tag, Upload } from 'antd';
import type { MenuProps, UploadFile } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import ReturnBtn from '@/components/ReturnBtn';

import { useStyles } from './styles';

interface AgentClassification {
  value: string;
  text: string;
}
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  if (!e?.fileList?.length) {
    return [];
  }
  return [e?.fileList[e?.fileList?.length - 1]];
};

const getBase64 = (img: any, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const BotCreate = React.memo<BotCreateProps>(() => {
  const t = useTranslations('create');
  const AGENT_CLASSIFICATION_MAP: AgentClassification[] = React.useMemo(() =>
    [
      { text: t('page.tongYongDuiHua'), value: t('page.tongYongDuiHua') },
      { text: t('page.gongZuoXueXi'), value: t('page.gongZuoXueXi') },
      { text: t('page.neiRongChuangZuo'), value: t('page.neiRongChuangZuo') },
      { text: t('page.aIHuiHua'), value: t('page.aIHuiHua') },
      { text: t('page.yingYinShengCheng'), value: t('page.yingYinShengCheng') },
      { text: t('page.jueSeBanYan'), value: t('page.jueSeBanYan') },
      { text: t('page.shengHuoQuWei'), value: t('page.shengHuoQuWei') },
      { text: t('page.qiTa'), value: t('page.qiTa') },
    ],
    [t]
  );
  const { styles } = useStyles();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const onClick: MenuProps['onClick'] = ({ key }) => {
    form.validateFields().then(values => {
      const params = {
        values,
        key,
      };
      console.warn(params);
    });
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <span>
          <LockOutlined className={styles.menuIcon} />
          {t('page.siMiJinZiJi')}
        </span>
      ),
      key: 'private',
    },
    {
      label: (
        <span>
          <LinkOutlined className={styles.menuIcon} />
          {t('page.tongGuoLianJieFang')}
        </span>
      ),
      key: 'linked',
    },
    {
      label: (
        <span>
          <GlobalOutlined className={styles.menuIcon} />
          {t('page.gongKaiSuoYouRen')}
        </span>
      ),
      key: 'public',
    },
  ];
  return (
    <div className={styles.BotCreate}>
      <ReturnBtn
        extra={
          <Dropdown menu={{ items, onClick }} trigger={['click']}>
            <Button onClick={() => {}} type="primary">
              {t('page.baoCun')}
            </Button>
          </Dropdown>
        }
        isLeftTitle
        title={t('page.chuangJianAIZhi')}
      />
      <Flex className={styles.content}>
        <div className={styles.leftContent}>
          <Form form={form} layout="vertical" requiredMark={false}>
            <Form.Item getValueFromEvent={normFile} name="avatar" valuePropName="fileList">
              <Upload
                accept={'image/png, image/jpeg, image/jpg'}
                beforeUpload={(file: any) => {
                  // const isLt10M = file.size / 1024 / 1024 <= 5;
                  // if (!isLt10M) {
                  //   notification.warn({
                  //     message: '不能大于 5MB!',
                  //   });
                  //   return Promise.reject();
                  // }
                  return Promise.resolve(file);
                }}
                className={styles.uploadAvatar}
                customRequest={(options: any) => {
                  const { onSuccess, file } = options;
                  file.status = 'done';
                  onSuccess(file.uid);
                  getBase64(file as UploadFile, url => {
                    setLoading(false);
                    setImageUrl(url);
                  });
                }}
                listType="picture-circle"
                onChange={({ file }) => {
                  file.status = 'done';
                }}
                showUploadList={false}
              >
                {imageUrl ? (
                  <img alt="avatar" src={imageUrl} style={{ width: '100%' }} />
                ) : (
                  <div className={styles.uploadText}>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div>{t('page.shangChuanTouXiang')}</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              label={t('page.zhiNengTiMingCheng')}
              name="nickname"
              rules={[{ required: true, message: t('page.qingShuRuAI4') }]}
            >
              <Input placeholder={t('page.qingShuRuAI4')} size="large" />
            </Form.Item>
            <Form.Item
              label={t('page.sheDing')}
              name={t('page.sheDing')}
              rules={[{ required: true, message: t('page.qingShuRuAI3') }]}
            >
              <Input.TextArea placeholder={t('page.qingShuRuAI2')} rows={8} size="large" />
            </Form.Item>
            <Form.Item
              label={t('page.zhiNengTiFenLei')}
              name={t('page.zhiNengTiFenLei')}
              rules={[{ required: true, message: t('page.qingXuanZeAI') }]}
            >
              <Select placeholder={t('page.qingXuanZeAI')} size="large">
                {AGENT_CLASSIFICATION_MAP.map((item: AgentClassification) => (
                  <Select.Option key={item.value}>{item.text}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={t('page.zhiNengTiMiaoShu')}
              name={t('page.zhiNengTiMiaoShu')}
              rules={[{ required: true, message: t('page.qingShuRuAI') }]}
            >
              <Input placeholder={t('page.qingShuRuAI')} size="large" />
            </Form.Item>
            <Form.Item
              label={t('page.zhiShiKu')}
              name={t('page.zhiShiKu')}
              rules={[{ required: true, message: t('page.qingShangChuanZhiShi') }]}
            >
              <Upload
                beforeUpload={() => {
                  return false;
                }}
                showUploadList={true}
              >
                <div className={styles.uploadFile}>
                  <FolderFilled className={styles.uploadIcon} />
                  {t('page.shangChuanWenJian')}
                </div>
              </Upload>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.rightContent}>
          <Tag bordered={false} className={styles.tag}>
            {t('page.yuLan')}
          </Tag>
        </div>
      </Flex>
    </div>
  );
});

export default BotCreate;
