import React from "react";
import Image from "next/image";

export function Navbar() {
  return (
    <header
      role="banner"
      className="sticky top-0 z-50 w-full border-b border-[#D2E0D6] bg-[#EBF2ED]/90 backdrop-blur-md transition-colors"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
        <a href="/" className="flex items-center gap-2" aria-label="Página Inicial do Tratto">
          {/* Usamos tag img com dimensões para compatibilidade com testes e svg local */}
          <img
            src="/logo.svg"
            alt="Logotipo Tratto"
            width={110}
            height={32}
            className="h-8 w-auto"
          />
        </a>

        <nav className="flex items-center gap-3">
          <a
            href="#lista-de-espera"
            className="inline-flex items-center justify-center rounded-md bg-[#24523B] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#1E4D35] active:scale-[0.98] sm:text-sm"
          >
            Entrar na lista →
          </a>
        </nav>
      </div>
    </header>
  );
}
