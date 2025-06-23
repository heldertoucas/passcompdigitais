import React, { useState, useEffect } from 'react';
import { supabase } from './services/supabase';
import { getUserProfile } from './services/apiUser';
import { getUIContent } from './services/apiContent';
import { AuthProvider } from './contexts/AuthContext';
import { UIContentProvider } from './contexts/UIContentContext';

export default function AppInitializer({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      // 1. Primeiro, obtemos os textos da UI (não precisa de login)
      const uiContentData = await getUIContent();
      setTexts(uiContentData);

      // 2. Depois, verificamos a sessão do utilizador
      const { data: { session } } = await supabase.auth.getSession();
      const authUser = session?.user;
      setUser(authUser);

      // 3. Se houver um utilizador, obtemos o seu perfil
      if (authUser) {
        const userProfile = await getUserProfile(authUser.id);
        setProfile(userProfile);
      }

      // Só terminamos o carregamento depois de tudo estar pronto
      setIsLoading(false);
    };

    loadInitialData();

    // Listener para mudanças de autenticação (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const authUser = session?.user;
        setUser(authUser);
        if (authUser) {
          const userProfile = await getUserProfile(authUser.id);
          setProfile(userProfile);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
      return <div className="min-h-screen flex items-center justify-center"><p>A carregar aplicação...</p></div>;
  }

  return (
    <AuthProvider user={user} profile={profile} loading={isLoading}>
      <UIContentProvider texts={texts} isLoading={isLoading}>
        {children}
      </UIContentProvider>
    </AuthProvider>
  );
}