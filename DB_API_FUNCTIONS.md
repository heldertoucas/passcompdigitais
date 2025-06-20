Guia Técnico: Desenvolvimento das Funções da Base de Dados (API)
================================================================

Este documento detalha os passos técnicos para implementar a submedida 2.2. O objetivo é criar um conjunto de funções e queries que permitam à nossa aplicação interagir de forma segura e eficiente com a base de dados Supabase. Usaremos a biblioteca `supabase-js` para estes exemplos.

### 1\. API para Conteúdo do Curso

*Estas funções servem para obter a informação necessária para apresentar o catálogo e o conteúdo das missões.*

#### A. Obter a Lista de Cursos para o Catálogo

O frontend precisa de uma forma de obter todos os cursos ativos para mostrar na página do catálogo.

```
/**
 * Obtém a lista de todos os cursos ativos para o catálogo.
 * @returns {Promise<Array>} Uma lista de objetos de curso.
 */
async function getCoursesForCatalog() {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('course_code, title, description, image_url, requires_code')
      .eq('is_active', true); // Assumindo que temos uma coluna 'is_active'

    if (error) throw error;

    console.log('Cursos obtidos:', data);
    return data;
  } catch (err) {
    console.error('Erro ao obter cursos:', err.message);
    return null;
  }
}

```

#### B. Obter os Detalhes de um Curso (com as suas Missões)

Quando um utilizador clica num curso, precisamos de obter os seus detalhes completos, incluindo a lista ordenada de missões.

```
/**
 * Obtém os detalhes de um curso específico e a sua lista de missões.
 * @param {string} courseCode - O código do curso (ex: "PASS10").
 * @returns {Promise<Object>} Um objeto de curso com uma lista de missões.
 */
async function getCourseDetails(courseCode) {
  try {
    // Usamos um select aninhado para obter o curso e as suas missões relacionadas
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        course_missions (
          mission_order,
          missions (*)
        )
      `)
      .eq('course_code', courseCode)
      .single(); // Esperamos apenas um resultado

    if (error) throw error;

    // Ordenar as missões pela ordem definida
    if (data && data.course_missions) {
      data.missions = data.course_missions
        .sort((a, b) => a.mission_order - b.mission_order)
        .map(cm => cm.missions);
    }

    console.log('Detalhes do curso:', data);
    return data;
  } catch (err) {
    console.error('Erro ao obter detalhes do curso:', err.message);
    return null;
  }
}

```

### 2\. API para Gestão de Turmas e Inscrições

*Esta função é crucial para o nosso fluxo de inscrição por código.*

#### A. Inscrever um Utilizador numa Turma

Esta função é um excelente candidato para ser uma Função de Edge do Supabase (RPC). Isto significa que a lógica complexa de validação acontece do lado do servidor, o que é mais seguro e eficiente.

Primeiro, o código SQL da função a ser criada no Supabase (no SQL Editor):

```
-- Função para inscrever um utilizador numa turma através de um código
CREATE OR REPLACE FUNCTION enroll_in_class(class_code_to_check TEXT)
RETURNS JSON AS $$
DECLARE
    target_class_id INT;
    current_user_id UUID := auth.uid();
BEGIN
    -- Encontrar o ID da turma com base no código fornecido
    SELECT id INTO target_class_id FROM classes WHERE class_code = class_code_to_check;

    -- Se a turma não existir, devolve um erro
    IF target_class_id IS NULL THEN
        RETURN json_build_object('error', 'Código da turma inválido.');
    END IF;

    -- Inserir a inscrição na tabela 'enrollments'
    INSERT INTO enrollments (user_id, class_id, status)
    VALUES (current_user_id, target_class_id, 'active')
    ON CONFLICT (user_id, class_id) DO UPDATE SET status = 'active'; -- Reativa se já existia

    RETURN json_build_object('success', true, 'class_id', target_class_id);
END;
$$ LANGUAGE plpgsql;

```

Depois, como o frontend chamaria esta função:

```
/**
 * Chama a função do servidor para inscrever o utilizador atual numa turma.
 * @param {string} classCode - O código da turma fornecido pelo utilizador.
 * @returns {Promise<Object>} O resultado da operação.
 */
async function enrollInClass(classCode) {
  try {
    const { data, error } = await supabase.rpc('enroll_in_class', {
      class_code_to_check: classCode
    });

    if (error) throw error;

    if (data.error) {
      console.error('Erro de inscrição:', data.error);
      return { success: false, message: data.error };
    }

    console.log('Inscrição na turma bem-sucedida!', data);
    return { success: true, classId: data.class_id };
  } catch (err) {
    console.error('Erro ao chamar a função de inscrição:', err.message);
    return { success: false, message: 'Ocorreu um erro inesperado.' };
  }
}

```

### 3\. API para Progresso e Gamificação

*Funções que gerem a conclusão de missões e a atribuição de recompensas.*

#### A. Marcar uma Missão como Concluída

Esta função também deve ser uma Função de Edge (RPC) para garantir que a atribuição de pontos e badges é feita de forma segura no servidor, impedindo que um utilizador mal-intencionado possa atribuir pontos a si mesmo.

Código SQL da função no Supabase:

```
CREATE OR REPLACE FUNCTION complete_mission(mission_id_to_complete INT)
RETURNS JSON AS $$
DECLARE
    current_user_id UUID := auth.uid();
    points_to_add INT := 100; -- Exemplo, poderia vir de uma tabela
    badge_to_check INT;
    new_total_points INT;
BEGIN
    -- 1. Registar a conclusão da missão
    INSERT INTO user_mission_progress (user_id, mission_id)
    VALUES (current_user_id, mission_id_to_complete)
    ON CONFLICT DO NOTHING;

    -- 2. Atribuir pontos
    UPDATE users SET total_points = total_points + points_to_add
    WHERE id = current_user_id
    RETURNING total_points INTO new_total_points;

    -- 3. Verificar se esta missão atribui um badge
    SELECT id INTO badge_to_check FROM badges WHERE mission_id = mission_id_to_complete;
    IF badge_to_check IS NOT NULL THEN
        -- Atribuir o badge
        INSERT INTO user_badges (user_id, badge_id)
        VALUES (current_user_id, badge_to_check);
        -- Criar notificação do badge
        INSERT INTO notifications (recipient_user_id, type, related_badge_id)
        VALUES (current_user_id, 'badge_earned', badge_to_check);
    END IF;

    -- 4. Criar notificação da conclusão da missão
    INSERT INTO notifications (recipient_user_id, type, points_amount)
    VALUES (current_user_id, 'mission_completed', points_to_add);

    RETURN json_build_object('success', true, 'new_total_points', new_total_points);
END;
$$ LANGUAGE plpgsql;

```

Como o frontend a chamaria:

```
/**
 * Chama a função do servidor para marcar uma missão como concluída.
 * @param {number} missionId - O ID da missão concluída.
 */
async function completeMission(missionId) {
  try {
    const { data, error } = await supabase.rpc('complete_mission', {
      mission_id_to_complete: missionId
    });

    if (error) throw error;

    console.log('Missão concluída! Novo total de pontos:', data.new_total_points);
    return data;
  } catch (err) {
    console.error('Erro ao completar a missão:', err.message);
  }
}

```

Com estas funções, cobrimos os principais fluxos da nossa aplicação. A utilização de Funções de Edge (RPC) para operações sensíveis é uma boa prática que aumenta a segurança e a robustez do nosso sistema.
