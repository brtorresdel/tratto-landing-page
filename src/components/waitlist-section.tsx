'use client';

import React, { useState } from 'react';
import type { WaitlistStep1Input, WaitlistStep2Input } from '@/lib/waitlist-schema';
import { submitWaitlistStep1Action, submitWaitlistStep2Action } from '@/app/actions/waitlist';
import { WaitlistFormStep1 } from './waitlist-form-step1';
import { WaitlistFormStep2 } from './waitlist-form-step2';
import { WaitlistSuccess } from './waitlist-success';

interface WaitlistSectionProps {
  initialStep?: 1 | 2 | 3;
  initialEmail?: string;
  onStep1Submit?: (data: WaitlistStep1Input) => Promise<{ success: boolean; error?: string }>;
  onStep2Submit?: (data: WaitlistStep2Input) => Promise<{ success: boolean; error?: string }>;
}

export function WaitlistSection({
  initialStep = 1,
  initialEmail = '',
  onStep1Submit,
  onStep2Submit,
}: WaitlistSectionProps) {
  const [step, setStep] = useState<1 | 2 | 3>(initialStep);
  const [capturedEmail, setCapturedEmail] = useState<string>(initialEmail);

  const handleStep1Submit = async (data: WaitlistStep1Input) => {
    let result: { success: boolean; error?: string };

    if (onStep1Submit) {
      result = await onStep1Submit(data);
    } else {
      result = await submitWaitlistStep1Action(data);
    }

    if (result.success) {
      setCapturedEmail(data.email);
      setStep(2);
    }

    return result;
  };

  const handleStep2Submit = async (data: WaitlistStep2Input) => {
    let result: { success: boolean; error?: string };

    if (onStep2Submit) {
      result = await onStep2Submit(data);
    } else {
      result = await submitWaitlistStep2Action(data);
    }

    if (result.success) {
      setStep(3);
    }

    return result;
  };

  const handleSkipStep2 = () => {
    setStep(3);
  };

  return (
    <section
      id="lista-de-espera"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-[var(--sage-border-subtle)] bg-[var(--sage-paper)]"
    >
      <div className="mx-auto max-w-2xl">
        {/* Cabeçalho da Seção */}
        {step < 3 && (
          <div className="text-center space-y-3 mb-10">
            <span className="inline-block rounded-full border border-[var(--sage-border-subtle)] bg-[var(--sage-paper-card)] px-3 py-1 text-xs font-mono font-medium text-[var(--sage-accent-primary)] uppercase tracking-wider">
              Acesso Antecipado
            </span>
            <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--sage-text-primary)]">
              Entre na lista de espera
            </h2>
            <p className="text-sm sm:text-base text-[var(--sage-text-secondary)] max-w-lg mx-auto leading-relaxed">
              Seja avisado no primeiro dia do pré-lançamento e participe ativamente da construção de uma ferramenta feita para simplificar seus contratos.
            </p>
          </div>
        )}

        {/* Card Principal do Formulário */}
        <div className="relative rounded-2xl border border-[var(--sage-border-subtle)] bg-[var(--sage-paper-card)] p-6 sm:p-10 shadow-sm transition-all">
          {/* Indicador de Etapas */}
          {step < 3 && (
            <div className="mb-6 flex items-center justify-between text-xs text-[var(--sage-text-secondary)] border-b border-[var(--sage-border-subtle)] pb-3">
              <span className="font-mono">
                {step === 1 ? 'Etapa 1 de 2: Identificação' : 'Etapa 2 de 2: Qualificação'}
              </span>
              <div className="flex gap-1.5">
                <span
                  className={`h-1.5 w-6 rounded-full transition-colors ${
                    step >= 1 ? 'bg-[var(--sage-accent-primary)]' : 'bg-[var(--sage-border-subtle)]'
                  }`}
                />
                <span
                  className={`h-1.5 w-6 rounded-full transition-colors ${
                    step >= 2 ? 'bg-[var(--sage-accent-primary)]' : 'bg-[var(--sage-border-subtle)]'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Renderização Condicional das Etapas */}
          {step === 1 && <WaitlistFormStep1 onSubmit={handleStep1Submit} />}

          {step === 2 && (
            <WaitlistFormStep2
              email={capturedEmail}
              onSubmit={handleStep2Submit}
              onSkip={handleSkipStep2}
            />
          )}

          {step === 3 && <WaitlistSuccess email={capturedEmail} />}
        </div>
      </div>
    </section>
  );
}
