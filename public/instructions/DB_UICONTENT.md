Conteúdo da Interface da Aplicação (ui_content)
===============================================

Este documento contém todo o texto da interface para o MVP da aplicação "Passaporte Competências Digitais". Cada item tem uma `chave` única, que será usada no código para obter o texto, e um `valor`, que é o texto apresentado ao utilizador.

### **Geral & Barra de Navegação**

| Chave                      | Valor (Texto)                                                                 |
| :------------------------- | :---------------------------------------------------------------------------- |
| `app_title_short`          | Passaporte CD                                                                 |
| `app_title_full`           | Passaporte Competências Digitais                                                |
| `navbar_catalog`           | Passaporte Competências Digitais                                                |
| `navbar_my_learning`       | A Minha Aprendizagem                                                          |
| `navbar_user_settings`     | Definições                                                                    |
| `navbar_user_logout`       | Sair                                                                          |
| `footer_copyright`         | &copy; {year} Passaporte Competências Digitais. Todos os direitos reservados. |
| `general_loading_message`  | A carregar...                                                                 |
| `text_loading_ellipsis`  | A carregar texto...                                                           |

### **Autenticação (Auth Component)**

| Chave                           | Valor (Texto)                                                              |
| :------------------------------ | :------------------------------------------------------------------------- |
| `auth_login_title`              | Iniciar Sessão                                                             |
| `auth_signup_title`             | Criar Conta                                                                |
| `auth_email_label`              | Email                                                                      |
| `auth_email_placeholder`        | O seu email                                                                |
| `auth_password_label`           | Palavra-passe                                                              |
| `auth_password_placeholder`     | A sua palavra-passe                                                        |
| `auth_password_hint`            | A palavra-passe deve ter pelo menos 6 caracteres.                            |
| `auth_login_button`             | Iniciar Sessão                                                             |
| `auth_signup_button`            | Criar Conta                                                                |
| `auth_loading_button`           | A processar...                                                             |
| `auth_switch_to_signup_button`  | Não tem conta? Criar Conta                                                 |
| `auth_switch_to_login_button`   | Já tem uma conta? Iniciar Sessão                                           |
| `auth_signup_success_message`   | Registo efetuado! Verifique o seu email para o link de confirmação.        |

### **Conta de Utilizador (Account Component)**

| Chave                             | Valor (Texto)                                 |
| :-------------------------------- | :-------------------------------------------- |
| `account_page_title`              | A Minha Conta                                 |
| `account_welcome_message`         | Bem-vindo(a) de volta!                        |
| `account_email_label`             | Email:                                        |
| `account_userid_label`            | User ID:                                      |
| `account_logout_button`           | Terminar Sessão                               |
| `account_logout_loading_button`   | A terminar sessão...                          |

### **Mensagens de Erro e Sucesso**

| Chave                        | Valor (Texto)                                                              |
| :--------------------------- | :------------------------------------------------------------------------- |
| `error_generic_message`      | Ocorreu um erro inesperado. Por favor, tente novamente.                    |
| `error_auth_default`         | Ocorreu um erro durante a autenticação.                                    |
| `error_signout_default`      | Ocorreu um erro ao terminar a sessão.                                      |
| `error_loading_ui_content`   | Erro ao carregar o conteúdo da interface. A tentar novamente...            |
| `success_message_default`    | Operação concluída com sucesso!                                            |


### **Página do Catálogo**

| Chave                       | Valor (Texto)                                                                              |
| :-------------------------- | :----------------------------------------------------------------------------------------- |
| `catalog_title`             | Passaporte Competências Digitais                                                             |
| `catalog_subtitle`          | Explore as 10 competências digitais e comece a sua jornada de aprendizagem. Escolha uma competência para ver as experiências disponíveis. |
| `catalog_coming_soon_tag`   | Em breve                                                                                   |
| `catalog_experience_button` | Saber Mais e Aderir →                                                                      |

### **Página da Experiência de Aprendizagem (O "Átrio")**

**--- (Estado: Pendente) ---**

