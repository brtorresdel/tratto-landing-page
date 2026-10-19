import React from "react";
import { Building2, Scale, Dumbbell, Calculator, Users, Sparkles } from "lucide-react";

export function AudienceSection() {
  const segments = [
    {
      icon: Building2,
      name: "Coworkings",
      description:
        "acordos de utilização do endereço fiscal, estações de trabalho, salas de reunião, e outros serviços adicionais;",
    },
    {
      icon: Scale,
      name: "Escritórios de advocacia",
      description:
        "atuação em processos em andamento, abertura de novos processos, consultorias, etc.;",
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
        "gestão de contratos dos funcionários, controle de cláusulas adicionais, e acompanhamento para controle completo de validades",
    },
    {
      icon: Sparkles,
      name: "Outros segmentos",
      description:
        "independente do que você faça na sua empresa, se precisa gerar contratos, a Tratto é o lugar certo!",
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
