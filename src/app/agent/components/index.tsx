'use client';
import React from 'react';
import classNames from 'classnames';
import { Row, Col, Avatar, Button, Tooltip } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import ReturnBtn from '@/components/ReturnBtn';
import TagContent from './TagContent';
import { useStyles } from './styles';

import data from '../data'

interface ConversationProps {
  data?: any;
}
const layout = {
  xs: {
    span: 24,
  },
  sm: {
    span: 12,
  },
  md: {
    span: 12,
  },
  lg: {
    span: 12,
  },
  xl: {
    span: 8,
  },
  xxl: {
    span: 6
  }
}

const Conversation = React.memo<ConversationProps>(() => {
  const { styles } = useStyles();
  // const [selectedTags, setSelectedTags] = useState<string[]>(['tuijian']);

  return (
    <div className={styles.agentContainer}>
      <div className={styles.agentContent}>
        <ReturnBtn 
        extra={
          <Button>登录</Button>
        }
        isLeftTitle
        title="发现AI 智能体"
        to='/chat'
      />
        <div>
          <div className={styles.main}>
            <TagContent list={data.tag_list}/>
            <div className={classNames(styles.content, 'scrollBar')}>
              <Row gutter={[16, 16]} >
                {
                  data.bot_list.map(item => (
                    <Col {...layout} key={item.bot_id}>
                      <div className={styles.card}>
                        <div className={styles.left}>
                          <Avatar shape="square" size={72} src={item.icon_url} />
                        </div>
                        <div className={styles.right}>
                          <div className={styles.title}>{item.name}</div>
                          <Tooltip title={item.onboarding.message_list[0]?.ext?.brief}>
                            <div className={styles.desc}>
                              {item.onboarding.message_list[0]?.ext?.brief}
                            </div>
                          </Tooltip>
                          <div className={styles.info}>
                            <span className={styles.heat}><FireOutlined />{item.bot_stats.display_heat_score}</span>
                            <span className={styles.creator}>@{item.creator_info.creator_handle}</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))
                }

              </Row>
            </div>

          </div>
        </div>
      </div>
    </div >
  );
});

export default Conversation;
