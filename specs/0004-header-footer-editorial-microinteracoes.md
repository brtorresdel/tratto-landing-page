# 0004. Header Global, Footer Editorial e Micro-interações do Site

- **Status:** implementada
- **Projeto:** landing page
- **Docs relacionados:** `docs/18-landing-page.md`, `docs/21-diretrizes-de-design-ui-ux.md`, `docs/17-lgpd-e-conformidade.md`, `specs/0001-setup-fundacao-landing-page.md`

---

## Objetivo

Transformar a barra de navegação superior (`<Navbar />`) e o rodapé (`<Footer />`) em componentes editoriais definitivos no padrão *Sage Paper*, adicionando menu responsivo para dispositivos móveis, realce dinâmico da seção visível (*scroll spy*), link acessível de salto de conteúdo (*skip to content*) e micro-interações táteis consistentes em todo o site.

---

## Escopo

**Inclui:**

1. **Header Global (`<Navbar />`):**
   - **Menu Desktop:** Barra flutuante em pílula com vidro fosco suave (`backdrop-blur-md bg-white/80`), logotipo oficial (The Executive T) com link para o topo, links de navegação (`Como funciona`, `Segmentos`, `Segurança`, `Dúvidas`) e botão de ação ("Entrar na lista →" com rolagem suave para `#lista-de-espera`).
   - **Menu Mobile / Gaveta Acessível:** Botão de alternância (hambúrguer / fechar) visível em telas `< 768px`. Ao abrir, exibe gaveta/menu suspenso suave com todos os links de navegação e botão de ação, com fechamento automático ao clicar em qualquer item, ao pressionar `Escape` ou clicar fora.
   - **Scroll Spy (Indicador de Seção Ativa):** Observador de interseção (`IntersectionObserver`) que destaca sutilmente o link da seção atualmente em foco na tela durante a navegação.
   - **Acessibilidade:** Link oculto para pular para o conteúdo principal (*"Pular para o conteúdo principal"* / *skip link*), visível apenas no foco do teclado (`Tab`).

2. **Footer Editorial Definitivo (`<Footer />`):**
   - Estilização no padrão de superfície pastel sólido dos cards do Hero (`bg-[var(--accent-surface)] text-[var(--text-main)]`), com borda sutil superior (`border-t border-[var(--border-subtle)]`) e elevação sombreada projetada para cima (`shadow-[0_-16px_36px_rgba(14,18,16,0.14)]`).
   - **Organização em 3 Colunas Editoriais:**
     - **Coluna 1 (Identidade & Síntese):** Logotipo oficial ampliado e centralizado (`<TrattoWordmark />` com hover de elevação suave), acompanhado do slogan editorial (*"A forma mais simples de gerar, organizar e acompanhar contratos a partir dos seus próprios modelos."*).
     - **Coluna 2 (Sobre a Tratto):** Links rápidos e uniformes para as seções da página com offset correto de rolagem (`Carta do Dev`, `Como funciona`, `Segmentos`, `Segurança`, `Dúvidas`, `Lista de espera`).
     - **Coluna 3 (Criador):** Foto do criador (Bruno Torres) com borda na cor do tema ativo, descrição em duas linhas (*"Bruno Torres / Desenvolvedor Fullstack & / Criador da Tratto"*) e links diretos para Portfólio, LinkedIn e GitHub na horizontal com ícones `ArrowUpRight` animados no hover.
   - **Linha de Fechamento (Copyright & Status):**
     - Copyright dinâmico no formato: *"Tratto © {ano}. Todos os direitos reservados."*
     - Indicador sutil sem fundo *"Projeto em andamento"* com ponto verde pulsante (`bg-emerald-500 animate-pulse`).

3. **Micro-interações, Barra de Rolagem e Polimento Global:**
   - **Seletor de Temas Flutuante:** Botão ampliado de 48px com ícone de paleta de cores (`Palette`), abrindo popup vertical com círculos de cores pastéis ampliados (32px) e anel de destaque.
   - **Barra de Rolagem Personalizada e Reativa:** Largura de 14px com trilho 100% transparente, indicador em pílula na cor do tema ativo e alternância automática para branco suave ao passar por seções escuras (`ScrollbarThemeSync`).
   - **Compensação de Scroll:** Rolagem suave com compensação de altura do header fixo (`scroll-mt-20 sm:scroll-mt-24` em todas as seções principais) para evitar que o título da seção fique encoberto pela navbar.
   - Micro-estados táteis e consistentes para links e botões (escala `active:scale-[0.98]`, foco acessível `focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/40`).

**Não inclui (fica para depois):**
- Autenticação e telas internas de painel do SaaS (pertencem ao app principal Tratto).
- Páginas completas de blog / MDX (serão tratadas na Spec 0005).

---

## Requisitos

