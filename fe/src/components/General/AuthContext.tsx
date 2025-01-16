import React, { createContext, useContext, ReactNode } from 'react';
import { jwtDecode, JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload {
  role: string; 
}

interface AuthContextType {
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const token = sessionStorage.getItem('token');
  let decodedToken: DecodedToken | null = null;

  if (token) {
    decodedToken = jwtDecode<DecodedToken>(token);
  }

  const isAdmin = (): boolean => {
    if (decodedToken) {
      return decodedToken.role === 'admin';
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
