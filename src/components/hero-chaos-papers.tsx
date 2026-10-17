import React from "react";

// ============================================================================
// CARDS INDIVIDUAIS DE DOCUMENTOS CAÓTICOS (SEM GLASSMORPHISM / FUNDO SÓLIDO)
// ============================================================================

export function DocxPaperCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col rounded-lg border border-[var(--border-subtle)] bg-[var(--accent-surface)] p-4 shadow-[0_8px_24px_rgba(14,18,16,0.06)] transition-all duration-500 ease-out ${className}`}
    >
      {/* Canto dobrado da folha */}
      <div className="absolute top-0 right-0 h-6 w-6 rounded-bl-md border-b border-l border-[var(--border-subtle)] bg-white shadow-2xs" />

      {/* Cabeçalho */}
      <div className="flex items-center gap-2 pb-2.5 border-b border-black/5 pr-6">
        <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-mono font-bold text-sky-800 shadow-2xs">
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
          <div className="mt-1 flex items-center gap-1.5 rounded border border-rose-300 bg-white px-2 py-1 text-[10px] font-mono text-rose-700 shadow-2xs">
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
        <span className="font-semibold text-rose-700 bg-white px-1.5 py-0.5 rounded shadow-2xs">
          Qual é a versão final?
        </span>
      </div>
    </div>
  );
}

export function XlsxPaperCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-lg border border-[var(--border-subtle)] bg-[var(--accent-surface)] shadow-[0_10px_28px_rgba(14,18,16,0.07)] transition-all duration-500 ease-out overflow-hidden ${className}`}
    >
      {/* Barra de título da planilha reativa ao tema */}
      <div className="flex items-center justify-between bg-[var(--accent-primary)] px-3 py-1.5 text-white transition-colors duration-300">
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <span className="font-bold bg-white/20 px-1 rounded text-[10px]">XLS</span>
          <span className="font-medium">vencimentos_2024.xlsx</span>
        </div>
        <span className="text-[9px] text-white/80 font-mono">14:22</span>
      </div>

      {/* Tabela de Planilha reativa ao tema com fundo de superfície */}
      <table className="w-full border-collapse text-left font-mono text-[10px] bg-[var(--accent-surface)] transition-colors duration-300">
        <thead>
          <tr className="bg-black/5 text-neutral-700 border-b border-[var(--border-subtle)] text-[9px]">
            <th className="py-1 px-2 border-r border-[var(--border-subtle)] font-semibold">Cliente</th>
            <th className="py-1 px-2 border-r border-[var(--border-subtle)] font-semibold">Vencimento</th>
            <th className="py-1 px-2 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-subtle)]">
          <tr>
            <td className="py-1 px-2 border-r border-[var(--border-subtle)] font-medium text-[var(--text-main)] truncate">Alpha Logística</td>
            <td className="py-1 px-2 border-r border-[var(--border-subtle)] text-[var(--text-muted)] tabular-nums">15/10/24</td>
            <td className="py-1 px-2 text-[var(--badge-alert-text)] font-bold bg-[var(--badge-alert-bg)]">Venceu ontem</td>
          </tr>
          <tr>
            <td className="py-1 px-2 border-r border-[var(--border-subtle)] font-medium text-[var(--text-main)] truncate">Prisma Consultoria</td>
            <td className="py-1 px-2 border-r border-[var(--border-subtle)] text-[var(--text-muted)] tabular-nums">01/08/23</td>
            <td className="py-1 px-2 text-[var(--badge-pending-text)] font-bold bg-[var(--badge-pending-bg)]">Sem reajuste 2a</td>
          </tr>
          <tr>
            <td className="py-1 px-2 border-r border-[var(--border-subtle)] font-medium text-[var(--text-main)] truncate">Apex Engenharia</td>
            <td className="py-1 px-2 border-r border-[var(--border-subtle)] text-[var(--text-muted)] tabular-nums">30/11/24</td>
            <td className="py-1 px-2 text-[var(--text-muted)]">Cadê via assinada?</td>
          </tr>
        </tbody>
      </table>

      {/* Abas inferiores reativas ao tema */}
      <div className="flex items-center gap-1 bg-black/5 px-2 py-1 border-t border-[var(--border-subtle)] text-[9px] font-mono text-[var(--text-muted)]">
        <span className="bg-[var(--accent-surface)] px-2 py-0.5 rounded-t border-t border-x border-[var(--border-subtle)] font-semibold text-[var(--accent-primary)] shadow-2xs">
          Contratos_Ativos
        </span>
        <span className="px-1.5 py-0.5 text-neutral-500">Pendentes</span>
      </div>
    </div>
  );
}

