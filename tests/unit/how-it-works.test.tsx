import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { HowItWorksSection } from "@/components/how-it-works-section";

describe("HowItWorksSection (Spec 0002 - CA3: Apresentação da Tratto e Como Funciona)", () => {
  it("deve renderizar a seção #como-funciona com a logo Tratto e o texto de introdução oficial", () => {
    const { container } = render(<HowItWorksSection />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section?.id).toBe("como-funciona");

    // Valida remoção do pill 'O Ciclo em 4 Passos'
    expect(screen.queryByText(/O Ciclo em 4 Passos/i)).toBeNull();

    // Valida presença da logo Tratto com escala equilibrada (h-16 a h-28)
    const logos = screen.getAllByRole("img", { name: "Tratto" });
    expect(logos.length).toBeGreaterThan(0);
    expect(logos[0].getAttribute("class")).toMatch(/h-16|h-20|h-24|h-28/);

    // Valida o texto introdutório da plataforma e largura total da área de texto
    const introParagraph = screen.getByText(/Pensando nessas dores e na minha própria experiência/i);
    expect(introParagraph).toBeInTheDocument();
    expect(introParagraph).toHaveClass("w-full");
    expect(introParagraph.className).not.toMatch(/max-w-3xl/);
    expect(introParagraph.className).not.toMatch(/max-w-2xl/);
    expect(
      screen.getByText(/E esse projeto se tornou a/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A ideia aqui é bem simples:/i)
    ).toBeInTheDocument();
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
