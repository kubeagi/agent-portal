'use client';

import React, { useState, } from 'react';

import ReturnBtn from '@/components/ReturnBtn';
import { useStyles } from './styles';
import { Button, Flex, Form, Upload, Input, Select, Tag, Dropdown } from 'antd';
import type { UploadFile, MenuProps } from 'antd';
import { LoadingOutlined, PlusOutlined, FolderFilled, LockOutlined, GlobalOutlined, LinkOutlined } from '@ant-design/icons';

interface AgentClassification {
  value: string;
  text: string;
}
const AGENT_CLASSIFICATION_MAP:AgentClassification[] = [
  { text: '通用对话', value: '通用对话'},
  { text: '工作学习', value: '工作学习'},
  { text: '内容创作', value: '内容创作'},
  { text: 'AI 绘画', value: 'AI 绘画'},
  { text: '影音生成', value: '影音生成'},
  { text: '角色扮演', value: '角色扮演'},
  { text: '生活趣味', value: '生活趣味'},
  { text: '其他', value: '其他'},
]
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
  const { styles } = useStyles();
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const onClick: MenuProps['onClick'] = ({ key }) => {
    form.validateFields().then(values => {
      const params = {
        values,
        key
      }
      console.warn(params)
    })
  };
  
  const items: MenuProps['items'] = [
    {
      label: <span>
        <LockOutlined className={styles.menuIcon}/>
        私密  · 仅自己可对话
      </span>,
      key: 'private',
    },
    {
      label: <span>
        <LinkOutlined className={styles.menuIcon}/>
        通过链接访问  ·  获得链接的用户可对话
      </span>,
      key: 'linked',
    },
    {
      label: <span>
        <GlobalOutlined className={styles.menuIcon}/>
        公开  ·  所有人可对话
      </span>,
      key: 'public',
    },
  ];
  return (
    <div className={styles.BotCreate}>
      <ReturnBtn 
        extra={
          <Dropdown menu={{ items, onClick }} trigger={["click"]}>
            <Button onClick={() => {
            }} type="primary">保存</Button>
          </Dropdown>
        }
        isLeftTitle
        title="创建 AI 智能体"
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
                  <div>上传头像</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            label="智能体名称"
            name="nickname"
            rules={[{ required: true, message: '请输入 AI 智能体名称' }]}
          >
            <Input placeholder="请输入 AI 智能体名称" size="large" />
          </Form.Item>
          <Form.Item
            label="设定"
            name="设定"
            rules={[{ required: true, message: '请输入 AI 智能体角色设定' }]}
          >
            <Input.TextArea placeholder={`请输入 AI 智能体角色设定，如这个智能体有什么作用？他能做什么事情？它应该有哪些注意事项?
示例：
你是一个 AI 产品专家，你熟悉 AI 大模型的全生命周期，对于大模型的开发、训练、评估、调优、部署以及使用等你都非常了解，你知晓所有 AI 相关的概念。你可以帮助用户提出设计理念、完善设计思路、指出设计问题等，但是你是一个严谨的专家，你不会编造回答。`} 
            rows={8} 
            size="large" 
          />
          </Form.Item>
          <Form.Item
            label="智能体分类"
            name="智能体分类"
            rules={[{ required: true, message: '请选择 AI 智能体分类' }]}
          >
            <Select placeholder="请选择 AI 智能体分类" size="large" >
              {
                AGENT_CLASSIFICATION_MAP.map((item: AgentClassification) => <Select.Option key={item.value}>
                  {item.text}                  
                </Select.Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="智能体描述"
            name="智能体描述"
            rules={[{ required: true, message: '请输入 AI 智能体描述' }]}
          >
            <Input placeholder="请输入 AI 智能体描述" size="large" />
          </Form.Item>
          <Form.Item
            label="知识库"
            name="知识库"
            rules={[{ required: true, message: '请上传知识库文件' }]}
          >
            <Upload
              beforeUpload={() => {
                return false;
              }}
              showUploadList={true}
            >
              <div className={styles.uploadFile}>
              <FolderFilled className={styles.uploadIcon}/>上传文件
              </div>
            </Upload>
          </Form.Item>
        </Form>
        </div>
        <div className={styles.rightContent}>
          <Tag bordered={false} className={styles.tag}>预览</Tag>
        </div>
      </Flex>
    </div>
  );
});

export default BotCreate;
