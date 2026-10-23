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

    // Título principal O Manifesto Tratto centralizado no mobile e alinhado à esquerda a partir de 712px
    const heading = screen.getByRole("heading", { level: 2, name: /O Manifesto Tratto/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("text-center");
    expect(heading).toHaveClass("min-[712px]:text-left");
    expect(heading).toHaveClass("text-4xl");
    expect(heading).toHaveClass("min-[712px]:text-5xl");

    // Narrativa institucional com alma em Newsreader itálico
    const firstPara = screen.getByText(/desgaste e a insegurança de gerenciar acordos contratuais no improviso/i);
    expect(firstPara).toBeInTheDocument();
    expect(screen.getByText(/soluções paleativas que mais atrapalham do que ajudam/i)).toBeInTheDocument();
    expect(screen.getByText(/preencher essa lacuna/i)).toBeInTheDocument();

    const letterContainer = firstPara.closest("div[class*='font-serif']");
    expect(letterContainer).not.toBeNull();
    expect(letterContainer?.className).toMatch(/italic/);

    // Gancho de transição para o mercado
    expect(screen.getByText(/O custo invisível de gerenciar contratos no improviso\.\.\./i)).toBeInTheDocument();
    expect(screen.getByText(/O que parecia ser uma dor pontual/i)).toBeInTheDocument();
    expect(screen.getByText(/Os números a seguir traduzem com clareza o tamanho desse impacto:/i)).toBeInTheDocument();

    // Valida que o manifesto e o diagnóstico estão com tipografia ampliada
    const contentWrapper = heading.closest("div.text-left");
    expect(contentWrapper).not.toBeNull();

    const diagParagraph = screen.getByText(/O que parecia ser uma dor pontual/i);
    expect(diagParagraph).toHaveClass("text-base");
    expect(diagParagraph).toHaveClass("sm:text-lg");
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
    expect(detailPanel).toHaveClass("min-h-[280px]");
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

    // Card de impacto financeiro no improviso em alerta vermelho com título sem repetição e formato de lista
    expect(
      screen.getByText(/Considerando uma empresa com um faturamento médio de R\$ 12\.000,00 \/ mês\.\.\./i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/Simulação Real do Improviso/i)).toBeNull();
    expect(screen.queryByText(/^Base: Carteira/i)).toBeNull();
    expect(screen.queryByText(/Com a Tratto/i)).toBeNull();

    // Detalhamento dos valores e das perdas reais no improviso
    expect(screen.getByText(/-R\$ 17\.280,00/i)).toBeInTheDocument();
    expect(screen.getByText(/-R\$ 6\.480,00 \/ ano/i)).toBeInTheDocument();
    expect(screen.getByText(/-R\$ 7\.200,00 \/ ano/i)).toBeInTheDocument();
    expect(screen.getByText(/-R\$ 3\.600,00 \/ ano/i)).toBeInTheDocument();
    expect(screen.getByText(/~200 horas anuais/i)).toBeInTheDocument();
    expect(screen.getByText(/Insegurança jurídica e passivo oculto/i)).toBeInTheDocument();

    const obsParagraph = screen.getByText(/mais de 1 mês inteiro de faturamento anual/i).closest("p");
    expect(obsParagraph).not.toBeNull();
    expect(obsParagraph).toHaveClass("text-base");
    expect(obsParagraph).toHaveClass("sm:text-lg");
    expect(obsParagraph?.className).not.toMatch(/font-serif/);
    expect(obsParagraph?.className).not.toMatch(/italic/);
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

  it("CA4: Deve suportar navegação mobile estilo Stories com barras segmentadas e botões anterior/próximo", () => {
    render(<ProblemBanner />);

    // Valida presença dos 5 botões de indicadores segmentados mobile
    const segButtons = screen.getAllByRole("button", { name: /^Métrica \d:/i });
    expect(segButtons).toHaveLength(5);

    // Métrica 1 ativa inicialmente: exibe indicador 1 de 5 centralizado e sem texto '10s por métrica'
    expect(screen.getByText("1 de 5")).toBeInTheDocument();
    expect(screen.queryByText(/10s por métrica/i)).toBeNull();

    // Botões de navegação anterior e próximo
    const prevBtn = screen.getByRole("button", { name: /Métrica anterior/i });
    const nextBtn = screen.getByRole("button", { name: /Próxima métrica/i });
    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    // Clica no botão 'Próxima métrica' -> vai para métrica 2 (4h)
    fireEvent.click(nextBtn);
    expect(screen.getByText("2 de 5")).toBeInTheDocument();
    expect(screen.getByText("4h")).toBeInTheDocument();

    // Clica na barra da métrica 4 diretamente
    fireEvent.click(segButtons[3]);
    expect(screen.getByText("4 de 5")).toBeInTheDocument();
    expect(screen.getByText("-15%")).toBeInTheDocument();

    // Clica no botão 'Métrica anterior' -> volta para métrica 3 (21 dias)
    fireEvent.click(prevBtn);
    expect(screen.getByText("3 de 5")).toBeInTheDocument();
    expect(screen.getByText("21 dias")).toBeInTheDocument();
  });
});
