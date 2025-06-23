import React, { createContext, useContext } from 'react';
import { signUp as apiSignUp, signIn as apiSignIn, signOut as apiSignOut } from '../services/apiAuth.js';

const AuthContext = createContext();

// O Provider agora é um componente simples que recebe o estado como propriedade
export function AuthProvider({ user, profile, loading, children }) {
  const value = {
    user,
    profile,
    loading,
    signUp: apiSignUp,
    signIn: apiSignIn,
    signOut: apiSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}