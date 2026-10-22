import { describe, it, expect } from 'vitest';
import { metadata } from '@/app/layout';

describe('SEO & Metadata (Spec 0005 - CA1: Metadados Globais e OpenGraph)', () => {
  it('deve possuir metadataBase configurada com a URL canônica padrão', () => {
    expect(metadata.metadataBase).toBeDefined();
    expect(metadata.metadataBase?.toString()).toMatch(/https?:\/\//);
  });

  it('deve possuir title com template e título editorial padrão', () => {
    expect(metadata.title).toBeDefined();
    if (typeof metadata.title === 'object' && metadata.title !== null) {
      expect(metadata.title).toHaveProperty('default');
      expect((metadata.title as { default: string }).default).toContain('Tratto');
      expect((metadata.title as { default: string }).default).toContain('2 minutos');
      expect((metadata.title as { template: string }).template).toBe('%s | Tratto');
    } else {
      expect(typeof metadata.title).toBe('string');
    }
  });

  it('deve possuir description persuasiva e focada na proposta de valor', () => {
    expect(metadata.description).toBeDefined();
    expect(metadata.description).toMatch(/contratos/i);
    expect(metadata.description).toMatch(/docx/i);
    expect(metadata.description).toMatch(/IPCA/i);
  });

  it('deve configurar tags completas do OpenGraph para compartilhamento social', () => {
    expect(metadata.openGraph).toBeDefined();
    const og = metadata.openGraph as Record<string, unknown>;
    expect(og?.siteName).toBe('Tratto');
    expect(og?.locale).toBe('pt_BR');
    expect(og?.type).toBe('website');
    expect(og?.title).toBeDefined();
    expect(og?.description).toBeDefined();
    expect(og?.url).toBe('/');
  });

  it('deve configurar Twitter Card no formato summary_large_image', () => {
    expect(metadata.twitter).toBeDefined();
    const tw = metadata.twitter as Record<string, unknown>;
    expect(tw?.card).toBe('summary_large_image');
    expect(tw?.title).toBeDefined();
    expect(tw?.description).toBeDefined();
  });

  it('deve definir canonical URL e diretivas de robôs index/follow', () => {
    expect(metadata.alternates?.canonical).toBe('/');
    expect(metadata.robots).toBeDefined();
    if (typeof metadata.robots === 'object' && metadata.robots !== null) {
      expect((metadata.robots as { index?: boolean }).index).toBe(true);
      expect((metadata.robots as { follow?: boolean }).follow).toBe(true);
    }
  });

  it('deve conter autoria atribuída a Bruno Torres', () => {
    expect(metadata.authors).toBeDefined();
    const authors = Array.isArray(metadata.authors) ? metadata.authors : [metadata.authors];
    expect(authors.some((a) => typeof a === 'object' && a?.name === 'Bruno Torres')).toBe(true);
  });
});
