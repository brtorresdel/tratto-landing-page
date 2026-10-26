import { ImageResponse } from 'next/og';

export const alt = 'Tratto — Seus contratos em 2 minutos e zero planilhas';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#EBF2ED',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* ================================================================= */}
        {/* COLUNA ESQUERDA: Identidade Tratto + Título Hero + Status Dot */}
        {/* ================================================================= */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '530px',
            height: '100%',
            paddingLeft: '72px',
            paddingRight: '20px',
          }}
        >
          {/* Logo Oficial Tratto (Tipografia Textual Vetorial com o ponto de selo) */}
          <div style={{ display: 'flex' }}>
            <svg
              viewBox="0 0 170 50"
              width="260"
              height="74"
              fill="none"
            >
              <g fill="#0E1210">
                {/* t inicial */}
                <path d="M 12 11 V 18 H 6 V 23 H 12 V 36 C 12 39 14 41 17.5 41 C 19 41 20.5 40.5 21 40 V 35 C 20.5 35.2 20 35.3 19.2 35.3 C 18 35.3 17.5 34.6 17.5 33.5 V 23 H 22 V 18 H 17.5 V 11 H 12 Z" />
                {/* r */}
                <path d="M 26 18 H 31.5 V 22 C 33 19.5 36 18 39 18 C 40.5 18 41.5 18.3 42 18.6 V 24 C 41 23.5 39.8 23.2 38.5 23.2 C 35 23.2 32 25.5 32 30 V 41 H 26 V 18 Z" />
                {/* a */}
                <path d="M 53 17.8 C 48.5 17.8 45 20.5 43.5 23.5 L 48 25.5 C 49 24 50.5 23 53 23 C 55.5 23 57 24.2 57 26.5 V 27 L 51 27.5 C 45 28 42 31 42 35 C 42 39 45 41.5 49.5 41.5 C 53 41.5 56 40 57.5 37.5 V 41 H 63 V 27 C 63 21 59 17.8 53 17.8 Z M 52 37 C 49.5 37 47.5 35.8 47.5 33.5 C 47.5 31.2 49.5 30.2 52.5 30 L 57 29.8 V 32 C 57 35 55 37 52 37 Z" />
                {/* tt com traço unificado */}
                <path d="M 72 11 V 36 C 72 39 74 41 77.5 41 C 79 41 80.5 40.5 81 40 V 35 C 80.5 35.2 80 35.3 79.2 35.3 C 78 35.3 77.5 34.6 77.5 33.5 V 23 H 86 V 36 C 86 39 88 41 91.5 41 C 93 41 94.5 40.5 95 40 V 35 C 94.5 35.2 94 35.3 93.2 35.3 C 92 35.3 91.5 34.6 91.5 33.5 V 23 H 98 V 18 H 91.5 V 11 H 86 V 18 H 77.5 V 11 H 72 Z" />
                <rect x="66" y="18" width="33" height="5" rx="2" fill="#0E1210" />
                {/* o */}
                <path d="M 110 17.8 C 102 17.8 96 23.5 96 30 C 96 36.5 102 41.8 110 41.8 C 118 41.8 124 36.5 124 30 C 124 23.5 118 17.8 110 17.8 Z M 110 36.5 C 105.5 36.5 102 33.5 102 30 C 102 26.5 105.5 23.2 110 23.2 C 114.5 23.2 118 26.5 118 30 C 118 33.5 114.5 36.5 110 36.5 Z" />
              </g>
              {/* Ponto verde de selo no final */}
              <circle cx="138" cy="39" r="3.5" fill="#24523B" />
            </svg>
          </div>

          {/* Título Principal (Frase oficial da Hero da HomePage) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '30px',
              maxWidth: '460px',
            }}
          >
            <div
              style={{
                fontSize: '28px',
                lineHeight: 1.28,
                fontWeight: 700,
                color: '#0E1210',
                letterSpacing: '-0.025em',
              }}
            >
              Seus contratos deveriam levar menos de 2 minutos para ficar pronto
            </div>
            <div
              style={{
                fontSize: '28px',
                lineHeight: 1.28,
                fontWeight: 700,
                fontStyle: 'italic',
                color: '#24523B',
                letterSpacing: '-0.025em',
                marginTop: '6px',
              }}
            >
              e zero planilhas para controlar vencimentos.
            </div>
          </div>

          {/* Status com pontinho verde (Sem pill, com borda mais clara para efeito de status beacon) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '24px',
            }}
          >
            <div
              style={{
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                backgroundColor: '#24523B',
                border: '2.5px solid #84AB91',
                display: 'flex',
              }}
            />
            <span
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: '#1E4D35',
                letterSpacing: '-0.01em',
              }}
            >
              Projeto em andamento
            </span>
          </div>

          {/* Rodapé da Coluna Esquerda: Domínio */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '28px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#526359',
            }}
          >
            <span>tratto.devtorres.com.br</span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* COLUNA DIREITA: Modelo de Contrato Inclinado e Centralizado */}
        {/* ================================================================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '670px',
            height: '630px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Folha do Modelo em destaque (Centralizado, esbelto e inclinado a +3.5°) */}
          <div
            style={{
              width: '395px',
              height: '540px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #C4D8CA',
              borderRadius: '14px',
              padding: '26px 26px',
              boxShadow: '0 24px 50px rgba(14, 18, 16, 0.12), 0 4px 12px rgba(14, 18, 16, 0.04)',
              transform: 'rotate(3.5deg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            {/* Cabeçalho do documento: modelo_prestacao_servicos + Rubrica da Tratto */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #F0F4F1',
                paddingBottom: '12px',
                marginBottom: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#1E4D35',
                    backgroundColor: '#E1EDE4',
                    border: '1px solid #A8C2B0',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  modelo_prestacao_servicos
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <svg viewBox="0 0 50 50" width="22" height="22" fill="none" stroke="#000000">
                  <g strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 6 22 C 14 20, 26 17, 40 19 C 45 20, 48 21, 48 21" strokeWidth="4.2" />
                    <path d="M 31 11 C 30 19, 24 31, 18 36 C 14 40, 15 44, 18 44 C 23 44, 28 37, 33 27 C 34 23, 35 17, 35 13" strokeWidth="3.6" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Título do contrato em negrito forte */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: '12.5px',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#0E1210',
                letterSpacing: '0.06em',
                paddingBottom: '12px',
                borderBottom: '1px solid #F0F4F1',
                marginBottom: '16px',
              }}
            >
              <strong>Contrato de Prestação de Serviços</strong>
            </div>

            {/* Cláusulas completas oficiais com negrito em Cláusula *, CONTRATADA e CONTRATANTE */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                fontSize: '11.5px',
                lineHeight: 1.5,
                color: '#3A4840',
              }}
            >
              {/* Preâmbulo */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span>Pelo presente instrumento particular, de um lado a</span>
                  <span style={{ fontWeight: 800, color: '#0E1210', marginLeft: '4px' }}>CONTRATADA,</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>e de outro lado como</span>
                  <span style={{ fontWeight: 800, color: '#0E1210' }}>CONTRATANTE</span>
                  <span
                    style={{
                      backgroundColor: '#E1EDE4',
                      color: '#1E4D35',
                      border: '1px solid #A8C2B0',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontWeight: 600,
                      fontSize: '11px',
                    }}
                  >
                    {`{{cliente_nome}}`}
                  </span>
                  <span>,</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>inscrito sob o documento oficial</span>
                  <span
                    style={{
                      backgroundColor: '#E1EDE4',
                      color: '#1E4D35',
                      border: '1px solid #A8C2B0',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontWeight: 600,
                      fontSize: '11px',
                    }}
                  >
                    {`{{cliente_documento}}`}
                  </span>
                  <span>.</span>
                </div>
              </div>

              {/* Cláusula 1ª */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, color: '#0E1210', marginRight: '4px' }}>Cláusula 1ª:</span>
                  <span>O objeto deste contrato é a prestação</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>do serviço correspondente ao</span>
                  <span
                    style={{
                      backgroundColor: '#E1EDE4',
                      color: '#1E4D35',
                      border: '1px solid #A8C2B0',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontWeight: 600,
                      fontSize: '11px',
                    }}
                  >
                    {`{{plano_nome}}`}
                  </span>
                  <span>,</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>com a vigência estipulada de</span>
                  <span
                    style={{
                      backgroundColor: '#E1EDE4',
                      color: '#1E4D35',
                      border: '1px solid #A8C2B0',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontWeight: 600,
                      fontSize: '11px',
                    }}
                  >
                    {`{{vigencia_meses}}`}
                  </span>
                  <span>.</span>
                </div>
              </div>

              {/* Cláusula 2ª */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, color: '#0E1210', marginRight: '4px' }}>Cláusula 2ª:</span>
                  <span>Pela execução dos serviços, o</span>
                  <span style={{ fontWeight: 800, color: '#0E1210', marginLeft: '4px' }}>CONTRATANTE</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>pagará o valor mensal de</span>
                  <span
                    style={{
                      backgroundColor: '#E1EDE4',
                      color: '#1E4D35',
                      border: '1px solid #A8C2B0',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontWeight: 600,
                      fontSize: '11px',
                    }}
                  >
                    {`{{valor_mensal}}`}
                  </span>
                  <span>.</span>
                </div>
              </div>

              {/* Cláusula 3ª */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, color: '#0E1210', marginRight: '4px' }}>Cláusula 3ª:</span>
                  <span>O valor mensal será reajustado</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>anualmente por</span>
                  <span
                    style={{
                      backgroundColor: '#E1EDE4',
                      color: '#1E4D35',
                      border: '1px solid #A8C2B0',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontWeight: 600,
                      fontSize: '11px',
                    }}
                  >
                    {`{{tipo_reajuste}}`}
                  </span>
                  <span>.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
