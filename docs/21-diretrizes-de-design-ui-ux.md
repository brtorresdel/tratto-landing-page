# 21. Diretrizes de Design, UI/UX e Craft (Tratto)

Guia mestre de design do **Tratto**: identidade visual, princípios de *Design Engineering*, salvaguardas contra estética gerada por IA ("anti-vibecoding") e referências de mercado para orientar as especificações de frontend.

---

## 1. Manifesto e Filosofia: Software como Instrumento

O Tratto é um software de trabalho para criação e gestão de contratos em pequenas e médias empresas. Ele não é uma vitrine de efeitos, nem um aplicativo de rede social, nem um agregador genérico de "IA mágica".

> **Princípio Central:** O Tratto deve parecer um **instrumento de precisão e uma papelaria de alta qualidade**, combinando a autoridade de um documento assinado à caneta nanquim com a fluidez de uma ferramenta contemporânea para criadores de produto.

### O Problema do "Look Feito por IA" (Vibecoding Aesthetic)
Modelos de linguagem generativos convergem, por probabilidade estatística, para a média dos templates de SaaS dos últimos dois anos. Quando instruídos a "gerar uma interface moderna", os modelos produzem quase invariavelmente:
- Fundos pretos ou cinzas-chumbo com gradientes neon roxos/índigo (`from-violet-600 to-indigo-600`).
- Brilhos difusos (*mesh gradients*, *glows* de borda, sombras coloridas).
- Bento grids assimétricos arbitrários com cantos excessivamente redondos (`rounded-3xl`), que desperdiçam espaço e destroem a hierarquia da informação.
- Ícones em absolutamente todos os rótulos e colunas, gerando poluição visual ("fadiga de ícones").
- Densidade visual pobre: espaços em branco de 64px, cards com um único número isolado e falta de tabelas de trabalho reais.
- Tipografia genérica sem números tabulares (`tnum`), sem ritmo editorial e com contraste rebaixado (`text-zinc-400` ilegível).
- Telas que só mostram o "estado perfeito", ignorando estados de carregamento (skeletons), erro, vazio, hover, clique e navegação por teclado.

**No Tratto, essa estética é terminantemente proibida.** O Tratto rejeita a estética de IA para adotar um design autoral, tátil e funcional.

---

## 2. Identidade Visual Consolidada (Sage Paper)

A identidade do Tratto inspira-se em papéis finos de papelaria artesanal (algodão e linho), na sobriedade de contratos tradicionais e na leveza de papéis timbrados acolhedores.

### 2.1 Paleta de Cores e Sistema Multitemas Pastéis
A cor base do produto não é o branco cirúrgico (`#FFFFFF`) nem o cinza escuro industrial. A tela base possui um tom pastel que reduz a fadiga ocular em jornadas longas de leitura jurídica.

| Tema | Fundo da Tela (`--bg-canvas`) | Acento Primário (`--accent-primary`) | Cartão / Superfície (`--bg-card`) | Borda Sutil (`--border-subtle`) |
|---|---|---|---|---|
| **Sage (Oficial)** | `#EBF2ED` (Sálvia pastel) | `#24523B` (Verde floresta profundo) | `#FFFFFF` | `#D2E0D6` |
| **Butter** | `#FAF8ED` (Manteiga suave) | `#755B13` (Âmbar seco) | `#FFFFFF` | `#ECE5C6` |
| **Apricot** | `#FAF3EC` (Pêssego linho) | `#8E4924` (Terracota) | `#FFFFFF` | `#ECDCCD` |
| **Coral** | `#FAF0F2` (Rosa-chá suave) | `#8A3340` (Bordô suave) | `#FFFFFF` | `#ECD1D6` |
| **Sky** | `#F0F5FA` (Céu acinzentado) | `#22517E` (Azul clássico) | `#FFFFFF` | `#D2E0EE` |

### 2.2 Tinta e Contraste
- **Tinta Principal (`--text-main`):** `#0E1210` (Preto nanquim puro). Garante contraste editorial máximo (WCAG AAA) sobre os fundos pastéis e brancos.
- **Tinta Secundária (`--text-muted`):** `#526359` (Verde ardósia escuro). Usada para metadados, legendas e textos de apoio, mantendo taxa de contraste segura (> 4.5:1).
- **Sem cinzas azulados lavados:** Proibido o uso de `text-gray-400` ou cinzas claros em textos legíveis.

### 2.3 Separação de Ativos de Marca (Ícone vs. Logotipo)
O **Ícone** e o **Logotipo (Wordmark)** são ativos autônomos e desacoplados:
1. **O Ícone (*The Executive T — Mark I*):**
   - Visto/rubrica executiva com curvatura de caneta-tinteiro.
   - Uso: Favicon, PWA, avatar de rede social, marca d'água de autenticidade em PDFs e botão colapsado de sidebar.
   - Arquivo: `public/icon.svg` / `<TrattoIcon />`.
