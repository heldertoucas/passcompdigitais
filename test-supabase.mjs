// test-supabase.mjs (VERSÃO CORRIGIDA)
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Carregar as variáveis de ambiente do ficheiro .env.local
// AQUI ESTÁ A CORREÇÃO: Especificamos o caminho para o ficheiro correto
dotenv.config({ path: './.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('--- A INICIAR TESTE DE CONEXÃO SUPABASE (v2) ---');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('ERRO: As variáveis de ambiente não foram carregadas. Verifique o nome do ficheiro .env.local e o conteúdo.');
  process.exit(1);
}

console.log('URL e Chave do Supabase carregadas com sucesso.');

// Criar o cliente Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log('Cliente Supabase criado.');

// Função para executar o teste
async function runTest() {
  console.log("A tentar executar a query: supabase.from('ui_content').select('*')");

  try {
    const { data, error } = await supabase.from('ui_content').select('*');

    if (error) {
      console.error('Ocorreu um erro na query:', error);
    } else {
      console.log('Query executada com SUCESSO!');
      console.log('Número de registos recebidos:', data.length);
      console.log('Dados recebidos:', JSON.stringify(data, null, 2));
    }
  } catch (e) {
    console.error('Ocorreu uma exceção catastrófica:', e);
  }
}

// Correr o teste
runTest();