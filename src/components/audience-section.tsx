import React from "react";
import {
  Building2,
  Scale,
  Dumbbell,
  Calculator,
  Users,
  Sparkles,
  Headphones,
  PenTool,
  Code2,
  Camera,
  Palette,
  Compass,
  Briefcase,
  Activity,
  Languages,
} from "lucide-react";

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

  const individualProfessionals = [
    { name: "DJs", icon: Headphones },
    { name: "Tatuadores", icon: PenTool },
    { name: "Desenvolvedores", icon: Code2 },
    { name: "Fotógrafos & Videomakers", icon: Camera },
    { name: "Designers & Ilustradores", icon: Palette },
    { name: "Arquitetos & Engenheiros", icon: Compass },
    { name: "Consultores & Mentores", icon: Briefcase },
    { name: "Personal Trainers", icon: Activity },
    { name: "Tradutores & Redatores", icon: Languages },
    { name: "Prestadores de serviços em geral", icon: Sparkles },
  ];

  return (
    <section id="para-quem-e" className="py-20 sm:py-28 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 text-center">
        {/* Título Principal */}
        <h2 className="font-serif text-3xl sm:text-5xl italic font-semibold text-[var(--text-main)] leading-tight tracking-tight">
          Afinal, pra quem é a Tratto?
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

        {/* Bloco de Profissionais Individuais */}
        <div className="mt-14 sm:mt-18 text-center">
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            E aqui nós não nos resumimos a empresas, profissionais individuais também têm um espaço na Tratto, incluindo:
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 text-left">
            {individualProfessionals.map((pro) => {
              const Icon = pro.icon;
              return (
                <div
                  key={pro.name}
                  className="flex items-center gap-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-2.5 shadow-2xs transition duration-200 hover:border-[var(--accent-primary)]/40 hover:bg-[var(--accent-surface)]/50"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent-surface)] text-[var(--accent-primary)] shrink-0">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-sans text-xs sm:text-sm font-medium text-[var(--text-main)] leading-tight">
                    {pro.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
