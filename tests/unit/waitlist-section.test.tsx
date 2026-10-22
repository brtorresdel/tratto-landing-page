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

  it('ao submeter a Etapa 1 com sucesso, exibe imediatamente a confirmação e a opção chevron Sobre a sua empresa', async () => {
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

    // Deve exibir a confirmação imediatamente
    await waitFor(() => {
      expect(screen.getByText(/Você está na lista de espera!/i)).toBeInTheDocument();
      expect(screen.getByText('gestor@clinica.com.br')).toBeInTheDocument();
      expect(screen.getByText(/Sobre a sua empresa\.\.\./i)).toBeInTheDocument();
    });

    // Clicando na opção chevron, expande as perguntas opcionais
    const accordionBtn = screen.getByRole('button', { name: /Sobre a sua empresa\.\.\./i });
    fireEvent.click(accordionBtn);

    await waitFor(() => {
      expect(
        screen.getByLabelText(/Quais são as suas maiores dores ou dificuldades com contratos/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Qual o seu segmento de atuação\?/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Concluir cadastro/i })).toBeInTheDocument();
    });
  });

  it('permite abrir o accordion e enviar as respostas opcionais da empresa', async () => {
    const mockOnStep2Submit = vi.fn().mockResolvedValue({ success: true });
    render(
      <WaitlistSection
        initialStep={2}
        initialEmail="gestor@clinica.com.br"
        onStep2Submit={mockOnStep2Submit}
      />
    );

    expect(screen.getByText(/Você está na lista de espera!/i)).toBeInTheDocument();

    // Abre o accordion
    const accordionBtn = screen.getByRole('button', { name: /Sobre a sua empresa\.\.\./i });
    fireEvent.click(accordionBtn);

    await waitFor(() => {
      expect(screen.getByText(/Qual o seu segmento de atuação\?/i)).toBeInTheDocument();
    });

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
      expect(screen.getByText(/Respostas opcionais salvas com sucesso\. Muito obrigado!/i)).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /Sobre a sua empresa\.\.\./i })).toBeNull();
    });
  });

  it('renderiza os contratos estáticos de background espalhados na base com dados 100% fictícios, rubrica preta, sem carimbos/paginação/tratto', () => {
    const { container } = render(<WaitlistSection />);

    // Container de background com aria-hidden e pointer-events-none na camada z-0
    const bgContainer = container.querySelector('[aria-hidden="true"]');
    expect(bgContainer).not.toBeNull();
    expect(bgContainer).toHaveClass('pointer-events-none');
    expect(bgContainer).toHaveClass('z-0');

    // Clientes e dados 100% fictícios nos contratos estáticos (14 contratos)
    expect(screen.getAllByText(/Alfa Coworking/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Exemplo & Associados/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Beta Tecnologia/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Modelo BPO Financeiro/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Simulação Cargas/i).length).toBeGreaterThan(0);

    // Rubrica em preto
    const rubricaSvg = container.querySelector('svg[aria-label="Rubrica Tratto"]');
    expect(rubricaSvg).toHaveClass('text-black');

    // Não deve conter a pílula .DOCX nem "Via registrada"
    expect(screen.queryByText('.DOCX')).toBeNull();
    expect(screen.queryByText('Via registrada')).toBeNull();
    expect(screen.queryByText(/Pág\. 1/i)).toBeNull();
  });
});