| Chave                             | Valor (Texto)                                                                      |
| :-------------------------------- | :--------------------------------------------------------------------------------- |
| `course_pending_title`            | Inscrição Pendente                                                                 |
| `course_pending_description`      | Para ativar este curso e aceder às missões, por favor insira abaixo o código de acesso fornecido pelo seu formador na primeira sessão. |
| `course_pending_input_placeholder`| Insira o código da turma                                                             |
| `course_pending_button`           | Ativar Curso                                                                       |
| `course_code_invalid_error`       | O código inserido não é válido. Por favor, verifique e tente novamente.              |

**--- (Estado: Ativo) ---**

| Chave                              | Valor (Texto)         |
| :--------------------------------- | :-------------------- |
| `course_active_progress_label`     | O seu progresso:      |
| `course_active_missions_completed` | Missões Concluídas    |
| `course_certificate_button`        | Ver Certificado na Plataforma CML |

**--- (Secções de Informação) ---**

| Chave                             | Valor (Texto)         |
| :-------------------------------- | :-------------------- |
| `course_section_about_title`      | Sobre o curso         |
| `course_section_objectives_title` | Para que serve?       |
| `course_section_audience_title`   | A quem se destina?    |
| `course_section_info_title`       | Informações Práticas  |

**--- (Lista de Missões) ---**

| Chave                        | Valor (Texto)  |
| :--------------------------- | :------------- |
| `mission_status_completed`   | Concluída      |
| `mission_status_in_progress` | A decorrer     |
| `mission_status_locked`      | Bloqueada      |
| `mission_button_start`       | Começar        |
| `mission_button_continue`    | Continuar      |

### **Community Sidebar**

| Chave                      | Valor (Texto)                                                                      |
| :------------------------- | :--------------------------------------------------------------------------------- |
| `sidebar_journey_title`    | A Minha Jornada                                                                    |
| `sidebar_giveback_title`   | Dê o seu reconhecimento a:                                                         |
| `sidebar_feed_title`       | Feed de Atividades                                                                 |
| `sidebar_empty_feed`       | Ainda não há atividade no seu feed. Comece uma missão para ganhar os seus primeiros pontos! |

**--- (Modal de Reconhecimento) ---**

| Chave                             | Valor (Texto)                                 |
| :-------------------------------- | :-------------------------------------------- |
| `recognition_modal_title`         | Reconhecer                                    |
| `recognition_modal_badge_label`   | Atribuir uma Medalha Digital ❤️               |
| `recognition_modal_points_label`  | Enviar Pontos ⭐️                              |
| `recognition_modal_note_label`    | Adicionar uma nota (opcional)                 |
| `recognition_modal_button_send`   | Enviar Reconhecimento                         |
| `recognition_modal_success`       | O seu reconhecimento foi enviado com sucesso! |

### **Modelos de Notificações (Activity Feed)**

*(Estes são modelos; a aplicação irá substituir `{X}` pelos valores reais)*

| Chave                             | Valor (Texto)                                                                  |
| :-------------------------------- | :----------------------------------------------------------------------------- |
| `notification_mission_completed`  | 🏆 Parabéns! Concluiu a "{mission_title}" e ganhou {points_amount} pontos!     |
| `notification_badge_earned`       | 🏅 Medalha Desbloqueada! Conquistou o badge "{badge_name}".                     |
| `notification_badge_received`     | ❤️ {actor_name} atribuiu-lhe o badge "{badge_name}".                           |
| `notification_points_received`    | ⭐️ {actor_name} enviou-lhe {points_amount} pontos.                             |
| `notification_welcome`            | 👋 Bem-vindo(a) à plataforma! Estamos entusiasmados por tê-lo(a) connosco nesta jornada de aprendizagem. |



comando SQL:
-- Script para popular a tabela public.ui_content com os textos da interface da aplicação.
-- A cláusula ON CONFLICT garante que se o script for executado novamente, ele atualiza
-- os valores existentes em vez de criar duplicados ou causar erros.

-- Limpar entradas anteriores (opcional, útil para um recomeço limpo)
-- DELETE FROM public.ui_content;

