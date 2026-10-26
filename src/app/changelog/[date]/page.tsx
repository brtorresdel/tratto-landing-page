import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ScrollbarThemeSync } from '@/components/scrollbar-theme-sync';
import { getAllChangelogEntries, getChangelogEntryByDate } from '@/data/changelog';
import { ChangelogLikeButton } from '@/components/changelog-like-button';
import { ChangelogMedia } from '@/components/changelog-media';
import { SupabaseChangelogLikesRepository } from '@/lib/changelog-likes-repository';

interface ChangelogDetailPageProps {
  params: Promise<{ date: string }>;
}

export function generateStaticParams() {
  const entries = getAllChangelogEntries();
  return entries.map((entry) => ({
    date: entry.date,
  }));
}

export async function generateMetadata({
  params,
}: ChangelogDetailPageProps): Promise<Metadata> {
  const { date } = await params;
  const entry = getChangelogEntryByDate(date);

  if (!entry) {
    return {
      title: 'Publicação não encontrada | Tratto',
    };
  }

  return {
    title: `${entry.title} — Changelog`,
    description: entry.teaser,
    alternates: {
      canonical: `/changelog/${entry.date}`,
    },
    openGraph: {
      title: `${entry.title} — Changelog | Tratto`,
      description: entry.teaser,
      url: `/changelog/${entry.date}`,
      type: 'article',
      publishedTime: entry.date,
      siteName: 'Tratto',
    },
  };
}

function formatInlineText(text: string): React.ReactNode {
  // Converte marcações de negrito (*palavra* ou **palavra**) em elementos <strong>
  const parts = text.split(/(\*\*?[^*]+?\*\*?)/g);

  if (parts.length === 1) {
    return text;
  }

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={index} className="font-bold text-[var(--text-main)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <strong key={index} className="font-bold text-[var(--text-main)]">
          {part.slice(1, -1)}
        </strong>
      );
    }
    return part;
  });
}

export default async function ChangelogDetailPage({ params }: ChangelogDetailPageProps) {
  const { date } = await params;
  const entry = getChangelogEntryByDate(date);

  if (!entry) {
    notFound();
  }

  const likesRepo = new SupabaseChangelogLikesRepository();
  const liveLikes = await likesRepo.getLikesCount(entry.date);
  const initialLikes = Math.max(liveLikes, entry.initialLikes || 0);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-canvas)] text-[var(--text-main)] transition-colors duration-300">
      <ScrollbarThemeSync />
      <Navbar />

      <main id="conteudo-principal" tabIndex={-1} className="flex-1 focus:outline-none">
        <article className="px-4 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24">
          <div className="mx-auto max-w-3xl">
            {/* Navegação de Retorno */}
            <nav aria-label="Navegação secundária" className="mb-8">
              <Link
                href="/changelog"
                className="inline-flex items-center gap-2 font-mono text-xs font-medium text-[var(--accent-primary)] hover:underline sm:text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar ao Changelog</span>
              </Link>
            </nav>

            {/* Cabeçalho do Artigo */}
            <header className="border-b border-[var(--border-subtle)] pb-8">
              <div className="flex flex-wrap items-center gap-3">
                <time
                  dateTime={entry.date}
                  className="font-mono text-xs font-semibold text-[var(--text-muted)] sm:text-sm"
                >
                  {entry.displayDate}
                </time>
              </div>

              <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[var(--text-main)] sm:text-5xl sm:leading-tight">
                {entry.title}
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-[var(--text-muted)] sm:text-xl font-medium">
                {entry.teaser}
              </p>
            </header>

            {/* Corpo de Conteúdo Estruturado */}
            <div className="pt-8">
              {entry.content.map((block, idx) => {
                switch (block.type) {
                  case 'paragraph':
                    return (
                      <p
                        key={idx}
                        className="mb-6 text-base leading-relaxed text-[var(--text-main)] sm:text-lg"
                      >
                        {formatInlineText(block.text)}
                      </p>
                    );

                  case 'media':
                    return (
                      <ChangelogMedia
                        key={idx}
                        src={block.src}
                        alt={block.alt}
                        caption={block.caption}
                      />
                    );

                  case 'quote':
                    return (
                      <blockquote
                        key={idx}
                        className="my-8 rounded-r-xl border-l-4 border-[var(--accent-primary)] bg-[var(--accent-surface)] p-5 sm:p-6 transition-colors duration-300"
                      >
                        <p className="font-serif text-lg italic text-[var(--text-main)] sm:text-xl">
                          &ldquo;{block.quote}&rdquo;
                        </p>
                        {block.author && (
                          <cite className="mt-3 block font-mono text-xs font-medium text-[var(--accent-primary)] not-italic">
                            — {block.author}
                          </cite>
                        )}
                      </blockquote>
                    );

                  case 'list':
                    return (
                      <div
                        key={idx}
                        className="my-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 sm:p-7 shadow-xs"
                      >
                        {block.title && (
                          <h2 className="mb-4 font-serif text-lg font-bold text-[var(--text-main)] sm:text-xl">
                            {block.title}
                          </h2>
                        )}
                        <ul className="space-y-3">
                          {block.items.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className="flex items-start gap-2.5 text-sm sm:text-base text-[var(--text-main)]"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-primary)]" />
                              <span>{formatInlineText(item)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );

                  default:
                    return null;
                }
              })}
            </div>

            {/* Rodapé da Publicação: Curtida e Navegação */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-8">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  Gostou desta atualização?
                </span>
                <ChangelogLikeButton
                  date={entry.date}
                  initialCount={initialLikes}
                />
              </div>

              <Link
                href="/changelog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-primary)] hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar a todas as publicações</span>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
