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

  it("CA2: Hero deve renderizar headline do problema e o bloco 'Aqui nasce a' com a logo oficial", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Seus contratos deveriam levar menos de 2 minutos para chegar aos seus clientes/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Aqui nasce a/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByAltText("Tratto")).toBeInTheDocument();
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