-- Inserir os novos valores
INSERT INTO public.ui_content (key, value, description) VALUES
-- Geral & Barra de Navegação
('app_title_short', 'Passaporte CD', 'Título curto da aplicação (Passaporte Competências Digitais), usado em locais com pouco espaço.'),
('app_title_full', 'Passaporte Competências Digitais', 'Título completo oficial do programa.'),
('navbar_my_learning', 'A Minha Aprendizagem', 'Link na navegação para a área pessoal de aprendizagem do utilizador.'),
('navbar_user_settings', 'Definições', 'Link na navegação para as definições da conta do utilizador.'),
('navbar_user_logout', 'Sair', 'Botão ou link para terminar a sessão do utilizador.'),
('footer_main_title', 'Passaporte Competências Digitais', 'Título principal no rodapé da aplicação.'),
('footer_tagline', 'Uma iniciativa do Programa Municipal para a Literacia Digital da Câmara Municipal de Lisboa.', 'Texto de tagline ou subtítulo no rodapé.'),
('footer_copyright', '© {year} Passaporte Competências Digitais. Todos os direitos reservados.', 'Texto de copyright no rodapé. {year} é substituído dinamicamente.'),
('general_loading_message', 'A carregar...', 'Mensagem genérica apresentada durante o carregamento de conteúdos ou da aplicação.'),

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
('account_logout_button', 'Terminar Sessão', 'Texto do botão para o utilizador sair da sua conta.'),

-- Mensagens de Erro e Sucesso
('error_generic_message', 'Ups! Algo correu mal. Por favor, tente novamente ou contacte o suporte se o problema persistir.', 'Mensagem de erro genérica para falhas inesperadas.'),
('error_auth_default', 'Erro na autenticação. Verifique os seus dados ou tente mais tarde.', 'Mensagem de erro padrão para falhas de login ou registo.'),
('error_loading_content', 'Erro ao carregar o conteúdo. A tentar novamente...', 'Mensagem de erro específica se o conteúdo de uma missão ou curso não puder ser carregado.'),
('success_message_default', 'Operação concluída com sucesso!', 'Mensagem de sucesso genérica.'),

-- Página Principal e Catálogo
('hero_title', 'A sua Jornada de Aprendizagem Digital Começa Aqui', 'Título principal da secção Hero na página de entrada.'),
('hero_subtitle', 'Descubra cursos, desafios e projetos desenhados para si. Desenvolva as suas competências e navegue no mundo digital com mais confiança.', 'Subtítulo da secção Hero.'),
('hero_button', 'Explorar Competências', 'Botão de apelo à ação principal na secção Hero.'),
('catalog_title', 'Passaporte Competências Digitais', 'Título da secção do catálogo de cursos/competências.'),
('catalog_subtitle', 'Escolha uma competência para ver as experiências de aprendizagem disponíveis.', 'Subtítulo ou descrição introdutória da secção do catálogo.'),
('catalog_coming_soon_tag', 'Brevemente', 'Etiqueta para cursos ou funcionalidades ainda não disponíveis.'),

-- Página da Experiência de Aprendizagem
('course_pending_title', 'Ative o Seu Curso', 'Título da secção quando um utilizador precisa de inserir um código para ativar um curso.'),
('course_pending_description', 'Para aceder às missões deste curso, por favor, insira abaixo o código da turma que lhe foi fornecido pelo seu formador na primeira sessão.', 'Instruções para o utilizador inserir o código da turma.'),
('course_pending_input_placeholder', 'Insira aqui o código da turma', 'Texto de exemplo dentro do campo de inserção do código da turma.'),
('course_pending_button', 'Ativar Curso', 'Texto do botão para submeter o código da turma.'),
('course_code_invalid_error', 'Código da turma inválido. Por favor, verifique o código e tente novamente, ou contacte o seu formador.', 'Mensagem de erro se o código da turma inserido for inválido.'),
('course_active_progress_label', 'O Seu Progresso no Curso:', 'Etiqueta para a barra ou indicador de progresso do utilizador no curso.'),
('course_certificate_button', 'Ver Certificado (CML)', 'Botão para aceder ao certificado de conclusão, mencionando a CML.'),
('mission_button_start', 'Iniciar Missão', 'Texto do botão para começar uma nova missão.'),
('mission_button_continue', 'Continuar Missão', 'Texto do botão para retomar uma missão em progresso.'),
('mission_status_completed', 'Concluída', 'Estado de uma missão que o utilizador já finalizou.'),
('mission_status_in_progress', 'Em Progresso', 'Estado de uma missão que o utilizador iniciou mas ainda não finalizou.'),
('mission_status_locked', 'Bloqueada', 'Estado de uma missão que ainda não está acessível ao utilizador.'),

