import React from "react";

export function HeroChaosPapers() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none overflow-hidden"
    >
      <div className="relative mx-auto h-full max-w-7xl">
        {/* ========================================================= */}
        {/* CANTO INFERIOR ESQUERDO (PILHA DE ARQUIVOS DESORGANIZADOS) */}
        {/* ========================================================= */}

        {/* L1. DOCX em formato de Folha Vertical A4 (Base da pilha esquerda) */}
        <div className="pointer-events-auto absolute bottom-4 lg:bottom-8 left-1 lg:left-4 xl:left-8 hidden md:flex flex-col w-[260px] lg:w-[285px] min-h-[340px] lg:min-h-[370px] rotate-[-9deg] rounded-lg border border-[var(--border-subtle)] bg-[var(--accent-surface)]/45 p-4 shadow-[0_8px_24px_rgba(14,18,16,0.06)] backdrop-blur-xs transition-colors duration-300 z-10">
          {/* Canto dobrado da folha */}
          <div className="absolute top-0 right-0 h-6 w-6 rounded-bl-md border-b border-l border-[var(--border-subtle)] bg-white/80 shadow-2xs" />

          {/* Cabeçalho */}
          <div className="flex items-center gap-2 pb-2.5 border-b border-black/5 pr-6">
            <span className="rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-mono font-bold text-sky-800 shadow-2xs">
              .DOCX
            </span>
            <span className="truncate font-mono text-[11px] font-medium text-[var(--text-main)]">
              contrato_prestacao_v3_final_revisado.docx
            </span>
          </div>

          {/* Corpo do contrato vertical */}
          <div className="mt-3 flex-1 space-y-2">
            <div className="text-[10px] font-semibold text-neutral-800 tracking-wide">
              INSTRUMENTO PARTICULAR DE PRESTAÇÃO
            </div>
            <div className="h-1.5 w-full rounded bg-black/5" />
            <div className="h-1.5 w-11/12 rounded bg-black/5" />
            <div className="h-1.5 w-4/5 rounded bg-black/5" />

            <div className="pt-2">
              <span className="text-[9px] font-mono font-semibold text-neutral-600 uppercase">
                Cláusula 3ª — Do Preço
              </span>
              <div className="mt-1 flex items-center gap-1.5 rounded border border-rose-300/80 bg-white/90 px-2 py-1 text-[10px] font-mono text-rose-700 shadow-2xs">
                <span>⚠️</span>
                <span className="truncate font-bold">{"{{valor_antigo_errado}}"}</span>
              </div>
            </div>

            <div className="h-1.5 w-5/6 rounded bg-black/5" />
            <div className="h-1.5 w-3/4 rounded bg-black/5" />
            <div className="h-1.5 w-2/3 rounded bg-black/5" />
          </div>

          {/* Rodapé da folha */}
          <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between text-[10px]">
            <span className="text-[var(--text-muted)] font-mono">Pág. 1 de 6</span>
            <span className="font-semibold text-rose-700 bg-white/80 px-1.5 py-0.5 rounded shadow-2xs">
              Qual é a versão final?
            </span>
          </div>
        </div>

        {/* L2. Planilha XLSX com grade real (Sobrepondo o DOCX à direita) */}
        <div className="pointer-events-auto absolute bottom-8 lg:bottom-12 left-20 lg:left-32 xl:left-40 hidden md:block w-[280px] lg:w-[310px] rotate-[5deg] rounded-lg border border-[var(--border-subtle)] bg-[var(--accent-surface)]/50 shadow-[0_10px_28px_rgba(14,18,16,0.07)] backdrop-blur-xs transition-colors duration-300 z-20 overflow-hidden">
          {/* Barra de título Excel */}
          <div className="flex items-center justify-between bg-emerald-800/90 px-3 py-1.5 text-white">
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="font-bold bg-white/20 px-1 rounded text-[10px]">XLS</span>
              <span className="font-medium">vencimentos_2024.xlsx</span>
            </div>
            <span className="text-[9px] text-emerald-100 font-mono">14:22</span>
          </div>

          {/* Tabela de Planilha */}
          <table className="w-full border-collapse text-left font-mono text-[10px] bg-white/60">
            <thead>
              <tr className="bg-black/5 text-neutral-700 border-b border-black/5 text-[9px]">
                <th className="py-1 px-2 border-r border-black/5 font-semibold">Cliente</th>
                <th className="py-1 px-2 border-r border-black/5 font-semibold">Vencimento</th>
                <th className="py-1 px-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              <tr>
                <td className="py-1 px-2 border-r border-black/5 font-medium text-neutral-800 truncate">Alpha Logística</td>
                <td className="py-1 px-2 border-r border-black/5 text-neutral-600 tabular-nums">15/10/24</td>
                <td className="py-1 px-2 text-rose-700 font-bold bg-white/80">Venceu ontem</td>
              </tr>
              <tr>
                <td className="py-1 px-2 border-r border-black/5 font-medium text-neutral-800 truncate">Prisma Consultoria</td>
                <td className="py-1 px-2 border-r border-black/5 text-neutral-600 tabular-nums">01/08/23</td>
                <td className="py-1 px-2 text-amber-800 font-bold bg-white/80">Sem reajuste 2a</td>
              </tr>
              <tr>
                <td className="py-1 px-2 border-r border-black/5 font-medium text-neutral-800 truncate">Apex Engenharia</td>
                <td className="py-1 px-2 border-r border-black/5 text-neutral-600 tabular-nums">30/11/24</td>
                <td className="py-1 px-2 text-neutral-600">Cadê via assinada?</td>
              </tr>
            </tbody>
          </table>

          {/* Abas inferiores */}
          <div className="flex items-center gap-1 bg-black/5 px-2 py-1 border-t border-black/5 text-[9px] font-mono text-neutral-600">
            <span className="bg-white/90 px-2 py-0.5 rounded-t border border-black/5 font-semibold text-emerald-800">Contratos_Ativos</span>
            <span className="px-1.5 py-0.5 text-neutral-500">Pendentes</span>
          </div>
        </div>

        {/* L3. Post-it de Alerta (Sobrepondo o topo dos documentos) */}
        <div className="pointer-events-auto absolute bottom-48 lg:bottom-56 left-6 lg:left-12 xl:left-16 hidden md:block w-[230px] lg:w-[250px] rotate-[-4deg] rounded-lg border border-[var(--border-subtle)] bg-[var(--accent-surface)]/60 p-3.5 shadow-[0_8px_20px_rgba(14,18,16,0.06)] backdrop-blur-xs transition-colors duration-300 z-30">
          {/* Fita adesiva translúcida no topo */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-3.5 w-14 rotate-[-1deg] rounded-[1px] bg-white/80 border border-black/5 shadow-2xs" />

          <div className="flex items-center justify-between text-[10px] font-mono text-amber-950 pb-1 border-b border-black/5">
            <span className="font-bold">⚡ URGENTE</span>
            <span className="text-[9px] text-amber-800">às 17:48</span>
          </div>

          <p className="mt-2 font-serif italic text-xs leading-relaxed text-[#78350F]">
            “Cliente pediu pra tirar multa por atraso! Pode autorizar antes das 18h?”
          </p>

          <div className="mt-2.5 pt-1.5 border-t border-black/5 flex items-center justify-between text-[9px] font-mono text-amber-950">
            <span className="text-amber-800">Sem aprovação formal</span>
            <span className="font-bold text-rose-700 bg-white/90 px-1 rounded shadow-2xs">Risco jurídico</span>
          </div>
        </div>

        {/* L4. Notificação de rescisão (Apoiada na base da pilha) */}
        <div className="pointer-events-auto absolute bottom-0 lg:bottom-2 left-32 lg:left-52 xl:left-64 hidden md:block w-[220px] lg:w-[250px] rotate-[8deg] rounded-lg border border-[var(--border-subtle)] bg-[var(--accent-surface)]/45 p-3 shadow-[0_8px_20px_rgba(14,18,16,0.06)] backdrop-blur-xs transition-colors duration-300 z-20">
          <div className="flex items-center justify-between pb-1.5 border-b border-black/5 text-[10px] font-mono">
            <span className="text-rose-700 font-bold truncate">notificacao_rescisao_atrasada.pdf</span>
          </div>
          <p className="mt-1.5 text-[10px] text-[var(--text-muted)] leading-snug">
            Aviso prévio não calculado. Cliente encerrou sem pagar 30 dias de multa.
          </p>
          <div className="mt-2 rounded bg-white/80 px-2 py-1 text-[10px] font-mono text-rose-800 flex justify-between items-center shadow-2xs">
            <span>Prejuízo direto:</span>
            <strong className="font-bold text-rose-900">-R$ 2.400,00</strong>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CANTO INFERIOR DIREITO (PILHA DE ARQUIVOS DESORGANIZADOS) */}
        {/* ========================================================= */}

        {/* R1. PDF em formato de Folha Vertical A4 (Base da pilha direita) */}
        <div className="pointer-events-auto absolute bottom-4 lg:bottom-8 right-1 lg:right-4 xl:right-8 hidden md:flex flex-col w-[260px] lg:w-[285px] min-h-[340px] lg:min-h-[370px] rotate-[8deg] rounded-lg border border-[var(--border-subtle)] bg-[var(--accent-surface)]/45 p-4 shadow-[0_8px_24px_rgba(14,18,16,0.06)] backdrop-blur-xs transition-colors duration-300 z-10">
          {/* Clipe metálico desenhado no topo esquerdo */}
          <div className="absolute -top-3 left-6 h-7 w-3 rounded-full border-2 border-neutral-400 bg-neutral-200/90 shadow-2xs z-30" />

          {/* Cabeçalho do PDF */}
          <div className="flex items-center justify-between pb-2.5 border-b border-black/5 pl-4">
            <span className="rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-mono font-bold text-rose-800 shadow-2xs">
              .PDF
            </span>
            <span className="truncate font-mono text-[11px] font-medium text-[var(--text-main)]">
              termo_adesao_pendente.pdf
            </span>
          </div>

          {/* Linhas simuladas de contrato */}
          <div className="mt-3 flex-1 space-y-2">
            <div className="h-1.5 w-full rounded bg-black/5" />
            <div className="h-1.5 w-11/12 rounded bg-black/5" />
            <div className="h-1.5 w-4/5 rounded bg-black/5" />

            {/* Carimbo de assinatura pendente */}
            <div className="mt-3 rounded border-2 border-dashed border-rose-400/80 bg-white/90 p-2 text-center rotate-[-2deg] shadow-2xs">
              <p className="font-mono text-[9px] text-rose-900 uppercase tracking-wider font-bold">
                ⚠️ AGUARDANDO ASSINATURA
              </p>
              <p className="text-[9px] text-rose-700 font-semibold mt-0.5">há 21 dias no e-mail</p>
            </div>

            <div className="pt-2 space-y-1 text-[9px] font-mono text-neutral-600">
              <div className="flex justify-between">
                <span>Contratante:</span>
                <span className="text-emerald-700 font-bold">✓ Assinado</span>
              </div>
              <div className="flex justify-between">
                <span>Contratada:</span>
                <span className="text-rose-700 font-bold underline">X PENDENTE</span>
              </div>
            </div>
          </div>

          {/* Rodapé da folha */}
          <div className="mt-3 pt-2 border-t border-black/5 text-[9px] font-mono text-neutral-500 flex justify-between">
            <span>Via não finalizada</span>
            <span className="text-rose-700 font-medium">Sem validade jurídica</span>
          </div>
        </div>

        {/* R2. E-mail com anexo desencontrado (Sobrepondo o PDF à esquerda) */}
        <div className="pointer-events-auto absolute bottom-8 lg:bottom-12 right-20 lg:right-32 xl:right-40 hidden md:block w-[260px] lg:w-[280px] rotate-[-5deg] rounded-lg border border-[var(--border-subtle)] bg-[var(--accent-surface)]/50 p-3.5 shadow-[0_10px_28px_rgba(14,18,16,0.07)] backdrop-blur-xs transition-colors duration-300 z-20">
          <div className="flex items-center justify-between pb-2 border-b border-black/5 text-[11px] font-mono">
            <span className="font-bold text-neutral-800 truncate">re: minuta final do contrato</span>
            <span className="text-[10px] text-neutral-500">Ontem</span>
          </div>
          <p className="mt-2 text-[11px] text-neutral-700 leading-snug">
            “Segue em anexo a minuta aprovada... Ops, esqueci de anexar o arquivo .docx!”
          </p>
          <div className="mt-2.5 flex items-center justify-between pt-1.5 border-t border-black/5 text-[10px]">
            <span className="text-amber-900 font-bold bg-white/80 px-1.5 py-0.5 rounded shadow-2xs">3 versões desencontradas</span>
            <span className="text-neutral-500 font-mono">12 e-mails</span>
          </div>
        </div>

        {/* R3. Post-it de Reajuste Esquecido (Sobrepondo o topo dos documentos) */}
        <div className="pointer-events-auto absolute bottom-48 lg:bottom-56 right-6 lg:right-12 xl:right-16 hidden md:block w-[230px] lg:w-[260px] rotate-[6deg] rounded-lg border border-[var(--border-subtle)] bg-[var(--accent-surface)]/60 p-3.5 shadow-[0_8px_20px_rgba(14,18,16,0.06)] backdrop-blur-xs transition-colors duration-300 z-30">
          {/* Fita adesiva translúcida no topo */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-3.5 w-14 rotate-[-1deg] rounded-[1px] bg-white/80 border border-black/5 shadow-2xs" />

          <div className="flex items-center justify-between text-[10px] font-mono text-amber-950 pb-1.5 border-b border-black/5">
            <span className="font-bold">📌 LEMBRETE</span>
            <span className="text-[9px] text-amber-800 font-semibold">urgente</span>
          </div>

          <p className="mt-2 font-serif italic text-xs leading-relaxed text-[#78350F]">
            “Reajuste pelo IPCA venceu há 3 meses e ninguém cobrou o cliente!”
          </p>

          <div className="mt-2.5 flex items-center justify-between rounded bg-white/80 px-2 py-1 text-[10px] font-mono text-amber-950 shadow-2xs">
            <span>Perda acumulada:</span>
            <strong className="font-bold text-rose-700">-R$ 1.350,00</strong>
          </div>
        </div>

        {/* R4. Ficha de arquivo morto / papel físico (Apoiada na base da pilha) */}
        <div className="pointer-events-auto absolute bottom-0 lg:bottom-2 right-32 lg:right-52 xl:right-64 hidden md:block w-[220px] lg:w-[250px] rotate-[-7deg] rounded-lg border border-[var(--border-subtle)] bg-[var(--accent-surface)]/45 p-3 shadow-[0_8px_20px_rgba(14,18,16,0.06)] backdrop-blur-xs transition-colors duration-300 z-20">
          <div className="flex items-center gap-2 pb-1.5 border-b border-black/5">
            <span className="rounded bg-white/90 px-1.5 py-0.5 text-[9px] font-mono font-bold text-neutral-700 shadow-2xs">
              ARQUIVO
            </span>
            <span className="truncate font-mono text-[10px] text-[var(--text-muted)]">
              pasta_suspensa_arquivo_2023.scan
            </span>
          </div>
          <p className="mt-1.5 text-[10px] text-neutral-700 leading-snug">
            Contrato em papel físico guardado no arquivo da recepção. Ninguém acha a 2ª via assinada.
          </p>
          <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-rose-700 bg-white/80 px-2 py-1 rounded shadow-2xs">
            <span className="font-semibold">Via física perdida</span>
            <span>Sem cópia digital</span>
          </div>
        </div>
      </div>
    </div>
  );
}
