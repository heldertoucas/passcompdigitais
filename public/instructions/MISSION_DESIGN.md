Guia Técnico e Pedagógico para o Design de Missões
==================================================

1\. Introdução
--------------

Este documento serve como o "manual de estilo" e o guia oficial para o design e implementação de todas as missões de aprendizagem na aplicação "Passaporte Competências Digitais". As diretrizes aqui definidas são o resultado de um processo de design iterativo e consolidam a nossa visão final para uma experiência de aprendizagem de alta qualidade.

O objetivo é garantir consistência, engajamento e eficácia pedagógica em todo o ecossistema de aprendizagem.

2\. A Perspetiva Pedagógica: Um Ecossistema de Aprendizagem Ativa
-----------------------------------------------------------------

A nossa abordagem pedagógica foca-se em criar um ambiente onde o formando é um agente ativo, não um consumidor passivo de conteúdo.

### Princípios Pedagógicos Fundamentais:

-   Aprendizagem Narrativa: As missões devem, sempre que possível, começar com um cenário ou um problema prático (ex: a "D. Amélia") que crie um contexto relevante e convide à exploração.
-   Participação Ativa: Para atividades que seriam realizadas em grupo, devem ser criadas micro-simulações interativas online (ex: o jogo "Construção em Cadeia") para garantir uma aprendizagem experiencial.
-   Conexão Social: Devem ser incluídos "Pontos de Partilha" que incentivem os formandos a expressar as suas reflexões e a ver as contribuições dos colegas, fomentando um sentido de comunidade através do "Mural da Turma".
-   Avaliação de Competências: As verificações de conhecimento devem focar-se em cenários práticos que avaliem a capacidade de aplicar o conhecimento, em vez de memorização.

3\. A Perspetiva Técnica: Um Sistema de Design Modular
------------------------------------------------------

A nossa arquitetura técnica foi desenhada para ser flexível, escalável e de fácil manutenção.

### Stack Tecnológica e de Design:

-   Styling: A implementação deve recorrer à biblioteca de componentes HeroUI ([https://www.heroui.com](https://www.heroui.com/ "null")) sempre que possível. Como o HeroUI é construído sobre Tailwind CSS, este será o nosso sistema de design base, garantindo consistência visual. Não devem ser introduzidos outros frameworks de CSS.
-   Arquitetura de Conteúdo: O conteúdo é gerido de forma modular. Cada missão é composta por uma sequência ordenada de `blocks` (armazenados na base de dados). A aplicação irá obter a lista de blocos de uma missão e renderizá-los dinamicamente.
-   Interatividade: Toda a interatividade personalizada (modais, simulações, etc.) deve ser implementada com vanilla JavaScript para manter a aplicação leve e performante.

### Sistema de Blocos de Conteúdo

Para garantir uma linguagem visual coerente, todas as missões devem ser construídas usando os seguintes tipos de blocos, cada um com o seu estilo e propósito definidos.

#### Tabela `blocks` (Estrutura de Referência):

-   `category`: Define o tipo de bloco (`aprender`, `descobrir`, `desafio`, `partilha`).
-   `tags`: Um array de texto para etiquetas (`{'presencial', 'online', 'em grupo'}`).
-   `points_reward`: O número de pontos atribuídos pela conclusão do bloco.
-   `block_html_content`: O conteúdo HTML do bloco.

#### 1\. Bloco `aprender`

-   Propósito: Explicar conceitos teóricos e fundamentais.
-   Ícone: 📖 (Livro) | Cor de Destaque: Azul (`--pcd-blue`)
    ```html
    <svg class="w-7 h-7 text-pcd-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
    ```
-   Implementação: Tipicamente um cartão branco (`bg-pcd-card-bg`) com texto e, opcionalmente, componentes interativos como acordeões para dividir a informação.

#### 2\. Bloco `descobrir`

-   Propósito: Apresentar recursos externos para análise e exploração (vídeos, artigos, links).
-   Ícone: 🔭 (Binóculos) | Cor de Destaque: Roxo (`--pcd-roxo`)
    ```html
    <svg class="w-7 h-7 text-pcd-roxo" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3"></circle><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.364 16.364l2.121 2.121M5.515 5.515l2.121 2.121m0 0A7.5 7.5 0 1112 4.5M12 4.5v3m0 9v3m4.5-7.5h3m-9 0H4.5"></path></svg>
    ```
-   Implementação: Semelhante ao bloco `aprender`, mas com um foco em conteúdo embutido (`iframe` para vídeos, links bem visíveis).

#### 3\. Bloco `desafio`

-   Propósito: Propor atividades práticas e interativas onde o formando aplica o conhecimento.
-   Ícone: 🎯 (Alvo) | Cor de Destaque: Verde (`--pcd-green`)
    ```html
    <svg class="w-7 h-7 text-pcd-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-4a6 6 0 100-12 6 6 0 000 12z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 12 2 2 4-4"></path></svg>
    ```
-   Implementação: Um cartão branco que pode conter sub-secções com fundo suave (`bg-pcd-bg-soft`) para distinguir diferentes modalidades (ex: Presencial vs. Online). Deve usar sempre as etiquetas (`tags`) da base de dados.

#### 4\. Bloco `partilhar`

-   Propósito: Criar momentos de interação social e construção de comunidade.
-   Ícone: 💬 (Balão de Fala) | Cor de Destaque: Cinza (`--pcd-text-light`)
    ```html
    <svg class="w-7 h-7 text-pcd-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    ```
-   Implementação: Um cartão com um fundo suave (`bg-pcd-bg-soft`) e uma borda para o distinguir dos blocos de conteúdo primário. Deve incluir um campo de texto e botões para partilha e visualização do "Mural da Turma" (modal).
