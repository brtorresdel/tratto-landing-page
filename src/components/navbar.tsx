'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const NAV_LINKS = [
  { href: '#o-problema', label: 'Carta do Dev' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#segmentos', label: 'Segmentos' },
  { href: '#seguranca', label: 'Segurança' },
  { href: '#faq', label: 'Dúvidas' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const navRef = useRef<HTMLElement>(null);

  // Scroll Spy: Observa a seção visível na tela
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const sectionIds = ['o-problema', 'como-funciona', 'segmentos', 'seguranca', 'faq', 'lista-de-espera'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Fechar menu mobile ao pressionar Escape ou clicar fora
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Skip to Content link acessível para leitores de tela e navegação por teclado */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[var(--accent-primary)] focus:px-4 focus:py-2.5 focus:text-xs focus:font-semibold focus:text-white focus:shadow-md focus:outline-none"
      >
        Pular para o conteúdo principal
      </a>

      <header
        ref={navRef}
        role="banner"
        className="fixed inset-x-0 top-3 sm:top-5 z-50 mx-auto w-[92%] max-w-5xl transition-all"
      >
        <div className="relative flex h-14 sm:h-16 items-center justify-between rounded-full border border-[var(--border-subtle)] bg-white/85 px-4 sm:px-6 shadow-[0_4px_24px_rgba(14,18,16,0.06)] backdrop-blur-md transition-colors duration-300">
          {/* Logotipo Oficial Tratto */}
          <Link
            href="/"
            className="group flex items-center gap-2 transition hover:opacity-90"
            aria-label="Página Inicial da Tratto"
          >
            <img
              src="/icon.svg"
              alt="Ícone Tratto"
              width={34}
              height={34}
              className="h-7 w-7 sm:h-8 sm:w-8 transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Links Centrais Sutis (Desktop >= 768px) com sublinhado no hover e escala no selecionado */}
          <nav
            aria-label="Navegação rápida"
            className="hidden md:flex items-center gap-5 lg:gap-6"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'group/nav relative py-1 transition-all duration-300 select-none',
                    isActive
                      ? 'text-sm font-semibold text-[var(--accent-primary)] scale-105'
                      : 'text-xs sm:text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  )}
                >
                  <span>{link.label}</span>
                  {/* Linha abaixo da opção ao passar o mouse ou quando ativa (cor do tema) */}
                  <span
                    className={clsx(
                      'absolute bottom-0 left-0 h-0.5 bg-[var(--accent-primary)] transition-all duration-300 ease-out',
                      isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'
                    )}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </nav>

          {/* Bloco à Direita: CTA Desktop (apenas md+) + Botão Hambúrguer Mobile/Tablet (< md) */}
          <div className="flex items-center gap-2">
            <a
              href="#lista-de-espera"
              className="group hidden md:inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-primary)] px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:opacity-90 active:scale-[0.98]"
            >
              <span>Entrar na lista</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Botão de Alternância do Menu Mobile & Tablet (< md) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-white/90 text-[var(--text-main)] transition-colors hover:bg-[var(--border-subtle)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Menu Gaveta Suspenso Mobile & Tablet (< 768px) com animação suave de descida e opacidade */}
        <div
          className={clsx(
            'mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-white/95 p-4 shadow-[0_12px_32px_rgba(14,18,16,0.1)] backdrop-blur-lg md:hidden transition-all duration-300 ease-out origin-top',
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto visible scale-100'
              : 'opacity-0 -translate-y-3 pointer-events-none invisible scale-98'
          )}
        >
          <nav aria-label="Menu móvel" className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={clsx(
                    'group/mob relative rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[var(--border-subtle)]/30 flex items-center justify-between',
                    isActive
                      ? 'font-bold text-[var(--accent-primary)] bg-[var(--accent-surface)]/40'
                      : 'font-medium text-[var(--text-main)]'
                  )}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]" />
                  )}
                </a>
              );
            })}
            <div className="pt-2">
              <a
                href="#lista-de-espera"
                onClick={handleLinkClick}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent-primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition active:scale-[0.98]"
              >
                <span>Entrar na lista</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
