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