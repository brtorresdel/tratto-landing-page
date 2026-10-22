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
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#EBF2ED',
          padding: '60px 80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Topo: Logo & Badge Editorial */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo Marca Tratto */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              fontSize: '44px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#0E1210',
            }}
          >
            <span>Tratto</span>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#24523B',
                marginLeft: '4px',
                marginBottom: '4px',
              }}
            />
          </div>

          {/* Badge Editorial */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#D9E8DD',
              color: '#1E4D35',
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '18px',
              fontWeight: 600,
              border: '1px solid #A8C2B0',
            }}
          >
            SaaS de Contratos para PMEs
          </div>
        </div>

        {/* Centro: Chamada Principal Editorial */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: '56px',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#0E1210',
              letterSpacing: '-0.03em',
              maxWidth: '1000px',
            }}
          >
            Seus contratos em menos de 2 minutos e zero planilhas.
          </div>

          <div
            style={{
              fontSize: '26px',
              lineHeight: 1.4,
              color: '#526359',
              maxWidth: '920px',
            }}
          >
            Preencha modelos .docx sem erro de digitação, acompanhe vencimentos com alertas
            automáticos e calcule reajustes pelo IPCA sem burocracia.
          </div>
        </div>

        {/* Rodapé: Assinatura do Criador e Domínio */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid #D2E0D6',
            paddingTop: '28px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '20px',
              color: '#526359',
            }}
          >
            <span>Por Bruno Torres</span>
            <span>•</span>
            <span style={{ fontStyle: 'italic' }}>Design Sage Paper</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              color: '#24523B',
              padding: '8px 22px',
              borderRadius: '10px',
              fontSize: '20px',
              fontWeight: 700,
              border: '1px solid #D2E0D6',
            }}
          >
            tratto.devtorres.com.br
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
