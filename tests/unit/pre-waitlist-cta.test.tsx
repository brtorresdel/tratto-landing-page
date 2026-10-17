import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { PreWaitlistCta } from "@/components/pre-waitlist-cta";

describe("PreWaitlistCta (Spec 0002 - CA8 e CA9: CTA Final de Narrativa)", () => {
  it("deve renderizar a chamada de encerramento da narrativa com botão apontando para #lista-de-espera", () => {
    render(<PreWaitlistCta />);

    expect(
      screen.getByText(/Chega de perder tempo e dinheiro com contratos no improviso/i)
    ).toBeInTheDocument();

    const ctaButton = screen.getByRole("link", {
      name: /Garantir vaga na lista de espera/i,
    });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "#lista-de-espera");
  });

  it("deve conter microcópia editorial e selos de valor sem artifícios de IA", () => {
    render(<PreWaitlistCta />);

    expect(screen.getAllByText(/Acesso prioritário no pré-lançamento/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Condições fundadoras permanentes/i)[0]).toBeInTheDocument();
  });
});
