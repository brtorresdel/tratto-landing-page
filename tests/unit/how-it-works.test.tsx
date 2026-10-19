import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
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

    // Valida presença da logo Tratto com escala equilibrada (h-16 a h-28) e animação flutuante
    const logos = screen.getAllByRole("img", { name: "Tratto" });
    expect(logos.length).toBeGreaterThan(0);
    expect(logos[0].getAttribute("class")).toMatch(/h-16|h-20|h-24|h-28/);

    const logoContainer = logos[0].closest("h2");
    expect(logoContainer).toHaveClass("animate-float-gentle");

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

  it("deve renderizar o player interativo estilo Stories com as 4 etapas da vida do contrato", () => {
    vi.useFakeTimers();
    render(<HowItWorksSection />);

    // Valida os 4 indicadores segmentados estilo Stories
    const storyIndicators = screen.getAllByRole("button", { name: /^Etapa \d:/i });
    expect(storyIndicators).toHaveLength(4);

    // Valida botões de navegação anterior e próximo centralizados na parte de baixo
    const prevBtn = screen.getByRole("button", { name: /Etapa anterior/i });
    const nextBtn = screen.getByRole("button", { name: /Próxima etapa/i });
    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
    expect(prevBtn.parentElement).toHaveClass("justify-center");

    // Valida remoção do texto antigo de rodapé
    expect(
      screen.queryByText(/Marcadores em chaves duplas identificados automaticamente/i)
    ).toBeNull();

    // Etapa 1 ativa inicialmente: Modelos & Marcadores
    expect(screen.getByRole("heading", { name: /Modelos? & Marcadores/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Você manda os seus modelos de contrato para a Tratto/i)
    ).toBeInTheDocument();
    // Valida remoção do trecho final ", no formato .doc"
    expect(screen.queryByText(/no formato \.doc/i)).toBeNull();

    // Valida que a barra antiga do editor (editor.tratto.app e Redigindo) foi removida
    expect(screen.queryByText(/editor\.tratto\.app/i)).toBeNull();
    expect(screen.queryByText(/● Redigindo/i)).toBeNull();

    // Valida presença dos modelos iniciais e remoção de 'Plataforma Tratto' e badges
    expect(screen.getByText(/Modelo 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Modelo 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Modelo 3/i)).toBeInTheDocument();
    expect(screen.queryByText(/Plataforma Tratto/i)).toBeNull();

    // Valida que a logo no canto superior esquerdo da tela do computador é fixa em preto
    const rubrics = screen.getAllByRole("img", { name: "Rubrica Tratto" });
    expect(rubrics[0]).toHaveClass("text-gray-900");

    // No início imediato (t=0), o corpo com marcadores ainda não foi digitado
    expect(screen.queryByText(/\{\{cliente_nome\}\}/i)).toBeNull();

    // Durante a digitação cadenciada do marcador (t=5500ms), o texto incompleto é preto normal (sem cor do tema)
    act(() => {
      vi.advanceTimersByTime(5500);
    });
    expect(screen.queryByText(/\{\{cliente_nome\}\}/i)).toBeNull();

    // Ao digitar o último dígito '}' (t=6600ms), o marcador é concluído e se converte na cor do tema
    act(() => {
      vi.advanceTimersByTime(1100);
    });
    const marker = screen.getByText(/\{\{cliente_nome\}\}/i);
    expect(marker).toBeInTheDocument();
    expect(marker).toHaveClass("text-[var(--accent-primary)]");
    expect(marker).toHaveClass("bg-[var(--accent-surface)]");

    // Valida exibição sequencial contínua (ex: Modelo 6 já subiu)
    expect(screen.getByText(/Modelo 6/i)).toBeInTheDocument();

    // Ao avançar o tempo (t=10100ms), novos modelos sobem sequencialmente (ex: Modelo 8) e Cláusula 1ª está em negrito
    act(() => {
      vi.advanceTimersByTime(3500);
    });
    expect(screen.getByText(/Modelo 8/i)).toBeInTheDocument();
    const clausula1 = screen.getByText(/Cláusula 1ª:/i);
    expect(clausula1.tagName.toLowerCase()).toBe("strong");
    expect(clausula1).toHaveClass("font-bold");

    vi.useRealTimers();
  });

  it("deve permitir navegar entre as 4 etapas da história pelos botões e pelas barras segmentadas", () => {
    vi.useFakeTimers();
    render(<HowItWorksSection />);

    const nextBtn = screen.getByRole("button", { name: /Próxima etapa/i });
    const prevBtn = screen.getByRole("button", { name: /Etapa anterior/i });
    const storyIndicators = screen.getAllByRole("button", { name: /^Etapa \d:/i });

    // Avança para Etapa 2: Gerando os contratos
    act(() => {
      fireEvent.click(nextBtn);
    });
    expect(screen.getByRole("heading", { name: /Gerando os contratos/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3500);
    });
    expect(screen.getAllByText(/João da Silva/i).length).toBeGreaterThan(0);

    // Avança para Etapa 3: Envio & Assinatura
    act(() => {
      fireEvent.click(nextBtn);
    });
    expect(screen.getByRole("heading", { name: /Envio & Assinatura/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3800);
    });
    expect(screen.getAllByText(/ASSINADO/i).length).toBeGreaterThan(0);

    // Avança para Etapa 4: Vigência & Reajuste Automático
    act(() => {
      fireEvent.click(nextBtn);
    });
    expect(screen.getByRole("heading", { name: /Vigência & Reajuste/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getAllByText(/Valor atualizado/i).length).toBeGreaterThan(0);

    // Clica diretamente no indicador da Etapa 1
    act(() => {
      fireEvent.click(storyIndicators[0]);
    });
    expect(screen.getByRole("heading", { name: /Modelos? & Marcadores/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(6600);
    });
    expect(screen.getByText(/\{\{cliente_nome\}\}/i)).toBeInTheDocument();

    // Clica no botão anterior -> faz o ciclo para Etapa 4
    act(() => {
      fireEvent.click(prevBtn);
    });
    expect(screen.getByRole("heading", { name: /Vigência & Reajuste/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getAllByText(/Valor atualizado/i).length).toBeGreaterThan(0);

    vi.useRealTimers();
  });

  it("deve avançar automaticamente de etapa a cada 25 segundos", () => {
    vi.useFakeTimers();
    render(<HowItWorksSection />);

    // Inicia na Etapa 1: Modelo & Marcadores
    expect(screen.getByRole("heading", { name: /Modelos? & Marcadores/i })).toBeInTheDocument();

    // Com 20 segundos ainda permanece na Etapa 1
    act(() => {
      vi.advanceTimersByTime(20000);
    });
    expect(screen.getByRole("heading", { name: /Modelos? & Marcadores/i })).toBeInTheDocument();

    // Ao completar os 25 segundos (mais 5s), transita para a Etapa 2: Gerando os contratos
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByRole("heading", { name: /Gerando os contratos/i })).toBeInTheDocument();

    vi.useRealTimers();
  });

  it("deve permitir pausar e retomar a reprodução automática dos stories pelo botão superior direito", () => {
    vi.useFakeTimers();
    render(<HowItWorksSection />);

    // Botão de pause inicialmente presente no canto superior direito
    const pauseBtn = screen.getByRole("button", { name: /Pausar reprodução automática/i });
    expect(pauseBtn).toBeInTheDocument();
    expect(pauseBtn).toHaveClass("text-[var(--accent-primary)]");
    expect(pauseBtn).toHaveClass("bg-[var(--accent-surface)]");

    // Clica para pausar
    act(() => {
      fireEvent.click(pauseBtn);
    });

    // O botão deve alternar para o estado de play/retomar
    const playBtn = screen.getByRole("button", { name: /Retomar reprodução automática/i });
    expect(playBtn).toBeInTheDocument();

    // Avança 30 segundos com o player pausado
    act(() => {
      vi.advanceTimersByTime(30000);
    });

    // Deve permanecer na Etapa 1 sem avançar automaticamente
    expect(screen.getByRole("heading", { name: /Modelos? & Marcadores/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /Gerando os contratos/i })).toBeNull();

    // Clica para retomar a reprodução automática
    act(() => {
      fireEvent.click(playBtn);
    });
    expect(screen.getByRole("button", { name: /Pausar reprodução automática/i })).toBeInTheDocument();

    // Avança os 25 segundos do story despausado
    act(() => {
      vi.advanceTimersByTime(25000);
    });

    // Agora deve ter avançado para a Etapa 2
    expect(screen.getByRole("heading", { name: /Gerando os contratos/i })).toBeInTheDocument();

    vi.useRealTimers();
  });

  it("deve simular o preenchimento na Etapa 2 via selects de Plano (carregando o contrato), Cliente, Vigência, Mensalidade e Reajuste", () => {
    vi.useFakeTimers();
    render(<HowItWorksSection />);

    const nextBtn = screen.getByRole("button", { name: /Próxima etapa/i });
    act(() => {
      fireEvent.click(nextBtn);
    });

    // Valida remoção de elementos legados
    expect(screen.queryByText(/ELABORAÇÃO RÁPIDA/i)).toBeNull();
    expect(screen.queryByText(/preenchendo\.\.\./i)).toBeNull();
    expect(screen.queryByText(/Snapshot Oficial/i)).toBeNull();
    expect(screen.queryByText(/Zero erros de digitação/i)).toBeNull();

    // No início da Etapa 2, o contrato ainda não apareceu (aguarda seleção do plano)
    expect(screen.getByText(/Modelo de Contrato Vinculado/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Salvar & Gerar/i })).toBeInTheDocument();

    // 1. Abre select de Plano primeiro (t = 400ms)
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(screen.getByText(/Plano ABC/i)).toBeInTheDocument();
    expect(screen.getByText(/Plano JKL/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Plano XYZ/i).length).toBeGreaterThan(0);

    // 2. Seleciona Plano XYZ (t = 1250ms) -> contrato surge à direita com modelo vinculado e mensalidade preenchida
    act(() => {
      vi.advanceTimersByTime(850);
    });
    expect(screen.queryByText(/Plano ABC/i)).toBeNull();
    expect(screen.getByText(/modelo_prestacao_servicos/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Plano XYZ/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/R\$ 1\.200,00/i).length).toBeGreaterThan(0);

    // 3. Abre select de Cliente (t = 1600ms)
    act(() => {
      vi.advanceTimersByTime(350);
    });
    expect(screen.getByText(/Maria Fernandes/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Solutions Ltda/i)).toBeInTheDocument();
    expect(screen.getByText(/Carlos Eduardo Pereira/i)).toBeInTheDocument();

    // 4. Seleciona Cliente João da Silva (t = 2400ms) -> preenche nome e documento no contrato
    act(() => {
      vi.advanceTimersByTime(800);
    });
    expect(screen.queryByText(/Maria Fernandes/i)).toBeNull();
    expect(screen.getAllByText(/João da Silva/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/12\.345\.678\/0001-90/i).length).toBeGreaterThan(0);

    // 5. Abre select de Vigência (t = 2800ms)
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(screen.getByText(/3 meses/i)).toBeInTheDocument();
    expect(screen.getByText(/6 meses/i)).toBeInTheDocument();
    expect(screen.getAllByText(/12 meses/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/24 meses/i)).toBeInTheDocument();

    // 6. Seleciona Vigência 12 meses (t = 3550ms)
    act(() => {
      vi.advanceTimersByTime(750);
    });
    expect(screen.queryByText(/3 meses/i)).toBeNull();
    expect(screen.getAllByText(/12 meses/i).length).toBeGreaterThan(0);

    // 7. Abre select de Atualização / Reajuste (t = 3900ms)
    act(() => {
      vi.advanceTimersByTime(350);
    });
    expect(screen.getAllByText(/Índice Oficial \(IPCA \/ IGP-M\)/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Percentual Fixo Anual \(5%\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Sem Reajuste Periódico/i)).toBeInTheDocument();

    // 8. Seleciona Reajuste (t = 4700ms) -> preenche Cláusula 3ª no contrato
    act(() => {
      vi.advanceTimersByTime(800);
    });
    expect(screen.queryByText(/Percentual Fixo Anual \(5%\)/i)).toBeNull();
    expect(screen.getByText(/Cláusula 3ª:/i)).toBeInTheDocument();
    expect(screen.getByText(/Índice Oficial \(IPCA \/ Bacen\)/i)).toBeInTheDocument();

    // Antes de salvar: o botão ainda é Salvar & Gerar e o título ainda é modelo_prestacao_servicos (sem .docx)
    expect(screen.getByRole("button", { name: /Salvar & Gerar/i })).toBeInTheDocument();
    expect(screen.getByText(/modelo_prestacao_servicos/i)).toBeInTheDocument();
    expect(screen.queryByText(/contrato_123456/i)).toBeNull();

    // 9. Avança até spinner de salvamento (t = 6500ms)
    act(() => {
      vi.advanceTimersByTime(1800);
    });
    expect(screen.getByText(/Salvando\.\.\./i)).toBeInTheDocument();

    // 10. Conclui salvamento (t = 8500ms) -> vira Salvo e oficializa contrato_123456 (sem .docx)
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText(/^Salvo$/i)).toBeInTheDocument();
    expect(screen.getByText(/contrato_123456/i)).toBeInTheDocument();

    vi.useRealTimers();
  });

  it("deve simular o fluxo de Envio & Assinatura na Etapa 3 com contrato preenchido, signatário em destaque e carimbo limpo", () => {
    vi.useFakeTimers();
    render(<HowItWorksSection />);

    const nextBtn = screen.getByRole("button", { name: /Próxima etapa/i });
    // Navega para Etapa 2
    act(() => {
      fireEvent.click(nextBtn);
    });
    // Navega para Etapa 3: Envio & Assinatura
    act(() => {
      fireEvent.click(nextBtn);
    });
    expect(screen.getByRole("heading", { name: /Envio & Assinatura/i })).toBeInTheDocument();

    // 1. Contrato reutiliza o formato oficial do final da Etapa 2 (sem .docx e com as 3 cláusulas)
    expect(screen.getByText(/contrato_123456/i)).toBeInTheDocument();
    expect(screen.getByText(/João da Silva/i)).toBeInTheDocument();
    expect(screen.getByText(/12\.345\.678\/0001-90/i)).toBeInTheDocument();
    expect(screen.getByText(/Plano XYZ/i)).toBeInTheDocument();
    expect(screen.getByText(/12 meses/i)).toBeInTheDocument();
    expect(screen.getByText(/R\$ 1\.200,00/i)).toBeInTheDocument();
    expect(screen.getByText(/Cláusula 3ª:/i)).toBeInTheDocument();
    expect(screen.getByText(/Índice Oficial \(IPCA \/ Bacen\)/i)).toBeInTheDocument();

    // 2. Signatário presente
    expect(screen.getByText(/Signatário/i)).toBeInTheDocument();

    // 3. Valida remoção do texto da parte de baixo e de 'Validade jurídica · ZapSign / Clicksign'
    expect(screen.queryByText(/Contrato pronto para despacho/i)).toBeNull();
    expect(screen.queryByText(/Documento assinado com hash e validade jurídica!/i)).toBeNull();
    expect(screen.queryByText(/Validade Jurídica · ZapSign \/ Clicksign/i)).toBeNull();

    // 4. Avança o tempo até o contrato retornar assinado (t = 3800ms)
    act(() => {
      vi.advanceTimersByTime(3800);
    });

    // O carimbo contém apenas o ícone e 'Assinado'
    expect(screen.getByText(/^Assinado$/i)).toBeInTheDocument();

    vi.useRealTimers();
  });
});
