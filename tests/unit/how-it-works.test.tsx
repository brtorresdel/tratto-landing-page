import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import { HowItWorksSection } from "@/components/how-it-works-section";

describe("HowItWorksSection (Spec 0002 - CA3: Apresentação da Tratto e Como Funciona)", () => {
  it("deve renderizar a seção #como-funciona com a logo Tratto e o texto de introdução oficial", () => {
    const { container } = render(<HowItWorksSection />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section?.id).toBe("como-funciona");

    // Valida remoção do pill 'O Ciclo em 4 Passos'
    expect(screen.queryByText(/O Ciclo em 4 Passos/i)).toBeNull();

    // Valida presença da logo Tratto com escala equilibrada (h-16 a h-28) e animação flutuante
    const logos = screen.getAllByRole("img", { name: "Tratto" });
    expect(logos.length).toBeGreaterThan(0);
    expect(logos[0].getAttribute("class")).toMatch(/h-16|h-20|h-24|h-28/);

    const logoContainer = logos[0].closest("h2");
    expect(logoContainer).toHaveClass("animate-float-gentle");

    // Valida o texto introdutório da plataforma e largura total da área de texto
    const introParagraph = screen.getByText(/Pensando nessas dores e na minha própria experiência/i);
    expect(introParagraph).toBeInTheDocument();
    expect(introParagraph).toHaveClass("w-full");
    expect(introParagraph.className).not.toMatch(/max-w-3xl/);
    expect(introParagraph.className).not.toMatch(/max-w-2xl/);
    expect(
      screen.getByText(/E esse projeto se tornou a/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A ideia aqui é bem simples:/i)
    ).toBeInTheDocument();
  });

  it("deve renderizar o player interativo estilo Stories com as 4 etapas da vida do contrato", () => {
    vi.useFakeTimers();
    render(<HowItWorksSection />);

    // Valida os 4 indicadores segmentados estilo Stories
    const storyIndicators = screen.getAllByRole("button", { name: /^Etapa \d:/i });
    expect(storyIndicators).toHaveLength(4);

    // Valida botões de navegação anterior e próximo centralizados na parte de baixo
    const prevBtn = screen.getByRole("button", { name: /Etapa anterior/i });
    const nextBtn = screen.getByRole("button", { name: /Próxima etapa/i });
    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
    expect(prevBtn.parentElement).toHaveClass("justify-center");

    // Valida remoção do texto antigo de rodapé
    expect(
      screen.queryByText(/Marcadores em chaves duplas identificados automaticamente/i)
    ).toBeNull();

    // Etapa 1 ativa inicialmente: Modelo & Marcadores
    expect(screen.getByRole("heading", { name: /Modelo & Marcadores/i })).toBeInTheDocument();

    // No início imediato (t=0), o corpo com marcadores ainda não foi digitado
    expect(screen.queryByText(/\{\{cliente_nome\}\}/i)).toBeNull();

    // Durante a digitação do marcador (t=3800ms), o texto incompleto é preto normal (sem cor do tema)
    act(() => {
      vi.advanceTimersByTime(3800);
    });
    expect(screen.queryByText(/\{\{cliente_nome\}\}/i)).toBeNull();

    // Ao digitar o último dígito '}' (t=4300ms), o marcador é concluído e se converte na cor do tema
    act(() => {
      vi.advanceTimersByTime(500);
    });
    const marker = screen.getByText(/\{\{cliente_nome\}\}/i);
    expect(marker).toBeInTheDocument();
    expect(marker).toHaveClass("text-[var(--accent-primary)]");
    expect(marker).toHaveClass("bg-[var(--accent-surface)]");

    vi.useRealTimers();
  });

  it("deve permitir navegar entre as 4 etapas da história pelos botões e pelas barras segmentadas", () => {
    vi.useFakeTimers();
    render(<HowItWorksSection />);

    const nextBtn = screen.getByRole("button", { name: /Próxima etapa/i });
    const prevBtn = screen.getByRole("button", { name: /Etapa anterior/i });
    const storyIndicators = screen.getAllByRole("button", { name: /^Etapa \d:/i });

    // Avança para Etapa 2: Preenchimento & Criação Oficial
    act(() => {
      fireEvent.click(nextBtn);
    });
    expect(screen.getByRole("heading", { name: /Preenchimento & Criação/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3500);
    });
    expect(screen.getAllByText(/João da Silva/i).length).toBeGreaterThan(0);

    // Avança para Etapa 3: Envio & Assinatura
    act(() => {
      fireEvent.click(nextBtn);
    });
    expect(screen.getByRole("heading", { name: /Envio & Assinatura/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3800);
    });
    expect(screen.getAllByText(/ASSINADO/i).length).toBeGreaterThan(0);

    // Avança para Etapa 4: Vigência & Reajuste Automático
    act(() => {
      fireEvent.click(nextBtn);
    });
    expect(screen.getByRole("heading", { name: /Vigência & Reajuste/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getAllByText(/Valor atualizado/i).length).toBeGreaterThan(0);

    // Clica diretamente no indicador da Etapa 1
    act(() => {
      fireEvent.click(storyIndicators[0]);
    });
    expect(screen.getByRole("heading", { name: /Modelo & Marcadores/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(4500);
    });
    expect(screen.getByText(/\{\{cliente_nome\}\}/i)).toBeInTheDocument();

    // Clica no botão anterior -> faz o ciclo para Etapa 4
    act(() => {
      fireEvent.click(prevBtn);
    });
    expect(screen.getByRole("heading", { name: /Vigência & Reajuste/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getAllByText(/Valor atualizado/i).length).toBeGreaterThan(0);

    vi.useRealTimers();
  });

  it("deve avançar automaticamente de etapa a cada 25 segundos", () => {
    vi.useFakeTimers();
    render(<HowItWorksSection />);

    // Inicia na Etapa 1: Modelo & Marcadores
    expect(screen.getByRole("heading", { name: /Modelo & Marcadores/i })).toBeInTheDocument();

    // Com 20 segundos ainda permanece na Etapa 1
    act(() => {
      vi.advanceTimersByTime(20000);
    });
    expect(screen.getByRole("heading", { name: /Modelo & Marcadores/i })).toBeInTheDocument();

    // Ao completar os 25 segundos (mais 5s), transita para a Etapa 2: Preenchimento & Criação
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByRole("heading", { name: /Preenchimento & Criação/i })).toBeInTheDocument();

    vi.useRealTimers();
  });

  it("deve permitir pausar e retomar a reprodução automática dos stories pelo botão superior direito", () => {
    vi.useFakeTimers();
    render(<HowItWorksSection />);

    // Botão de pause inicialmente presente no canto superior direito
    const pauseBtn = screen.getByRole("button", { name: /Pausar reprodução automática/i });
    expect(pauseBtn).toBeInTheDocument();
    expect(pauseBtn).toHaveClass("text-[var(--accent-primary)]");
    expect(pauseBtn).toHaveClass("bg-[var(--accent-surface)]");

    // Clica para pausar
    act(() => {
      fireEvent.click(pauseBtn);
    });

    // O botão deve alternar para o estado de play/retomar
    const playBtn = screen.getByRole("button", { name: /Retomar reprodução automática/i });
    expect(playBtn).toBeInTheDocument();

    // Avança 30 segundos com o player pausado
    act(() => {
      vi.advanceTimersByTime(30000);
    });

    // Deve permanecer na Etapa 1 sem avançar automaticamente
    expect(screen.getByRole("heading", { name: /Modelo & Marcadores/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /Preenchimento & Criação/i })).toBeNull();

    // Clica para retomar a reprodução automática
    act(() => {
      fireEvent.click(playBtn);
    });
    expect(screen.getByRole("button", { name: /Pausar reprodução automática/i })).toBeInTheDocument();

    // Avança os 25 segundos do story despausado
    act(() => {
      vi.advanceTimersByTime(25000);
    });

    // Agora deve ter avançado para a Etapa 2
    expect(screen.getByRole("heading", { name: /Preenchimento & Criação/i })).toBeInTheDocument();

    vi.useRealTimers();
  });
});
