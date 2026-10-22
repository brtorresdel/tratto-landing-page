import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Footer } from '@/components/footer';

describe('Footer (Spec 0004 - Rodapé Editorial Definitivo)', () => {
  it('CA4: deve renderizar as 4 colunas editoriais com links, pílula de status e copyright dinâmico', () => {
    const { container } = render(<Footer />);

    // 1. Coluna de Identidade & Síntese
    expect(screen.getByLabelText(/Página Inicial da Tratto/i)).toBeInTheDocument();
    expect(
      screen.getByText(/A forma mais simples de gerar, organizar e acompanhar contratos a partir dos seus próprios modelos/i)
    ).toBeInTheDocument();

    // 2. Coluna Sobre a Tratto (Navegação)
    expect(screen.getByText(/^Sobre a Tratto$/i)).toBeInTheDocument();
    const nav = container.querySelector('footer nav');
    expect(nav).not.toBeNull();
    expect(screen.getByRole('link', { name: /^Carta do Dev$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Como funciona$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Segmentos$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Segurança$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Dúvidas$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Lista de espera$/i })).toBeInTheDocument();

    // 3. Coluna de Contato & Criador
    expect(screen.getByAltText(/Foto de Bruno Torres/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Bruno Torres/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Desenvolvedor Fullstack &/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Criador da Tratto/i).length).toBeGreaterThanOrEqual(1);

    // Redes sociais
    const portfolioLink = screen.getByRole('link', { name: /Portfólio/i });
    expect(portfolioLink).toHaveAttribute('href', 'https://www.devtorres.com.br');
    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/brtorresdel/');
    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/brtorresdel');

    // Linha inferior: copyright dinâmico e status
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`Tratto © ${currentYear}\\. Todos os direitos reservados\\.`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Projeto em andamento/i)).toBeInTheDocument();
  });
});
