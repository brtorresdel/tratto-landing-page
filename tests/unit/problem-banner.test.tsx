import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { ProblemBanner } from "@/components/problem-banner";

describe("ProblemBanner (Esqueleto da Seção O Problema e Métricas)", () => {
  it("deve renderizar a faixa com a cor do tema e elevação com sombras", () => {
    const { container } = render(<ProblemBanner />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section).toHaveClass("bg-[var(--accent-primary)]");
    expect(section).toHaveClass("relative");
    expect(section).toHaveClass("z-20");
    expect(screen.getByText(/O Problema Real/i)).toBeInTheDocument();
  });
});
