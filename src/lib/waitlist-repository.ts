import { getSupabaseServerClient } from './supabase';

export interface LeadRecord {
  id: string;
  email: string;
  consent: boolean;
  pain_points: string | null;
  suggestions: string | null;
  segment: string | null;
  contracts_volume: string | null;
  current_tool: string | null;
  interview_opt_in: boolean;
  status: 'lead_capturado' | 'lead_qualificado';
  created_at: string;
  updated_at: string;
}

export interface WaitlistRepository {
  upsertLead(data: Partial<LeadRecord> & { email: string }): Promise<LeadRecord>;
  findLeadByEmail(email: string): Promise<LeadRecord | null>;
}

export class SupabaseWaitlistRepository implements WaitlistRepository {
  async upsertLead(data: Partial<LeadRecord> & { email: string }): Promise<LeadRecord> {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();

    if (!supabase) {
      console.warn(
        '[SupabaseWaitlistRepository] Variáveis de ambiente do Supabase não configuradas. Retornando registro simulado.'
      );
      return {
        id: `simulated-${Date.now()}`,
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
    }

    const payload = {
      ...data,
      updated_at: now,
    };

    // Tenta inserção direta
    const { error: insertError } = await supabase
      .from('waitlist_leads')
      .insert(payload);

    // Se o e-mail já existe (código PostgreSQL 23505 - unique_violation), atualiza os dados
    if (insertError && insertError.code === '23505') {
      const { error: updateError } = await supabase
        .from('waitlist_leads')
        .update(payload)
        .eq('email', data.email);

      if (updateError) {
        console.error('[SupabaseWaitlistRepository] Erro ao atualizar lead existente:', updateError);
        throw new Error(`Falha ao atualizar no banco de dados: ${updateError.message}`);
      }
    } else if (insertError) {
      console.error('[SupabaseWaitlistRepository] Erro ao inserir lead:', insertError);
      throw new Error(`Falha ao salvar no banco de dados: ${insertError.message}`);
    }

    return {
      id: `lead-${Date.now()}`,
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
  }

  async findLeadByEmail(email: string): Promise<LeadRecord | null> {
    const supabase = getSupabaseServerClient();

    if (!supabase) {
      return null;
    }

    const { data: record, error } = await supabase
      .from('waitlist_leads')
      .select()
      .eq('email', email)
      .maybeSingle();

    if (error) {
      console.error('[SupabaseWaitlistRepository] Erro ao buscar lead:', error);
      return null;
    }

    return record as LeadRecord | null;
  }
}
