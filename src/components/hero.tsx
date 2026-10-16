"use client";

import React from "react";
import { LiveDocumentCard } from "@/components/live-document-card";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Coluna Esquerda: Proposta de Valor Editorial */}
          <div className="space-y-6 lg:col-span-5">
            <h1 className="text-3xl font-bold tracking-tight text-[#0E1210] sm:text-4xl lg:text-[42px] lg:leading-[1.15]">
              Crie contratos em minutos a partir dos seus modelos —{" "}
              <span className="font-serif italic font-normal text-[#24523B]">
                sem erro de preenchimento.
              </span>
            </h1>

            <p className="text-base leading-relaxed text-[#526359] sm:text-lg">
              Suba seu modelo{" "}
              <code className="rounded bg-[#E3EFE8] px-1.5 py-0.5 font-mono text-sm text-[#0E1210]">
                .docx
              </code>
              , preencha variáveis com segurança e nunca mais perca um prazo de renovação ou reajuste anual pelo IPCA/IGP-M.
            </p>

            {/* Ação Principal: Direcionamento para a Lista de Espera */}
            <div className="pt-2">
              <a
                href="#lista-de-espera"
                className="inline-flex items-center justify-center rounded-md bg-[#24523B] px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[#1E4D35] active:scale-[0.98]"
              >
                Entrar na lista de espera →
              </a>
            </div>
          </div>

          {/* Coluna Direita: O Artefato da Minuta Viva */}
          <div className="lg:col-span-7">
            <LiveDocumentCard />
          </div>
        </div>
      </div>
    </section>
  );
}
