import { describe, it, expect } from 'vitest';
import {
  getAllChangelogEntries,
  getChangelogEntryByDate,
  type ChangelogEntry,
} from '@/data/changelog';

describe('Changelog Data Repository (Spec 0006 - CA1)', () => {
  it('getAllChangelogEntries deve retornar as publicações ordenadas por data decrescente', () => {
    const entries = getAllChangelogEntries();

    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThanOrEqual(1);

    // Valida ordenação cronológica decrescente
    for (let i = 0; i < entries.length - 1; i++) {
      const current = new Date(entries[i].date).getTime();
      const next = new Date(entries[i + 1].date).getTime();
      expect(current).toBeGreaterThanOrEqual(next);
    }
  });

  it('cada publicação deve possuir campos obrigatórios e tipagem válida', () => {
    const entries = getAllChangelogEntries();
    const entry = entries[0];

    expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(entry.displayDate).toBeDefined();
    expect(entry.title.trim().length).toBeGreaterThan(0);
    expect(entry.teaser.trim().length).toBeGreaterThan(0);
    expect(entry.category).toBeDefined();
    expect(Array.isArray(entry.content)).toBe(true);
  });

  it('getChangelogEntryByDate deve retornar a publicação exata para uma data existente', () => {
    const entries = getAllChangelogEntries();
    const firstDate = entries[0].date;

    const found = getChangelogEntryByDate(firstDate);
    expect(found).toBeDefined();
    expect(found?.date).toBe(firstDate);
  });

  it('getChangelogEntryByDate deve retornar undefined para uma data inexistente', () => {
    const notFound = getChangelogEntryByDate('1999-01-01');
    expect(notFound).toBeUndefined();
  });

  it('deve suportar blocos de mídia (imagens e GIFs) com atributos de acessibilidade', () => {
    const mockEntry: ChangelogEntry = {
      date: '2026-10-23',
      displayDate: '23 de Outubro de 2026',
      title: 'Post de Teste com Mídia',
      teaser: 'Teaser demonstrativo',
      category: 'Melhoria',
      content: [
        {
          type: 'media',
          src: '/assets/screenshot.webp',
          alt: 'Interface do produto',
          caption: 'Demonstração de tela',
        },
      ],
    };

    const mediaBlock = mockEntry.content.find((b) => b.type === 'media');
    expect(mediaBlock).toBeDefined();
    if (mediaBlock && mediaBlock.type === 'media') {
      expect(mediaBlock.alt).toBe('Interface do produto');
      expect(mediaBlock.src).toBe('/assets/screenshot.webp');
      expect(mediaBlock.caption).toBe('Demonstração de tela');
    }
  });
});
