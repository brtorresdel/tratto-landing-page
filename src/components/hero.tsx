"use client";

import React from "react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-44 sm:pb-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
        {/* Headline Manifesto Focada no Problema */}
        <h1 className="text-3xl font-bold tracking-tight text-[#0E1210] sm:text-5xl sm:leading-[1.18] lg:text-[52px]">
          Seus contratos deveriam levar menos de 2 minutos para chegar aos seus clientes —{" "}
          <span className="font-serif italic font-normal text-[#24523B]">
            e zero planilhas para controlar vencimentos.
          </span>
        </h1>

        {/* Aqui nasce a Tratto (com a logo oficial) */}
        <div className="mt-10 flex items-center justify-center gap-2.5 text-base text-[#526359] sm:mt-14 sm:text-xl">
          <span className="font-sans font-normal tracking-wide">Aqui nasce a</span>
          <img
            src="/logo.svg"
            alt="Tratto"
            width={110}
            height={32}
            className="inline-block h-6 w-auto translate-y-[-1px] sm:h-8"
          />
        </div>
      </div>
    </section>
  );
}
