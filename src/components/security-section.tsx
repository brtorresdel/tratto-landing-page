"use client";

import React, { useState } from "react";
import { ShieldCheck, History, Lock, FileSpreadsheet, Sparkles } from "lucide-react";
import clsx from "clsx";

export function SecuritySection() {
  // Os balões começam escondidos (null) e aparecem no hover/toque do módulo
  const [activeSlice, setActiveSlice] = useState<number | null>(null);

  const pillars = [
    {
      id: 0,
      icon: ShieldCheck,
      title: "Isolamento Multi-tenant",
      description:
        "O identificador da sua empresa nunca é confiado a partir do navegador. Toda requisição valida a sessão (organizationId validado no servidor) e isola os dados estritamente através da camada db.forOrg.",
      // Quadrante 0: Superior Direito (0° a 90°)
      path: "M 220 20 A 200 200 0 0 1 420 220 L 302 220 A 82 82 0 0 0 220 138 Z",
      translate: "translate(5, -5)",
      iconCenter: { x: 319.7, y: 120.3 },
      side: "right" as const,
      verticalSlot: "top" as const,
    },
    {
      id: 1,
      icon: History,
      title: "Rastreabilidade Imutável",
      description:
        "Toda ação relevante — emissão de contrato, aprovação formal de desconto por supervisor ou alteração de status — gera um registro somente-leitura em AuditLog com autoria, data/hora e IP.",
      // Quadrante 1: Inferior Direito (90° a 180°)
      path: "M 420 220 A 200 200 0 0 1 220 420 L 220 302 A 82 82 0 0 0 302 220 Z",
      translate: "translate(5, 5)",
      iconCenter: { x: 319.7, y: 319.7 },
      side: "right" as const,
      verticalSlot: "bottom" as const,
    },
    {
      id: 2,
      icon: Lock,
      title: "Conformidade com a LGPD",
      description:
        "Respeito integral à privacidade dos seus clientes e signatários, sem rastreadores invasivos de publicidade e com soft delete universal para resguardar a integridade jurídica.",
      // Quadrante 2: Inferior Esquerdo (180° a 270°)
      path: "M 220 420 A 200 200 0 0 1 20 220 L 138 220 A 82 82 0 0 0 220 302 Z",
      translate: "translate(-5, 5)",
      iconCenter: { x: 120.3, y: 319.7 },
      side: "left" as const,
      verticalSlot: "bottom" as const,
    },
    {
      id: 3,
      icon: FileSpreadsheet,
      title: "Portabilidade sem Lock-in",
      description:
        "Seus contratos pertencem exclusivamente a você. Exporte cadastros, vigências e relatórios analíticos a qualquer instante em planilhas abertas (CSV e XLSX nativo).",
      // Quadrante 3: Superior Esquerdo (270° a 360°)
      path: "M 20 220 A 200 200 0 0 1 220 20 L 220 138 A 82 82 0 0 0 138 220 Z",
      translate: "translate(-5, -5)",
      iconCenter: { x: 120.3, y: 120.3 },
      side: "left" as const,
      verticalSlot: "top" as const,
    },
  ];

  return (
    <section id="seguranca" className="py-20 sm:py-28 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 text-center">
        {/* Título Principal */}
        <h2 className="font-serif text-3xl sm:text-5xl italic font-semibold text-[var(--text-main)] leading-tight tracking-tight">
          Mas com tudo isso, é realmente seguro?
        </h2>

        {/* Subtítulo */}
        <p className="mt-4 mx-auto max-w-3xl text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          Tendo tanta funcionalidade e controle dos contratos, é natural se preocupar com a segurança deles, e a Tratto também pensa seriamente nisso. E essa parte é tratada de forma especial aqui:
        </p>

        {/* =================================================================== */}
        {/* INFOGRÁFICO DE PIZZA DIVIDIDO EM 4 PARTES COM BALÕES DE CONVERSA */}
        {/* =================================================================== */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[480px]">
          {/* LADO ESQUERDO: Balões do Q3 (Portabilidade) e Q2 (LGPD) */}
          <div className="lg:col-span-4 flex flex-col justify-around gap-6 text-left order-2 lg:order-1 h-full min-h-[300px]">
            {[pillars[3], pillars[2]].map((pillar) => {
              const isActive = activeSlice === pillar.id;
              return (
                <div key={pillar.id} className="relative min-h-[130px] flex items-center">
                  <div
                    onMouseEnter={() => setActiveSlice(pillar.id)}
                    className={clsx(
                      "relative w-full rounded-2xl border p-5 sm:p-6 shadow-xl transition-all duration-300 ease-out",
                      isActive
                        ? "border-[var(--accent-primary)] bg-[var(--bg-card)] ring-1 ring-[var(--accent-primary)]/20 opacity-100 translate-x-0 scale-100 pointer-events-auto"
                        : "border-transparent bg-[var(--bg-card)]/90 opacity-0 translate-x-8 scale-95 pointer-events-none max-lg:hidden"
                    )}
                  >
                    {/* Rabicho de fala apontando para o gráfico no desktop (à direita) */}
                    <div
                      className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-2 h-4 w-4 rotate-45 border-r border-t bg-[var(--bg-card)] border-[var(--accent-primary)]"
                      aria-hidden="true"
                    />

                    {/* Rabicho de fala apontando para o gráfico no mobile (ao topo) */}
                    <div
                      className="lg:hidden absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rotate-45 border-l border-t bg-[var(--bg-card)] border-[var(--accent-primary)]"
                      aria-hidden="true"
                    />

                    {/* Texto com título em negrito inline */}
                    <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                      <strong className="font-semibold text-[var(--text-main)] font-sans">
                        {pillar.title}:{" "}
                      </strong>
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CENTRO: O GRÁFICO DE PIZZA AMPLIADO (viewBox 440x440) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
            <div
              className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] lg:w-[440px] lg:h-[440px] xl:w-[460px] xl:h-[460px] select-none flex items-center justify-center"
              onMouseLeave={() => setActiveSlice(null)}
            >
              <svg viewBox="0 0 440 440" className="w-full h-full filter drop-shadow-sm">
                {/* 4 Módulos do Gráfico de Pizza - Gaps matematicamente uniformes de 10px e sem borda branca */}
                {pillars.map((pillar) => {
                  const isActive = activeSlice === pillar.id;
                  const Icon = pillar.icon;

                  return (
                    <g
                      key={pillar.id}
                      transform={pillar.translate}
                      className="cursor-pointer transition-transform duration-200"
                      onMouseEnter={() => setActiveSlice(pillar.id)}
                      onClick={() => setActiveSlice(activeSlice === pillar.id ? null : pillar.id)}
                    >
                      {/* Setor de 90° - Sem borda stroke */}
                      <path
                        d={pillar.path}
                        className={clsx(
                          "transition-all duration-300",
                          isActive
                            ? "fill-[var(--accent-primary)] filter brightness-105"
                            : "fill-[var(--accent-surface)] hover:fill-[var(--accent-primary)]/80"
                        )}
                      />

                      {/* Ícone rigorosamente centralizado no meio do quadrante */}
                      <foreignObject
                        x={pillar.iconCenter.x - 20}
                        y={pillar.iconCenter.y - 20}
                        width={40}
                        height={40}
                        className="pointer-events-none"
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon
                            className={clsx(
                              "h-7 w-7 transition-colors duration-200",
                              isActive ? "text-white" : "text-[var(--accent-primary)]"
                            )}
                          />
                        </div>
                      </foreignObject>
                    </g>
                  );
                })}

                {/* Miolo Central com a Logo da Tratto (a rubrica oficial, em preto) */}
                <circle
                  cx="220"
                  cy="220"
                  r="66"
                  fill="var(--bg-card)"
                  stroke="var(--border-subtle)"
                  strokeWidth="2"
                  className="filter drop-shadow-xs pointer-events-none"
                />

                {/* Rubrica Tratto vetorial precisa, centralizada e em preto */}
                <g transform="translate(186, 186)" className="pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="68"
                    height="68"
                    className="text-[#0E1210] stroke-current fill-none"
                    role="img"
                    aria-label="Rubrica Tratto"
                  >
                    <g strokeLinecap="round" strokeLinejoin="round">
                      <path d="M 6 22 C 14 20, 26 17, 40 19 C 45 20, 48 21, 48 21" strokeWidth="3.6" />
                      <path d="M 31 11 C 30 19, 24 31, 18 36 C 14 40, 15 44, 18 44 C 23 44, 28 37, 33 27 C 34 23, 35 17, 35 13" strokeWidth="3.0" />
                    </g>
                  </svg>
                </g>
              </svg>
            </div>

            <p className="mt-4 font-mono text-xs text-[var(--text-muted)] flex items-center gap-1.5 select-none">
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              <span>Passe o mouse ou toque em uma fatia para ver os detalhes</span>
            </p>
          </div>

          {/* LADO DIREITO: Balões do Q0 (Isolamento) e Q1 (Rastreabilidade) */}
          <div className="lg:col-span-4 flex flex-col justify-around gap-6 text-left order-3 h-full min-h-[300px]">
            {[pillars[0], pillars[1]].map((pillar) => {
              const isActive = activeSlice === pillar.id;
              return (
                <div key={pillar.id} className="relative min-h-[130px] flex items-center">
                  <div
                    onMouseEnter={() => setActiveSlice(pillar.id)}
                    className={clsx(
                      "relative w-full rounded-2xl border p-5 sm:p-6 shadow-xl transition-all duration-300 ease-out",
                      isActive
                        ? "border-[var(--accent-primary)] bg-[var(--bg-card)] ring-1 ring-[var(--accent-primary)]/20 opacity-100 -translate-x-0 scale-100 pointer-events-auto"
                        : "border-transparent bg-[var(--bg-card)]/90 opacity-0 -translate-x-8 scale-95 pointer-events-none max-lg:hidden"
                    )}
                  >
                    {/* Rabicho de fala apontando para o gráfico no desktop (à esquerda) */}
                    <div
                      className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-2 h-4 w-4 rotate-45 border-l border-b bg-[var(--bg-card)] border-[var(--accent-primary)]"
                      aria-hidden="true"
                    />

                    {/* Rabicho de fala apontando para o gráfico no mobile (ao topo) */}
                    <div
                      className="lg:hidden absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rotate-45 border-l border-t bg-[var(--bg-card)] border-[var(--accent-primary)]"
                      aria-hidden="true"
                    />

                    {/* Texto com título em negrito inline */}
                    <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                      <strong className="font-semibold text-[var(--text-main)] font-sans">
                        {pillar.title}:{" "}
                      </strong>
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
