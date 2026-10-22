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
          <div className="text-center space-y-4 mb-8 sm:mb-10">
            <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--sage-text-primary)]">
              Lista de Espera
            </h2>
            <p className="text-sm sm:text-base text-[var(--sage-text-secondary)] w-full mx-auto leading-relaxed">
              Enquanto a Tratto ainda está em andamento, você pode se inscrever na lista de espera, não só pra acompanhar o andamento do projeto, mas também para receber o acesso antecipado à plataforma. Você também pode falar um pouco mais sobre a sua empresa (opcional) e, se quiser, podemos marcar um papo para falarmos mais sobre esse projeto (se topar o papo, eu te garanto uma promoção especial no lançamento, prometo)
            </p>
          </div>
        )}

        {/* Card Principal do Formulário */}
        <div className="relative rounded-2xl border border-[var(--sage-border-subtle)] bg-[var(--sage-paper-card)] p-6 sm:p-10 shadow-sm transition-all">
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
