# GEMINI.md — Tratto (Landing Page)

Este arquivo dá contexto para qualquer assistente de IA (Gemini, Antigravity, Claude, etc.) que for trabalhar neste projeto. Leia este arquivo inteiro antes de sugerir qualquer coisa, e consulte os arquivos em `docs/` e `specs/`.

## O projeto em uma frase

A **Landing Page oficial e site de pré-lançamento do Tratto** — SaaS B2B genérico de criação e gestão do ciclo de vida de contratos para pequenas e médias empresas (PMEs) a partir de templates .docx.

## Quem sou eu (o desenvolvedor)

- Dev que trabalha com **Next.js + TypeScript** no dia a dia.
- Projeto pessoal, feito nas horas livres, com orçamento próximo de zero.
- Este projeto será parte do meu **portfólio público** no GitHub: a qualidade de código, tipagem estrita, acessibilidade e craft visual devem ser exemplares.
- Uso ferramentas de IA com limites de uso (Google AI Pro / Antigravity, Claude Code), então **economia de contexto importa**: prefira respostas objetivas e mudanças pequenas e focadas.
- O código é escrito em parceria com a IA, seguindo rigorosamente **SDD + TDD** (ADR 0006).

## Objetivos da Landing Page

1. **Pré-lançamento e Validação de Demanda:** Captar empresas interessadas em uma **lista de espera qualificada** em 2 etapas (*progressive disclosure*) e recrutar participantes para entrevistas de 20 minutos.
2. **Páginas por Segmento ("Template Camaleão"):** Explicar os mesmos recursos com foco nas dores de nichos específicos (`/coworking`, `/advocacia`, `/academias`, `/escolas`, `/contabilidade`).
3. **Caderno Editorial:** Artigos de mercado e notas de lançamento (changelog) em `.mdx` versionados no repositório.
4. **Demonstração Tátil sem Vídeo:** Apresentar a "Minuta Viva" na Hero (variáveis preenchendo o contrato em tempo real).

## Identidade Visual Obrigatória: Sage Paper (Doc 21)

O Tratto rejeita categoricamente a estética clichê de IA ("Vibecoding SaaS 2024"). O design deve transmitir a sensação de um **instrumento de trabalho e papelaria fina artesanal**.

- **Canvas Principal (Sálvia Pastel):** `#EBF2ED`
- **Superfície de Cartões:** `#FFFFFF` com bordas finas de 1px (`#D2E0D6`)
- **Tinta Principal:** `#0E1210` (Preto nanquim — WCAG AAA)
- **Tinta Secundária:** `#526359` (Verde ardósia escuro)
- **Acento Primário:** `#24523B` (Verde floresta profundo para CTAs e botões principais)
- **Tipografia:**
  - `Geist Sans` para interface, títulos, botões e formulários.
  - `Geist Mono` com `tabular-nums` (`tnum`) obrigatório para valores monetários, datas e números.
  - `Newsreader` (serifada) para títulos editoriais, minutas e cláusulas jurídicas.
- **Regras Negativas Anti-IA:**
  - ZERO fundos escuros espaciais (`bg-black`), ZERO gradientes neon roxos/cianos.
  - ZERO sombras difusas coloridas ou efeitos de "glow" (brilho neon).
  - ZERO cantos excessivamente redondos (`rounded-3xl` em cartões). Usar `rounded-lg` (8px) e `rounded-md` (6px).
  - ZERO ícones em todas as palavras (evitar fadiga de ícones).
  - ZERO "bento grids" decorativos vazios.

## Processo de desenvolvimento: SDD + TDD

Vale para **qualquer parte** deste projeto.

1. **Sem spec aprovada, sem código.** Se eu pedir código e não houver spec aprovada em `specs/`, proponha a spec primeiro (template `specs/0000-template.md`) e espere minha aprovação.
2. **Testes antes da implementação**, derivados dos critérios de aceitação. Mostre que falham antes de implementar.
3. **Implemente o mínimo** para os testes passarem; depois refatore.
4. **Nunca altere, desative ou apague testes** para fazê-los passar sem minha aprovação explícita.
5. **Requisito mudou?** Atualize a spec antes do código.

## Regras de Segurança e Boas Práticas

1. **Segredos:** NUNCA comitar senhas, tokens ou chaves de API. Segredos só em `.env.local`.
2. **Formulário da Lista de Espera:** Proteção contra spam (honeypot / rate limit), validação rigorosa de entrada via Zod e consentimento explícito sob a LGPD.
3. **Dependências (Regra 10):** Antes de adicionar qualquer pacote novo, justifique o motivo e aguarde aprovação.
4. **Sem cookies invasivos:** Priorizar analytics sem cookies para respeitar a privacidade e simplificar conformidade com a LGPD.
