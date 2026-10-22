import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { ScrollbarThemeSync } from '@/components/scrollbar-theme-sync';

describe('ScrollbarThemeSync', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-scrollbar');
  });

  afterEach(() => {
    document.documentElement.removeAttribute('data-scrollbar');
    vi.restoreAllMocks();
  });

  it('monta o componente sem erros e limpa atributos na desmontagem', () => {
    const { unmount } = render(<ScrollbarThemeSync />);
    expect(document.documentElement.getAttribute('data-scrollbar')).toBeNull();
    unmount();
    expect(document.documentElement.getAttribute('data-scrollbar')).toBeNull();
  });

  it('adiciona data-scrollbar="light" quando o thumb da barra sobrepõe uma seção escura', () => {
    // Cria uma seção escura simulada
    const darkSection = document.createElement('div');
    darkSection.setAttribute('data-dark-section', 'true');
    darkSection.getBoundingClientRect = vi.fn().mockReturnValue({
      top: 100,
      bottom: 500,
    });
    document.body.appendChild(darkSection);

    // Mock das dimensões da janela e scroll
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true });
    Object.defineProperty(window, 'scrollY', { value: 200, configurable: true });

    render(<ScrollbarThemeSync />);

    expect(document.documentElement.getAttribute('data-scrollbar')).toBe('light');

    document.body.removeChild(darkSection);
  });
});
