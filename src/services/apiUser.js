import { supabase } from './supabase';

/**
 * Obtém o perfil público de um utilizador específico a partir da tabela 'users'.
 */
export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Erro ao obter perfil de utilizador:', error);
    throw new Error('Não foi possível carregar o perfil.');
  }

  return data;
}

/**
 * Obtém as notificações para o utilizador atual.
 */
export async function getUserNotifications() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('recipient_user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10); // Limitamos a 10 para começar

  if (error) {
    console.error('Erro ao obter notificações:', error);
    return [];
  }

  return data;
}