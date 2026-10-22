# 0003. Formulário de Lista de Espera em 2 Etapas e Disparo de E-mail

- **Status:** implementada
- **Projeto:** landing page
- **Docs relacionados:** `docs/18-landing-page.md`, `docs/21-diretrizes-de-design-ui-ux.md`, `docs/17-lgpd-e-conformidade.md`, `specs/0001-setup-fundacao-landing-page.md`

## Objetivo

Capturar e qualificar potenciais clientes para o pré-lançamento da Tratto através de um formulário de lista de espera com revelação progressiva (*progressive disclosure*) em 2 etapas:
1. **Etapa 1 (Captura Imediata sem Fricção):** Coleta rápida do e-mail com consentimento LGPD explícito e salvamento instantâneo para garantir a conversão mesmo se o usuário sair em seguida.
2. **Etapa 2 (Qualificação Editorial Voluntária):** Coleta estruturada do perfil do interessado (segmento de atuação, volume mensal de contratos, ferramentas utilizadas e disponibilidade para entrevista de 20 minutos de validação de produto).

Apresentar feedback acolhedor no padrão artesanal *Sage Paper*, proteção nativa anti-spam via honeypot e persistência desacoplada com simulação resiliente de disparo transacional.

---

## Escopo

**Inclui:**
- Componente `<WaitlistSection />` ancorado na seção `#lista-de-espera`.
- **Etapa 1 (Captura Imediata + Perguntas Abertas Opcionais):**
  - Input de e-mail (obrigatório).
  - Checkbox de consentimento explícito com a LGPD / Política de Privacidade (obrigatório).
  - Campo opcional 1 (textarea): *"Quais são as suas maiores dores ou dificuldades com contratos no dia a dia da sua empresa?"*
  - Campo opcional 2 (textarea): *"O que não pode faltar na Tratto para ela ser perfeita para o seu negócio?"*
  - Botão de ação com feedback de carregamento.
- **Etapa 2 (Qualificação Estruturada Rápida):**
  - Card de qualificação voluntária que surge após a Etapa 1 com seleção rápida:
    - Segmento de atuação (Coworking, Advocacia, Academias, Escolas, Contabilidade, Outro);
    - Faixa de contratos por mês (`< 5`, `5-20`, `20-50`, `> 50`);
    - Ferramenta utilizada atualmente (Word, Google Docs, Sistema Próprio, Outro);
    - Opt-in para entrevista rápida de 20 minutos com o fundador.
  - Opção para concluir ou pular (*"Prefiro responder depois"*).
- **Estado de Confirmação:** Tela final de agradecimento e confirmação com microcópia polida, sem artifícios cafonas de IA.
- **Proteção Anti-Spam:** Campo honeypot oculto para descarte silencioso de bots automatizados e validação de schema Zod no servidor.
- **Persistência & Acesso aos Dados do Desenvolvedor:**
  - Persistência em banco de dados PostgreSQL serverless gerenciado via **Supabase** (tabela `waitlist_leads` com Row Level Security ativado).
  - Execução segura e isolada exclusivamente no servidor (Server Action) utilizando credenciais protegidas via variáveis de ambiente (`.env.local`), sem exposição de chaves sensíveis ao navegador.
  - Idempotência nativa via `upsert` baseado no e-mail: se o lead já foi capturado na Etapa 1, o preenchimento da Etapa 2 atualiza o mesmo registro sem duplicar linhas nem estourar erro de unicidade.
  - **Mecanismos de acesso para o dev:**
    - Visualização em tempo real e exportação para `.csv` / planilha em 1 clique diretamente pelo painel do Supabase (Table Editor).
    - Endpoint seguro administrativo opcional para exportação em CSV formatado com BOM UTF-8 via token secreto (`/api/admin/leads/export?token=...`).
    - Disparo de e-mail de notificação (quando configurado provedor transacional como Resend).
- **Disparo de E-mail (Notificação):** Serviço desacoplado de envio transacional (com logger/mock em ambiente de teste/dev e interface para API REST do Resend em produção).

**Não inclui (fica para depois):**
- Criação de credenciais de login ou autenticação no SaaS (a landing page é 100% estática e desacoplada).
- Pagamento, checkout ou planos de assinatura pagos (produtos em pré-lançamento).

