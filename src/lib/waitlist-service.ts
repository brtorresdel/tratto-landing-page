import type { WaitlistStep1Input, WaitlistStep2Input } from './waitlist-schema';
import {
  type WaitlistRepository,
  SupabaseWaitlistRepository,
} from './waitlist-repository';

export interface Step1Result {
  success: boolean;
  simulated: boolean;
  error?: string;
}

export interface Step2Result {
  success: boolean;
  error?: string;
}

export class WaitlistService {
  private repository: WaitlistRepository;

  constructor(repository?: WaitlistRepository) {
    this.repository = repository || new SupabaseWaitlistRepository();
  }

  async captureStep1(input: WaitlistStep1Input): Promise<Step1Result> {
    // R3 & CA4: Proteção anti-bot via honeypot
    if (input.honeypot && input.honeypot.trim().length > 0) {
      return { success: true, simulated: true };
    }

    try {
      const normalizedEmail = input.email.trim().toLowerCase();

      await this.repository.upsertLead({
        email: normalizedEmail,
        consent: input.consent,
        pain_points: input.painPoints || null,
        suggestions: input.suggestions || null,
        status: 'lead_capturado',
      });

      return { success: true, simulated: false };
    } catch (err: unknown) {
      console.error('[WaitlistService] Erro ao capturar Etapa 1:', err);
      return {
        success: false,
        simulated: false,
        error:
          'Não foi possível concluir seu cadastro no momento. Por favor, tente novamente em instantes.',
      };
    }
  }

  async qualifyStep2(input: WaitlistStep2Input): Promise<Step2Result> {
    try {
      const normalizedEmail = input.email.trim().toLowerCase();

      await this.repository.upsertLead({
        email: normalizedEmail,
        pain_points: input.painPoints || null,
        suggestions: input.suggestions || null,
        segment: input.segment || null,
        contracts_volume: input.contractsVolume || null,
        current_tool: input.currentTool || null,
        interview_opt_in: input.interviewOptIn ?? false,
        status: 'lead_qualificado',
      });

      return { success: true };
    } catch (err: unknown) {
      console.error('[WaitlistService] Erro ao qualificar Etapa 2:', err);
      return {
        success: false,
        error:
          'Não foi possível salvar suas respostas no momento. Seu e-mail continua garantido na lista!',
      };
    }
  }
}
