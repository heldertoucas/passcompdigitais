import { supabase } from './supabase';

/**
 * Tenta inscrever o utilizador atual numa turma usando um código.
 * Chama a função RPC 'enroll_in_class' na base de dados.
 */
export async function enrollInClass(classCode) {
  const { data, error } = await supabase.rpc('enroll_in_class', {
    class_code_to_check: classCode,
  });

  if (error) {
    console.error('Erro ao inscrever na turma:', error);
    throw new Error('Ocorreu um erro durante a inscrição.');
  }

  // A função RPC devolve um objeto JSON, verificamos se tem a propriedade 'error'
  if (data.error) {
    console.error('Erro da função RPC:', data.error);
    throw new Error(data.error);
  }

  return data;
}