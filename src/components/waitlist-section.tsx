'use client';

import React, { useState } from 'react';
import type { WaitlistStep1Input, WaitlistStep2Input } from '@/lib/waitlist-schema';
import { submitWaitlistStep1Action, submitWaitlistStep2Action } from '@/app/actions/waitlist';
import { WaitlistFormStep1 } from './waitlist-form-step1';
import { WaitlistFormStep2 } from './waitlist-form-step2';
import { WaitlistSuccess } from './waitlist-success';
import { WaitlistContractPapers } from './waitlist-contract-papers';

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
      className="relative overflow-hidden scroll-mt-20 sm:scroll-mt-24 pt-14 sm:pt-18 pb-32 sm:pb-40 md:pb-48 lg:pb-64 xl:pb-72 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] transition-colors duration-300"
    >
      {/* Contratos Estáticos de Background na Base da Seção (Camada z-0) */}
      <WaitlistContractPapers />

      {/* Conteúdo e Formulário em Primeiro Plano (Camada z-20 com isolate para prevenir sobreposição de hit-test no WebKit) */}
      <div className="relative z-20 isolate mx-auto max-w-2xl">
        {/* Cabeçalho da Seção */}
        {step < 3 && (
          <div className="text-center space-y-4 mb-8 sm:mb-10">
            <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--text-main)]">
              Lista de Espera
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] w-full mx-auto leading-relaxed">
              Enquanto a Tratto ainda está em andamento, você pode se inscrever na lista de espera, não só pra acompanhar o andamento do projeto, mas também para receber o acesso antecipado à plataforma. Você também pode falar um pouco mais sobre a sua empresa (opcional) e, se quiser, podemos marcar um papo para falarmos mais sobre esse projeto (se topar o papo, eu te garanto uma promoção especial no lançamento, prometo)
            </p>
          </div>
        )}

        {/* Card Principal do Formulário */}
        <div
          className={
            step === 1
              ? "relative transition-all"
              : "relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-10 shadow-sm transition-all"
          }
        >
          {/* Renderização Condicional das Etapas */}
          {step === 1 && <WaitlistFormStep1 onSubmit={handleStep1Submit} />}

          {step >= 2 && (
            <WaitlistSuccess
              email={capturedEmail}
              onOptionalSubmit={handleStep2Submit}
            />
          )}
        </div>
      </div>
    </section>
  );
}
