'use client';

import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface AxiosConfigContextType {
  isAxiosConfigured: boolean;
  setAxiosConfigured: Dispatch<SetStateAction<boolean>>;
}

// 创建一个 Context
const AxiosConfigContext = createContext<AxiosConfigContextType>({
  isAxiosConfigured: false,
  setAxiosConfigured: () => {},
});

// Context 提供者组件
export const AxiosConfigLayout = ({ children }: PropsWithChildren) => {
  const [isAxiosConfigured, setAxiosConfigured] = useState(false);

  return (
    <AxiosConfigContext.Provider value={{ isAxiosConfigured, setAxiosConfigured }}>
      {children}
    </AxiosConfigContext.Provider>
  );
};

// Hook 用于访问 Context
export const useAxiosConfig = () => useContext(AxiosConfigContext);

export default AxiosConfigLayout;
