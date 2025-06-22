import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { signUp as apiSignUp, signIn as apiSignIn, signOut as apiSignOut } from '../services/apiAuth.js';
import { getUserProfile } from '../services/apiUser.js'; // 1. Importar a nova função

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null); // 2. Adicionar estado para o perfil
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setupUser = async (authUser) => {
      if (authUser) {
        const userProfile = await getUserProfile(authUser.id);
        setProfile(userProfile);
        setUser(authUser);
      } else {
        setProfile(null);
        setUser(null);
      }
      setLoading(false);
    };

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      await setupUser(session?.user);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await setupUser(session?.user);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    profile, // 3. Adicionar o perfil ao 'value' do contexto
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