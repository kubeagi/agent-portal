'use client';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Radio, RadioChangeEvent } from 'antd';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useStyles } from './styles';

interface TagContentProps {
  handleSelectTagChange: (tag: string) => void;
  selectedTag: string;
  cateList: any[];
}
// 首先这里不能 memo， 用户存在使用过程中拖拽窗口大小
const TagContent = ({ handleSelectTagChange, selectedTag, cateList = [] }: TagContentProps) => {
  const t = useTranslations();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setQueryCategory] = useQueryState('category');
  const { styles } = useStyles();
  const scrollLeftRef = useRef(0);
  const [leftArrowVisible, setLeftArrowVisible] = useState(false);
  const [rightArrowVisible, setRightArrowVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const { locale } = useParams();

  const handleScroll = useCallback((direction: string) => {
    const scrollAmount = window.innerWidth - 39; // You can adjust the scroll amount as needed
    const buttonList = document?.querySelector('#btns');
    let left: number = 0;
    if (direction === 'left') {
      left = buttonList!.scrollLeft - scrollAmount;
    } else if (direction === 'right') {
      left = buttonList!.scrollLeft + scrollAmount;
    }
    buttonList?.scrollTo({
      left,
      behavior: 'smooth',
    });
  }, []);

  const onChange = useCallback(
    (e?: RadioChangeEvent) => {
      const value = e?.target?.value;
      if (e) {
        handleSelectTagChange(value);
      }
      // 获取事件源（按钮元素）
      const button: HTMLElement | null = document.querySelector(
        `[id='category_${value || selectedTag || ''}']`
      );
      const scrollContainer: HTMLElement | null = document.querySelector('#btns');

      if (button && scrollContainer) {
        // 获取按钮的位置信息
        const rect = button.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        // 计算按钮中心点相对于滚动容器左侧的距离
        const buttonCenter =
          rect.left -
          containerRect.left +
          scrollContainer.scrollLeft +
          (button.offsetParent as HTMLElement)?.offsetWidth / 2;
        // 计算为了让按钮居中，容器应该滚动的目标位置
        const targetScrollLeft = buttonCenter - scrollContainer.offsetWidth / 2;
        // 确保目标滚动位置在有效范围内
        const safeTargetScrollLeft = Math.min(
          Math.max(targetScrollLeft, 0),
          scrollContainer.scrollWidth - scrollContainer.offsetWidth
        );
        // 执行滚动操作
        scrollContainer.scrollTo({
          left: safeTargetScrollLeft,
          behavior: 'smooth',
        });
      }
    },
    [handleSelectTagChange, selectedTag]
  );
  useEffect(() => {
    // 获取包含内容的元素，例如 body 或任何带有横向滚动的容器
    const scrollContainer = document?.querySelector('#btns');

    const resize = () => {
      setWindowWidth(window!.innerWidth || 0);
      // 小于879px的才需要出左右按钮,左侧菜单收起才出现左右按钮
      if (window?.innerWidth < 879) {
        const scrollLeft: number = scrollContainer!.scrollLeft || 0;
        setLeftArrowVisible(scrollLeft > 0);
        // 如果可视页面比容器小，说明需要出滚动条了，那么选中的tag也需要滚动到页面中间
        const visibleWidth = document?.documentElement.clientWidth;
        if (visibleWidth > scrollContainer!.scrollWidth) {
          setLeftArrowVisible(false);
          setRightArrowVisible(false);
        } else {
          setRightArrowVisible(true);
          onChange();
        }
      } else {
        setLeftArrowVisible(false);
        setRightArrowVisible(false);
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
  }, [scrollLeftRef]);
  return (
    <div className={styles.tagContent}>
      <div className={styles.arrows}>
        {leftArrowVisible && <div className={classNames(styles.shadowLeft)}></div>}
        {leftArrowVisible && (
          <div
            className={classNames(styles.arrow, styles.left)}
            onClick={() => handleScroll('left')}
          >
            <LeftOutlined />
          </div>
        )}
        {rightArrowVisible && <div className={classNames(styles.shadowRight)}></div>}
        {rightArrowVisible && (
          <div
            className={classNames(styles.arrow, styles.right)}
            onClick={() => handleScroll('right')}
          >
            <RightOutlined />
          </div>
        )}
      </div>
      <Radio.Group
        buttonStyle="solid"
        className={windowWidth >= 879 ? styles.btnListHidden : styles.btnListOverflow}
        id="btns"
        onChange={(e: RadioChangeEvent) => {
          const value = e.target.value;
          setQueryCategory(value || null);
          onChange(e);
        }}
        value={selectedTag}
      >
        {[
          { id: '', name: t('components.index.tuiJian'), nameEn: t('components.index.tuiJian') },
          ...cateList,
        ]?.map(item => (
          <Radio.Button
            className={styles.btn}
            id={`category_${item.id}`}
            key={item.id}
            value={item.id}
          >
            {item[locale === 'zh' ? 'name' : 'nameEn']}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
};

export default TagContent;
