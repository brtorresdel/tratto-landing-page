import { describe, it, expect } from "vitest";
import { SEGMENTS, getSegmentData, DEFAULT_SEGMENT_ID, type SegmentId } from "@/lib/segments";

describe("Dicionário de Segmentos (Spec 0001 - CA3, CA4, CA5)", () => {
  it("deve conter exatamente os 5 segmentos iniciais", () => {
    const keys = Object.keys(SEGMENTS);
    expect(keys).toEqual(["coworking", "advocacia", "academias", "escolas", "contabilidade"]);
  });

  it("deve ter Coworking como segmento padrão", () => {
    expect(DEFAULT_SEGMENT_ID).toBe("coworking");
    const data = getSegmentData("coworking");
    expect(data.name).toBe("Coworking");
    expect(data.variables.cliente_nome).toBe("Estúdio Nexo Arquitetura Ltda");
    expect(data.variables.plano_valor).toBe("R$ 2.450,00 / mês");
    expect(data.variables.indice_reajuste).toBe("IPCA (Anual · Bacen)");
  });

  it("deve retornar dados específicos para Advocacia", () => {
    const data = getSegmentData("advocacia");
    expect(data.name).toBe("Advocacia");
    expect(data.variables.cliente_nome).toContain("Vanguarda");
    expect(data.clauseTitle).toContain("HONORÁRIOS");
  });

  it("deve retornar dados específicos para Academias, Escolas e Contabilidade", () => {
    const academias = getSegmentData("academias");
    expect(academias.name).toBe("Academias");
    expect(academias.variables.plano_valor).toContain("R$");

    const escolas = getSegmentData("escolas");
    expect(escolas.name).toBe("Escolas");
    expect(escolas.clauseTitle).toContain("MATRÍCULA");

    const contabilidade = getSegmentData("contabilidade");
    expect(contabilidade.name).toBe("Contabilidade");
    expect(contabilidade.clauseTitle).toContain("SERVIÇOS CONTÁBEIS");
  });

  it("deve fazer fallback seguro para Coworking caso receba um id inválido", () => {
    // @ts-expect-error teste de robustez em tempo de execução
    const fallback = getSegmentData("segmento_inexistente");
    expect(fallback.id).toBe("coworking");
    expect(fallback.name).toBe("Coworking");
  });
});
