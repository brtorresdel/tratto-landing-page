'use client';

import React, { useState } from 'react';
import type { WaitlistStep1Input } from '@/lib/waitlist-schema';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';

interface WaitlistFormStep1Props {
  onSubmit: (data: WaitlistStep1Input) => Promise<{ success: boolean; error?: string }>;
}

export function WaitlistFormStep1({ onSubmit }: WaitlistFormStep1Props) {
  const [email, setEmail] = useState('');
  const [painPoints, setPainPoints] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<{ email?: string; consent?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; consent?: string } = {};

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Informe um endereço de e-mail válido.';
    }

    if (!consent) {
      newErrors.consent = 'É necessário concordar com os termos para continuar.';
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
        consent,
        painPoints: painPoints.trim() || undefined,
        suggestions: suggestions.trim() || undefined,
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
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
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

      {/* Input de E-mail */}
      <div className="space-y-2">
        <label
          htmlFor="waitlist-email"
          className="block text-sm font-medium text-[var(--sage-text-primary)]"
        >
          Seu melhor e-mail profissional <span className="text-emerald-700 dark:text-emerald-500">*</span>
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          placeholder="exemplo@suaempresa.com.br"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'waitlist-email-error' : undefined}
          className="w-full rounded-lg border border-[var(--sage-border-subtle)] bg-[var(--sage-paper)] px-4 py-3 text-sm text-[var(--sage-text-primary)] placeholder-[var(--sage-text-secondary)]/60 transition-colors focus:border-[var(--sage-accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--sage-accent-primary)]/20"
        />
        {errors.email && (
          <p id="waitlist-email-error" role="alert" className="text-xs text-red-600 dark:text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      {/* Pergunta Opcional 1: Dores com Contratos */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="waitlist-pain-points"
            className="block text-sm font-medium text-[var(--sage-text-primary)]"
          >
            Quais são as suas maiores dores ou dificuldades com contratos no dia a dia da sua empresa?
          </label>
          <span className="text-xs text-[var(--sage-text-secondary)] font-mono">Opcional</span>
        </div>
        <textarea
          id="waitlist-pain-points"
          rows={3}
          maxLength={1500}
          placeholder="Ex: Demora para gerar minutas, contratos esquecidos sem reajuste de IPCA, falta de rastreio de assinaturas..."
          value={painPoints}
          onChange={(e) => setPainPoints(e.target.value)}
          className="w-full rounded-lg border border-[var(--sage-border-subtle)] bg-[var(--sage-paper)] px-4 py-3 text-sm text-[var(--sage-text-primary)] placeholder-[var(--sage-text-secondary)]/60 transition-colors focus:border-[var(--sage-accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--sage-accent-primary)]/20"
        />
      </div>

      {/* Pergunta Opcional 2: Sugestões de Evolução */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="waitlist-suggestions"
            className="block text-sm font-medium text-[var(--sage-text-primary)]"
          >
            O que não pode faltar na Tratto para ela ser perfeita para o seu negócio?
          </label>
          <span className="text-xs text-[var(--sage-text-secondary)] font-mono">Opcional</span>
        </div>
        <textarea
          id="waitlist-suggestions"
          rows={3}
          maxLength={1500}
          placeholder="Ex: Integração nativa com emissor de boletos, alertas de vencimento com 30 dias por e-mail..."
          value={suggestions}
          onChange={(e) => setSuggestions(e.target.value)}
          className="w-full rounded-lg border border-[var(--sage-border-subtle)] bg-[var(--sage-paper)] px-4 py-3 text-sm text-[var(--sage-text-primary)] placeholder-[var(--sage-text-secondary)]/60 transition-colors focus:border-[var(--sage-accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--sage-accent-primary)]/20"
        />
      </div>

      {/* Checkbox de Consentimento LGPD */}
      <div className="space-y-2 pt-1">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
            }}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? 'waitlist-consent-error' : undefined}
            className="mt-1 h-4 w-4 rounded border-[var(--sage-border-subtle)] text-[var(--sage-accent-primary)] focus:ring-2 focus:ring-[var(--sage-accent-primary)]/20 accent-[var(--sage-accent-primary)]"
          />
          <span className="text-xs text-[var(--sage-text-secondary)] leading-relaxed">
            Concordo em receber comunicações sobre o pré-lançamento da Tratto e convites para testes. Seus dados estão protegidos de acordo com a nossa política e a LGPD.
          </span>
        </label>
        {errors.consent && (
          <p id="waitlist-consent-error" role="alert" className="text-xs text-red-600 dark:text-red-400">
            {errors.consent}
          </p>
        )}
      </div>

      {/* Botão de Ação */}
      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-[var(--sage-accent-primary)] px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-[var(--sage-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--sage-accent-primary)]/30 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed shadow-xs"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Garantindo seu acesso...</span>
          </>
        ) : (
          <>
            <span>Garantir meu acesso antecipado</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-[var(--sage-text-secondary)] flex items-center justify-center gap-1.5 pt-1">
        <Sparkles className="h-3 w-3 text-[var(--sage-accent-primary)]" />
        <span>Acesso gratuito garantido durante a fase fechada de validação.</span>
      </p>
    </form>
  );
}
