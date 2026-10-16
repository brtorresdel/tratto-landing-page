"use client";

import React from "react";
import { LiveDocumentCard } from "@/components/live-document-card";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Coluna Esquerda: Proposta de Valor Editorial */}
          <div className="space-y-6 lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#A8C2B0] bg-[#E1EDE4] px-3 py-1 text-xs font-semibold text-[#1E4D35]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#24523B] animate-pulse"></span>
              Pré-lançamento · Lista de Espera Aberta
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#0E1210] sm:text-4xl lg:text-[42px] lg:leading-[1.15]">
              Crie contratos em minutos a partir dos seus modelos —{" "}
              <span className="font-serif italic font-normal text-[#24523B]">
                sem erro de preenchimento.
              </span>
            </h1>

            <p className="text-base leading-relaxed text-[#526359] sm:text-lg">
              Suba seu modelo <code className="rounded bg-[#E3EFE8] px-1.5 py-0.5 font-mono text-sm text-[#0E1210]">.docx</code>, preencha variáveis com segurança e nunca mais perca um prazo de renovação ou reajuste anual pelo IPCA/IGP-M.
            </p>

            {/* Chamada rápida de e-mail */}
            <form
              action="#lista-de-espera"
              className="space-y-2 pt-2"
              onSubmit={(e) => {
                // Ao submeter, navega suavemente para o formulário
                const target = document.querySelector("#lista-de-espera");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="voce@suaempresa.com.br"
                  className="w-full flex-1 rounded-md border border-[#D2E0D6] bg-white px-3.5 py-2.5 text-sm text-[#0E1210] placeholder-[#526359]/70 shadow-2xs transition focus:border-[#24523B] focus:outline-hidden focus:ring-1 focus:ring-[#24523B]"
                />
                <button
                  type="submit"
                  className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md bg-[#24523B] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#1E4D35] active:scale-[0.98]"
                >
                  Entrar na lista →
                </button>
              </div>
              <p className="text-xs text-[#526359]">
                ✓ Acesso antecipado com prioridade para quem responder 3 perguntas rápidas.
              </p>
            </form>
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
