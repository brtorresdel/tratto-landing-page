"use client";

import React from "react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-40 sm:pb-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
        {/* Headline Manifesto Focada no Problema */}
        <h1 className="text-3xl font-bold tracking-tight text-[#0E1210] sm:text-5xl sm:leading-[1.15] lg:text-[52px]">
          Seus contratos deveriam levar menos de 2 minutos para gerar —{" "}
          <span className="font-serif italic font-normal text-[#24523B]">
            e zero planilhas para controlar vencimentos.
          </span>
        </h1>

        {/* Subtítulo Empático com a Dor do Visitante */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#526359] sm:text-xl">
          Pequenas empresas ainda perdem horas copiando e colando minutas no Word, arriscando erros de digitação e esquecendo datas de renovação e reajustes anuais de inflação.
        </p>

        {/* Chamada para a Lista de Espera */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#lista-de-espera"
            className="inline-flex items-center justify-center rounded-md bg-[#24523B] px-7 py-3.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#1E4D35] active:scale-[0.98] sm:text-base"
          >
            Entrar na lista de espera →
          </a>
        </div>

        <p className="mt-3 text-xs text-[#526359]">
          ✓ Projeto em desenvolvimento aberto · Acesso prioritário sem custos para os primeiros inscritos
        </p>
      </div>
    </section>
  );
}