2. **O Logotipo (*tratto*):**
   - Wordmark em caixa-baixa contemporânea com ponte unificada entre os dois `t`s.
   - Uso: Topbar da aplicação, landing page, cabeçalho de minutas e e-mails transacionais. Vive isolado, sem necessidade do ícone ao lado.
   - Arquivo: `public/logo.svg` / `<TrattoWordmark />`.

### 2.4 Badges Semafóricos Pastéis (Status de Contratos)
Evitar cores fluorescentes de semáforo de trânsito. O Tratto utiliza tons pastéis que informam com discrição:

| Status | Fundo | Texto | Significado |
|---|---|---|---|
| **Rascunho** | `#F3F1F6` (Lavanda/cinza neutro) | `#5C5566` | Minuta em elaboração |
| **Aguardando Aprovação** | `#FEF3C7` (Manteiga alerta) | `#92400E` | Desconto pendente de supervisor |
| **Aguardando Assinatura** | `#FDF3E7` (Pêssego suave) | `#8F5522` | Enviado às partes, aguardando firma |
| **Vigente** | `#E1EDE4` (Sálvia suave) | `#1E4D35` | Assinado e ativo |
| **Vencido / Cancelado** | `#FAEAEC` (Rosa-chá suave) | `#8F323D` | Encerrado, rescindido ou cancelado |

---

## 3. Tipografia Editorial & Micro-Tipografia

A tipografia do Tratto resolve três necessidades distintas com fontes de alto padrão:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Geist Sans   → Interface, Tabelas, Métricas e Formulários │
│ 2. Geist Mono   → Tags de Variáveis, Hashs, IDs e Auditoria │
│ 3. Newsreader   → Pré-visualização de Minutas e Cláusulas   │
└─────────────────────────────────────────────────────────────┘
```

### Regras de Micro-Tipografia:
1. **Números Tabulares (`tabular-nums` / `tnum`):**
   - **Obrigatório** em todas as colunas de valores (`R$ 1.250,00`), datas (`15/10/2026`), contadores e percentuais.
   - Evita que dígitos com larguras diferentes façam tabelas e linhas "dançarem" horizontalmente.
2. **Alinhamento em Tabelas de Dados:**
   - Textos e nomes: alinhados à **esquerda**.
   - Valores monetários, datas e quantidades: alinhados à **direita**.
   - Status e ações: alinhados ao **centro** ou à **direita**.
3. **Caixa-Alta Restrita:**
   - Proibido usar `uppercase` em títulos inteiros ou botões longos.
   - Permitido apenas em *eyebrows* (pequenos chapéus de seção de 10-11px), **sempre acompanhado de tracking expandido** (`tracking-wider` ou `tracking-widest`).
4. **Hierarquia de Documento (Newsreader):**
   - Utilizada no preview de contratos web para conferir peso formal e legibilidade de longo formato aos termos jurídicos.

---

## 4. Matriz: Interface "Vibecodada por IA" vs. "Design Engineering Tratto"

Esta matriz serve de crivo para qualquer componente ou tela gerada para o produto:

| Elemento | ❌ O que a IA faz por padrão (Vibecoding) |  Padrão Tratto (Design Engineering) |
|---|---|---|
| **Superfícies & Fundos** | Gradientes roxo/azul escuro, `bg-black`, blur translúcido pesado | Canvas pastel calmo (`#EBF2ED`), cartões brancos sólidos, profundidade via borda física de 1px |
| **Bordas** | Bordas brilhantes com neon glow ou bordas invisíveis | Bordas nítidas de 1px (`#D2E0D6` ou `border-zinc-200/80`), sem gradiente no traço |
| **Cantos Arredondados** | `rounded-3xl` ou `rounded-2xl` em todos os blocos | `rounded-lg` (8px) para cartões e modais; `rounded-md` (6px) para inputs e botões. Compacto e profissional |
| **Layout de Dados** | "Bento Grids" cheios de cards vazios com gráficos desnecessários | Tabelas compactas com linhas de 36px-40px, paginação clara, filtros combinados e densidade útil |
| **Ícones** | Ícone em cada palavra (`[👤 Cliente]`, `[💰 Valor]`, `[📅 Data]`) | Ícones apenas onde têm função semântica direta (ações, ordenação, chevron, fechar) |
| **Efeitos Decorativos** | Brilhos de IA (estrelas ✨), esferas 3D flutuantes, linhas pontilhadas de grid | Zero elementos decorativos sem dados. A beleza vem do alinhamento, do papel e da tipografia |
| **Feedback e Notificações** | Modais intrusivos no centro da tela para qualquer ação | Toasts discretos no canto inferior direito via Sonner; salvamento automático com indicador silencioso |
| **Sensação de Toque** | Botões sem estado de clique; transições lentas ou pulantes | Botões com estado `:active` nítido (`scale-[0.98]` ou escurecimento de 1px), feedback instantâneo |
| **Linguagem & Textos** | Frases genéricas em inglês ou clichês ("Eleve seus contratos com o poder da IA") | Português claro, direto e profissional para PMEs brasileiras ("Novo contrato", "Aguardando assinatura") |

