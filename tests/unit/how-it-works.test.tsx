import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { HowItWorksSection } from "@/components/how-it-works-section";

describe("HowItWorksSection (Spec 0002 - CA3: O Ciclo em 4 Passos)", () => {
  it("deve renderizar a seção #como-funciona com o chapéu editorial e título em Newsreader", () => {
    const { container } = render(<HowItWorksSection />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section?.id).toBe("como-funciona");

    expect(screen.getByText(/Como Funciona a Tratto|O Ciclo em 4 Passos/i)).toBeInTheDocument();
    expect(screen.getByText(/Do modelo no Word ao reajuste anual automático/i)).toBeInTheDocument();
  });

  it("deve renderizar os 4 passos sequenciais com numeração em Geist Mono e resumos objetivos", () => {
    render(<HowItWorksSection />);

    // Passo 01
    expect(screen.getByText("01")).toHaveClass("font-mono");
    expect(screen.getByText(/Traga seus modelos em \.docx/i)).toBeInTheDocument();
    expect(screen.getByText(/marcadores simples como/i)).toBeInTheDocument();

    // Passo 02
    expect(screen.getByText("02")).toHaveClass("font-mono");
    expect(screen.getByText(/Gere minutas e aprove descontos/i)).toBeInTheDocument();
    expect(screen.getByText(/aprovação formal pelo supervisor/i)).toBeInTheDocument();

    // Passo 03
    expect(screen.getByText("03")).toHaveClass("font-mono");
    expect(screen.getByText(/Assine com validade jurídica/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ZapSign.*Clicksign.*modo manual/i)[0]).toBeInTheDocument();

    // Passo 04
    expect(screen.getByText("04")).toHaveClass("font-mono");
    expect(screen.getByText(/Vigência, reajustes e parcelas/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Banco Central/i)[0]).toBeInTheDocument();
  });
});
