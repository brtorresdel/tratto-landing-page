export type SegmentId = "coworking" | "advocacia" | "academias" | "escolas" | "contabilidade";

export interface SegmentConfig {
  id: SegmentId;
  name: string;
  templateFileName: string;
  variables: {
    cliente_nome: string;
    plano_valor: string;
    indice_reajuste: string;
    detalhe_extra?: string;
  };
  clauseTitle: string;
  clauseBody: string;
  clauseNote: string;
}

export const SEGMENTS: Record<SegmentId, SegmentConfig> = {
  coworking: {
    id: "coworking",
    name: "Coworking",
    templateFileName: "minuta_coworking_v2.docx",
    variables: {
      cliente_nome: "Estúdio Nexo Arquitetura Ltda",
      plano_valor: "R$ 2.450,00 / mês",
      indice_reajuste: "IPCA (Anual · Bacen)",
      detalhe_extra: "Sala Privativa 04 + 10h de Reunião",
    },
    clauseTitle: "CLÁUSULA 1ª — DO OBJETO E VALOR",
    clauseBody:
      "Pelo presente instrumento particular, a CONTRATADA cede à Estúdio Nexo Arquitetura Ltda o direito de uso das posições privativas e infraestrutura contratada, mediante pagamento mensal de R$ 2.450,00.",
    clauseNote:
      "Parágrafo Único: O valor mensal pactuado será reajustado a cada 12 meses pela variação acumulada do IPCA apurada pelo Banco Central.",
  },
  advocacia: {
    id: "advocacia",
    name: "Advocacia",
    templateFileName: "contrato_honorarios_partido.docx",
    variables: {
      cliente_nome: "Vanguarda Participações e Empreendimentos S.A.",
      plano_valor: "R$ 4.800,00 / mês",
      indice_reajuste: "IPCA (Anual · Bacen)",
      detalhe_extra: "Assessoria Jurídica Mensal Preventiva",
    },
    clauseTitle: "CLÁUSULA 1ª — DOS HONORÁRIOS E PARTIDO MENSAL",
    clauseBody:
      "Pela prestação contínua dos serviços de consultoria jurídica consultiva, a CONTRATANTE pagará à CONTRATADA o valor mensal fixo de R$ 4.800,00.",
    clauseNote:
      "Parágrafo Primeiro: O valor dos honorários será reajustado automaticamente no aniversário do contrato com base no índice oficial do IPCA.",
  },
  academias: {
    id: "academias",
    name: "Academias",
    templateFileName: "termo_adesao_plano_anual.docx",
    variables: {
      cliente_nome: "Mariana Siqueira de Albuquerque",
      plano_valor: "R$ 189,90 / mês",
      indice_reajuste: "IPCA (Anual · Bacen)",
      detalhe_extra: "Plano Black 12 Meses com Acesso Total",
    },
    clauseTitle: "CLÁUSULA 1ª — DA ADESÃO E MENSALIDADE",
    clauseBody:
      "O presente termo concede ao ALUNO acesso irrestrito às dependências da academia mediante contraprestação mensal recorrente de R$ 189,90.",
    clauseNote:
      "Parágrafo Único: A renovação anual do plano seguirá a variação acumulada do IPCA, resguardado o direito de aviso prévio de 30 dias.",
  },
  escolas: {
    id: "escolas",
    name: "Escolas",
    templateFileName: "contrato_prestacao_servicos_educacionais.docx",
    variables: {
      cliente_nome: "Carlos Eduardo Mendes (Responsável)",
      plano_valor: "R$ 1.620,00 / mês",
      indice_reajuste: "IPCA (Anual · Bacen)",
      detalhe_extra: "Ensino Fundamental II — 8º Ano Matutino",
    },
    clauseTitle: "CLÁUSULA 1ª — DA MATRÍCULA E ANUIDADE",
    clauseBody:
      "A CONTRATADA obriga-se a ministrar o currículo pedagógico ao educando indicado por Carlos Eduardo Mendes, mediante anuidade dividida em parcelas mensais de R$ 1.620,00.",
    clauseNote:
      "Parágrafo Segundo: Os reajustes anuais das mensalidades observarão a legislação educacional vigente e a recomposição inflacionária pelo IPCA.",
  },
  contabilidade: {
    id: "contabilidade",
    name: "Contabilidade",
    templateFileName: "contrato_prestacao_servicos_contabeis.docx",
    variables: {
      cliente_nome: "InovaLog Distribuidora e Logística Eireli",
      plano_valor: "R$ 2.150,00 / mês",
      indice_reajuste: "IPCA (Anual · Bacen)",
      detalhe_extra: "Escrituração Fiscal, Contábil e Folha de Pagamento",
    },
    clauseTitle: "CLÁUSULA 1ª — DOS SERVIÇOS CONTÁBEIS E REMUNERAÇÃO",
    clauseBody:
      "A CONTRATADA assume a escrituração fiscal, contábil e de departamento pessoal da InovaLog Distribuidora, mediante honorários mensais de R$ 2.150,00.",
    clauseNote:
      "Parágrafo Primeiro: O valor pactuado será revisto anualmente com aplicação do IPCA apurado pelo Banco Central do Brasil.",
  },
};

export const DEFAULT_SEGMENT_ID: SegmentId = "coworking";

export function getSegmentData(id: SegmentId): SegmentConfig {
  if (id in SEGMENTS) {
    return SEGMENTS[id];
  }
  return SEGMENTS[DEFAULT_SEGMENT_ID];
}
