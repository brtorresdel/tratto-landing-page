"use client";

import React from "react";
import { TrattoWordmark } from "./tratto-wordmark";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-44 sm:pb-32">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
        {/* Frase Inicial / Problema em 2 linhas sem travessão */}
        <h2 className="mx-auto max-w-3xl text-lg tracking-tight sm:text-2xl lg:text-[28px] lg:leading-snug">
          <span className="block font-medium text-[var(--text-main)]">
            Seus contratos deveriam levar menos de 2 minutos
            <br />
            para ficar pronto
          </span>
          <span className="mt-1.5 block font-serif italic text-[var(--accent-primary)]">
            e zero planilhas para controlar vencimentos.
          </span>
        </h2>

        {/* O Protagonista: Texto menor com foco máximo na Logo ampliada */}
        <div className="mt-12 sm:mt-16">
          <h1 className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 tracking-tight">
            <span className="font-light text-[var(--text-muted)] text-base sm:text-2xl lg:text-[28px]">
              Aqui nasce a
            </span>
            <TrattoWordmark className="inline-block h-9 w-auto translate-y-[-2px] sm:h-14 lg:h-16" />
          </h1>
        </div>
      </div>
    </section>
  );
}
