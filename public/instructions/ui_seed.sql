-- Limpar entradas anteriores (opcional, mas útil para evitar duplicados se executar várias vezes)
-- DELETE FROM public.ui_content;

-- Inserir os novos valores
INSERT INTO public.ui_content (key, value, description) VALUES
-- Geral & Barra de Navegação
('app_title_short', 'PCD', 'Título curto da aplicação (Passaporte Competências Digitais), usado em locais com pouco espaço.'),
('app_title_full', 'Passaporte Competências Digitais', 'Título completo oficial do programa.'),
('navbar_catalog', 'Passaporte Competências Digitais', 'Texto principal na barra de navegação, geralmente ligado ao catálogo de cursos/competências.'),
('navbar_my_learning', 'A Minha Aprendizagem', 'Link na navegação para a área pessoal de aprendizagem do utilizador.'),
('navbar_user_settings', 'Definições', 'Link na navegação para as definições da conta do utilizador.'),
('navbar_user_logout', 'Sair', 'Botão ou link para terminar a sessão do utilizador.'),
('footer_copyright', '© {year} Passaporte Competências Digitais. Todos os direitos reservados.', 'Texto de copyright no rodapé. {year} é substituído dinamicamente.'),
('general_loading_message', 'A carregar...', 'Mensagem genérica apresentada durante o carregamento de conteúdos ou da aplicação.'),
('text_loading_ellipsis', 'A carregar texto...', 'Mensagem específica para quando um texto dinâmico está a ser carregado da base de dados.'),

-- Autenticação (Auth Component)
('auth_login_title', 'Iniciar Sessão', 'Título do formulário de início de sessão.'),
('auth_signup_title', 'Criar Conta', 'Título do formulário de criação de nova conta.'),
('auth_email_label', 'Email', 'Etiqueta para o campo de email nos formulários de autenticação.'),
('auth_email_placeholder', 'O seu endereço de email', 'Texto de exemplo dentro do campo de email.'),
('auth_password_label', 'Palavra-passe', 'Etiqueta para o campo de palavra-passe.'),
('auth_password_placeholder', 'A sua palavra-passe segura', 'Texto de exemplo dentro do campo de palavra-passe.'),
('auth_password_hint', 'A palavra-passe deve ter, no mínimo, 6 caracteres.', 'Dica sobre os requisitos da palavra-passe no formulário de registo.'),
('auth_login_button', 'Iniciar Sessão', 'Texto do botão para submeter o formulário de login.'),
('auth_signup_button', 'Criar A Minha Conta', 'Texto do botão para submeter o formulário de criação de conta.'),
('auth_loading_button', 'A processar...', 'Texto do botão de autenticação enquanto a ação está em curso.'),
('auth_switch_to_signup_button', 'Ainda não tem conta? Crie uma aqui!', 'Texto do link/botão para alternar para o formulário de registo.'),
('auth_switch_to_login_button', 'Já tem uma conta? Inicie sessão.', 'Texto do link/botão para alternar para o formulário de login.'),
('auth_signup_success_message', 'Conta criada com sucesso! Enviámos um email de confirmação para validar a sua conta e começar a sua jornada digital.', 'Mensagem mostrada após o utilizador criar uma conta com sucesso.'),

-- Conta de Utilizador (Account Component)
('account_page_title', 'A Minha Conta', 'Título da página de perfil/conta do utilizador.'),
('account_welcome_message', 'Bem-vindo(a) de volta, Explorador(a) Digital!', 'Mensagem de saudação na página da conta, com um toque de gamificação.'),
('account_email_label', 'Email Registado:', 'Etiqueta para mostrar o email do utilizador.'),
('account_userid_label', 'ID de Utilizador:', 'Etiqueta para mostrar o ID único do utilizador.'),
('account_logout_button', 'Terminar Sessão', 'Texto do botão para o utilizador sair da sua conta.'),
('account_logout_loading_button', 'A terminar sessão...', 'Texto do botão de logout enquanto a ação está em curso.'),

-- Mensagens de Erro e Sucesso
('error_generic_message', 'Ups! Algo correu mal. Por favor, tente novamente ou contacte o suporte se o problema persistir.', 'Mensagem de erro genérica para falhas inesperadas.'),
('error_auth_default', 'Erro na autenticação. Verifique os seus dados ou tente mais tarde.', 'Mensagem de erro padrão para falhas de login ou registo.'),
('error_signout_default', 'Não foi possível terminar a sessão. Por favor, tente novamente.', 'Mensagem de erro padrão para falhas ao fazer logout.'),
('error_loading_ui_content', 'Erro ao carregar os textos da interface. A tentar novamente...', 'Mensagem de erro se os textos da UI não puderem ser carregados.'),
('success_message_default', 'Operação concluída com sucesso!', 'Mensagem de sucesso genérica.'),

-- Página do Catálogo
('catalog_title', 'Passaporte Competências Digitais', 'Título principal da página do catálogo de cursos/competências.'),
('catalog_subtitle', 'Explore as 10 competências fundamentais de literacia digital e embarque na sua jornada de aprendizagem. Escolha uma competência para descobrir os cursos e desafios disponíveis.', 'Subtítulo ou descrição introdutória da página do catálogo, referindo as 10 competências base do programa.'),
('catalog_coming_soon_tag', 'Brevemente', 'Etiqueta para cursos ou funcionalidades ainda não disponíveis.'),
('catalog_experience_button', 'Saber Mais e Aderir', 'Texto do botão nos cards do catálogo para ver detalhes de um curso/competência.'),

