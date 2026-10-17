# 0001. Setup da Fundação, Design Tokens Sage Paper e Hero do Documento Vivo

- **Status:** implementada
- **Projeto:** landing page
- **Docs relacionados:** `docs/21-diretrizes-de-design-ui-ux.md`, `docs/referencias/01-curadoria-landing-page.md`

## Objetivo

Configurar a infraestrutura inicial do projeto Next.js 15 com Tailwind CSS v4, design tokens do *Sage Paper*, tipografia editorial e implementar o topo da página (Navbar com logotipo oficial e a Hero Section "O Documento Vivo" com abas interativas dos 5 segmentos).

## Escopo

**Inclui:**
- Setup do Next.js 15 (App Router), TypeScript em modo `strict`, Tailwind CSS v4 e Vitest para testes automatizados.
- Configuração das variáveis semânticas CSS do *Sage Paper* no `globals.css` (canvas `#EBF2ED`, nanquim `#0E1210`, floresta `#24523B`, bordas `#D2E0D6`) e fontes `Geist`, `Geist Mono` (`tabular-nums`) e `Newsreader`.
- Componente de Navbar com o logotipo oficial `tratto` ([`public/logo.svg`](../public/logo.svg)) e link/botão para a lista de espera.
- Hero Section em Layout Editorial Centrado (Manifesto Focado no Problema):
  - Headline de alto impacto dividida em 3 blocos:
    - Linha 1: *"Seus contratos deveriam levar menos de"*
    - Linha 2: *"2 minutos para ficar pronto"*
    - Linha 3: *"e zero planilhas para controlar vencimentos."* em destaque maior, itálico `Newsreader`, peso `font-semibold` e cor dinâmica do tema ativo (`var(--accent-primary)`).
  - O Protagonista: texto *"Aqui nasce a"* em peso médio (`font-medium`) que evidencia a sutil variação da tinta do tema (`var(--text-muted)`) dando destaque principal para a logo oficial ampliada do Tratto (`<TrattoWordmark />`) com selo dinâmico.
- Dicionário tipado de dados para os 5 segmentos iniciais na Minuta Viva (preservado para a demonstração da solução nas próximas seções).

**Não inclui (ficará para as próximas specs):**
- O fluxo completo de formulário em 2 etapas com gravação de lead no banco/API (Spec 0002).
- As páginas dedicadas por segmento `/coworking`, `/advocacia` etc. (Spec 0003).
- O caderno editorial de artigos em `.mdx` (Spec 0004).
- As seções O Problema, Features, Segurança e FAQ (Spec 0005).

## Requisitos

- **R1. Identidade Visual Sage Paper:** Toda a página deve obedecer às cores e contrastes do Doc 21, com fundo `#EBF2ED` contínuo, cartões brancos com bordas finas de 1px `#D2E0D6` e zero efeitos de IA (sem gradientes neon, sem cantos `rounded-3xl`).
- **R2. Tipografia Editorial:** Utilizar `Geist Sans` para o texto base e botões, `Geist Mono` com números tabulares (`tnum`) para valores e variáveis, e `Newsreader` (itálico) para os destaques.
- **R3. Acessibilidade:** Navbar e Hero devem possuir marcação semântica adequada (`<header>`, `<main>`, `<h1>`).

## Critérios de Aceitação

- **CA1.** A Navbar deve renderizar o ícone oficial do Tratto com link para a home e o botão de ação para a lista de espera.
- **CA2.** A Hero Section deve renderizar a headline em 3 linhas com escala visual ampliada (L1 e L2 em `text-xl sm:text-3xl lg:text-[36px]`, L3 ampliada em `Newsreader` itálico `font-semibold` `text-2xl sm:text-4xl lg:text-[46px]`) e o bloco *"Aqui nasce a"* acompanhado do `<TrattoWordmark />` com escala ampliada (`h-12 sm:h-16 lg:h-20`) e ponto de selo sincronizado ao tema ativo.
- **CA3.** Por padrão, o segmento inicial selecionado na Minuta Viva deve ser "Coworking", exibindo a variável `{{cliente_nome}}` como "Estúdio Nexo Arquitetura Ltda" e o valor `R$ 2.450,00 / mês`.
- **CA4.** Ao selecionar o segmento "Advocacia", a Minuta Viva deve atualizar para exibir o cliente e objeto de advocacia (ex: honorários / partido mensal).
- **CA5.** Ao selecionar "Academias", "Escolas" ou "Contabilidade", os textos e variáveis da Minuta Viva devem refletir os respectivos segmentos de acordo com o dicionário tipado.
- **CA6.** A Hero Section deve renderizar os 8 cartões ilustrativos de papéis/contratos desorganizados com background sólido opaco na cor de superfície do tema (`var(--accent-surface)`), sem efeito de glassmorphism ou transparência com blur. Na versão desktop e tablet, os cartões são organizados em duas pilhas nos cantos inferiores com folga vertical para não sobrepor o texto. Na versão mobile, os 8 cartões são exibidos reunidos em uma única pilha centralizada no rodapé da seção, abaixo do texto central. Cada pilha possui animação fanning out independente onde os documentos se elevam suavemente de dentro para fora ao passar o cursor.

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
- `src/components/tratto-wordmark.tsx`: Logotipo oficial com SVG inline e ponto de selo dinâmico com o tema.
- `src/components/hero-chaos-papers.tsx`: Cartões ilustrativos de papéis/contratos desorganizados flutuando com craft editorial.
- `src/components/hero.tsx`: Seção Hero em layout manifesto centrado.
- `src/components/live-document-card.tsx`: Componente interativo da Minuta Viva.
- `src/lib/segments.ts`: Dicionário tipado dos segmentos com textos, variáveis e cláusulas de exemplo.
- `tests/unit/segments.test.ts`: Testes unitários do dicionário e do fallback de segmentos.
- `tests/unit/hero.test.tsx`: Testes de renderização e interatividade da Hero e Minuta Viva.

## Dependências Necessárias (Regra 10)

- `lucide-react`: Ícones vetoriais leves (setas, chevron, check).
- `clsx` + `tailwind-merge`: Para mesclagem segura de classes Tailwind (`cn`).
