Guia Técnico: Configuração da Autenticação e Perfis
===================================================

1\. Objetivo
------------

Este documento serve como um guia técnico para o programador informático responsável pela implementação da Submedida 2.1: Configuração da Autenticação e Perfis. O seu principal objetivo é detalhar a arquitetura de autenticação e os passos necessários para a sua execução, tanto no backend (Supabase) como no frontend da aplicação.

2\. Visão Geral da Arquitetura
------------------------------

A nossa abordagem para a gestão de utilizadores assenta na separação de responsabilidades, uma prática recomendada para garantir segurança e flexibilidade:

-   Tabela `auth.users` (Gerida pelo Supabase): É uma tabela privada e de alta segurança, gerida exclusivamente pelo sistema de autenticação do Supabase. Contém informação sensível (como as palavras-passe encriptadas) e nunca deve ser acedida ou modificada diretamente pela nossa aplicação.

-   Tabela `public.users` (Gerida pela nossa Aplicação): É a nossa tabela de perfis, que estende a tabela de autenticação. É aqui que guardamos os dados públicos e relacionados com a aplicação, como o `display_name` e o `total_points` do utilizador.

A sincronização entre estas duas tabelas é feita de forma automática e segura através de um trigger na base de dados PostgreSQL, que é ativado aquando da criação de um novo utilizador.

### Tarefa 1: Configuração do Backend (Execução Única)

Objetivo: Implementar o automatismo na base de dados que cria um perfil público (`public.users`) para cada novo utilizador que se regista no sistema de autenticação (`auth.users`).

Instruções para o Programador:

O seguinte script SQL deve ser executado uma única vez no "SQL Editor" do projeto Supabase. Este script cria a função e o trigger necessários.

```
-- Função para criar um perfil de utilizador automaticamente no registo
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insere uma nova linha na nossa tabela 'users' com o id e email do novo utilizador autenticado.
    INSERT INTO public.users (id, email)
    VALUES (new.id, new.email);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger que chama a função acima sempre que um novo utilizador é adicionado a auth.users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

```

Validação: Após executar o script, pode verificar se o trigger foi criado corretamente na secção "Database" -> "Triggers" da interface do Supabase.

### Tarefa 2: Implementação no Frontend (Código da Aplicação)

Objetivo: Construir as funções no código da aplicação (ex: React) que interagem com o sistema de autenticação do Supabase.

Instruções para o Programador:

As seguintes funções, que usam a biblioteca supabase-js, devem ser implementadas no frontend para gerir o ciclo de vida da autenticação do utilizador.

#### A. Função `signUp` (Registo de Nova Conta)

*Associada ao formulário de registo.*

```
/**
 * Regista um novo utilizador no sistema de autenticação do Supabase.
 * @param {string} email - O email do utilizador.
 * @param {string} password - A password escolhida pelo utilizador.
 * @returns {Promise<{user: object, error: object}>} - Um objeto contendo o utilizador ou um erro.
 */
async function signUp(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      // Devolve o erro para ser tratado pela interface (ex: mostrar uma mensagem).
      console.error('Erro no registo:', error.message);
      return { user: null, error };
    }

    // Sucesso. O trigger no backend irá agora criar o perfil em 'public.users'.
    console.log('Registo iniciado. Verifique o seu email para confirmação.', data.user);
    return { user: data.user, error: null };

  } catch (err) {
    console.error('Ocorreu um erro inesperado no registo:', err);
    return { user: null, error: err };
  }
}

```

#### B. Função `signIn` (Login)

*Associada ao formulário de login.*

```
/**
 * Autentica um utilizador existente.
 * @param {string} email - O email do utilizador.
 * @param {string} password - A password do utilizador.
 * @returns {Promise<{session: object, error: object}>} - Um objeto contendo a sessão ou um erro.
 */
async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Erro no login:', error.message);
      return { session: null, error };
    }

    console.log('Login bem-sucedido!', data.session);
    return { session: data.session, error: null };

  } catch (err) {
    console.error('Ocorreu um erro inesperado no login:', err);
    return { session: null, error: err };
  }
}

```

#### C. Função `signOut` (Logout)

*Associada a um botão de "Sair".*

```
/**
 * Termina a sessão do utilizador atual.
 */
async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    console.log('Sessão terminada com sucesso.');
  } catch (err) {
    console.error('Erro ao fazer logout:', err.message);
  }
}

```

#### D. Função `updateProfile` (Atualizar Perfil)

*Associada a um formulário de "Editar Perfil", para que o utilizador possa definir o seu `display_name` e `avatar_url` após o registo.*

```
/**
 * Atualiza o perfil de um utilizador na nossa tabela pública 'users'.
 * @param {string} userId - O ID do utilizador a atualizar.
 * @param {object} updates - Um objeto com as colunas a atualizar. Ex: { display_name: 'Sofia' }
 * @returns {Promise<{success: boolean, error: object}>} - Um objeto indicando o sucesso ou o erro da operação.
 */
async function updateProfile(userId, updates) {
    try {
        const { error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', userId);

        if (error) throw error;

        console.log('Perfil atualizado com sucesso!');
        return { success: true, error: null };
    } catch (err) {
        console.error("Erro ao atualizar o perfil:", err.message);
        return { success: false, error: err };
    }
}

```

Com estes passos, o sistema de autenticação e gestão de perfis estará completamente implementado, seguindo as melhores práticas de segurança e eficiência recomendadas para um projeto com Supabase.