-- Página da Experiência de Aprendizagem (O "Átrio") - Estado Pendente
('course_pending_title', 'Ative o Seu Curso', 'Título da secção quando um utilizador precisa de inserir um código para ativar um curso.'),
('course_pending_description', 'Para aceder às missões deste curso, por favor, insira abaixo o código da turma que lhe foi fornecido pelo seu formador na primeira sessão.', 'Instruções para o utilizador inserir o código da turma.'),
('course_pending_input_placeholder', 'Insira aqui o código da turma', 'Texto de exemplo dentro do campo de inserção do código da turma.'),
('course_pending_button', 'Ativar Curso', 'Texto do botão para submeter o código da turma.'),
('course_code_invalid_error', 'Código da turma inválido. Por favor, verifique o código e tente novamente, ou contacte o seu formador.', 'Mensagem de erro se o código da turma inserido for inválido.'),

-- Página da Experiência de Aprendizagem (O "Átrio") - Estado Ativo
('course_active_progress_label', 'O Seu Progresso no Curso:', 'Etiqueta para a barra ou indicador de progresso do utilizador no curso.'),
('course_active_missions_completed', 'Missões Concluídas', 'Texto que acompanha a contagem de missões concluídas.'),
('course_certificate_button', 'Ver Certificado (CML)', 'Botão para aceder ao certificado de conclusão, mencionando a CML (Câmara Municipal de Lisboa).'),

-- Página da Experiência de Aprendizagem (O "Átrio") - Secções de Informação
('course_section_about_title', 'Sobre esta Competência', 'Título da secção com a descrição geral do curso/competência.'),
('course_section_objectives_title', 'O que vai aprender?', 'Título da secção que detalha os objetivos de aprendizagem do curso.'),
('course_section_audience_title', 'A quem se destina?', 'Título da secção que descreve o público-alvo do curso.'),
('course_section_info_title', 'Informações Práticas', 'Título da secção com informações logísticas (duração, local, etc.).'),

-- Página da Experiência de Aprendizagem (O "Átrio") - Lista de Missões
('mission_status_completed', 'Concluída', 'Estado de uma missão que o utilizador já finalizou.'),
('mission_status_in_progress', 'Em Progresso', 'Estado de uma missão que o utilizador iniciou mas ainda não finalizou.'),
('mission_status_locked', 'Bloqueada', 'Estado de uma missão que ainda não está acessível ao utilizador.'),
('mission_button_start', 'Iniciar Missão', 'Texto do botão para começar uma nova missão.'),
('mission_button_continue', 'Continuar Missão', 'Texto do botão para retomar uma missão em progresso.'),

-- Community Sidebar
('sidebar_journey_title', 'A Minha Jornada Digital', 'Título da secção da sidebar que mostra o progresso e nível do utilizador.'),
('sidebar_giveback_title', 'Reconhecer um Colega:', 'Título da secção da sidebar para o utilizador dar reconhecimento a outros.'),
('sidebar_feed_title', 'Últimas Atividades', 'Título do feed de atividades na sidebar.'),
('sidebar_empty_feed', 'Ainda não há atividades. Complete a sua primeira missão para ganhar pontos e ver o seu progresso aqui!', 'Mensagem mostrada no feed quando não há notificações.'),

-- Community Sidebar (Modal de Reconhecimento)
('recognition_modal_title', 'Reconhecer Colega', 'Título do modal/pop-up para enviar reconhecimento.'),
('recognition_modal_badge_label', 'Atribuir Medalha de Apreciação ❤️', 'Etiqueta para a opção de atribuir um badge de reconhecimento.'),
('recognition_modal_points_label', 'Enviar Pontos de Incentivo ⭐', 'Etiqueta para a opção de enviar pontos de reconhecimento.'),
('recognition_modal_note_label', 'Adicionar uma nota pessoal (opcional)', 'Etiqueta para o campo de texto opcional no modal de reconhecimento.'),
('recognition_modal_button_send', 'Enviar Reconhecimento', 'Texto do botão para confirmar o envio do reconhecimento.'),
('recognition_modal_success', 'O seu reconhecimento foi enviado. Obrigado por apoiar a comunidade de aprendizagem!', 'Mensagem de sucesso após enviar reconhecimento.'),

-- Modelos de Notificações (Activity Feed)
('notification_mission_completed', '🏆 Parabéns! Concluiu a missão "{mission_title}" e ganhou {points_amount} pontos de experiência!', 'Modelo de notificação para quando uma missão é concluída. {mission_title} e {points_amount} são substituídos.'),
('notification_badge_earned', '🏅 Medalha Desbloqueada! Conquistou o badge "{badge_name}" por completar a missão "{mission_title}".', 'Modelo de notificação para quando um badge é ganho. {badge_name} e {mission_title} são substituídos.'),
('notification_badge_received', '❤️ Que gesto simpático! {actor_name} reconheceu o seu esforço e atribuiu-lhe o badge "{badge_name}".', 'Modelo de notificação para quando um badge é recebido de outro utilizador. {actor_name} e {badge_name} são substituídos.'),
('notification_points_received', '⭐ Excelente! {actor_name} enviou-lhe {points_amount} pontos de incentivo. Continue o bom trabalho!', 'Modelo de notificação para quando se recebem pontos de outro utilizador. {actor_name} e {points_amount} são substituídos.'),
('notification_welcome', '👋 Bem-vindo(a) ao Passaporte Competências Digitais! Estamos entusiasmados por tê-lo(a) connosco nesta jornada de aprendizagem rumo ao futuro digital.', 'Mensagem de boas-vindas para novos utilizadores no feed de atividades.')

ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  description = EXCLUDED.description;