---

## Requisitos

- **R1. Progressive Disclosure:** A submissão da Etapa 1 deve persistir o e-mail de imediato no armazenamento. Se o lead fechar a página ou ignorar a Etapa 2, seu e-mail já está garantido na lista.
- **R2. Identidade Visual Sage Paper (Doc 21):** O formulário deve utilizar fundo neutro de cartão (`#FFFFFF` com borda de 1px `#D2E0D6`), inputs com foco discreto no verde do tema, tipografia `Geist Sans` para labels e botões, e `Newsreader` itálico para os cabeçalhos. Zero gradientes neon, zero cantos `rounded-3xl` e zero sombras coloridas.
- **R3. Proteção Anti-Bot:** Implementar um campo honeypot invisível para humanos (`website` ou `empresa_hp`). Se preenchido, o servidor simula sucesso sem gravar nada.
- **R4. Validação Rigorosa (Zod):** E-mail com formato válido, sanitização de strings contra injeção e validação de enums nas opções de qualificação.
- **R5. Conformidade LGPD (Item 1 de docs/17):** Checkbox explícito de consentimento informando o uso do e-mail exclusivamente para comunicações sobre o pré-lançamento da Tratto e convite para testes.
- **R6. Resiliência de Notificação:** Falha no disparo do e-mail transacional nunca deve abortar o salvamento do lead no banco/storage.

---

## Critérios de Aceitação

- **CA1.** A seção `#lista-de-espera` deve renderizar o título editorial em `Newsreader`, subtítulo explicativo e o formulário inicial da Etapa 1 com input de e-mail, os dois campos de texto opcionais (dores atuais e sugestões de evolução), botão "Entrar na lista de espera" e checkbox de aceite LGPD.
- **CA2.** Se o usuário submeter a Etapa 1 com e-mail inválido ou sem marcar o checkbox de consentimento, mensagens de erro inline acessíveis devem ser exibidas sem disparar requisição ao servidor. Os campos de dores e sugestões permanecem opcionais.
- **CA3.** Ao preencher um e-mail válido, aceitar os termos (e opcionalmente preencher dores e sugestões), a Etapa 1 deve persistir o lead com status `lead_capturado` e transicionar suavemente a interface para a Etapa 2 de qualificação voluntária.
- **CA4.** Se o campo honeypot estiver preenchido por robô, o endpoint deve retornar status 200 de sucesso simulado, descartando a gravação de dados sujos.
- **CA5.** Ao preencher a Etapa 2 (segmento, volume, ferramenta e opt-in de entrevista) e clicar em "Concluir cadastro", o lead deve ser atualizado com os novos dados e a interface deve exibir a mensagem editorial de confirmação com sucesso.
- **CA6.** O usuário pode optar por pular a Etapa 2 ("Prefiro responder depois"), avançando diretamente para a tela de confirmação final mantendo o e-mail salvo.
- **CA7.** Caso o e-mail já tenha sido cadastrado anteriormente, o sistema deve tratar como idempotente e atualizar as respostas de qualificação, exibindo mensagem amigável ("Você já está na lista! Atualizamos suas preferências.") sem expor erro de chave única ou banco.
- **CA8.** Acessibilidade: Todos os campos possuem `<label>` associado, tags semânticas, suporte a navegação por teclado (`Tab`, `Space`, `Enter`) e atributos ARIA para anúncios de erro e carregamento (`aria-busy`, `aria-invalid`).

---

## Casos de Erro e Limites

- **E-mail com formato inválido:** Retorna erro inline `"Informe um endereço de e-mail válido."`
- **Consentimento desmarcado:** Exibe alerta inline `"É necessário concordar com os termos para continuar."`
- **Tentativas repetidas de envio:** Botão desabilitado durante o envio com feedback de carregamento (`aria-busy="true"`).
- **Falha de rede / Server Error:** Exibe mensagem educada `"Não foi possível concluir seu cadastro no momento. Por favor, tente novamente em instantes."`

---

## Segurança & Privacidade (LGPD & Banco de Dados)

