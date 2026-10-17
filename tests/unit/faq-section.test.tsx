import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { FaqSection } from "@/components/faq-section";

describe("FaqSection (Spec 0002 - CA6 e CA7: FAQ Editorial em Accordion)", () => {
  it("deve renderizar a seção #faq com chapéu editorial e título em Newsreader", () => {
    const { container } = render(<FaqSection />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section?.id).toBe("faq");

    expect(screen.getByText(/Perguntas Frequentes|Dúvidas Comuns/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Respostas claras para quem quer entender como o Tratto funciona/i)
    ).toBeInTheDocument();
  });

  it("deve renderizar 5 perguntas frequentes com botões acessíveis e aria-expanded inicial", () => {
    render(<FaqSection />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);

    // Verifica que todas iniciam recolhidas
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("aria-expanded", "false");
    });

    expect(screen.getByText(/Preciso trocar meus modelos de contrato em \.docx/i)).toBeInTheDocument();
    expect(screen.getByText(/O Tratto é uma plataforma de assinatura eletrônica/i)).toBeInTheDocument();
    expect(screen.getByText(/Como funciona o cálculo de reajuste por inflação/i)).toBeInTheDocument();
    expect(screen.getByText(/Quanto vai custar o Tratto quando for lançado/i)).toBeInTheDocument();
    expect(screen.getByText(/Quando os convites da lista de espera serão liberados/i)).toBeInTheDocument();
  });

  it("deve alternar a visibilidade da resposta ao clicar na pergunta e sincronizar aria-expanded", () => {
    render(<FaqSection />);

    const firstQuestionBtn = screen.getByRole("button", {
      name: /Preciso trocar meus modelos de contrato em \.docx/i,
    });

    // Clica para abrir
    fireEvent.click(firstQuestionBtn);
    expect(firstQuestionBtn).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(/Você continua usando exatamente os arquivos do Word/i)
    ).toBeInTheDocument();

    // Clica novamente para fechar
    fireEvent.click(firstQuestionBtn);
    expect(firstQuestionBtn).toHaveAttribute("aria-expanded", "false");
  });

  it("deve permitir que apenas um item permaneça expandido por vez ao clicar em outro item", () => {
    render(<FaqSection />);

    const firstBtn = screen.getByRole("button", {
      name: /Preciso trocar meus modelos de contrato em \.docx/i,
    });
    const secondBtn = screen.getByRole("button", {
      name: /O Tratto é uma plataforma de assinatura eletrônica/i,
    });

    // Abre o primeiro
    fireEvent.click(firstBtn);
    expect(firstBtn).toHaveAttribute("aria-expanded", "true");
    expect(secondBtn).toHaveAttribute("aria-expanded", "false");

    // Abre o segundo -> primeiro deve fechar
    fireEvent.click(secondBtn);
    expect(firstBtn).toHaveAttribute("aria-expanded", "false");
    expect(secondBtn).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(/Não somos uma certificadora própria/i)
    ).toBeInTheDocument();
  });
});
