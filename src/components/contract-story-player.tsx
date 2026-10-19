"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { User, CheckCircle, Clock, ShieldCheck, Sparkles, TrendingUp, Play, Pause, ChevronDown, Check, Loader2 } from "lucide-react";

export const STORY_STEPS = [
  {
    id: "modelo-marcadores",
    number: "01",
    title: "Modelo & Marcadores",
    description:
      "O seu arquivo .docx original com marcadores {{ }} que indicam exatamente onde cada informação deve entrar, preservando 100% do seu layout e tabelas.",
  },
  {
    id: "preenchimento-criacao",
    number: "02",
    title: "Preenchimento & Criação",
    description:
      "Simulação de elaboração: você seleciona o cliente, o plano e a vigência, e os marcadores mudam de forma leve e instantânea para os dados oficiais.",
  },
  {
    id: "envio-assinatura",
    number: "03",
    title: "Envio & Assinatura",
    description:
      "O contrato se move até o cliente e retorna autenticado com carimbo diagonal de validade jurídica via integração nativa ou modo manual.",
  },
  {
    id: "vigencia-reajuste",
    number: "04",
    title: "Vigência & Reajuste",
    description:
      "Linha do tempo contínua: no aniversário do contrato, a API oficial do Bacen aplica o reajuste automático e atualiza o valor com zero esforço.",
  },
];

