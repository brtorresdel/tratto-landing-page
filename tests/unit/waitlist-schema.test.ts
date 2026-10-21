import { describe, it, expect } from 'vitest';
import {
  waitlistStep1Schema,
  waitlistStep2Schema,
  type WaitlistStep1Input,
  type WaitlistStep2Input,
} from '@/lib/waitlist-schema';

describe('waitlistStep1Schema', () => {
  it('valida dados corretos da Etapa 1 com campos obrigatórios', () => {
    const validData: WaitlistStep1Input = {
      email: 'bruno@empresa.com.br',
      consent: true,
      honeypot: '',
    };

    const parsed = waitlistStep1Schema.safeParse(validData);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.email).toBe('bruno@empresa.com.br');
      expect(parsed.data.consent).toBe(true);
    }
  });

  it('normaliza e-mail com espaços e caixa alta', () => {
    const data = {
      email: '  BRUNO@Empresa.COM.br  ',
      consent: true,
      honeypot: '',
    };

    const parsed = waitlistStep1Schema.safeParse(data);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.email).toBe('bruno@empresa.com.br');
    }
  });

  it('rejeita e-mail inválido com mensagem descritiva', () => {
    const invalidData = {
      email: 'email-invalido',
      consent: true,
      honeypot: '',
    };

    const parsed = waitlistStep1Schema.safeParse(invalidData);
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      const emailError = parsed.error.format().email?._errors[0];
      expect(emailError).toBe('Informe um endereço de e-mail válido.');
    }
  });

  it('rejeita submissão sem consentimento LGPD', () => {
    const noConsentData = {
      email: 'bruno@empresa.com.br',
      consent: false,
      honeypot: '',
    };

    const parsed = waitlistStep1Schema.safeParse(noConsentData);
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      const consentError = parsed.error.format().consent?._errors[0];
      expect(consentError).toBe('É necessário concordar com os termos para continuar.');
    }
  });

  it('permite campos de dores e sugestões vazios ou omitidos', () => {
    const dataWithoutOptionals = {
      email: 'contato@clinica.com',
      consent: true,
      honeypot: '',
    };

    const parsed = waitlistStep1Schema.safeParse(dataWithoutOptionals);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.painPoints).toBeUndefined();
      expect(parsed.data.suggestions).toBeUndefined();
    }
  });

  it('aceita e sanitiza dores e sugestões opcionais', () => {
    const dataWithOptionals: WaitlistStep1Input = {
      email: 'contato@clinica.com',
      consent: true,
      painPoints: 'Perdemos prazos de renovação no papel.',
      suggestions: 'Gostaria de alertas automáticos por WhatsApp.',
      honeypot: '',
    };

    const parsed = waitlistStep1Schema.safeParse(dataWithOptionals);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.painPoints).toBe('Perdemos prazos de renovação no papel.');
      expect(parsed.data.suggestions).toBe('Gostaria de alertas automáticos por WhatsApp.');
    }
  });

  it('detecta preenchimento do campo honeypot', () => {
    const botData = {
      email: 'spammer@bot.net',
      consent: true,
      honeypot: 'http://spam-link.ru',
    };

    const parsed = waitlistStep1Schema.safeParse(botData);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.honeypot).toBe('http://spam-link.ru');
    }
  });
});

describe('waitlistStep2Schema', () => {
  it('valida dados completos de qualificação da Etapa 2', () => {
    const validStep2: WaitlistStep2Input = {
      email: 'bruno@empresa.com.br',
      segment: 'Coworking',
      contractsVolume: '20-50',
      currentTool: 'Word / DOCX',
      interviewOptIn: true,
    };

    const parsed = waitlistStep2Schema.safeParse(validStep2);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.segment).toBe('Coworking');
      expect(parsed.data.contractsVolume).toBe('20-50');
      expect(parsed.data.currentTool).toBe('Word / DOCX');
      expect(parsed.data.interviewOptIn).toBe(true);
    }
  });

  it('permite valores parciais de qualificação', () => {
    const partialData = {
      email: 'bruno@empresa.com.br',
      segment: 'Advocacia',
    };

    const parsed = waitlistStep2Schema.safeParse(partialData);
    expect(parsed.success).toBe(true);
  });
});
