import React, { createContext, useContext } from 'react';

const UIContentContext = createContext();

// Este Provider também recebe o estado como propriedade
export function UIContentProvider({ texts, isLoading, children }) {
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