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

    expect(screen.getByText(/Para quem é a Tratto|Versatilidade & Aderência/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Desenhado para quem vive de contratos, não importa o segmento/i)
    ).toBeInTheDocument();
  });

  it("deve renderizar pelo menos 4 cartões de exemplos concretos de segmentos e dores resolvidas", () => {
    render(<AudienceSection />);

    // Verifica exemplos chave
    expect(screen.getByText(/Coworkings & Espaços/i)).toBeInTheDocument();
    expect(screen.getByText(/Empresas de Serviços & Consultorias/i)).toBeInTheDocument();
    expect(screen.getByText(/Academias, Estúdios & Escolas/i)).toBeInTheDocument();
    expect(screen.getByText(/Contabilidade & BPO/i)).toBeInTheDocument();

    // Verifica a frase de compromisso genérico
    expect(
      screen.getByText(/Se a sua empresa presta serviços e formaliza relações em contrato/i)
    ).toBeInTheDocument();
  });
});
