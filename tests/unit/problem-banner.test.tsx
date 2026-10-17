import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import { ProblemBanner } from "@/components/problem-banner";

describe("ProblemBanner (Spec 0002 - CA1 e CA2: Carta do Dev e Métricas de Prejuízo)", () => {
  it("CA1: Deve renderizar a Carta do Dev com título, foto do autor, texto em Newsreader itálico e gancho", () => {
    const { container } = render(<ProblemBanner />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section?.id).toBe("o-problema");
    expect(section).toHaveClass("bg-[var(--accent-primary)]");
    expect(section).toHaveClass("transition-colors");

    // Título principal Carta do Dev centralizado no mobile e alinhado à esquerda a partir de 712px
    const heading = screen.getByRole("heading", { level: 2, name: /Carta do Dev/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("text-center");
    expect(heading).toHaveClass("min-[712px]:text-left");
    expect(heading).toHaveClass("text-4xl");
    expect(heading).toHaveClass("min-[712px]:text-5xl");
    expect(screen.queryByText(/^Carta do Desenvolvedor$/i)).toBeNull();

    // Container do cabeçalho: empilhado e centralizado abaixo de 712px, e lado a lado a partir de 712px
    const headerContainer = heading.closest("div[class*='min-[712px]:flex-row']");
    expect(headerContainer).not.toBeNull();
    expect(headerContainer).toHaveClass("min-[712px]:justify-between");

    // Foto do autor no topo (ao lado/abaixo do título)
    const authorPhoto = screen.getByAltText(/Foto de Bruno Torres/i);
    expect(authorPhoto).toBeInTheDocument();
    expect(authorPhoto).toHaveAttribute("src", "/bruno-torres.webp");

    // Citação do autor no topo (limpa, sem fundo/borda e com cargo Fullstack)
    const authorName = screen.getByText(/Bruno Torres/i);
    expect(authorName).toBeInTheDocument();
    expect(screen.getByText(/Desenvolvedor Fullstack & Criador da Tratto/i)).toBeInTheDocument();

    const authorCard = authorName.closest("div[class*='w-fit']");
    expect(authorCard).not.toBeNull();
    expect(authorCard?.className).not.toMatch(/bg-white\/10/);
    expect(authorCard?.className).not.toMatch(/rounded-full/);

    // Narrativa do relato real do desenvolvedor com tipografia Newsreader itálico
    const firstPara = screen.getByText(/momentos que beiravam o desespero/i);
    expect(firstPara).toBeInTheDocument();
    expect(screen.getByText(/gerados 100% na mão/i)).toBeInTheDocument();
    expect(screen.getByText(/planilha cheia de macros/i)).toBeInTheDocument();
    expect(screen.getByText(/abraço naquele Bruno do passado/i)).toBeInTheDocument();

    const letterContainer = firstPara.closest("div[class*='font-serif']");
    expect(letterContainer).not.toBeNull();
    expect(letterContainer?.className).toMatch(/italic/);

    // Gancho de transição para o mercado (sem o chapéu empírico e com novo texto humanizado)
    expect(screen.queryByText(/O diagnóstico empírico/i)).toBeNull();
    expect(screen.getByText(/O custo invisível de gerenciar contratos no improviso\.\.\./i)).toBeInTheDocument();
    expect(screen.getByText(/O que pensei ser uma dor concentrada ou de empresa específica/i)).toBeInTheDocument();
    expect(screen.getByText(/Acredito que números aqui expressem melhor o que estou querendo te dizer:/i)).toBeInTheDocument();

    // Valida que a carta e o diagnóstico estão com largura padronizada aos quadros e tipografia ampliada
    const contentWrapper = heading.closest("div.text-left");
    expect(contentWrapper).not.toBeNull();
    expect(contentWrapper?.className).not.toMatch(/max-w-3xl/);

    const diagParagraph = screen.getByText(/O que pensei ser uma dor concentrada ou de empresa específica/i);
    expect(diagParagraph).toHaveClass("text-base");
    expect(diagParagraph).toHaveClass("sm:text-lg");
    expect(diagParagraph.className).not.toMatch(/max-w-3xl/);
    expect(diagParagraph.className).not.toMatch(/max-w-2xl/);
  });

  it("CA2: Deve renderizar o painel interativo de métricas com lista à esquerda e detalhe à direita", () => {
    const { container } = render(<ProblemBanner />);

    // Verifica que a lista de métricas contém os títulos sem bordas, sem fundo e sem stat na lista
    const tab1 = screen.getByRole("tab", { name: /^Reajustes perdidos$/i });
    const tab2 = screen.getByRole("tab", { name: /^Tempo desperdiçado$/i });
    const tab3 = screen.getByRole("tab", { name: /^Vigência & multas$/i });
    const tab4 = screen.getByRole("tab", { name: /^Descontos sem controle$/i });
    const tab5 = screen.getByRole("tab", { name: /^Insegurança jurídica$/i });

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(tab3).toBeInTheDocument();
    expect(tab4).toBeInTheDocument();
    expect(tab5).toBeInTheDocument();

    // Valida proporção da grade (lado a lado a partir de 640px: sm:col-span-5 e sm:col-span-7; md:col-span-4 e md:col-span-8)
    const listCol = tab1.closest("div[class*='md:col-span-4']");
    expect(listCol).not.toBeNull();
    expect(listCol).toHaveClass("sm:col-span-5");

    const detailPanel = screen.getByRole("tabpanel");
    expect(detailPanel).toHaveClass("sm:col-span-7");
    expect(detailPanel).toHaveClass("md:col-span-8");
    expect(detailPanel).toHaveClass("min-h-[260px]");
    expect(detailPanel).toHaveClass("h-[260px]");
    expect(detailPanel).toHaveClass("sm:min-h-[250px]");
    expect(detailPanel).toHaveClass("sm:h-[250px]");

    // Valida que o cabeçalho 'Impacto Operacional' e divisores foram removidos
    expect(screen.queryByText(/Impacto Operacional/i)).toBeNull();

    // Valida animação de transição suave animate-metric-fade-in no conteúdo do card
    const animatedContent = detailPanel.querySelector(".animate-metric-fade-in");
    expect(animatedContent).not.toBeNull();

    // Valida estilo minimalista da lista (sem background ou bordas de cartão)
    expect(tab1.className).not.toMatch(/border-white/);
    expect(tab1.className).not.toMatch(/bg-white\/(?:10|20)/);

    // Métrica 1 ativa por padrão: destacada com leve negrito, deslocada à direita e com barra de progresso
    expect(tab1).toHaveClass("font-semibold");
    expect(tab1.className).toMatch(/translate-x-3|translate-x-2\.5/);

    const progressBar = tab1.querySelector(".animate-metric-progress");
    expect(progressBar).not.toBeNull();

    // Métrica inativa (tab2): sem deslocamento e com peso normal
    expect(tab2).toHaveClass("font-normal");
    expect(tab2.className).not.toMatch(/translate-x-3|translate-x-2\.5/);

    // Métrica 1 exibe número em destaque e texto descritivo no painel da direita
    expect(screen.getByText("-12,4%")).toBeInTheDocument();
    expect(
      screen.getByText(/quantidade de receita líquida perdida com contratos sem reajuste anual \/ mensal/i)
    ).toBeInTheDocument();

    // Alterna para Métrica 2 (Tempo desperdiçado) via clique do usuário
    fireEvent.click(tab2);
    expect(tab2).toHaveClass("font-semibold");
    expect(tab2.className).toMatch(/translate-x-3|translate-x-2\.5/);
    expect(tab1).toHaveClass("font-normal");

    expect(screen.getByText("4h")).toBeInTheDocument();
    expect(
      screen.getByText(/tempo médio gasto diariamente que a operação gasta preenchendo contratos/i)
    ).toBeInTheDocument();

    // Alterna para Métrica 3 (Vigência & multas)
    fireEvent.click(tab3);
    expect(screen.getByText("21 dias")).toBeInTheDocument();
    expect(
      screen.getByText(/estimativa de tempo em que a operação demora para perceber um cancelamento/i)
    ).toBeInTheDocument();

    // Alterna para Métrica 4 (Descontos sem controle)
    fireEvent.click(tab4);
    expect(screen.getByText("-15%")).toBeInTheDocument();
    expect(
      screen.getByText(/perda de margem líquida com concessões informais de desconto pela equipe comercial/i)
    ).toBeInTheDocument();

    // Alterna para Métrica 5 (Insegurança jurídica)
    fireEvent.click(tab5);
    expect(screen.getByText("18%")).toBeInTheDocument();
    expect(
      screen.getByText(/contratos ativos em operação sem a via final formalmente assinada/i)
    ).toBeInTheDocument();

    // Card de impacto financeiro comparativo continua presente
    expect(screen.getByText(/Impacto Financeiro Anual/i)).toBeInTheDocument();
    expect(screen.getByText(/No improviso \(planilhas e Word\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Com a Tratto/i)).toBeInTheDocument();
  });

  it("CA3: Deve avançar automaticamente para a próxima métrica a cada 10 segundos e reiniciar no clique", () => {
    vi.useFakeTimers();
    render(<ProblemBanner />);

    // Inicialmente na métrica 1 (-12,4%)
    expect(screen.getByText("-12,4%")).toBeInTheDocument();

    // Avança 10 segundos -> transita para métrica 2 (4h)
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(screen.getByText("4h")).toBeInTheDocument();

    // Avança mais 10 segundos -> transita para métrica 3 (21 dias)
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(screen.getByText("21 dias")).toBeInTheDocument();

    // Clique manual em Descontos sem controle (-15%) reinicia o ciclo
    const tab4 = screen.getByRole("tab", { name: /^Descontos sem controle$/i });
    act(() => {
      fireEvent.click(tab4);
    });
    expect(screen.getByText("-15%")).toBeInTheDocument();

    // Se avançar 5s, ainda permanece em Descontos sem controle
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText("-15%")).toBeInTheDocument();

    // Ao completar os 10s restantes (mais 5s), avança para métrica 5 (18%)
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText("18%")).toBeInTheDocument();

    vi.useRealTimers();
  });
});
