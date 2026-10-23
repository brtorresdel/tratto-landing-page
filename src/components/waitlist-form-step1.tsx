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

      {/* Input de E-mail com Botão lado a lado */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
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
              className="w-full h-13 sm:h-14 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-5 py-3.5 text-base text-[var(--text-main)] placeholder-[var(--text-muted)]/60 transition-colors focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 shadow-2xs touch-manipulation"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="group inline-flex h-13 sm:h-14 items-center justify-center gap-2.5 rounded-full bg-[var(--accent-primary)] px-8 py-3.5 text-base font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30 disabled:opacity-70 disabled:cursor-not-allowed shadow-xs whitespace-nowrap shrink-0 cursor-pointer touch-manipulation"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Entrando...</span>
              </>
            ) : (
              <>
                <span>Entrar na lista</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
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

      {/* Texto de aviso legal / LGPD abaixo do campo */}
      <p className="text-xs text-[var(--text-muted)]/75 text-center leading-relaxed pt-1">
        Ao entrar na lista de espera, você concorda em receber comunicações sobre o pré-lançamento da Tratto e convite para reunião e testes (se quiser, é claro). Seus dados estão protegidos de acordo com a nossa política e a LGPD
      </p>
    </form>
  );
}
