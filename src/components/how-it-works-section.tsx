import React from "react";
import { FileText, CheckCircle2, PenTool, TrendingUp } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Traga seus modelos em .docx",
      description:
        "Sem aprender editores complicados na nuvem e sem perder a formatação original do seu escritório. Basta adicionar marcadores simples como {{cliente_nome}}, {{valor_mensal}} e {{foro_cidade}} aos arquivos Word que você já utiliza.",
      highlight: "{{cliente_nome}} · Sem quebrar layout",
    },
    {
      number: "02",
      icon: CheckCircle2,
      title: "Gere minutas e aprove descontos",
      description:
        "Selecione o plano, preencha os dados e gere contratos em menos de 2 minutos. Se um vendedor conceder desconto acima do limite parametrizado, a aprovação formal pelo supervisor é solicitada automaticamente antes do envio.",
      highlight: "Alçada de supervisor & Governança",
    },
    {
      number: "03",
      icon: PenTool,
      title: "Assine com validade jurídica",
      description:
        "Integração nativa com ZapSign e Clicksign usando o seu próprio token de API (BYOT — sem custos adicionais do Tratto), além de suporte total ao modo manual com upload da via física assinada e escaneada.",
      highlight: "ZapSign · Clicksign · Modo Manual",
    },
    {
      number: "04",
      icon: TrendingUp,
      title: "Vigência, reajustes e parcelas",
      description:
        "Varredura diária de contratos a vencer e cálculo automático de reajustes oficiais de inflação (IPCA, IGP-M, INPC) conectados à API pública do Banco Central, com piso zero para deflação e controle de parcelas sem perda de centavos.",
      highlight: "API Oficial do Banco Central & Alertas",
    },
  ];

  return (
    <section id="como-funciona" className="py-20 sm:py-28 bg-[var(--bg-canvas)] transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 text-center">
        {/* Eyebrow / Chapéu Editorial */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] shadow-2xs">
          <span>●</span>
          <span>O Ciclo em 4 Passos</span>
        </div>

        {/* Título Principal */}
        <h2 className="mt-5 font-serif text-3xl sm:text-5xl italic font-semibold text-[var(--text-main)] leading-tight tracking-tight">
          Do modelo no Word ao reajuste anual automático
        </h2>

        {/* Subtítulo */}
        <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          Como o Tratto transforma a rotina contratual da sua empresa em um fluxo contínuo e previsível, sem exigir migrações dolorosas ou treinamentos longos.
        </p>

        {/* Grade dos 4 Passos */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-xs transition duration-300 hover:shadow-md hover:border-[var(--accent-primary)]/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                    <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[var(--accent-primary)]">
                      {step.number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-surface)] text-[var(--accent-primary)]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mt-5 font-sans text-lg sm:text-xl font-semibold text-[var(--text-main)] tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
                  <span className="inline-block rounded-md bg-[var(--accent-surface)] px-2.5 py-1 font-mono text-[11px] font-medium text-[var(--accent-primary)] border border-[var(--border-subtle)]">
                    {step.highlight}
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
