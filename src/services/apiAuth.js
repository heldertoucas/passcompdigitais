import { supabase } from './supabase';

/**
 * Regista um novo utilizador no sistema.
 *
 */
export async function signUp({ email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Erro no registo:', error.message);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Autentica um utilizador existente.
 *
 */
export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Erro no login:', error.message);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Termina a sessão do utilizador atual.
 *
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Erro ao fazer logout:', error.message);
    throw new Error(error.message);
  }
}

/**
 * Obtém a sessão do utilizador atual.
 * Útil para verificar o estado no carregamento da aplicação.
 */
export async function getCurrentUser() {
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
        console.error('Erro ao obter sessão:', error.message);
        throw new Error(error.message);
    }

    if (!session.session) {
        return null;
    }

    const { data, error: userError } = await supabase.auth.getUser();
    if (userError) {
        console.error('Erro ao obter utilizador:', userError.message);
        throw new Error(userError.message);
    }
    
    return data?.user;
}