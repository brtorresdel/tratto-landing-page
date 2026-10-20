"use client";

import React, { useState } from "react";
import { ShieldCheck, History, Lock, FileSpreadsheet } from "lucide-react";
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
      path: "M 220 12 A 208 208 0 0 1 428 220 L 292 220 A 72 72 0 0 0 220 148 Z",
      translate: "translate(3.5, -3.5)",
      iconCenter: { x: 319, y: 121 },
      side: "right" as const,
      desktopPosition: "lg:left-[84%] lg:top-[28%] lg:-translate-y-1/2",
    },
    {
      id: 1,
      icon: History,
      title: "Rastreabilidade Imutável",
      description:
        "Toda ação relevante — emissão de contrato, aprovação formal de desconto por supervisor ou alteração de status — gera um registro somente-leitura em AuditLog com autoria, data/hora e IP.",
      // Quadrante 1: Inferior Direito (90° a 180°)
      path: "M 428 220 A 208 208 0 0 1 220 428 L 220 292 A 72 72 0 0 0 292 220 Z",
      translate: "translate(3.5, 3.5)",
      iconCenter: { x: 319, y: 319 },
      side: "right" as const,
      desktopPosition: "lg:left-[84%] lg:top-[72%] lg:-translate-y-1/2",
    },
    {
      id: 2,
      icon: Lock,
      title: "Conformidade com a LGPD",
      description:
        "Respeito integral à privacidade dos seus clientes e signatários, sem rastreadores invasivos de publicidade e com soft delete universal para resguardar a integridade jurídica.",
      // Quadrante 2: Inferior Esquerdo (180° a 270°)
      path: "M 220 428 A 208 208 0 0 1 12 220 L 148 220 A 72 72 0 0 0 220 292 Z",
      translate: "translate(-3.5, 3.5)",
      iconCenter: { x: 121, y: 319 },
      side: "left" as const,
      desktopPosition: "lg:right-[84%] lg:top-[72%] lg:-translate-y-1/2",
    },
    {
      id: 3,
      icon: FileSpreadsheet,
      title: "Portabilidade sem Lock-in",
      description:
        "Seus contratos pertencem exclusivamente a você. Exporte cadastros, vigências e relatórios analíticos a qualquer instante em planilhas abertas (CSV e XLSX nativo).",
      // Quadrante 3: Superior Esquerdo (270° a 360°)
      path: "M 12 220 A 208 208 0 0 1 220 12 L 220 148 A 72 72 0 0 0 148 220 Z",
      translate: "translate(-3.5, -3.5)",
      iconCenter: { x: 121, y: 121 },
      side: "left" as const,
      desktopPosition: "lg:right-[84%] lg:top-[28%] lg:-translate-y-1/2",
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
        <div className="mt-14 sm:mt-20 relative flex flex-col items-center justify-center min-h-[500px] lg:min-h-[580px]">
          {/* Container Relativo do Gráfico + Balões (Ampliado para 500px / 540px) */}
          <div
            className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] md:w-[460px] md:h-[460px] lg:w-[500px] lg:h-[500px] xl:w-[540px] xl:h-[540px] select-none flex items-center justify-center"
            onMouseLeave={() => setActiveSlice(null)}
          >
            {/* O Gráfico de Pizza SVG - Renderizado na camada base z-10 */}
            <svg viewBox="0 0 440 440" className="w-full h-full filter drop-shadow-sm relative z-10">
              {/* 4 Módulos do Gráfico de Pizza - Gaps uniformes de 7px, sem borda stroke e escala ampliada */}
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

                    {/* Ícone com tamanho generoso, rigorosamente centralizado no quadrante */}
                    <foreignObject
                      x={pillar.iconCenter.x - 27}
                      y={pillar.iconCenter.y - 27}
                      width={54}
                      height={54}
                      className="pointer-events-none"
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon
                          className={clsx(
                            "h-9 w-9 sm:h-10 sm:w-10 transition-colors duration-200",
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
                r="65"
                fill="var(--bg-card)"
                stroke="var(--border-subtle)"
                strokeWidth="1.5"
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
                    // No desktop: posicionamento absoluto ancorado na lateral do respectivo ícone (sem cobri-lo)
                    "lg:absolute lg:w-[320px] xl:w-[350px]",
                    pillar.desktopPosition,
                    // No mobile: escondido na área do gráfico, exibido logo abaixo
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
                  {/* Pontinha do balão no Desktop: Fica na lateral do respectivo ícone, apontando para ele */}
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
        </div>
      </div>
    </section>
  );
}
