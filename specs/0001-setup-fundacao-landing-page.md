# 0001. Setup da Fundação, Design Tokens Sage Paper e Hero do Documento Vivo

- **Status:** rascunho
- **Projeto:** landing page
- **Docs relacionados:** `docs/21-diretrizes-de-design-ui-ux.md`, `docs/referencias/01-curadoria-landing-page.md`

## Objetivo

Configurar a infraestrutura inicial do projeto Next.js 15 com Tailwind CSS v4, design tokens do *Sage Paper*, tipografia editorial e implementar o topo da página (Navbar com logotipo oficial e a Hero Section "O Documento Vivo" com abas interativas dos 5 segmentos).

## Escopo

**Inclui:**
- Setup do Next.js 15 (App Router), TypeScript em modo `strict`, Tailwind CSS v4 e Vitest para testes automatizados.
- Configuração das variáveis semânticas CSS do *Sage Paper* no `globals.css` (canvas `#EBF2ED`, nanquim `#0E1210`, floresta `#24523B`, bordas `#D2E0D6`) e fontes `Geist`, `Geist Mono` (`tabular-nums`) e `Newsreader`.
- Componente de Navbar com o logotipo oficial `tratto` ([`public/logo.svg`](../public/logo.svg)) e link/botão para a lista de espera.
- Hero Section em Split Layout (Decisão 1 do documento de curadoria):
  - Coluna esquerda: Badge de pré-lançamento (*"Pré-lançamento · Lista de Espera Aberta"*), headline com destaque editorial em `Newsreader`, subtítulo e atalho rápido de inscrição.
  - Coluna direita: Card interativo da "Minuta Viva", simulando um contrato real com marcadores `{{ }}` e pílulas no topo para alternar entre os 5 segmentos iniciais (*Coworking, Advocacia, Academias, Escolas, Contabilidade*).
- Dicionário tipado de dados para os 5 segmentos iniciais na Minuta Viva.

**Não inclui (ficará para as próximas specs):**
- O fluxo completo de formulário em 2 etapas com gravação de lead no banco/API (Spec 0002).
- As páginas dedicadas por segmento `/coworking`, `/advocacia` etc. (Spec 0003).
- O caderno editorial de artigos em `.mdx` (Spec 0004).
- As seções O Problema, Features, Segurança e FAQ (Spec 0005).

## Requisitos

- **R1. Identidade Visual Sage Paper:** Toda a página deve obedecer às cores e contrastes do Doc 21, com fundo `#EBF2ED` contínuo, cartões brancos com bordas finas de 1px `#D2E0D6` e zero efeitos de IA (sem gradientes neon, sem cantos `rounded-3xl`).
- **R2. Tipografia Editorial:** Utilizar `Geist Sans` para o texto base e botões, `Geist Mono` com números tabulares (`tnum`) para valores e variáveis, e `Newsreader` (itálico) para os destaques e o texto do contrato.
- **R3. Minuta Viva Interativa:** Ao clicar nas pílulas de segmento (*Coworking*, *Advocacia*, *Academias*, *Escolas*, *Contabilidade*), o texto da cláusula e as variáveis correspondentes no card da minuta devem mudar instantaneamente sem recarregar a página.
- **R4. Acessibilidade:** Navbar e Hero devem possuir marcação semântica adequada (`<header>`, `<main>`, `<h1>`, `role="tab"` / `role="tablist"` para as pílulas).

## Critérios de Aceitação

- **CA1.** A Navbar deve renderizar o logotipo do Tratto com link para a home e o botão de ação para a lista de espera.
- **CA2.** A Hero Section deve renderizar o título principal, o badge de pré-lançamento e o formulário simplificado de chamada.
- **CA3.** Por padrão, o segmento inicial selecionado na Minuta Viva deve ser "Coworking", exibindo a variável `{{cliente_nome}}` como "Estúdio Nexo Arquitetura Ltda" e o valor `R$ 2.450,00 / mês`.
- **CA4.** Ao selecionar o segmento "Advocacia", a Minuta Viva deve atualizar para exibir o cliente e objeto de advocacia (ex: honorários / partido mensal).
- **CA5.** Ao selecionar "Academias", "Escolas" ou "Contabilidade", os textos e variáveis da Minuta Viva devem refletir os respectivos segmentos de acordo com o dicionário tipado.

## Casos de Erro e Limites

- Se um segmento inválido for informado via props/estado, a Minuta Viva deve fazer fallback silencioso para o segmento padrão ("Coworking").

## Segurança & Privacidade

- Nenhum dado pessoal é coletado ou persistido nesta spec de apresentação.
- O campo de e-mail na Hero faz apenas scroll suave até a seção do formulário ou prepara a transição para a Spec 0002.

## Acessibilidade (WCAG)

- Contraste do texto principal `#0E1210` sobre `#EBF2ED` e `#FFFFFF` atende a WCAG AAA (> 7:1).
- Navegação das abas da Minuta Viva acessível via teclado.

## Plano Técnico

- `src/app/globals.css`: Variáveis do Sage Paper e diretivas de fonte.
- `src/app/layout.tsx`: Configuração de metadados, fontes Google/Geist e layout base.
- `src/app/page.tsx`: Composição da Home (Navbar + Hero).
- `src/components/navbar.tsx`: Cabeçalho institucional.
- `src/components/hero.tsx`: Seção Hero em split layout.
- `src/components/live-document-card.tsx`: Componente interativo da Minuta Viva.
- `src/lib/segments.ts`: Dicionário tipado dos segmentos com textos, variáveis e cláusulas de exemplo.
- `tests/unit/segments.test.ts`: Testes unitários do dicionário e do fallback de segmentos.
- `tests/unit/hero.test.tsx`: Testes de renderização e interatividade da Hero e Minuta Viva.

## Dependências Necessárias (Regra 10)

- `lucide-react`: Ícones vetoriais leves (setas, chevron, check).
- `clsx` + `tailwind-merge`: Para mesclagem segura de classes Tailwind (`cn`).
