Guia Técnico: Desenvolvimento das Funções da Base de Dados (API)
================================================================

1\. Objetivo
------------

Este documento serve como um guia técnico para o programador informático responsável pela implementação da Submedida 2.2: Desenvolvimento das Funções da Base de Dados (API). O seu principal objetivo é detalhar a arquitetura das funções e queries necessárias para que a aplicação interaja com a nossa base de dados Supabase, que agora assenta num modelo de conteúdo modular baseado em blocos.

2\. Visão Geral da Arquitetura
------------------------------

Com a nova arquitetura, a lógica da aplicação torna-se mais granular:

-   O conteúdo já não é obtido por missão, mas sim através de uma lista de blocos que compõem uma missão.

-   A gamificação (pontos e badges) e o progresso são agora geridos ao nível de cada bloco individual.

-   As interações sociais (mensagens do mural) são guardadas numa tabela própria, ligada à turma e ao bloco onde foram criadas.

### Tarefa 1: API para Conteúdo do Curso

*Estas funções obtêm a informação para apresentar o catálogo e o conteúdo modular das missões.*

#### A. Obter a Lista de Cursos para o Catálogo

```
/**
 * Obtém a lista de todos os cursos ativos para o catálogo.
 */
async function getCoursesForCatalog() {
  const { data, error } = await supabase
    .from('courses')
    .select('course_code, title, description, image_url, requires_code')
    .eq('is_active', true);

  if (error) console.error('Erro ao obter cursos:', error.message);
  return data || [];
}

```

#### B. Obter os Blocos de uma Missão

Quando um utilizador entra numa missão, precisamos de obter a lista ordenada de todos os blocos que a compõem.

```
/**
 * Obtém a lista ordenada de blocos para uma missão específica.
 * @param {number} missionId - O ID da missão.
 * @returns {Promise<Array>} Uma lista de objetos de bloco.
 */
async function getBlocksForMission(missionId) {
  try {
    const { data, error } = await supabase
      .from('mission_blocks')
      .select(`
        block_order,
        blocks (
          id,
          title,
          category,
          tags,
          points_reward,
          block_html_content
        )
      `)
      .eq('mission_id', missionId)
      .order('block_order', { ascending: true });

    if (error) throw error;
    // Simplificar o array para o frontend
    return data.map(item => ({
        order: item.block_order,
        ...item.blocks
    }));
  } catch (err) {
    console.error('Erro ao obter blocos da missão:', err.message);
    return [];
  }
}

```

### Tarefa 2: API para Gestão de Turmas e Inscrições

*Esta função é crucial para o nosso fluxo de inscrição por código. Garante que um utilizador só pode aceder a um curso fechado se tiver o código correto da turma.*

#### A. Inscrever um Utilizador numa Turma (RPC)

Instrução para o Programador: Crie a seguinte função no "SQL Editor" do Supabase.

```
-- Função para inscrever um utilizador numa turma através de um código
CREATE OR REPLACE FUNCTION enroll_in_class(class_code_to_check TEXT)
RETURNS JSON AS $$
DECLARE
    target_class_id INT;
    target_course_id INT;
    current_user_id UUID := auth.uid();
    active_enrollment_exists BOOLEAN;
BEGIN
    -- Encontrar o ID da turma e do curso associado com base no código fornecido
    SELECT id, course_id INTO target_class_id, target_course_id FROM public.classes WHERE class_code = class_code_to_check;

    -- Se a turma não existir, devolve um erro
    IF target_class_id IS NULL THEN
        RETURN json_build_object('error', 'Código da turma inválido.');
    END IF;

    -- Verificar se o utilizador já está inscrito ativamente noutra turma para o mesmo curso
    SELECT EXISTS (
        SELECT 1
        FROM public.enrollments e
        JOIN public.classes c ON e.class_id = c.id
        WHERE e.user_id = current_user_id
        AND c.course_id = target_course_id
        AND e.status = 'active'
        AND e.class_id != target_class_id -- Exclui a própria turma caso já esteja inscrito nela
    ) INTO active_enrollment_exists;

    IF active_enrollment_exists THEN
        RETURN json_build_object('error', 'Já está inscrito noutra turma ativa para este curso.');
    END IF;

    -- Inserir ou atualizar a inscrição na tabela 'enrollments'
    INSERT INTO public.enrollments (user_id, class_id, status)
    VALUES (current_user_id, target_class_id, 'active')
    ON CONFLICT (user_id, class_id) DO UPDATE
    SET status = 'active', enrolled_at = NOW(); -- Reativa e atualiza a data se já existia

    RETURN json_build_object('success', true, 'class_id', target_class_id, 'course_id', target_course_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

```

### Tarefa 3: API para Progresso e Gamificação

*A lógica de conclusão foi movida da missão para o bloco individual. Esta é a nova função principal de gamificação.*

#### A. Marcar um Bloco como Concluído (RPC)

Instrução para o Programador: Crie a seguinte função no "SQL Editor" do Supabase.