-- Community Sidebar
('sidebar_journey_title', 'A Minha Jornada Digital', 'Título da secção da sidebar que mostra o progresso e nível do utilizador.'),
('sidebar_giveback_title', 'Reconhecer um Colega:', 'Título da secção da sidebar para o utilizador dar reconhecimento a outros.'),
('sidebar_feed_title', 'Últimas Atividades', 'Título do feed de atividades na sidebar.'),
('sidebar_empty_feed', 'Ainda não há atividades. Complete o seu primeiro desafio para ganhar pontos e ver o seu progresso aqui!', 'Mensagem mostrada no feed quando não há notificações.'),
('journey_card_points_label', 'PONTOS', 'Etiqueta para os pontos no card "A Minha Jornada".'),

-- Blocos de Conteúdo da Missão
('block_category_learn', 'Aprender', 'Título da categoria para blocos teóricos.'),
('block_category_discover', 'Descobrir', 'Título da categoria para blocos de exploração de recursos.'),
('block_category_challenge', 'Desafio Digital', 'Título da categoria para blocos de atividades práticas.'),
('block_category_share', 'Ponto de Partilha', 'Título da categoria para blocos de interação social.'),
('block_tag_online', 'Online', 'Etiqueta para atividades que podem ser feitas online.'),
('block_tag_inperson', 'Presencial', 'Etiqueta para atividades que requerem presença física.'),
('block_tag_group', 'Em Grupo', 'Etiqueta para atividades colaborativas.'),
('block_learning_card_title', 'Principais Aprendizagens', 'Título do cartão de resumo das aprendizagens de uma atividade.'),
('block_know_more_title', 'Saiba Mais: Simulação Interativa', 'Título para secções opcionais de aprofundamento dentro de um desafio.'),

-- Interação Social (Mural)
('share_point_label', 'Qual foi a ideia mais surpreendente que retirou?', 'Pergunta principal num bloco de partilha.'),
('share_point_placeholder', 'Partilhe a sua reflexão...', 'Texto de exemplo dentro da caixa de texto para partilha.'),
('share_point_button_share', 'Partilhar com o grupo', 'Botão para submeter uma reflexão.'),
('share_point_button_view_wall', 'Ver Mural da Turma', 'Botão para abrir o modal com as reflexões dos colegas.'),
('share_point_success_message', 'Obrigado por partilhar!', 'Mensagem de feedback após uma partilha bem-sucedida.'),
('mural_modal_title', 'Mural da Turma', 'Título da janela modal que mostra as partilhas dos colegas.'),
('mural_modal_close_button', 'Fechar', 'Texto do botão para fechar o modal do mural.'),

-- Modelos de Notificações (Activity Feed)
('notification_block_completed', '🏆 Parabéns! Concluiu um desafio e ganhou {points_amount} pontos!', 'Modelo de notificação para quando um bloco é concluído.'),
('notification_badge_earned', '🏅 Medalha Desbloqueada! Conquistou o badge "{badge_name}".', 'Modelo de notificação para quando um badge é ganho.'),
('notification_badge_received', '❤️ Que gesto simpático! {actor_name} reconheceu o seu esforço e atribuiu-lhe o badge "{badge_name}".', 'Modelo de notificação para quando um badge é recebido de outro utilizador.'),
('notification_points_received', '⭐ Excelente! {actor_name} enviou-lhe {points_amount} pontos de incentivo. Continue o bom trabalho!', 'Modelo de notificação para quando se recebem pontos de outro utilizador.'),
('notification_welcome', '👋 Bem-vindo(a) ao Passaporte Competências Digitais! Estamos entusiasmados por tê-lo(a) connosco nesta jornada de aprendizagem.', 'Mensagem de boas-vindas para novos utilizadores no feed de atividades.')

ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  description = EXCLUDED.description;
