'use client';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { AGENT_CATEGORY_INDEXES } from '@/utils/constants';

import { useStyles } from './styles';

interface TagContentProps {
  handleSelectTagChange: (tag: string) => void;
  TZH_AGENT_CATEGORY: string[];
  selectedTag: string;
}
// 首先这里不能 memo， 用户存在使用过程中拖拽窗口大小
const TagContent = ({
  handleSelectTagChange,
  TZH_AGENT_CATEGORY,
  selectedTag,
}: TagContentProps) => {
  const t = useTranslations();
  const { styles } = useStyles();
  const scrollLeftRef = useRef(0);
  const currentBtnRef = useRef(null);
  const [leftArrowVisible, setLeftArrowVisible] = useState(false);
  const [rightArrowVisible, setRightArrowVisible] = useState(false);
  const T_AGENT_CATEGORY = useMemo(() => AGENT_CATEGORY_INDEXES.map(item => t(item)), [t]);

  const handleScroll = useCallback((direction: string) => {
    const scrollAmount = window.innerWidth - 39; // You can adjust the scroll amount as needed
    const buttonList = document?.querySelector('#btns');
    if (direction === 'left') {
      buttonList!.scrollLeft -= scrollAmount;
    } else if (direction === 'right') {
      buttonList!.scrollLeft += scrollAmount;
    }
  }, []);

  const onChange = (tag: any) => {
    handleSelectTagChange(tag?.target?.value);
    currentBtnRef.current = tag;
    // 获取事件源（按钮元素）
    const button = document?.querySelector(`[id='${tag?.target?.value}']`);
    const scrollContainer = document?.querySelector('#btns');

    if (button && scrollContainer) {
      // 获取按钮的位置信息
      const rect = button.getBoundingClientRect();
      const targetLeft =
        rect.left + scrollContainer?.scrollLeft - (scrollContainer.offsetWidth - rect.width) / 2;
      // 滚动到目标位置
      scrollContainer.scrollTo({
        left: targetLeft,
        behavior: 'smooth',
      });
    }
  };
  useEffect(() => {
    // 获取包含内容的元素，例如 body 或任何带有横向滚动的容器
    const scrollContainer = document?.querySelector('#btns');

    const resize = () => {
      const scrollLeft: number = scrollContainer!.scrollLeft || 0;
      setLeftArrowVisible(scrollLeft > 0);
      // 如果可视页面比容器小，说明需要出滚动条了，那么选中的tag也需要滚动到页面中间
      const visibleWidth = document?.documentElement.clientWidth;
      if (visibleWidth > scrollContainer!.scrollWidth) {
        setLeftArrowVisible(false);
        setRightArrowVisible(false);
      } else {
        setRightArrowVisible(true);
        onChange(currentBtnRef.current);
      }
    };

    // 添加滚动事件监听器
    const scroll = () => {
      // 获取横向滚动的距离
      const scrollLeft: number = scrollContainer?.scrollLeft || 0;
      scrollLeftRef.current = scrollLeft;
      const visibleWidth = document?.documentElement.clientWidth;
      // 执行您的滚动事件处理逻辑
      setRightArrowVisible(scrollLeft + visibleWidth < scrollContainer!.scrollWidth);
      // 在滚动过程中，只要左边存在隐藏标签状态，就需要出现左移动按钮
      setLeftArrowVisible(scrollLeft > 0);
    };
    scrollContainer?.addEventListener('scroll', scroll);
    window.addEventListener('resize', resize);
    // 由于初次刷新，按钮肯定没有选中过，此时如果需要判断左移动和右移动，可以手动调用resize函数
    resize(); // 如果初次渲染不想显示箭头，可以注释此行函数
    return () => {
      window.removeEventListener('resize', resize);
      scrollContainer?.removeEventListener('scroll', scroll);
    };
  }, []);
  return (
    <div className={styles.tagContent}>
      <div className={styles.arrows}>
        {leftArrowVisible && <div className={classNames(styles.shadowLeft)}></div>}
        {leftArrowVisible && (
          <div className={classNames(styles.arrow, styles.left)}>
            <LeftOutlined onClick={() => handleScroll('left')} />
          </div>
        )}
        {rightArrowVisible && <div className={classNames(styles.shadowRight)}></div>}
        {rightArrowVisible && (
          <div className={classNames(styles.arrow, styles.right)}>
            <RightOutlined onClick={() => handleScroll('right')} />
          </div>
        )}
      </div>
      <Radio.Group
        buttonStyle="solid"
        className={styles.btnList}
        id="btns"
        onChange={onChange}
        value={selectedTag}
      >
        {T_AGENT_CATEGORY.map((item: string, idx: number) => (
          <Radio.Button
            className={styles.btn}
            id={TZH_AGENT_CATEGORY[idx]}
            key={TZH_AGENT_CATEGORY[idx]}
            value={TZH_AGENT_CATEGORY[idx]}
          >
            {item}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
};

export default TagContent;
