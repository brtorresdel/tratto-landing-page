"use client";

import React, { useState } from "react";
import { ShieldCheck, History, Lock, FileSpreadsheet } from "lucide-react";
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
  const [activeSlice, setActiveSlice] = useState<number | null>(null);

  const pillars = [
    {
      id: 0,
      icon: ShieldCheck,
      title: "Isolamento Multi-tenant",
      badge: "organizationId validado no servidor",
      description:
        "O identificador da sua empresa nunca é confiado a partir do navegador. Toda requisição valida a sessão e isola os dados estritamente no servidor através da camada db.forOrg.",
      quadrant: "Superior Direito",
      angles: { start: 3, end: 87 },
      iconPos: { x: 220, y: 100 },
    },
    {
      id: 1,
      icon: History,
      title: "Rastreabilidade Imutável",
      badge: "AuditLog Append-only",
      description:
        "Toda ação relevante — emissão de contrato, aprovação formal de desconto por supervisor ou alteração de status — gera um registro somente-leitura com autoria, data/hora e IP.",
      quadrant: "Inferior Direito",
      angles: { start: 93, end: 177 },
      iconPos: { x: 220, y: 220 },
    },
    {
      id: 2,
      icon: Lock,
      title: "Conformidade com a LGPD",
      badge: "Privacidade por Design",
      description:
        "Respeito integral à privacidade dos seus clientes e signatários, sem rastreadores invasivos de publicidade e com soft delete universal para resguardar a integridade jurídica.",
      quadrant: "Inferior Esquerdo",
      angles: { start: 183, end: 267 },
      iconPos: { x: 100, y: 220 },
    },
    {
      id: 3,
      icon: FileSpreadsheet,
      title: "Portabilidade sem Lock-in",
      badge: "Exportação Aberta",
      description:
        "Seus contratos pertencem exclusivamente a você. Exporte cadastros, vigências e relatórios analíticos a qualquer instante em planilhas abertas (CSV e XLSX nativo).",
      quadrant: "Superior Esquerdo",
      angles: { start: 273, end: 357 },
      iconPos: { x: 100, y: 100 },
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
        {/* INFOGRÁFICO DE PIZZA DIVIDIDO EM 4 PARTES */}
        {/* =================================================================== */}
        <div className="mt-14 lg:mt-18 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* LADO ESQUERDO: Quadrantes 4 e 3 */}
          <div className="lg:col-span-4 flex flex-col gap-6 text-left order-2 lg:order-1">
            {/* Quadrante 4: Portabilidade sem Lock-in (Top-Left) */}
            <div
              onMouseEnter={() => setActiveSlice(3)}
              onMouseLeave={() => setActiveSlice(null)}
              className={clsx(
                "rounded-xl border p-5 sm:p-6 transition-all duration-300 shadow-xs cursor-pointer",
                activeSlice === 3
                  ? "border-[var(--accent-primary)] bg-[var(--accent-surface)] shadow-md translate-x-1"
                  : "border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)]"
              )}
            >
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-subtle)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-surface)] text-[var(--accent-primary)] shrink-0">
                  <FileSpreadsheet className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-sans text-base font-semibold text-[var(--text-main)] tracking-tight">
                  {pillars[3].title}
                </h3>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                {pillars[3].description}
              </p>
              <div className="mt-4 pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <span className="font-mono text-[11px] font-medium text-[var(--accent-primary)]">
                  {pillars[3].badge}
                </span>
                <span className="font-mono text-[10px] font-semibold text-[var(--text-muted)] bg-[var(--accent-surface)]/60 px-1.5 py-0.5 rounded">
                  Parte 4/4
                </span>
              </div>
            </div>

            {/* Quadrante 3: Conformidade com a LGPD (Bottom-Left) */}
            <div
              onMouseEnter={() => setActiveSlice(2)}
              onMouseLeave={() => setActiveSlice(null)}
              className={clsx(
                "rounded-xl border p-5 sm:p-6 transition-all duration-300 shadow-xs cursor-pointer",
                activeSlice === 2
                  ? "border-[var(--accent-primary)] bg-[var(--accent-surface)] shadow-md translate-x-1"
                  : "border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)]"
              )}
            >
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-subtle)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-surface)] text-[var(--accent-primary)] shrink-0">
                  <Lock className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-sans text-base font-semibold text-[var(--text-main)] tracking-tight">
                  {pillars[2].title}
                </h3>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                {pillars[2].description}
              </p>
              <div className="mt-4 pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <span className="font-mono text-[11px] font-medium text-[var(--accent-primary)]">
                  {pillars[2].badge}
                </span>
                <span className="font-mono text-[10px] font-semibold text-[var(--text-muted)] bg-[var(--accent-surface)]/60 px-1.5 py-0.5 rounded">
                  Parte 3/4
                </span>
              </div>
            </div>
          </div>

          {/* CENTRO: O GRÁFICO DE PIZZA DIVIDIDO EM 4 PARTES */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] select-none flex items-center justify-center">
              <svg viewBox="0 0 320 320" className="w-full h-full filter drop-shadow-sm">
                {pillars.map((pillar) => {
                  const pathData = describeArc(160, 160, 140, 68, pillar.angles.start, pillar.angles.end);
                  const isActive = activeSlice === pillar.id;

                  return (
                    <g
                      key={pillar.id}
                      className="cursor-pointer transition-transform duration-200"
                      onMouseEnter={() => setActiveSlice(pillar.id)}
                      onMouseLeave={() => setActiveSlice(null)}
                    >
                      <path
                        d={pathData}
                        className={clsx(
                          "transition-all duration-300 stroke-1 stroke-white/40",
                          isActive
                            ? "fill-[var(--accent-primary)] filter brightness-110"
                            : "fill-[var(--accent-surface)] hover:fill-[var(--accent-primary)]/80"
                        )}
                      />
                    </g>
                  );
                })}

                {/* Ícones desenhados no centro de cada fatia */}
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  const isActive = activeSlice === pillar.id;
                  return (
                    <foreignObject
                      key={`icon-${pillar.id}`}
                      x={pillar.iconPos.x - 14}
                      y={pillar.iconPos.y - 14}
                      width={28}
                      height={28}
                      className="pointer-events-none"
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon
                          className={clsx(
                            "h-4.5 w-4.5 transition-colors duration-200",
                            isActive ? "text-white" : "text-[var(--accent-primary)]"
                          )}
                        />
                      </div>
                    </foreignObject>
                  );
                })}
              </svg>

              {/* Miolo Central / Selo de Segurança */}
              <div className="absolute inset-0 m-auto h-24 w-24 sm:h-28 sm:w-28 rounded-full border-2 border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xs flex flex-col items-center justify-center text-center p-2 pointer-events-none">
                <ShieldCheck className="h-6 w-6 text-[var(--accent-primary)] mb-0.5" />
                <span className="font-sans text-[11px] font-bold text-[var(--text-main)] uppercase tracking-wider">
                  Tratto
                </span>
                <span className="font-mono text-[9px] text-[var(--accent-primary)] font-semibold">
                  100% Seguro
                </span>
              </div>
            </div>

            <p className="mt-3 font-mono text-xs text-[var(--text-muted)] flex items-center gap-1.5">
              <span>●</span>
              <span>4 pilares de integridade contínua</span>
            </p>
          </div>

          {/* LADO DIREITO: Quadrantes 1 e 2 */}
          <div className="lg:col-span-4 flex flex-col gap-6 text-left order-3">
            {/* Quadrante 1: Isolamento Multi-tenant (Top-Right) */}
            <div
              onMouseEnter={() => setActiveSlice(0)}
              onMouseLeave={() => setActiveSlice(null)}
              className={clsx(
                "rounded-xl border p-5 sm:p-6 transition-all duration-300 shadow-xs cursor-pointer",
                activeSlice === 0
                  ? "border-[var(--accent-primary)] bg-[var(--accent-surface)] shadow-md -translate-x-1"
                  : "border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)]"
              )}
            >
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-subtle)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-surface)] text-[var(--accent-primary)] shrink-0">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-sans text-base font-semibold text-[var(--text-main)] tracking-tight">
                  {pillars[0].title}
                </h3>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                {pillars[0].description}
              </p>
              <div className="mt-4 pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <span className="font-mono text-[11px] font-medium text-[var(--accent-primary)]">
                  {pillars[0].badge}
                </span>
                <span className="font-mono text-[10px] font-semibold text-[var(--text-muted)] bg-[var(--accent-surface)]/60 px-1.5 py-0.5 rounded">
                  Parte 1/4
                </span>
              </div>
            </div>

            {/* Quadrante 2: Rastreabilidade Imutável (Bottom-Right) */}
            <div
              onMouseEnter={() => setActiveSlice(1)}
              onMouseLeave={() => setActiveSlice(null)}
              className={clsx(
                "rounded-xl border p-5 sm:p-6 transition-all duration-300 shadow-xs cursor-pointer",
                activeSlice === 1
                  ? "border-[var(--accent-primary)] bg-[var(--accent-surface)] shadow-md -translate-x-1"
                  : "border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)]"
              )}
            >
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-subtle)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-surface)] text-[var(--accent-primary)] shrink-0">
                  <History className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-sans text-base font-semibold text-[var(--text-main)] tracking-tight">
                  {pillars[1].title}
                </h3>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                {pillars[1].description}
              </p>
              <div className="mt-4 pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <span className="font-mono text-[11px] font-medium text-[var(--accent-primary)]">
                  {pillars[1].badge}
                </span>
                <span className="font-mono text-[10px] font-semibold text-[var(--text-muted)] bg-[var(--accent-surface)]/60 px-1.5 py-0.5 rounded">
                  Parte 2/4
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
