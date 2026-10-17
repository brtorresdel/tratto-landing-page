import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { ProblemBanner } from "@/components/problem-banner";

describe("ProblemBanner (Spec 0002 - CA1 e CA2: Carta do Dev e Métricas de Prejuízo)", () => {
  it("CA1: Deve renderizar a Carta do Desenvolvedor com tema dinâmico, vivência, assinatura e gancho", () => {
    const { container } = render(<ProblemBanner />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section?.id).toBe("o-problema");
    expect(section).toHaveClass("bg-[var(--accent-primary)]");
    expect(section).toHaveClass("transition-colors");

    // Chapéu editorial
    expect(screen.getByText(/Carta do Desenvolvedor|De quem viveu o problema na pele/i)).toBeInTheDocument();

    // Narrativa do relato
    expect(screen.getByText(/escritório de advocacia/i)).toBeInTheDocument();
    expect(screen.getByText(/coworking/i)).toBeInTheDocument();

    // Assinatura do autor
    expect(screen.getByText(/Bruno Torres/i)).toBeInTheDocument();
    expect(screen.getByText(/Criador do Tratto/i)).toBeInTheDocument();

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
    expect(screen.getByText(/Com o Tratto/i)).toBeInTheDocument();
  });
});