---

## 5. A Regra dos 6 Estados Obrigatórios

Quando a IA gera telas, ela costuma programar apenas o **estado perfeito** (com 5 contratos bonitos preenchidos). No Tratto, nenhuma especificação ou tela é aprovada sem contemplar os **6 estados essenciais de qualquer componente interativo**:

1. **Default (Repouso):** Claro, com contraste e affordance evidente.
2. **Hover (Passagem do mouse):** Resposta imediata (transição de 100-150ms), discreta mudança de superfície ou reforço de borda.
3. **Active / Pressed (Pressionado):** Micro-afundamento tátil (`active:scale-[0.99]` ou sutil variação de tom), dando certeza física do clique.
4. **Focus-Visible (Teclado / Acessibilidade):** Anel de foco nítido e acessível (`focus-visible:ring-2 focus-visible:ring-[#24523B] focus-visible:ring-offset-2`).
5. **Loading / Pending (Processamento):**
   - **Tabelas e Cards:** *Skeleton loaders* com exatamente as mesmas dimensões da linha ou do dado real (nunca um spinner circular solto no meio do vazio).
   - **Botões de Ação:** Feedback inline com spinner de 14px e label "Salvando..." desabilitado, sem pulo de layout.
6. **Empty State & Error State:**
   - **Empty State:** Ilustração vetorial minimalista ou ícone monocromático sutil, texto explicativo acolhedor e botão de ação primária bem posicionado ("Nenhum contrato rascunhado ainda. Crie seu primeiro contrato a partir de um template.").
   - **Error State:** Mensagem de erro em português claro abaixo do campo, com borda sutil avermelhada e indicação de como corrigir.

---

## 6. Referências de Excelência, Artigos e Leituras Recomendadas

Para elevar o nível das interfaces e evitar a mediocridade visual, este projeto se apoia nas melhores referências mundiais de *Design Engineering* e artesanato de software:

