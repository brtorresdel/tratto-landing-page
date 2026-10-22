'use client';

import React, { useState } from 'react';
import type { WaitlistStep2Input } from '@/lib/waitlist-schema';
import { Check, CheckCircle2, Loader2 } from 'lucide-react';

interface WaitlistFormStep2Props {
  email: string;
  onSubmit: (data: WaitlistStep2Input) => Promise<{ success: boolean; error?: string }>;
  onSkip?: () => void;
}

const SEGMENTS = [
  'Coworking',
  'Advocacia',
  'Academias',
  'Escolas',
  'Contabilidade',
  'Outro',
] as const;

const VOLUMES = ['< 5', '5-20', '20-50', '> 50'] as const;

const TOOLS = [
  'Word / DOCX',
  'Google Docs',
  'Sistema Próprio / ERP',
  'Outro',
];

export function WaitlistFormStep2({ email, onSubmit }: WaitlistFormStep2Props) {
  const [painPoints, setPainPoints] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [segment, setSegment] = useState<WaitlistStep2Input['segment'] | undefined>();
  const [segmentOther, setSegmentOther] = useState('');
  const [contractsVolume, setContractsVolume] = useState<WaitlistStep2Input['contractsVolume'] | undefined>();
  const [currentTool, setCurrentTool] = useState<string>('');
  const [toolOther, setToolOther] = useState('');
  const [interviewOptIn, setInterviewOptIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const finalSegment =
      segment === 'Outro' && segmentOther.trim()
        ? `Outro: ${segmentOther.trim()}`
        : segment;

    const finalTool =
      currentTool === 'Outro' && toolOther.trim()
        ? `Outro: ${toolOther.trim()}`
        : currentTool.trim() || undefined;

    try {
      const res = await onSubmit({
        email,
        painPoints: painPoints.trim() || undefined,
        suggestions: suggestions.trim() || undefined,
        segment: finalSegment,
        contractsVolume,
        currentTool: finalTool,
        interviewOptIn,
      });

      if (!res.success) {
        setError(res.error || 'Não foi possível salvar os dados de qualificação.');
      }
    } catch {
      setError('Ocorreu um erro inesperado ao salvar os dados.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
        >
          {error}
        </div>
      )}

      {/* Pergunta 1: Dores com Contratos */}
      <div className="space-y-2">
        <label
          htmlFor="waitlist-step2-pain-points"
          className="block text-sm font-medium text-[var(--text-main)]"
        >
          Quais são as suas maiores dores ou dificuldades com contratos no dia a dia da sua empresa?
        </label>
        <textarea
          id="waitlist-step2-pain-points"
          rows={3}
          maxLength={1500}
          placeholder="Ex: Demora para gerar minutas, contratos esquecidos sem reajuste de IPCA, falta de rastreio de assinaturas..."
          value={painPoints}
          onChange={(e) => setPainPoints(e.target.value)}
          className="w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-main)] placeholder-[var(--text-muted)]/60 transition-colors focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
        />
      </div>

      {/* Pergunta 2: Sugestões de Evolução */}
      <div className="space-y-2">
        <label
          htmlFor="waitlist-step2-suggestions"
          className="block text-sm font-medium text-[var(--text-main)]"
        >
          O que não pode faltar na Tratto para ela ser perfeita para o seu negócio?
        </label>
        <textarea
          id="waitlist-step2-suggestions"
          rows={3}
          maxLength={1500}
          placeholder="Ex: Integração nativa com emissor de boletos, alertas de vencimento com 30 dias por e-mail..."
          value={suggestions}
          onChange={(e) => setSuggestions(e.target.value)}
          className="w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-main)] placeholder-[var(--text-muted)]/60 transition-colors focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
        />
      </div>

      {/* Pergunta 3: Segmento */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-[var(--text-main)]">
          Qual o seu segmento de atuação?
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SEGMENTS.map((seg) => {
            const isSelected = segment === seg;
            return (
              <label
                key={seg}
                className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-all select-none ${
                  isSelected
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-semibold'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] hover:border-[var(--text-muted)]/50'
                }`}
              >
                <span>{seg}</span>
                <input
                  type="radio"
                  name="segment"
                  value={seg}
                  checked={isSelected}
                  onChange={() => setSegment(seg)}
                  className="sr-only"
                />
                {isSelected && <Check className="h-3.5 w-3.5 text-[var(--accent-primary)]" />}
              </label>
            );
          })}
        </div>
        {segment === 'Outro' && (
          <div className="pt-2 animate-in fade-in-50 duration-200">
            <input
              type="text"
              placeholder="Qual o seu segmento de atuação?"
              value={segmentOther}
              onChange={(e) => setSegmentOther(e.target.value)}
              className="w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3.5 py-2.5 text-xs text-[var(--text-main)] placeholder-[var(--text-muted)]/60 focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all shadow-2xs"
            />
          </div>
        )}
      </fieldset>

      {/* Pergunta 2: Volume de Contratos */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-[var(--text-main)]">
          Quantos contratos você costuma gerar por mês?
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {VOLUMES.map((vol) => {
            const isSelected = contractsVolume === vol;
            return (
              <label
                key={vol}
                className={`flex items-center justify-center p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-all select-none ${
                  isSelected
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-semibold'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] hover:border-[var(--text-muted)]/50'
                }`}
              >
                <span>{vol}</span>
                <input
                  type="radio"
                  name="contractsVolume"
                  value={vol}
                  checked={isSelected}
                  onChange={() => setContractsVolume(vol)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Pergunta 3: Ferramenta Atual */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-[var(--text-main)]">
          Qual ferramenta você usa hoje para fazer contratos?
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TOOLS.map((tool) => {
            const isSelected = currentTool === tool;
            return (
              <label
                key={tool}
                className={`flex items-center justify-center text-center p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-all select-none ${
                  isSelected
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-semibold'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] hover:border-[var(--text-muted)]/50'
                }`}
              >
                <span>{tool}</span>
                <input
                  type="radio"
                  name="currentTool"
                  value={tool}
                  checked={isSelected}
                  onChange={() => setCurrentTool(tool)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>
        {currentTool === 'Outro' && (
          <div className="pt-2 animate-in fade-in-50 duration-200">
            <input
              type="text"
              placeholder="Qual ferramenta você utiliza hoje?"
              value={toolOther}
              onChange={(e) => setToolOther(e.target.value)}
              className="w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3.5 py-2.5 text-xs text-[var(--text-main)] placeholder-[var(--text-muted)]/60 focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all shadow-2xs"
            />
          </div>
        )}
      </fieldset>

      {/* Opt-in de Entrevista com o Fundador */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer select-none rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-3.5 hover:border-[var(--accent-primary)]/50 transition-colors">
          <input
            type="checkbox"
            checked={interviewOptIn}
            onChange={(e) => setInterviewOptIn(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-[var(--border-subtle)] text-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 accent-[var(--accent-primary)]"
          />
          <div className="space-y-0.5">
            <span className="text-xs font-medium text-[var(--text-main)] block">
              Toparia bater um papo de 20 minutos com o fundador?
            </span>
            <span className="text-xs text-[var(--text-muted)] leading-relaxed block">
              Uma conversa para entender mais a fundo as dores da sua empresa quando o assunto é &apos;contratos&apos;. Se topar, te garanto uma promoção especial de lançamento!
            </span>
          </div>
        </label>
      </div>

      {/* Botão de Ação */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30 disabled:opacity-70 disabled:cursor-not-allowed shadow-xs cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Salvando respostas...</span>
            </>
          ) : (
            <span>Concluir cadastro</span>
          )}
        </button>
      </div>
    </form>
  );
}
