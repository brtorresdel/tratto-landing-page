'use client';

import React, { useState } from 'react';
import type { WaitlistStep1Input } from '@/lib/waitlist-schema';
import { ArrowRight, Loader2 } from 'lucide-react';

interface WaitlistFormStep1Props {
  onSubmit: (data: WaitlistStep1Input) => Promise<{ success: boolean; error?: string }>;
}

export function WaitlistFormStep1({ onSubmit }: WaitlistFormStep1Props) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<{ email?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string } = {};

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Informe um endereço de e-mail válido.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await onSubmit({
        email: trimmedEmail,
        consent: true,
        honeypot,
      });

      if (!res.success) {
        setErrors({
          general:
            res.error ||
            'Não foi possível concluir seu cadastro no momento. Por favor, tente novamente em instantes.',
        });
      }
    } catch {
      setErrors({
        general:
          'Não foi possível concluir seu cadastro no momento. Por favor, tente novamente em instantes.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Campo Honeypot Oculto (Anti-bot) */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="website_hp">Não preencha este campo se você for humano:</label>
        <input
          id="website_hp"
          type="text"
          name="website_hp"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {errors.general && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
        >
          {errors.general}
        </div>
      )}

      {/* Texto de aviso legal / LGPD acima do campo */}
      <p className="text-xs text-[var(--sage-text-secondary)] leading-relaxed">
        Ao entrar na lista de espera, você concorda em receber comunicações sobre o pré-lançamento da Tratto e convite para reunião e testes (se quiser, é claro). Seus dados estão protegidos de acordo com a nossa política e a LGPD
      </p>

      {/* Input de E-mail com Botão lado a lado */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
          <div className="flex-1 relative">
            <label htmlFor="waitlist-email" className="sr-only">
              Seu melhor e-mail profissional
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              placeholder="Seu melhor e-mail profissional"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'waitlist-email-error' : undefined}
              className="w-full rounded-lg border border-[var(--sage-border-subtle)] bg-[var(--sage-paper)] px-4 py-3 text-sm text-[var(--sage-text-primary)] placeholder-[var(--sage-text-secondary)]/60 transition-colors focus:border-[var(--sage-accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--sage-accent-primary)]/20"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--sage-accent-primary)] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[var(--sage-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--sage-accent-primary)]/30 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed shadow-xs whitespace-nowrap shrink-0"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Entrando...</span>
              </>
            ) : (
              <>
                <span>Entrar na lista</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {errors.email && (
          <p id="waitlist-email-error" role="alert" className="text-xs text-red-600 dark:text-red-400">
            {errors.email}
          </p>
        )}
      </div>
    </form>
  );
}
