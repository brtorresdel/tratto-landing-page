# Curadoria de Referências Visuais e Estruturais — Landing Page (Tratto)

Documento de registro das decisões de direção de arte, arquitetura de conversão e referências visuais para a **Landing Page de Pré-lançamento** do Tratto, seguindo a identidade **Sage Paper** ([`docs/21-diretrizes-de-design-ui-ux.md`](../21-diretrizes-de-design-ui-ux.md)) e o escopo planejado em [`docs/18-landing-page.md`](../18-landing-page.md).

---

## 1. Resumo das Decisões Consolidadas (Rodada 1)

| Ponto Estratégico | Decisão Escolhida | Diretriz de Execução no Tratto |
|---|---|---|
| **1. Hero Section (Artefato Principal)** | **Opção A — O "Documento Vivo" (Split Layout)** | Coluna esquerda com proposta de valor editorial + CTA para lista de espera. Coluna direita com card interativo/tátil mostrando variáveis `{{ }}` (`Geist Mono`) preenchendo ao vivo uma minuta de contrato (`Newsreader`), com pílulas para alternar exemplos reais por segmento. |
| **2. Formulário da Lista de Espera** | **Opção A — Captura em 2 Etapas (*Progressive Disclosure*)** | **Etapa 1 (baixo atrito):** Nome/Empresa + E-mail + Segmento (grava o lead e dispara *double opt-in* imediatamente). **Etapa 2 (no mesmo card, pós-captura):** 3 perguntas rápidas em pílulas de clique único (volume mensal, como faz hoje, usa assinatura eletrônica?) + opt-in para entrevista de 20 min. Visual limpo, com amplo respiro editorial (sem aparência de formulário apertado). |
| **3. Páginas por Segmento** | **Opção 3A — "Template Camaleão" (5 segmentos iniciais)** | Mesma estrutura de código da Home, trocando dinamicamente os 30% críticos por rota: Headline/Subtítulo da Hero, exemplo da Minuta Viva na Hero, 3 dores do setor e pré-seleção do segmento no formulário. Segmentos iniciais: `/coworking`, `/advocacia` (foco em contratos de honorários/partido e minutas padronizadas), `/academias`, `/escolas` e `/contabilidade`. |
| **4. Acabamento dentro do *Sage Paper*** | **Híbrido Editorial-Primeiro (4C puxado para 4A)** | Base calorosa, humana e editorial inspirada em *Basecamp / iA Writer* (respiro generoso sobre o fundo `#EBF2ED`, forte presença de `Newsreader` nos títulos/destaques e nas prévias de cláusulas), usando as bordas finas de `1px solid #D2E0D6` do *Attio* como estrutura sutil de papelaria fina — sem parecer um painel técnico frio. |
| **5. Seção O Problema & Pesquisa** | **Opção 1B — Vivência Real Sóbria + Card de ROI** | Narrativa autoral focada em proximidade com o visitante, com ética estrita (sem expor nomes ou vínculos empregatícios passados; menção neutra à rotina prática de contratos manuais e macros frágeis), combinada com o cálculo concreto de ROI (esquecer 4 reajustes de IPCA = R$ 2.880/ano de perda invisível). |
| **6. Seção Artigos & Atualizações** | **Opção 2A — Caderno Editorial (Destaque + Changelog)** | Grid dividido: lado esquerdo com artigo de mercado em destaque (título em `Newsreader`, tempo de leitura, resumo); lado direito com coluna de micro-atualizações/changelog com tags (`Mercado`, `Release`, `Engenharia`). Alimentado 100% via arquivos `.mdx` locais no repositório. |
| **7. Seção de Recursos (Features)** | **Opção 1B — Trilha Interativa do Ciclo de Vida (4 Passos)** | Barra de abas com os 4 momentos do contrato: `[1. Upload .docx]` → `[2. Elaboração & Descontos]` → `[3. Parcelas sem Centavos Soltos]` → `[4. Reajuste Bacen & Vencimentos]`. Ocupa pouco espaço vertical, incentiva a exploração e demonstra recursos reais sem bento grid clichê. |
| **8. Seção de Segurança & LGPD** | **Opção 2C — Termo de Compromisso Minimalista** | Formato sóbrio em estilo "Termo de Garantias e Privacidade" com tipografia serifada `Newsreader`, borda lateral `#24523B` e 3 compromissos solenes: Isolamento absoluto verificado no servidor, Não-monetização de minutas para treino de IA e Auditoria imutável completa. Inspirado no *iA Writer Privacy Pledge*. |
| **9. Seção FAQ Anti-Objeção** | **Opção 3A — Acordeão Linear Interativo** | Lista com linhas nítidas de 1px (`#D2E0D6`), expansão fluida ao clique e respostas diretas para as 4 dúvidas centrais (arquivos `.docx` sem reescrever, integração BYOT sem substituir ZapSign/Clicksign, precificação acessível em Reais e acesso prioritário na lista). Inspirado em *Linear / Stripe*. |
| **10. Card de Compartilhamento (OG Image 1200x630)** | **Opção 4B — Manifesto Tipográfico Puro** | Card editorial de alto contraste e autoridade documental: chapéu em `Geist Mono` (*"Chega de Contrato_Final_v3_AgoraVai.docx"*), título marcante em `Newsreader` (*"Seus contratos deveriam levar 2 minutos para emitir — e zero planilhas para controlar vencimentos"*), logotipo `tratto` e rodapé de lista de espera. Inspirado em *Stripe Press / Basecamp*. |

