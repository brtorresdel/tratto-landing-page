# 0003. Formulário de Lista de Espera em 2 Etapas e Disparo de E-mail

- **Status:** rascunho (guardado para revisão após a Spec 0002)
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
- **Etapa 1:** Input de e-mail com tipografia editorial, botão de ação em Verde Floresta (`#24523B`), validação em tempo real e checkbox de consentimento da LGPD / Política de Privacidade.
- **Etapa 2:** Card de qualificação opcional que surge após a Etapa 1 com seleção de segmento (Coworking, Advocacia, Academias, Escolas, Contabilidade, Outro), faixa de contratos por mês (`< 5`, `5-20`, `20-50`, `> 50`), ferramenta atual (Word, Google Docs, Sistema Próprio, Outro) e opt-in para entrevista com o fundador.
- **Estado de Confirmação:** Tela final de agradecimento e confirmação com microcópia polida, sem artifícios cafonas de IA (sem confetes neon ou animações espalhafatosas).
- **Proteção Anti-Spam:** Campo honeypot oculto para descarte silencioso de bots automatizados e validação de schema Zod no servidor.
- **Persistência Desacoplada de Leads:** Adaptador de armazenamento com persistência local estruturada (arquivo JSON versionado ou storage local seguro).
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

- **CA1.** A seção `#lista-de-espera` deve renderizar o título editorial em `Newsreader`, subtítulo explicativo e o formulário inicial da Etapa 1 com input de e-mail, botão "Entrar na lista de espera" e checkbox de aceite LGPD.
- **CA2.** Se o usuário submeter a Etapa 1 com e-mail inválido ou sem marcar o checkbox de consentimento, mensagens de erro inline acessíveis devem ser exibidas sem disparar requisição ao servidor.
- **CA3.** Ao preencher um e-mail válido e marcar o consentimento, a Etapa 1 deve salvar o lead com status `lead_capturado` e transicionar suavemente a interface para a Etapa 2 de qualificação voluntária.
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

## Segurança & Privacidade (LGPD)

- **Minimização de dados:** Apenas o e-mail e dados estritamente necessários para validação do produto são coletados.
- **Finalidade:** Notificação de lançamento e seleção de participantes para entrevistas de validação de produto.
- **Zero rastreadores invasivos:** Sem scripts de terceiros de publicidade ou cookies de perfilamento.

---

## Plano Técnico

- `src/lib/waitlist-schema.ts`: Schemas Zod para Etapa 1 (`email`, `consent`, `honeypot`) e Etapa 2 (`segment`, `contractsVolume`, `currentTool`, `interviewOptIn`).
- `src/lib/waitlist-service.ts`: Camada de persistência desacoplada de leads (suporte a storage local seguro).
- `src/app/actions/waitlist.ts`: Server Action com validação no servidor, honeypot check e tratamento de erros.
- `src/components/waitlist-section.tsx`: Componente principal da seção com estados de transição (Etapa 1 $\rightarrow$ Etapa 2 $\rightarrow$ Sucesso).
- `src/components/waitlist-form-step1.tsx` e `src/components/waitlist-form-step2.tsx`: Subcomponentes modulares e acessíveis.
- `src/components/waitlist-success.tsx`: Card de confirmação editorial no tema ativo.
- `tests/unit/waitlist-schema.test.ts`: Testes unitários do schema Zod e proteção de validações.
- `tests/unit/waitlist-service.test.ts`: Testes unitários de persistência, duplicidade e proteção anti-bot.
- `tests/unit/waitlist-section.test.tsx`: Testes de componentes (renderização, transições, estados de erro e acessibilidade).

---

## Dependências Necessárias (Regra 10)

- `zod`: Validador de esquemas tipados amplamente estabelecido no ecossistema TypeScript para garantir sanitização e validação segura tanto no cliente quanto na Server Action. (A ser instalado após aprovação da spec).
