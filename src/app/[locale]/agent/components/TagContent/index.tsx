'use client';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useStyles } from './styles';

interface TagContentProps {
  handleSelectTagChange?: (tag: string) => void;
}

const TagContent = React.memo<TagContentProps>(props => {
  const t = useTranslations();
  const { handleSelectTagChange } = props;
  const { styles } = useStyles();
  const scrollLeftRef = useRef(0);
  const currentBtnRef = useRef(null);
  const [leftArrowVisible, setLeftArrowVisible] = useState(false);
  const [rightArrowVisible, setRightArrowVisible] = useState(false);
  const [selectedTag, setSelectedTags] = useState(t('components.index.tuiJian'));
  const AGENT_CATEGORY = React.useMemo(
    () => [
      t('utils.constants.youXiDongMan'),
      t('create.page.tongYongDuiHua'),
      t('create.page.gongZuoXueXi'),
      t('create.page.neiRongChuangZuo'),
      t('utils.constants.aIHuiHua'),
      t('create.page.yingYinShengCheng'),
      t('create.page.jueSeBanYan'),
      t('create.page.shengHuoQuWei'),
      t('create.page.qiTa'),
    ],
    [t]
  );

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
    setSelectedTags(tag?.target?.value);
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
    // 添加滚动事件监听器
    scrollContainer?.addEventListener('scroll', function () {
      // 获取横向滚动的距离
      const scrollLeft = scrollContainer?.scrollLeft;
      scrollLeftRef.current = scrollLeft;
      const visibleWidth = document?.documentElement.clientWidth;
      // 执行您的滚动事件处理逻辑
      if (scrollLeft + visibleWidth >= scrollContainer.scrollWidth) {
        setRightArrowVisible(false);
      } else {
        setRightArrowVisible(true);
        if (scrollLeft <= 0) {
          setLeftArrowVisible(false);
        } else {
          setLeftArrowVisible(true);
        }
      }
    });

    window.addEventListener('resize', () => {
      const scrollLeft = scrollContainer!.scrollLeft;
      if (scrollLeft > 0) {
        setLeftArrowVisible(true);
      } else {
        setLeftArrowVisible(false);
      }
      // 如果可视页面比容器小，说明需要出滚动条了，那么选中的tag也需要滚动到页面中间
      const visibleWidth = document?.documentElement.clientWidth;
      if (visibleWidth > scrollContainer!.scrollWidth) {
        setLeftArrowVisible(false);
        setRightArrowVisible(false);
      } else {
        setRightArrowVisible(true);
        onChange(currentBtnRef.current);
      }
    });
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
        {[t('components.index.tuiJian'), ...AGENT_CATEGORY]?.map(item => (
          <Radio.Button className={styles.btn} id={item} key={item} value={item}>
            {item}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
});

export default TagContent;
