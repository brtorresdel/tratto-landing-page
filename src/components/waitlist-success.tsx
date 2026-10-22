'use client';

import React from 'react';
import { CheckCircle, ShieldCheck } from 'lucide-react';

interface WaitlistSuccessProps {
  email: string;
}

export function WaitlistSuccess({ email }: WaitlistSuccessProps) {
  return (
    <div className="py-8 text-center space-y-6">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] ring-8 ring-[var(--accent-primary)]/5">
        <CheckCircle className="h-7 w-7" />
      </div>

      <div className="space-y-2">
        <h3 className="font-serif italic text-2xl sm:text-3xl font-medium text-[var(--text-main)]">
          Você está na lista de espera!
        </h3>
        <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
          Avisaremos em <strong className="text-[var(--text-main)] font-semibold">{email}</strong> assim que o acesso for liberado.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)]/70 p-4 max-w-md mx-auto text-left space-y-2">
        <div className="flex items-center gap-2 text-xs font-medium text-[var(--accent-primary)]">
          <ShieldCheck className="h-4 w-4" />
          <span>O que esperar daqui para a frente?</span>
        </div>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          Estamos refinando os últimos detalhes dos templates automáticos e da integração com assinaturas. Quando a primeira turma abrir, você terá acesso prioritário e gratuito para testar.
        </p>
      </div>
    </div>
  );
}
