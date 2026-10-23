import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import React from 'react';
import { Navbar } from '@/components/navbar';

describe('Navbar (Spec 0004 - Header Global e Micro-interações)', () => {
  beforeEach(() => {
    // Mock simples de IntersectionObserver se necessário
    window.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  it('CA1: deve renderizar o skip link acessível para teclado e os links no desktop', () => {
    render(<Navbar />);

    // Skip to content link
    const skipLink = screen.getByRole('link', { name: /Pular para o conteúdo principal/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#conteudo-principal');

    // Logo oficial Tratto
    const logoLink = screen.getByLabelText(/Página Inicial da Tratto/i);
    expect(logoLink).toBeInTheDocument();

    // Links de navegação principais no desktop
    const desktopNav = screen.getByLabelText('Navegação rápida');
    expect(within(desktopNav).getByRole('link', { name: /^Manifesto$/i })).toBeInTheDocument();
    expect(within(desktopNav).getByRole('link', { name: /^Como funciona$/i })).toBeInTheDocument();
    expect(within(desktopNav).getByRole('link', { name: /^Segmentos$/i })).toBeInTheDocument();
    expect(within(desktopNav).getByRole('link', { name: /^Segurança$/i })).toBeInTheDocument();
    expect(within(desktopNav).getByRole('link', { name: /^Dúvidas$/i })).toBeInTheDocument();

    // Botão CTA para lista de espera
    expect(screen.getAllByRole('link', { name: /Entrar na lista/i }).length).toBeGreaterThanOrEqual(1);
  });

  it('CA2: deve alternar o menu mobile ao clicar no botão hambúrguer e fechar com Escape', async () => {
    render(<Navbar />);

    const menuToggle = screen.getByRole('button', { name: /menu de navegação/i });
    expect(menuToggle).toHaveAttribute('aria-expanded', 'false');

    // Clica para abrir o menu
    fireEvent.click(menuToggle);
    expect(menuToggle).toHaveAttribute('aria-expanded', 'true');

    // Links devem estar presentes na navegação mobile
    const mobileLinks = screen.getAllByRole('link', { name: /^Como funciona$/i });
    expect(mobileLinks.length).toBeGreaterThanOrEqual(1);

    // Pressionar tecla Escape fecha o menu mobile
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => {
      expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('CA2: deve fechar o menu mobile ao clicar em qualquer link de navegação', async () => {
    render(<Navbar />);

    const menuToggle = screen.getByRole('button', { name: /menu de navegação/i });
    fireEvent.click(menuToggle);
    expect(menuToggle).toHaveAttribute('aria-expanded', 'true');

    // Clica no link do menu mobile
    const faqLinks = screen.getAllByRole('link', { name: /^Dúvidas$/i });
    const mobileFaqLink = faqLinks[faqLinks.length - 1];
    fireEvent.click(mobileFaqLink);

    await waitFor(() => {
      expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
