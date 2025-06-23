import React from 'react';
import { useUIContent } from '../../contexts/UIContentContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx'; // Importar o useAuth

export default function CommunitySidebar() {
  const { texts } = useUIContent();
  const { profile } = useAuth(); // Obter o perfil

  return (
    <aside className="w-1/4 p-6 bg-gray-50 border-l border-gray-200">
      <h2 className="text-lg font-semibold mb-4">{texts.sidebar_journey_title || 'A Minha Jornada'}</h2>
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm text-center">
        {profile ? (
          <>
            <p className="font-bold text-3xl text-pcd-blue">{profile.total_points || 0}</p>
            <p className="text-sm text-gray-500 font-semibold">{texts.journey_card_points_label || 'PONTOS'}</p>
          </>
        ) : (
          <p className="text-sm text-gray-500">A carregar...</p>
        )}
      </div>

      <h2 className="text-lg font-semibold mb-4">{texts.sidebar_giveback_title || 'Reconhecer'}</h2>
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">Reconhecimento em breve...</div>

      <h2 className="text-lg font-semibold mb-4">{texts.sidebar_feed_title || 'Feed de Atividades'}</h2>
      <div className="p-4 bg-white rounded-lg shadow-sm">{texts.sidebar_empty_feed || 'Sem atividades.'}</div>
    </aside>
  );
}