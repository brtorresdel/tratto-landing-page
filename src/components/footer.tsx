'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { TrattoWordmark } from './tratto-wordmark';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="rodape"
      role="contentinfo"
      className="relative z-20 bg-[var(--accent-surface)] text-[var(--text-main)] border-t border-[var(--border-subtle)] py-14 sm:py-20 transition-colors duration-300 shadow-[0_-16px_36px_rgba(14,18,16,0.14)]"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* Bloco Superior em 3 Colunas Editoriais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 pb-12 border-b border-[var(--border-subtle)]">
          {/* Coluna 1: Identidade & Síntese */}
          <div className="space-y-4 flex flex-col items-center text-center">
            <Link href="/" className="inline-flex items-center group" aria-label="Página Inicial da Tratto">
              <TrattoWordmark className="h-13 sm:h-15 md:h-16 w-auto transition-transform duration-200 group-hover:-translate-y-1" />
            </Link>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              A forma mais simples de gerar, organizar e acompanhar contratos a partir dos seus próprios modelos.
            </p>
          </div>

          {/* Coluna 2: Sobre a Tratto */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-main)]">
              Sobre a Tratto
            </h4>
            <nav aria-label="Navegação do rodapé" className="flex flex-col space-y-2 text-xs text-[var(--text-muted)]">
              <a href="#o-problema" className="hover:text-[var(--accent-primary)] transition-colors">
                Carta do Dev
              </a>
              <a href="#como-funciona" className="hover:text-[var(--accent-primary)] transition-colors">
                Como funciona
              </a>
              <a href="#segmentos" className="hover:text-[var(--accent-primary)] transition-colors">
                Segmentos
              </a>
              <a href="#seguranca" className="hover:text-[var(--accent-primary)] transition-colors">
                Segurança
              </a>
              <a href="#faq" className="hover:text-[var(--accent-primary)] transition-colors">
                Dúvidas
              </a>
              <a href="#lista-de-espera" className="hover:text-[var(--accent-primary)] transition-colors">
                Lista de espera
              </a>
            </nav>
          </div>

          {/* Coluna 3: Criador (alinhada à direita no desktop) */}
          <div className="space-y-4 md:text-right flex flex-col md:items-end justify-center">
            {/* Foto com borda na cor do tema e identificação */}
            <div className="flex items-center md:flex-row-reverse gap-3.5">
              <img
                src="/bruno-torres.webp"
                alt="Foto de Bruno Torres"
                className="h-13 sm:h-15 md:h-16 w-13 sm:w-15 md:w-16 rounded-full object-cover border-2 border-[var(--accent-primary)] shadow-sm shrink-0"
              />
              <div className="text-left md:text-right">
                <p className="text-xs text-[var(--text-muted)] leading-snug">
                  <strong className="text-[var(--text-main)] font-semibold text-sm sm:text-base block">
                    Bruno Torres
                  </strong>
                  <span className="font-mono text-[11px] text-[var(--text-muted)] leading-tight block pt-0.5">
                    <span>Desenvolvedor Fullstack &amp;</span>
                    <br />
                    <span>Criador da Tratto</span>
                  </span>
                </p>
              </div>
            </div>

            {/* Links das Redes Sociais na horizontal com efeito de hover subindo */}
            <div className="flex flex-row flex-wrap items-center gap-4 text-xs md:justify-end pt-1">
              <a
                href="https://www.devtorres.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:font-medium transition-colors"
              >
                <span>Portfólio</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="https://www.linkedin.com/in/brtorresdel/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:font-medium transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="https://github.com/brtorresdel"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:font-medium transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bloco Inferior: Copyright & Status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>Tratto © {currentYear}. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Projeto em andamento</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
