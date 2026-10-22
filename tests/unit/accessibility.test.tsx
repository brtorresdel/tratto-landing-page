import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { StructuredData } from '@/components/structured-data';
import HomePage from '@/app/page';

describe('Acessibilidade & Schema.org (Spec 0005 - CA4 & CA5)', () => {
  describe('CA4: Schema.org JSON-LD (StructuredData)', () => {
    it('deve injetar script JSON-LD válido contendo SoftwareApplication e Organization', () => {
      const { container } = render(<StructuredData />);
      const script = container.querySelector('script[type="application/ld+json"]');

      expect(script).not.toBeNull();
      const jsonContent = JSON.parse(script?.textContent || '{}');

      expect(jsonContent['@context']).toBe('https://schema.org');
      expect(Array.isArray(jsonContent['@graph'])).toBe(true);

      const softwareApp = jsonContent['@graph'].find(
        (item: { '@type': string }) => item['@type'] === 'SoftwareApplication'
      );
      expect(softwareApp).toBeDefined();
      expect(softwareApp.name).toBe('Tratto');
      expect(softwareApp.applicationCategory).toBe('BusinessApplication');
      expect(softwareApp.author.name).toBe('Bruno Torres');

      const organization = jsonContent['@graph'].find(
        (item: { '@type': string }) => item['@type'] === 'Organization'
      );
      expect(organization).toBeDefined();
      expect(organization.name).toBe('Tratto');
      expect(organization.founder.name).toBe('Bruno Torres');
    });
  });

  describe('CA5: Acessibilidade WCAG 2.1 AA na HomePage', () => {
    it('deve possuir exatamente um h1 principal como protagonista da página', () => {
      const { container } = render(<HomePage />);
      const h1Elements = container.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);
      expect(h1Elements[0].textContent).toContain('Aqui nasce a');
      const logoInH1 = h1Elements[0].querySelector('[aria-label="Tratto"]');
      expect(logoInH1).not.toBeNull();
    });

    it('deve possuir o elemento main com id="conteudo-principal" para o skip link', () => {
      const { container } = render(<HomePage />);
      const main = container.querySelector('main#conteudo-principal');
      expect(main).not.toBeNull();
    });

    it('todos os links interativos devem possuir rótulo acessível ou texto visível', () => {
      const { container } = render(<HomePage />);
      const links = container.querySelectorAll('a');

      links.forEach((link) => {
        const hasText = (link.textContent || '').trim().length > 0;
        const hasAriaLabel = !!link.getAttribute('aria-label');
        const hasAriaLabelledBy = !!link.getAttribute('aria-labelledby');
        const hasTitle = !!link.getAttribute('title');

        expect(
          hasText || hasAriaLabel || hasAriaLabelledBy || hasTitle,
          `Link sem nome acessível: ${link.outerHTML}`
        ).toBe(true);
      });
    });

    it('todos os botões devem possuir rótulo acessível ou texto visível', () => {
      const { container } = render(<HomePage />);
      const buttons = container.querySelectorAll('button');

      buttons.forEach((button) => {
        const hasText = (button.textContent || '').trim().length > 0;
        const hasAriaLabel = !!button.getAttribute('aria-label');
        const hasAriaLabelledBy = !!button.getAttribute('aria-labelledby');

        expect(
          hasText || hasAriaLabel || hasAriaLabelledBy,
          `Botão sem nome acessível: ${button.outerHTML}`
        ).toBe(true);
      });
    });
  });
});
