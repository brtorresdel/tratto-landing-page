"use client";

import React from "react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-44 sm:pb-32">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
        {/* Frase Inicial / Problema (um pouco menor, servindo de gancho) */}
        <p className="mx-auto max-w-3xl text-lg font-medium text-[#526359] sm:text-2xl lg:text-[28px] lg:leading-relaxed">
          Seus contratos deveriam levar menos de 2 minutos para chegar aos seus clientes —{" "}
          <span className="font-serif italic text-[#24523B]">
            e zero planilhas para controlar vencimentos.
          </span>
        </p>

        {/* O Protagonista com Maior Destaque: Aqui nasce a Tratto */}
        <div className="mt-10 sm:mt-14">
          <h1 className="flex flex-wrap items-center justify-center gap-3.5 text-3xl font-bold tracking-tight text-[#0E1210] sm:text-5xl lg:text-[62px]">
            <span>Aqui nasce a</span>
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
