import { createContext, useState, ReactNode, useEffect, useContext, useMemo } from 'react';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  setCurrentUserId: (userId: string) => void;
  login: (token: string) => void;
  logout: () => void;
  currentUserId: string | null;
  isAuthenticated: boolean;
};

// avoid unwanted rerender?
export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentUserId, setCurrentuserId] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('currentuserId');
    if (token) {
      setAccessToken(token);
    }

    if (userId) {
      setCurrentuserId(userId);
    }
  }, []);

  const login = (newToken: string) => {
    sessionStorage.setItem('token', newToken); // optional: persist for refresh
    setAccessToken(newToken);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('currentuserId');
    setAccessToken(null);
    setCurrentuserId(null);
  };

  const setCurrentUserId = (userId: string) => {
    sessionStorage.setItem('currentuserId', userId);
    setCurrentuserId(userId);
  };

  const value = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      setCurrentUserId,
      login,
      logout,
      currentUserId,
      isAuthenticated: !!accessToken,
    }),
    [accessToken, currentUserId],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
