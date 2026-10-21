import React from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProblemBanner } from "@/components/problem-banner";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { AudienceSection } from "@/components/audience-section";
import { SecuritySection } from "@/components/security-section";
import { FaqSection } from "@/components/faq-section";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-canvas)] transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProblemBanner />
        <HowItWorksSection />
        <AudienceSection />
        <SecuritySection />
        <FaqSection />

        {/* Marcador de destino suave para a lista de espera (será expandido na Spec 0003) */}
        <section id="lista-de-espera" className="py-12 text-center bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)]">
          <div className="mx-auto max-w-xl px-4 text-xs font-mono text-[var(--text-muted)]">
            <span>● Formulário da Lista de Espera em Preparação (Spec 0003) ●</span>
          </div>
        </section>
      </main>

      {/* Seletor flutuante de temas pastéis (Sage Paper) */}
      <ThemeSwitcher />
    </div>
  );
}
