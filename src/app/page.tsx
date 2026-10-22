import React from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProblemBanner } from "@/components/problem-banner";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { AudienceSection } from "@/components/audience-section";
import { SecuritySection } from "@/components/security-section";
import { FaqSection } from "@/components/faq-section";
import { WaitlistSection } from "@/components/waitlist-section";
import { Footer } from "@/components/footer";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ScrollbarThemeSync } from "@/components/scrollbar-theme-sync";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-canvas)] transition-colors duration-300">
      <ScrollbarThemeSync />
      <Navbar />
      <main id="conteudo-principal" tabIndex={-1} className="flex-1 focus:outline-none">
        <Hero />
        <ProblemBanner />
        <HowItWorksSection />
        <AudienceSection />
        <SecuritySection />
        <FaqSection />
        <WaitlistSection />
      </main>

      {/* Rodapé temporário estilizado (estilo Carta do Dev, tom suave) */}
      <Footer />

      {/* Seletor flutuante de temas pastéis (Sage Paper) */}
      <ThemeSwitcher />
    </div>
  );
}
