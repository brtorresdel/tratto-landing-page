import { describe, it, expect } from 'vitest';
import Image, { alt, size, contentType } from '@/app/opengraph-image';

describe('OpenGraph Image Dinâmica (Spec 0005 - CA2)', () => {
  it('deve exportar as configurações padrão da imagem OpenGraph', () => {
    expect(alt).toBe('Tratto — Seus contratos em 2 minutos e zero planilhas');
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(contentType).toBe('image/png');
  });

  it('deve gerar uma resposta ImageResponse válida', async () => {
    const response = await Image();
    expect(response).toBeDefined();
    expect(response.headers.get('content-type')).toBe('image/png');
  });
});
