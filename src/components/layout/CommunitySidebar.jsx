import React, { useState, useEffect } from 'react';
import { useUIContent } from '../../contexts/UIContentContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { getUserNotifications } from '../../services/apiUser.js';

// Um pequeno componente para formatar cada notificação
const NotificationItem = ({ notification, texts }) => {
  const { type, points_amount } = notification;
  let message = '';

  switch (type) {
    case 'block_completed':
      message = (texts.notification_block_completed || '🏆 Desafio concluído! Ganhou {points_amount} pontos!')
        .replace('{points_amount}', points_amount);
      break;
    // Adicionar outros casos como 'badge_earned' aqui no futuro
    default:
      message = `Nova atividade: ${type}`;
  }

  return <li className="text-sm text-gray-700 py-2 border-b border-gray-100">{message}</li>;
};


export default function CommunitySidebar() {
  const { texts } = useUIContent();
  const { profile, user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Apenas busca notificações se o utilizador estiver logado
    if (user) {
      getUserNotifications().then(setNotifications);
    }
  }, [user]); // Re-executa quando o utilizador muda

  return (
    <aside className="w-1/4 p-6 bg-gray-50 border-l border-gray-200">
      {/* Secção A Minha Jornada */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">{texts.sidebar_journey_title}</h2>
        {profile ? (
          <div className="p-4 bg-white rounded-lg shadow-sm text-center">
            <p className="font-bold text-3xl text-pcd-blue">{profile.total_points || 0}</p>
            <p className="text-sm text-gray-500 font-semibold">{texts.journey_card_points_label || 'PONTOS'}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">A carregar...</p>
        )}
      </div>

      {/* Secção Feed de Atividades */}
      <div>
        <h2 className="text-lg font-semibold mb-4">{texts.sidebar_feed_title}</h2>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          {notifications.length > 0 ? (
            <ul>
              {notifications.map(notif => (
                <NotificationItem key={notif.id} notification={notif} texts={texts} />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">{texts.sidebar_empty_feed}</p>
          )}
        </div>
      </div>
    </aside>
  );
}