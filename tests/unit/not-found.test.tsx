import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import NotFound from '@/app/not-found';

describe('NotFound Page (Spec 0006 - CA4: Página 404 Sage Paper)', () => {
  it('deve renderizar a mensagem editorial de 404 e os botões de navegação', () => {
    render(<NotFound />);

    // Código de status
    expect(screen.getByText('404')).toBeInTheDocument();

    // Mensagem editorial
    expect(screen.getByText(/Este documento não foi encontrado no arquivo/i)).toBeInTheDocument();

    // Links de navegação
    const homeLink = screen.getByRole('link', { name: /Voltar para o início/i });
    expect(homeLink).toHaveAttribute('href', '/');

    const changelogLink = screen.getByRole('link', { name: /Ver todas as atualizações/i });
    expect(changelogLink).toHaveAttribute('href', '/changelog');
  });
});
