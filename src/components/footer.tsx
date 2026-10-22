'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="rodape"
      className="relative z-10 bg-[var(--accent-primary)]/85 text-white border-t border-white/15 py-14 sm:py-20 transition-colors duration-300 shadow-[0_-12px_28px_rgba(14,18,16,0.08)]"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* Bloco Superior com Marca e Navegação */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/15">
          <div className="space-y-3 max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="Página Inicial da Tratto">
              <img
                src="/icon.svg"
                alt="Ícone Tratto"
                width={32}
                height={32}
                className="h-8 w-8 brightness-200 transition-transform group-hover:scale-105"
              />
              <span className="font-serif italic text-2xl font-semibold tracking-tight text-white">
                Tratto
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Criação e gestão de contratos a partir dos seus modelos .docx, com rastreabilidade total e cálculo de reajustes.
            </p>
          </div>

          {/* Links de Navegação Rápida */}
          <nav aria-label="Navegação do rodapé" className="flex flex-wrap gap-x-6 gap-y-3 text-xs sm:text-sm text-white/85">
            <a href="#como-funciona" className="hover:text-white transition-colors">
              Como funciona
            </a>
            <a href="#segmentos" className="hover:text-white transition-colors">
              Segmentos
            </a>
            <a href="#seguranca" className="hover:text-white transition-colors">
              Segurança
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              Dúvidas
            </a>
            <a href="#lista-de-espera" className="hover:text-white font-medium transition-colors">
              Lista de espera
            </a>
          </nav>
        </div>

        {/* Bloco Inferior com Créditos e Direitos */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>© {currentYear} Tratto. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2">
            <span>Desenvolvido por</span>
            <span className="font-medium text-white/90">Bruno Torres</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
