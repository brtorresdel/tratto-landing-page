# 0005. SEO Técnico, OpenGraph Dinâmico, Metadados e Acessibilidade (WCAG 2.1 AA)

- **Status:** implementada
- **Projeto:** landing page
- **Docs relacionados:** `docs/18-landing-page.md`, `docs/21-diretrizes-de-design-ui-ux.md`, `docs/17-lgpd-e-conformidade.md`

---

## Objetivo

Implementar a infraestrutura completa de SEO técnico, metadados semânticos, imagem de compartilhamento social dinâmica (OpenGraph / Twitter Card 1200x630 no padrão *Sage Paper*), sitemap/robots nativos e conformidade rigorosa de acessibilidade digital (WCAG 2.1 nível AA), garantindo máxima pontuação em motores de busca e pré-visualizações ricas e atraentes em redes sociais e mensageiros (WhatsApp, LinkedIn, Twitter, etc.).

---

## Escopo

**Inclui:**

1. **Metadados Globais & OpenGraph Completo (Next.js 15 App Router):**
   - Configuração de `Metadata` com `metadataBase` flexível (subdomínio de produção e fallback local).
   - `title` com template dinâmico: `Tratto — Seus contratos em 2 minutos e zero planilhas`.
   - `description` editorial otimizada para intenção de busca de gestores e PMEs.
   - Meta tags OpenGraph (`og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale="pt_BR"`, `og:type="website"`).
   - Meta tags Twitter Card (`summary_large_image`).

2. **Imagem OpenGraph Dinâmica (`src/app/opengraph-image.tsx`):**
   - Geração nativa via `ImageResponse` (JSX/Edge Runtime) de imagem PNG 1200x630.
   - Design visual *Sage Paper*: fundo canvas, logotipo oficial Tratto com ponto de selo colorido, headline de impacto ("Seus contratos em menos de 2 minutos"), badge editorial e assinatura do criador.
   - Twitter image idêntica ou herdada automaticamente.

3. **Indexação Semântica (Robots & Sitemap):**
   - `src/app/robots.ts`: geração dinâmica de `robots.txt` permitindo rastreamento público de robôs e linkando o sitemap.
   - `src/app/sitemap.ts`: geração dinâmica de `sitemap.xml` com rota principal, prioridade 1.0 e frequência de atualização.

4. **Dados Estruturados Schema.org (JSON-LD):**
   - Injeção de script `<script type="application/ld+json">` contendo:
     - `SoftwareApplication`: categoria BusinessApplication, sistema Web, autor Bruno Torres e descrição da Tratto.
     - `Organization`: entidade Tratto e URLs oficiais.

5. **Acessibilidade Digital (WCAG 2.1 AA):**
   - Verificação de `lang="pt-BR"` no elemento `<html>`.
   - Contraste de cores mínimo de 4.5:1 em todos os textos sobre fundos claro e escuro.
   - Nomes acessíveis inequívocos para todos os links, botões e elementos interativos.
   - Validação de hierarquia semântica de cabeçalhos (`h1` protagonista único, seguido de `h2` e `h3`).
   - Suporte a `prefers-reduced-motion` no CSS para respeitar preferências de usuários sensíveis a animações.

**Não inclui (fica para depois):**
- Blog em MDX com posts individuais e sitemap dinâmico de artigos (Spec 0006).
- Páginas de nicho específicas (`/coworking`, `/advocacia`) com metadados próprios (Spec futura).

---

## Requisitos

- **R1. Metadados e Social Sharing:** O site deve conter todas as tags necessárias para que links compartilhados em WhatsApp, Telegram, LinkedIn, Twitter e Slack exibam título, descrição, autor e a imagem em tamanho grande sem erros.
- **R2. Geração da OG Image sem Dependências Pesadas:** A imagem 1200x630 deve ser gerada utilizando exclusivamente a API nativa `ImageResponse` do Next.js, mantendo a identidade visual *Sage Paper*.
- **R3. Robots e Sitemap Nativos:** Devem ser servidos nas rotas `/robots.txt` e `/sitemap.xml` sem arquivos estáticos manuais, utilizando os geradores do Next.js App Router.
- **R4. Dados Estruturados Válidos:** O JSON-LD deve ser válido segundo as especificações do Schema.org e Google Rich Results.
- **R5. Conformidade WCAG 2.1 AA:** Garantir navegação acessível por teclado, contraste e compatibilidade com leitores de tela sem nenhum bloqueio ou elemento inacessível.

