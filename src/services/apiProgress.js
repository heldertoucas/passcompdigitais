import { supabase } from './supabase';

/**
 * Chama a função RPC para marcar um bloco como concluído.
 * Esta função no backend irá atribuir pontos e badges.
 * Conforme definido em DB_API_FUNCTIONS (1).md.
 */
export async function completeBlock(blockId) {
  const { data, error } = await supabase.rpc('complete_block', {
    block_id_to_complete: blockId,
  });

  if (error) {
    console.error('Erro ao completar o bloco:', error);
    throw new Error('Não foi possível concluir o bloco.');
  }

  return data;
}

/**
 * Obtém os IDs de todos os blocos concluídos pelo utilizador atual.
 */
export async function getCompletedBlockIds() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Set();

  const { data, error } = await supabase
    .from('user_block_progress')
    .select('block_id')
    .eq('user_id', user.id);

  if (error) {
    console.error('Erro ao obter progresso dos blocos:', error);
    return new Set();
  }

  // Retorna um Set para uma verificação de existência mais rápida (O(1))
  return new Set(data.map(item => item.block_id));
}