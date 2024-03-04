/**
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2024 TenxCloud. All Rights Reserved.
 */

/**
 * useDark
 * @author songsz
 * @date 2024-02-29
 */
import { useEffect } from 'react';

const lightThemeDataBak: {
  [k in string]: string;
} = {};
const backupLightValue = (data, root) => {
  Object.entries(data).map(([k, v]) => {
    if (lightThemeDataBak[k]) return null;
    lightThemeDataBak[k] = getComputedStyle(root).getPropertyValue(k);
  });
};

function changeColor(isDark: boolean) {
  const root = document.querySelector(':root');
  // dark
  const darkData = {
    '--background-color': '#141414',
    '--background-color-body': '#212121',
    '--font-color-1': 'rgba(255, 255, 255, .85)',
    '--font-color-1-1': 'rgba(255, 255, 255, .75)',
    '--font-color-2': 'rgba(255, 255, 255, .65)',
    '--font-color-3': 'rgba(255, 255, 255, .45)',
    '--font-color-4': 'rgba(255, 255, 255, .45)',
    '--menu-item-color': '#252525',
    '--menu-item-active-color': 'rgba(255, 255, 255, 0.12)',
    '--border-color-split': 'rgba(255, 255, 255, .35)',
  };
  backupLightValue(darkData, root);
  // dark
  const data = isDark ? darkData : lightThemeDataBak;
  Object.entries(data).map(([k, v]) => {
    root?.style?.setProperty(k, v);
  });
}

const useDark: (isDark: boolean) => void = isDark => {
  useEffect(() => {
    changeColor(isDark);
  }, [isDark]);
};
export default useDark;
