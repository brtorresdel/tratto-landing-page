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

    // Valida botões de navegação anterior e próximo
    expect(screen.getByRole("button", { name: /Etapa anterior/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Próxima etapa/i })).toBeInTheDocument();

    // Etapa 1 ativa inicialmente: Modelo & Marcadores
    expect(screen.getByText(/1 de 4/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Modelo & Marcadores/i })).toBeInTheDocument();

    // Avança animação para preencher o primeiro marcador
    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(screen.getByText(/\{\{cliente_nome\}\}/i)).toBeInTheDocument();

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
    expect(screen.getByText(/2 de 4/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Preenchimento & Criação/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3500);
    });
    expect(screen.getAllByText(/João da Silva/i).length).toBeGreaterThan(0);

    // Avança para Etapa 3: Envio & Assinatura
    act(() => {
      fireEvent.click(nextBtn);
    });
    expect(screen.getByText(/3 de 4/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Envio & Assinatura/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3800);
    });
    expect(screen.getAllByText(/ASSINADO/i).length).toBeGreaterThan(0);

    // Avança para Etapa 4: Vigência & Reajuste Automático
    act(() => {
      fireEvent.click(nextBtn);
    });
    expect(screen.getByText(/4 de 4/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Vigência & Reajuste/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getAllByText(/Valor atualizado/i).length).toBeGreaterThan(0);

    // Clica diretamente no indicador da Etapa 1
    act(() => {
      fireEvent.click(storyIndicators[0]);
    });
    expect(screen.getByText(/1 de 4/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Modelo & Marcadores/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(screen.getByText(/\{\{cliente_nome\}\}/i)).toBeInTheDocument();

    // Clica no botão anterior -> faz o ciclo para Etapa 4
    act(() => {
      fireEvent.click(prevBtn);
    });
    expect(screen.getByText(/4 de 4/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getAllByText(/Valor atualizado/i).length).toBeGreaterThan(0);

    vi.useRealTimers();
  });
});
