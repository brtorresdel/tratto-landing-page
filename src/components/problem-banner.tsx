import React from "react";

export function ProblemBanner() {
  return (
    <section
      id="como-funciona"
      className="relative z-20 bg-[var(--accent-primary)] text-white transition-colors duration-300 shadow-[0_-16px_36px_rgba(14,18,16,0.14),0_16px_36px_rgba(14,18,16,0.14)] border-y border-white/15 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-8 text-center">
        {/* Eyebrow / Chapéu Editorial */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-mono text-xs uppercase tracking-widest text-white/90 backdrop-blur-xs border border-white/20">
          <span>●</span>
          <span>O Problema Real</span>
        </div>

        {/* Título Principal da Faixa */}
        <h2 className="mt-6 font-serif text-2xl sm:text-4xl lg:text-5xl italic font-semibold text-white leading-tight">
          O custo invisível de gerenciar contratos no improviso
        </h2>

        {/* Subtítulo explicativo */}
        <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed">
          Pequenas e médias empresas perdem receita e tempo precioso todos os meses por falta de automação em reajustes, vigências esquecidas e versões desencontradas de arquivos.
        </p>

        {/* Grade de Métricas e Dores (Esqueleto para calibrarmos) */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 text-left">
          {/* Métrica 1 */}
          <div className="rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-xs transition hover:bg-white/15">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/70">
              Reajustes Perdidos
            </span>
            <div className="mt-2 font-mono text-3xl sm:text-4xl font-bold tracking-tight text-white tabular-nums">
              -12,4%
            </div>
            <p className="mt-2 text-xs sm:text-sm text-white/80 leading-snug">
              de receita líquida perdida ao esquecer de aplicar o reajuste anual pelo IPCA ou IGP-M.
            </p>
          </div>

          {/* Métrica 2 */}
          <div className="rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-xs transition hover:bg-white/15">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/70">
              Tempo Desperdiçado
            </span>
            <div className="mt-2 font-mono text-3xl sm:text-4xl font-bold tracking-tight text-white tabular-nums">
              4h / sem
            </div>
            <p className="mt-2 text-xs sm:text-sm text-white/80 leading-snug">
              gastas preenchendo contratos no Word e caçando onde está a via assinada pelo cliente.
            </p>
          </div>

          {/* Métrica 3 */}
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
      </div>
    </section>
  );
}