```
-- Função para um utilizador completar um bloco, ganhando pontos e badges.
CREATE OR REPLACE FUNCTION complete_block(block_id_to_complete INT)
RETURNS JSON AS $$
DECLARE
    current_user_id UUID := auth.uid();
    points_to_add INT;
    badge_to_check INT;
    new_total_points INT;
BEGIN
    -- 1. Registar a conclusão do bloco
    INSERT INTO user_block_progress (user_id, block_id)
    VALUES (current_user_id, block_id_to_complete)
    ON CONFLICT DO NOTHING;

    -- 2. Obter os pontos do bloco e atribuí-los ao utilizador
    SELECT points_reward INTO points_to_add FROM blocks WHERE id = block_id_to_complete;
    IF points_to_add IS NOT NULL AND points_to_add > 0 THEN
        UPDATE users SET total_points = total_points + points_to_add
        WHERE id = current_user_id
        RETURNING total_points INTO new_total_points;
        -- Criar notificação
        INSERT INTO notifications (recipient_user_id, type, points_amount, related_block_id)
        VALUES (current_user_id, 'block_completed', points_to_add, block_id_to_complete);
    END IF;

    -- 3. Verificar e atribuir badge, se existir
    SELECT id INTO badge_to_check FROM badges WHERE block_id = block_id_to_complete;
    IF badge_to_check IS NOT NULL THEN
        INSERT INTO user_badges (user_id, badge_id)
        VALUES (current_user_id, badge_to_check) ON CONFLICT DO NOTHING;
        -- Criar notificação
        INSERT INTO notifications (recipient_user_id, type, related_badge_id)
        VALUES (current_user_id, 'badge_earned', badge_to_check);
    END IF;

    RETURN json_build_object('success', true, 'new_total_points', new_total_points);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

```

### Tarefa 4: API para Interação Social (Mural da Turma)

*Estas são as funções necessárias para implementar a funcionalidade "Ponto de Partilha".*

#### A. Obter Mensagens do Mural

```
/**
 * Obtém as mensagens de um mural específico (ligado a uma turma e a um bloco).
 * @param {number} classId - O ID da turma.
 * @param {number} blockId - O ID do bloco de partilha.
 */
async function getMuralMessages(classId, blockId) {
    try {
        const { data, error } = await supabase
            .from('messages')
            .select(`
                id,
                content,
                created_at,
                users ( display_name, avatar_url ),
                message_likes ( count )
            `)
            .eq('class_id', classId)
            .eq('block_id', blockId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch(err) {
        console.error("Erro ao obter mensagens do mural:", err.message);
        return [];
    }
}

```

#### B. Publicar uma Mensagem no Mural

```
/**
 * Publica uma nova mensagem no mural de uma turma.
 * @param {string} content - O texto da mensagem.
 * @param {number} classId - O ID da turma.
 * @param {number} blockId - O ID do bloco de partilha.
 */
async function postMessage(content, classId, blockId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Utilizador não autenticado.'};

    try {
        const { data, error } = await supabase
            .from('messages')
            .insert([{
                content,
                class_id: classId,
                block_id: blockId,
                user_id: user.id
            }]);

        if (error) throw error;
        return { success: true, data };
    } catch (err) {
        console.error("Erro ao publicar mensagem:", err.message);
        return { error: err.message };
    }
}

```

### Tarefa 5: Auditoria das Políticas de Segurança (RLS policies)

Para obter uma lista completa de todas as políticas de segurança (RLS policies) ativas na sua base de dados, as suas definições e a que tabelas se aplicam, pode executar o seguinte comando SQL diretamente no "SQL Editor" do seu projeto Supabase.

Este comando consulta a vista de sistema `pg_policies`, que é o catálogo onde o PostgreSQL armazena esta informação.

```
SELECT
    p.schemaname AS schema,
    p.tablename AS tabela,
    p.policyname AS nome_da_politica,
    p.cmd AS comando,
    p.qual AS condicao_using, -- A regra para SELECT, UPDATE, DELETE
    p.with_check AS condicao_with_check -- A regra para INSERT, UPDATE
FROM
    pg_policies p
WHERE
    p.schemaname = 'public'
ORDER BY
    p.tablename, p.policyname;

```

#### O que cada coluna significa:

-   `schema`: O esquema da tabela (no nosso caso, deverá ser sempre `public`).

-   `tabela`: O nome da tabela onde a política está a ser aplicada (ex: `users`, `notifications`).

-   `nome_da_politica`: O nome que demos à política quando a criámos (ex: "Users can view their own profile.").

-   `comando`: A que tipo de operação a política se aplica (`SELECT`, `INSERT`, `UPDATE`, `DELETE`). Se o valor for `NULL`, significa que se aplica a `ALL` (todos os comandos).

-   `condicao_using`: Mostra a expressão exata da cláusula `USING`. É a regra que o sistema verifica para permitir a leitura ou manipulação de linhas existentes.

-   `condicao_with_check`: Mostra a expressão da cláusula `WITH CHECK`. É a regra que o sistema verifica para permitir a criação ou atualização de novas linhas.
