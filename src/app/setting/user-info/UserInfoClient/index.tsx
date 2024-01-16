'use client';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Upload } from 'antd';
import type { UploadFile } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';

import ReturnBtn from '@/components/ReturnBtn';

import { useStyles } from './styles';

const getBase64 = (img: any, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

interface Props {
  user: {
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
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [form] = Form.useForm();

  const uploadButton = (
    <div className={styles.uploadText}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div>上传头像</div>
    </div>
  );

  return (
    <div className={classNames(styles.userInfo)}>
      <div>
        <ReturnBtn title="个人资料" to="/setting" />
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
              label="昵称"
              name="nickname"
              rules={[{ required: true, message: '请输入昵称' }]}
            >
              <Input placeholder="请输入昵称" size="large" />
            </Form.Item>
            <Form.Item
              extra={'只能使用字母、数字以及下划线，长度为 4-16 个字符'}
              label="账号"
              name="id"
              rules={[{ required: true, message: '请输入账号' }]}
            >
              <Input placeholder="请输入账号" size="large" />
            </Form.Item>
            {/* <Form.Item name="pwd" initialValue={'******'} label="登录密码">
              <Input.Password size="large" disabled />
            </Form.Item> */}
            <Form.Item>
              <Button className={styles.sub} htmlType={'submit'} size="large" type="primary">
                完成
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </div>
    </div>
  );
};

export default UserInfoClient;