---

## 2. Catálogo de Referências por Seção (Links + O que extrair + Adaptação Sage Paper)

### 2.1 Hero Section ("O Documento Vivo")

1. **[Cal.com](https://cal.com)**
   - **O que funciona:** Layout *split* (duas colunas) em *light mode*. À esquerda, tipografia forte e limpa com CTA direto; à direita, o produto demonstrado como um componente real e interativo em vez de uma ilustração abstrata.
   - **Como adaptar para o Tratto:** Substituir o widget de calendário do Cal.com pela nossa **"Minuta Viva"**: um card branco (`#FFFFFF`) com borda `#D2E0D6`, exibindo à esquerda os marcadores (`{{cliente_nome}}`, `{{plano_valor}}`, `{{indice_reajuste}}`) e à direita a folha do contrato em fonte `Newsreader` com os valores destacados em verde sálvia suave (`#E1EDE4` / texto `#1E4D35`).
2. **[Documenso](https://documenso.com)**
   - **O que funciona:** Estética de documento físico digitalizado com sobriedade, fundo claro acolhedor e foco na assinatura e integridade do documento.
   - **Como adaptar para o Tratto:** Usar o mesmo respeito ao "papel" na representação do contrato gerado, incluindo no rodapé do card da minuta o badge semafórico `Vigente` e a indicação discreta de `PDF + Hash SHA-256` em `Geist Mono`.
3. **[Stripe Invoicing](https://stripe.com/invoicing)**
   - **O que funciona:** Pílulas de seleção no topo do artefato visual da Hero que permitem ao visitante alternar o exemplo do documento em tempo real.
   - **Como adaptar para o Tratto:** Colocar pílulas discretas no topo da Minuta Viva (*Coworking*, *Advocacia*, *Academia*, *Escola*, *Contabilidade*) que trocam instantaneamente as variáveis e o texto da cláusula.

---

### 2.2 Formulário de Lista de Espera em 2 Etapas (*Progressive Disclosure*)

1. **[Tally.so](https://tally.so)**
   - **O que funciona:** Formulários com estética de folha de papel em branco, respiro generoso, zero poluição de caixas pesadas e sensação de calma ao preencher.
   - **Como adaptar para o Tratto:** Desenhar o card de inscrição com bastante espaço interno (`padding` amplo), título em `Newsreader`, inputs limpos com foco em `#24523B` e transição suave entre a Etapa 1 (Contato + Segmento) e a Etapa 2 (Qualificação rápida).
2. **[Attio](https://attio.com) & [Linear Waitlist / Onboarding](https://linear.app)**
   - **O que funciona:** Uso de *segmented controls* (pílulas clicáveis lado a lado) para perguntas de qualificação (`1–5`, `6–20`, `21–50`, `50+` contratos/mês) em vez de menus `<select>` nativos que exigem dois cliques e escondem as opções.
   - **Como adaptar para o Tratto:** Na Etapa 2 do formulário, apresentar todas as faixas de volume e ferramentas atuais como pílulas horizontais em `Geist Mono` (`tabular-nums`), permitindo que o lead responda tudo em menos de 15 segundos com 3 cliques.

---

### 2.3 Páginas por Segmento ("Template Camaleão")

1. **[Cal.com Solutions](https://cal.com/sales) & [Cal.com Recruiting](https://cal.com/recruiting)**
   - **O que funciona:** Reaproveitamento inteligente de 100% da engenharia da página principal, alterando apenas a narrativa do topo, os dados dentro do componente demonstrativo e os casos de uso.
   - **Como adaptar para o Tratto:** Criar um dicionário tipado por rota (`/coworking`, `/advocacia`, `/academias`, `/escolas`, `/contabilidade`) que injeta:
     - **Headline específica da dor do nicho** (ex. em `/advocacia`: *"Contratos de honorários, partido mensal e procurações gerados em 2 minutos, sem erro de preenchimento"*).
     - **Variáveis reais do nicho na Minuta Viva** (ex. em `/coworking`: `{{plano_sala_privativa}}`, `{{horas_sala_reuniao}}`; em `/escolas`: `{{responsavel_financeiro}}`, `{{parcelas_mensalidade}}`).
     - **Rastreamento automático da origem** no formulário da lista de espera.

---

### 2.4 Tom Editorial & Acabamento Visual (Híbrido puxado para Editorial)

1. **[Basecamp](https://basecamp.com) & [ONCE (37signals)](https://once.com)**
   - **O que funciona:** Narrativa direta, humana, empática com o dono de pequena/média empresa. Títulos com personalidade editorial forte sobre fundo creme/papel que não cansa a vista.
   - **Como adaptar para o Tratto:** Adotar o fundo `#EBF2ED` (Sálvia pastel) como folha contínua, usar títulos que conversam diretamente com quem sofre no Word + Excel, e destacar frases-chave com `Newsreader` (serifada).
2. **[iA Writer](https://ia.net/writer)**
   - **O que funciona:** Contraste impecável entre fonte serifada de leitura longa e fonte monoespaçada técnica, sem um único elemento decorativo inútil.
   - **Como adaptar para o Tratto:** Usar a dupla `Newsreader` (para a voz jurídica/editorial e cláusulas) + `Geist Mono` (para variáveis `{{ }}`, valores `R$` com `tabular-nums`, datas de vigência e índices `IPCA/IGP-M`).
3. **[Watershed](https://watershed.com) & [Attio](https://attio.com)**
   - **O que funciona:** Quando precisam mostrar dados, tabelas ou etapas de sistema, utilizam divisórias finas de `1px` que organizam a informação com elegância sem pesar no layout.
   - **Como adaptar para o Tratto:** Usar bordas de `1px solid #D2E0D6` para emoldurar os cartões brancos (`#FFFFFF`) sobre o canvas `#EBF2ED`, mantendo sempre o calor de papelaria fina como protagonista.

---

### 2.5 Seção O Problema & Pesquisa (Opção 1B: Vivência Sóbria + Card de ROI)

1. **[Basecamp — Why We Built This](https://basecamp.com)**
   - **O que funciona:** Tom pessoal, honesto e sem jargões corporativos. Estabelece empatia imediata mostrando que quem construiu o produto viveu a dor na pele.
   - **Como adaptar para o Tratto (Diretriz Ética Estrita):** Redação neutra e profissional. Não citar nomes de empresas, ex-empregadores ou vínculos específicos. A narrativa foca na constatação técnica e operacional: *"Ao acompanhar de perto a rotina de elaboração contratual em operações de serviços, a cena sempre se repetia: minutas sendo copiadas à mão, macros e planilhas caseiras quebrando por erros de digitação e reajustes anuais de inflação esquecidos numa gaveta."*
2. **[Ramp](https://ramp.com) & [WorldCC Research](https://www.worldcc.com)**
   - **O que funciona:** Evidenciar o custo invisível do problema com dados matemáticos irrefutáveis.
   - **Como adaptar para o Tratto:** Card de destaque ao lado da carta com cálculo de ROI concreto: *"A conta que ninguém faz no Excel: esquecer 4 reajustes de 5% (IPCA) em contratos de R$ 1.200/mês custa R$ 2.880,00 no ano. O Tratto se paga mais de 3x no primeiro alerta de reajuste."*

---

### 2.6 Seção Artigos & Atualizações do Projeto (Opção 2A: Caderno Editorial)

1. **[Linear Now / Changelog](https://linear.app/now)** & **[Stripe Press](https://press.stripe.com)**
   - **O que funciona:** Layout equilibrado que combina um grande ensaio/artigo de destaque editorial com uma lista cronológica de notas técnicas e atualizações de produto.
   - **Como adaptar para o Tratto:**
     - Layout com grid dividido: coluna esquerda com artigo de mercado em destaque (ótimo para atrair visitantes do LinkedIn e gerar autoridade); coluna direita com lista de atualizações recentes de desenvolvimento (releases da Fase 1 a Fase 4, marcos do produto, decisões de engenharia).
     - **Armazenamento:** 100% estático via arquivos `.mdx` no repositório da Landing Page (pasta `content/artigos/` e `content/atualizacoes/`). Prático, sem custos e versionado no Git.

---

### 2.7 Seção de Recursos / Features (Opção 1B: Trilha Interativa do Ciclo de Vida)

1. **[Stripe Billing Tour](https://stripe.com/billing)** & **[Watershed Steps](https://watershed.com)**
   - **O que funciona:** Abas horizontais interativas que guiam o visitante pelos passos da jornada sem empilhar dezenas de cards estáticos.
   - **Como adaptar para o Tratto:** 4 abas superiores (`[1. Upload .docx]` → `[2. Elaboração & Descontos]` → `[3. Parcelas sem Centavos]` → `[4. Reajuste Bacen & Vencimentos]`). Cada aba exibe uma micro-interface com dados reais (validador de marcadores, cálculo de parcelas exatas de R$ 333,34 e cálculo do IPCA com a série 433 do Bacen).

---

### 2.8 Seção de Segurança & LGPD (Opção 2C: Termo de Compromisso Minimalista)

1. **[iA Writer Privacy Pledge](https://ia.net)** & **[DuckDuckGo Privacy Promise](https://duckduckgo.com)**
   - **O que funciona:** Transparência radical e solene, transmitindo seriedade documental sem jargões corporativos vazios ou selos falsos.
   - **Como adaptar para o Tratto:** Um card amplo com tipografia `Newsreader`, borda lateral `#24523B` e 3 garantias claras:
     1. *Isolamento Absoluto:* Verificação multi-tenant no servidor em cada requisição (`organizationId` seguro).
     2. *Seus Documentos não Treinam IA:* Minutas pertencem exclusivamente à empresa.
     3. *Rastreabilidade Total:* Auditoria imutável append-only para cada clique de alteração.

---

### 2.9 Seção FAQ Anti-Objeção (Opção 3A: Acordeão Linear Interativo)

1. **[Linear FAQ](https://linear.app)** & **[Stripe FAQ](https://stripe.com)**
   - **O que funciona:** Linhas compactas de 1px (`#D2E0D6`), ícone sutil de `+ / −` e resposta imediata sem poluição visual.
   - **Como adaptar para o Tratto:** 4 perguntas cirúrgicas para o pré-lançamento:
     1. *Uso de arquivos Word (.docx):* Sim, 100% dos modelos existentes com tags `{{ }}`.
     2. *Substitui ZapSign/Clicksign:* Não, integra via BYOT com seu próprio token.
     3. *Preços:* Acessíveis para PMEs em Reais, com plano gratuito para testar.
     4. *Acesso Antecipado:* Lotes controlados com prioridade para quem topar entrevista de 20 min.

---

### 2.10 Card de Compartilhamento Social / OG Image 1200x630 (Opção 4B: Manifesto Tipográfico Puro)

1. **[Stripe Press](https://press.stripe.com)** & **[Basecamp Previews](https://basecamp.com)**
   - **O que funciona:** Design puramente editorial de altíssimo impacto no feed de redes sociais (LinkedIn/WhatsApp), quebrando o padrão de imagens de IA com "gradientes neon roxos".
   - **Como adaptar para o Tratto:** Fundo branco/papel com borda fina `#D2E0D6`, chapéu provocativo em `Geist Mono` (*"Chega de Contrato_Final_v3_AgoraVai.docx"*), título em `Newsreader` (*"Seus contratos deveriam levar 2 minutos para emitir — e zero planilhas para controlar vencimentos"*) e assinatura do domínio `tratto.com.br`.


