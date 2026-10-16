"use client";

import React from "react";
import { TrattoWordmark } from "./tratto-wordmark";
import { HeroChaosPapers } from "./hero-chaos-papers";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[740px] lg:min-h-[820px] pt-32 pb-24 sm:pt-44 sm:pb-36 flex flex-col justify-center">
      {/* Artefatos Visuais de Contratos e Papéis Desorganizados */}
      <HeroChaosPapers />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-8">
        {/* Frase Inicial / Problema em 3 linhas estruturadas */}
        <h2 className="mx-auto max-w-3xl tracking-tight lg:leading-snug">
          <span className="block text-lg font-medium text-[var(--text-main)] sm:text-2xl lg:text-[28px]">
            Seus contratos deveriam levar menos de
          </span>
          <span className="mt-0.5 block text-lg font-medium text-[var(--text-main)] sm:text-2xl lg:text-[28px]">
            2 minutos para ficar pronto
          </span>
          <span className="mt-2.5 block font-serif text-xl font-semibold italic text-[var(--accent-primary)] transition-colors duration-300 sm:mt-3 sm:text-3xl lg:text-[34px]">
            e zero planilhas para controlar vencimentos.
          </span>
        </h2>

        {/* O Protagonista: Texto em peso médio com foco máximo na Logo ampliada */}
        <div className="mt-12 sm:mt-16">
          <h1 className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 tracking-tight">
            <span className="font-medium text-[var(--text-muted)] text-base sm:text-2xl lg:text-[28px] transition-colors duration-300">
              Aqui nasce a
            </span>
            <TrattoWordmark className="inline-block h-9 w-auto translate-y-[-2px] sm:h-14 lg:h-16" />
          </h1>
        </div>
      </div>
    </section>
  );
}
