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
      path: "M 220 20 A 200 200 0 0 1 420 220 L 288 220 A 68 68 0 0 0 220 152 Z",
      translate: "translate(3, -3)",
      iconCenter: { x: 314.75, y: 125.25 },
      side: "right" as const,
      desktopPosition: "lg:left-[74%] lg:top-[28%] lg:-translate-y-1/2",
    },
    {
      id: 1,
      icon: History,
      title: "Rastreabilidade Imutável",
      description:
        "Toda ação relevante — emissão de contrato, aprovação formal de desconto por supervisor ou alteração de status — gera um registro somente-leitura em AuditLog com autoria, data/hora e IP.",
      // Quadrante 1: Inferior Direito (90° a 180°)
      path: "M 420 220 A 200 200 0 0 1 220 420 L 220 288 A 68 68 0 0 0 288 220 Z",
      translate: "translate(3, 3)",
      iconCenter: { x: 314.75, y: 314.75 },
      side: "right" as const,
      desktopPosition: "lg:left-[74%] lg:top-[72%] lg:-translate-y-1/2",
    },
    {
      id: 2,
      icon: Lock,
      title: "Conformidade com a LGPD",
      description:
        "Respeito integral à privacidade dos seus clientes e signatários, sem rastreadores invasivos de publicidade e com soft delete universal para resguardar a integridade jurídica.",
      // Quadrante 2: Inferior Esquerdo (180° a 270°)
      path: "M 220 420 A 200 200 0 0 1 20 220 L 152 220 A 68 68 0 0 0 220 288 Z",
      translate: "translate(-3, 3)",
      iconCenter: { x: 125.25, y: 314.75 },
      side: "left" as const,
      desktopPosition: "lg:right-[74%] lg:top-[72%] lg:-translate-y-1/2",
    },
    {
      id: 3,
      icon: FileSpreadsheet,
      title: "Portabilidade sem Lock-in",
      description:
        "Seus contratos pertencem exclusivamente a você. Exporte cadastros, vigências e relatórios analíticos a qualquer instante em planilhas abertas (CSV e XLSX nativo).",
      // Quadrante 3: Superior Esquerdo (270° a 360°)
      path: "M 20 220 A 200 200 0 0 1 220 20 L 220 152 A 68 68 0 0 0 152 220 Z",
      translate: "translate(-3, -3)",
      iconCenter: { x: 125.25, y: 125.25 },
      side: "left" as const,
      desktopPosition: "lg:right-[74%] lg:top-[28%] lg:-translate-y-1/2",
    },
  ];

  return (
    <section id="seguranca" className="py-20 sm:py-28 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] transition-colors duration-300 overflow-hidden">
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
        {/* PALCO CENTRALIZADO DO GRÁFICO COM BALÕES FLUTUANTES SOBREPOSTOS */}
        {/* =================================================================== */}
        <div className="mt-14 sm:mt-20 relative flex flex-col items-center justify-center min-h-[480px] lg:min-h-[540px]">
          {/* Container Relativo do Gráfico + Balões */}
          <div
            className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] lg:w-[460px] lg:h-[460px] select-none flex items-center justify-center"
            onMouseLeave={() => setActiveSlice(null)}
          >
            {/* O Gráfico de Pizza SVG - Renderizado na camada base z-10 */}
            <svg viewBox="0 0 440 440" className="w-full h-full filter drop-shadow-sm relative z-10">
              {/* 4 Módulos do Gráfico de Pizza - Gaps uniformes de 6px, próximos ao centro e sem borda stroke */}
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

                    {/* Ícone com tamanho ampliado, rigorosamente centralizado no meio do quadrante */}
                    <foreignObject
                      x={pillar.iconCenter.x - 26}
                      y={pillar.iconCenter.y - 26}
                      width={52}
                      height={52}
                      className="pointer-events-none"
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon
                          className={clsx(
                            "h-8.5 w-8.5 sm:h-9 sm:w-9 transition-colors duration-200",
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
                r="62"
                fill="var(--bg-card)"
                stroke="var(--border-subtle)"
                strokeWidth="1.5"
                className="filter drop-shadow-xs pointer-events-none"
              />

              {/* Rubrica Tratto vetorial precisa, centralizada e em preto */}
              <g transform="translate(187, 187)" className="pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="66"
                  height="66"
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

            {/* Balões de Conversa Flutuantes - Na camada z-40 (SEMPRE POR CIMA DO GRÁFICO) */}
            {pillars.map((pillar) => {
              const isActive = activeSlice === pillar.id;

              return (
                <div
                  key={pillar.id}
                  onMouseEnter={() => setActiveSlice(pillar.id)}
                  className={clsx(
                    // Base do balão com alta elevação e z-index elevado (z-40 para ficar por cima do gráfico)
                    "rounded-2xl border border-[var(--accent-primary)] bg-[var(--bg-card)] p-5 sm:p-6 shadow-2xl transition-all duration-300 ease-out z-40 ring-1 ring-[var(--accent-primary)]/20 text-left",
                    // No desktop: posicionamento absoluto ancorado próximo ao respectivo ícone
                    "lg:absolute lg:w-[320px] xl:w-[350px]",
                    pillar.desktopPosition,
                    // No mobile: posicionado logo abaixo do gráfico
                    "max-lg:hidden",
                    // Física da animação (de dentro do gráfico para fora)
                    isActive
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none",
                    pillar.side === "right"
                      ? isActive ? "translate-x-0" : "-translate-x-6"
                      : isActive ? "translate-x-0" : "translate-x-6"
                  )}
                >
                  {/* Pontinha do balão no Desktop: Fica coladinha ao lado do respectivo ícone */}
                  <div
                    className={clsx(
                      "hidden lg:block absolute top-1/2 -translate-y-1/2 h-4 w-4 rotate-45 bg-[var(--bg-card)] border-[var(--accent-primary)]",
                      pillar.side === "right"
                        ? "-left-2 border-l border-b"
                        : "-right-2 border-r border-t"
                    )}
                    aria-hidden="true"
                  />

                  {/* Texto do balão com título em negrito inline */}
                  <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                    <strong className="font-semibold text-[var(--text-main)] font-sans">
                      {pillar.title}:{" "}
                    </strong>
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Versão Mobile dos Balões (Aparece abaixo do gráfico ao toque, z-40) */}
          <div className="lg:hidden w-full max-w-sm mx-auto mt-6 min-h-[140px] relative">
            {pillars.map((pillar) => {
              const isActive = activeSlice === pillar.id;
              if (!isActive) return null;

              return (
                <div
                  key={`mobile-${pillar.id}`}
                  className="rounded-2xl border border-[var(--accent-primary)] bg-[var(--bg-card)] p-5 shadow-2xl ring-1 ring-[var(--accent-primary)]/20 text-left relative z-40 transition-all duration-300 animate-in fade-in slide-in-from-top-3"
                >
                  {/* Pontinha do balão no mobile (apontando para cima em direção ao gráfico) */}
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rotate-45 border-l border-t bg-[var(--bg-card)] border-[var(--accent-primary)]"
                    aria-hidden="true"
                  />

                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    <strong className="font-semibold text-[var(--text-main)] font-sans">
                      {pillar.title}:{" "}
                    </strong>
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Dica de interação acessível */}
          <p className="mt-5 font-mono text-xs text-[var(--text-muted)] flex items-center gap-1.5 select-none">
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
            <span>Passe o mouse ou toque em uma fatia para ver os detalhes</span>
          </p>
        </div>
      </div>
    </section>
  );
}
