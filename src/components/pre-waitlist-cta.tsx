import React from "react";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export function PreWaitlistCta() {
  return (
    <section className="py-20 sm:py-28 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 sm:p-14 shadow-sm text-center relative overflow-hidden">
          {/* Decoração sutil de fundo sem gradiente neon */}
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[var(--accent-surface)]/50 blur-3xl -z-10" />

          {/* Eyebrow / Chapéu Editorial */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--accent-surface)] px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] shadow-2xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Vagas Antecipadas & Comunidade Fundadora</span>
          </div>

          {/* Título Principal */}
          <h2 className="mt-6 font-serif text-3xl sm:text-5xl italic font-semibold text-[var(--text-main)] leading-tight tracking-tight">
            Chega de perder tempo e dinheiro com contratos no improviso
          </h2>

          {/* Subtítulo */}
          <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            O Tratto está sendo construído para colocar a criação, assinatura e o reajuste anual de contratos no piloto automático. Garanta seu lugar na lista de espera para testar primeiro e receber condições fundadoras permanentes.
          </p>

          {/* Botão de Ação Suave para a Âncora */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#lista-de-espera"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 cursor-pointer"
            >
              <span>Garantir vaga na lista de espera</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Microcópia Editorial e Selos */}
          <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]/70 flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--text-muted)] font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              <span>Acesso prioritário no pré-lançamento</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              <span>Condições fundadoras permanentes</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              <span>Sem spam ou letras miúdas</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
