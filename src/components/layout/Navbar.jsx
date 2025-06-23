import React from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useUIContent } from '../../contexts/UIContentContext.jsx';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user, profile, signOut } = useAuth(); // Obter 'profile'
  const { texts } = useUIContent();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          {texts.app_title_short || 'Passaporte CD'}
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/my-learning" className="text-gray-600 hover:text-pcd-blue">
                {texts.navbar_my_learning}
              </Link>
              <span className="text-gray-700">Olá, {profile?.display_name || user.email}</span>
              <button onClick={signOut} className="px-4 py-2 bg-pcd-blue text-white rounded hover:bg-blue-600">
                {texts.navbar_user_logout}
              </button>
            </>
          ) : (
            <Link to="/login" className="px-4 py-2 bg-pcd-blue text-white rounded hover:bg-blue-600">
              {texts.auth_login_button || 'Iniciar Sessão'}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}