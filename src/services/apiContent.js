import { supabase } from './supabase';

/**
* Busca todos os textos da tabela ui_content e retorna um único objeto.
*/
export async function getUIContent() {
  // Marcador 1: Antes da chamada à API
  console.log("apiContent.js: A tentar executar supabase.from('ui_content').select('*')...");

  const { data, error } = await supabase.from('ui_content').select('*');

  // Marcador 2: Depois da chamada à API
  console.log("apiContent.js: A chamada à API foi concluída.");
  console.log("apiContent.js: Erro recebido:", error);
  console.log("apiContent.js: Dados recebidos:", data);

  if (error) {
    console.error('Erro ao carregar o conteúdo da interface.', error);
    throw new Error(error.message);
  }

  const contentObject = data.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  return contentObject;
}

/**
 * Obtém a lista de todos os cursos ativos para o catálogo.
 * Conforme definido em DB_API_FUNCTIONS (1).md
 */
export async function getCoursesForCatalog() {
  const { data, error } = await supabase
    .from('courses')
    .select('course_code, title, description, image_url, requires_code')
    .eq('is_active', true); // Apenas cursos ativos

  if (error) {
    console.error('Erro ao obter cursos:', error.message);
    throw new Error('Não foi possível carregar os cursos.');
  }

  return data;
}

/**
 * Obtém os detalhes de um curso específico pelo seu código,
 * incluindo as suas missões ordenadas.
 */
export async function getCourseByCode(courseCode) {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      course_missions (
        mission_order,
        missions (
          id,
          title
        )
      )
    `)
    .eq('course_code', courseCode)
    .single(); // Esperamos um único resultado

  if (error) {
    console.error('Erro ao obter detalhes do curso:', error);
    throw new Error('Não foi possível carregar o curso.');
  }

  // Ordenar as missões
  if (data.course_missions) {
      data.course_missions.sort((a, b) => a.mission_order - b.mission_order);
  }

  return data;
}

/**
 * Verifica o estado de inscrição do utilizador atual para um dado ID de curso.
 * --- VERSÃO CORRIGIDA ---
 */
export async function getUserEnrollmentForCourse(courseId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // A forma correta é usar a sintaxe de "junção" (join) do Supabase para filtrar
    // a tabela 'enrollments' com base num valor da tabela relacionada 'classes'.
    const { data, error } = await supabase
        .from('enrollments')
        .select('*, classes!inner(course_id)') // Fazemos um "join" com a tabela classes
        .eq('user_id', user.id)                // Onde o user_id corresponde
        .eq('classes.course_id', courseId);    // E o course_id na tabela de classes corresponde

    if (error) {
        console.error("Erro ao verificar inscrição:", error);
        throw new Error(error.message);
    }

    // Como um utilizador pode ter várias inscrições (ativas ou não) no mesmo curso,
    // retornamos a primeira que encontrarmos, ou null se não houver nenhuma.
    return data.length > 0 ? data[0] : null;
}

// ... (funções existentes ficam aqui)

/**
 * Obtém a lista ordenada de blocos para uma missão específica.
 * Conforme definido em DB_API_FUNCTIONS (1).md.
 */
export async function getBlocksForMission(missionId) {
  const { data, error } = await supabase
    .from('mission_blocks') // Começamos pela tabela de ligação
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

  if (error) {
    console.error('Erro ao obter blocos da missão:', error);
    throw new Error('Não foi possível carregar o conteúdo da missão.');
  }

  // Simplificar a estrutura de dados para o frontend
  return data.map(item => ({
    order: item.block_order,
    ...item.blocks
  }));
}