Guia Técnico: Configuração da Autenticação e Perfis
===================================================

Este documento detalha os passos técnicos para implementar a submedida 2.1, que cobre a autenticação de utilizadores e a criação dos seus perfis na aplicação.

### Tarefa 1: Implementar o Fluxo de Login/Registo (Frontend)

O objetivo desta tarefa é construir, no código da aplicação web, os formulários e a lógica que permitem a um utilizador criar uma conta, fazer login e fazer logout. Para isto, usamos a biblioteca oficial `supabase-js`, que simplifica a comunicação com o nosso backend Supabase.

Abaixo estão exemplos de código em JavaScript que mostram como implementar as três operações principais.

#### A. Criar uma Nova Conta (Registo)

Este código seria associado a um formulário de registo que pede um email e uma password.

```
// Importar o cliente Supabase (isto é feito uma vez no início da aplicação)
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'URL_DO_SEU_PROJETO_SUPABASE';
const supabaseAnonKey = 'CHAVE_ANON_DO_SEU_PROJETO_SUPABASE';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função para registar um novo utilizador
async function signUp(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      // Se houver um erro (ex: password fraca, email já existe), mostramos ao utilizador.
      console.error('Erro no registo:', error.message);
      return null;
    }

    // O registo foi bem-sucedido. O Supabase envia um email de confirmação.
    console.log('Registo bem-sucedido! Por favor, verifique o seu email para confirmação.', data.user);
    return data.user;

  } catch (err) {
    console.error('Ocorreu um erro inesperado:', err);
  }
}

```

#### B. Fazer Login

Este código seria associado a um formulário de login.

```
// Função para fazer login de um utilizador existente
async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      // Erro no login (ex: credenciais inválidas)
      console.error('Erro no login:', error.message);
      return null;
    }

    // Login bem-sucedido. A aplicação agora "sabe" quem é o utilizador.
    console.log('Login bem-sucedido!', data.user);
    return data.user;

  } catch (err) {
    console.error('Ocorreu um erro inesperado:', err);
  }
}

```

#### C. Fazer Logout

Este código seria associado a um botão de "Sair".

```
// Função para fazer logout do utilizador atual
async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Erro ao fazer logout:', error.message);
      return;
    }

    // Logout bem-sucedido.
    console.log('Sessão terminada com sucesso.');

  } catch (err) {
    console.error('Ocorreu um erro inesperado:', err);
  }
}

```

### Tarefa 2: Criação Automática do Perfil (Backend)

O objetivo desta tarefa é garantir que, sempre que um novo utilizador completa o seu registo, uma entrada correspondente é criada automaticamente na nossa tabela `public.users`.

Esta tarefa já está 100% implementada pelo script SQL que executámos na Medida 1.2.

Não é necessário fazer mais nada na base de dados. O `trigger` `on_auth_user_created` que criámos está ativo e a "ouvir". Assim que a função `signUp` acima for executada com sucesso e o utilizador confirmar o seu email, o trigger irá disparar e criar o perfil na tabela `users`, inserindo o `id` e o `email`.

Os campos como `display_name` e `avatar_url` ficarão inicialmente vazios (`null`), e serão preenchidos pela aplicação numa fase posterior (ex: num ecrã de "Complete o seu Perfil" após o primeiro login).
