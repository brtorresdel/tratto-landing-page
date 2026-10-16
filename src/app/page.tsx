import React from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* Marcador de destino suave para a lista de espera (será expandido na Spec 0002) */}
        <section id="lista-de-espera" className="py-8 text-center">
          <div className="mx-auto max-w-xl px-4 text-xs text-[#526359]">
            {/* Âncora da Lista de Espera */}
          </div>
        </section>
      </main>

      {/* Seletor flutuante de temas pastéis (Sage Paper) */}
      <ThemeSwitcher />
    </div>
  );
}
