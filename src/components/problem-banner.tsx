"use client";

import React, { useState, useEffect } from "react";
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
  const [resetKey, setResetKey] = useState(0);
  const activeMetric = METRICS[activeMetricIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveMetricIndex((prev) => (prev + 1) % METRICS.length);
    }, 10000);

    return () => clearTimeout(timer);
  }, [activeMetricIndex, resetKey]);

  const handleSelectMetric = (index: number) => {
    setActiveMetricIndex(index);
    setResetKey((prev) => prev + 1);
  };

  const handlePrevMetric = () => {
    setActiveMetricIndex((prev) => (prev - 1 + METRICS.length) % METRICS.length);
    setResetKey((prev) => prev + 1);
  };

  const handleNextMetric = () => {
    setActiveMetricIndex((prev) => (prev + 1) % METRICS.length);
    setResetKey((prev) => prev + 1);
  };
  return (
    <section
      id="o-problema"
      data-dark-section="true"
      className="relative scroll-mt-20 sm:scroll-mt-24 z-20 bg-[var(--accent-primary)] text-white transition-colors duration-300 shadow-[0_-16px_36px_rgba(14,18,16,0.14),0_16px_36px_rgba(14,18,16,0.14)] border-y border-white/15 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* ========================================================= */}
        {/* PARTE 1: O MANIFESTO TRATTO */}
        {/* ========================================================= */}
        <div className="w-full text-left">
          {/* Header do Manifesto */}
          <div className="pb-2">
            <h2 className="font-serif text-4xl min-[712px]:text-5xl italic font-semibold text-white leading-tight tracking-tight text-center min-[712px]:text-left">
              O Manifesto Tratto
            </h2>
          </div>

          {/* Card com o manifesto em formato editorial e tipografia Newsreader completa */}
          <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-6 sm:p-9 backdrop-blur-xs text-white/95 shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
            <div className="space-y-5 font-serif italic text-base sm:text-lg leading-relaxed text-white/95">
              <p>
                &ldquo;A Tratto nasceu de uma vivência real nos bastidores de escritórios e empresas de serviços. Vimos de perto o desgaste e a insegurança de gerenciar acordos contratuais no improviso: documentos preenchidos à mão, arquivos salvos por cima de modelos originais, dados trocados entre clientes e vias assinadas perdidas em caixas de e-mail. Além de soluções paleativas que mais atrapalham do que ajudam no dia a dia das empresas, como uma planilha com macros, por exemplo.
              </p>

              <p>
                Ao pesquisar a fundo esse cenário no Brasil, encontramos um espaço evidente: a carência de uma solução nacional, ágil e acessível, desenhada especificamente para a realidade de micro e pequenas empresas que precisam de governança jurídica sem a burocracia pesada de grandes departamentos corporativos.
              </p>

              <p>
                A <strong className="text-white font-semibold not-italic">Tratto</strong> surge exatamente para preencher essa lacuna: uma plataforma onde sua empresa aproveita seus próprios modelos de documentos, gera contratos sem erros em menos de dois minutos e blinda sua receita com controle automático de vigência e reajustes por índices oficiais.&rdquo;
              </p>
            </div>
          </div>

          {/* Gancho para as Métricas e o Mercado */}
          <div className="mt-14 text-left">
            <h3 className="font-serif text-2xl sm:text-4xl italic font-semibold text-white leading-snug">
              O custo invisível de gerenciar contratos no improviso...
            </h3>
            <p className="mt-4 text-base sm:text-lg text-white/85 leading-relaxed">
              O que parecia ser uma dor pontual, na verdade é uma vulnerabilidade compartilhada por empresas de todos os portes e segmentos. Se a sua empresa elabora e gerencia contratos, ela está suscetível a perdas silenciosas se não houver governança. Os números a seguir traduzem com clareza o tamanho desse impacto:
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PARTE 2: PAINEL DE MÉTRICAS (LISTA À ESQUERDA & DETALHE À DIREITA) */}
        {/* ========================================================= */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-12 gap-5 md:gap-6 items-center text-left">
          {/* Lado esquerdo: Lista de títulos minimalista no tablet/desktop (hidden sm:flex sm:col-span-5 md:col-span-4) */}
          <div
            className="hidden sm:flex flex-col gap-4 sm:col-span-5 md:col-span-4"
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
                  onClick={() => handleSelectMetric(idx)}
                  className={clsx(
                    "group relative flex flex-col items-start text-left transition-all duration-300 ease-out cursor-pointer py-1 bg-transparent border-none focus:outline-hidden",
                    isSelected
                      ? "text-white font-semibold translate-x-3"
                      : "text-white/60 font-normal hover:text-white/85 translate-x-0"
                  )}
                >
                  <span className="text-base sm:text-lg tracking-tight">
                    {metric.title}
                  </span>

                  {/* Barra de progresso animada de 10 segundos abaixo da opção ativa */}
                  {isSelected && (
                    <div className="relative mt-2 h-0.5 w-full max-w-[200px] overflow-hidden rounded-full bg-white/20">
                      <div
                        key={`progress-${metric.id}-${resetKey}`}
                        className="h-full bg-white rounded-full animate-metric-progress"
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Lado direito: Detalhe da métrica selecionada (com navegação Story no mobile e painel no tablet/desktop) */}
          <div
            role="tabpanel"
            className="col-span-12 sm:col-span-7 md:col-span-8 rounded-2xl border border-white/20 bg-white/10 px-5 py-5 sm:px-8 md:px-10 backdrop-blur-xs flex flex-col justify-between sm:justify-center min-h-[280px] sm:min-h-[250px] sm:h-[250px] shadow-[0_12px_32px_rgba(0,0,0,0.08)] overflow-hidden"
          >
            {/* Topo Mobile: 5 Barras Segmentadas (estilo Stories) */}
            <div
              className="sm:hidden grid grid-cols-5 gap-1.5"
              role="group"
              aria-label="Indicadores das métricas mobile"
            >
              {METRICS.map((metric, idx) => {
                const isSelected = activeMetricIndex === idx;
                const isPast = idx < activeMetricIndex;
                return (
                  <button
                    key={`story-seg-${metric.id}`}
                    type="button"
                    onClick={() => handleSelectMetric(idx)}
                    aria-label={`Métrica ${idx + 1}: ${metric.title}`}
                    className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/20 focus:outline-hidden cursor-pointer"
                  >
                    {isPast && <div className="h-full w-full bg-white rounded-full" />}
                    {isSelected && (
                      <div
                        key={`mobile-progress-${metric.id}-${resetKey}`}
                        className="h-full bg-white rounded-full animate-metric-progress"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Cabeçalho Mobile: Título da Métrica + Navegação ‹ › */}
            <div className="sm:hidden mt-3 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-white/80 font-semibold">
                {activeMetric.title}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevMetric}
                  aria-label="Métrica anterior"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer text-base leading-none"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={handleNextMetric}
                  aria-label="Próxima métrica"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer text-base leading-none"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Conteúdo com Fade-in: Número em destaque e texto descritivo */}
            <div
              key={activeMetric.id}
              className="animate-metric-fade-in flex flex-col justify-center my-auto py-2 sm:py-0"
            >
              <div className="font-mono text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white tabular-nums">
                {activeMetric.stat}
              </div>

              <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-white/90 leading-relaxed">
                {activeMetric.description}
              </p>
            </div>

            {/* Rodapé Mobile: Indicador de métrica atual */}
            <div className="sm:hidden pt-2.5 mt-2 border-t border-white/10 flex items-center justify-center text-[11px] font-mono text-white/60">
              <span>{activeMetricIndex + 1} de {METRICS.length}</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PARTE 3: CARD DE IMPACTO FINANCEIRO NO IMPROVISO (ALERTA VERMELHO) */}
        {/* ========================================================= */}
        <div className="mt-10 rounded-2xl border border-rose-400/35 bg-rose-950/30 p-6 sm:p-8 text-left shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
          {/* Título sem linha abaixo */}
          <div>
            <h4 className="text-xl sm:text-2xl font-serif italic font-semibold text-rose-100 leading-snug">
              Considerando uma empresa com um faturamento médio de R$ 12.000,00 / mês...
            </h4>
          </div>

          {/* Destaque dos valores e métricas sem background e sem bordas */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-rose-300 font-medium">
                Prejuízo direto estimado
              </span>
              <div className="font-mono text-3xl sm:text-4xl font-bold text-rose-200 mt-1 tabular-nums">
                -R$ 17.280,00 <span className="text-lg font-normal text-rose-300/80">/ ano</span>
              </div>
            </div>
            <div className="sm:text-right">
              <span className="font-mono text-xs uppercase tracking-wider text-rose-300 font-medium">
                Tempo desperdiçado
              </span>
              <div className="font-mono text-3xl sm:text-4xl font-bold text-rose-200 mt-1 tabular-nums">
                ~200 horas <span className="text-lg font-normal text-rose-300/80">/ ano</span>
              </div>
            </div>
          </div>

          {/* Lista limpa de perdas reais (sem caixinhas, formato de lista) */}
          <ul className="mt-6 space-y-3 text-sm sm:text-base text-white/90">
            <li className="flex items-start gap-3">
              <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
              <span>
                <strong>Reajustes de inflação não cobrados:</strong>{" "}
                <strong>-R$ 6.480,00 / ano</strong> esquecidos ao não aplicar IPCA/IGP-M na data base de aniversário.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
              <span>
                <strong>Descontos informais sem aprovação:</strong>{" "}
                <strong>-R$ 7.200,00 / ano</strong> em concessões concedidas pela equipe comercial sem fluxo formal de aprovação.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
              <span>
                <strong>Cancelamentos sem aviso prévio:</strong>{" "}
                <strong>-R$ 3.600,00 / ano</strong> perdidos por demorar a perceber rescisões sem retenção da última mensalidade.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
              <span>
                <strong>Horas do sócio/equipe no braço:</strong>{" "}
                <strong>~200 horas anuais</strong> gastas gerando, corrigindo e reenviando minutas manualmente.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
              <span>
                <strong>Insegurança jurídica e passivo oculto:</strong> Vias perdidas em pastas locais, sem assinatura válida ou com dados trocados de clientes anteriores, inviabilizando cobrança executiva em caso de inadimplência.
              </span>
            </li>
          </ul>

          {/* Observação final como texto simples em branco na fonte padrão */}
          <p className="mt-6 text-base sm:text-lg text-white/90 leading-relaxed">
            Para uma empresa com essa carteira, isso equivale a perder{" "}
            <strong className="text-white font-semibold">
              mais de 1 mês inteiro de faturamento anual
            </strong>{" "}
            apenas com falhas operacionais e desatenção de prazos.
          </p>
        </div>
      </div>
    </section>
  );
}
