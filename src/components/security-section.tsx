"use client";

import React, { useState } from "react";
import { ShieldCheck, History, Lock, FileSpreadsheet, Sparkles } from "lucide-react";
import clsx from "clsx";

function describeArc(
  cx: number,
  cy: number,
  rExt: number,
  rInt: number,
  startAngle: number,
  endAngle: number
) {
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const a1 = toRad(startAngle);
  const a2 = toRad(endAngle);

  const x1 = cx + rExt * Math.cos(a1);
  const y1 = cy + rExt * Math.sin(a1);
  const x2 = cx + rExt * Math.cos(a2);
  const y2 = cy + rExt * Math.sin(a2);

  const x3 = cx + rInt * Math.cos(a2);
  const y3 = cy + rInt * Math.sin(a2);
  const x4 = cx + rInt * Math.cos(a1);
  const y4 = cy + rInt * Math.sin(a1);

  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${x1} ${y1} A ${rExt} ${rExt} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInt} ${rInt} 0 ${largeArc} 0 ${x4} ${y4} Z`;
}

export function SecuritySection() {
  // Mantém a fatia selecionada (por padrão a fatia 0, ou alterna por hover/clique)
  const [activeSlice, setActiveSlice] = useState<number | null>(0);

  const pillars = [
    {
      id: 0,
      icon: ShieldCheck,
      title: "Isolamento Multi-tenant",
      badge: "organizationId validado no servidor",
      description:
        "O identificador da sua empresa nunca é confiado a partir do navegador. Toda requisição valida a sessão e isola os dados estritamente no servidor através da camada db.forOrg.",
      angles: { start: 3, end: 87 },
      // Centro geométrico exato em viewBox 400x400 (rMid = 122.5)
      iconPos: { x: 286.6, y: 113.4 },
    },
    {
      id: 1,
      icon: History,
      title: "Rastreabilidade Imutável",
      badge: "AuditLog Append-only",
      description:
        "Toda ação relevante — emissão de contrato, aprovação formal de desconto por supervisor ou alteração de status — gera um registro somente-leitura com autoria, data/hora e IP.",
      angles: { start: 93, end: 177 },
      iconPos: { x: 286.6, y: 286.6 },
    },
    {
      id: 2,
      icon: Lock,
      title: "Conformidade com a LGPD",
      badge: "Privacidade por Design",
      description:
        "Respeito integral à privacidade dos seus clientes e signatários, sem rastreadores invasivos de publicidade e com soft delete universal para resguardar a integridade jurídica.",
      angles: { start: 183, end: 267 },
      iconPos: { x: 113.4, y: 286.6 },
    },
    {
      id: 3,
      icon: FileSpreadsheet,
      title: "Portabilidade sem Lock-in",
      badge: "Exportação Aberta",
      description:
        "Seus contratos pertencem exclusivamente a você. Exporte cadastros, vigências e relatórios analíticos a qualquer instante em planilhas abertas (CSV e XLSX nativo).",
      angles: { start: 273, end: 357 },
      iconPos: { x: 113.4, y: 113.4 },
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
        <div className="mt-14 sm:mt-18 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center min-h-[460px]">
          {/* LADO ESQUERDO: Balões do Q3 (Portabilidade) e Q2 (LGPD) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4 sm:gap-6 text-left order-2 lg:order-1">
            {[pillars[3], pillars[2]].map((pillar) => {
              const isActive = activeSlice === pillar.id;
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  onMouseEnter={() => setActiveSlice(pillar.id)}
                  onClick={() => setActiveSlice(pillar.id)}
                  className={clsx(
                    "relative rounded-2xl border p-5 sm:p-6 transition-all duration-300 shadow-md cursor-pointer",
                    isActive
                      ? "border-[var(--accent-primary)] bg-[var(--bg-card)] opacity-100 scale-100 shadow-lg ring-1 ring-[var(--accent-primary)]/20"
                      : "border-[var(--border-subtle)] bg-[var(--bg-card)]/70 opacity-35 scale-98 hover:opacity-75 max-lg:hidden"
                  )}
                >
                  {/* Rabicho de fala apontando para o gráfico no desktop (à direita) */}
                  <div
                    className={clsx(
                      "hidden lg:block absolute top-8 -right-2 h-4 w-4 rotate-45 border-r border-t transition-colors",
                      isActive
                        ? "border-[var(--accent-primary)] bg-[var(--bg-card)]"
                        : "border-[var(--border-subtle)] bg-[var(--bg-card)]"
                    )}
                  />

                  {/* Rabicho de fala apontando para o gráfico no mobile (ao topo) */}
                  <div
                    className={clsx(
                      "lg:hidden absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rotate-45 border-l border-t transition-colors",
                      isActive
                        ? "border-[var(--accent-primary)] bg-[var(--bg-card)]"
                        : "border-[var(--border-subtle)] bg-[var(--bg-card)]"
                    )}
                  />

                  <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-subtle)]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-surface)] text-[var(--accent-primary)] shrink-0">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="font-sans text-base font-semibold text-[var(--text-main)] tracking-tight">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {pillar.description}
                  </p>
                  <div className="mt-4 pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="font-mono text-[11px] font-medium text-[var(--accent-primary)]">
                      {pillar.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CENTRO: O GRÁFICO DE PIZZA AMPLIADO (400x400) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] xl:w-[400px] xl:h-[400px] select-none flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full h-full filter drop-shadow-sm">
                {pillars.map((pillar) => {
                  const pathData = describeArc(200, 200, 175, 72, pillar.angles.start, pillar.angles.end);
                  const isActive = activeSlice === pillar.id;

                  return (
                    <g
                      key={pillar.id}
                      className="cursor-pointer transition-transform duration-200"
                      onMouseEnter={() => setActiveSlice(pillar.id)}
                      onClick={() => setActiveSlice(pillar.id)}
                    >
                      <path
                        d={pathData}
                        className={clsx(
                          "transition-all duration-300 stroke-2 stroke-[var(--bg-canvas)]",
                          isActive
                            ? "fill-[var(--accent-primary)] filter brightness-105"
                            : "fill-[var(--accent-surface)] hover:fill-[var(--accent-primary)]/80"
                        )}
                      />
                    </g>
                  );
                })}

                {/* Ícones rigorosamente centralizados no meio de cada quadrante */}
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  const isActive = activeSlice === pillar.id;
                  return (
                    <foreignObject
                      key={`icon-${pillar.id}`}
                      x={pillar.iconPos.x - 18}
                      y={pillar.iconPos.y - 18}
                      width={36}
                      height={36}
                      className="pointer-events-none"
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon
                          className={clsx(
                            "h-6 w-6 transition-colors duration-200",
                            isActive ? "text-white" : "text-[var(--accent-primary)]"
                          )}
                        />
                      </div>
                    </foreignObject>
                  );
                })}
              </svg>

              {/* Miolo Central / Selo de Segurança */}
              <div className="absolute inset-0 m-auto h-28 w-28 xl:h-32 xl:w-32 rounded-full border-2 border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xs flex flex-col items-center justify-center text-center p-2 pointer-events-none">
                <ShieldCheck className="h-7 w-7 text-[var(--accent-primary)] mb-1" />
                <span className="font-sans text-xs font-bold text-[var(--text-main)] uppercase tracking-wider">
                  Tratto
                </span>
                <span className="font-mono text-[10px] text-[var(--accent-primary)] font-semibold">
                  100% Seguro
                </span>
              </div>
            </div>

            <p className="mt-3 font-mono text-xs text-[var(--text-muted)] flex items-center gap-1.5 lg:hidden">
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              <span>Toque em uma fatia para ver os detalhes</span>
            </p>
          </div>

          {/* LADO DIREITO: Balões do Q0 (Isolamento) e Q1 (Rastreabilidade) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4 sm:gap-6 text-left order-3">
            {[pillars[0], pillars[1]].map((pillar) => {
              const isActive = activeSlice === pillar.id;
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  onMouseEnter={() => setActiveSlice(pillar.id)}
                  onClick={() => setActiveSlice(pillar.id)}
                  className={clsx(
                    "relative rounded-2xl border p-5 sm:p-6 transition-all duration-300 shadow-md cursor-pointer",
                    isActive
                      ? "border-[var(--accent-primary)] bg-[var(--bg-card)] opacity-100 scale-100 shadow-lg ring-1 ring-[var(--accent-primary)]/20"
                      : "border-[var(--border-subtle)] bg-[var(--bg-card)]/70 opacity-35 scale-98 hover:opacity-75 max-lg:hidden"
                  )}
                >
                  {/* Rabicho de fala apontando para o gráfico no desktop (à esquerda) */}
                  <div
                    className={clsx(
                      "hidden lg:block absolute top-8 -left-2 h-4 w-4 rotate-45 border-l border-b transition-colors",
                      isActive
                        ? "border-[var(--accent-primary)] bg-[var(--bg-card)]"
                        : "border-[var(--border-subtle)] bg-[var(--bg-card)]"
                    )}
                  />

                  {/* Rabicho de fala apontando para o gráfico no mobile (ao topo) */}
                  <div
                    className={clsx(
                      "lg:hidden absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rotate-45 border-l border-t transition-colors",
                      isActive
                        ? "border-[var(--accent-primary)] bg-[var(--bg-card)]"
                        : "border-[var(--border-subtle)] bg-[var(--bg-card)]"
                    )}
                  />

                  <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-subtle)]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-surface)] text-[var(--accent-primary)] shrink-0">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="font-sans text-base font-semibold text-[var(--text-main)] tracking-tight">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {pillar.description}
                  </p>
                  <div className="mt-4 pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="font-mono text-[11px] font-medium text-[var(--accent-primary)]">
                      {pillar.badge}
                    </span>
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
