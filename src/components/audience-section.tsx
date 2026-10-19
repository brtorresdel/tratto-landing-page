import React from "react";
import { Building2, Scale, Dumbbell, Calculator, Users, Sparkles } from "lucide-react";

export function AudienceSection() {
  const segments = [
    {
      icon: Building2,
      name: "Coworkings",
      description:
        "Acordos de utilização do endereço fiscal, estações de trabalho, salas de reunião, e outros serviços adicionais;",
    },
    {
      icon: Scale,
      name: "Escritórios de advocacia",
      description:
        "Atuação em processos em andamento, abertura de novos processos, consultorias, etc.;",
    },
    {
      icon: Dumbbell,
      name: "Academias, Estúdios & Escolas",
      description:
        "Termos de adesão semestrais e anuais, controle rigoroso de vigência, regras claras de cancelamento e cobrança justa de multas rescisórias;",
    },
    {
      icon: Calculator,
      name: "Contabilidade & BPO",
      description:
        "Gestão centralizada de dezenas ou centenas de contratos de clientes, com aplicação obrigatória do reajuste anual de inflação (IPCA/IGP-M) sem esquecimentos;",
    },
    {
      icon: Users,
      name: "RH & Compliance",
      description:
        "Gestão de contratos dos funcionários, controle de cláusulas adicionais, e acompanhamento para controle completo de validades;",
    },
    {
      icon: Sparkles,
      name: "Outros segmentos",
      description:
        "Independentemente do ramo de atuação da sua empresa, se você precisa formalizar e gerenciar contratos, a Tratto se adapta com total precisão à sua rotina.",
    },
  ];

  return (
    <section id="para-quem-e" className="py-20 sm:py-28 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 text-center">
        {/* Título Principal */}
        <h2 className="font-serif text-3xl sm:text-5xl italic font-semibold text-[var(--text-main)] leading-tight tracking-tight">
          Afinal, pra que é a Tratto?
        </h2>

        {/* Subtítulo */}
        <p className="mt-4 mx-auto max-w-3xl text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          Quando pensamos em contrato, imaginamos uma infinidade de segmentos e empresas que se encaixam nessa ideia. E a Tratto segue perfeitamente esse caminho, pois é uma plataforma dinâmica que se adapta todos os modelos e termos. Aqui alguns exemplos:
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
                  <div className="flex items-center gap-3 pb-3.5 border-b border-[var(--border-subtle)]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-surface)] text-[var(--accent-primary)] shrink-0">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="font-sans text-base sm:text-lg font-semibold text-[var(--text-main)] tracking-tight">
                      {seg.name}
                    </h3>
                  </div>

                  <p className="mt-3.5 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {seg.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