### 6.1 Artigos e Ensaios Fundamentais
1. **Rauno Freiberg — *Invisible Details of Interaction Design* & *Craft*** ([rauno.me/craft](https://rauno.me/craft))
   - Análise profunda de física de movimento, foco no teclado, interações táteis e como micro-detalhes invisíveis diferenciam um software excepcional de um software descartável.
2. **Linear Method — *Crafting Software*** ([linear.app/method](https://linear.app/method))
   - A bíblia das ferramentas de trabalho modernas: foco no criador, velocidade como funcionalidade principal, ergonomia de atalhos e eliminação do overhead visual corporativo.
3. **Paco Coursey — *Craft and Component Foundations*** ([paco.me](https://paco.me))
   - Criador do `cmdk` e do `Sonner`. Demonstra como componentes universais devem responder à física, respeitar o scroll e ser acessíveis.
4. **Adam Wathan & Steve Schoger — *Refactoring UI***
   - Técnicas práticas para desenvolvedores: projetar a partir do cinza, priorizar hierarquia sobre cor, usar bordas e espaçamentos consistentes, evitar saturação excessiva.
5. **Edward Tufte — *The Visual Display of Quantitative Information***
   - Eliminação de "chartjunk" (decorações que não trazem dados) e maximização da densidade de dados com respeito ao usuário.
6. **Robin Rendle & Jim Nielsen — Ensaios sobre Tipografia e Web Calma** ([robinrendle.com](https://robinrendle.com) e [jim-nielsen.com](https://jim-nielsen.com))
   - O valor de interfaces tranquilas, tipografia editorial bem balanceada e o perigo do design homogeneizado por algoritmos.

### 6.2 Curadorias e Benchmarks para Consulta Visual
- **[ui.land](https://ui.land):** Diretório de referência focado exclusivamente em *Design Engineering*, micro-interações refinadas e interfaces de alta densidade.
- **[godly.website](https://godly.website):** Galeria humana de sites com excelência em tipografia, ritmo editorial e execução técnica de ponta.
- **[Linear (linear.app)](https://linear.app):** Benchmark de densidade de tabelas, menus de contexto, atalhos rápidos e sobriedade estética.
- **[Basecamp & HEY (37signals)](https://basecamp.com):** Inspiração para interfaces calorosas, centradas no texto, sem ornamentos falsos e profundamente humanas.
- **[iA Writer (ia.net)](https://ia.net):** O padrão ouro de respeito ao texto, proporção áurea de tipografia e eliminação de distrações em documentos.
- **[Typewolf (typewolf.com)](https://www.typewolf.com):** Referência de combinações tipográficas reais e uso de fontes com personalidade na web.

---

## 7. Diretrizes para Prompts e Criação de Specs de Frontend com IA

Ao criar ou instruir uma IA a gerar telas, componentes ou especificações visuais do Tratto, use as seguintes instruções de controle (injetáveis como regras de contexto):

### O "Prompt Negativo" (O que a IA NUNCA deve fazer)
```markdown
REGRAS NEGATIVAS DE UI PARA O TRATTO:
- NÃO use fundos pretos, azuis escuros ou temas espaciais estilo "SaaS escuro 2024".
- NÃO use gradientes de cor roxa, lilás, ciano ou neon em botões, fundos ou bordas.
- NÃO adicione sombras difusas coloridas ou efeitos de "glow" (brilho neon).
- NÃO use ícones de estrelas cintilantes (sparkles ✨) ou referências cafonas a IA mágica.
- NÃO use bordas arredondadas gigantescas (como rounded-3xl ou rounded-2xl em cartões normais). Use rounded-lg ou rounded-md.
- NÃO coloque ícones decorativos em cada coluna de tabela ou em cada rótulo de formulário.
- NÃO crie "bento grids" quando uma tabela ou lista bem organizada for mais eficiente.
- NÃO use textos em cinza claro com baixo contraste (respeite WCAG AAA no texto principal).
- NÃO omita estados de carregamento (sempre especifique Skeleton com altura exata da linha).
```

### O "Prompt Positivo" (O que a IA DEVE priorizar)
```markdown
DIRETRIZES POSITIVAS DE UI PARA O TRATTO:
- Estética "Sage Paper": fundo em tom pastel acolhedor (#EBF2ED), cartões brancos nítidos, texto nanquim profundo (#0E1210).
- Contraste e definição: separe elementos com bordas finas de 1px (#D2E0D6) e sutis contrastes de superfície, não com borrões de sombra.
- Tipografia precisa: use Geist Sans para a interface, com números tabulares (tabular-nums) em todos os valores monetários, datas e quantidades. Alinhe moedas à direita.
- Densidade profissional: linhas de tabela entre 36px e 40px de altura, compactas, permitindo escanear muitos contratos sem rolagem excessiva.
- Micro-interações táteis: botões com feedback de active:scale-[0.99] e foco por teclado (focus-visible) impecável.
- Notificações discretas: use toasts via Sonner no canto inferior direito para confirmações, sem interromper o fluxo com modais pesados desnecessários.
```

---

## 8. Stack Técnica de Frontend & Design Tokens

- **Framework:** Next.js 15 (App Router, Server Components + Client Islands).
- **Estilização:** Tailwind CSS v4 com variáveis CSS semânticas nativas.
- **Primitivas de Componentes:** **shadcn/ui** (construído sobre Radix UI acessível, sem bibliotecas pesadas de terceiros).
- **Ícones:** `lucide-react` (com traço de 1.5px ou 1.75px para harmonizar com a fonte Geist).
- **Notificações:** `sonner`.
- **Comandos & Busca:** `cmdk` (paleta de comandos estilo Linear para buscar contratos rapidamente via teclado).

### Tokens CSS Globais (Tema Sage Oficial)
```css
:root {
  --bg-canvas: #EBF2ED;
  --bg-card: #FFFFFF;
  --border-subtle: #D2E0D6;
  --border-strong: #A8C2B0;
  --accent-soft: #D9E8DD;
  --accent-primary: #24523B;
  --text-main: #0E1210;
  --text-muted: #526359;
  --badge-draft-bg: #F3F1F6;
  --badge-draft-text: #5C5566;
  --badge-pending-bg: #FDF3E7;
  --badge-pending-text: #8F5522;
  --badge-active-bg: #E1EDE4;
  --badge-active-text: #1E4D35;
  --badge-alert-bg: #FAEAEC;
  --badge-alert-text: #8F323D;
}
```

---

## 9. Simuladores Interativos & Ativos de Marca Existentes

Para validar e inspecionar a identidade visual em ação no navegador:
- **Simulador de Temas & Identidade:** [`docs/branding/simulador-identidade-e-temas.html`](./branding/simulador-identidade-e-temas.html) (ou em `http://localhost:3000/simulador-temas.html`).
- **Simulador de Motion do Wordmark:** [`docs/branding/simulador-animacao.html`](./branding/simulador-animacao.html) (ou em `http://localhost:3000/animacao.html`).
- **Ativos Vetoriais Oficiais:**
  - Ícone Oficial: [`public/icon.svg`](../public/icon.svg)
  - Logotipo Wordmark: [`public/logo.svg`](../public/logo.svg)
  - Animação em GIF: [`public/tratto-animated.gif`](../public/tratto-animated.gif)
