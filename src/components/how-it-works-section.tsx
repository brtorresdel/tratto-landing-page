import React from "react";
import { TrattoWordmark } from "./tratto-wordmark";
import { ContractStoryPlayer } from "./contract-story-player";

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 sm:py-28 bg-[var(--bg-canvas)] transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 text-center">
        {/* Apresentação Oficial da Tratto: Logo com escala calibrada, ponto dinâmico e efeito flutuante leve */}
        <div className="flex justify-center">
          <h2 aria-label="Tratto" className="animate-float-gentle">
            <TrattoWordmark className="inline-block h-20 w-auto sm:h-24 md:h-26 lg:h-28" />
          </h2>
        </div>

        {/* Texto Introdutório ocupando a largura total alinhada aos quadros */}
        <p className="mt-8 sm:mt-10 w-full text-base sm:text-lg lg:text-xl text-[var(--text-main)] leading-relaxed">
          Pensando nessas dores e na minha própria experiência, planejei um projeto que pudesse simplificar esse processo. E esse projeto se tornou a{" "}
          <strong className="font-semibold text-[var(--text-main)]">Tratto</strong>, uma plataforma para criação e gerenciamento de contratos baseado em templates, que permite agilizar e otimizar ao máximo esse processo!
          <span className="block mt-4">
            A ideia aqui é bem simples:
          </span>
        </p>

        {/* Player Interativo estilo Stories: As 4 Etapas da Vida do Contrato */}
        <ContractStoryPlayer />
      </div>
    </section>
  );
}