export function PostitUrgenteCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-lg border border-[var(--border-subtle)] bg-[var(--accent-surface)] p-3.5 shadow-[0_8px_20px_rgba(14,18,16,0.06)] transition-all duration-500 ease-out ${className}`}
    >
      {/* Fita adesiva no topo */}
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-3.5 w-14 rotate-[-1deg] rounded-[1px] bg-white border border-black/10 shadow-2xs" />

      <div className="flex items-center justify-between text-[10px] font-mono text-amber-950 pb-1 border-b border-black/5">
        <span className="font-bold">⚡ URGENTE</span>
        <span className="text-[9px] text-amber-800">às 17:48</span>
      </div>

      <p className="mt-2 font-serif italic text-xs leading-relaxed text-[#78350F]">
        “Cliente pediu pra tirar multa por atraso! Pode autorizar antes das 18h?”
      </p>

      <div className="mt-2.5 pt-1.5 border-t border-black/5 flex items-center justify-between text-[9px] font-mono text-amber-950">
        <span className="text-amber-800">Sem aprovação formal</span>
        <span className="font-bold text-rose-700 bg-white px-1 rounded shadow-2xs">Risco jurídico</span>
      </div>
    </div>
  );
}

export function NotificacaoRescisaoCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-lg border border-[var(--border-subtle)] bg-[var(--accent-surface)] p-3 shadow-[0_8px_20px_rgba(14,18,16,0.06)] transition-all duration-500 ease-out ${className}`}
    >
      <div className="flex items-center justify-between pb-1.5 border-b border-black/5 text-[10px] font-mono">
        <span className="text-rose-700 font-bold truncate">notificacao_rescisao_atrasada.pdf</span>
      </div>
      <p className="mt-1.5 text-[10px] text-[var(--text-muted)] leading-snug">
        Aviso prévio não calculado. Cliente encerrou sem pagar 30 dias de multa.
      </p>
      <div className="mt-2 rounded bg-white px-2 py-1 text-[10px] font-mono text-rose-800 flex justify-between items-center shadow-2xs">
        <span>Prejuízo direto:</span>
        <strong className="font-bold text-rose-900">-R$ 2.400,00</strong>
      </div>
    </div>
  );
}

export function PdfPaperCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col rounded-lg border border-[var(--border-subtle)] bg-[var(--accent-surface)] p-4 shadow-[0_8px_24px_rgba(14,18,16,0.06)] transition-all duration-500 ease-out ${className}`}
    >
      {/* Clipe metálico desenhado no topo esquerdo */}
      <div className="absolute -top-3 left-6 h-7 w-3 rounded-full border-2 border-neutral-400 bg-neutral-200 shadow-2xs z-30" />

      {/* Cabeçalho do PDF */}
      <div className="flex items-center justify-between pb-2.5 border-b border-black/5 pl-4">
        <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-mono font-bold text-rose-800 shadow-2xs">
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
        <div className="mt-3 rounded border-2 border-dashed border-rose-400 bg-white p-2 text-center rotate-[-2deg] shadow-2xs">
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
  );
}

export function EmailMinutaCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-lg border border-[var(--border-subtle)] bg-[var(--accent-surface)] p-3.5 shadow-[0_10px_28px_rgba(14,18,16,0.07)] transition-all duration-500 ease-out ${className}`}
    >
      <div className="flex items-center justify-between pb-2 border-b border-black/5 text-[11px] font-mono">
        <span className="font-bold text-neutral-800 truncate">re: minuta final do contrato</span>
        <span className="text-[10px] text-neutral-500">Ontem</span>
      </div>
      <p className="mt-2 text-[11px] text-neutral-700 leading-snug">
        “Segue em anexo a minuta aprovada... Ops, esqueci de anexar o arquivo .docx!”
      </p>
      <div className="mt-2.5 flex items-center justify-between pt-1.5 border-t border-black/5 text-[10px]">
        <span className="text-amber-900 font-bold bg-white px-1.5 py-0.5 rounded shadow-2xs">3 versões desencontradas</span>
        <span className="text-neutral-500 font-mono">12 e-mails</span>
      </div>
    </div>
  );
}

