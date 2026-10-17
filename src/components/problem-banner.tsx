import React from "react";

export function ProblemBanner() {
  return (
    <section
      id="o-problema"
      className="relative z-20 bg-[var(--accent-primary)] text-white transition-colors duration-300 shadow-[0_-16px_36px_rgba(14,18,16,0.14),0_16px_36px_rgba(14,18,16,0.14)] border-y border-white/15 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* ========================================================= */}
        {/* PARTE 1: CARTA DO DEV */}
        {/* ========================================================= */}
        <div className="mx-auto max-w-3xl text-left">
          {/* Header da Carta: Título "Carta do Dev" com a foto e identificação do autor no topo */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div>
              <h2 className="font-serif text-3xl sm:text-5xl italic font-semibold text-white leading-tight tracking-tight">
                Carta do Dev
              </h2>
            </div>

            <div className="flex items-center gap-3.5 w-fit">
              <img
                src="/bruno-torres.webp"
                alt="Foto de Bruno Torres"
                className="h-11 w-11 rounded-full object-cover border-2 border-white/40 shadow-sm shrink-0"
              />
              <div>
                <div className="font-semibold text-white text-sm sm:text-base tracking-tight leading-snug">
                  Bruno Torres
                </div>
                <div className="text-[11px] sm:text-xs text-white/75 font-mono">
                  Desenvolvedor Fullstack & Criador da Tratto
                </div>
              </div>
            </div>
          </div>

          {/* Card com a carta em formato editorial envolta em aspas e tipografia Newsreader completa */}
          <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-6 sm:p-9 backdrop-blur-xs text-white/95 shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
            <div className="space-y-5 font-serif italic text-base sm:text-lg leading-relaxed text-white/95">
              <p>
                &ldquo;Em duas das minhas maiores experiências profissionais antigas antes de me tornar oficialmente desenvolvedor, vivi momentos que beiravam o desespero quando o assunto era contrato. Não minto que, em algum momento, já cheguei até a chorar quando ouvia essa palavra.
              </p>

              <p>
                Em uma dessas experiências, os contratos eram gerados 100% na mão. Tínhamos um modelo guardado e, sempre que precisávamos gerar um novo documento para um cliente, era a mesma coisa: abrir o arquivo, trocar os dados &ldquo;no olho&rdquo;, salvar com outro nome para não sobrescrever o original, imprimir e vida que segue. O resultado, como já dá para imaginar: arquivo salvo por cima do modelo, documento perdido, dados trocados de clientes anteriores... um caos.
              </p>

              <p>
                Na outra empresa, até tínhamos uma alternativa &ldquo;semiautomática&rdquo;: uma planilha cheia de macros que gerava o documento. Mas, sendo bem honesto, uma planilha definitivamente não foi feita para isso, né? Além de ser offline, tínhamos problemas constantes de versões conflitantes e dores de cabeça para gerenciar tudo.
              </p>

              <p>
                Incomodado com isso, fui pesquisar a fundo para entender como esse calo aperta em outras empresas e segmentos. E, com esse levantamento, encontrei um verdadeiro espaço em branco no Brasil.
              </p>

              <p>
                Não que a ideia de automatizar contratos seja 100% inédita no planeta; mas uma solução nacional, simples, acessível e desenhada de verdade para a realidade de micro e pequenas empresas, na opinião deste que vos fala, simplesmente não existe. Bem, não existia.
              </p>

              <p>
                Para preencher essa lacuna, decidi criar a <strong className="text-white font-semibold not-italic">Tratto</strong>: uma plataforma onde você sobe seus próprios modelos de contrato em .docx com marcadores simples, gera documentos de forma rápida e sem erro de preenchimento e acompanha todo o ciclo de vigência e reajustes sem depender de planilhas.
              </p>

              <p>
                Essa ideia ainda está saindo do papel, mas já posso adiantar que, só de planejar a arquitetura e a identidade desse projeto, sinto que dei um abraço naquele Bruno do passado que passou por poucas e boas mexendo com esse tipo de documento...&rdquo;
              </p>
            </div>
          </div>

          {/* Gancho para as Métricas e o Mercado */}
          <div className="mt-14 text-center sm:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-white/70">
              O diagnóstico empírico
            </span>
            <h3 className="mt-2 font-serif text-2xl sm:text-4xl italic font-semibold text-white leading-snug">
              O custo invisível de gerenciar contratos no improviso
            </h3>
            <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl">
              Essa dor não era exclusividade minha. Conversando com dezenas de empresas de serviços, consultorias e gestores,
              percebi que a falta de um fluxo automatizado cobra um preço alto e silencioso todos os meses:
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PARTE 2: AS 3 MÉTRICAS DO PREJUÍZO INVISÍVEL */}
        {/* ========================================================= */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 text-left">
          {/* Métrica 1: Reajustes Perdidos */}
          <div className="rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-xs transition hover:bg-white/15">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/70">
              Reajustes Perdidos
            </span>
            <div className="mt-2 font-mono text-3xl sm:text-4xl font-bold tracking-tight text-white tabular-nums">
              -12,4%
            </div>
            <p className="mt-2 text-xs sm:text-sm text-white/80 leading-snug">
              de receita líquida perdida ao esquecer de aplicar o reajuste anual pelo IPCA ou IGP-M no mês correto.
            </p>
          </div>

          {/* Métrica 2: Tempo Desperdiçado */}
          <div className="rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-xs transition hover:bg-white/15">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/70">
              Tempo Desperdiçado
            </span>
            <div className="mt-2 font-mono text-3xl sm:text-4xl font-bold tracking-tight text-white tabular-nums">
              4h / sem
            </div>
            <p className="mt-2 text-xs sm:text-sm text-white/80 leading-snug">
              gastas preenchendo contratos no Word e caçando em caixas de e-mail qual era a versão final assinada.
            </p>
          </div>

          {/* Métrica 3: Vigência & Multas */}
          <div className="rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-xs transition hover:bg-white/15">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/70">
              Vigência & Multas
            </span>
            <div className="mt-2 font-mono text-3xl sm:text-4xl font-bold tracking-tight text-white tabular-nums">
              21 dias
            </div>
            <p className="mt-2 text-xs sm:text-sm text-white/80 leading-snug">
              de atraso médio para perceber que um cliente cancelou sem cumprir o aviso prévio contratual.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PARTE 3: CARD COMPARATIVO DE IMPACTO FINANCEIRO */}
        {/* ========================================================= */}
        <div className="mt-10 rounded-2xl border border-white/20 bg-black/20 p-6 sm:p-8 text-left">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/15">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-white/70">Simulação Real</span>
              <h4 className="text-lg sm:text-xl font-serif italic font-semibold text-white">
                Impacto Financeiro Anual
              </h4>
            </div>
            <span className="font-mono text-xs bg-white/15 px-2.5 py-1 rounded text-white/90">
              Base: Carteira com R$ 30.000,00 / mês
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coluna 1: No improviso */}
            <div className="rounded-xl border border-rose-400/30 bg-rose-950/20 p-5">
              <div className="flex items-center justify-between text-rose-300 font-semibold text-sm">
                <span>No improviso (planilhas e Word)</span>
                <span className="font-mono text-xs bg-rose-900/50 px-2 py-0.5 rounded">Risco Alto</span>
              </div>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>-R$ 16.200,00 / ano</strong> em reajustes de inflação não cobrados.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>~200 horas anuais</strong> gastas gerando e reenviando minutas manualmente.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Incerteza jurídica: vias perdidas em gavetas e clientes sem assinatura válida.</span>
                </li>
              </ul>
            </div>

            {/* Coluna 2: Com a Tratto */}
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-950/20 p-5">
              <div className="flex items-center justify-between text-emerald-300 font-semibold text-sm">
                <span>Com a Tratto</span>
                <span className="font-mono text-xs bg-emerald-900/50 px-2 py-0.5 rounded">Previsibilidade</span>
              </div>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>100% dos reajustes</strong> calculados e aplicados na data certa pelo Bacen.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Minutas geradas em &lt; 2 minutos</strong> diretamente dos seus templates .docx.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Linha do tempo auditável, assinatura integrada e controle em tempo real.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
