import React from "react";

export function Navbar() {
  return (
    <header
      role="banner"
      className="fixed inset-x-0 top-4 z-50 mx-auto w-[92%] max-w-5xl transition-all sm:top-6"
    >
      <div className="flex h-14 items-center justify-between rounded-full border border-[var(--border-subtle)] bg-white/80 px-4 shadow-[0_4px_24px_rgba(14,18,16,0.06)] backdrop-blur-md sm:h-16 sm:px-6">
        {/* Ícone Oficial (The Executive T) */}
        <a
          href="/"
          className="group flex items-center gap-2 transition hover:opacity-90"
          aria-label="Página Inicial da Tratto"
        >
          <img
            src="/icon.svg"
            alt="Ícone Tratto"
            width={34}
            height={34}
            className="h-8 w-8 transition-transform group-hover:scale-105"
          />
        </a>

        {/* Links Centrais Sutis (Desktop) */}
        <nav
          aria-label="Navegação rápida"
          className="hidden items-center gap-6 text-xs font-medium text-[var(--text-muted)] md:flex sm:text-sm"
        >
          <a href="#como-funciona" className="transition hover:text-[var(--text-main)]">
            Como funciona
          </a>
          <a href="#segmentos" className="transition hover:text-[var(--text-main)]">
            Segmentos
          </a>
          <a href="#seguranca" className="transition hover:text-[var(--text-main)]">
            Segurança
          </a>
          <a href="#faq" className="transition hover:text-[var(--text-main)]">
            Dúvidas
          </a>
        </nav>

        {/* Botão de Conversão em Pílula Dinâmico */}
        <div className="flex items-center gap-2">
          <a
            href="#lista-de-espera"
            className="inline-flex items-center justify-center rounded-full bg-[var(--accent-primary)] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:opacity-90 active:scale-[0.98] sm:text-sm"
          >
            Entrar na lista →
          </a>
        </div>
      </div>
    </header>
  );
}
