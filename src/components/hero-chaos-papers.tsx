import React from "react";

export function HeroChaosPapers() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none overflow-hidden"
    >
      <div className="relative mx-auto h-full max-w-7xl">
        {/* ========================================================= */}
        {/* LATERAL ESQUERDA (4 ARTEFATOS DESORGANIZADOS COM SOBREPOSIÇÃO) */}
        {/* ========================================================= */}

        {/* L1. Top-Left: DOCX com versão confusa e variáveis quebradas */}
        <div className="pointer-events-auto absolute top-28 lg:top-32 xl:top-36 left-2 lg:left-4 xl:left-8 hidden md:block max-w-[220px] lg:max-w-[250px] rotate-[-7deg] rounded-lg border border-[var(--border-subtle)] bg-white/95 p-3.5 shadow-[0_8px_24px_rgba(14,18,16,0.06)] backdrop-blur-xs transition-all duration-300 hover:rotate-0 hover:scale-105 hover:border-[var(--accent-primary)] hover:shadow-[0_16px_32px_var(--accent-surface)] hover:z-40 z-10">
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

        {/* L2. Mid-Top Left: Bilhete de alívio/pressão sobreposto a L1 */}
        <div className="pointer-events-auto absolute top-52 lg:top-56 xl:top-60 left-8 lg:left-14 xl:left-20 hidden md:block max-w-[210px] lg:max-w-[240px] rotate-[4deg] rounded-lg border border-[#FDE68A] bg-[#FEFCE8] p-3 shadow-[0_8px_20px_rgba(14,18,16,0.06)] transition-all duration-300 hover:rotate-0 hover:scale-105 hover:border-[var(--accent-primary)] hover:shadow-[0_16px_32px_var(--accent-surface)] hover:z-40 z-20">
          {/* Fita adesiva translúcida */}
          <div className="absolute -top-2 left-1/3 -translate-x-1/2 h-3.5 w-12 rotate-[-2deg] rounded-[1px] bg-white/70 border border-amber-200/50 shadow-2xs" />

          <div className="flex items-center justify-between text-[10px] font-mono text-amber-900/80 pb-1 border-b border-amber-200/50">
            <span className="font-semibold">⚡ URGENTE</span>
            <span className="text-[9px]">às 17:48</span>
          </div>

          <p className="mt-2 font-serif italic text-xs leading-relaxed text-[#78350F]">
            “Cliente pediu pra tirar multa por atraso! Pode autorizar antes das 18h?”
          </p>

          <div className="mt-2 pt-1.5 border-t border-amber-200/50 flex items-center justify-between text-[9px] font-mono text-amber-900">
            <span className="text-amber-700">Sem aprovação formal</span>
            <span className="font-semibold text-rose-700">Risco jurídico</span>
          </div>
        </div>

        {/* L3. Mid-Bottom Left: Planilha de Vencimentos em Caos */}
        <div className="pointer-events-auto absolute top-[360px] lg:top-[390px] xl:top-[420px] left-2 lg:left-6 xl:left-10 hidden md:block max-w-[230px] lg:max-w-[260px] rotate-[-4deg] rounded-lg border border-[var(--border-subtle)] bg-white/95 p-3.5 shadow-[0_8px_24px_rgba(14,18,16,0.06)] backdrop-blur-xs transition-all duration-300 hover:rotate-0 hover:scale-105 hover:border-[var(--accent-primary)] hover:shadow-[0_16px_32px_var(--accent-surface)] hover:z-40 z-10">
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

        {/* L4. Bottom-Left: Notificação de rescisão com multa perdida */}
        <div className="pointer-events-auto absolute top-[490px] lg:top-[530px] xl:top-[560px] left-8 lg:left-14 xl:left-20 hidden md:block max-w-[210px] lg:max-w-[240px] rotate-[6deg] rounded-lg border border-[var(--border-subtle)] bg-white/95 p-3 shadow-[0_8px_20px_rgba(14,18,16,0.06)] backdrop-blur-xs transition-all duration-300 hover:rotate-0 hover:scale-105 hover:border-[var(--accent-primary)] hover:shadow-[0_16px_32px_var(--accent-surface)] hover:z-40 z-20">
          <div className="flex items-center justify-between pb-1.5 border-b border-neutral-100 text-[10px] font-mono">
            <span className="text-rose-700 font-semibold truncate">notificacao_rescisao_atrasada.pdf</span>
          </div>
          <p className="mt-1.5 text-[10px] text-[var(--text-muted)] leading-snug">
            Aviso prévio não calculado. Cliente saiu sem pagar aviso de 30 dias.
          </p>
          <div className="mt-2 rounded bg-rose-50 px-2 py-1 text-[10px] font-mono text-rose-800 flex justify-between items-center">
            <span>Prejuízo:</span>
            <strong className="font-semibold">-R$ 2.400,00</strong>
          </div>
        </div>

        {/* ========================================================= */}
        {/* LATERAL DIREITA (4 ARTEFATOS DESORGANIZADOS COM SOBREPOSIÇÃO) */}
        {/* ========================================================= */}

        {/* R1. Top-Right: Post-it amarelo/linho de reajuste esquecido */}
        <div className="pointer-events-auto absolute top-28 lg:top-32 xl:top-36 right-2 lg:right-4 xl:right-8 hidden md:block max-w-[220px] lg:max-w-[250px] rotate-[6deg] rounded-lg border border-[#FDE68A] bg-[#FEFCE8] p-3.5 shadow-[0_8px_24px_rgba(14,18,16,0.06)] transition-all duration-300 hover:rotate-0 hover:scale-105 hover:border-[var(--accent-primary)] hover:shadow-[0_16px_32px_var(--accent-surface)] hover:z-40 z-10">
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

        {/* R2. Mid-Top Right: Minuta impressa aguardando assinatura (sobreposta a R1) */}
        <div className="pointer-events-auto absolute top-52 lg:top-56 xl:top-60 right-8 lg:right-14 xl:right-20 hidden md:block max-w-[220px] lg:max-w-[250px] rotate-[-5deg] rounded-lg border border-[var(--border-subtle)] bg-white/95 p-3.5 shadow-[0_8px_24px_rgba(14,18,16,0.06)] backdrop-blur-xs transition-all duration-300 hover:rotate-0 hover:scale-105 hover:border-[var(--accent-primary)] hover:shadow-[0_16px_32px_var(--accent-surface)] hover:z-40 z-20">
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

          <div className="mt-2 space-y-1.5">
            <div className="h-1.5 w-full rounded bg-neutral-100" />
            <div className="h-1.5 w-5/6 rounded bg-neutral-100" />
            <div className="mt-2 rounded border border-dashed border-rose-300 bg-rose-50/50 p-1.5 text-center">
              <p className="font-mono text-[9px] text-rose-800 uppercase tracking-wider font-semibold">
                Aguardando Assinatura
              </p>
              <p className="text-[9px] text-rose-600 font-medium">há 21 dias no e-mail</p>
            </div>
          </div>
        </div>

        {/* R3. Mid-Bottom Right: E-mail com anexo desencontrado */}
        <div className="pointer-events-auto absolute top-[360px] lg:top-[390px] xl:top-[420px] right-2 lg:right-6 xl:right-10 hidden md:block max-w-[230px] lg:max-w-[260px] rotate-[5deg] rounded-lg border border-[var(--border-subtle)] bg-white/95 p-3.5 shadow-[0_8px_24px_rgba(14,18,16,0.06)] backdrop-blur-xs transition-all duration-300 hover:rotate-0 hover:scale-105 hover:border-[var(--accent-primary)] hover:shadow-[0_16px_32px_var(--accent-surface)] hover:z-40 z-10">
          <div className="flex items-center justify-between pb-1.5 border-b border-neutral-100 text-[10px] font-mono">
            <span className="font-semibold text-neutral-800 truncate">re: minuta final do contrato</span>
            <span className="text-[9px] text-neutral-400">Ontem</span>
          </div>
          <p className="mt-2 text-[10px] text-neutral-600 leading-snug">
            “Segue em anexo a minuta aprovada... Ops, esqueci de anexar o arquivo .docx!”
          </p>
          <div className="mt-2 flex items-center justify-between pt-1 border-t border-neutral-100 text-[9px]">
            <span className="text-amber-800 font-medium bg-amber-50 px-1 rounded">3 versões desencontradas</span>
            <span className="text-neutral-400">Thread de 12 e-mails</span>
          </div>
        </div>

        {/* R4. Bottom-Right: Ficha de arquivo morto / papel físico */}
        <div className="pointer-events-auto absolute top-[490px] lg:top-[530px] xl:top-[560px] right-8 lg:right-14 xl:right-20 hidden md:block max-w-[210px] lg:max-w-[240px] rotate-[-6deg] rounded-lg border border-[var(--border-subtle)] bg-white/95 p-3 shadow-[0_8px_20px_rgba(14,18,16,0.06)] backdrop-blur-xs transition-all duration-300 hover:rotate-0 hover:scale-105 hover:border-[var(--accent-primary)] hover:shadow-[0_16px_32px_var(--accent-surface)] hover:z-40 z-20">
          <div className="flex items-center gap-1.5 pb-1.5 border-b border-neutral-100">
            <span className="rounded bg-neutral-200 px-1 py-0.5 text-[8px] font-mono font-bold text-neutral-700">
              ARQUIVO
            </span>
            <span className="truncate font-mono text-[9px] text-[var(--text-muted)]">
              pasta_suspensa_arquivo_2023.scan
            </span>
          </div>
          <p className="mt-1.5 text-[10px] text-neutral-600 leading-snug">
            Contrato em papel físico guardado no arquivo da recepção. Ninguém acha a 2ª via.
          </p>
          <div className="mt-2 flex items-center justify-between text-[9px] font-mono text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
            <span>Via física perdida</span>
            <span>Sem cópia digital</span>
          </div>
        </div>
      </div>
    </div>
  );
}
