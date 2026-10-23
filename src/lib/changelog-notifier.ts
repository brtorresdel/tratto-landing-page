import { getChangelogEntryByDate } from '@/data/changelog';
import { getSupabaseServerClient } from './supabase';

export interface BroadcastResult {
  success: boolean;
  count: number;
  error?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function broadcastChangelogNotification({
  date,
}: {
  date: string;
}): Promise<BroadcastResult> {
  const entry = getChangelogEntryByDate(date);
  if (!entry) {
    return { success: false, count: 0, error: 'Publicação não encontrada para esta data' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.NOTIFICATION_EMAIL_FROM || 'onboarding@resend.dev';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tratto.devtorres.com.br';
  const postUrl = `${siteUrl}/changelog/${entry.date}`;

  // Busca e-mails de inscritos via Supabase (se configurado)
  const supabase = getSupabaseServerClient();
  let recipients: string[] = [];

  if (supabase) {
    const { data: leads, error } = await supabase
      .from('waitlist_leads')
      .select('email')
      .eq('consent', true);

    if (!error && leads) {
      recipients = leads.map((l: { email: string }) => l.email).filter(Boolean);
    }
  }

  // Fallback para o e-mail do próprio desenvolvedor se não houver leads no banco ainda
  if (recipients.length === 0 && process.env.NOTIFICATION_EMAIL_TO) {
    recipients = [process.env.NOTIFICATION_EMAIL_TO];
  }

  if (!apiKey || recipients.length === 0) {
    return {
      success: true,
      count: 0,
    };
  }

  const safeTitle = escapeHtml(entry.title);
  const safeTeaser = escapeHtml(entry.teaser);
  const safeDate = escapeHtml(entry.displayDate);

  const emailHtml = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <title>${safeTitle} — Changelog Tratto</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #EBF2ED; margin: 0; padding: 24px; color: #0E1210;">
      <div style="max-width: 580px; margin: 0 auto; background: #FFFFFF; border: 1px solid #D2E0D6; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(14,18,16,0.06);">
        <div style="background-color: #24523B; padding: 24px; color: #FFFFFF;">
          <div style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.85;">
            Tratto • Notas de Versão
          </div>
          <h1 style="margin: 8px 0 0 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">
            ${safeTitle}
          </h1>
          <p style="margin: 6px 0 0 0; font-size: 12px; opacity: 0.75;">
            Publicado em ${safeDate}
          </p>
        </div>

        <div style="padding: 28px 24px;">
          <p style="font-size: 16px; line-height: 1.6; color: #0E1210; margin: 0 0 24px 0;">
            ${safeTeaser}
          </p>

          <div style="text-align: center; margin: 28px 0;">
            <a href="${postUrl}" style="display: inline-block; background-color: #24523B; color: #FFFFFF; text-decoration: none; padding: 13px 26px; border-radius: 8px; font-size: 15px; font-weight: 600; box-shadow: 0 2px 6px rgba(36,82,59,0.25);">
              Ler publicação completa →
            </a>
          </div>

          <p style="font-size: 12px; color: #526359; line-height: 1.5; margin: 24px 0 0 0; border-top: 1px solid #EBF2ED; paddingTop: 16px;">
            Caso o botão não funcione, acesse diretamente pelo link: <br>
            <a href="${postUrl}" style="color: #24523B;">${postUrl}</a>
          </p>
        </div>

        <div style="border-top: 1px solid #D2E0D6; padding: 16px 24px; background: #FAFDFB; font-size: 11px; color: #526359; text-align: center;">
          Você está recebendo este e-mail porque se cadastrou na Lista de Espera da Tratto.
        </div>
      </div>
    </body>
    </html>
  `;

  let sentCount = 0;

  for (const recipient of recipients) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipient],
          subject: `[Tratto] ${entry.title}`,
          html: emailHtml,
        }),
      });

      if (response.ok) {
        sentCount++;
      }
    } catch {
      // Ignora falha individual de envio para continuar o loop
    }
  }

  return {
    success: true,
    count: sentCount,
  };
}