export function PostitReajusteCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-lg border border-[var(--border-subtle)] bg-[var(--accent-surface)] p-3.5 shadow-[0_8px_20px_rgba(14,18,16,0.06)] transition-all duration-500 ease-out ${className}`}
    >
      {/* Fita adesiva no topo */}
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-3.5 w-14 rotate-[-1deg] rounded-[1px] bg-white border border-black/10 shadow-2xs" />

      <div className="flex items-center justify-between text-[10px] font-mono text-amber-950 pb-1.5 border-b border-black/5">
        <span className="font-bold">📌 LEMBRETE</span>
        <span className="text-[9px] text-amber-800 font-semibold">urgente</span>
      </div>

      <p className="mt-2 font-serif italic text-xs leading-relaxed text-[#78350F]">
        “Reajuste pelo IPCA venceu há 3 meses e ninguém cobrou o cliente!”
      </p>

      <div className="mt-2.5 flex items-center justify-between rounded bg-white px-2 py-1 text-[10px] font-mono text-amber-950 shadow-2xs">
        <span>Perda acumulada:</span>
        <strong className="font-bold text-rose-700">-R$ 1.350,00</strong>
      </div>
    </div>
  );
}

export function ArquivoMortoCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-lg border border-[var(--border-subtle)] bg-[var(--accent-surface)] p-3 shadow-[0_8px_20px_rgba(14,18,16,0.06)] transition-all duration-500 ease-out ${className}`}
    >
      <div className="flex items-center gap-2 pb-1.5 border-b border-black/5">
        <span className="rounded bg-white px-1.5 py-0.5 text-[9px] font-mono font-bold text-neutral-700 shadow-2xs">
          ARQUIVO
        </span>
        <span className="truncate font-mono text-[10px] text-[var(--text-muted)]">
          pasta_suspensa_arquivo_2023.scan
        </span>
      </div>
      <p className="mt-1.5 text-[10px] text-neutral-700 leading-snug">
        Contrato em papel físico guardado no arquivo da recepção. Ninguém acha a 2ª via assinada.
      </p>
      <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-rose-700 bg-white px-2 py-1 rounded shadow-2xs">
        <span className="font-semibold">Via física perdida</span>
        <span>Sem cópia digital</span>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL: PILHAS ESQUERDA/DIREITA (TABLET/DESKTOP) E PILHA UNIFICADA (MOBILE)
// ============================================================================

