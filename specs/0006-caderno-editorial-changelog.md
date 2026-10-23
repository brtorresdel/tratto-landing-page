# 0006. Caderno Editorial & Changelog da Tratto

- **Status:** implementada
- **Projeto:** landing page
- **Docs relacionados:** `docs/18-landing-page.md`, `docs/21-diretrizes-de-design-ui-ux.md`, `docs/17-lgpd-e-conformidade.md`, `docs/decisoes/0006-sdd-e-tdd.md`

---

## Objetivo

Implementar a seção de **Changelog / Notas de Atualização** da Tratto, composta por:
1. Uma rota de listagem cronológica em linha do tempo (`/changelog`);
2. Rotas individuais estáticas indexadas exclusivamente pela data (`/changelog/[date]`, ex.: `/changelog/2026-10-22`);
3. Suporte a conteúdo rico (parágrafos, links externos, imagens e GIFs de demonstração);
4. Sistema de curtidas anônimo e sem login com feedback instantâneo;
5. Mecanismo de notificação por e-mail para a base de inscritos da lista de espera com teaser de 3 a 4 linhas e botão "Ler publicação completa";
6. Página personalizada de erro 404 (`not-found.tsx`) no estilo *Sage Paper*.

---

## Escopo

**Inclui:**

1. **Reutilização Integral da Identidade Visual:**
   - As novas páginas (`/changelog`, `/changelog/[date]` e `not-found.tsx`) reutilizam a estrutura global: `<Navbar />`, `<Footer />`, `<ScrollbarThemeSync />` e o seletor de temas flutuante `<ThemeSwitcher />` com os 5 temas pastéis funcionais.

2. **Repositório Tipado de Publicações (`src/data/changelog.ts`):**
   - Entradas indexadas pela data no formato `YYYY-MM-DD` (ex.: `2026-10-22`).
   - Campos: `date` (`YYYY-MM-DD`), `displayDate` (pt-BR, ex.: "22 de Outubro de 2026"), `title`, `teaser` (3 a 4 linhas para instigar o leitor), `category` (ex.: `Lançamento`, `Funcionalidade`, `Melhoria`), `badgeColor`, e `content` estruturado em blocos de texto, links, citações e mídia (`image`/`gif` com URL, `alt` e legenda).
   - Funções auxiliares `getAllChangelogEntries()` e `getChangelogEntryByDate(date)`.

3. **Página Principal de Listagem (`src/app/changelog/page.tsx`):**
   - Linha do tempo vertical elegante (*Sage Paper*).
   - Card de cada publicação com: data em `Geist Mono`, badge pastel, título em `Newsreader`, teaser introdutório, bloco de mídia (se houver), contador de curtidas e link de permalink para a página daquela data.

4. **Página Individual por Data (`src/app/changelog/[date]/page.tsx`):**
   - Rota direta: `/changelog/2026-10-22`.
   - Pré-renderizada via `generateStaticParams()`.
   - Breadcrumbs de navegação (`← Voltar ao Changelog`).
   - Conteúdo completo com renderização de textos, links formatados, imagens/GIFs ampliáveis e botão de curtir no final.
   - Metadados dinâmicos via `generateMetadata()` (título: `[Título da Publicação] — Changelog | Tratto`, descrição e canonical).

5. **Página Personalizada de 404 (`src/app/not-found.tsx`):**
   - Visual consistente com a marca Tratto (*Sage Paper*).
   - Título editorial (*"Este documento não foi encontrado no arquivo"*), subtítulo explicativo e botões de retorno à Home e ao Changelog.

6. **Sistema de Curtidas Anônimo sem Login (`<ChangelogLikeButton />`):**
   - Identificador aleatório e anônimo (`visitorId` UUID) gerado e armazenado exclusivamente no `localStorage`.
   - Consulta e persistência na tabela Supabase `changelog_likes` (`post_date`, `visitor_id`, `created_at`), com fallback gracioso em `localStorage` caso o banco não esteja conectado.
   - Micro-interação de pulso no ícone do coração ao curtir/descurtir e contador reativo.

7. **Serviço de Notificação por E-mail aos Inscritos (Broadcast):**
   - Template de e-mail editorial no Resend com teaser de 3 a 4 linhas e botão proeminente *"Ler publicação completa"*.
   - Endpoint administrativo seguro `POST /api/changelog/notify` protegido por token de autorização (`CHANGELOG_NOTIFY_TOKEN`), permitindo disparo controlado sob demanda.

**Não inclui (fica para depois):**
- Persistência global de curtidas na tabela Supabase `changelog_likes` (atualmente com fallback em `localStorage` com UI otimista; agendado para implementação posterior).
- Comentários de usuários.
- Edição de conteúdo via painel administrativo (as publicações são versionadas no repositório).

---

## Requisitos

- **R1. URLs Limpas por Data:** A identificação única da publicação deve ser sua data (`YYYY-MM-DD`), sem slugs redundantes ou números de versão.
- **R2. Conteúdo Rico:** O sistema deve suportar renderização de textos com links, blocos de destaques e imagens/GIFs com legenda e acessibilidade.
- **R3. Curtidas sem Coleta de Dados Pessoais:** O sistema de reações não deve requerer login, nem coletar IP, e-mail ou dados sensíveis.
- **R4. Disparo Protegido de E-mails:** A automação de e-mail para a lista de espera só pode ser acionada mediante cabeçalho de autenticação Bearer válido.
- **R5. Reutilização de Componentes e Temas:** Toda a experiência deve ser perfeitamente integrada aos tokens visuais *Sage Paper* e aos seletores de tema.
- **R6. Página 404 Nativa:** Rotas inválidas devem renderizar a tela de 404 temática.

---