- **R1. Navegação Responsiva Completa:** A barra de navegação deve permitir acesso a todas as âncoras da página tanto em desktop (links horizontais) quanto em mobile/tablet (menu gaveta expansível acessível).
- **R2. Destaque da Seção Ativa (Scroll Spy):** O link correspondente à seção visível na viewport deve receber destaque visual sutil sem piscar ou recalcular layout de forma pesada.
- **R3. Pular para o Conteúdo (Acessibilidade WCAG 2.1):** Teclistas devem poder usar o primeiro `Tab` da página para focar um link "Pular para o conteúdo principal" que move o foco diretamente para `<main id="conteudo-principal">`.
- **R4. Rodapé Estruturado e Editorial:** O rodapé deve ser informativo, dividido em 4 colunas no desktop, empilhadas no mobile, sem perder a elegância e paleta suave.
- **R5. Modal ou Seção de Política de Privacidade:** Link de política de privacidade funcional exibindo os compromissos de proteção de dados conforme a LGPD.
- **R6. Zero Dependências Pesadas:** Não adicionar bibliotecas pesadas de animação ou UI; utilizar CSS nativo, Tailwind CSS e ícones do `lucide-react`.

---

## Critérios de Aceitação

- **CA1 (Navbar Desktop e Skip Link):**
  - Dado que o usuário carrega a página,
  - Quando navega via teclado (`Tab`),
  - Então o primeiro elemento focável deve ser o link "Pular para o conteúdo principal".
  - E os links de navegação da navbar devem estar visíveis e acessíveis no desktop.

- **CA2 (Menu Mobile Responsivo):**
  - Dado que o usuário acessa em tela móvel (`< 768px`),
  - Quando clica no botão do menu hambúrguer,
  - Então o menu mobile deve se abrir com `aria-expanded="true"`, exibindo os links de navegação.
  - E ao clicar em um link ou no botão fechar, o menu deve se fechar.

- **CA3 (Scroll Spy / Seção Ativa):**
  - Dado que a página possui seções (`#como-funciona`, `#segmentos`, etc.),
  - Quando o usuário rola até uma seção,
  - Então o link correspondente no menu deve refletir o estado ativo.

- **CA4 (Footer Editorial em 4 Colunas):**
  - Dado que o usuário visualiza o rodapé,
  - Então ele deve renderizar a marca Tratto, descrição editorial, links de navegação, transparência/LGPD e créditos do desenvolvedor.
  - E o ano de copyright deve ser o ano corrente do sistema.

- **CA5 (Scroll Offset e Compensação do Header):**
  - Dado que o usuário clica em qualquer link âncora (ex: `#faq`),
  - Então a navegação suave deve parar antes do topo para não cobrir o título da seção com o header flutuante.

---

## Casos de Erro e Limites

- **JavaScript Desabilitado:** Todos os links âncoras padrão (`href="#secao"`) continuam funcionando nativamente mesmo sem JavaScript.
- **Telas ultra-estreitas (320px):** O menu mobile e o rodapé reorganizam-se verticalmente sem gerar rolagem horizontal ou quebras de texto.
- **Teclado Escape:** Pressionar `Escape` fecha o menu mobile imediatamente caso esteja aberto.

---

## Segurança & Acessibilidade (LGPD / WCAG)

- **LGPD:** O rodapé inclui síntese clara do tratamento de dados pessoais da lista de espera e canal de contato para exercício de direitos dos titulares (Art. 18 da LGPD).
- **WCAG 2.1 AA:**
  - Contraste mínimo de 4.5:1 para todos os textos da navbar e do footer.
  - Atributos ARIA adequados (`aria-expanded`, `aria-label`, `role="banner"`, `role="contentinfo"`).
  - Foco visível preservado em todos os elementos interativos.

---

## Plano Técnico

- `src/components/navbar.tsx`: Refatoração da Navbar para incluir menu mobile com controle de estado, scroll spy via `IntersectionObserver` e `SkipToContent` link.
- `src/components/footer.tsx`: Refatoração do Footer para layout editorial de 4 colunas, modal/conteúdo de privacidade LGPD e créditos.
- `src/app/page.tsx`: Adição de `id="conteudo-principal"` no `<main>` para ancorar o skip link.
- `tests/unit/navbar.test.tsx`: Testes unitários do Navbar (renderização desktop, menu mobile, skip link e rolagem).
- `tests/unit/footer.test.tsx`: Testes unitários do Footer (colunas editoriais, links, ano dinâmico e créditos).

---

## Plano de Testes

| Critério | Tipo de teste | Descrição |
|---|---|---|
| CA1 | Unitário | Verifica renderização da navbar desktop e presença do skip link acessível |
| CA2 | Unitário | Testa abertura e fechamento do menu mobile e atualização de `aria-expanded` |
| CA3 | Unitário | Testa destaque visual e comportamento com scroll spy |
| CA4 | Unitário | Testa renderização das 4 colunas do footer e cálculo dinâmico do ano de copyright |
| CA5 | Unitário | Testa se as seções âncoras possuem classes de compensação de scroll (`scroll-mt-*`) |

---

## Dependências Necessárias (Regra 10)

- Nenhuma dependência externa nova necessária. Utiliza exclusivamente `lucide-react` (já instalado) e recursos nativos do React 19 / Next.js 15.
