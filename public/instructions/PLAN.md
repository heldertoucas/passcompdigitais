Plano de Implementação: Aplicação "Passaporte Competências Digitais" (v2)
=========================================================================

Este documento detalha o plano de implementação para o Produto Mínimo Viável (MVP) da aplicação "Passaporte Competências Digitais". Esta versão (v2) está atualizada para refletir a arquitetura final da base de dados, com um sistema de conteúdo modular.

### Medida 1: Configuração e Pré-Produção

*Fase de preparação do ambiente e organização do projeto.*

-   1.1. Configuração do Ambiente Técnico:

    -   Descrição: Criar e configurar as três principais ferramentas tecnológicas: o repositório no GitHub, o projeto no Supabase (Base de Dados e Autenticação) e o site no Netlify, ligando-o ao GitHub para *deployment* contínuo.

-   1.2. Implementação do Schema da Base de Dados:

    -   Descrição: Executar o script SQL final no Supabase para criar fisicamente todas as tabelas (`users`, `courses`, `classes`, `missions`, `blocks`, etc.), definindo as colunas, relações e políticas de segurança.

-   1.3. Criação do Backlog do Projeto:

    -   Descrição: Usar uma ferramenta de gestão de projetos (ex: GitHub Projects, Trello) para criar um quadro visual com "cartões" para cada tarefa detalhada neste plano, permitindo organizar e acompanhar o trabalho.

### Medida 2: Desenvolvimento do Backend e Lógica de Negócio

*Fase de construção do "motor" e das regras da aplicação no Supabase.*

-   2.1. Configuração da Autenticação e Perfis:

    -   Descrição: Implementar o sistema que permite aos utilizadores criarem uma conta e fazerem login, e criar o *trigger* que gera automaticamente um perfil na tabela `users` a cada novo registo.

-   2.2. Desenvolvimento das Funções da Base de Dados (API):

    -   Descrição: Criar os "comandos" (funções e queries) que o website usará para "conversar" com a base de dados, como obter a lista de cursos, validar códigos de turma, e registar o progresso dos utilizadores.

-   2.3. Implementação da Segurança:

    -   Descrição: Configurar as Políticas de Segurança ao Nível da Linha (RLS) no Supabase, garantindo que um utilizador só pode aceder e modificar os seus próprios dados.

### Medida 3: Desenvolvimento do Frontend (Interface do Utilizador)

*Fase de construção da parte visível da aplicação, o "website interativo".*

-   3.1. Construção da Estrutura Principal da Aplicação:

    -   Descrição: Desenvolver o layout base com a `Navbar`, a área de conteúdo principal e a `Community Sidebar`, e programar a aplicação para obter os textos da interface a partir da tabela `ui_content`.

-   3.2. Desenvolvimento dos Componentes de Navegação e Descoberta:

    -   Descrição: Criar a página do "Catálogo" que busca e apresenta os cursos e implementar a interação de clique para mostrar os detalhes de uma experiência de aprendizagem.

-   3.3. Desenvolvimento da Página de Aprendizagem Unificada:

    -   Descrição: Construir o "átrio" do curso e o componente que, em vez de carregar uma nova página, embute o conteúdo da missão (composto por múltiplos blocos) diretamente na área principal.

-   3.4. Desenvolvimento da Community Sidebar:

    -   Descrição: Construir o componente da sidebar com as suas 3 secções (`My Journey`, `Give Back To:`, `Activity Feed`) e implementar a lógica de cálculo de níveis e a apresentação de notificações em tempo real.

### Medida 4: Criação e Integração de Conteúdo

*Fase de produção de todos os ativos de aprendizagem, visuais e de dados, e de os inserir na plataforma.*

-   4.1. Desenvolvimento dos Blocos de Conteúdo:

    -   Descrição: Construir o conteúdo HTML de cada bloco individual (`aprender`, `descobrir`, `desafio`, `partilha`) para todas as 5 missões do curso `PASS10`, seguindo as diretrizes do "Guia Técnico e Pedagógico".

-   4.2. "Sementeira" da Base de Dados (Seeding):

    -   Descrição: (Alteração Crítica) O processo agora é mais granular. Envolve popular as tabelas da base de dados com os dados iniciais:

        1.  Criar as `digital_skills`.

        2.  Criar o `course` PASS10 e associá-lo às competências relevantes.

        3.  Criar as 5 `missions`.

        4.  Criar cada um dos `blocks` na tabela `blocks`, preenchendo o `category`, `tags`, `points_reward` e o `block_html_content` de cada um.

        5.  Ligar os blocos às missões através da tabela `mission_blocks`, definindo a ordem correta.

        6.  Criar os `badges` e associá-los aos blocos que os atribuem.

-   4.3. Criação de Ativos Visuais:

    -   Descrição: Tarefa de design gráfico que consiste em criar os ficheiros de imagem necessários: os 5 ícones para os badges e a imagem de capa para o curso `PASS10`.

### Medida 5: Testes, Avaliação e Lançamento

*Fase final de garantia de qualidade e preparação para o lançamento da primeira turma.*

-   5.1. Testes Internos (Alpha):

    -   Descrição: A equipa de desenvolvimento testa exaustivamente todas as funcionalidades para encontrar erros e garantir que tudo funciona conforme o planeado.

-   5.2. Testes com Utilizadores (Beta):

    -   Descrição: Realizar uma sessão piloto com um grupo real de formandos e um formador para recolher feedback sobre a usabilidade, clareza e fator de motivação da plataforma.

-   5.3. Correção de Erros (Bug Fixing):

    -   Descrição: Resolver os problemas técnicos e de usabilidade identificados nas fases de teste.

-   5.4. Lançamento (Deployment):

    -   Descrição: Publicar a versão final e estável da aplicação através do Netlify, tornando-a oficialmente disponível para a primeira turma de formandos.
