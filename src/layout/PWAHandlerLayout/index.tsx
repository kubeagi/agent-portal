'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// 创建一个上下文来共享安装提示事件
const InstallPromptContext = createContext(null);

export function useInstallPrompt() {
  return useContext(InstallPromptContext);
}

export default function PWAHandlerLayout({ children }: { children: React.ReactNode }) {
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      console.warn('beforeinstallprompt event fired ===========');
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <InstallPromptContext.Provider value={installPrompt}>{children}</InstallPromptContext.Provider>
  );
}
