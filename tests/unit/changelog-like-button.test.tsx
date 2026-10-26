import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { ChangelogLikeButton } from '@/components/changelog-like-button';

describe('ChangelogLikeButton (Spec 0006 - CA5: Curtidas Anônimas sem Login)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('deve renderizar o botão com o contador inicial e rótulo acessível', () => {
    render(<ChangelogLikeButton date="2026-10-22" initialCount={5} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('5'));
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('ao clicar, deve alternar para curtido, incrementar o contador e salvar no localStorage', async () => {
    render(<ChangelogLikeButton date="2026-10-22" initialCount={5} />);

    const button = screen.getByRole('button');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(screen.getByText('6')).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(localStorage.getItem('tratto_liked_2026-10-22')).toBe('true');
  });

  it('ao clicar novamente, deve descurtir, decrementar o contador e remover do localStorage', async () => {
    render(<ChangelogLikeButton date="2026-10-22" initialCount={5} />);

    const button = screen.getByRole('button');
    // 1º clique: curtir
    await act(async () => {
      fireEvent.click(button);
    });
    expect(screen.getByText('6')).toBeInTheDocument();

    // 2º clique: descurtir
    await act(async () => {
      fireEvent.click(button);
    });
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(localStorage.getItem('tratto_liked_2026-10-22')).toBe('false');
  });

  it('deve inicializar como curtido se a chave já existir no localStorage', () => {
    localStorage.setItem('tratto_liked_2026-10-22', 'true');

    render(<ChangelogLikeButton date="2026-10-22" initialCount={5} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    // Mostra initialCount (já que localStorage só indica que este cliente curtiu)
    expect(button).toBeInTheDocument();
  });
});
