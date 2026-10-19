import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { AudienceSection } from "@/components/audience-section";

describe("AudienceSection (Spec 0002 - CA4: Para quem é a Tratto)", () => {
  it("deve renderizar a seção #para-quem-e com o posicionamento genérico e editorial", () => {
    const { container } = render(<AudienceSection />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section?.id).toBe("para-quem-e");

    expect(screen.getByText(/Afinal, pra quem é a Tratto\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Quando pensamos em contrato, imaginamos uma infinidade de segmentos/i)
    ).toBeInTheDocument();
  });

  it("deve renderizar pelo menos 4 cartões de exemplos concretos de segmentos e dores resolvidas", () => {
    render(<AudienceSection />);

    // Verifica os 6 segmentos chave
    expect(screen.getByText(/^Coworkings$/i)).toBeInTheDocument();
    expect(screen.getByText(/Escritórios de advocacia/i)).toBeInTheDocument();
    expect(screen.getByText(/Academias, Estúdios & Escolas/i)).toBeInTheDocument();
    expect(screen.getByText(/Contabilidade & BPO/i)).toBeInTheDocument();
    expect(screen.getByText(/RH & Compliance/i)).toBeInTheDocument();
    expect(screen.getByText(/Outros segmentos/i)).toBeInTheDocument();
  });

  it("deve renderizar o bloco de profissionais individuais com os exemplos de autônomos", () => {
    render(<AudienceSection />);

    expect(
      screen.getByText(/profissionais individuais também t[eê]m um espaço na Tratto, incluindo:/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/DJs/i)).toBeInTheDocument();
    expect(screen.getByText(/Tatuadores/i)).toBeInTheDocument();
    expect(screen.getByText(/Desenvolvedores/i)).toBeInTheDocument();
  });
});

