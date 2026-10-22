import { describe, it, expect } from 'vitest';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

describe('Sitemap & Robots (Spec 0005 - CA3: Indexação Semântica Nativa)', () => {
  describe('robots()', () => {
    it('deve retornar regras para permitir rastreamento público de robôs e link do sitemap', () => {
      const robotsConfig = robots();

      expect(robotsConfig).toBeDefined();
      expect(robotsConfig.rules).toBeDefined();

      const rules = Array.isArray(robotsConfig.rules) ? robotsConfig.rules[0] : robotsConfig.rules;
      expect(rules.userAgent).toBe('*');
      expect(rules.allow).toBe('/');

      expect(robotsConfig.sitemap).toBeDefined();
      expect(robotsConfig.sitemap?.toString()).toContain('/sitemap.xml');
    });
  });

  describe('sitemap()', () => {
    it('deve gerar entradas do sitemap com a home em prioridade máxima', () => {
      const sitemapEntries = sitemap();

      expect(Array.isArray(sitemapEntries)).toBe(true);
      expect(sitemapEntries.length).toBeGreaterThanOrEqual(1);

      const homeEntry = sitemapEntries[0];
      expect(homeEntry.url).toBeDefined();
      expect(homeEntry.url).toMatch(/https?:\/\//);
      expect(homeEntry.changeFrequency).toBe('monthly');
      expect(homeEntry.priority).toBe(1.0);
      expect(homeEntry.lastModified).toBeInstanceOf(Date);
    });
  });
});
