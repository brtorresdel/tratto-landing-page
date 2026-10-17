import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { ProblemBanner } from "@/components/problem-banner";

describe("ProblemBanner (Spec 0002 - CA1 e CA2: Carta do Dev e Métricas de Prejuízo)", () => {
  it("CA1: Deve renderizar a Carta do Dev com título, foto do autor, texto em Newsreader itálico e gancho", () => {
    const { container } = render(<ProblemBanner />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section?.id).toBe("o-problema");
    expect(section).toHaveClass("bg-[var(--accent-primary)]");
    expect(section).toHaveClass("transition-colors");

    // Título principal Carta do Dev e ausência da pill antiga
    expect(screen.getByRole("heading", { level: 2, name: /Carta do Dev/i })).toBeInTheDocument();
    expect(screen.queryByText(/^Carta do Desenvolvedor$/i)).toBeNull();

    // Foto do autor no topo (ao lado/abaixo do título)
    const authorPhoto = screen.getByAltText(/Foto de Bruno Torres/i);
    expect(authorPhoto).toBeInTheDocument();
    expect(authorPhoto).toHaveAttribute("src", "/bruno-torres.webp");

    // Citação do autor no topo (limpa, sem fundo/borda e com cargo Fullstack)
    const authorName = screen.getByText(/Bruno Torres/i);
    expect(authorName).toBeInTheDocument();
    expect(screen.getByText(/Desenvolvedor Fullstack & Criador da Tratto/i)).toBeInTheDocument();

    const authorCard = authorName.closest("div[class*='w-fit']");
    expect(authorCard).not.toBeNull();
    expect(authorCard?.className).not.toMatch(/bg-white\/10/);
    expect(authorCard?.className).not.toMatch(/rounded-full/);

    // Narrativa do relato real do desenvolvedor com tipografia Newsreader itálico
    const firstPara = screen.getByText(/momentos que beiravam o desespero/i);
    expect(firstPara).toBeInTheDocument();
    expect(screen.getByText(/gerados 100% na mão/i)).toBeInTheDocument();
    expect(screen.getByText(/planilha cheia de macros/i)).toBeInTheDocument();
    expect(screen.getByText(/abraço naquele Bruno do passado/i)).toBeInTheDocument();

    const letterContainer = firstPara.closest("div[class*='font-serif']");
    expect(letterContainer).not.toBeNull();
    expect(letterContainer?.className).toMatch(/italic/);

    // Gancho de transição para o mercado
    expect(screen.getByText(/O custo invisível de gerenciar contratos no improviso/i)).toBeInTheDocument();
  });

  it("CA2: Deve renderizar a grade com as 3 métricas de prejuízo invisível e o card de impacto comparativo", () => {
    render(<ProblemBanner />);

    // Métrica 1: Reajustes perdidos
    const metrica1 = screen.getByText("-12,4%");
    expect(metrica1).toBeInTheDocument();
    expect(metrica1).toHaveClass("font-mono");
    expect(metrica1).toHaveClass("tabular-nums");
    expect(screen.getByText(/Reajustes Perdidos/i)).toBeInTheDocument();

    // Métrica 2: Horas desperdiçadas no Word
    const metrica2 = screen.getByText("4h / sem");
    expect(metrica2).toBeInTheDocument();
    expect(metrica2).toHaveClass("font-mono");
    expect(metrica2).toHaveClass("tabular-nums");
    expect(screen.getByText(/Tempo Desperdiçado/i)).toBeInTheDocument();

    // Métrica 3: Vigência & prazos atrasados
    const metrica3 = screen.getByText("21 dias");
    expect(metrica3).toBeInTheDocument();
    expect(metrica3).toHaveClass("font-mono");
    expect(metrica3).toHaveClass("tabular-nums");
    expect(screen.getByText(/Vigência & Multas/i)).toBeInTheDocument();

    // Card de impacto financeiro comparativo
    expect(screen.getByText(/Impacto Financeiro Anual/i)).toBeInTheDocument();
    expect(screen.getByText(/No improviso \(planilhas e Word\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Com a Tratto/i)).toBeInTheDocument();
  });
});
