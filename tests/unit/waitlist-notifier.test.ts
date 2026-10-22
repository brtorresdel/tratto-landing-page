import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ResendWaitlistNotifier } from '@/lib/waitlist-notifier';

describe('ResendWaitlistNotifier (Spec 0003 - Notificação de Novos Leads por E-mail)', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('não dispara chamada externa se RESEND_API_KEY ou NOTIFICATION_EMAIL_TO não estiverem configurados', async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.NOTIFICATION_EMAIL_TO;

    const fetchSpy = vi.spyOn(global, 'fetch');
    const notifier = new ResendWaitlistNotifier();

    const result = await notifier.notifyNewLead({ email: 'interessado@empresa.com' });

    expect(result.success).toBe(true);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('envia e-mail de alerta para novo lead (Etapa 1) com dados corretos via API do Resend', async () => {
    process.env.RESEND_API_KEY = 're_test_key_123';
    process.env.NOTIFICATION_EMAIL_TO = 'fundador@tratto.com.br';
    process.env.NOTIFICATION_EMAIL_FROM = 'onboarding@resend.dev';

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ id: 'msg_123' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const notifier = new ResendWaitlistNotifier();
    const result = await notifier.notifyNewLead({ email: 'novo_lead@empresa.com' });

    expect(result.success).toBe(true);
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    const [url, options] = fetchSpy.mock.calls[0];
    expect(url).toBe('https://api.resend.com/emails');
    expect(options?.method).toBe('POST');
    expect(options?.headers).toMatchObject({
      Authorization: 'Bearer re_test_key_123',
      'Content-Type': 'application/json',
    });

    const body = JSON.parse(options?.body as string);
    expect(body.to).toEqual(['fundador@tratto.com.br']);
    expect(body.from).toBe('onboarding@resend.dev');
    expect(body.subject).toContain('novo_lead@empresa.com');
    expect(body.html).toContain('novo_lead@empresa.com');
  });

  it('envia e-mail com detalhes da qualificação (Etapa 2) e destaca aceite de entrevista', async () => {
    process.env.RESEND_API_KEY = 're_test_key_123';
    process.env.NOTIFICATION_EMAIL_TO = 'fundador@tratto.com.br';

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ id: 'msg_456' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const notifier = new ResendWaitlistNotifier();
    const result = await notifier.notifyQualifiedLead({
      email: 'gestor@coworking.com',
      segment: 'Coworking',
      contractsVolume: '11 a 50 contratos',
      currentTool: 'Word manual e planilhas',
      painPoints: 'Perco prazos de reajuste todo mês',
      interviewOptIn: true,
    });

    expect(result.success).toBe(true);
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string);
    expect(body.subject).toContain('Entrevista');
    expect(body.html).toContain('gestor@coworking.com');
    expect(body.html).toContain('Coworking');
    expect(body.html).toContain('11 a 50 contratos');
    expect(body.html).toContain('Perco prazos de reajuste todo mês');
    expect(body.html).toContain('TOPA UM PAPO');
  });

  it('não lança exceção e retorna erro descritivo em caso de falha de rede/API do Resend', async () => {
    process.env.RESEND_API_KEY = 're_test_key_123';
    process.env.NOTIFICATION_EMAIL_TO = 'fundador@tratto.com.br';

    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network timeout'));

    const notifier = new ResendWaitlistNotifier();
    const result = await notifier.notifyNewLead({ email: 'lead@teste.com' });

    expect(result.success).toBe(false);
    expect(result.error).toContain('Network timeout');
  });
});
