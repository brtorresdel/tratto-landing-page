import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ScrollbarThemeSync } from '@/components/scrollbar-theme-sync';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-canvas)] text-[var(--text-main)] transition-colors duration-300">
      <ScrollbarThemeSync />
      <Navbar />

      <main
        id="conteudo-principal"
        tabIndex={-1}
        className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-8 focus:outline-none"
      >
        <div className="mx-auto max-w-lg">
          <span className="font-mono text-sm font-semibold tracking-wider text-[var(--accent-primary)] uppercase">
            Erro 404
          </span>

          <h1 className="mt-2 text-7xl font-bold tracking-tight sm:text-8xl text-[var(--text-main)]">
            404
          </h1>

          <p className="mt-4 font-serif text-2xl font-semibold italic text-[var(--text-main)] sm:text-3xl">
            Este documento não foi encontrado no arquivo.
          </p>

          <p className="mt-3 text-sm text-[var(--text-muted)] sm:text-base">
            O link que você seguiu pode estar quebrado, desatualizado ou a página pode ter sido
            movida para outro endereço.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-medium text-white shadow-xs transition-colors hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar para o início</span>
            </Link>

            <Link
              href="/changelog"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-5 py-2.5 text-sm font-medium text-[var(--text-main)] shadow-xs transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--accent-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2"
            >
              <BookOpen className="h-4 w-4 text-[var(--accent-primary)]" />
              <span>Ver todas as atualizações</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
