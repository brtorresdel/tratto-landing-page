import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WaitlistService } from '@/lib/waitlist-service';
import type { WaitlistRepository, LeadRecord } from '@/lib/waitlist-repository';
import type { WaitlistNotifier } from '@/lib/waitlist-notifier';

class InMemoryWaitlistRepository implements WaitlistRepository {
  public leads: LeadRecord[] = [];

  async upsertLead(data: Partial<LeadRecord> & { email: string }): Promise<LeadRecord> {
    const existingIndex = this.leads.findIndex((l) => l.email === data.email);
    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      const updated: LeadRecord = {
        ...this.leads[existingIndex],
        ...data,
        updated_at: now,
      };
      this.leads[existingIndex] = updated;
      return updated;
    }

    const created: LeadRecord = {
      id: `lead-${Date.now()}-${Math.random()}`,
      email: data.email,
      consent: data.consent ?? true,
      pain_points: data.pain_points ?? null,
      suggestions: data.suggestions ?? null,
      segment: data.segment ?? null,
      contracts_volume: data.contracts_volume ?? null,
      current_tool: data.current_tool ?? null,
      interview_opt_in: data.interview_opt_in ?? false,
      status: data.status ?? 'lead_capturado',
      created_at: now,
      updated_at: now,
    };
    this.leads.push(created);
    return created;
  }

  async findLeadByEmail(email: string): Promise<LeadRecord | null> {
    return this.leads.find((l) => l.email === email) || null;
  }
}

describe('WaitlistService', () => {
  let repository: InMemoryWaitlistRepository;
  let notifier: WaitlistNotifier;
  let service: WaitlistService;

  beforeEach(() => {
    repository = new InMemoryWaitlistRepository();
    notifier = {
      notifyNewLead: vi.fn().mockResolvedValue({ success: true }),
      notifyQualifiedLead: vi.fn().mockResolvedValue({ success: true }),
    };
    service = new WaitlistService(repository, notifier);
  });

  describe('captureStep1', () => {
    it('persiste um novo lead com dados da Etapa 1 e status lead_capturado', async () => {
      const result = await service.captureStep1({
        email: 'gestor@coworking.com.br',
        consent: true,
        painPoints: 'Muitos contratos vencem sem aviso.',
        suggestions: 'Avisos por e-mail configuráveis.',
        honeypot: '',
      });

      expect(result.success).toBe(true);
      expect(result.simulated).toBe(false);
      expect(repository.leads).toHaveLength(1);

      const saved = repository.leads[0];
      expect(saved.email).toBe('gestor@coworking.com.br');
      expect(saved.pain_points).toBe('Muitos contratos vencem sem aviso.');
      expect(saved.suggestions).toBe('Avisos por e-mail configuráveis.');
      expect(saved.status).toBe('lead_capturado');
      expect(notifier.notifyNewLead).toHaveBeenCalledWith({ email: 'gestor@coworking.com.br' });
    });

    it('descarta silenciosamente spam de robô com honeypot sem persistir', async () => {
      const result = await service.captureStep1({
        email: 'spammer@bot.org',
        consent: true,
        honeypot: 'http://viagra-promo.com',
      });

      expect(result.success).toBe(true);
      expect(result.simulated).toBe(true);
      expect(repository.leads).toHaveLength(0);
    });

    it('é idempotente se o mesmo e-mail submeter novamente a Etapa 1', async () => {
      await service.captureStep1({
        email: 'advogado@escritorio.adv.br',
        consent: true,
        painPoints: 'Dificuldade de controle de reajustes.',
        honeypot: '',
      });

      expect(repository.leads).toHaveLength(1);

      const result = await service.captureStep1({
        email: 'advogado@escritorio.adv.br',
        consent: true,
        suggestions: 'Gostaria de ver o histórico de reajustes.',
        honeypot: '',
      });

      expect(result.success).toBe(true);
      expect(repository.leads).toHaveLength(1);
      expect(repository.leads[0].suggestions).toBe('Gostaria de ver o histórico de reajustes.');
    });
  });

  describe('qualifyStep2', () => {
    it('atualiza o lead existente com as respostas da Etapa 2 e status lead_qualificado', async () => {
      await service.captureStep1({
        email: 'diretor@escola.com.br',
        consent: true,
        honeypot: '',
      });

      const result = await service.qualifyStep2({
        email: 'diretor@escola.com.br',
        segment: 'Escolas',
        contractsVolume: '20-50',
        currentTool: 'Word / DOCX',
        interviewOptIn: true,
      });

      expect(result.success).toBe(true);
      expect(repository.leads).toHaveLength(1);

      const updated = repository.leads[0];
      expect(updated.segment).toBe('Escolas');
      expect(updated.contracts_volume).toBe('20-50');
      expect(updated.current_tool).toBe('Word / DOCX');
      expect(updated.interview_opt_in).toBe(true);
      expect(updated.status).toBe('lead_qualificado');
      expect(notifier.notifyQualifiedLead).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'diretor@escola.com.br',
          segment: 'Escolas',
          interviewOptIn: true,
        })
      );
    });

    it('cria o registro de forma resiliente mesmo se a Etapa 1 não tiver sido chamada previamente', async () => {
      const result = await service.qualifyStep2({
        email: 'socio@contabilidade.com.br',
        segment: 'Contabilidade',
        contractsVolume: '> 50',
      });

      expect(result.success).toBe(true);
      expect(repository.leads).toHaveLength(1);
      expect(repository.leads[0].email).toBe('socio@contabilidade.com.br');
      expect(repository.leads[0].segment).toBe('Contabilidade');
    });
  });
});
