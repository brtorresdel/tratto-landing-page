import React from "react";
import { ShieldCheck, History, Lock, FileSpreadsheet } from "lucide-react";

export function SecuritySection() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Isolamento Multi-tenant",
      badge: "organizationId validado no servidor",
      description:
        "O identificador da sua empresa nunca é confiado a partir do navegador. Toda requisição valida a sessão e isola os dados estritamente no servidor através da camada db.forOrg.",
    },
    {
      icon: History,
      title: "Rastreabilidade Imutável",
      badge: "AuditLog Append-only",
      description:
        "Toda ação relevante — emissão de contrato, aprovação formal de desconto por supervisor ou alteração de status — gera um registro somente-leitura com autoria, data/hora e IP.",
    },
    {
      icon: Lock,
      title: "Conformidade com a LGPD",
      badge: "Privacidade por Design",
      description:
        "Respeito integral à privacidade dos seus clientes e signatários, sem rastreadores invasivos de publicidade e com soft delete universal para resguardar a integridade jurídica.",
    },
    {
      icon: FileSpreadsheet,
      title: "Portabilidade sem Lock-in",
      badge: "Exportação Aberta",
      description:
        "Seus contratos pertencem exclusivamente a você. Exporte cadastros, vigências e relatórios analíticos a qualquer instante em planilhas abertas (CSV e XLSX nativo).",
    },
  ];

  return (
    <section id="seguranca" className="py-20 sm:py-28 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 text-center">
        {/* Eyebrow / Chapéu Editorial */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] shadow-2xs">
          <span>●</span>
          <span>Privacidade & Governança</span>
        </div>

        {/* Título Principal */}
        <h2 className="mt-5 font-serif text-3xl sm:text-5xl italic font-semibold text-[var(--text-main)] leading-tight tracking-tight">
          Construído com o rigor que documentos jurídicos exigem
        </h2>

        {/* Subtítulo */}
        <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          Contratos contêm valores de faturamento, dados pessoais de partes e tokens de assinatura. Segurança técnica e rastreabilidade não são itens opcionais: são o núcleo do Tratto.
        </p>

        {/* Grade dos 4 Pilares */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-xs transition duration-300 hover:shadow-md hover:border-[var(--accent-primary)]/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3.5 border-b border-[var(--border-subtle)]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-surface)] text-[var(--accent-primary)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-sans text-base sm:text-lg font-semibold text-[var(--text-main)] tracking-tight">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-[var(--border-subtle)]">
                  <span className="font-mono text-[11px] font-medium text-[var(--accent-primary)]">
                    {pillar.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
