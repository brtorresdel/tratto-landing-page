# 0002. Seções de Conversão & Narrativa da Home (Problema com ROI, Ciclo em 4 Passos, Segurança e FAQ)

- **Status:** em revisão
- **Projeto:** landing page
- **Docs relacionados:** `docs/01-visao-do-produto.md`, `docs/18-landing-page.md`, `docs/21-diretrizes-de-design-ui-ux.md`, `specs/0001-setup-fundacao-landing-page.md`

## Objetivo

Apresentar a narrativa de valor do Tratto antes da captura de leads, demonstrando de forma clara, tátil e editorial como o produto resolve as principais dores de contratos em pequenas e médias empresas:
1. **O Problema Real & Métricas de Prejuízo:** Tornar tangível o custo invisível de gerenciar contratos no improviso (reajustes esquecidos, horas perdidas no Word e multas de rescisão não cobradas).
2. **O Ciclo em 4 Passos ("Como Funciona"):** Explicar o fluxo do produto (Upload de `.docx` com `{{ }}` $\rightarrow$ Minuta viva & aprovação de descontos $\rightarrow$ Assinatura eletrônica BYOT/Manual $\rightarrow$ Gestão de vigência, reajustes automáticos e parcelas).
3. **Para quem é o Tratto:** Posicionar o produto como um SaaS genérico e flexível para prestadores de serviço e empresas que formalizam relações contínuas (coworkings, academias, consultorias, agências, contabilidades e clínicas).
4. **Segurança & Rastreabilidade:** Transmitir confiança institucional demonstrando o isolamento multi-tenant, trilha de auditoria imutável (`AuditLog`) e conformidade com a LGPD.
5. **FAQ Editorial:** Esclarecer as dúvidas centrais sobre pré-lançamento, modelo de arquivos, assinaturas e precificação fundadora através de um accordion acessível no design *Sage Paper*.

---

## Escopo

**Inclui:**
- **Refinamento do `ProblemBanner` (`#o-problema`):**
  - Faixa em verde profundo (`var(--accent-primary)`) com tipografia editorial.
  - Grade das 3 métricas de prejuízo invisível (-12,4% em reajustes perdidos, 4h/semana gastas no Word, 21 dias de atraso em vigências).
  - Card comparativo de impacto financeiro (o custo anual do improviso vs. a previsibilidade com o Tratto).
- **Seção "Como Funciona o Tratto" (`#como-funciona`):**
  - Apresentação sequencial dos 4 passos essenciais do ciclo de vida:
    - *Passo 1 (Templates no Word):* O usuário usa seus próprios modelos `.docx` com marcadores `{{ variavel }}` sem perder a formatação original.
    - *Passo 2 (Minuta & Governança):* Preenchimento rápido e fluxo formal de aprovação caso o desconto comercial ultrapasse o teto permitido.
    - *Passo 3 (Assinatura Descomplicada):* Disparo para ZapSign / Clicksign com token próprio (BYOT) ou upload da via física assinada em modo manual.
    - *Passo 4 (Vigência & Reajuste Bacen):* Varredura diária de contratos a vencer, baixa de parcelas e aplicação automática do IPCA/IGP-M/INPC oficial.
- **Seção "Para quem é o Tratto" (`#para-quem-e`):**
  - Grade editorial com fichas de segmentos que sofrem com gestão de contratos, mantendo o posicionamento neutro e genérico do produto (ADR 0003).
  - Exemplos concretos de dores solucionadas: Empresas de Serviços, Coworkings, Academias/Estúdios, Consultorias/Agências e Contabilidades.
- **Seção "Segurança e Rastreabilidade" (`#seguranca`):**
  - Destaques de engenharia e governança: Isolamento absoluto por organização (`organizationId` validado no servidor), `AuditLog` imutável para toda mutação contratual, zero exclusão destrutiva de dados e exportação aberta em planilhas (CSV e XLSX).
- **Seção "Perguntas Frequentes" (`#faq`):**
  - Accordion interativo e acessível com 5 perguntas essenciais respondidas de forma transparente e objetiva.
- **Bloco de Transição / CTA Final:**
  - Chamada de encerramento convidando o leitor a garantir sua vaga antecipada, com âncora suave para a seção `#lista-de-espera`.

**Não inclui (fica para depois):**
- Formulário interativo da lista de espera em 2 etapas com persistência no banco (objeto da **Spec 0003**).
- Páginas dedicadas e aprofundadas por segmento (removidas da fase de pré-lançamento para validação ampla).
- Menu hambúrguer completo e rodapé expandido com links institucionais (objeto da **Spec 0004**).

---

## Requisitos

