"use client";

import React, { useState } from "react";
import { SEGMENTS, getSegmentData, type SegmentId } from "@/lib/segments";
import { cn } from "@/lib/utils";

interface LiveDocumentCardProps {
  initialSegment?: SegmentId;
}

export function LiveDocumentCard({ initialSegment = "coworking" }: LiveDocumentCardProps) {
  const [selectedSegment, setSelectedSegment] = useState<SegmentId>(initialSegment);
  const data = getSegmentData(selectedSegment);

  const segmentKeys: SegmentId[] = ["coworking", "advocacia", "academias", "escolas", "contabilidade"];

  return (
    <div className="overflow-hidden rounded-lg border border-[#D2E0D6] bg-[#FAFDFB] shadow-sm">
      {/* Topbar com nome do arquivo e abas dos segmentos */}
      <div className="flex flex-col gap-2.5 border-b border-[#D2E0D6] bg-[#F4F8F5] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#24523B]"></span>
          <span className="font-mono text-xs text-[#526359]">{data.templateFileName}</span>
        </div>

        {/* Pílulas de seleção de segmento */}
        <div role="tablist" aria-label="Selecione um segmento" className="flex flex-wrap gap-1 text-xs">
          {segmentKeys.map((segId) => {
            const isSelected = selectedSegment === segId;
            return (
              <button
                key={segId}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`segment-panel-${segId}`}
                id={`tab-${segId}`}
                onClick={() => setSelectedSegment(segId)}
                className={cn(
                  "cursor-pointer rounded-full px-2.5 py-1 font-medium transition active:scale-[0.98]",
                  isSelected
                    ? "bg-[#24523B] text-white shadow-2xs"
                    : "bg-[#EBF2ED] text-[#526359] hover:bg-[#D9E8DD] hover:text-[#0E1210]"
                )}
              >
                {SEGMENTS[segId].name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid dividido: Variáveis à esquerda + Contrato formatado à direita */}
      <div
        id={`segment-panel-${selectedSegment}`}
        role="tabpanel"
        aria-labelledby={`tab-${selectedSegment}`}
        className="grid grid-cols-1 divide-y divide-[#D2E0D6] lg:grid-cols-12 lg:divide-x lg:divide-y-0"
      >
        {/* Coluna de Variáveis */}
        <div className="space-y-2.5 p-4 sm:p-5 lg:col-span-5">
          <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#526359]">
            Variáveis Preenchidas
          </div>

          <div className="rounded-md border border-[#D2E0D6] bg-white p-2.5 shadow-2xs">
            <div className="font-mono text-[11px] text-[#526359]">{"{{cliente_nome}}"}</div>
            <div className="mt-0.5 text-xs font-semibold text-[#0E1210]">{data.variables.cliente_nome}</div>
          </div>

          <div className="rounded-md border border-[#D2E0D6] bg-white p-2.5 shadow-2xs">
            <div className="font-mono text-[11px] text-[#526359]">{"{{plano_valor}}"}</div>
            <div className="mt-0.5 font-mono text-xs font-bold text-[#1E4D35]">{data.variables.plano_valor}</div>
          </div>

          <div className="rounded-md border border-[#D2E0D6] bg-white p-2.5 shadow-2xs">
            <div className="font-mono text-[11px] text-[#526359]">{"{{indice_reajuste}}"}</div>
            <div className="mt-0.5 font-mono text-xs text-[#0E1210]">{data.variables.indice_reajuste}</div>
          </div>

          {data.variables.detalhe_extra && (
            <div className="rounded-md border border-[#D2E0D6] bg-white p-2.5 shadow-2xs">
              <div className="font-mono text-[11px] text-[#526359]">{"{{item_contratado}}"}</div>
              <div className="mt-0.5 text-xs text-[#526359]">{data.variables.detalhe_extra}</div>
            </div>
          )}
        </div>

        {/* Coluna da Minuta em Papel Editorial */}
        <div className="space-y-3.5 bg-white p-5 font-serif sm:p-6 lg:col-span-7">
          <div className="flex items-center justify-between border-b border-[#D2E0D6] pb-2.5 font-sans">
            <span className="text-[11px] font-bold tracking-wide uppercase text-[#526359]">{data.clauseTitle}</span>
            <span className="rounded bg-[#E1EDE4] px-2 py-0.5 text-[11px] font-semibold text-[#1E4D35]">
              Vigente
            </span>
          </div>

          <p className="text-sm leading-relaxed text-[#0E1210]">
            Pelo presente instrumento particular, a CONTRATADA cede à{" "}
            <span className="rounded bg-[#E1EDE4] px-1.5 py-0.5 font-sans text-xs font-semibold text-[#1E4D35]">
              {data.variables.cliente_nome}
            </span>{" "}
            o direito contratado, mediante pagamento mensal de{" "}
            <span className="rounded bg-[#E1EDE4] px-1.5 py-0.5 font-mono text-xs font-bold text-[#1E4D35]">
              {data.variables.plano_valor}
            </span>
            .
          </p>

          <p className="text-xs leading-relaxed italic text-[#526359]">{data.clauseNote}</p>

          <div className="pt-2 border-t border-[#F0F4F1] flex items-center justify-between text-[11px] font-sans text-[#526359]">
            <span className="font-mono">PDF Seguro · SHA-256</span>
            <span>Pronto para assinatura</span>
          </div>
        </div>
      </div>
    </div>
  );
}