---

## Critérios de Aceitação

- **CA1 (Metadados e OpenGraph):**
  - Dado que a aplicação é renderizada,
  - Então o HTML deve conter as tags `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<meta property="og:title">`, `<meta property="og:image">` e `<meta name="twitter:card" content="summary_large_image">`.

- **CA2 (Geração da Imagem OpenGraph):**
  - Dado que um robô ou rede social requisita `/opengraph-image`,
  - Então o endpoint deve responder com status 200, content-type `image/png`, dimensões 1200x630 e conter os elementos da marca Tratto.

- **CA3 (Sitemap e Robots):**
  - Dado que um motor de busca acessa `/robots.txt`,
  - Então deve receber as regras de `User-Agent: *`, `Allow: /` e o link do Sitemap.
  - E ao acessar `/sitemap.xml`, deve receber o XML válido contendo a URL canônica da landing page.

- **CA4 (Schema.org JSON-LD):**
  - Dado que a página é carregada,
  - Então deve existir um elemento `<script type="application/ld+json">` contendo as definições de `SoftwareApplication` e `Organization`.

- **CA5 (Acessibilidade WCAG 2.1 AA):**
  - Dado que a página é inspecionada,
  - Então o elemento `<html>` deve possuir `lang="pt-BR"`.
  - E não deve haver links vazios ou botões sem rótulo acessível (`aria-label` ou texto legível).
  - E todas as animações críticas devem possuir fallback para `prefers-reduced-motion`.

---

## Casos de Erro e Limites

- **Variável de Ambiente Ausente:** Caso `NEXT_PUBLIC_SITE_URL` não esteja definida, deve usar fallback gracioso (`https://tratto.devtorres.com.br` em produção ou `http://localhost:3000` em desenvolvimento local).
- **Redes Sociais sem Suporte a Imagem Grande:** A imagem gerada em 1200x630 (aspect ratio 1.91:1) é a proporção padrão universal suportada por todas as plataformas (Facebook, LinkedIn, X/Twitter, WhatsApp, Discord, Slack).

---

## Segurança & Privacidade (LGPD)

- Nenhum dado pessoal do usuário é exposto em metadados, imagens abertas ou sitemap.
- Sem cookies invasivos de terceiros adicionados para tracking (preservando o modelo limpo da página).

---

## Plano Técnico

- `src/app/layout.tsx`: Atualização com objeto completo de `Metadata` e injeção do componente de JSON-LD.
- `src/app/opengraph-image.tsx`: Criação da imagem dinâmica 1200x630 via `ImageResponse`.
- `src/app/robots.ts`: Criação do gerador nativo do `robots.txt`.
- `src/app/sitemap.ts`: Criação do gerador nativo do `sitemap.xml`.
- `src/components/structured-data.tsx`: Componente isolado para injeção de Schema.org JSON-LD.
- `tests/unit/seo-metadata.test.ts`: Testes unitários de metadados, canonical e OpenGraph.
- `tests/unit/sitemap-robots.test.ts`: Testes unitários do sitemap e robots.
- `tests/unit/accessibility.test.tsx`: Testes unitários de estrutura semântica, atributo `lang` e acessibilidade.

---

## Plano de Testes

| Critério | Tipo de teste | Descrição |
|---|---|---|
| CA1 | Unitário | Valida estrutura completa do objeto `metadata` (título, descrição, canonical e OpenGraph) |
| CA2 | Unitário | Valida rota/função `OpenGraphImage` e dimensões da resposta (1200x630) |
| CA3 | Unitário | Valida saídas dos geradores `sitemap()` e `robots()` |
| CA4 | Unitário | Valida parsing e estrutura semântica do Schema.org JSON-LD |
| CA5 | Unitário | Valida atributos de acessibilidade, `lang="pt-BR"` e rótulos acessíveis |