- **Minimização de dados:** Apenas o e-mail e dados estritamente necessários para validação do produto são coletados.
- **Finalidade:** Notificação de lançamento e seleção de participantes para entrevistas de validação de produto.
- **Zero rastreadores invasivos:** Sem scripts de terceiros de publicidade ou cookies de perfilamento.
- **Proteção do Banco no Supabase (RLS):**
  - A tabela `waitlist_leads` terá Row Level Security (RLS) habilitado.
  - Apenas operações autenticadas via Server Action no servidor têm permissão de gravação/leitura. Nenhuma requisição anônima direta do navegador consegue consultar a lista de e-mails.
  - As chaves de acesso ao Supabase (`SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`) residem exclusivamente no arquivo `.env.local` e nas variáveis de ambiente da hospedagem, nunca no bundle exposto ao cliente.
- **DDL da Tabela no Supabase:**
  ```sql
  create table if not exists public.waitlist_leads (
    id uuid default gen_random_uuid() primary key,
    email text not null unique,
    consent boolean not null default true,
    pain_points text,
    suggestions text,
    segment text,
    contracts_volume text,
    current_tool text,
    interview_opt_in boolean default false,
    status text not null default 'lead_capturado',
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
  );

  -- Habilita Row Level Security
  alter table public.waitlist_leads enable row level security;

  -- Nenhuma consulta pública anônima é permitida
  -- O acesso é restrito ao servidor da aplicação via service_role ou Server Action protegida
  ```

---

## Plano Técnico

- `src/lib/waitlist-schema.ts`: Schemas Zod para Etapa 1 (`email`, `consent`, `painPoints`, `suggestions`, `honeypot`) e Etapa 2 (`segment`, `contractsVolume`, `currentTool`, `interviewOptIn`).
- `src/lib/supabase.ts`: Instanciação segura do cliente Supabase para execução exclusiva no servidor.
- `src/lib/waitlist-repository.ts`: Interface desacoplada e implementação Supabase do repositório de leads (`upsertLead`, `findLeadByEmail`). Permite injeção de repositório em memória para testes unitários sem chamadas externas.
- `src/lib/waitlist-service.ts`: Serviço orquestrador de regras de negócio (validação de bot via honeypot, normalização de e-mail, upsert de lead e acionamento de notificação resiliente).
- `src/lib/waitlist-notifier.ts`: Notificador transacional via API REST nativa do Resend para disparo de alertas por e-mail em background com templates *Sage Paper*.
- `src/app/actions/waitlist.ts`: Server Action do Next.js consumida pelo formulário (executa em ambiente Node/Serverless seguro).
- `src/components/waitlist-section.tsx`: Componente principal da seção com estados de transição (Etapa 1 $\rightarrow$ Etapa 2 $\rightarrow$ Sucesso).
- `src/components/waitlist-contract-papers.tsx`: Composição de contratos estáticos de background em curva de Bézier invertida com marcadores reativos ao tema.
- `src/components/waitlist-form-step1.tsx` e `src/components/waitlist-form-step2.tsx`: Subcomponentes modulares e acessíveis.
- `src/components/waitlist-success.tsx`: Card de confirmação editorial com revelação progressiva e mensagem de conclusão.
- `tests/unit/waitlist-schema.test.ts`: Testes unitários do schema Zod e sanitização de dados.
- `tests/unit/waitlist-service.test.ts`: Testes unitários de regras de negócio, proteção contra bots (honeypot), persistência com repositório em memória e chamadas ao notificador.
- `tests/unit/waitlist-notifier.test.ts`: Testes unitários do envio resiliente de e-mails via Resend.
- `tests/unit/waitlist-section.test.tsx`: Testes de componentes (renderização, transições, estados de erro, acessibilidade e background de contratos).

---

## Dependências Necessárias (Regra 10)

- `zod`: Validador de esquemas tipados padrão no ecossistema TypeScript para garantir sanitização e validação segura dos dados no cliente e na Server Action.
- `@supabase/supabase-js`: SDK oficial e mantido pelo Supabase para comunicação com a API REST/Postgres do banco serverless gerenciado com tipagem TypeScript e alta confiabilidade em ambientes serverless. (A serem instalados após aprovação da spec).
