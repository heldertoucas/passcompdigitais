import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CommunitySidebar from '../components/layout/CommunitySidebar';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 container mx-auto">
        <main className="flex-1 py-6 px-4">
          <Outlet /> {/* As nossas páginas serão renderizadas aqui */}
        </main>
        <CommunitySidebar />
      </div>
      <Footer />
    </div>
  );
}