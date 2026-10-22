import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";

describe("ThemeSwitcher (Spec 0001 - Suporte Multitemas Sage Paper)", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("data-theme");
    localStorage.clear();
  });

  it("deve renderizar os 5 botões de temas pastéis", () => {
    render(<ThemeSwitcher />);
    expect(screen.getByRole("button", { name: /tema sálvia/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /tema manteiga/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /tema pêssego/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /tema coral/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /tema céu/i })).toBeInTheDocument();
  });

  it("deve alterar o atributo data-theme no html ao clicar em Manteiga", () => {
    render(<ThemeSwitcher />);
    const butterBtn = screen.getByRole("button", { name: /tema manteiga/i });
    fireEvent.click(butterBtn);

    expect(document.documentElement.getAttribute("data-theme")).toBe("butter");
    expect(localStorage.getItem("tratto-theme")).toBe("butter");
  });

  it("deve alternar para Céu ao clicar no botão correspondente", () => {
    render(<ThemeSwitcher />);
    const skyBtn = screen.getByRole("button", { name: /tema céu/i });
    fireEvent.click(skyBtn);

    expect(document.documentElement.getAttribute("data-theme")).toBe("sky");
    expect(localStorage.getItem("tratto-theme")).toBe("sky");
  });

  it("deve abrir e fechar o menu vertical ao clicar no botão da paleta e com Escape", () => {
    render(<ThemeSwitcher />);
    const toggleBtn = screen.getByRole("button", { name: /alternar paleta de temas/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).toHaveAttribute("aria-expanded", "false");

    // Clica para abrir
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute("aria-expanded", "true");

    // Fecha com tecla Escape
    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggleBtn).toHaveAttribute("aria-expanded", "false");
  });
});
