import React, { createContext, useState, ReactNode, useEffect, useContext, useMemo } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

// avoid unwanted rerender?
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

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
  };

  const value = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      login,
      logout,
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
