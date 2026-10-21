import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { SecuritySection } from "@/components/security-section";

describe("SecuritySection (Spec 0002 - CA5: Segurança e Rastreabilidade)", () => {
  it("deve renderizar a seção #seguranca com chapéu editorial e título em Newsreader", () => {
    const { container } = render(<SecuritySection />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section?.id).toBe("seguranca");

    expect(
      screen.getByText(/Mas com tudo isso, é realmente seguro\?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Tendo tanta funcionalidade e controle dos contratos, é natural se preocupar com a segurança deles/i)
    ).toBeInTheDocument();
  });

  it("deve renderizar os 4 pilares de integridade e segurança técnica", () => {
    render(<SecuritySection />);

    // Pilar 1: Individualidade (Superior Esquerdo)
    expect(screen.getByText(/Individualidade/i)).toBeInTheDocument();
    expect(screen.getByText(/identificação única/i)).toBeInTheDocument();

    // Pilar 2: Conformidade (Superior Direito)
    expect(screen.getByText(/Conformidade/i)).toBeInTheDocument();
    expect(screen.getByText(/Seguindo a LGPD a risca/i)).toBeInTheDocument();

    // Pilar 3: Rastreabilidade (Inferior Esquerdo)
    expect(screen.getByText(/Rastreabilidade/i)).toBeInTheDocument();
    expect(screen.getByText(/histórico que pode ser consultado/i)).toBeInTheDocument();

    // Pilar 4: Portabilidade (Inferior Direito)
    expect(screen.getByText(/Portabilidade/i)).toBeInTheDocument();
    expect(screen.getByText(/exportar cadastros, contratos, vigências/i)).toBeInTheDocument();
  });
});
