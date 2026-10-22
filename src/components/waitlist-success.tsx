'use client';

import React, { useState } from 'react';
import type { WaitlistStep2Input } from '@/lib/waitlist-schema';
import { WaitlistFormStep2 } from './waitlist-form-step2';
import { CheckCircle, ChevronDown, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';

interface WaitlistSuccessProps {
  email: string;
  onOptionalSubmit?: (data: WaitlistStep2Input) => Promise<{ success: boolean; error?: string }>;
  initialExpanded?: boolean;
}

export function WaitlistSuccess({
  email,
  onOptionalSubmit,
  initialExpanded = false,
}: WaitlistSuccessProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [hasSubmittedOptional, setHasSubmittedOptional] = useState(false);

  const handleOptionalSubmit = async (data: WaitlistStep2Input) => {
    if (onOptionalSubmit) {
      const res = await onOptionalSubmit(data);
      if (res.success) {
        setHasSubmittedOptional(true);
      }
      return res;
    }
    setHasSubmittedOptional(true);
    return { success: true };
  };

  return (
    <div className="py-6 text-center space-y-6">
      {/* Título com Check em linha e Mensagem de Confirmação */}
      <div className="space-y-2">
        <h3 className="flex items-center justify-center gap-2.5 font-serif italic text-2xl sm:text-3xl font-medium text-[var(--text-main)]">
          <CheckCircle2 className="h-7 w-7 text-[var(--accent-primary)] shrink-0" />
          <span>Você está na lista de espera!</span>
        </h3>
        <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
          Avisaremos em <strong className="text-[var(--text-main)] font-semibold">{email}</strong> assim que o acesso for liberado.
        </p>
      </div>

      {/* Opção Accordion com Chevron: Sobre a sua empresa... (opcional) */}
      <div className="w-full max-w-xl mx-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden transition-all text-left shadow-2xs">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors hover:bg-[var(--border-subtle)]/20 cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] shrink-0">
              <Building2 className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold text-[var(--text-main)]">
              Sobre a sua empresa... <span className="text-xs text-[var(--text-muted)] font-normal font-mono">(opcional)</span>
            </span>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-[var(--text-muted)] shrink-0 ml-2 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isExpanded && (
          <div className="p-4 sm:p-6 border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)]/40">
            {hasSubmittedOptional ? (
              <div className="flex items-center gap-2.5 text-xs font-medium text-[var(--accent-primary)] py-3">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Respostas salvas com sucesso! Obrigado por ajudar a moldar a Tratto.</span>
              </div>
            ) : (
              <WaitlistFormStep2
                email={email}
                onSubmit={handleOptionalSubmit}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
