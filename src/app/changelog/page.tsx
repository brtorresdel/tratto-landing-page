import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ScrollbarThemeSync } from '@/components/scrollbar-theme-sync';
import { getAllChangelogEntries } from '@/data/changelog';
import { ChangelogLikeButton } from '@/components/changelog-like-button';

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    'Acompanhe todas as atualizações, lançamentos de funcionalidades e bastidores da construção da Tratto.',
  alternates: {
    canonical: '/changelog',
  },
};

export default function ChangelogListingPage() {
  const entries = getAllChangelogEntries();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-canvas)] text-[var(--text-main)] transition-colors duration-300">
      <ScrollbarThemeSync />
      <Navbar />

      <main id="conteudo-principal" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* Cabeçalho Centralizado com Estilo das Seções da Home */}
        <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 pt-28 pb-12 sm:px-8 sm:pt-36 sm:pb-16 transition-colors duration-300">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-mono text-xs font-medium text-[var(--accent-primary)] hover:underline sm:text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar para a Tratto</span>
              </Link>
            </div>

            <div className="text-center">
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold italic text-[var(--text-main)] leading-tight tracking-tight">
                Changelog
              </h1>

              <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                Acompanhe a evolução contínua, os marcos de desenvolvimento e as melhorias da Tratto.
              </p>
            </div>
          </div>
        </section>

        {/* Linha do Tempo de Publicações */}
        <section className="px-4 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-0">
              {entries.map((entry) => (
                <article key={entry.date} className="flex gap-4 sm:gap-6 group">
                  {/* Coluna do eixo da Linha do Tempo: bolinha e linha perfeitamente centralizadas */}
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className="mt-6 flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full border-2 border-[var(--bg-canvas)] bg-[var(--accent-primary)] shadow-xs transition-transform duration-200 group-hover:scale-125 z-10"
                      aria-hidden="true"
                    />
                    <div className="w-0.5 flex-1 bg-[var(--border-subtle)]" aria-hidden="true" />
                  </div>

                  {/* Conteúdo do Card (sem imagem e sem a pill de categoria) */}
                  <div className="flex-1 pb-10 sm:pb-12">
                    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-7 shadow-xs transition-all duration-300 hover:border-[var(--border-strong)] hover:shadow-sm">
                      <div className="flex items-center justify-between gap-3">
                        <time
                          dateTime={entry.date}
                          className="font-mono text-xs font-medium text-[var(--text-muted)] sm:text-sm"
                        >
                          {entry.displayDate}
                        </time>
                      </div>

                      <h2 className="mt-3 font-serif text-xl sm:text-2xl font-semibold italic tracking-tight text-[var(--text-main)]">
                        <Link
                          href={`/changelog/${entry.date}`}
                          className="hover:text-[var(--accent-primary)] transition-colors"
                        >
                          {entry.title}
                        </Link>
                      </h2>

                      <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                        {entry.teaser}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-4">
                        <Link
                          href={`/changelog/${entry.date}`}
                          aria-label={`Ler publicação de ${entry.displayDate}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-primary)] hover:underline"
                        >
                          <span>Ler publicação completa</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>

                        <ChangelogLikeButton
                          date={entry.date}
                          initialCount={entry.initialLikes}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {/* Linha Exclusiva: Início do desenvolvimento da Tratto */}
              <div className="flex gap-4 sm:gap-6 group">
                {/* Eixo do Marco Zero: linha contínua que conecta na bolinha terminal */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-0.5 h-6 bg-[var(--border-subtle)]" aria-hidden="true" />
                  <div
                    className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full border-2 border-[var(--bg-canvas)] bg-[var(--accent-primary)] shadow-xs z-10"
                    aria-hidden="true"
                  />
                </div>

                {/* Card do Marco Zero */}
                <div className="flex-1">
                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="font-mono text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
                        Marco Zero
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-semibold italic text-[var(--text-main)] mt-0.5">
                        Início do desenvolvimento da Tratto
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      Outubro de 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
