import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { WaitlistSection } from '@/components/waitlist-section';

describe('WaitlistSection (Spec 0003 - Formulário Lista de Espera em 2 Etapas)', () => {
  it('renderiza a seção #lista-de-espera com título editorial, input de e-mail, aviso LGPD e botão', () => {
    const { container } = render(<WaitlistSection />);
    const section = container.querySelector('section#lista-de-espera');
    expect(section).not.toBeNull();

    // Título editorial e subtítulo
    expect(screen.getByRole('heading', { level: 2, name: /^Lista de Espera$/i })).toBeInTheDocument();
    expect(screen.getByText(/Enquanto a Tratto ainda está em andamento/i)).toBeInTheDocument();

    // Aviso LGPD acima do campo
    expect(
      screen.getByText(/Ao entrar na lista de espera, você concorda em receber comunicações/i)
    ).toBeInTheDocument();

    // Input obrigatório de e-mail
    const emailInput = screen.getByLabelText(/Seu melhor e-mail profissional/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');

    // Botão de envio
    expect(screen.getByRole('button', { name: /Entrar na lista/i })).toBeInTheDocument();
  });

  it('exibe erro inline se tentar enviar sem e-mail válido', async () => {
    render(<WaitlistSection />);

    const submitBtn = screen.getByRole('button', { name: /Entrar na lista/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Informe um endereço de e-mail válido\./i)).toBeInTheDocument();
    });
  });

  it('transiciona para a Etapa 2 de qualificação voluntária ao submeter a Etapa 1 com sucesso', async () => {
    const mockOnStep1Submit = vi.fn().mockResolvedValue({ success: true });
    render(<WaitlistSection onStep1Submit={mockOnStep1Submit} />);

    const emailInput = screen.getByLabelText(/Seu melhor e-mail profissional/i);
    const submitBtn = screen.getByRole('button', { name: /Entrar na lista/i });

    fireEvent.change(emailInput, { target: { value: 'gestor@clinica.com.br' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockOnStep1Submit).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'gestor@clinica.com.br',
          consent: true,
        })
      );
    });

    // Deve transicionar para a Etapa 2
    await waitFor(() => {
      expect(screen.getByText(/Ajude a moldar a Tratto para o seu dia a dia/i)).toBeInTheDocument();
      // Perguntas opcionais de dores e sugestões agora na Etapa 2
      expect(
        screen.getByLabelText(/Quais são as suas maiores dores ou dificuldades com contratos/i)
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/O que não pode faltar na Tratto para ela ser perfeita/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Qual o seu segmento de atuação\?/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Concluir cadastro/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Prefiro responder depois/i })).toBeInTheDocument();
    });
  });

  it('permite pular a Etapa 2 e avançar para o estado de confirmação e agradecimento final', async () => {
    render(<WaitlistSection initialStep={2} initialEmail="gestor@clinica.com.br" />);

    expect(screen.getByText(/Ajude a moldar a Tratto para o seu dia a dia/i)).toBeInTheDocument();

    const skipBtn = screen.getByRole('button', { name: /Prefiro responder depois/i });
    fireEvent.click(skipBtn);

    await waitFor(() => {
      expect(screen.getByText(/Você está na lista de espera!/i)).toBeInTheDocument();
      expect(screen.getByText('gestor@clinica.com.br')).toBeInTheDocument();
      expect(screen.getByText(/assim que o acesso for liberado\./i)).toBeInTheDocument();
    });
  });

  it('ao preencher e submeter a Etapa 2, envia os dados de qualificação e exibe o estado de confirmação', async () => {
    const mockOnStep2Submit = vi.fn().mockResolvedValue({ success: true });
    render(
      <WaitlistSection
        initialStep={2}
        initialEmail="gestor@clinica.com.br"
        onStep2Submit={mockOnStep2Submit}
      />
    );

    // Clica no segmento "Coworking"
    const coworkingOption = screen.getByRole('radio', { name: /Coworking/i });
    fireEvent.click(coworkingOption);

    // Clica em "Concluir cadastro"
    const submitBtn = screen.getByRole('button', { name: /Concluir cadastro/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockOnStep2Submit).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'gestor@clinica.com.br',
          segment: 'Coworking',
        })
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/Você está na lista de espera!/i)).toBeInTheDocument();
    });
  });
});
