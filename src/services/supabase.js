import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Adicionamos uma validação para garantir que as variáveis foram carregadas.
// Isto irá dar um erro claro se o ficheiro .env.local estiver mal configurado.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("ERRO CRÍTICO: As variáveis de ambiente do Supabase (URL e Anon Key) não estão definidas. Verifique o seu ficheiro .env.local e reinicie o servidor.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);