## Critérios de Aceitação

- **CA1 (Repositório e Dados do Changelog):**
  - Dado o repositório `src/data/changelog.ts`,
  - `getAllChangelogEntries()` retorna a lista ordenada da data mais recente para a mais antiga.
  - `getChangelogEntryByDate(date)` retorna a publicação exata para uma data existente, ou `undefined` para inexistente.

- **CA2 (Página de Listagem `/changelog`):**
  - Dado que o visitante acessa `/changelog`,
  - Renderiza o cabeçalho editorial, Navbar, Footer e a linha do tempo com as publicações.
  - Cada item exibe título, data formatada, badge e botão para abrir a publicação individual (`/changelog/YYYY-MM-DD`).

- **CA3 (Página Individual `/changelog/[date]`):**
  - Dado que o visitante acessa `/changelog/2026-10-22`,
  - Renderiza o conteúdo integral (textos, mídia/GIFs e links externos).
  - Exibe o botão de curtir com contador.
  - Possui link para retornar à listagem geral.
  - Gera `<title>` dinâmico específico contendo o título da publicação.

- **CA4 (Tratamento de 404 e Página Não Encontrada):**
  - Dado que uma data inexistente é acessada (ex: `/changelog/1999-01-01`),
  - A rota dispara `notFound()` e exibe o componente temático `not-found.tsx`.

- **CA5 (Sistema de Curtidas Anônimo):**
  - Dado o componente `<ChangelogLikeButton date="2026-10-22" />`,
  - Ao clicar, alterna o estado de curtida e incrementa/decrementa o contador.
  - Não faz reload da página (UI otimista).
  - Persiste a preferência no `localStorage` do visitante.

- **CA6 (Disparo de E-mail aos Inscritos - Broadcast):**
  - Dado o endpoint `POST /api/changelog/notify`,
  - Se a requisição não possuir o Bearer token correto, retorna status 401 Unauthorized.
  - Se autenticado e fornecida uma data válida, busca os e-mails da lista de espera e dispara o template do Resend contendo o teaser e o botão com link para `/changelog/YYYY-MM-DD`.

- **CA7 (Acessibilidade WCAG 2.1 AA):**
  - Imagens e GIFs possuem atributos `alt` obrigatórios.
  - Botão de curtida possui `aria-label` descritivo do status e quantidade.
  - Semântica de `<article>`, `<time datetime="...">` e navegação total por teclado.

---

## Casos de Erro e Limites

- **Data Inválida ou Malformatada:** Acessos a URLs fora do padrão `YYYY-MM-DD` resultam em 404 imediato.
- **Supabase Indisponível para Curtidas:** O sistema de likes utiliza o armazenamento local do navegador como fallback silencioso, garantindo que o leitor nunca receba tela de erro.
- **Disparo de E-mail sem Destinatários:** Se a lista de espera estiver vazia, o endpoint retorna sucesso sem gerar erros na API do Resend.

---

## Segurança & Privacidade (LGPD)

- **Zero Banner de Cookies:** O `visitor_id` é um UUID aleatório gerado no cliente exclusivamente para evitar duplicidade acidental de cliques. Não é cookie de rastreamento, não cruza dados com outros sites e não identifica o titular, caracterizando funcionalidade técnica legítima (art. 7º, IX da LGPD).
- **Proteção do Endpoint de Broadcast:** O disparo em massa é protegido por token secreto em variável de ambiente (`CHANGELOG_NOTIFY_TOKEN`), impedindo acionamento indevido ou spam por terceiros.

---

## Plano Técnico

- `src/data/changelog.ts`: Definição de tipos (`ChangelogEntry`, `ChangelogBlock`), dados das postagens e funções de busca.
- `src/app/changelog/page.tsx`: Server Component da listagem principal com linha do tempo.
- `src/app/changelog/[date]/page.tsx`: Server Component da publicação individual com `generateStaticParams` e `generateMetadata`.
- `src/app/not-found.tsx`: Página global 404 temática *Sage Paper*.
- `src/components/changelog-like-button.tsx`: Client Component de reação/curtida com UI otimista e `localStorage`.
- `src/components/changelog-media.tsx`: Componente de imagem/GIF com legenda editorial e tratamento de proporção.
- `src/app/api/changelog/notify/route.ts`: Route Handler para disparo de e-mail broadcast aos inscritos.
- `src/lib/changelog-notifier.ts`: Gerador de HTML de e-mail e integração com Resend.
- `tests/unit/changelog-data.test.ts`: Testes do repositório de dados.
- `tests/unit/changelog-pages.test.tsx`: Testes de renderização da listagem e da página individual.
- `tests/unit/changelog-like-button.test.tsx`: Testes do botão de curtida e persistência local.
- `tests/unit/changelog-notify-route.test.ts`: Testes de autenticação e disparo do endpoint de e-mail.
- `tests/unit/not-found.test.tsx`: Testes da página 404.

---

## Plano de Testes

| Critério | Tipo de teste | Descrição |
|---|---|---|
| CA1 | Unitário | Valida funções de consulta, ordenação e integridade dos blocos de conteúdo |
| CA2 | Unitário | Valida renderização da listagem `/changelog`, linha do tempo e teasers |
| CA3 | Unitário | Valida renderização de `/changelog/[date]`, mídia/GIFs e metadados dinâmicos |
| CA4 | Unitário | Valida renderização da página `not-found.tsx` e disparo de 404 |
| CA5 | Unitário | Valida comportamento do botão de curtida, micro-interação e persistência |
| CA6 | Integração | Valida autenticação (401 sem token) e chamada de disparo no endpoint de notify |
| CA7 | Unitário | Valida atributos de acessibilidade, alt em mídias e labels de tela |
