import React from "react";

export function HeroChaosPapers() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none overflow-hidden"
    >
      <div className="relative mx-auto h-full max-w-7xl">
        {/* 1. Top-Left: DOCX com versão confusa e variáveis quebradas */}
        <div className="pointer-events-auto absolute top-4 left-2 sm:left-4 lg:left-8 xl:left-12 hidden md:block max-w-[230px] lg:max-w-[260px] rotate-[-6deg] rounded-lg border border-[var(--border-subtle)] bg-white/95 p-3.5 shadow-[0_8px_24px_rgba(14,18,16,0.06)] backdrop-blur-xs transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-[0_16px_36px_rgba(14,18,16,0.12)] hover:z-30">
          {/* Dobrinha superior da folha */}
          <div className="absolute top-0 right-0 h-4 w-4 rounded-bl-sm border-b border-l border-[var(--border-subtle)] bg-[#FAF8ED]" />

          <div className="flex items-center gap-1.5 pb-2 border-b border-neutral-100">
            <span className="rounded bg-sky-50 px-1 py-0.5 text-[9px] font-mono font-bold text-sky-800">
              .DOCX
            </span>
            <span className="truncate font-mono text-[10px] text-[var(--text-muted)]">
              contrato_prestacao_v3_final_revisado.docx
            </span>
          </div>

          <div className="mt-2.5 space-y-1.5">
            <div className="h-1.5 w-11/12 rounded bg-neutral-100" />
            <div className="h-1.5 w-4/5 rounded bg-neutral-100" />
            <div className="flex items-center gap-1 text-[10px] font-mono text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
              <span>⚠️</span>
              <span className="truncate">{"{{valor_antigo_errado}}"}</span>
            </div>
            <div className="h-1.5 w-2/3 rounded bg-neutral-100" />
          </div>

          <div className="mt-2.5 pt-1.5 border-t border-neutral-100 flex items-center justify-between text-[9px]">
            <span className="text-[var(--text-muted)]">Salvo há 2 meses</span>
            <span className="font-medium text-rose-700 bg-rose-50 px-1 rounded">
              Qual é a versão final?
            </span>
          </div>
        </div>

        {/* 2. Top-Right: Post-it amarelo/linho de reajuste esquecido */}
        <div className="pointer-events-auto absolute top-6 right-2 sm:right-4 lg:right-8 xl:right-12 hidden md:block max-w-[220px] lg:max-w-[250px] rotate-[5deg] rounded-lg border border-[#FDE68A] bg-[#FEFCE8] p-3.5 shadow-[0_8px_24px_rgba(14,18,16,0.06)] transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-[0_16px_36px_rgba(14,18,16,0.12)] hover:z-30">
          {/* Fita adesiva translúcida no topo */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-3.5 w-14 rotate-[-1deg] rounded-[1px] bg-white/70 border border-amber-200/50 shadow-2xs" />

          <div className="flex items-center justify-between text-[10px] font-mono text-amber-900/80 pb-1.5 border-b border-amber-200/50">
            <span className="font-semibold">📌 LEMBRETE</span>
            <span className="text-[9px] text-amber-700">urgente</span>
          </div>

          <p className="mt-2 font-serif italic text-xs leading-relaxed text-[#78350F]">
            “Reajuste pelo IPCA venceu há 3 meses e ninguém cobrou o cliente!”
          </p>

          <div className="mt-2.5 flex items-center justify-between rounded bg-amber-100/70 px-2 py-1 text-[10px] font-mono text-amber-900">
            <span>Perda acumulada:</span>
            <strong className="font-semibold text-rose-700">-R$ 1.350,00</strong>
          </div>
        </div>

        {/* 3. Bottom-Left: Planilha caótica com contratos vencidos */}
        <div className="pointer-events-auto absolute bottom-4 left-3 sm:left-6 lg:left-10 xl:left-16 hidden md:block max-w-[240px] lg:max-w-[270px] rotate-[4deg] rounded-lg border border-[var(--border-subtle)] bg-white/95 p-3.5 shadow-[0_8px_24px_rgba(14,18,16,0.06)] backdrop-blur-xs transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-[0_16px_36px_rgba(14,18,16,0.12)] hover:z-30">
          <div className="flex items-center gap-1.5 pb-2 border-b border-neutral-100">
            <span className="rounded bg-emerald-50 px-1 py-0.5 text-[9px] font-mono font-bold text-emerald-800">
              .XLSX
            </span>
            <span className="font-mono text-[10px] text-[var(--text-muted)] truncate">
              vencimentos_2024.xlsx
            </span>
          </div>

          <div className="mt-2 space-y-1.5 text-[10px] font-mono">
            <div className="flex items-center justify-between rounded bg-neutral-50 px-1.5 py-1">
              <span className="truncate text-neutral-700">Nexo Coworking</span>
              <span className="rounded bg-rose-100 px-1 text-[9px] font-semibold text-rose-800">
                Venceu ontem
              </span>
            </div>
            <div className="flex items-center justify-between rounded bg-neutral-50 px-1.5 py-1">
              <span className="truncate text-neutral-700">Clínica Sanitas</span>
              <span className="rounded bg-amber-100 px-1 text-[9px] font-semibold text-amber-800">
                Sem reajuste 2a
              </span>
            </div>
            <div className="flex items-center justify-between rounded bg-neutral-50 px-1.5 py-1">
              <span className="truncate text-neutral-700">Studio Alfa</span>
              <span className="text-[9px] text-neutral-500">Cadê a via assinada?</span>
            </div>
          </div>
        </div>

        {/* 4. Bottom-Right: Minuta impressa aguardando assinatura */}
        <div className="pointer-events-auto absolute bottom-6 right-3 sm:right-6 lg:right-10 xl:right-16 hidden md:block max-w-[230px] lg:max-w-[260px] rotate-[-5deg] rounded-lg border border-[var(--border-subtle)] bg-white/95 p-3.5 shadow-[0_8px_24px_rgba(14,18,16,0.06)] backdrop-blur-xs transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-[0_16px_36px_rgba(14,18,16,0.12)] hover:z-30">
          {/* Clipe metálico desenhado no topo esquerdo */}
          <div className="absolute -top-2 left-4 h-5 w-2.5 rounded-full border-2 border-neutral-400 bg-neutral-200/80 shadow-2xs" />

          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <span className="rounded bg-neutral-100 px-1 py-0.5 text-[9px] font-mono text-neutral-700">
              .PDF
            </span>
            <span className="truncate font-mono text-[10px] text-[var(--text-muted)]">
              termo_adesao_pendente.pdf
            </span>
          </div>

          <div className="mt-2.5 space-y-1.5">
            <div className="h-1.5 w-full rounded bg-neutral-100" />
            <div className="h-1.5 w-5/6 rounded bg-neutral-100" />
            <div className="mt-2 rounded border border-dashed border-rose-300 bg-rose-50/50 p-2 text-center">
              <p className="font-mono text-[9px] text-rose-800 uppercase tracking-wider font-semibold">
                Aguardando Assinatura
              </p>
              <p className="text-[9px] text-rose-600 font-medium">há 21 dias no e-mail</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
