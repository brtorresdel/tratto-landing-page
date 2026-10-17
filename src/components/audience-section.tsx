import React from "react";
import { Building2, Briefcase, Dumbbell, Calculator, Sparkles } from "lucide-react";

export function AudienceSection() {
  const segments = [
    {
      icon: Building2,
      name: "Coworkings & Espaços",
      badge: "Planos & Estações",
      description:
        "Contratos de estações de trabalho, salas privativas e endereços fiscais com alta rotatividade de membros, aditivos rápidos e controle de ocupação.",
    },
    {
      icon: Briefcase,
      name: "Empresas de Serviços & Consultorias",
      badge: "Honorários & Escopo",
      description:
        "Formalização ágil de propostas comerciais, cláusulas de escopo técnico, horas adicionais e aprovação supervisionada de descontos.",
    },
    {
      icon: Dumbbell,
      name: "Academias, Estúdios & Escolas",
      badge: "Matrículas & Planos",
      description:
        "Termos de adesão semestrais e anuais, controle rigoroso de vigência, regras claras de cancelamento e cobrança justa de multas rescisórias.",
    },
    {
      icon: Calculator,
      name: "Contabilidade & BPO",
      badge: "Reajustes & Carteira",
      description:
        "Gestão centralizada de dezenas ou centenas de contratos de clientes, com aplicação obrigatória do reajuste anual de inflação (IPCA/IGP-M) sem esquecimentos.",
    },
  ];

  return (
    <section id="para-quem-e" className="py-20 sm:py-28 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 text-center">
        {/* Eyebrow / Chapéu Editorial */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] shadow-2xs">
          <span>●</span>
          <span>Versatilidade & Aderência</span>
        </div>

        {/* Título Principal */}
        <h2 className="mt-5 font-serif text-3xl sm:text-5xl italic font-semibold text-[var(--text-main)] leading-tight tracking-tight">
          Desenhado para quem vive de contratos, não importa o segmento
        </h2>

        {/* Subtítulo */}
        <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          A Tratto é uma plataforma genérica e flexível. Se a sua empresa presta serviços e formaliza relações em contrato, ela foi desenhada para eliminar o caos da sua rotina.
        </p>

        {/* Grade de Segmentos */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
          {segments.map((seg) => {
            const Icon = seg.icon;
            return (
              <div
                key={seg.name}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-7 shadow-xs transition duration-300 hover:shadow-md hover:border-[var(--accent-primary)]/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3.5 border-b border-[var(--border-subtle)]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-surface)] text-[var(--accent-primary)]">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <h3 className="font-sans text-base sm:text-lg font-semibold text-[var(--text-main)] tracking-tight">
                        {seg.name}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] uppercase font-semibold text-[var(--text-muted)] bg-black/5 px-2 py-0.5 rounded">
                      {seg.badge}
                    </span>
                  </div>

                  <p className="mt-3.5 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {seg.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bloco de Síntese Editorial */}
        <div className="mt-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--accent-surface)] p-6 sm:p-7 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-primary)] text-white shadow-xs">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base text-[var(--text-main)]">
                Não encontrou seu nicho específico?
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
                Clínicas, agências, escolas de idiomas, TI: qualquer contrato em .docx se adapta instantaneamente à Tratto.
              </p>
            </div>
          </div>
          <span className="shrink-0 font-mono text-xs font-semibold text-[var(--accent-primary)] border-b border-[var(--accent-primary)] pb-0.5">
            Sem amarras a nichos
          </span>
        </div>
      </div>
    </section>
  );
}