- **R1. Estética Editorial Sage Paper (Doc 21):** Todas as seções devem seguir estritamente o contraste WCAG AAA, com cartões brancos sobre fundo `#EBF2ED`, bordas finas de 1px `#D2E0D6`, tipografia Geist Sans + Newsreader itálico e Geist Mono para números/métricas. Zero gradientes neon, zero sombras coloridas e zero bento grids vazios.
- **R2. Responsividade Mobile First:** A narrativa deve ser legível e escaneável em qualquer resolução (celulares de 360px a monitores ultrawide), com empilhamento vertical suave nos passos e colunas da grade.
- **R3. Acessibilidade (WCAG AA/AAA):** O FAQ deve operar com atributos ARIA semânticos (`aria-expanded`, `aria-controls`), suporte total a teclado (`Space` e `Enter` para abrir/fechar itens) e foco visível.
- **R4. Semântica HTML:** Estrutura clara com `<section id="...">`, cabeçalhos ordenados (`<h2>`, `<h3>`), tags de texto e listas semânticas.
- **R5. Reatividade ao Tema:** Badges e destaques de acento devem sincronizar perfeitamente com os 5 temas pastéis do Tratto (`Sage Classic`, `Warm Linen`, `Soft Clay`, `Mist Blue`, `Pale Olive`).

---

## Critérios de Aceitação

- **CA1.** A seção do Problema Real (`#o-problema`) deve renderizar o chapéu editorial, o título principal em Newsreader, a grade das 3 métricas de prejuízo invisível com valores em `Geist Mono` (`-12,4%`, `4h / sem`, `21 dias`) e o card de impacto financeiro comparativo.
- **CA2.** A seção "Como Funciona" (`#como-funciona`) deve renderizar os 4 passos sequenciais do ciclo contratual (Upload DOCX, Minuta & Aprovação, Assinatura Eletrônica e Vigência/Reajuste), cada qual com sua numeração estilizada em `Geist Mono` e resumo objetivo.
- **CA3.** A seção "Para quem é o Tratto" (`#para-quem-e`) deve renderizar a introdução reafirmando o caráter genérico do SaaS e exibir pelo menos 4 cartões de exemplos de empresas prestadoras de serviços e recorrentes.
- **CA4.** A seção de Segurança (`#seguranca`) deve renderizar os 4 pilares de integridade: Isolamento Multi-tenant, Rastreabilidade Imutável (`AuditLog`), Conformidade LGPD e Portabilidade sem lock-in.
- **CA5.** A seção de FAQ (`#faq`) deve renderizar 5 perguntas frequentes em formato de accordion. Ao clicar em uma pergunta ou pressionar `Enter`/`Space`, o conteúdo da resposta deve expandir/recolher e o atributo `aria-expanded` deve alternar corretamente entre `true` e `false`.
- **CA6.** Apenas um item do FAQ deve permanecer expandido por vez (comportamento accordion padrão), ou permitir alternância independente sem quebras de layout.
- **CA7.** Todos os blocos com valores monetários ou numéricos devem utilizar a classe `tabular-nums` (`font-mono`).
- **CA8.** No final da narrativa, deve existir um banner CTA de fechamento com botão que realiza scroll suave até `#lista-de-espera`.

---

## Casos de Erro e Limites

- Se JavaScript estiver desabilitado no navegador, as respostas do FAQ devem preferencialmente usar a tag nativa `<details>` e `<summary>` ou manter conteúdo acessível via CSS puro.
- Em telas compactas (< 640px), as grades de métricas e passos do ciclo devem se transformar em colunas únicas sem overflow horizontal.

---

## Segurança & Privacidade (LGPD)

- Nenhum dado do visitante é coletado ou transmitido nestas seções estáticas de apresentação.
- O texto da seção de segurança deve ser 100% verídico em relação à arquitetura real implementada nas Fases 1 a 4 do Tratto (sem prometer certificações ou recursos inexistentes).

---

## Acessibilidade (WCAG)

- Todas as seções possuem contrastes superiores a 4.5:1 para texto normal e 7:1 para texto principal.
- Accordion do FAQ operável via teclado com indicação clara de foco do navegador.

---

## Plano Técnico

- `src/components/problem-banner.tsx`: Refatoração e aprofundamento da seção de métricas de prejuízo e impacto financeiro.
- `src/components/how-it-works-section.tsx`: Componente dos 4 passos sequenciais do ciclo contratual.
- `src/components/audience-section.tsx`: Componente "Para quem é o Tratto" com exemplos de segmentos e dores resolvidas.
- `src/components/security-section.tsx`: Componente institucional de segurança, auditoria e LGPD.
- `src/components/faq-section.tsx`: Componente de FAQ interativo em accordion acessível.
- `src/components/pre-waitlist-cta.tsx`: Banner de transição e fechamento da narrativa que aponta para `#lista-de-espera`.
- `src/app/page.tsx`: Composição de todas as seções na ordem lógica da narrativa.
- `tests/unit/problem-banner.test.tsx`: Testes unitários das métricas e card de ROI.
- `tests/unit/how-it-works.test.tsx`: Testes unitários dos 4 passos do ciclo.
- `tests/unit/faq-section.test.tsx`: Testes de interação do accordion (clique, teclado, aria-expanded).

---

## Dependências Necessárias (Regra 10)

- Nenhuma dependência externa adicional necessária. Utilizaremos os componentes nativos de React 19, Tailwind CSS v4 e ícones leves de `lucide-react` (já instalados).
