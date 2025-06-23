import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppInitializer from './AppInitializer.jsx'; // 1. Importar o orquestrador
import MainLayout from './layouts/MainLayout.jsx';
import AuthPage from './pages/AuthPage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import CoursePage from './pages/CoursePage.jsx';
import MissionPage from './pages/MissionPage.jsx';

function App() {
  return (
    // 2. Envolver tudo no AppInitializer
    <AppInitializer>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/course/:courseCode" element={<CoursePage />} />
            <Route path="/mission/:missionId" element={<MissionPage />} /> 
          </Route>

          <Route path="/login" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </AppInitializer>
  );
}

export default App;