import React from 'react';

// ============================================================================
// CONTRATOS ESTÁTICOS COM TEXTO COMPLETO E DADOS 100% FICTÍCIOS
// ============================================================================

interface StaticContractProps {
  title: string;
  clienteNome: string;
  clienteDoc: string;
  objeto: string;
  vigencia: string;
  valor: string;
  reajuste: string;
  className?: string;
}

export function StaticContractSheet({
  title,
  clienteNome,
  clienteDoc,
  objeto,
  vigencia,
  valor,
  reajuste,
  className = '',
}: StaticContractProps) {
  return (
    <div
      className={`flex flex-col justify-between rounded-lg border border-[var(--border-subtle)] bg-white p-3 sm:p-3.5 shadow-[0_6px_20px_rgba(14,18,16,0.05)] select-none transition-all duration-500 ease-out cursor-pointer hover:-translate-y-8 hover:shadow-[0_18px_36px_rgba(14,18,16,0.12)] ${className}`}
    >
      <div>
        {/* Topo do Contrato: Apenas a Rubrica Tratto Oficial em PRETO no canto ESQUERDO */}
        <div className="flex items-center justify-between pb-1.5 border-b border-neutral-100 mb-2">
          <div className="flex items-center gap-1 shrink-0 text-black" title="Rubrica Tratto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              className="h-3.5 w-3.5 text-black stroke-current fill-none"
              role="img"
              aria-label="Rubrica Tratto"
            >
              <g strokeLinecap="round" strokeLinejoin="round">
                <path d="M 6 22 C 14 20, 26 17, 40 19 C 45 20, 48 21, 48 21" strokeWidth="4.2" />
                <path
                  d="M 31 11 C 30 19, 24 31, 18 36 C 14 40, 15 44, 18 44 C 23 44, 28 37, 33 27 C 34 23, 35 17, 35 13"
                  strokeWidth="3.6"
                />
              </g>
            </svg>
          </div>
          <div className="h-1 w-6 rounded-full bg-neutral-100" />
        </div>

        {/* Título Centralizado do Instrumento */}
        <div className="text-center font-bold uppercase tracking-wider text-neutral-900 pb-1.5 text-[9px] sm:text-[9.5px] border-b border-neutral-100 mb-2 truncate">
          {title}
        </div>

        {/* Parágrafos do Contrato com Redação Completa e Marcadores na Cor do Tema */}
        <div className="space-y-1.5 text-[7.5px] sm:text-[8px] leading-relaxed text-neutral-700 font-sans">
          <p>
            Pelo presente instrumento particular, de um lado a CONTRATADA, e de outro lado como CONTRATANTE{' '}
            <span className="inline-block bg-[var(--badge-active-bg)] text-[var(--badge-active-text)] border border-[var(--border-strong)]/50 font-semibold px-1 py-0.2 rounded shadow-2xs transition-colors duration-300">
              {clienteNome}
            </span>
            , pessoa jurídica de direito privado inscrita no CNPJ sob o nº{' '}
            <span className="font-mono text-[7px] sm:text-[7.5px] text-neutral-800 bg-neutral-100 px-1 py-0.2 rounded">
              {clienteDoc}
            </span>
            .
          </p>

          <p>
            <strong>Cláusula 1ª:</strong> O objeto deste instrumento consiste na prestação dos serviços de{' '}
            <span className="font-medium text-neutral-900">{objeto}</span>, com prazo de vigência estipulado em{' '}
            <span className="inline-block bg-[var(--badge-active-bg)] text-[var(--badge-active-text)] border border-[var(--border-strong)]/50 font-semibold px-1 py-0.2 rounded shadow-2xs transition-colors duration-300">
              {vigencia}
            </span>
            .
          </p>

          <p>
            <strong>Cláusula 2ª:</strong> Em contraprestação aos serviços executados, o CONTRATANTE pagará a mensalidade no valor de{' '}
            <span className="inline-block bg-[var(--badge-active-bg)] text-[var(--badge-active-text)] border border-[var(--border-strong)]/50 font-bold px-1 py-0.2 rounded shadow-2xs transition-colors duration-300">
              {valor}
            </span>
            .
          </p>

          <p>
            <strong>Cláusula 3ª:</strong> O valor estipulado será reajustado anualmente com base na variação oficial do{' '}
            <span className="inline-block bg-[var(--badge-active-bg)] text-[var(--badge-active-text)] border border-[var(--border-strong)]/50 font-semibold px-1 py-0.2 rounded shadow-2xs transition-colors duration-300">
              {reajuste}
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPOSIÇÃO DOS 14 CONTRATOS NA BASE COM CURVA DE BÉZIER INVERTIDA
// (Mais altos nas pontas, rebaixados suavemente em direção ao centro)
// ============================================================================

export function WaitlistContractPapers() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none overflow-hidden z-0"
    >
      <div className="relative mx-auto h-full max-w-7xl">
        <div className="absolute bottom-[-16px] sm:bottom-[-24px] md:bottom-[-34px] lg:bottom-[-48px] xl:bottom-[-45px] left-1/2 -translate-x-1/2 w-[1580px] h-[300px] scale-[0.52] sm:scale-[0.62] md:scale-[0.74] lg:scale-[0.84] xl:scale-[0.94] 2xl:scale-100 origin-bottom transition-all duration-300">
          {/* Contrato 1: Ponta Esquerda (Mais alto: bottom-1) */}
          <StaticContractSheet
            title="Locação de Espaço Compartilhado"
            clienteNome="Alfa Coworking (Fictício)"
            clienteDoc="00.123.456/0001-00"
            objeto="Estações Dedicadas e Salas Privativas"
            vigencia="12 meses"
            valor="R$ 2.800,00"
            reajuste="IPCA (Bacen)"
            className="pointer-events-auto absolute bottom-1 left-[0px] w-[205px] min-h-[255px] rotate-[-7deg] z-10"
          />

          {/* Contrato 2: Descida suave (bottom-[-9px]) */}
          <StaticContractSheet
            title="Honorários Advocatícios"
            clienteNome="Exemplo & Associados Jurídico"
            clienteDoc="00.234.567/0001-00"
            objeto="Assessoria Jurídica Mensal Preventiva"
            vigencia="24 meses"
            valor="R$ 4.500,00"
            reajuste="IGP-M (FGV)"
            className="pointer-events-auto absolute bottom-[-9px] left-[105px] w-[205px] min-h-[255px] rotate-[4deg] z-11"
          />

          {/* Contrato 3: Descida contínua (bottom-[-19px]) */}
          <StaticContractSheet
            title="Prestação de Serviços de TI"
            clienteNome="Beta Tecnologia (Fictícia)"
            clienteDoc="00.345.678/0001-00"
            objeto="Sustentação de Infraestrutura Cloud"
            vigencia="12 meses"
            valor="R$ 3.900,00"
            reajuste="IPCA Oficial"
            className="pointer-events-auto absolute bottom-[-19px] left-[210px] w-[205px] min-h-[255px] rotate-[-3deg] z-12"
          />

          {/* Contrato 4: Descida contínua (bottom-[-27px]) */}
          <StaticContractSheet
            title="Adesão de Saúde Corporativa"
            clienteNome="Gama Treino & Saúde"
            clienteDoc="00.456.789/0001-00"
            objeto="Programa Corporativo de Bem-Estar"
            vigencia="12 meses"
            valor="R$ 1.950,00"
            reajuste="INPC (IBGE)"
            className="pointer-events-auto absolute bottom-[-27px] left-[315px] w-[205px] min-h-[255px] rotate-[6deg] z-13"
          />

          {/* Contrato 5: Aproximação do centro (bottom-[-34px]) */}
          <StaticContractSheet
            title="Consultoria de Gestão"
            clienteNome="Delta Negócios (Fictícia)"
            clienteDoc="00.567.890/0001-00"
            objeto="Diagnóstico e Planejamento Estratégico"
            vigencia="6 meses"
            valor="R$ 3.200,00"
            reajuste="IPCA (Bacen)"
            className="pointer-events-auto absolute bottom-[-34px] left-[420px] w-[205px] min-h-[255px] rotate-[-5deg] z-14"
          />

          {/* Contrato 6: Pré-centro (bottom-[-39px]) */}
          <StaticContractSheet
            title="Assessoria Contábil e Fiscal"
            clienteNome="Modelo BPO Financeiro"
            clienteDoc="00.678.901/0001-00"
            objeto="Escrituração Contábil e Folha de Pagamento"
            vigencia="12 meses"
            valor="R$ 2.400,00"
            reajuste="IPCA (Bacen)"
            className="pointer-events-auto absolute bottom-[-39px] left-[525px] w-[205px] min-h-[255px] rotate-[3deg] z-15"
          />

          {/* Contrato 7: Centro Exato Esquerdo (Ponto mais baixo da curva: bottom-[-42px]) */}
          <StaticContractSheet
            title="Publicidade e Mídia Digital"
            clienteNome="Ômega Agência (Fictícia)"
            clienteDoc="00.789.012/0001-00"
            objeto="Gestão Estratégica de Mídia e Conteúdo"
            vigencia="12 meses"
            valor="R$ 3.100,00"
            reajuste="IGP-M (FGV)"
            className="pointer-events-auto absolute bottom-[-42px] left-[630px] w-[205px] min-h-[255px] rotate-[-4deg] z-16"
          />

          {/* Contrato 8: Centro Exato Direito (Ponto mais baixo da curva: bottom-[-42px]) */}
          <StaticContractSheet
            title="Transporte e Logística"
            clienteNome="Simulação Cargas"
            clienteDoc="00.890.123/0001-00"
            objeto="Distribuição e Entrega Urbana Dedicada"
            vigencia="12 meses"
            valor="R$ 5.800,00"
            reajuste="IPCA (Bacen)"
            className="pointer-events-auto absolute bottom-[-42px] left-[735px] w-[205px] min-h-[255px] rotate-[5deg] z-17"
          />

          {/* Contrato 9: Subida suave (bottom-[-39px]) */}
          <StaticContractSheet
            title="Serviços Educacionais"
            clienteNome="Instituto Exemplo"
            clienteDoc="00.901.234/0001-00"
            objeto="Capacitação Profissional In-Company"
            vigencia="12 meses"
            valor="R$ 2.650,00"
            reajuste="INPC (IBGE)"
            className="pointer-events-auto absolute bottom-[-39px] left-[840px] w-[205px] min-h-[255px] rotate-[-6deg] z-18"
          />

          {/* Contrato 10: Subida contínua (bottom-[-34px]) */}
          <StaticContractSheet
            title="Assessoria Técnica Pericial"
            clienteNome="Demonstração Obras"
            clienteDoc="00.012.345/0001-00"
            objeto="Elaboração de Laudos Periciais e Vistoria"
            vigencia="12 meses"
            valor="R$ 4.100,00"
            reajuste="IPCA (Bacen)"
            className="pointer-events-auto absolute bottom-[-34px] left-[945px] w-[205px] min-h-[255px] rotate-[4deg] z-19"
          />

          {/* Contrato 11: Subida contínua (bottom-[-27px]) */}
          <StaticContractSheet
            title="Locação de Equipamentos"
            clienteNome="Sigma Locações (Fictícia)"
            clienteDoc="00.321.654/0001-00"
            objeto="Cessão Temporária de Servidores e TI"
            vigencia="12 meses"
            valor="R$ 2.300,00"
            reajuste="IPCA (Bacen)"
            className="pointer-events-auto absolute bottom-[-27px] left-[1050px] w-[205px] min-h-[255px] rotate-[-3deg] z-20"
          />

          {/* Contrato 12: Subida contínua (bottom-[-19px]) */}
          <StaticContractSheet
            title="Licenciamento SaaS"
            clienteNome="Vértice Soluções Digitais"
            clienteDoc="00.432.765/0001-00"
            objeto="Licenças de Software em Nuvem"
            vigencia="12 meses"
            valor="R$ 3.600,00"
            reajuste="IPCA Oficial"
            className="pointer-events-auto absolute bottom-[-19px] left-[1155px] w-[205px] min-h-[255px] rotate-[6deg] z-21"
          />

          {/* Contrato 13: Subida suave (bottom-[-9px]) */}
          <StaticContractSheet
            title="Segurança da Informação"
            clienteNome="Âncora Cyber (Fictícia)"
            clienteDoc="00.543.876/0001-00"
            objeto="Auditoria Periódica de Vulnerabilidades"
            vigencia="12 meses"
            valor="R$ 4.800,00"
            reajuste="IGP-M (FGV)"
            className="pointer-events-auto absolute bottom-[-9px] left-[1260px] w-[205px] min-h-[255px] rotate-[-5deg] z-22"
          />

          {/* Contrato 14: Ponta Direita (Mais alto: bottom-1) */}
          <StaticContractSheet
            title="Gestão de Facilities"
            clienteNome="Padrão Apoio & Gestão"
            clienteDoc="00.654.987/0001-00"
            objeto="Manutenção Preventiva de Instalações"
            vigencia="12 meses"
            valor="R$ 3.400,00"
            reajuste="INPC (IBGE)"
            className="pointer-events-auto absolute bottom-1 left-[1365px] w-[205px] min-h-[255px] rotate-[4deg] z-23"
          />
        </div>
      </div>
    </div>
  );
}
