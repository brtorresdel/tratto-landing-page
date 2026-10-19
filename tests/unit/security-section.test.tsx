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

    // Pilar 1: Isolamento Multi-tenant
    expect(screen.getByText(/Isolamento Multi-tenant/i)).toBeInTheDocument();
    expect(screen.getByText(/organizationId validado no servidor/i)).toBeInTheDocument();

    // Pilar 2: AuditLog Imutável
    expect(screen.getByText(/Rastreabilidade Imutável/i)).toBeInTheDocument();
    expect(screen.getByText(/AuditLog/i)).toBeInTheDocument();

    // Pilar 3: Conformidade LGPD
    expect(screen.getByText(/Conformidade com a LGPD/i)).toBeInTheDocument();
    expect(screen.getByText(/sem rastreadores invasivos/i)).toBeInTheDocument();

    // Pilar 4: Portabilidade sem Lock-in
    expect(screen.getByText(/Portabilidade sem Lock-in/i)).toBeInTheDocument();
    expect(screen.getByText(/CSV e XLSX/i)).toBeInTheDocument();
  });
});
