import React from 'react';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { UIContentProvider } from './contexts/UIContentContext.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import AuthPage from './pages/AuthPage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import CoursePage from './pages/CoursePage.jsx'; // 1. Importar
import MissionPage from './pages/MissionPage.jsx'; // 1. Importar


function App() {
  return (
    <AuthProvider>
      <UIContentProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<CatalogPage />} />
                <Route path="/course/:courseCode" element={<CoursePage />} />
                {/* 2. Adicionar a rota da missão */}
                <Route path="/mission/:missionId" element={<MissionPage />} /> 
            </Route>

            <Route path="/login" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </UIContentProvider>
    </AuthProvider>
  );
}

export default App;