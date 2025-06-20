Plano de Implementação: Aplicação "Passaporte Competências Digitais" (MVP v1.0)
===============================================================================

Este documento detalha o plano de implementação para o Produto Mínimo Viável (MVP) da aplicação "Passaporte Competências Digitais". O plano está organizado em 5 medidas principais, desde a configuração inicial até ao lançamento, com foco na experiência de aprendizagem "Descobrir a Inteligência Artificial e a Programação" (`PASS10`).

### Medida 1: Configuração e Pré-Produção

*Fase de preparação do ambiente e organização do projeto, garantindo que temos uma base sólida para começar a construção.*

-   1.1. Configuração do Ambiente Técnico:

    -   Descrição: Esta é a fase inicial de "montagem do estaleiro". Consiste em criar e configurar as três principais ferramentas tecnológicas que darão suporte a todo o projeto. O GitHub servirá como o nosso repositório central para guardar e versionar todo o código da aplicação. O Supabase será o nosso "cérebro" e armazém, fornecendo a base de dados e o sistema de autenticação. O Netlify será a plataforma que publica a nossa aplicação na internet e a atualiza automaticamente sempre que fizermos alterações no código guardado no GitHub (processo conhecido como *deployment* contínuo).

-   1.2. Implementação do Schema da Base de Dados:

    -   Descrição: Com o Supabase configurado, o passo seguinte é construir o "esqueleto" da nossa base de dados. Isto significa pegar no ficheiro `db_schema.md` que definimos e traduzi-lo para a linguagem da base de dados (SQL). Na prática, vamos executar os comandos que criam fisicamente as 11 tabelas (`users`, `courses`, etc.), definindo as colunas, as relações entre elas e as regras (como garantir que um `course_code` é sempre único).

-   1.3. Criação do Backlog do Projeto:

    -   Descrição: Esta é uma tarefa de gestão crucial. Vamos usar uma ferramenta de gestão de projetos (como Trello, Jira ou GitHub Projects) para criar um quadro visual com "cartões" para cada tarefa descrita neste plano. Cada cartão representará uma submedida (ex: "Desenvolver a Community Sidebar"). Este quadro, conhecido como *backlog*, permite-nos organizar o trabalho, atribuir responsabilidades, acompanhar o progresso de forma transparente e garantir que nada fica esquecido.

### Medida 2: Desenvolvimento do Backend e Lógica de Negócio

*Fase de construção do "motor" e das regras da aplicação no Supabase, ou seja, tudo o que acontece "nos bastidores".*

-   2.1. Configuração da Autenticação e Perfis:

    -   Descrição: Implementaremos o sistema que permite aos utilizadores criarem uma conta e fazerem login de forma segura, usando o serviço de Autenticação do Supabase. Vamos também criar um processo automático (um *trigger*) que, sempre que um novo utilizador se regista, cria uma entrada correspondente na nossa tabela de perfis `users`, garantindo que toda a informação do utilizador fica centralizada.

-   2.2. Desenvolvimento das Funções da Base de Dados (API):

    -   Descrição: Esta submedida consiste em criar os "comandos" que o nosso website (o Frontend) irá usar para "conversar" com a base de dados (o Backend). Por exemplo, criaremos uma função que o Frontend pode chamar para "obter a lista de todos os cursos ativos" ou outra para "validar este código de turma e inscrever este utilizador". Estas funções são a ponte que permite que a interface do utilizador obtenha e guarde informação.

-   2.3. Implementação da Segurança:

    -   Descrição: A segurança e a privacidade dos dados dos nossos utilizadores são uma prioridade máxima. Nesta fase, vamos configurar as Políticas de Segurança ao Nível da Linha (*Row Level Security* - RLS) do Supabase. De forma simples, isto funciona como definir regras de acesso muito específicas, garantindo, por exemplo, que um utilizador só consegue ver e alterar o seu próprio progresso e as suas próprias notificações, mesmo que os dados de todos os utilizadores estejam na mesma tabela.

### Medida 3: Desenvolvimento do Frontend (Interface do Utilizador)

*Fase de construção da parte visível da aplicação, o "website interativo" com o qual o utilizador irá interagir.*

-   3.1. Construção da Estrutura Principal da Aplicação:

    -   Descrição: Consiste em criar o "esqueleto" visual da nossa página web: a barra de navegação no topo, a área de conteúdo principal e o espaço reservado para a Community Sidebar à direita. Vamos também programar a aplicação para que todos os textos visíveis (títulos, descrições, botões) sejam obtidos a partir da nossa tabela `ui_content`, o que nos permitirá, no futuro, corrigir um erro ortográfico ou alterar uma frase diretamente na base de dados, sem precisar de mexer no código.

