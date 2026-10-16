import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { LiveDocumentCard } from "@/components/live-document-card";

describe("Componentes da Hero e Navbar (Spec 0001 - CA1, CA2, CA3, CA4)", () => {
  it("CA1: Navbar deve renderizar o ícone oficial e botão de lista de espera", () => {
    render(<Navbar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByAltText("Ícone Tratto")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /entrar na lista/i })).toBeInTheDocument();
  });

  it("CA2: Hero deve renderizar headline em 3 linhas com ênfase no itálico e logo com ponto dinâmico", () => {
    render(<Hero />);
    expect(
      screen.getByText("Seus contratos deveriam levar menos de")
    ).toBeInTheDocument();
    expect(screen.getByText("2 minutos para ficar pronto")).toBeInTheDocument();
    
    const italicLine = screen.getByText("e zero planilhas para controlar vencimentos.");
    expect(italicLine).toBeInTheDocument();
    expect(italicLine).toHaveClass("font-semibold");
    expect(italicLine).toHaveClass("font-serif");

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Aqui nasce a/i,
      })
    ).toBeInTheDocument();

    const aquiNasce = screen.getByText("Aqui nasce a");
    expect(aquiNasce).toHaveClass("font-medium");

    const logo = screen.getByRole("img", { name: /Tratto/i });
    expect(logo).toBeInTheDocument();
    const sealDot = logo.querySelector("circle");
    expect(sealDot).not.toBeNull();
    expect(sealDot).toHaveAttribute("fill", "var(--accent-primary, #24523B)");
  });

  it("CA3: LiveDocumentCard deve iniciar em Coworking com marcadores esperados", () => {
    render(<LiveDocumentCard />);
    expect(screen.getAllByText("Estúdio Nexo Arquitetura Ltda")).toHaveLength(2);
    expect(screen.getAllByText("R$ 2.450,00 / mês")).toHaveLength(2);
    expect(screen.getByText("IPCA (Anual · Bacen)")).toBeInTheDocument();
    expect(screen.getByText("CLÁUSULA 1ª — DO OBJETO E VALOR")).toBeInTheDocument();
  });

  it("CA4: LiveDocumentCard deve alternar para Advocacia ao clicar na pílula correspondente", () => {
    render(<LiveDocumentCard />);
    const advocaciaBtn = screen.getByRole("tab", { name: /advocacia/i });
    fireEvent.click(advocaciaBtn);

    expect(screen.getByText(/CLÁUSULA 1ª — DOS HONORÁRIOS E PARTIDO MENSAL/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Vanguarda Participações e Empreendimentos S.A./i)).toHaveLength(2);
    expect(screen.getAllByText("R$ 4.800,00 / mês")).toHaveLength(2);
  });
});
