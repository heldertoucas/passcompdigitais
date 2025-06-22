import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUIContent } from '../services/apiContent.js';
import { useAuth } from './AuthContext.jsx'; // 1. Importar o useAuth

const UIContentContext = createContext();

export function UIContentProvider({ children }) {
  const { loading: authLoading } = useAuth(); // 2. Obter o estado de carregamento do AuthContext
  const [texts, setTexts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 3. Apenas busca os textos se a autenticação NÃO estiver a carregar
    if (!authLoading) {
      console.log("UIContentProvider: Auth carregado. A iniciar a busca por textos...");

      getUIContent()
        .then((data) => {
          console.log("UIContentProvider: Textos recebidos com sucesso!");
          setTexts(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("UIContentProvider: Ocorreu um ERRO ao buscar os textos!", err);
          setIsLoading(false);
        });
    }
  }, [authLoading]); // 4. O efeito agora depende do estado de carregamento da autenticação

  return (
    <UIContentContext.Provider value={{ texts, isLoading }}>
      {children}
    </UIContentContext.Provider>
  );
}

export function useUIContent() {
  const context = useContext(UIContentContext);
  if (context === undefined) {
    throw new Error('useUIContent deve ser usado dentro de um UIContentProvider');
  }
  return context;
}