export function ContractStoryPlayer() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeStep = STORY_STEPS[activeStepIndex];

  // Temporizador de 25 segundos por etapa do Story (pausável)
  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      setActiveStepIndex((prev) => (prev + 1) % STORY_STEPS.length);
    }, 25000);

    return () => clearTimeout(timer);
  }, [activeStepIndex, resetKey, isPaused]);

  const handleSelectStep = (index: number) => {
    setActiveStepIndex(index);
    setResetKey((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setActiveStepIndex((prev) => (prev - 1 + STORY_STEPS.length) % STORY_STEPS.length);
    setResetKey((prev) => prev + 1);
  };

  const handleNextStep = () => {
    setActiveStepIndex((prev) => (prev + 1) % STORY_STEPS.length);
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="mt-12 rounded-2xl bg-[var(--bg-card)] p-5 sm:p-8 shadow-sm text-left">
      {/* 1. Barras segmentadas estilo Stories no topo */}
      <div
        className="grid grid-cols-4 gap-2"
        role="group"
        aria-label="Indicadores das etapas da história do contrato"
      >
        {STORY_STEPS.map((step, idx) => {
          const isSelected = activeStepIndex === idx;
          const isPast = idx < activeStepIndex;
          return (
            <button
              key={`story-bar-${step.id}`}
              type="button"
              onClick={() => handleSelectStep(idx)}
              aria-label={`Etapa ${idx + 1}: ${step.title}`}
              className="group relative flex flex-col items-start gap-1.5 focus:outline-hidden cursor-pointer"
            >
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--border-subtle)]">
                {isPast && <div className="h-full w-full bg-[var(--accent-primary)] rounded-full" />}
                {isSelected && (
                  <div
                    key={`story-progress-${step.id}-${resetKey}`}
                    className="h-full bg-[var(--accent-primary)] rounded-full animate-metric-progress"
                    style={{
                      animationDuration: "25s",
                      animationPlayState: isPaused ? "paused" : "running",
                    }}
                  />
                )}
              </div>
              <span
                className={clsx(
                  "hidden sm:inline-block font-mono text-xs transition-colors duration-200 truncate w-full text-left",
                  isSelected
                    ? "font-semibold text-[var(--accent-primary)]"
                    : "text-[var(--text-muted)] group-hover:text-[var(--text-main)]"
                )}
              >
                {step.number} · {step.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Cabeçalho da Etapa: Título e Descrição */}
      <div className="mt-6 pb-5 border-b border-[var(--border-subtle)]">
        <h3 className="font-serif text-2xl sm:text-3xl italic font-semibold text-[var(--text-main)]">
          {activeStep.title}
        </h3>
        <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
          {activeStep.description}
        </p>
      </div>

      {/* 3. Palco Visual Interativo com Animações Específicas por Etapa */}
      <div className="mt-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4 sm:p-8 min-h-[380px] sm:min-h-[420px] flex items-center justify-center overflow-hidden relative">
        {/* Botão de Controle de Pausa/Reprodução no Canto Superior Direito na cor do tema */}
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? "Retomar reprodução automática" : "Pausar reprodução automática"}
          title={isPaused ? "Retomar reprodução automática" : "Pausar reprodução automática"}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--accent-surface)] text-[var(--accent-primary)] hover:opacity-85 active:scale-95 transition-all cursor-pointer shadow-xs"
        >
          {isPaused ? (
            <Play className="h-4 w-4 fill-current ml-0.5" />
          ) : (
            <Pause className="h-4 w-4 fill-current" />
          )}
        </button>

        {activeStepIndex === 0 && <Step1ModelMarkers />}
        {activeStepIndex === 1 && <Step2FillingCreation />}
        {activeStepIndex === 2 && <Step3SendingSigning />}
        {activeStepIndex === 3 && <Step4TimelineAdjustment />}
      </div>

      {/* 4. Controles de navegação centralizados na parte de baixo */}
      <div className="mt-8 flex items-center justify-center gap-8 sm:gap-12">
        <button
          type="button"
          onClick={handlePrevStep}
          aria-label="Etapa anterior"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-[var(--text-main)] transition-colors cursor-pointer text-xl shadow-xs"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={handleNextStep}
          aria-label="Próxima etapa"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-[var(--text-main)] transition-colors cursor-pointer text-xl shadow-xs"
        >
          ›
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// ETAPA 1: O MODELO EM BRANCO SENDO PREENCHIDO COM EFEITO TYPING E MARCADORES EM DESTAQUE
// =========================================================================
const STEP1_TITLE = "Contrato de Prestação de Serviços";

interface DocParagraph {
  segments: {
    text: string;
    isMarker?: boolean;
  }[];
}

const STEP1_PARAGRAPHS: DocParagraph[] = [
  {
    segments: [
      { text: "Pelo presente instrumento particular, de um lado a CONTRATADA, e de outro lado como CONTRATANTE " },
      { text: "{{cliente_nome}}", isMarker: true },
      { text: ", inscrito sob o documento oficial " },
      { text: "{{cliente_documento}}", isMarker: true },
      { text: "." },
    ],
  },
  {
    segments: [
      { text: "Cláusula 1ª: O objeto deste contrato é a prestação do serviço correspondente ao " },
      { text: "{{plano_nome}}", isMarker: true },
      { text: ", com a vigência estipulada de " },
      { text: "{{vigencia_meses}}", isMarker: true },
      { text: "." },
    ],
  },
  {
    segments: [
      { text: "Cláusula 2ª: Pela execução dos serviços, o CONTRATANTE pagará o valor mensal de " },
      { text: "{{valor_mensal}}", isMarker: true },
      { text: ", reajustado anualmente pelo índice oficial." },
    ],
  },
];

const FULL_DOC_TEXT =
  STEP1_TITLE +
  STEP1_PARAGRAPHS.reduce(
    (acc, p) => acc + p.segments.reduce((sAcc, s) => sAcc + s.text, ""),
    ""
  );

const TOTAL_DOC_CHARS = FULL_DOC_TEXT.length;

function getCharTypingDelay(index: number): number {
  if (index >= FULL_DOC_TEXT.length) return 25;
  const char = FULL_DOC_TEXT[index];

  // Pausa após o título do documento
  if (index === STEP1_TITLE.length - 1) return 100;

  // Pausas naturais de respiração e pontuação
  if (char === "." || char === ":") return 80;
  if (char === ",") return 55;
  if (char === " ") return 32;

  // Pausa sutil ao finalizar um marcador completo
  if (char === "}" && index > 0 && FULL_DOC_TEXT[index - 1] === "}") return 75;

  // Variação orgânica entre teclas normais (20ms a 32ms)
  const rhythm = (index * 7) % 13;
  return 20 + rhythm;
}

// Pré-computa tempos acumulados para cada caractere para garantir timing preciso e natural
const CUMULATIVE_CHAR_TIMES: number[] = [];
let accDocTime = 0;
for (let i = 0; i < FULL_DOC_TEXT.length; i++) {
  accDocTime += getCharTypingDelay(i);
  CUMULATIVE_CHAR_TIMES.push(accDocTime);
}

const DOC_TYPING_DURATION = accDocTime;
const DOC_READING_PAUSE = 5000;
const DOC_FADE_DURATION = 600;
const TOTAL_CYCLE_MS = DOC_TYPING_DURATION + DOC_READING_PAUSE + DOC_FADE_DURATION;

function Step1ModelMarkers() {
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    const TICK_INTERVAL = 25;
    const interval = setInterval(() => {
      setElapsedMs((prev) => (prev + TICK_INTERVAL) % TOTAL_CYCLE_MS);
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const isFading = elapsedMs >= DOC_TYPING_DURATION + DOC_READING_PAUSE;

  let typedChars = 0;
  if (elapsedMs < DOC_TYPING_DURATION) {
    for (let i = 0; i < CUMULATIVE_CHAR_TIMES.length; i++) {
      if (CUMULATIVE_CHAR_TIMES[i] <= elapsedMs) {
        typedChars = i + 1;
      } else {
        break;
      }
    }
  } else {
    typedChars = TOTAL_DOC_CHARS;
  }

  // Calcula fatias de texto digitadas para cada segmento
  let charBudget = typedChars;

  let renderedTitle = "";
  let cursorAtTitle = false;

  if (charBudget > 0) {
    if (charBudget >= STEP1_TITLE.length) {
      renderedTitle = STEP1_TITLE;
      charBudget -= STEP1_TITLE.length;
    } else {
      renderedTitle = STEP1_TITLE.slice(0, charBudget);
      charBudget = 0;
      cursorAtTitle = true;
    }
  }

  const renderedParagraphs = STEP1_PARAGRAPHS.map((block, pIdx) => {
    return block.segments.map((seg, sIdx) => {
      if (charBudget <= 0) {
        return null;
      }

      let textSlice = "";
      let isCurrentTyping = false;

      if (charBudget >= seg.text.length) {
        textSlice = seg.text;
        charBudget -= seg.text.length;
      } else {
        textSlice = seg.text.slice(0, charBudget);
        charBudget = 0;
        isCurrentTyping = true;
      }

      const isMarker = seg.isMarker;
      const isCompleteMarker = isMarker && textSlice.length === seg.text.length;

      return (
        <React.Fragment key={`seg-${pIdx}-${sIdx}`}>
          {isCompleteMarker ? (
            <span
              className={clsx(
                "font-mono px-1.5 py-0.5 rounded font-semibold transition-all duration-300 inline-block align-baseline",
                "bg-[var(--accent-surface)] text-[var(--accent-primary)] border border-[var(--border-strong)] shadow-xs animate-metric-fade-in"
              )}
            >
              {textSlice}
            </span>
          ) : isMarker ? (
            <span className="font-mono text-gray-900">{textSlice}</span>
          ) : (
            <span>{textSlice}</span>
          )}
          {isCurrentTyping && (
            <span className="inline-block w-0.5 h-3.5 bg-[var(--accent-primary)] animate-pulse ml-0.5 align-middle" />
          )}
        </React.Fragment>
      );
    });
  });

  return (
    <div className="w-full max-w-[380px] sm:max-w-[410px] mx-auto flex flex-col items-center">
      {/* Documento simulado A4 com largura calibrada e acabamento de folha de papel */}
      <div
        className={clsx(
          "w-full rounded-md border border-gray-200 bg-white p-5 sm:p-6 shadow-xl shadow-black/8 ring-1 ring-black/5 transition-opacity duration-500 text-left min-h-[440px] flex flex-col justify-start relative",
          isFading ? "opacity-0" : "opacity-100"
        )}
      >
        {/* Cabeçalho do documento Word / DOCX */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4 select-none">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-500 font-semibold truncate max-w-[200px]">
              modelo_prestacao_servicos.docx
            </span>
          </div>
          <span className="text-[9px] font-mono uppercase font-bold tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
            Word DOCX
          </span>
        </div>

        {/* Corpo do documento com digitação progressiva */}
        <div className="space-y-3.5 text-xs sm:text-[13px] text-gray-700 leading-relaxed font-sans">
          <div className="text-center font-bold uppercase tracking-wider text-gray-900 pb-2 text-xs sm:text-sm border-b border-gray-100 min-h-[32px] flex items-center justify-center">
            {renderedTitle && (
              <span>
                {renderedTitle}
                {cursorAtTitle && (
                  <span className="inline-block w-0.5 h-3.5 bg-[var(--accent-primary)] animate-pulse ml-0.5 align-middle" />
                )}
              </span>
            )}
          </div>

          {renderedParagraphs.map((para, idx) => (
            <p key={`p-${idx}`} className="min-h-[20px] transition-all">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// ETAPA 2: PREENCHIMENTO CAMPO A CAMPO COM SELECTS CONFIGURÁVEIS E CONTRATO OFICIAL
// =========================================================================
const PLANO_OPTIONS = ["Plano ABC", "Plano JKL", "Plano XYZ"] as const;
const VIGENCIA_OPTIONS = ["3 meses", "6 meses", "12 meses", "24 meses"] as const;

const TARGET_PLANO = "Plano XYZ";
const TARGET_VIGENCIA = "12 meses";

const STEP2_TIMELINE = {
  cliente: { startMs: 350, endMs: 1150, target: "João da Silva" },
  documento: { startMs: 1350, endMs: 2150, target: "12.345.678/0001-90" },
  plano: { openMs: 2350, highlightMs: 2700, selectMs: 3050, target: TARGET_PLANO },
  vigencia: { openMs: 3250, highlightMs: 3600, selectMs: 3950, target: TARGET_VIGENCIA },
  mensalidade: { startMs: 4150, endMs: 4750, target: "R$ 1.200,00" },
  fieldsDoneMs: 4750,
  clickMs: 6250,  // 1.5s após término dos campos (4750 + 1500)
  savingMs: 6450, // início do spinner de salvamento
  savedMs: 8450,  // 2s após início do salvamento (6450 + 2000)
  readingPauseMs: 6000,
  fadeMs: 600,
};

const STEP2_TOTAL_CYCLE =
  STEP2_TIMELINE.savedMs +
  STEP2_TIMELINE.readingPauseMs +
  STEP2_TIMELINE.fadeMs;

function Step2FillingCreation() {
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    const TICK_INTERVAL = 30;
    const interval = setInterval(() => {
      setElapsedMs((prev) => (prev + TICK_INTERVAL) % STEP2_TOTAL_CYCLE);
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const isClicking = elapsedMs >= STEP2_TIMELINE.clickMs && elapsedMs < STEP2_TIMELINE.savingMs;
  const isSaving = elapsedMs >= STEP2_TIMELINE.savingMs && elapsedMs < STEP2_TIMELINE.savedMs;
  const isSaved =
    elapsedMs >= STEP2_TIMELINE.savedMs &&
    elapsedMs < (STEP2_TIMELINE.savedMs + STEP2_TIMELINE.readingPauseMs);
  const isFading = elapsedMs >= (STEP2_TIMELINE.savedMs + STEP2_TIMELINE.readingPauseMs);

  // Helper para campos de texto digitado (Cliente, Documento e Mensalidade)
  const getTypedFieldState = (config: { startMs: number; endMs: number; target: string }) => {
    if (elapsedMs < config.startMs) {
      return { value: "", isTyping: false, isFinished: false };
    }
    if (elapsedMs >= config.startMs && elapsedMs < config.endMs) {
      const progress = (elapsedMs - config.startMs) / (config.endMs - config.startMs);
      const chars = Math.min(Math.floor(progress * config.target.length) + 1, config.target.length);
      return { value: config.target.slice(0, chars), isTyping: true, isFinished: false };
    }
    return { value: config.target, isTyping: false, isFinished: true };
  };

  const clienteState = getTypedFieldState(STEP2_TIMELINE.cliente);
  const documentoState = getTypedFieldState(STEP2_TIMELINE.documento);
  const mensalidadeState = getTypedFieldState(STEP2_TIMELINE.mensalidade);

  // Estados dos selects interativos (Plano e Vigência)
  const planoIsOpen =
    elapsedMs >= STEP2_TIMELINE.plano.openMs && elapsedMs < STEP2_TIMELINE.plano.selectMs;
  const planoHighlighted =
    elapsedMs >= STEP2_TIMELINE.plano.highlightMs ? TARGET_PLANO : "Plano ABC";
  const planoIsFinished = elapsedMs >= STEP2_TIMELINE.plano.selectMs;
  const planoValue = planoIsFinished ? TARGET_PLANO : "";

  const vigenciaIsOpen =
    elapsedMs >= STEP2_TIMELINE.vigencia.openMs && elapsedMs < STEP2_TIMELINE.vigencia.selectMs;
  const vigenciaHighlighted =
    elapsedMs >= STEP2_TIMELINE.vigencia.highlightMs ? TARGET_VIGENCIA : "6 meses";
  const vigenciaIsFinished = elapsedMs >= STEP2_TIMELINE.vigencia.selectMs;
  const vigenciaValue = vigenciaIsFinished ? TARGET_VIGENCIA : "";

  return (
    <div
      className={clsx(
        "w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center transition-opacity duration-500",
        isFading ? "opacity-0" : "opacity-100"
      )}
    >
      {/* Painel Esquerdo: Formulário com campos de texto, selects configuráveis e botão Salvar */}
      <div className="lg:col-span-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 sm:p-5 shadow-xs text-left space-y-3">
        {/* Campo 1: Cliente */}
        <div>
          <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1">
            Cliente
          </label>
          <div
            className={clsx(
              "px-3 py-2 rounded-lg border text-xs sm:text-sm font-sans transition-all duration-300 flex items-center min-h-[38px]",
              clienteState.isFinished
                ? "bg-[var(--accent-surface)] text-[var(--accent-primary)] border-[var(--border-strong)] font-semibold"
                : clienteState.isTyping
                  ? "bg-white text-[var(--text-main)] border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20 shadow-xs"
                  : "bg-[var(--bg-canvas)] text-[var(--text-muted)] border-[var(--border-subtle)]"
            )}
          >
            {clienteState.value || (
              <span className="text-gray-400">Nome do cliente...</span>
            )}
            {clienteState.isTyping && (
              <span className="inline-block w-0.5 h-3.5 bg-[var(--accent-primary)] animate-pulse ml-0.5" />
            )}
          </div>
        </div>

        {/* Campo 2: Documento */}
        <div>
          <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1">
            Documento Oficial
          </label>
          <div
            className={clsx(
              "px-3 py-2 rounded-lg border text-xs sm:text-sm font-sans transition-all duration-300 flex items-center min-h-[38px]",
              documentoState.isFinished
                ? "bg-[var(--accent-surface)] text-[var(--accent-primary)] border-[var(--border-strong)] font-semibold"
                : documentoState.isTyping
                  ? "bg-white text-[var(--text-main)] border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20 shadow-xs"
                  : "bg-[var(--bg-canvas)] text-[var(--text-muted)] border-[var(--border-subtle)]"
            )}
          >
            {documentoState.value || (
              <span className="text-gray-400">CNPJ ou CPF...</span>
            )}
            {documentoState.isTyping && (
              <span className="inline-block w-0.5 h-3.5 bg-[var(--accent-primary)] animate-pulse ml-0.5" />
            )}
          </div>
        </div>

        {/* Campo 3: Plano Selecionado (Select Configurável) */}
        <div className="relative">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1">
            Plano Selecionado
          </label>
          <div
            className={clsx(
              "w-full px-3 py-2 rounded-lg border text-xs sm:text-sm font-sans transition-all duration-200 flex items-center justify-between min-h-[38px] select-none cursor-default",
              planoIsFinished
                ? "bg-[var(--accent-surface)] text-[var(--accent-primary)] border-[var(--border-strong)] font-semibold"
                : planoIsOpen
                  ? "bg-white text-[var(--text-main)] border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20 shadow-xs"
                  : "bg-[var(--bg-canvas)] text-[var(--text-muted)] border-[var(--border-subtle)]"
            )}
          >
            <span className={clsx(!planoValue && "text-gray-400")}>
              {planoValue || "Selecione o plano..."}
            </span>
            <ChevronDown
              className={clsx(
                "h-4 w-4 transition-transform duration-200 shrink-0",
                planoIsOpen
                  ? "rotate-180 text-[var(--accent-primary)]"
                  : planoIsFinished
                    ? "text-[var(--accent-primary)]"
                    : "text-gray-400"
              )}
            />
          </div>

          {/* Menu Dropdown de opções de Plano */}
          {planoIsOpen && (
            <div
              role="listbox"
              aria-label="Opções de plano"
              className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-white border border-[var(--border-subtle)] rounded-lg shadow-xl py-1 text-xs sm:text-[13px] font-sans overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150"
            >
              {PLANO_OPTIONS.map((opt) => {
                const isHovered = opt === planoHighlighted;
                return (
                  <div
                    key={opt}
                    role="option"
                    aria-selected={isHovered}
                    className={clsx(
                      "px-3 py-2 flex items-center justify-between transition-colors duration-150 cursor-default",
                      isHovered
                        ? "bg-[var(--accent-surface)] text-[var(--accent-primary)] font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <span>{opt}</span>
                    {isHovered && (
                      <Check className="h-3.5 w-3.5 text-[var(--accent-primary)] shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Grid 2 colunas: Vigência (Select Configurável) e Mensalidade */}
        <div className="grid grid-cols-2 gap-3">
          {/* Campo 4: Vigência (Select Configurável) */}
          <div className="relative">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1">
              Vigência
            </label>
            <div
              className={clsx(
                "w-full px-3 py-2 rounded-lg border text-xs sm:text-sm font-sans transition-all duration-200 flex items-center justify-between min-h-[38px] select-none cursor-default",
                vigenciaIsFinished
                  ? "bg-[var(--accent-surface)] text-[var(--accent-primary)] border-[var(--border-strong)] font-semibold"
                  : vigenciaIsOpen
                    ? "bg-white text-[var(--text-main)] border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20 shadow-xs"
                    : "bg-[var(--bg-canvas)] text-[var(--text-muted)] border-[var(--border-subtle)]"
              )}
            >
              <span className={clsx(!vigenciaValue && "text-gray-400 truncate")}>
                {vigenciaValue || "Prazo..."}
              </span>
              <ChevronDown
                className={clsx(
                  "h-4 w-4 transition-transform duration-200 shrink-0",
                  vigenciaIsOpen
                    ? "rotate-180 text-[var(--accent-primary)]"
                    : vigenciaIsFinished
                      ? "text-[var(--accent-primary)]"
                      : "text-gray-400"
                )}
              />
            </div>

            {/* Menu Dropdown de opções de Vigência */}
            {vigenciaIsOpen && (
              <div
                role="listbox"
                aria-label="Opções de vigência"
                className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-white border border-[var(--border-subtle)] rounded-lg shadow-xl py-1 text-xs sm:text-[13px] font-sans overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150"
              >
                {VIGENCIA_OPTIONS.map((opt) => {
                  const isHovered = opt === vigenciaHighlighted;
                  return (
                    <div
                      key={opt}
                      role="option"
                      aria-selected={isHovered}
                      className={clsx(
                        "px-3 py-1.5 flex items-center justify-between transition-colors duration-150 cursor-default",
                        isHovered
                          ? "bg-[var(--accent-surface)] text-[var(--accent-primary)] font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      <span>{opt}</span>
                      {isHovered && (
                        <Check className="h-3.5 w-3.5 text-[var(--accent-primary)] shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Campo 5: Mensalidade */}
          <div>
            <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1">
              Mensalidade
            </label>
            <div
              className={clsx(
                "px-3 py-2 rounded-lg border text-xs sm:text-sm font-sans transition-all duration-300 flex items-center min-h-[38px]",
                mensalidadeState.isFinished
                  ? "bg-[var(--accent-surface)] text-[var(--accent-primary)] border-[var(--border-strong)] font-semibold"
                  : mensalidadeState.isTyping
                    ? "bg-white text-[var(--text-main)] border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20 shadow-xs"
                    : "bg-[var(--bg-canvas)] text-[var(--text-muted)] border-[var(--border-subtle)]"
              )}
            >
              {mensalidadeState.value || (
                <span className="text-gray-400">R$ 0,00</span>
              )}
              {mensalidadeState.isTyping && (
                <span className="inline-block w-0.5 h-3.5 bg-[var(--accent-primary)] animate-pulse ml-0.5" />
              )}
            </div>
          </div>
        </div>

        {/* Botão Salvar & Gerar com feedback animado de clique, salvando e salvo */}
        <div className="pt-1.5">
          <button
            type="button"
            className={clsx(
              "w-full py-2.5 px-4 rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-default shadow-xs",
              isClicking && "scale-[0.97] ring-2 ring-[var(--accent-primary)]/40 brightness-90",
              isSaved
                ? "bg-emerald-600 text-white font-semibold"
                : isSaving
                  ? "bg-[var(--accent-primary)] text-white opacity-90"
                  : "bg-[var(--accent-primary)] text-white hover:opacity-95"
            )}
          >
            {isSaved ? (
              <>
                <Check className="h-4 w-4 stroke-[2.5]" />
                <span>Salvo</span>
              </>
            ) : isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Salvando...</span>
              </>
            ) : (
              <span>Salvar &amp; Gerar</span>
            )}
          </button>
        </div>
      </div>

      {/* Painel Direito: Contrato idêntico à Etapa 1 com marcadores atualizados em tempo real */}
      <div className="lg:col-span-7 flex justify-center">
        <div className="w-full max-w-[380px] sm:max-w-[420px] rounded-md border border-gray-200 bg-white p-5 sm:p-6 shadow-xl shadow-black/8 ring-1 ring-black/5 transition-all text-left min-h-[440px] flex flex-col justify-start relative">
          {/* Cabeçalho do documento: modelo_prestacao_servicos.docx -> contrato_123456.docx */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4 select-none">
            <div className="flex items-center gap-2">
              <div
                className={clsx(
                  "h-2.5 w-2.5 rounded-full transition-colors duration-500",
                  isSaved ? "bg-emerald-600" : "bg-blue-600"
                )}
              />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold truncate max-w-[210px] transition-all duration-500">
                {isSaved ? (
                  <span className="text-emerald-800 font-bold">contrato_123456.docx</span>
                ) : (
                  <span className="text-gray-500">modelo_prestacao_servicos.docx</span>
                )}
              </span>
            </div>
          </div>

          {/* Título do contrato idêntico à Etapa 1 */}
          <div className="text-center font-bold uppercase tracking-wider text-gray-900 pb-2 text-xs sm:text-sm border-b border-gray-100 mb-3 min-h-[32px] flex items-center justify-center">
            Contrato de Prestação de Serviços
          </div>

          {/* Parágrafos: durante digitação/seleção mantêm a cor do tema, e viram verde somente quando Salvo */}
          <div className="space-y-3.5 text-xs sm:text-[13px] text-gray-700 leading-relaxed font-sans">
            <p>
              Pelo presente instrumento particular, de um lado a CONTRATADA, e de outro lado como CONTRATANTE{" "}
              <span
                className={clsx(
                  "transition-all duration-300 px-1.5 py-0.5 rounded inline-block align-baseline",
                  isSaved
                    ? "bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold shadow-2xs"
                    : "bg-[var(--accent-surface)] text-[var(--accent-primary)] border border-[var(--border-strong)] font-semibold",
                  !clienteState.isFinished && !clienteState.isTyping && "font-mono"
                )}
              >
                {clienteState.isFinished
                  ? clienteState.value
                  : clienteState.isTyping
                    ? clienteState.value
                    : "{{cliente_nome}}"}
              </span>
              , inscrito sob o documento oficial{" "}
              <span
                className={clsx(
                  "transition-all duration-300 px-1.5 py-0.5 rounded inline-block align-baseline",
                  isSaved
                    ? "bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold shadow-2xs"
                    : "bg-[var(--accent-surface)] text-[var(--accent-primary)] border border-[var(--border-strong)] font-semibold",
                  !documentoState.isFinished && !documentoState.isTyping && "font-mono"
                )}
              >
                {documentoState.isFinished
                  ? documentoState.value
                  : documentoState.isTyping
                    ? documentoState.value
                    : "{{cliente_documento}}"}
              </span>
              .
            </p>

            <p>
              <strong>Cláusula 1ª:</strong> O objeto deste contrato é a prestação do serviço correspondente ao{" "}
              <span
                className={clsx(
                  "transition-all duration-300 px-1.5 py-0.5 rounded inline-block align-baseline",
                  isSaved
                    ? "bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold shadow-2xs"
                    : "bg-[var(--accent-surface)] text-[var(--accent-primary)] border border-[var(--border-strong)] font-semibold",
                  !planoIsFinished && "font-mono"
                )}
              >
                {planoIsFinished ? planoValue : "{{plano_nome}}"}
              </span>
              , com a vigência estipulada de{" "}
              <span
                className={clsx(
                  "transition-all duration-300 px-1.5 py-0.5 rounded inline-block align-baseline",
                  isSaved
                    ? "bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold shadow-2xs"
                    : "bg-[var(--accent-surface)] text-[var(--accent-primary)] border border-[var(--border-strong)] font-semibold",
                  !vigenciaIsFinished && "font-mono"
                )}
              >
                {vigenciaIsFinished ? vigenciaValue : "{{vigencia_meses}}"}
              </span>
              .
            </p>

            <p>
              <strong>Cláusula 2ª:</strong> Pela execução dos serviços, o CONTRATANTE pagará o valor mensal de{" "}
              <span
                className={clsx(
                  "transition-all duration-300 px-1.5 py-0.5 rounded inline-block align-baseline",
                  isSaved
                    ? "bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold shadow-2xs"
                    : "bg-[var(--accent-surface)] text-[var(--accent-primary)] border border-[var(--border-strong)] font-semibold",
                  !mensalidadeState.isFinished && !mensalidadeState.isTyping && "font-mono"
                )}
              >
                {mensalidadeState.isFinished
                  ? mensalidadeState.value
                  : mensalidadeState.isTyping
                    ? mensalidadeState.value
                    : "{{valor_mensal}}"}
              </span>
              , reajustado anualmente pelo índice oficial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// =========================================================================
// ETAPA 3: CONTRATO SE MOVE PARA O CLIENTE, SOME E VOLTA COM CARIMBO ASSINADO
// =========================================================================
const STEP3_TIMELINE = {
  centerMs: 2000,
  movingOutMs: 3600,
  signedMs: 7800,
  fadeMs: 600,
};

const STEP3_TOTAL_CYCLE = STEP3_TIMELINE.signedMs + STEP3_TIMELINE.fadeMs;

function Step3SendingSigning() {
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    const TICK_INTERVAL = 30;
    const interval = setInterval(() => {
      setElapsedMs((prev) => (prev + TICK_INTERVAL) % STEP3_TOTAL_CYCLE);
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const isCenter = elapsedMs < STEP3_TIMELINE.centerMs;
  const isMovingOut =
    elapsedMs >= STEP3_TIMELINE.centerMs && elapsedMs < STEP3_TIMELINE.movingOutMs;
  const isSigned =
    elapsedMs >= STEP3_TIMELINE.movingOutMs && elapsedMs < STEP3_TIMELINE.signedMs;
  const isFading = elapsedMs >= STEP3_TIMELINE.signedMs;

  return (
    <div
      className={clsx(
        "w-full max-w-xl mx-auto flex items-center justify-center relative min-h-[460px] py-4 transition-opacity duration-500",
        isFading ? "opacity-0" : "opacity-100"
      )}
    >
      {/* Contrato idêntico ao final da Etapa 2 */}
      <div
        className={clsx(
          "w-full max-w-[320px] sm:max-w-[390px] rounded-md border bg-white p-5 sm:p-6 shadow-xl shadow-black/8 ring-1 ring-black/5 transition-all duration-700 relative text-left select-none min-h-[440px] flex flex-col justify-start z-10",
          isCenter && "translate-x-[-35px] sm:translate-x-[-55px] opacity-100 scale-100 border-gray-200",
          isMovingOut && "translate-x-[90px] sm:translate-x-[150px] opacity-0 scale-75 border-blue-400",
          isSigned && "translate-x-[-35px] sm:translate-x-[-55px] opacity-100 scale-100 border-emerald-400 ring-2 ring-emerald-400/20"
        )}
      >
        {/* Cabeçalho do documento idêntico ao final da Etapa 2 */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4 select-none">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold truncate max-w-[210px] text-emerald-800 font-bold">
              contrato_123456.docx
            </span>
          </div>
        </div>

        {/* Título do contrato idêntico à Etapa 2 */}
        <div className="text-center font-bold uppercase tracking-wider text-gray-900 pb-2 text-xs sm:text-sm border-b border-gray-100 mb-3 min-h-[32px] flex items-center justify-center">
          Contrato de Prestação de Serviços
        </div>

        {/* Parágrafos com todos os marcadores preenchidos em verde */}
        <div className="space-y-3.5 text-xs sm:text-[13px] text-gray-700 leading-relaxed font-sans">
          <p>
            Pelo presente instrumento particular, de um lado a CONTRATADA, e de outro lado como CONTRATANTE{" "}
            <span className="bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold shadow-2xs px-1.5 py-0.5 rounded inline-block align-baseline">
              João da Silva
            </span>
            , inscrito sob o documento oficial{" "}
            <span className="bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold shadow-2xs px-1.5 py-0.5 rounded inline-block align-baseline">
              12.345.678/0001-90
            </span>
            .
          </p>

          <p>
            <strong>Cláusula 1ª:</strong> O objeto deste contrato é a prestação do serviço correspondente ao{" "}
            <span className="bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold shadow-2xs px-1.5 py-0.5 rounded inline-block align-baseline">
              Plano XYZ
            </span>
            , com a vigência estipulada de{" "}
            <span className="bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold shadow-2xs px-1.5 py-0.5 rounded inline-block align-baseline">
              12 meses
            </span>
            .
          </p>

          <p>
            <strong>Cláusula 2ª:</strong> Pela execução dos serviços, o CONTRATANTE pagará o valor mensal de{" "}
            <span className="bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold shadow-2xs px-1.5 py-0.5 rounded inline-block align-baseline">
              R$ 1.200,00
            </span>
            , reajustado anualmente pelo índice oficial.
          </p>
        </div>

        {/* Carimbo ASSINADO na diagonal com rotação, borda pontilhada e fundo transparente estilo carimbo físico */}
        {isSigned && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="rotate-[-12deg] rounded-lg border-2 border-dotted border-emerald-600 bg-transparent px-4 py-2 flex items-center gap-2 animate-metric-fade-in select-none">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 shrink-0" />
              <span className="font-mono text-base sm:text-lg font-black tracking-wider text-emerald-700 uppercase">
                Assinado
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Ícone de Pessoa / Signatário à direita com escala aumentada */}
      <div className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-20 select-none">
        <div
          className={clsx(
            "flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-2 transition-all duration-500 shadow-md",
            isMovingOut
              ? "bg-[var(--accent-primary)] text-white border-[var(--accent-primary)] ring-4 ring-[var(--accent-primary)]/20 scale-110"
              : isSigned
                ? "bg-emerald-50 text-emerald-700 border-emerald-300 ring-2 ring-emerald-400/20"
                : "bg-[var(--accent-surface)] text-[var(--accent-primary)] border-[var(--border-strong)]"
          )}
        >
          <User className="h-8 w-8 sm:h-10 sm:w-10" />
        </div>
        <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-[var(--text-main)]">
          Signatário
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// ETAPA 4: LINHA DO TEMPO, ANIVERSÁRIO DO CONTRATO E VALOR ATUALIZADO
// =========================================================================
function Step4TimelineAdjustment() {
  const [stage, setStage] = useState<"approaching" | "updated" | "yellow" | "red">("approaching");

  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;
    let t3: NodeJS.Timeout;
    let t4: NodeJS.Timeout;

    const runCycle = () => {
      setStage("approaching");
      t1 = setTimeout(() => {
        setStage("updated");
        t2 = setTimeout(() => {
          setStage("yellow");
          t3 = setTimeout(() => {
            setStage("red");
            t4 = setTimeout(() => {
              runCycle();
            }, 2500);
          }, 2500);
        }, 2500);
      }, 2000);
    };

    runCycle();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center relative min-h-[300px]">
      {/* Linha horizontal atrás do contrato com fade gradiente nas pontas */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent z-0 pointer-events-none" />

      {/* Ponto / Partícula de Aniversário que desliza pela linha em direção ao contrato */}
      <div
        className={clsx(
          "absolute top-1/2 -translate-y-1/2 z-10 transition-all duration-1000",
          stage === "approaching" && "left-[15%] opacity-100 scale-125",
          stage === "updated" && "left-[50%] -translate-x-1/2 opacity-0 scale-150",
          (stage === "yellow" || stage === "red") && "left-[10%] opacity-0 scale-50"
        )}
      >
        <div className="h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)] border-2 border-white animate-ping" />
      </div>

      {/* Tooltip / Notificação Flutuante de Atualização */}
      <div
        className={clsx(
          "absolute -top-3 z-30 transition-all duration-500",
          stage === "updated" ? "opacity-100 -translate-y-1 scale-100" : "opacity-0 translate-y-2 scale-90 pointer-events-none"
        )}
      >
        <div className="rounded-full bg-emerald-600 text-white font-mono text-xs px-3 py-1 shadow-lg flex items-center gap-1.5 font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-emerald-200" />
          <span>Valor atualizado (+4,5% IPCA via Bacen)</span>
        </div>
      </div>

      {/* Contrato Centralizado com bordas reativas ao status temporal */}
      <div
        className={clsx(
          "relative z-20 w-64 rounded-lg bg-white p-5 shadow-lg border-2 transition-all duration-700 text-left",
          stage === "updated" && "border-emerald-500 ring-4 ring-emerald-400/20 bg-emerald-50/20 scale-105",
          stage === "approaching" && "border-emerald-400 bg-white scale-100",
          stage === "yellow" && "border-amber-400 ring-2 ring-amber-400/20 bg-amber-50/10 scale-100",
          stage === "red" && "border-rose-400 ring-2 ring-rose-400/20 bg-rose-50/10 scale-100"
        )}
      >
        <div className="flex items-center justify-between pb-2 border-b border-gray-100 text-[11px] font-mono">
          <span className="text-gray-500">Contrato #1042</span>
          <span
            className={clsx(
              "font-bold text-[10px] px-2 py-0.5 rounded",
              (stage === "updated" || stage === "approaching") && "bg-emerald-100 text-emerald-800",
              stage === "yellow" && "bg-amber-100 text-amber-800",
              stage === "red" && "bg-rose-100 text-rose-800"
            )}
          >
            {stage === "updated" && "Valor atualizado ✓"}
            {stage === "approaching" && "Vigência Ativa"}
            {stage === "yellow" && "Aviso de Aniversário"}
            {stage === "red" && "Reajuste Pendente"}
          </span>
        </div>

        <div className="mt-3 space-y-1.5 text-xs text-gray-700">
          <div className="font-semibold text-gray-900">João da Silva</div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Mensalidade:</span>
            <span className={clsx("font-mono font-bold transition-colors", stage === "updated" ? "text-emerald-700 text-sm" : "text-gray-900")}>
              {stage === "updated" ? "R$ 1.254,00 / mês" : "R$ 1.200,00 / mês"}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-500">
            <span>Índice Oficial:</span>
            <span className="font-mono font-semibold">IPCA (Bacen)</span>
          </div>
        </div>
      </div>

      {/* Legenda de vigência */}
      <div className="mt-6 text-xs font-mono text-[var(--text-muted)] flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-[var(--accent-primary)]" />
        <span>
          {stage === "approaching" && "Aniversário anual se aproximando na linha do tempo..."}
          {stage === "updated" && "Reajuste aplicado e valor atualizado automaticamente!"}
          {stage === "yellow" && "Aviso preventivo aos gestores sobre a data-base"}
          {stage === "red" && "Varredura contínua garantindo que nenhum reajuste passe em branco"}
        </span>
      </div>
    </div>
  );
}
