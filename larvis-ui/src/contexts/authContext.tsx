import React, { createContext, useState, ReactNode, useEffect, useContext, useMemo } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  setUserId: (userId: string) => void;
  login: (token: string) => void;
  logout: () => void;
  userId: string | null;
  isAuthenticated: boolean;
};

// avoid unwanted rerender?
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setuserId] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const login = (newToken: string) => {
    sessionStorage.setItem('token', newToken); // optional: persist for refresh
    setAccessToken(newToken);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setAccessToken(null);
    setuserId(null);
  };

  const setUserId = (userId: string) => {
    setuserId(userId);
  };

  const value = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      setUserId,
      login,
      logout,
      userId,
      isAuthenticated: !!accessToken,
    }),
    [accessToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
