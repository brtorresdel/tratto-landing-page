import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ChangelogListingPage from '@/app/changelog/page';
import ChangelogDetailPage from '@/app/changelog/[date]/page';
import { getAllChangelogEntries } from '@/data/changelog';

// Mock notFound from next/navigation
const mockNotFound = vi.fn();
vi.mock('next/navigation', () => ({
  notFound: () => {
    mockNotFound();
    throw new Error('NEXT_NOT_FOUND');
  },
}));

describe('Changelog Pages (Spec 0006 - CA2 & CA3)', () => {
  describe('Página de Listagem (/changelog)', () => {
    it('deve renderizar a listagem de publicações, cabeçalho editorial e link de volta', async () => {
      render(await ChangelogListingPage());

      // Título e cabeçalho editorial
      expect(screen.getByRole('heading', { level: 1, name: /Changelog/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Voltar para a Tratto/i })).toHaveAttribute('href', '/');

      // Entradas listadas
      const entries = getAllChangelogEntries();
      for (const entry of entries) {
        expect(screen.getByText(entry.title)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: new RegExp(`Ler publicação de ${entry.displayDate}`, 'i') })).toHaveAttribute(
          'href',
          `/changelog/${entry.date}`
        );
      }

      // Linha exclusiva de marco inicial
      expect(screen.getByText(/Início do desenvolvimento da Tratto/i)).toBeInTheDocument();
      expect(screen.getByText(/Marco Zero/i)).toBeInTheDocument();
    });
  });

  describe('Página Individual (/changelog/[date])', () => {
    it('deve renderizar o conteúdo detalhado para uma data válida', async () => {
      const entries = getAllChangelogEntries();
      const firstEntry = entries[0];

      render(await ChangelogDetailPage({ params: Promise.resolve({ date: firstEntry.date }) }));

      // Título do post
      expect(screen.getByRole('heading', { level: 1, name: firstEntry.title })).toBeInTheDocument();

      // Data formatada
      expect(screen.getByText(firstEntry.displayDate)).toBeInTheDocument();

      // Botão para voltar à listagem
      expect(screen.getByRole('link', { name: /Voltar ao Changelog/i })).toHaveAttribute('href', '/changelog');

      // Botão de curtida presente
      expect(screen.getByRole('button', { name: /curtidas/i })).toBeInTheDocument();

      // Formatação em negrito para termos destacados com asteriscos (*Tratto*)
      const strongElement = screen.getByText('Tratto', { selector: 'strong' });
      expect(strongElement).toBeInTheDocument();
      expect(strongElement.tagName).toBe('STRONG');
    });

    it('deve invocar notFound() quando a data não existir no catálogo', async () => {
      mockNotFound.mockClear();

      await expect(
        ChangelogDetailPage({ params: Promise.resolve({ date: '1999-01-01' }) })
      ).rejects.toThrow('NEXT_NOT_FOUND');

      expect(mockNotFound).toHaveBeenCalledTimes(1);
    });
  });
});
