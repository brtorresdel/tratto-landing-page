import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { LiveDocumentCard } from "@/components/live-document-card";

describe("Componentes da Hero e Navbar (Spec 0001 - CA1, CA2, CA3, CA4)", () => {
  it("CA1: Navbar deve renderizar o ícone oficial e botão de lista de espera", () => {
    render(<Navbar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByAltText("Ícone Tratto")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /entrar na lista/i })).toBeInTheDocument();
  });

  it("CA2: Hero deve renderizar headline em 3 linhas com ênfase no itálico e logo com ponto dinâmico", () => {
    render(<Hero />);
    expect(
      screen.getByText("Seus contratos deveriam levar menos de")
    ).toBeInTheDocument();
    expect(screen.getByText("2 minutos para ficar pronto")).toBeInTheDocument();
    
    const italicLine = screen.getByText("e zero planilhas para controlar vencimentos.");
    expect(italicLine).toBeInTheDocument();
    expect(italicLine).toHaveClass("font-semibold");
    expect(italicLine).toHaveClass("font-serif");

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Aqui nasce a/i,
      })
    ).toBeInTheDocument();

    const aquiNasce = screen.getByText("Aqui nasce a");
    expect(aquiNasce).toHaveClass("font-medium");

    const logo = screen.getByRole("img", { name: /Tratto/i });
    expect(logo).toBeInTheDocument();
    const sealDot = logo.querySelector("circle");
    expect(sealDot).not.toBeNull();
    expect(sealDot).toHaveAttribute("fill", "var(--accent-primary, #24523B)");

    const heroSection = document.querySelector("section");
    expect(heroSection?.className).toMatch(/lg:min-h-\[730px\]/);
    expect(heroSection?.className).toMatch(/md:min-h-\[640px\]/);
    expect(heroSection?.className).toMatch(/lg:pb-12/);
  });

  it("CA3: LiveDocumentCard deve iniciar em Coworking com marcadores esperados", () => {
    render(<LiveDocumentCard />);
    expect(screen.getAllByText("Estúdio Nexo Arquitetura Ltda")).toHaveLength(2);
    expect(screen.getAllByText("R$ 2.450,00 / mês")).toHaveLength(2);
    expect(screen.getByText("IPCA (Anual · Bacen)")).toBeInTheDocument();
    expect(screen.getByText("CLÁUSULA 1ª — DO OBJETO E VALOR")).toBeInTheDocument();
  });

  it("CA4: LiveDocumentCard deve alternar para Advocacia ao clicar na pílula correspondente", () => {
    render(<LiveDocumentCard />);
    const advocaciaBtn = screen.getByRole("tab", { name: /advocacia/i });
    fireEvent.click(advocaciaBtn);

    expect(screen.getByText(/CLÁUSULA 1ª — DOS HONORÁRIOS E PARTIDO MENSAL/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Vanguarda Participações e Empreendimentos S.A./i)).toHaveLength(2);
    expect(screen.getAllByText("R$ 4.800,00 / mês")).toHaveLength(2);
  });

  it("CA6: Hero deve renderizar 8 papéis aglomerados nos cantos com animação fanning out independente por pilha", () => {
    render(<Hero />);
    // 4 na lateral esquerda
    expect(screen.getAllByText(/contrato_prestacao_v3_final/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/tirar multa por atraso/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/vencimentos_2024\.xlsx/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Alpha Logística/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Prisma Consultoria/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/notificacao_rescisao_atrasada\.pdf/i)[0]).toBeInTheDocument();

    // 4 na lateral direita
    expect(screen.getAllByText(/reajuste pelo ipca venceu/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/termo_adesao_pendente\.pdf/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/esqueci de anexar o arquivo \.docx/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/pasta_suspensa_arquivo_2023\.scan/i)[0]).toBeInTheDocument();

    // Verifica que existem grupos independentes para pilha esquerda e direita no desktop (lg)
    const leftCluster = screen.getAllByText(/contrato_prestacao_v3_final/i)[0].closest("div[class*='group/left']");
    expect(leftCluster).not.toBeNull();
    expect(leftCluster?.className).toMatch(/lg:scale-\[0\.72\]/);
    expect(leftCluster?.className).toMatch(/hidden lg:block/);

    const rightCluster = screen.getAllByText(/termo_adesao_pendente\.pdf/i)[0].closest("div[class*='group/right']");
    expect(rightCluster).not.toBeNull();
    expect(rightCluster?.className).toMatch(/lg:scale-\[0\.72\]/);
    expect(rightCluster?.className).toMatch(/hidden lg:block/);

    // Verifica que existe o container espalhado na base para tablet e mobile (< 1024px)
    const spreadCluster = document.querySelector("div[class*='group/spread']");
    expect(spreadCluster).not.toBeNull();
    expect(spreadCluster?.className).toMatch(/block lg:hidden/);
    expect(spreadCluster?.className).toMatch(/bottom-\[-/);
    expect(spreadCluster?.innerHTML).toMatch(/-translate-y/);
    expect(spreadCluster?.innerHTML).not.toMatch(/hover:!-translate-y/);

    // Verifica que os cartões possuem background sólido (sem glassmorphism/backdrop-blur)
    const firstCard = screen.getAllByText(/contrato_prestacao_v3_final/i)[0].closest("div[class*='rounded-lg']");
    expect(firstCard).not.toBeNull();
    expect(firstCard?.className).toMatch(/var\(--accent-surface\)/);
    expect(firstCard?.className).not.toMatch(/backdrop-blur/);
    expect(firstCard?.className).toMatch(/group-hover\/left:/);

    // Verifica que o card XLSX reage dinamicamente ao tema (sem verde emerald hardcoded e sem bg-white fixo)
    const xlsxHeader = screen.getAllByText(/vencimentos_2024\.xlsx/i)[0].closest("div[class*='justify-between']");
    expect(xlsxHeader).not.toBeNull();
    expect(xlsxHeader?.className).toMatch(/var\(--accent-primary\)/);
    expect(xlsxHeader?.className).not.toMatch(/bg-emerald/);

    const xlsxTable = screen.getAllByText(/Alpha Logística/i)[0].closest("table");
    expect(xlsxTable).not.toBeNull();
    expect(xlsxTable?.className).toMatch(/var\(--accent-surface\)/);
    expect(xlsxTable?.className).not.toMatch(/\bbg-white\b/);
  });
});