-   3.2. Desenvolvimento dos Componentes de Navegação e Descoberta:

    -   Descrição: Nesta fase, vamos construir as primeiras páginas com que o utilizador interage. Isto inclui a página do "Catálogo", que irá buscar a informação dos cursos à base de dados e apresentá-la como uma grelha de "cards". Programaremos também a interação de clique que expande a secção abaixo (o efeito "acordeão") para mostrar as experiências de aprendizagem.

-   3.3. Desenvolvimento da Página de Aprendizagem Unificada:

    -   Descrição: O coração da experiência de aprendizagem. Vamos construir a página que contém o "átrio" do curso (cabeçalho, painel de estado e lista de missões). A parte mais complexa será programar a lógica que verifica se o utilizador já ativou o curso para mostrar ou o campo do código ou o seu progresso, e o componente que consegue carregar e mostrar o conteúdo HTML do Articulate Rise diretamente na página.

-   3.4. Desenvolvimento da Community Sidebar:

    -   Descrição: Vamos construir o componente visual da Community Sidebar com as suas três secções. A tarefa inclui programar a lógica que converte o `total_points` de um utilizador num nível e num ícone visual (ex: 350 pontos = Nível 3, ícone do ☀️) e garantir que o "Activity Feed" se liga à tabela de notificações e se atualiza em tempo real sempre que algo novo acontece.

### Medida 4: Criação e Integração de Conteúdo

*Fase de produção de todos os ativos de aprendizagem, visuais e de dados, e de os inserir na plataforma.*

-   4.1. Desenvolvimento dos Módulos E-learning:

    -   Descrição: Esta é uma tarefa de produção de conteúdo. Usando o software Articulate Rise 360, vamos construir os 5 módulos de missão que planeámos detalhadamente, incluindo os textos, vídeos, quizzes e interações. No final, cada módulo será exportado como um pacote de ficheiros HTML.

-   4.2. "Sementeira" da Base de Dados (Seeding):

    -   Descrição: "Semear" a base de dados significa populá-la com os dados iniciais para que a aplicação não comece vazia. Vamos pegar no ficheiro de dados JSON que preparámos e usá-lo para criar as entradas iniciais: o curso `PASS10`, as suas 5 missões, os 5 badges, etc. A parte mais importante será fazer o upload do conteúdo HTML de cada módulo Rise para a coluna `rise_html_content` na tabela `missions`.

-   4.3. Criação de Ativos Visuais:

    -   Descrição: Uma tarefa de design gráfico que consiste em criar os ficheiros de imagem necessários para o nosso MVP: as 5 imagens únicas para cada medalha digital (ex: "Detetive Digital") e a imagem de capa principal para o curso `PASS10`.

### Medida 5: Testes, Avaliação e Lançamento

*Fase final de garantia de qualidade, validação com utilizadores reais e preparação para o lançamento da primeira turma.*

-   5.1. Testes Internos (Alpha):

    -   Descrição: A equipa de desenvolvimento e gestão do projeto realiza a primeira ronda de testes. O objetivo é testar exaustivamente todas as funcionalidades de forma interna (o chamado "teste alpha"), tentando "partir" a aplicação para encontrar erros (bugs) e garantir que tudo funciona conforme o planeado.

-   5.2. Testes com Utilizadores (Beta):

    -   Descrição: Este é um dos momentos mais importantes. Vamos realizar uma sessão piloto com um grupo real de formandos e um formador, que irão usar a aplicação num contexto o mais próximo possível do real. O objetivo não é só encontrar bugs, mas principalmente recolher feedback sobre a experiência: A aplicação é fácil de usar? A gamificação é motivadora? As instruções são claras?

-   5.3. Correção de Erros (Bug Fixing):

    -   Descrição: Com base nos problemas e no feedback recolhidos nas fases de teste, a equipa de desenvolvimento irá prioritizar e resolver os erros e fazer os ajustes de usabilidade necessários para melhorar a experiência final.

-   5.4. Lançamento (Deployment):

    -   Descrição: Este é o passo final. Após a correção dos erros e com a luz verde de todos os envolvidos, a versão final e estável da aplicação é publicada através do Netlify, ficando oficialmente "live" e disponível na internet para a primeira turma de formandos.
