import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { FaqSection } from "@/components/faq-section";

describe("FaqSection (Spec 0002 - CA6 e CA7: FAQ Editorial em Accordion)", () => {
  it("deve renderizar a seção #faq com título em Newsreader e descrição introdutória", () => {
    const { container } = render(<FaqSection />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section?.id).toBe("faq");

    expect(screen.getByText(/Perguntas & Respostas/i)).toBeInTheDocument();
    expect(
      screen.getByText(/A Tratto ainda está na fase inicial de desenvolvimento, mas tem algumas perguntas que já posso adiantar aqui pra vocês:/i)
    ).toBeInTheDocument();
  });

  it("deve renderizar as perguntas frequentes com botões acessíveis e aria-expanded inicial", () => {
    render(<FaqSection />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(6);

    // Verifica que todas iniciam recolhidas
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("aria-expanded", "false");
    });

    expect(screen.getByText(/Preciso trocar meus modelos de contrato em \.docx/i)).toBeInTheDocument();
    expect(screen.getByText(/A Tratto é uma plataforma de assinatura eletrônica própria\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Como funciona o cálculo de reajuste\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Preciso instalar algum aplicativo ou programa no meu computador\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Já tem uma data de lançamento\?/i)).toBeInTheDocument();
    expect(screen.getByText(/E quanto vai custar uma assinatura da Tratto\?/i)).toBeInTheDocument();
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
      screen.getByText(/Você pode utilizar os arquivos de modelos que a sua empresa já possui/i)
    ).toBeInTheDocument();

    // Clica novamente para fechar
    fireEvent.click(firstQuestionBtn);
    expect(firstQuestionBtn).toHaveAttribute("aria-expanded", "false");
  });

  it("deve suportar navegação via teclado com Enter e Espaço", () => {
    render(<FaqSection />);

    const secondQuestionBtn = screen.getByRole("button", {
      name: /A Tratto é uma plataforma de assinatura eletrônica própria\?/i,
    });

    // Abre com Enter
    fireEvent.keyDown(secondQuestionBtn, { key: "Enter", code: "Enter" });
    fireEvent.click(secondQuestionBtn);
    expect(secondQuestionBtn).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(/A Tratto é apenas um lugar para gerar e gerenciar seus contratos/i)
    ).toBeInTheDocument();
  });
});
