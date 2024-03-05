'use client';

import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface AuthContextType {
  authed: boolean | undefined;
  setAuthed: Dispatch<SetStateAction<boolean | undefined>>;
}

// 创建一个 Context
const AuthContext = createContext<AuthContextType>({
  authed: undefined, // 验证是否存在/是否过期 => 可用: true, 不可用: false, 未验证 undefined
  setAuthed: () => {},
});

// Context 提供者组件
export const AuthLayout = ({ children }: PropsWithChildren) => {
  const [authed, setAuthed] = useState<boolean | undefined>();

  return <AuthContext.Provider value={{ authed, setAuthed }}>{children}</AuthContext.Provider>;
};

// Hook 用于访问 Context
export const useAuthContext = () => useContext(AuthContext);

export default AuthLayout;
