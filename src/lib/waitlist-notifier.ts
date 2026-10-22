/**
 * Notificador de Novos Leads da Lista de Espera via API REST nativa do Resend.
 * Execução exclusiva no servidor (Server Action / Node.js).
 */

export interface WaitlistNotifier {
  notifyNewLead(data: { email: string; createdAt?: Date }): Promise<{ success: boolean; error?: string }>;
  notifyQualifiedLead(data: {
    email: string;
    segment?: string | null;
    contractsVolume?: string | null;
    currentTool?: string | null;
    painPoints?: string | null;
    suggestions?: string | null;
    interviewOptIn?: boolean | null;
  }): Promise<{ success: boolean; error?: string }>;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export class ResendWaitlistNotifier implements WaitlistNotifier {
  private apiKey?: string;
  private toEmail?: string;
  private fromEmail: string;

  constructor(options?: { apiKey?: string; toEmail?: string; fromEmail?: string }) {
    this.apiKey = options?.apiKey || process.env.RESEND_API_KEY;
    this.toEmail = options?.toEmail || process.env.NOTIFICATION_EMAIL_TO;
    this.fromEmail = options?.fromEmail || process.env.NOTIFICATION_EMAIL_FROM || 'onboarding@resend.dev';
  }

  private isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim() && this.toEmail && this.toEmail.trim());
  }

  async notifyNewLead(data: { email: string; createdAt?: Date }): Promise<{ success: boolean; error?: string }> {
    if (!this.isConfigured()) {
      return { success: true };
    }

    const timestamp = (data.createdAt || new Date()).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'short',
      timeStyle: 'medium',
    });

    const subject = `[Tratto] Novo lead na Lista de Espera: ${data.email}`;
    const safeEmail = escapeHtml(data.email);

    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F4F8F5; margin: 0; padding: 24px; color: #0E1210;">
        <div style="max-width: 560px; margin: 0 auto; background: #FFFFFF; border: 1px solid #D2E0D6; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(14,18,16,0.06);">
          <div style="background-color: #24523B; padding: 20px 24px; color: #FFFFFF;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.5px;">🎉 Novo Interessado na Tratto</h2>
            <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.85;">Um visitante acabou de se cadastrar na Lista de Espera</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 15px; line-height: 1.5; margin: 0 0 16px 0;">
              <strong>E-mail cadastrado:</strong> <a href="mailto:${safeEmail}" style="color: #24523B; font-weight: 600; text-decoration: none;">${safeEmail}</a>
            </p>
            <p style="font-size: 13px; color: #526359; margin: 0 0 20px 0;">
              Data e horário: <strong>${timestamp}</strong> (Horário de Brasília)
            </p>
            <div style="background-color: #EBF2ED; border-left: 4px solid #24523B; padding: 12px 16px; border-radius: 4px; font-size: 12px; color: #24523B; line-height: 1.5;">
              O lead concluiu a <strong>Etapa 1</strong>. Caso ele responda as perguntas opcionais sobre a empresa (Etapa 2), você receberá um segundo aviso com os detalhes da qualificação.
            </div>
          </div>
          <div style="border-top: 1px solid #D2E0D6; padding: 14px 24px; background: #FAFDFB; font-size: 11px; color: #526359;">
            Tratto • Notificação automática do sistema
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({ subject, html });
  }

  async notifyQualifiedLead(data: {
    email: string;
    segment?: string | null;
    contractsVolume?: string | null;
    currentTool?: string | null;
    painPoints?: string | null;
    suggestions?: string | null;
    interviewOptIn?: boolean | null;
  }): Promise<{ success: boolean; error?: string }> {
    if (!this.isConfigured()) {
      return { success: true };
    }

    const safeEmail = escapeHtml(data.email);
    const safeSegment = data.segment ? escapeHtml(data.segment) : 'Não informado';
    const safeVolume = data.contractsVolume ? escapeHtml(data.contractsVolume) : 'Não informado';
    const safeTool = data.currentTool ? escapeHtml(data.currentTool) : 'Não informado';
    const safePain = data.painPoints ? escapeHtml(data.painPoints) : 'Nenhuma dor informada';
    const safeSug = data.suggestions ? escapeHtml(data.suggestions) : 'Nenhuma sugestão';

    const subject = `[Tratto] Lead Qualificado: ${data.email} ${data.interviewOptIn ? '🔥 (Aceitou Entrevista!)' : ''}`;

    const interviewBanner = data.interviewOptIn
      ? `
        <div style="background-color: #E1EDE4; border: 1.5px solid #24523B; border-radius: 8px; padding: 14px 18px; margin: 0 0 20px 0;">
          <div style="color: #1E4D35; font-size: 14px; font-weight: bold; margin-bottom: 4px;">
            🔥 TOPA UM PAPO DE 20 MINUTOS!
          </div>
          <div style="color: #24523B; font-size: 13px; line-height: 1.4;">
            O lead aceitou bater um papo para falar sobre as dores de contratos da empresa dele. Responda este e-mail ou entre em contato com ele para agendar a conversa e garantir a promoção especial de lançamento!
          </div>
        </div>
      `
      : `
        <div style="background-color: #F4F8F5; border: 1px solid #D2E0D6; border-radius: 8px; padding: 10px 14px; margin: 0 0 20px 0; font-size: 12px; color: #526359;">
          Disponibilidade para papo: <em>Não selecionado pelo usuário</em>
        </div>
      `;

    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F4F8F5; margin: 0; padding: 24px; color: #0E1210;">
        <div style="max-width: 580px; margin: 0 auto; background: #FFFFFF; border: 1px solid #D2E0D6; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(14,18,16,0.06);">
          <div style="background-color: #24523B; padding: 20px 24px; color: #FFFFFF;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.5px;">📋 Lead Qualificado (Etapa 2)</h2>
            <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.85;">Novas respostas sobre o perfil da empresa</p>
          </div>
          <div style="padding: 24px;">
            ${interviewBanner}

            <table style="width: 100%; border-collapse: collapse; font-size: 13px; line-height: 1.5; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #EBF2ED;">
                <td style="padding: 8px 0; color: #526359; width: 140px; font-weight: 500;">E-mail:</td>
                <td style="padding: 8px 0; font-weight: 600;"><a href="mailto:${safeEmail}" style="color: #24523B; text-decoration: none;">${safeEmail}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #EBF2ED;">
                <td style="padding: 8px 0; color: #526359; font-weight: 500;">Segmento:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #0E1210;">${safeSegment}</td>
              </tr>
              <tr style="border-bottom: 1px solid #EBF2ED;">
                <td style="padding: 8px 0; color: #526359; font-weight: 500;">Volume Contratos:</td>
                <td style="padding: 8px 0; color: #0E1210;">${safeVolume}</td>
              </tr>
              <tr style="border-bottom: 1px solid #EBF2ED;">
                <td style="padding: 8px 0; color: #526359; font-weight: 500;">Ferramenta Atual:</td>
                <td style="padding: 8px 0; color: #0E1210;">${safeTool}</td>
              </tr>
            </table>

            <div style="margin-bottom: 16px;">
              <div style="font-size: 12px; font-weight: 600; color: #526359; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">
                Dores ou dificuldades relatadas:
              </div>
              <div style="background-color: #FAFDFB; border: 1px solid #D2E0D6; border-radius: 6px; padding: 12px; font-size: 13px; color: #0E1210; line-height: 1.5;">
                ${safePain}
              </div>
            </div>

            ${
              data.suggestions
                ? `
              <div style="margin-bottom: 16px;">
                <div style="font-size: 12px; font-weight: 600; color: #526359; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">
                  Sugestões / Recursos desejados:
                </div>
                <div style="background-color: #FAFDFB; border: 1px solid #D2E0D6; border-radius: 6px; padding: 12px; font-size: 13px; color: #0E1210; line-height: 1.5;">
                  ${safeSug}
                </div>
              </div>
            `
                : ''
            }
          </div>
          <div style="border-top: 1px solid #D2E0D6; padding: 14px 24px; background: #FAFDFB; font-size: 11px; color: #526359;">
            Tratto • Notificação automática do sistema
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({ subject, html });
  }

  private async sendEmail(payload: { subject: string; html: string }): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.fromEmail,
          to: [this.toEmail],
          subject: payload.subject,
          html: payload.html,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        console.error(`[ResendWaitlistNotifier] Erro HTTP ${response.status} ao enviar e-mail:`, errorText);
        return { success: false, error: `HTTP ${response.status}: ${errorText}` };
      }

      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('[ResendWaitlistNotifier] Falha de conexão ao enviar e-mail:', message);
      return { success: false, error: message };
    }
  }
}
