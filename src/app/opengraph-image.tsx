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
        {/* COLUNA ESQUERDA: Identidade Tratto + Status "Projeto em andamento" */}
        {/* ================================================================= */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '530px',
            height: '100%',
            paddingLeft: '76px',
            paddingRight: '24px',
          }}
        >
          {/* Logo Oficial Tratto (Tipografia Textual Vetorial com o ponto de selo) */}
          <div style={{ display: 'flex' }}>
            <svg
              viewBox="0 0 170 50"
              width="270"
              height="78"
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

          {/* Status com pontinho verde: Projeto em andamento */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '20px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D2E0D6',
              padding: '7px 16px',
              borderRadius: '9999px',
              alignSelf: 'flex-start',
              boxShadow: '0 2px 8px rgba(14, 18, 16, 0.04)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '10px',
                height: '10px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#24523B',
                }}
              />
            </div>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#1E4D35',
                letterSpacing: '-0.01em',
              }}
            >
              Projeto em andamento
            </span>
          </div>

          {/* Chamada Síntese da Tratto */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '34px',
              gap: '12px',
            }}
          >
            <div
              style={{
                fontSize: '34px',
                lineHeight: 1.22,
                fontWeight: 800,
                color: '#0E1210',
                letterSpacing: '-0.03em',
                maxWidth: '440px',
              }}
            >
              Seus contratos em 2 minutos e zero planilhas.
            </div>

            <div
              style={{
                fontSize: '17px',
                lineHeight: 1.45,
                color: '#526359',
                maxWidth: '430px',
              }}
            >
              Gere documentos sem erro a partir dos seus modelos .docx e acompanhe vigências e reajustes.
            </div>
          </div>

          {/* Rodapé da Coluna Esquerda: Domínio */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '36px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#526359',
            }}
          >
            <span>tratto.devtorres.com.br</span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* COLUNA DIREITA: Agrupamento de Contratos Reais em Leque / Ângulos */}
        {/* ================================================================= */}
        <div
          style={{
            display: 'flex',
            position: 'relative',
            width: '670px',
            height: '630px',
            overflow: 'hidden',
          }}
        >
          {/* Contrato 1: Fundo Esquerda (Honorários Advocatícios - Rotacionado -9deg) */}
          <div
            style={{
              position: 'absolute',
              top: '50px',
              left: '10px',
              width: '300px',
              height: '380px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D2E0D6',
              borderRadius: '12px',
              padding: '16px 18px',
              boxShadow: '0 16px 36px rgba(14, 18, 16, 0.08)',
              transform: 'rotate(-9deg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #F0F4F1',
                  paddingBottom: '8px',
                  marginBottom: '10px',
                }}
              >
                {/* Rubrica Tratto */}
                <svg viewBox="0 0 50 50" width="18" height="18" fill="none" stroke="#000000">
                  <path d="M 6 22 C 14 20, 26 17, 40 19 C 45 20, 48 21, 48 21" strokeWidth="4.2" strokeLinecap="round" />
                  <path d="M 31 11 C 30 19, 24 31, 18 36 C 14 40, 15 44, 18 44 C 23 44, 28 37, 33 27 C 34 23, 35 17, 35 13" strokeWidth="3.6" strokeLinecap="round" />
                </svg>
                <div style={{ width: '40px', height: '4px', borderRadius: '4px', backgroundColor: '#EBF2ED' }} />
              </div>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '9px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#0E1210',
                  letterSpacing: '0.05em',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #F0F4F1',
                  marginBottom: '10px',
                }}
              >
                Honorários Advocatícios
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '8px', lineHeight: 1.45, color: '#526359' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>CONTRATANTE:</span>
                  <span style={{ backgroundColor: '#E1EDE4', color: '#1E4D35', padding: '1px 4px', borderRadius: '3px', fontWeight: 600 }}>
                    Exemplo & Associados
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Vigência:</span>
                  <span style={{ backgroundColor: '#E1EDE4', color: '#1E4D35', padding: '1px 4px', borderRadius: '3px', fontWeight: 600 }}>
                    24 meses
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Mensalidade:</span>
                  <span style={{ backgroundColor: '#E1EDE4', color: '#1E4D35', padding: '1px 4px', borderRadius: '3px', fontWeight: 700 }}>
                    R$ 4.500,00
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Reajuste:</span>
                  <span style={{ backgroundColor: '#E1EDE4', color: '#1E4D35', padding: '1px 4px', borderRadius: '3px', fontWeight: 600 }}>
                    IGP-M (FGV)
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #F0F4F1', paddingTop: '8px' }}>
              <div style={{ width: '80px', height: '1px', backgroundColor: '#A8C2B0' }} />
              <div style={{ width: '80px', height: '1px', backgroundColor: '#A8C2B0' }} />
            </div>
          </div>

          {/* Contrato 2: Fundo Direita (Prestação de Serviços TI - Rotacionado +7deg) */}
          <div
            style={{
              position: 'absolute',
              top: '60px',
              left: '300px',
              width: '310px',
              height: '390px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D2E0D6',
              borderRadius: '12px',
              padding: '16px 18px',
              boxShadow: '0 18px 40px rgba(14, 18, 16, 0.1)',
              transform: 'rotate(7deg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #F0F4F1',
                  paddingBottom: '8px',
                  marginBottom: '10px',
                }}
              >
                <svg viewBox="0 0 50 50" width="18" height="18" fill="none" stroke="#000000">
                  <path d="M 6 22 C 14 20, 26 17, 40 19 C 45 20, 48 21, 48 21" strokeWidth="4.2" strokeLinecap="round" />
                  <path d="M 31 11 C 30 19, 24 31, 18 36 C 14 40, 15 44, 18 44 C 23 44, 28 37, 33 27 C 34 23, 35 17, 35 13" strokeWidth="3.6" strokeLinecap="round" />
                </svg>
                <div style={{ width: '40px', height: '4px', borderRadius: '4px', backgroundColor: '#EBF2ED' }} />
              </div>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '9px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#0E1210',
                  letterSpacing: '0.05em',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #F0F4F1',
                  marginBottom: '10px',
                }}
              >
                Prestação de Serviços de TI
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '8px', lineHeight: 1.45, color: '#526359' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>CONTRATANTE:</span>
                  <span style={{ backgroundColor: '#E1EDE4', color: '#1E4D35', padding: '1px 4px', borderRadius: '3px', fontWeight: 600 }}>
                    Beta Tecnologia
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Vigência:</span>
                  <span style={{ backgroundColor: '#E1EDE4', color: '#1E4D35', padding: '1px 4px', borderRadius: '3px', fontWeight: 600 }}>
                    12 meses
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Mensalidade:</span>
                  <span style={{ backgroundColor: '#E1EDE4', color: '#1E4D35', padding: '1px 4px', borderRadius: '3px', fontWeight: 700 }}>
                    R$ 3.900,00
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Reajuste:</span>
                  <span style={{ backgroundColor: '#E1EDE4', color: '#1E4D35', padding: '1px 4px', borderRadius: '3px', fontWeight: 600 }}>
                    IPCA Oficial
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #F0F4F1', paddingTop: '8px' }}>
              <div style={{ width: '80px', height: '1px', backgroundColor: '#A8C2B0' }} />
              <div style={{ width: '80px', height: '1px', backgroundColor: '#A8C2B0' }} />
            </div>
          </div>

          {/* Contrato 3: Primeiro Plano Centro (Locação de Espaço - Rotacionado -2deg, Maior Elevação) */}
          <div
            style={{
              position: 'absolute',
              top: '120px',
              left: '140px',
              width: '320px',
              height: '420px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #B8D1C0',
              borderRadius: '14px',
              padding: '18px 22px',
              boxShadow: '0 24px 50px rgba(14, 18, 16, 0.16)',
              transform: 'rotate(-2deg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #F0F4F1',
                  paddingBottom: '10px',
                  marginBottom: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg viewBox="0 0 50 50" width="22" height="22" fill="none" stroke="#000000">
                    <path d="M 6 22 C 14 20, 26 17, 40 19 C 45 20, 48 21, 48 21" strokeWidth="4.2" strokeLinecap="round" />
                    <path d="M 31 11 C 30 19, 24 31, 18 36 C 14 40, 15 44, 18 44 C 23 44, 28 37, 33 27 C 34 23, 35 17, 35 13" strokeWidth="3.6" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#0E1210', letterSpacing: '-0.01em' }}>
                    Tratto
                  </span>
                </div>
                <div style={{ width: '50px', height: '4px', borderRadius: '4px', backgroundColor: '#D9E8DD' }} />
              </div>

              <div
                style={{
                  textAlign: 'center',
                  fontSize: '10.5px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#0E1210',
                  letterSpacing: '0.06em',
                  paddingBottom: '10px',
                  borderBottom: '1px solid #F0F4F1',
                  marginBottom: '12px',
                }}
              >
                Locação de Espaço Compartilhado
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '9px', lineHeight: 1.5, color: '#3A4840' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '7.5px', color: '#526359', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Contratante
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ backgroundColor: '#E1EDE4', color: '#1E4D35', border: '1px solid #A8C2B0', padding: '1px 5px', borderRadius: '3px', fontWeight: 700 }}>
                      Alfa Coworking (Fictício)
                    </span>
                    <span style={{ backgroundColor: '#F4F4F4', color: '#555555', padding: '1px 4px', borderRadius: '3px', fontSize: '8px' }}>
                      00.123.456/0001-00
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F0F4F1', paddingTop: '6px' }}>
                  <span style={{ color: '#526359' }}>Objeto: Estações Dedicadas</span>
                  <span style={{ backgroundColor: '#E1EDE4', color: '#1E4D35', border: '1px solid #A8C2B0', padding: '1px 5px', borderRadius: '3px', fontWeight: 700 }}>
                    12 meses
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F0F4F1', paddingTop: '6px' }}>
                  <span style={{ color: '#526359' }}>Mensalidade devida:</span>
                  <span style={{ backgroundColor: '#E1EDE4', color: '#1E4D35', border: '1px solid #A8C2B0', padding: '1px 5px', borderRadius: '3px', fontWeight: 800 }}>
                    R$ 2.800,00
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F0F4F1', paddingTop: '6px' }}>
                  <span style={{ color: '#526359' }}>Reajuste anual:</span>
                  <span style={{ backgroundColor: '#E1EDE4', color: '#1E4D35', border: '1px solid #A8C2B0', padding: '1px 5px', borderRadius: '3px', fontWeight: 700 }}>
                    IPCA (Bacen)
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #F0F4F1', paddingTop: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ width: '90px', height: '1.5px', backgroundColor: '#24523B' }} />
                <span style={{ fontSize: '7.5px', color: '#526359', textTransform: 'uppercase' }}>Contratada</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ width: '90px', height: '1.5px', backgroundColor: '#24523B' }} />
                <span style={{ fontSize: '7.5px', color: '#526359', textTransform: 'uppercase' }}>Contratante</span>
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
