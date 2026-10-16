"use client";

import React from "react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-44 sm:pb-32">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
        {/* Frase Inicial / Problema em 2 linhas sem travessão */}
        <h2 className="mx-auto max-w-3xl text-lg tracking-tight sm:text-2xl lg:text-[28px] lg:leading-snug">
          <span className="block font-medium text-[var(--text-main)]">
            Seus contratos deveriam levar menos de 2 minutos para chegar aos seus clientes
          </span>
          <span className="mt-1.5 block font-serif italic text-[var(--accent-primary)]">
            e zero planilhas para controlar vencimentos.
          </span>
        </h2>

        {/* O Protagonista com Foco Total na Logo */}
        <div className="mt-12 sm:mt-16">
          <h1 className="flex flex-wrap items-center justify-center gap-3.5 text-3xl tracking-tight sm:text-5xl lg:text-[62px]">
            <span className="font-light text-[var(--text-muted)]">Aqui nasce a</span>
            <img
              src="/logo.svg"
              alt="Tratto"
              width={190}
              height={56}
              className="inline-block h-9 w-auto translate-y-[-2px] sm:h-14 lg:h-16"
            />
          </h1>
        </div>
      </div>
    </section>
  );
}