export function HeroChaosPapers() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none overflow-hidden"
    >
      <div className="relative mx-auto h-full max-w-7xl">
        {/* ========================================================= */}
        {/* PILHA ESQUERDA (DESKTOP - A PARTIR DE 1024px) */}
        {/* ========================================================= */}
        <div className="group/left pointer-events-auto absolute bottom-[-10px] md:bottom-[-6px] lg:bottom-[-6px] xl:bottom-0 left-0 md:left-[2%] lg:-left-6 xl:left-2 2xl:left-6 w-[420px] lg:w-[440px] xl:w-[540px] h-[390px] lg:h-[400px] xl:h-[440px] hidden lg:block lg:scale-[0.72] xl:scale-100 origin-bottom-left transition-transform duration-300">
          {/* L1. DOCX em formato de Folha Vertical A4 */}
          <DocxPaperCard className="absolute bottom-2 lg:bottom-8 left-1 lg:left-4 xl:left-8 w-[260px] lg:w-[285px] min-h-[340px] lg:min-h-[370px] rotate-[-9deg] group-hover/left:rotate-[-14deg] group-hover/left:-translate-x-6 group-hover/left:-translate-y-6 group-hover/left:shadow-[0_16px_36px_rgba(14,18,16,0.1)] z-10" />

          {/* L2. Planilha XLSX */}
          <XlsxPaperCard className="absolute bottom-6 lg:bottom-12 left-18 lg:left-32 xl:left-40 w-[275px] lg:w-[310px] rotate-[5deg] group-hover/left:rotate-[9deg] group-hover/left:translate-x-6 group-hover/left:-translate-y-8 group-hover/left:shadow-[0_18px_36px_rgba(14,18,16,0.12)] z-20" />

          {/* L3. Post-it de Alerta */}
          <PostitUrgenteCard className="absolute bottom-44 lg:bottom-56 left-4 lg:left-12 xl:left-16 w-[225px] lg:w-[250px] rotate-[-4deg] group-hover/left:rotate-[-8deg] group-hover/left:-translate-x-3 group-hover/left:-translate-y-12 group-hover/left:shadow-[0_16px_32px_rgba(14,18,16,0.1)] z-30" />

          {/* L4. Notificação de rescisão */}
          <NotificacaoRescisaoCard className="absolute bottom-0 lg:bottom-2 left-28 lg:left-52 xl:left-64 w-[215px] lg:w-[250px] rotate-[8deg] group-hover/left:rotate-[13deg] group-hover/left:translate-x-8 group-hover/left:translate-y-3 group-hover/left:shadow-[0_14px_28px_rgba(14,18,16,0.09)] z-20" />
        </div>

        {/* ========================================================= */}
        {/* PILHA DIREITA (DESKTOP - A PARTIR DE 1024px) */}
        {/* ========================================================= */}
        <div className="group/right pointer-events-auto absolute bottom-[-10px] md:bottom-[-6px] lg:bottom-[-6px] xl:bottom-0 right-0 md:right-[2%] lg:-right-6 xl:right-2 2xl:right-6 w-[420px] lg:w-[440px] xl:w-[540px] h-[390px] lg:h-[400px] xl:h-[440px] hidden lg:block lg:scale-[0.72] xl:scale-100 origin-bottom-right transition-transform duration-300">
          {/* R1. PDF em formato de Folha Vertical A4 */}
          <PdfPaperCard className="absolute bottom-2 lg:bottom-8 right-1 lg:right-4 xl:right-8 w-[260px] lg:w-[285px] min-h-[340px] lg:min-h-[370px] rotate-[8deg] group-hover/right:rotate-[13deg] group-hover/right:translate-x-6 group-hover/right:-translate-y-6 group-hover/right:shadow-[0_16px_36px_rgba(14,18,16,0.1)] z-10" />

          {/* R2. E-mail com anexo desencontrado */}
          <EmailMinutaCard className="absolute bottom-6 lg:bottom-12 right-18 lg:right-32 xl:right-40 w-[255px] lg:w-[280px] rotate-[-5deg] group-hover/right:rotate-[-9deg] group-hover/right:-translate-x-6 group-hover/right:-translate-y-8 group-hover/right:shadow-[0_18px_36px_rgba(14,18,16,0.12)] z-20" />

          {/* R3. Post-it de Reajuste Esquecido */}
          <PostitReajusteCard className="absolute bottom-44 lg:bottom-56 right-4 lg:right-12 xl:right-16 w-[225px] lg:w-[260px] rotate-[6deg] group-hover/right:rotate-[10deg] group-hover/right:translate-x-3 group-hover/right:-translate-y-12 group-hover/right:shadow-[0_16px_32px_rgba(14,18,16,0.1)] z-30" />

          {/* R4. Ficha de arquivo morto / papel físico */}
          <ArquivoMortoCard className="absolute bottom-0 lg:bottom-2 right-28 lg:right-52 xl:right-64 w-[215px] lg:w-[250px] rotate-[-7deg] group-hover/right:rotate-[-13deg] group-hover/right:-translate-x-8 group-hover/right:translate-y-3 group-hover/right:shadow-[0_14px_28px_rgba(14,18,16,0.09)] z-20" />
        </div>

        {/* ========================================================= */}
        {/* COMPOSIÇÃO ESPALHADA NA BASE (TABLET E CELULAR - < 1024px) */}
        {/* ========================================================= */}
        <div className="group/spread pointer-events-auto absolute bottom-[-25px] sm:bottom-[-45px] md:bottom-[-55px] left-1/2 -translate-x-1/2 w-[760px] sm:w-[840px] md:w-[940px] h-[250px] sm:h-[240px] md:h-[260px] block lg:hidden scale-[0.55] sm:scale-[0.66] md:scale-[0.85] origin-bottom transition-all duration-300">
          {/* 1. Folha DOCX */}
          <DocxPaperCard className="absolute bottom-0 sm:bottom-2 left-0 w-[240px] min-h-[300px] rotate-[-5deg] transition-all duration-500 ease-out group-hover/spread:-translate-y-8 md:group-hover/spread:-translate-y-10 z-10" />

          {/* 2. Post-it Urgente */}
          <PostitUrgenteCard className="absolute bottom-24 sm:bottom-16 left-[90px] sm:left-[110px] md:left-[120px] w-[210px] rotate-[3deg] transition-all duration-500 ease-out group-hover/spread:-translate-y-8 md:group-hover/spread:-translate-y-10 z-20" />

          {/* 3. Planilha XLSX */}
          <XlsxPaperCard className="absolute bottom-4 sm:bottom-4 left-[170px] sm:left-[210px] md:left-[230px] w-[250px] rotate-[-2deg] transition-all duration-500 ease-out group-hover/spread:-translate-y-8 md:group-hover/spread:-translate-y-10 z-14" />

          {/* 4. Notificação Rescisão */}
          <NotificacaoRescisaoCard className="absolute bottom-16 sm:bottom-14 left-[280px] sm:left-[330px] md:left-[360px] w-[215px] rotate-[4deg] transition-all duration-500 ease-out group-hover/spread:-translate-y-8 md:group-hover/spread:-translate-y-10 z-22" />

          {/* 5. Folha PDF */}
          <PdfPaperCard className="absolute bottom-0 sm:bottom-2 left-[380px] sm:left-[440px] md:left-[480px] w-[240px] min-h-[300px] rotate-[-4deg] transition-all duration-500 ease-out group-hover/spread:-translate-y-8 md:group-hover/spread:-translate-y-10 z-12" />

          {/* 6. E-mail Minuta */}
          <EmailMinutaCard className="absolute bottom-20 sm:bottom-16 left-[480px] sm:left-[550px] md:left-[590px] w-[230px] rotate-[3deg] transition-all duration-500 ease-out group-hover/spread:-translate-y-8 md:group-hover/spread:-translate-y-10 z-24" />

          {/* 7. Post-it Reajuste IPCA */}
          <PostitReajusteCard className="absolute bottom-12 sm:bottom-8 left-[570px] sm:left-[640px] md:left-[690px] w-[215px] rotate-[-5deg] transition-all duration-500 ease-out group-hover/spread:-translate-y-8 md:group-hover/spread:-translate-y-10 z-18" />

          {/* 8. Arquivo Morto */}
          <ArquivoMortoCard className="absolute bottom-0 sm:bottom-2 left-[640px] sm:left-[720px] md:left-[770px] w-[220px] rotate-[2deg] transition-all duration-500 ease-out group-hover/spread:-translate-y-8 md:group-hover/spread:-translate-y-10 z-16" />
        </div>
      </div>
    </div>
  );
}
