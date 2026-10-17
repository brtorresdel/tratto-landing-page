"use client";

import React, { useState } from "react";
import clsx from "clsx";

export const METRICS = [
  {
    id: "reajustes-perdidos",
    title: "Reajustes perdidos",
    stat: "-12,4%",
    description:
      "quantidade de receita líquida perdida com contratos sem reajuste anual / mensal baseado em índices oficiais.",
  },
  {
    id: "tempo-desperdicado",
    title: "Tempo desperdiçado",
    stat: "4h",
    description:
      "tempo médio gasto diariamente que a operação gasta preenchendo contratos e caçando versões específicas assinadas na caixa de e-mail.",
  },
  {
    id: "vigencia-multas",
    title: "Vigência & multas",
    stat: "21 dias",
    description:
      "estimativa de tempo em que a operação demora para perceber um cancelamento sem cumprimento de aviso prévio.",
  },
  {
    id: "descontos-sem-controle",
    title: "Descontos sem controle",
    stat: "-15%",
    description:
      "perda de margem líquida com concessões informais de desconto pela equipe comercial sem fluxo formal de aprovação do supervisor.",
  },
  {
    id: "inseguranca-juridica",
    title: "Insegurança jurídica",
    stat: "18%",
    description:
      "contratos ativos em operação sem a via final formalmente assinada pelas partes ou com documentos perdidos em gavetas e e-mails soltos.",
  },
];

export function ProblemBanner() {
  const [activeMetricIndex, setActiveMetricIndex] = useState(0);
  const activeMetric = METRICS[activeMetricIndex];
  return (
    <section
      id="o-problema"
      className="relative z-20 bg-[var(--accent-primary)] text-white transition-colors duration-300 shadow-[0_-16px_36px_rgba(14,18,16,0.14),0_16px_36px_rgba(14,18,16,0.14)] border-y border-white/15 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* ========================================================= */}
        {/* PARTE 1: CARTA DO DEV */}
        {/* ========================================================= */}
        <div className="w-full text-left">
          {/* Header da Carta: Título centralizado no mobile (< 712px) e lado a lado a partir de 712px */}
          <div className="flex flex-col items-center justify-center text-center min-[712px]:flex-row min-[712px]:items-center min-[712px]:justify-between min-[712px]:text-left gap-4 pb-2">
            <h2 className="font-serif text-4xl min-[712px]:text-5xl italic font-semibold text-white leading-tight tracking-tight text-center min-[712px]:text-left whitespace-nowrap">
              Carta do Dev
            </h2>

            <div className="flex items-center gap-3.5 w-fit shrink-0">
              <img
                src="/bruno-torres.webp"
                alt="Foto de Bruno Torres"
                className="h-11 w-11 rounded-full object-cover border-2 border-white/40 shadow-sm shrink-0"
              />
              <div className="text-left">
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
          <div className="mt-14 text-left">
            <h3 className="font-serif text-2xl sm:text-4xl italic font-semibold text-white leading-snug">
              O custo invisível de gerenciar contratos no improviso...
            </h3>
            <p className="mt-4 text-base sm:text-lg text-white/85 leading-relaxed">
              O que pensei ser uma dor concentrada ou de empresa específica, na verdade se trata de uma dor que muitos lugares passam, independente de qual o segmento ou o tamanho da empresa. Se a sua empresa elabora e gerencia contratos, ela está suscetível a erros, se não for bem gerenciada. Acredito que números aqui expressem melhor o que estou querendo te dizer:
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PARTE 2: PAINEL DE MÉTRICAS (LISTA À ESQUERDA & DETALHE À DIREITA) */}
        {/* ========================================================= */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch text-left">
          {/* Lado esquerdo: Lista de títulos/métricas (col-span-5) */}
          <div
            className="flex flex-col gap-2.5 md:col-span-5"
            role="tablist"
            aria-label="Métricas de prejuízo na gestão de contratos"
          >
            {METRICS.map((metric, idx) => {
              const isSelected = activeMetricIndex === idx;
              return (
                <button
                  key={metric.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveMetricIndex(idx)}
                  className={clsx(
                    "group relative flex items-center justify-between rounded-xl px-5 py-4 text-left transition-all duration-200 cursor-pointer border",
                    isSelected
                      ? "border-white/40 bg-white/20 text-white font-semibold shadow-xs"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={clsx(
                        "h-2 w-2 rounded-full transition-colors",
                        isSelected
                          ? "bg-emerald-400 ring-4 ring-emerald-400/20"
                          : "bg-white/30 group-hover:bg-white/60"
                      )}
                    />
                    <span className="text-sm sm:text-base tracking-tight">
                      {metric.title}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold tabular-nums px-2.5 py-1 rounded bg-white/10 text-white/90">
                    {metric.stat}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Lado direito: Detalhe da métrica selecionada (col-span-7) */}
          <div
            role="tabpanel"
            className="md:col-span-7 rounded-2xl border border-white/20 bg-white/10 p-6 sm:p-10 backdrop-blur-xs flex flex-col justify-center min-h-[220px] transition-all shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-white/70">
                {activeMetric.title}
              </span>
              <span className="font-mono text-[11px] text-emerald-300 bg-emerald-950/40 border border-emerald-400/30 px-2 py-0.5 rounded">
                Impacto Operacional
              </span>
            </div>

            <div className="font-mono text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white tabular-nums">
              {activeMetric.stat}
            </div>

            <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed">
              {activeMetric.description}
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
