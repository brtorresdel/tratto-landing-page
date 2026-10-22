"use client";

import React from "react";
import { TrattoWordmark } from "./tratto-wordmark";
import { HeroChaosPapers } from "./hero-chaos-papers";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-canvas)] transition-colors duration-300 min-h-[500px] sm:min-h-[620px] md:min-h-[660px] lg:min-h-[740px] xl:min-h-[840px] pt-28 sm:pt-32 md:pt-32 lg:pt-28 xl:pt-36 pb-20 sm:pb-32 md:pb-36 lg:pb-12 xl:pb-24 flex flex-col justify-start lg:justify-center">
      {/* Conteúdo Central do Hero */}
      <div className="relative z-10 mx-auto max-w-4xl lg:max-w-3xl xl:max-w-5xl px-4 text-center sm:px-8">
        {/* Frase Inicial / Problema em 3 linhas com escala ampliada */}
        <h2 className="mx-auto max-w-4xl tracking-tight lg:leading-snug">
          <span className="block text-xl font-medium text-[var(--text-main)] sm:text-3xl lg:text-[38px] lg:leading-tight">
            Seus contratos deveriam levar menos de
          </span>
          <span className="mt-1 block text-xl font-medium text-[var(--text-main)] sm:text-3xl lg:text-[38px] lg:leading-tight">
            2 minutos para ficar pronto
          </span>
          <span className="mt-3 block font-serif text-2xl font-semibold italic text-[var(--accent-primary)] transition-colors duration-300 sm:mt-4 sm:text-4xl lg:text-[48px] lg:leading-tight">
            e zero planilhas para controlar vencimentos.
          </span>
        </h2>

        {/* O Protagonista: Texto e Logo oficial em escala ampliada */}
        <div className="mt-8 sm:mt-9 md:mt-10 lg:mt-12 xl:mt-20">
          <h1 className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 tracking-tight">
            <span className="font-medium text-[var(--text-muted)] text-lg sm:text-2xl lg:text-[32px] transition-colors duration-300">
              Aqui nasce a
            </span>
            <TrattoWordmark className="inline-block h-12 w-auto translate-y-[-2px] sm:h-16 lg:h-20" />
          </h1>
        </div>
      </div>

      {/* Artefatos Visuais de Contratos Aglomerados nos Cantos Inferiores */}
      <HeroChaosPapers />
    </section>
  );
}
