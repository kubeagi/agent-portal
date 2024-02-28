'use client';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Upload } from 'antd';
import type { UploadFile } from 'antd';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import ReturnBtn from '@/components/ReturnBtn';

import { useStyles } from './styles';

const getBase64 = (img: any, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

interface Props {
  user?: {
    name: string;
  };
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

const onFinish = () => {
  // console.log('values', values)
};
const UserInfoClient: React.FC<Props> = () => {
  const { styles } = useStyles();
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [form] = Form.useForm();

  const uploadButton = (
    <div className={styles.uploadText}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div>{t('create.page.shangChuanTouXiang')}</div>
    </div>
  );

  return (
    <div className={classNames(styles.userInfo)}>
      <div>
        <ReturnBtn title={t('BtnList.index.geRenZiLiao')} to="/setting" />
        <Flex className={classNames(styles.content, 'scrollBar')} justify={'center'}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
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
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              label={t('UserInfoClient.index.niCheng')}
              name="nickname"
              rules={[{ required: true, message: t('UserInfoClient.index.qingShuRuNiCheng') }]}
            >
              <Input placeholder={t('UserInfoClient.index.qingShuRuNiCheng')} size="large" />
            </Form.Item>
            <Form.Item
              extra={t('UserInfoClient.index.zhiNengShiYongZi')}
              label={t('UserInfoClient.index.zhangHao')}
              name="id"
              rules={[{ required: true, message: t('UserInfoClient.index.qingShuRuZhangHao') }]}
            >
              <Input placeholder={t('UserInfoClient.index.qingShuRuZhangHao')} size="large" />
            </Form.Item>
            {/* <Form.Item name="pwd" initialValue={'******'} label="登录密码">
              <Input.Password size="large" disabled />
            </Form.Item> */}
            <Form.Item>
              <Button className={styles.sub} htmlType={'submit'} size="large" type="primary">
                {t('UserInfoClient.index.wanCheng')}
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </div>
    </div>
  );
};

export default UserInfoClient;
