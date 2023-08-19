import { AuthContext } from '@/context/AuthContext';
import React, { useContext, createContext } from 'react';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children, authState, dispatch }) => {
  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
