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

        {/* L1. Top-Left: DOCX em formato de Folha de Papel Vertical A4 */}
        <div className="pointer-events-auto absolute top-28 lg:top-32 xl:top-36 left-2 lg:left-4 xl:left-8 hidden md:flex flex-col w-[260px] lg:w-[290px] min-h-[350px] lg:min-h-[380px] rotate-[-7deg] rounded-lg border border-[var(--border-subtle)] bg-white p-4 shadow-[0_10px_28px_rgba(14,18,16,0.07)] transition-all duration-300 hover:rotate-0 hover:scale-105 hover:border-[var(--accent-primary)] hover:shadow-[0_20px_40px_var(--accent-surface)] hover:z-40 z-10">
          {/* Canto dobrado da folha de papel */}
          <div className="absolute top-0 right-0 h-6 w-6 rounded-bl-md border-b border-l border-[var(--border-subtle)] bg-[#FAF8ED] shadow-2xs" />

          {/* Cabeçalho do arquivo */}
          <div className="flex items-center gap-2 pb-2.5 border-b border-neutral-100 pr-6">
            <span className="rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-mono font-bold text-sky-800">
              .DOCX
            </span>
            <span className="truncate font-mono text-[11px] font-medium text-[var(--text-main)]">
              contrato_prestacao_v3_final_revisado.docx
            </span>
          </div>

          {/* Corpo do contrato em papel vertical */}
          <div className="mt-3 flex-1 space-y-2">
            <div className="text-[10px] font-semibold text-neutral-700 tracking-wide">
              INSTRUMENTO PARTICULAR DE PRESTAÇÃO
            </div>
            <div className="h-1.5 w-full rounded bg-neutral-200" />
            <div className="h-1.5 w-11/12 rounded bg-neutral-200" />
            <div className="h-1.5 w-4/5 rounded bg-neutral-200" />

            <div className="pt-2">
              <span className="text-[9px] font-mono font-semibold text-neutral-500 uppercase">
                Cláusula 3ª — Do Preço
              </span>
              <div className="mt-1 flex items-center gap-1.5 rounded border border-rose-300 bg-rose-50 px-2 py-1 text-[10px] font-mono text-rose-700">
                <span>⚠️</span>
                <span className="truncate font-bold">{"{{valor_antigo_errado}}"}</span>
              </div>
            </div>

            <div className="h-1.5 w-5/6 rounded bg-neutral-200" />
            <div className="h-1.5 w-3/4 rounded bg-neutral-200" />
            <div className="h-1.5 w-2/3 rounded bg-neutral-200" />
          </div>

          {/* Rodapé da folha */}
          <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px]">
            <span className="text-[var(--text-muted)] font-mono">Pág. 1 de 6</span>
            <span className="font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
              Qual é a versão final?
            </span>
          </div>
        </div>

        {/* L2. Mid-Top Left: Post-it amarelo sobreposto à parte inferior do DOCX */}
        <div className="pointer-events-auto absolute top-72 lg:top-80 xl:top-88 left-8 lg:left-14 xl:left-22 hidden md:block w-[240px] lg:w-[260px] rotate-[5deg] rounded-lg border border-[#FDE68A] bg-[#FEFCE8] p-4 shadow-[0_10px_24px_rgba(14,18,16,0.08)] transition-all duration-300 hover:rotate-0 hover:scale-105 hover:border-[var(--accent-primary)] hover:shadow-[0_20px_40px_var(--accent-surface)] hover:z-40 z-20">
          {/* Fita adesiva translúcida no topo */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-4 w-16 rotate-[-1deg] rounded-[1px] bg-white/75 border border-amber-200/60 shadow-2xs" />

          <div className="flex items-center justify-between text-[11px] font-mono text-amber-900 pb-1.5 border-b border-amber-200/60">
            <span className="font-bold">⚡ URGENTE</span>
            <span className="text-[10px] text-amber-700">às 17:48</span>
          </div>

          <p className="mt-2.5 font-serif italic text-sm leading-relaxed text-[#78350F]">
            “Cliente pediu pra tirar multa por atraso! Pode autorizar antes das 18h?”
          </p>

          <div className="mt-3 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[10px] font-mono text-amber-900">
            <span className="text-amber-700">Sem aprovação formal</span>
            <span className="font-bold text-rose-700 bg-rose-100/80 px-1.5 py-0.5 rounded">Risco jurídico</span>
          </div>
        </div>

        {/* L3. Mid-Bottom Left: Planilha com Grade Real de Células e Nomes Neutros */}
        <div className="pointer-events-auto absolute top-[470px] lg:top-[510px] xl:top-[540px] left-2 lg:left-6 xl:left-10 hidden md:block w-[280px] lg:w-[320px] rotate-[-4deg] rounded-lg border border-[var(--border-subtle)] bg-white shadow-[0_10px_28px_rgba(14,18,16,0.07)] transition-all duration-300 hover:rotate-0 hover:scale-105 hover:border-[var(--accent-primary)] hover:shadow-[0_20px_40px_var(--accent-surface)] hover:z-40 z-10 overflow-hidden">
          {/* Barra de título estilo Excel */}
          <div className="flex items-center justify-between bg-emerald-800 px-3 py-1.5 text-white">
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="font-bold bg-emerald-700 px-1 rounded text-[10px]">XLS</span>
              <span className="font-medium">vencimentos_2024.xlsx</span>
            </div>
            <span className="text-[9px] text-emerald-200 font-mono">Modificado: 14:22</span>
          </div>

          {/* Tabela de Planilha Real */}
          <table className="w-full border-collapse text-left font-mono text-[10px]">
            <thead>
              <tr className="bg-neutral-100 text-neutral-600 border-b border-neutral-200 text-[9px]">
                <th className="py-1 px-2 border-r border-neutral-200 font-semibold">Cliente</th>
                <th className="py-1 px-2 border-r border-neutral-200 font-semibold">Vencimento</th>
                <th className="py-1 px-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-150">
              <tr className="bg-white hover:bg-neutral-50">
                <td className="py-1.5 px-2 border-r border-neutral-200 font-medium text-neutral-800 truncate">Alpha Logística</td>
                <td className="py-1.5 px-2 border-r border-neutral-200 text-neutral-600 tabular-nums">15/10/24</td>
                <td className="py-1.5 px-2 text-rose-700 font-bold bg-rose-50">Venceu ontem</td>
              </tr>
              <tr className="bg-neutral-50/50 hover:bg-neutral-50">
                <td className="py-1.5 px-2 border-r border-neutral-200 font-medium text-neutral-800 truncate">Prisma Consultoria</td>
                <td className="py-1.5 px-2 border-r border-neutral-200 text-neutral-600 tabular-nums">01/08/23</td>
                <td className="py-1.5 px-2 text-amber-700 font-bold bg-amber-50">Sem reajuste 2a</td>
              </tr>
              <tr className="bg-white hover:bg-neutral-50">
                <td className="py-1.5 px-2 border-r border-neutral-200 font-medium text-neutral-800 truncate">Apex Engenharia</td>
                <td className="py-1.5 px-2 border-r border-neutral-200 text-neutral-600 tabular-nums">30/11/24</td>
                <td className="py-1.5 px-2 text-neutral-500">Cadê via assinada?</td>
              </tr>
              <tr className="bg-neutral-50/50 hover:bg-neutral-50">
                <td className="py-1.5 px-2 border-r border-neutral-200 font-medium text-neutral-800 truncate">Nova Era Serviços</td>
                <td className="py-1.5 px-2 border-r border-neutral-200 text-neutral-600 tabular-nums">10/05/24</td>
                <td className="py-1.5 px-2 text-rose-600 font-semibold">Sem renovação</td>
              </tr>
            </tbody>
          </table>

          {/* Abas inferiores de planilha */}
          <div className="flex items-center gap-1 bg-neutral-100 px-2 py-1 border-t border-neutral-200 text-[9px] font-mono text-neutral-600">
            <span className="bg-white px-2 py-0.5 rounded-t border border-neutral-300 font-semibold text-emerald-800">Contratos_Ativos</span>
            <span className="px-1.5 py-0.5 text-neutral-500">Pendentes</span>
            <span className="px-1 text-neutral-400">+</span>
          </div>
        </div>

        {/* L4. Bottom-Left: Notificação de rescisão sobreposta à planilha */}
        <div className="pointer-events-auto absolute top-[650px] lg:top-[690px] xl:top-[720px] left-8 lg:left-14 xl:left-20 hidden md:block w-[240px] lg:w-[270px] rotate-[6deg] rounded-lg border border-[var(--border-subtle)] bg-white p-3.5 shadow-[0_10px_24px_rgba(14,18,16,0.08)] transition-all duration-300 hover:rotate-0 hover:scale-105 hover:border-[var(--accent-primary)] hover:shadow-[0_20px_40px_var(--accent-surface)] hover:z-40 z-20">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100 text-[11px] font-mono">
            <span className="text-rose-700 font-bold truncate">notificacao_rescisao_atrasada.pdf</span>
          </div>
          <p className="mt-2 text-[11px] text-[var(--text-muted)] leading-snug">
            Aviso prévio não calculado. Cliente encerrou sem pagar os 30 dias de multa.
          </p>
          <div className="mt-2.5 rounded bg-rose-50 px-2 py-1 text-[11px] font-mono text-rose-800 flex justify-between items-center border border-rose-200">
            <span>Prejuízo direto:</span>
            <strong className="font-bold text-rose-900">-R$ 2.400,00</strong>
          </div>
        </div>

        {/* ========================================================= */}
        {/* LATERAL DIREITA (4 ARTEFATOS DESORGANIZADOS COM SOBREPOSIÇÃO) */}
        {/* ========================================================= */}

        {/* R1. Top-Right: Post-it amarelo/linho de reajuste esquecido */}
        <div className="pointer-events-auto absolute top-28 lg:top-32 xl:top-36 right-2 lg:right-4 xl:right-8 hidden md:block w-[240px] lg:w-[270px] rotate-[6deg] rounded-lg border border-[#FDE68A] bg-[#FEFCE8] p-4 shadow-[0_10px_28px_rgba(14,18,16,0.07)] transition-all duration-300 hover:rotate-0 hover:scale-105 hover:border-[var(--accent-primary)] hover:shadow-[0_20px_40px_var(--accent-surface)] hover:z-40 z-10">
          {/* Fita adesiva translúcida no topo */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-4 w-16 rotate-[-1deg] rounded-[1px] bg-white/75 border border-amber-200/60 shadow-2xs" />

          <div className="flex items-center justify-between text-[11px] font-mono text-amber-900 pb-1.5 border-b border-amber-200/60">
            <span className="font-bold">📌 LEMBRETE</span>
            <span className="text-[10px] text-amber-700 font-semibold">urgente</span>
          </div>

          <p className="mt-2.5 font-serif italic text-sm leading-relaxed text-[#78350F]">
            “Reajuste pelo IPCA venceu há 3 meses e ninguém cobrou o cliente!”
          </p>

          <div className="mt-3 flex items-center justify-between rounded bg-amber-100/80 px-2.5 py-1.5 text-[11px] font-mono text-amber-900">
            <span>Perda acumulada:</span>
            <strong className="font-bold text-rose-700">-R$ 1.350,00</strong>
          </div>
        </div>

        {/* R2. Mid-Top Right: PDF em formato de Folha de Papel Vertical A4 */}
        <div className="pointer-events-auto absolute top-64 lg:top-72 xl:top-80 right-8 lg:right-14 xl:right-22 hidden md:flex flex-col w-[260px] lg:w-[290px] min-h-[350px] lg:min-h-[380px] rotate-[-5deg] rounded-lg border border-[var(--border-subtle)] bg-white p-4 shadow-[0_10px_28px_rgba(14,18,16,0.08)] transition-all duration-300 hover:rotate-0 hover:scale-105 hover:border-[var(--accent-primary)] hover:shadow-[0_20px_40px_var(--accent-surface)] hover:z-40 z-20">
          {/* Clipe metálico desenhado no topo esquerdo */}
          <div className="absolute -top-3 left-6 h-7 w-3 rounded-full border-2 border-neutral-400 bg-neutral-200/90 shadow-2xs z-30" />

          {/* Cabeçalho do PDF */}
          <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100 pl-4">
            <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-mono font-bold text-rose-800">
              .PDF
            </span>
            <span className="truncate font-mono text-[11px] font-medium text-[var(--text-main)]">
              termo_adesao_pendente.pdf
            </span>
          </div>

          {/* Linhas simuladas de contrato */}
          <div className="mt-3 flex-1 space-y-2">
            <div className="h-1.5 w-full rounded bg-neutral-200" />
            <div className="h-1.5 w-11/12 rounded bg-neutral-200" />
            <div className="h-1.5 w-4/5 rounded bg-neutral-200" />

            {/* Carimbo de assinatura pendente */}
            <div className="mt-3 rounded border-2 border-dashed border-rose-400 bg-rose-50/80 p-2.5 text-center rotate-[-2deg]">
              <p className="font-mono text-[10px] text-rose-900 uppercase tracking-wider font-bold">
                ⚠️ AGUARDANDO ASSINATURA
              </p>
              <p className="text-[10px] text-rose-700 font-semibold mt-0.5">há 21 dias no e-mail</p>
            </div>

            <div className="pt-2 space-y-1 text-[9px] font-mono text-neutral-500">
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
          <div className="mt-3 pt-2 border-t border-neutral-100 text-[10px] font-mono text-neutral-400 flex justify-between">
            <span>Via não finalizada</span>
            <span className="text-rose-700 font-medium">Sem validade jurídica</span>
          </div>
        </div>

        {/* R3. Mid-Bottom Right: E-mail com anexo desencontrado */}
        <div className="pointer-events-auto absolute top-[470px] lg:top-[510px] xl:top-[540px] right-2 lg:right-6 xl:right-10 hidden md:block w-[260px] lg:max-w-[280px] rotate-[5deg] rounded-lg border border-[var(--border-subtle)] bg-white p-3.5 shadow-[0_10px_28px_rgba(14,18,16,0.07)] transition-all duration-300 hover:rotate-0 hover:scale-105 hover:border-[var(--accent-primary)] hover:shadow-[0_20px_40px_var(--accent-surface)] hover:z-40 z-10">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100 text-[11px] font-mono">
            <span className="font-bold text-neutral-800 truncate">re: minuta final do contrato</span>
            <span className="text-[10px] text-neutral-400">Ontem</span>
          </div>
          <p className="mt-2 text-[11px] text-neutral-700 leading-snug">
            “Segue em anexo a minuta aprovada... Ops, esqueci de anexar o arquivo .docx!”
          </p>
          <div className="mt-2.5 flex items-center justify-between pt-1.5 border-t border-neutral-100 text-[10px]">
            <span className="text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 rounded">3 versões desencontradas</span>
            <span className="text-neutral-500 font-mono">12 e-mails</span>
          </div>
        </div>

        {/* R4. Bottom-Right: Ficha de arquivo morto / papel físico */}
        <div className="pointer-events-auto absolute top-[650px] lg:top-[690px] xl:top-[720px] right-8 lg:right-14 xl:right-20 hidden md:block w-[240px] lg:w-[270px] rotate-[-6deg] rounded-lg border border-[var(--border-subtle)] bg-white p-3.5 shadow-[0_10px_24px_rgba(14,18,16,0.08)] transition-all duration-300 hover:rotate-0 hover:scale-105 hover:border-[var(--accent-primary)] hover:shadow-[0_20px_40px_var(--accent-surface)] hover:z-40 z-20">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
            <span className="rounded bg-neutral-200 px-1.5 py-0.5 text-[9px] font-mono font-bold text-neutral-700">
              ARQUIVO
            </span>
            <span className="truncate font-mono text-[10px] text-[var(--text-muted)]">
              pasta_suspensa_arquivo_2023.scan
            </span>
          </div>
          <p className="mt-2 text-[11px] text-neutral-700 leading-snug">
            Contrato em papel físico guardado no arquivo da recepção. Ninguém acha a 2ª via assinada.
          </p>
          <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-rose-700 bg-rose-50 px-2 py-1 rounded border border-rose-200">
            <span className="font-semibold">Via física perdida</span>
            <span>Sem cópia digital</span>
          </div>
        </div>
      </div>
    </div>
  );
}
