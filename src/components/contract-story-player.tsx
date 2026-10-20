"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { User, CheckCircle, Clock, ShieldCheck, Sparkles, TrendingUp, Play, Pause, ChevronDown, Check, Loader2, FileText, Download, Send, ArrowRight, Mail, Copy, Landmark } from "lucide-react";

export const STORY_STEPS = [
  {
    id: "modelo-marcadores",
    number: "01",
    title: "Modelos & Marcadores",
    description:
      "Você manda os seus modelos de contrato para a Tratto, utilizando seus layouts e logos, e utilizando os marcadores disponíveis na plataforma. Você pode redigir os contratos diretamente no nosso editor, ou pode mandar os seus modelos prontos!",
  },
  {
    id: "preenchimento-criacao",
    number: "02",
    title: "Gerando os contratos",
    description:
      "Uma vez que o modelo esteja salvo, você pode selecionar as informações relacionadas àquele contrato, como nome do contratante, plano escolhido, vigência, cláusulas adicionais, e a Tratto se encarrega de gerar e guardar os contratos, usando como base os modelos que você mesmo definiu; sem erros de digitação, sem perder seu modelo acidentamente, simples assim!",
  },
  {
    id: "envio-assinatura",
    number: "03",
    title: "Envio & Assinatura",
    description:
      "Com o contrato elaborado, você poderá baixá-lo para enviar aos seus clientes ou solicitar a assinatura presencialmente, ou melhor: poderá integrar sua plataforma de assinatura eletrônica favorita (como a ZapSign ou Clicksign, por exemplo) para enviá-los automaticamente!",
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

      {/* 2. Cabeçalho da Etapa: Título e Descrição com altura fixa padronizada e folga para o texto completo */}
      <div className="mt-6 pb-3 sm:pb-4 border-b border-[var(--border-subtle)] h-[285px] sm:h-[215px] lg:h-[165px] flex flex-col justify-start">
        <h3 className="font-serif text-2xl sm:text-3xl italic font-semibold text-[var(--text-main)] shrink-0">
          {activeStep.title}
        </h3>
        <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)] w-full leading-relaxed">
          {activeStep.description}
        </p>
      </div>

      {/* 3. Palco Visual Interativo com Animações Específicas por Etapa em Tamanho Padronizado */}
      <div className="mt-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4 sm:p-6 lg:p-8 h-[740px] sm:h-[720px] lg:h-[500px] flex items-center justify-center overflow-hidden relative">
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
    isBold?: boolean;
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
      { text: "Cláusula 1ª: ", isBold: true },
      { text: "O objeto deste contrato é a prestação do serviço correspondente ao " },
      { text: "{{plano_nome}}", isMarker: true },
      { text: ", com a vigência estipulada de " },
      { text: "{{vigencia_meses}}", isMarker: true },
      { text: "." },
    ],
  },
  {
    segments: [
      { text: "Cláusula 2ª: ", isBold: true },
      { text: "Pela execução dos serviços, o CONTRATANTE pagará o valor mensal de " },
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
  if (index >= FULL_DOC_TEXT.length) return 35;
  const char = FULL_DOC_TEXT[index];

  // Pausa após o título do documento
  if (index === STEP1_TITLE.length - 1) return 250;

  // Pausas naturais de respiração e pontuação
  if (char === "." || char === ":") return 180;
  if (char === ",") return 110;
  if (char === " ") return 45;

  // Pausa sutil ao finalizar um marcador completo
  if (char === "}" && index > 0 && FULL_DOC_TEXT[index - 1] === "}") return 160;

  // Variação orgânica entre teclas normais (35ms a 47ms) para estender a digitação de forma cadenciada
  const rhythm = (index * 7) % 13;
  return 35 + rhythm;
}

// Pré-computa tempos acumulados para cada caractere para garantir timing preciso e natural
const CUMULATIVE_CHAR_TIMES: number[] = [];
let accDocTime = 0;
for (let i = 0; i < FULL_DOC_TEXT.length; i++) {
  accDocTime += getCharTypingDelay(i);
  CUMULATIVE_CHAR_TIMES.push(accDocTime);
}

const DOC_TYPING_DURATION = accDocTime; // ~22.075ms
const DOC_READING_PAUSE = 2300; // ~2.3s de pausa final para visualização antes de reiniciar
const DOC_FADE_DURATION = 600;
const TOTAL_CYCLE_MS = DOC_TYPING_DURATION + DOC_READING_PAUSE + DOC_FADE_DURATION; // ~24.975ms (25s)

// 18 modelos sequenciais para exibição contínua sem repetição durante os 25s da animação
const SEQUENTIAL_MODELS = Array.from({ length: 18 }, (_, i) => ({
  name: `Modelo ${i + 1}`,
  startOffset: (i - 2) * 1500,
}));
const CARD_TRAVEL_DURATION = 4500;

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
      const isBold = seg.isBold;

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
          ) : isBold ? (
            <strong className="font-bold text-gray-900">{textSlice}</strong>
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
    <div
      className={clsx(
        "w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-opacity duration-500 py-2",
        isFading ? "opacity-0" : "opacity-100"
      )}
    >
      {/* Lado Esquerdo (lg:col-span-7): Computador redigindo o contrato dentro do editor Tratto com linha divisória */}
      <div className="lg:col-span-7 flex flex-col items-center justify-center border-b border-[var(--accent-primary)]/20 pb-6 lg:pb-0 lg:border-b-0 lg:border-r lg:border-[var(--accent-primary)]/30 lg:pr-8">
        {/* Mockup do Computador (Tela / Monitor do Laptop com a cor do tema) */}
        <div className="w-full max-w-[370px] sm:max-w-[430px] rounded-t-xl bg-[var(--accent-primary)] p-2 sm:p-2.5 shadow-xl border-2 border-[var(--border-strong)] text-left">
          {/* Câmera central */}
          <div className="h-1 w-1 rounded-full bg-white/40 mx-auto mb-1.5 ring-1 ring-black/10" />

          {/* Tela interna com altura fixa e rubrica fixa em preto no canto superior esquerdo */}
          <div className="bg-[#FAF9F6] p-3 sm:p-3.5 rounded-b text-left h-[235px] sm:h-[240px] font-sans text-xs sm:text-[13px] text-gray-800 leading-relaxed overflow-hidden">
            {/* Topo da tela: Rubrica da Tratto no canto superior esquerdo (fixa em preto) e Título do documento */}
            <div className="relative mb-2 pb-1.5 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5 shrink-0" title="Plataforma Tratto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  className="h-4 w-4 sm:h-5 sm:w-5 text-gray-900 stroke-current fill-none"
                  role="img"
                  aria-label="Rubrica Tratto"
                >
                  <g strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 6 22 C 14 20, 26 17, 40 19 C 45 20, 48 21, 48 21" strokeWidth="4.2" />
                    <path d="M 31 11 C 30 19, 24 31, 18 36 C 14 40, 15 44, 18 44 C 23 44, 28 37, 33 27 C 34 23, 35 17, 35 13" strokeWidth="3.6" />
                  </g>
                </svg>
              </div>

              <div className="text-center font-bold uppercase tracking-wider text-gray-900 text-[11px] sm:text-xs truncate flex-1 px-2">
                {renderedTitle && (
                  <span>
                    {renderedTitle}
                    {cursorAtTitle && (
                      <span className="inline-block w-0.5 h-3 bg-[var(--accent-primary)] animate-pulse ml-0.5 align-middle" />
                    )}
                  </span>
                )}
              </div>

              {/* Espaçador para balancear a rubrica e manter o título centralizado */}
              <div className="w-5 shrink-0" />
            </div>

            <div className="space-y-2 font-sans">
              {renderedParagraphs.map((para, idx) => (
                <p key={`p-${idx}`} className="min-h-[16px]">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Base do Laptop com a cor do tema */}
        <div className="w-full max-w-[400px] sm:max-w-[460px] h-3 sm:h-3.5 bg-[var(--accent-primary)] brightness-95 rounded-b-xl border-t border-[var(--border-strong)]/40 shadow-md flex items-center justify-center relative -mt-0.5">
          <div className="w-14 sm:w-16 h-1 bg-black/15 rounded-full" />
        </div>
      </div>

      {/* Lado Direito (lg:col-span-5): Tratto Rubrica e os modelos subindo sequencialmente */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[350px] lg:pl-4">
        {/* Logo Rubrica da Tratto maior e sem texto 'Plataforma Tratto' */}
        <div className="relative flex flex-col items-center select-none z-20">
          <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl border-2 border-[var(--border-strong)] bg-white shadow-md p-3 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              className="w-12 h-12 sm:w-16 sm:h-16 text-[var(--text-main)] stroke-current fill-none"
              role="img"
              aria-label="Rubrica Tratto"
            >
              <g strokeLinecap="round" strokeLinejoin="round">
                <path d="M 6 22 C 14 20, 26 17, 40 19 C 45 20, 48 21, 48 21" strokeWidth="3.8" />
                <path d="M 31 11 C 30 19, 24 31, 18 36 C 14 40, 15 44, 18 44 C 23 44, 28 37, 33 27 C 34 23, 35 17, 35 13" strokeWidth="3.2" />
              </g>
            </svg>
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-[var(--accent-primary)] ring-2 ring-white animate-pulse" />
          </div>
        </div>

        {/* Seta apontando para cima com animação float e traço pontilhado (separada da logo e mais próxima dos documentos) */}
        <div className="mt-3.5 sm:mt-4 -mb-2.5 sm:-mb-3 flex items-center justify-center animate-float-gentle text-[var(--accent-primary)] z-15" aria-hidden="true">
          <svg
            viewBox="0 0 24 32"
            className="w-5 h-7 sm:w-6 sm:h-8 stroke-current fill-none"
          >
            <path
              d="M 6 10 L 12 4 L 18 10"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="12"
              y1="5"
              x2="12"
              y2="28"
              strokeWidth="2.2"
              strokeDasharray="3 3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Câmara de fluxo ascendente: Modelos subindo em exibição sequencial contínua bem próximos da seta */}
        <div className="relative w-full max-w-[260px] h-[190px] -mt-1 sm:-mt-1.5 flex justify-center items-center overflow-hidden z-10">
          {SEQUENTIAL_MODELS.map((model) => {
            const cardAge = elapsedMs - model.startOffset;
            if (cardAge < 0 || cardAge > CARD_TRAVEL_DURATION) {
              return null;
            }

            const p = cardAge / CARD_TRAVEL_DURATION;
            let translateY = 85 - p * 160;
            let opacity = 1;
            let scale = 1;

            if (p < 0.15) {
              opacity = p / 0.15;
            } else if (p >= 0.75) {
              const exitProgress = (p - 0.75) / 0.25;
              opacity = 1 - exitProgress;
              scale = 1 - exitProgress * 0.35;
            }

            return (
              <div
                key={model.name}
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  opacity,
                }}
                className="absolute w-44 sm:w-48 rounded-lg border border-[var(--border-subtle)] bg-white px-3 py-2 shadow-md flex items-center gap-2.5 text-left select-none pointer-events-none transition-transform duration-75"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                  <FileText className="h-4 w-4" />
                </div>
                <span className="font-sans font-semibold text-xs text-gray-900 truncate">
                  {model.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// ETAPA 2: PREENCHIMENTO VIA SELECTS DE CLIENTE, PLANO, VIGÊNCIA E REAJUSTE
// =========================================================================
interface ClienteOption {
  id: string;
  nome: string;
  documento: string;
}

const CLIENTE_OPTIONS: ClienteOption[] = [
  { id: "1", nome: "João da Silva", documento: "12.345.678/0001-90" },
  { id: "2", nome: "Maria Fernandes", documento: "98.765.432/0001-10" },
  { id: "3", nome: "Tech Solutions Ltda", documento: "45.678.901/0001-23" },
  { id: "4", nome: "Carlos Eduardo Pereira", documento: "321.654.987-00" },
];

const TARGET_CLIENTE = CLIENTE_OPTIONS[0];

interface PlanoOption {
  nome: string;
  mensalidade: string;
}

const PLANO_OPTIONS: PlanoOption[] = [
  { nome: "Plano ABC", mensalidade: "R$ 490,00" },
  { nome: "Plano JKL", mensalidade: "R$ 850,00" },
  { nome: "Plano XYZ", mensalidade: "R$ 1.200,00" },
];

const TARGET_PLANO = PLANO_OPTIONS[2];

const VIGENCIA_OPTIONS = ["3 meses", "6 meses", "12 meses", "24 meses"] as const;
const TARGET_VIGENCIA = "12 meses";

interface ReajusteOption {
  label: string;
  contratoText: string;
}

const REAJUSTE_OPTIONS: ReajusteOption[] = [
  { label: "Índice Oficial (IPCA / IGP-M)", contratoText: "Índice Oficial (IPCA / Bacen)" },
  { label: "Percentual Fixo Anual (5%)", contratoText: "Percentual Fixo Anual de 5%" },
  { label: "Sem Reajuste Periódico", contratoText: "Sem Reajuste Periódico" },
];

const TARGET_REAJUSTE = REAJUSTE_OPTIONS[0];

const STEP2_TIMELINE = {
  plano: { openMs: 300, highlightMs: 700, selectMs: 1150, target: TARGET_PLANO },
  cliente: { openMs: 1450, highlightMs: 1850, selectMs: 2300, target: TARGET_CLIENTE },
  vigencia: { openMs: 2600, highlightMs: 3000, selectMs: 3450, target: TARGET_VIGENCIA },
  reajuste: { openMs: 3750, highlightMs: 4150, selectMs: 4600, target: TARGET_REAJUSTE },
  fieldsDoneMs: 4600,
  clickMs: 6100,  // 1.5s após término dos campos (4600 + 1500)
  savingMs: 6300, // início do spinner de salvamento
  savedMs: 8300,  // 2s após início do salvamento (6300 + 2000)
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

  // Estados dos selects interativos (Plano, Cliente, Vigência e Reajuste)
  const planoIsOpen =
    elapsedMs >= STEP2_TIMELINE.plano.openMs && elapsedMs < STEP2_TIMELINE.plano.selectMs;
  const planoHighlighted =
    elapsedMs >= STEP2_TIMELINE.plano.highlightMs ? TARGET_PLANO.nome : "Plano ABC";
  const planoIsFinished = elapsedMs >= STEP2_TIMELINE.plano.selectMs;
  const planoValue = planoIsFinished ? TARGET_PLANO.nome : "";

  const clienteIsOpen =
    elapsedMs >= STEP2_TIMELINE.cliente.openMs && elapsedMs < STEP2_TIMELINE.cliente.selectMs;
  const clienteHighlighted =
    elapsedMs >= STEP2_TIMELINE.cliente.highlightMs ? TARGET_CLIENTE.id : "2";
  const clienteIsFinished = elapsedMs >= STEP2_TIMELINE.cliente.selectMs;
  const clienteValue = clienteIsFinished
    ? `${TARGET_CLIENTE.nome} | ${TARGET_CLIENTE.documento}`
    : "";

  const vigenciaIsOpen =
    elapsedMs >= STEP2_TIMELINE.vigencia.openMs && elapsedMs < STEP2_TIMELINE.vigencia.selectMs;
  const vigenciaHighlighted =
    elapsedMs >= STEP2_TIMELINE.vigencia.highlightMs ? TARGET_VIGENCIA : "6 meses";
  const vigenciaIsFinished = elapsedMs >= STEP2_TIMELINE.vigencia.selectMs;
  const vigenciaValue = vigenciaIsFinished ? TARGET_VIGENCIA : "";

  const reajusteIsOpen =
    elapsedMs >= STEP2_TIMELINE.reajuste.openMs && elapsedMs < STEP2_TIMELINE.reajuste.selectMs;
  const reajusteHighlighted =
    elapsedMs >= STEP2_TIMELINE.reajuste.highlightMs ? TARGET_REAJUSTE.label : "Percentual Fixo Anual (5%)";
  const reajusteIsFinished = elapsedMs >= STEP2_TIMELINE.reajuste.selectMs;
  const reajusteValue = reajusteIsFinished ? TARGET_REAJUSTE.label : "";

  return (
    <div
      className={clsx(
        "w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center transition-opacity duration-500",
        isFading ? "opacity-0" : "opacity-100"
      )}
    >
      {/* Painel Esquerdo: Formulário ordenado com Plano no topo, Cliente, Vigência + Mensalidade e Reajuste */}
      <div className="lg:col-span-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 sm:p-5 shadow-xs text-left space-y-2.5">
        {/* Campo 1: Plano Selecionado (Primeira opção vinculada ao modelo) */}
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
            <span className={clsx(!planoValue && "text-gray-400", "truncate")}>
              {planoValue || "Selecione o plano..."}
            </span>
            <ChevronDown
              className={clsx(
                "h-4 w-4 transition-transform duration-200 shrink-0 ml-1.5",
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
                const isHovered = opt.nome === planoHighlighted;
                return (
                  <div
                    key={opt.nome}
                    role="option"
                    aria-selected={isHovered}
                    className={clsx(
                      "px-3 py-1.5 sm:py-2 flex items-center justify-between transition-colors duration-150 cursor-default",
                      isHovered
                        ? "bg-[var(--accent-surface)] text-[var(--accent-primary)] font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="truncate">{opt.nome}</span>
                      <span className="text-[11px] font-mono text-gray-500">({opt.mensalidade}/mês)</span>
                    </div>
                    {isHovered && (
                      <Check className="h-3.5 w-3.5 text-[var(--accent-primary)] shrink-0 ml-1.5" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Campo 2: Cliente (Select) */}
        <div className="relative">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1">
            Cliente
          </label>
          <div
            className={clsx(
              "w-full px-3 py-2 rounded-lg border text-xs sm:text-sm font-sans transition-all duration-200 flex items-center justify-between min-h-[38px] select-none cursor-default",
              clienteIsFinished
                ? "bg-[var(--accent-surface)] text-[var(--accent-primary)] border-[var(--border-strong)] font-semibold"
                : clienteIsOpen
                  ? "bg-white text-[var(--text-main)] border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20 shadow-xs"
                  : "bg-[var(--bg-canvas)] text-[var(--text-muted)] border-[var(--border-subtle)]"
            )}
          >
            <span className={clsx(!clienteValue && "text-gray-400", "truncate")}>
              {clienteValue || "Selecione o cliente..."}
            </span>
            <ChevronDown
              className={clsx(
                "h-4 w-4 transition-transform duration-200 shrink-0 ml-1.5",
                clienteIsOpen
                  ? "rotate-180 text-[var(--accent-primary)]"
                  : clienteIsFinished
                    ? "text-[var(--accent-primary)]"
                    : "text-gray-400"
              )}
            />
          </div>

          {/* Menu Dropdown de opções de Cliente */}
          {clienteIsOpen && (
            <div
              role="listbox"
              aria-label="Opções de cliente"
              className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-white border border-[var(--border-subtle)] rounded-lg shadow-xl py-1 text-xs sm:text-[13px] font-sans overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150"
            >
              {CLIENTE_OPTIONS.map((opt) => {
                const isHovered = opt.id === clienteHighlighted;
                return (
                  <div
                    key={opt.id}
                    role="option"
                    aria-selected={isHovered}
                    className={clsx(
                      "px-3 py-1.5 sm:py-2 flex items-center justify-between transition-colors duration-150 cursor-default",
                      isHovered
                        ? "bg-[var(--accent-surface)] text-[var(--accent-primary)] font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="truncate">{opt.nome}</span>
                      <span className="text-gray-400 font-normal">|</span>
                      <span className="font-mono text-[11px] text-gray-500 truncate">{opt.documento}</span>
                    </div>
                    {isHovered && (
                      <Check className="h-3.5 w-3.5 text-[var(--accent-primary)] shrink-0 ml-1.5" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Grid 2 colunas: Vigência e Mensalidade (Personalizável preenchida com base no plano) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Campo 3A: Vigência (Select) */}
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
                  "h-4 w-4 transition-transform duration-200 shrink-0 ml-1",
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

          {/* Campo 3B: Mensalidade (Preenchida com base no plano escolhido) */}
          <div>
            <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1">
              Mensalidade
            </label>
            <div
              className={clsx(
                "w-full px-3 py-2 rounded-lg border text-xs sm:text-sm font-sans transition-all duration-200 flex items-center justify-between min-h-[38px] select-none",
                planoIsFinished
                  ? "bg-[var(--accent-surface)] text-[var(--accent-primary)] border-[var(--border-strong)] font-semibold"
                  : "bg-[var(--bg-canvas)] text-[var(--text-muted)] border-[var(--border-subtle)]"
              )}
            >
              <span className={clsx(!planoIsFinished && "text-gray-400")}>
                {planoIsFinished ? TARGET_PLANO.mensalidade : "R$ 0,00"}
              </span>
            </div>
          </div>
        </div>

        {/* Campo 4: Atualização Monetária (Select em linha inteira dedicada) */}
        <div className="relative">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1">
            Atualização Monetária
          </label>
          <div
            className={clsx(
              "w-full px-3 py-2 rounded-lg border text-xs sm:text-sm font-sans transition-all duration-200 flex items-center justify-between min-h-[38px] select-none cursor-default",
              reajusteIsFinished
                ? "bg-[var(--accent-surface)] text-[var(--accent-primary)] border-[var(--border-strong)] font-semibold"
                : reajusteIsOpen
                  ? "bg-white text-[var(--text-main)] border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20 shadow-xs"
                  : "bg-[var(--bg-canvas)] text-[var(--text-muted)] border-[var(--border-subtle)]"
            )}
          >
            <span className={clsx(!reajusteValue && "text-gray-400 truncate")}>
              {reajusteValue || "Selecione o reajuste..."}
            </span>
            <ChevronDown
              className={clsx(
                "h-4 w-4 transition-transform duration-200 shrink-0 ml-1.5",
                reajusteIsOpen
                  ? "rotate-180 text-[var(--accent-primary)]"
                  : reajusteIsFinished
                    ? "text-[var(--accent-primary)]"
                    : "text-gray-400"
              )}
            />
          </div>

          {/* Menu Dropdown de opções de Reajuste */}
          {reajusteIsOpen && (
            <div
              role="listbox"
              aria-label="Opções de reajuste"
              className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-white border border-[var(--border-subtle)] rounded-lg shadow-xl py-1 text-xs sm:text-[13px] font-sans overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150"
            >
              {REAJUSTE_OPTIONS.map((opt) => {
                const isHovered = opt.label === reajusteHighlighted;
                return (
                  <div
                    key={opt.label}
                    role="option"
                    aria-selected={isHovered}
                    className={clsx(
                      "px-3 py-1.5 flex items-center justify-between transition-colors duration-150 cursor-default",
                      isHovered
                        ? "bg-[var(--accent-surface)] text-[var(--accent-primary)] font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isHovered && (
                      <Check className="h-3.5 w-3.5 text-[var(--accent-primary)] shrink-0 ml-1" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
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

      {/* Painel Direito: O modelo vinculado aparece assim que o plano é escolhido */}
      <div className="lg:col-span-7 flex justify-center">
        {!planoIsFinished ? (
          <div className="w-full max-w-[360px] sm:max-w-[400px] rounded-md border-2 border-dashed border-[var(--border-subtle)] bg-[var(--bg-canvas)]/40 p-6 text-center min-h-[365px] sm:min-h-[375px] flex flex-col items-center justify-center gap-3 select-none transition-all">
            <div className="h-12 w-12 rounded-xl bg-[var(--accent-surface)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--accent-primary)] animate-pulse">
              <FileText className="h-6 w-6 stroke-[1.8]" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-xs sm:text-sm text-[var(--text-main)]">
                Modelo de Contrato Vinculado
              </p>
              <p className="text-[11px] sm:text-xs text-[var(--text-muted)] max-w-[240px] mx-auto leading-relaxed">
                Selecione o plano desejado para carregar automaticamente o modelo correspondente.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[360px] sm:max-w-[400px] rounded-md border border-gray-200 bg-white p-4 sm:p-5 shadow-xl shadow-black/8 ring-1 ring-black/5 transition-all text-left min-h-[365px] sm:min-h-[375px] flex flex-col justify-start relative animate-metric-fade-in">
            {/* Cabeçalho do documento: modelo_prestacao_servicos -> contrato_123456 (com rubrica da Tratto no canto superior direito) */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2 select-none">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold truncate max-w-[230px] transition-all duration-500">
                {isSaved ? (
                  <span className="text-emerald-800 font-bold">contrato_123456</span>
                ) : (
                  <span className="text-gray-500">modelo_prestacao_servicos</span>
                )}
              </span>
              <div className="flex items-center gap-1 shrink-0" title="Plataforma Tratto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-gray-900 stroke-current fill-none"
                  role="img"
                  aria-label="Rubrica Tratto"
                >
                  <g strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 6 22 C 14 20, 26 17, 40 19 C 45 20, 48 21, 48 21" strokeWidth="4.2" />
                    <path d="M 31 11 C 30 19, 24 31, 18 36 C 14 40, 15 44, 18 44 C 23 44, 28 37, 33 27 C 34 23, 35 17, 35 13" strokeWidth="3.6" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Título do contrato */}
            <div className="text-center font-bold uppercase tracking-wider text-gray-900 pb-2 text-xs sm:text-sm border-b border-gray-100 mb-2 min-h-[26px] flex items-center justify-center">
              Contrato de Prestação de Serviços
            </div>

            {/* Parágrafos e Cláusulas com marcadores e Cláusula 3ª de reajuste */}
            <div className="space-y-2.5 text-xs sm:text-[13px] text-gray-700 leading-relaxed font-sans">
              <p>
                Pelo presente instrumento particular, de um lado a CONTRATADA, e de outro lado como CONTRATANTE{" "}
                <span
                  className={clsx(
                    "transition-all duration-300 px-1.5 py-0.5 rounded inline-block align-baseline",
                    isSaved
                      ? "bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold shadow-2xs"
                      : "bg-[var(--accent-surface)] text-[var(--accent-primary)] border border-[var(--border-strong)] font-semibold",
                    !clienteIsFinished && "font-mono"
                  )}
                >
                  {clienteIsFinished ? TARGET_CLIENTE.nome : "{{cliente_nome}}"}
                </span>
                , inscrito sob o documento oficial{" "}
                <span
                  className={clsx(
                    "transition-all duration-300 px-1.5 py-0.5 rounded inline-block align-baseline",
                    isSaved
                      ? "bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold shadow-2xs"
                      : "bg-[var(--accent-surface)] text-[var(--accent-primary)] border border-[var(--border-strong)] font-semibold",
                    !clienteIsFinished && "font-mono"
                  )}
                >
                  {clienteIsFinished ? TARGET_CLIENTE.documento : "{{cliente_documento}}"}
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
                      : "bg-[var(--accent-surface)] text-[var(--accent-primary)] border border-[var(--border-strong)] font-semibold"
                  )}
                >
                  {TARGET_PLANO.nome}
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
                  {vigenciaIsFinished ? TARGET_VIGENCIA : "{{vigencia_meses}}"}
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
                      : "bg-[var(--accent-surface)] text-[var(--accent-primary)] border border-[var(--border-strong)] font-semibold"
                  )}
                >
                  {TARGET_PLANO.mensalidade}
                </span>
                .
              </p>

              <p>
                <strong>Cláusula 3ª:</strong> O valor mensal será reajustado anualmente por{" "}
                <span
                  className={clsx(
                    "transition-all duration-300 px-1.5 py-0.5 rounded inline-block align-baseline",
                    isSaved
                      ? "bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold shadow-2xs"
                      : "bg-[var(--accent-surface)] text-[var(--accent-primary)] border border-[var(--border-strong)] font-semibold",
                    !reajusteIsFinished && "font-mono"
                  )}
                >
                  {reajusteIsFinished ? TARGET_REAJUSTE.contratoText : "{{tipo_reajuste}}"}
                </span>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// ETAPA 3: FLUXO HORIZONTAL EM 4 PONTOS CONECTADOS POR LINHA DASHED EM MOVIMENTO:
// 1. Contrato diminui e entra no envelope, que fecha e se duplica em 2;
// 2. Os 2 envelopes passam por trás dos blocos de caminhos (Download e ZapSign);
// 3. Os envelopes passam por trás do signatário e sai apenas 1 envelope único;
// 4. No final, o envelope abre e some, revelando o contrato assinado.
// =========================================================================
const STEP3_TIMELINE = {
  contractDepartMs: 800,         // Contrato inicial começa a deslizar para baixo e sumir
  contractGoneMs: 1200,          // Contrato inicial sumiu, fica a moldura pontilhada vazia
  travelCaminhosStartMs: 1200,   // Os 2 envelopes partem do Ponto 1
  travelCaminhosEnterMs: 2000,   // Envelopes passam por trás dos blocos de caminhos
  travelCaminhosExitMs: 2700,    // Envelopes saem dos blocos de caminhos
  travelSignatarioEnterMs: 3400, // Envelopes entram por trás do Signatário
  signatarioSignedMs: 4400,      // Signatário conclui a assinatura -> check verde ✓ surge no avatar!
  singleEnvelopeExitMs: 4900,    // APÓS o signatário estar assinado com check, sai 1 envelope dele
  arriveFinalMs: 5600,           // Envelope único chega ao Ponto 4 e abre
  envelopeDissolveMs: 5800,      // Envelope some
  signedAppearMs: 5800,          // Contrato assinado oficial surge para cima
  readingPauseMs: 7000,          // Pausa confortável para leitura
  fadeMs: 600,                   // Fade out suave antes de reiniciar o loop
};

const STEP3_TOTAL_CYCLE =
  STEP3_TIMELINE.signedAppearMs +
  STEP3_TIMELINE.readingPauseMs +
  STEP3_TIMELINE.fadeMs; // ~13.400ms (13.4s)

function Step3SendingSigning() {
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    const TICK_INTERVAL = 30;
    const interval = setInterval(() => {
      setElapsedMs((prev) => (prev + TICK_INTERVAL) % STEP3_TOTAL_CYCLE);
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Fases do Contrato Inicial no Ponto 1:
  const isContractDeparting = elapsedMs >= STEP3_TIMELINE.contractDepartMs;
  const isContractGone = elapsedMs >= STEP3_TIMELINE.contractGoneMs;

  // Fases de Viagem dos 2 Envelopes (do Ponto 1 até o Signatário: 1200ms -> 3400ms)
  const isTravelingTwo =
    elapsedMs >= STEP3_TIMELINE.travelCaminhosStartMs &&
    elapsedMs < STEP3_TIMELINE.travelSignatarioEnterMs;
  const travelTwoProgress = isTravelingTwo
    ? (elapsedMs - STEP3_TIMELINE.travelCaminhosStartMs) /
      (STEP3_TIMELINE.travelSignatarioEnterMs - STEP3_TIMELINE.travelCaminhosStartMs)
    : elapsedMs >= STEP3_TIMELINE.travelSignatarioEnterMs
      ? 1
      : 0;

  // Coordenadas calculadas no plano do viewBox (1000 x 420):
  // X vai de 195 (saída Ponto 1) até 615 (centro exato do Signatário)
  const twoX = 195 + travelTwoProgress * (615 - 195);

  // Y Superior: 210 -> sobe para 110 (Download PDF) -> mantém em 110 -> desce para 210 (Signatário)
  let twoYSup = 210;
  if (travelTwoProgress < 0.28) {
    const p = travelTwoProgress / 0.28;
    twoYSup = 210 - ((1 - Math.cos(p * Math.PI)) / 2) * 100;
  } else if (travelTwoProgress <= 0.68) {
    twoYSup = 110;
  } else {
    const p = (travelTwoProgress - 0.68) / 0.32;
    twoYSup = 110 + ((1 - Math.cos(p * Math.PI)) / 2) * 100;
  }

  // Y Inferior: 210 -> desce para 310 (ZapSign / Clicksign) -> mantém em 310 -> sobe para 210 (Signatário)
  let twoYInf = 210;
  if (travelTwoProgress < 0.28) {
    const p = travelTwoProgress / 0.28;
    twoYInf = 210 + ((1 - Math.cos(p * Math.PI)) / 2) * 100;
  } else if (travelTwoProgress <= 0.68) {
    twoYInf = 310;
  } else {
    const p = (travelTwoProgress - 0.68) / 0.32;
    twoYInf = 310 - ((1 - Math.cos(p * Math.PI)) / 2) * 100;
  }

  // Efeito de Diminuição / Fade Out e Aumento / Fade In nos 2 Envelopes:
  // - Saída do Ponto 1 (0 -> 0.15): Aumento (0.35 -> 1.0) e Fade In (0 -> 1)
  // - Nos Ícones de Plataforma (0.35 -> 0.65, centro em 0.50): Diminui e Fade Out ao passar, Aumenta e Fade In ao sair
  // - Chegada no Signatário (0.80 -> 1.0): Diminui (1.0 -> 0.2) e Fade Out (1 -> 0) para entrar suavemente no avatar sem vazar à direita
  let twoScale = 1;
  let twoOpacity = 1;
  if (travelTwoProgress < 0.15) {
    const p = travelTwoProgress / 0.15;
    twoScale = 0.35 + 0.65 * p;
    twoOpacity = p;
  } else if (travelTwoProgress >= 0.35 && travelTwoProgress <= 0.65) {
    const distFromCenter = Math.abs(travelTwoProgress - 0.5) / 0.15;
    twoScale = 0.6 + 0.4 * distFromCenter;
    twoOpacity = 0.35 + 0.65 * distFromCenter;
  } else if (travelTwoProgress > 0.8) {
    const p = Math.max(0, (1 - travelTwoProgress) / 0.2);
    twoScale = 0.2 + 0.8 * p;
    twoOpacity = p;
  }

  // Destaque quando os envelopes passam por trás dos blocos de caminhos
  const isBehindDownload =
    elapsedMs >= STEP3_TIMELINE.travelCaminhosEnterMs &&
    elapsedMs < STEP3_TIMELINE.travelCaminhosExitMs;
  const isBehindZapSign = isBehindDownload;

  // Fase do Signatário assinando: envelopes entram por trás e assinam (3400ms -> 4400ms)
  const isSigning =
    elapsedMs >= STEP3_TIMELINE.travelSignatarioEnterMs &&
    elapsedMs < STEP3_TIMELINE.signatarioSignedMs;

  // Signatário assinado com check verde ✓ (4400ms em diante)
  const isSignatarioSigned =
    elapsedMs >= STEP3_TIMELINE.signatarioSignedMs &&
    elapsedMs < (STEP3_TIMELINE.signedAppearMs + STEP3_TIMELINE.readingPauseMs);

  // Fase do Envelope Único que sai de trás do Signatário (4900ms -> 5800ms)
  // IMPORTANTE: Só inicia após o signatário já ter concluído a assinatura e recebido o check verde!
  const isSingleTraveling =
    elapsedMs >= STEP3_TIMELINE.singleEnvelopeExitMs &&
    elapsedMs < STEP3_TIMELINE.envelopeDissolveMs;
  const singleProgress = isSingleTraveling
    ? (elapsedMs - STEP3_TIMELINE.singleEnvelopeExitMs) /
      (STEP3_TIMELINE.arriveFinalMs - STEP3_TIMELINE.singleEnvelopeExitMs)
    : elapsedMs >= STEP3_TIMELINE.arriveFinalMs
      ? 1
      : 0;

  // X do Envelope Único: vai de 615 (Signatário) até 800 (entrada Ponto 4)
  const singleX = 615 + Math.min(1, singleProgress) * (800 - 615);
  const singleY = 210;

  // Efeito de Aumento / Fade In (ao sair do Signatário) e Diminuição / Fade Out (ao chegar no Ponto 4):
  let singleScale = 1;
  let singleOpacity = 1;
  if (singleProgress < 0.25) {
    const p = singleProgress / 0.25;
    singleScale = 0.35 + 0.65 * p;
    singleOpacity = p;
  } else if (singleProgress > 0.75) {
    const p = Math.max(0, (1 - singleProgress) / 0.25);
    singleScale = 0.35 + 0.65 * p;
    singleOpacity = p;
  }

  // No Ponto 4, o envelope abre e dissolve (5600ms -> 5800ms)
  const singleIsOpen = elapsedMs >= STEP3_TIMELINE.arriveFinalMs;
  if (elapsedMs >= STEP3_TIMELINE.arriveFinalMs) {
    const dissolveP = Math.max(
      0,
      1 -
        (elapsedMs - STEP3_TIMELINE.arriveFinalMs) /
          (STEP3_TIMELINE.envelopeDissolveMs - STEP3_TIMELINE.arriveFinalMs)
    );
    singleOpacity = Math.min(singleOpacity, dissolveP);
  }

  // Contrato Assinado final no Ponto 4
  const isSigned =
    elapsedMs >= STEP3_TIMELINE.signedAppearMs &&
    elapsedMs < (STEP3_TIMELINE.signedAppearMs + STEP3_TIMELINE.readingPauseMs);

  const isFading =
    elapsedMs >= (STEP3_TIMELINE.signedAppearMs + STEP3_TIMELINE.readingPauseMs);

  return (
    <div
      className={clsx(
        "w-full max-w-5xl mx-auto overflow-x-auto pb-2 custom-scrollbar transition-opacity duration-500 py-1",
        isFading ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="min-w-[880px] lg:min-w-full h-[400px] sm:h-[420px] relative flex items-center justify-between px-3 select-none">
        {/* =================================================================== */}
        {/* CAMADA 0 (z-0): LINHA DASHED EM MOVIMENTO PASSANDO POR TODOS OS PONTOS */}
        {/* =================================================================== */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 1000 420"
          preserveAspectRatio="none"
        >
          {/* Rota Superior: Ponto 1 -> Download PDF -> Signatário */}
          <path
            d="M 195 210 C 245 210, 260 110, 320 110 L 490 110 C 545 110, 575 210, 615 210"
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth="2.2"
            strokeDasharray="6 6"
            style={{
              strokeDashoffset: -((elapsedMs / 25) % 24),
              opacity: 0.7,
            }}
          />

          {/* Rota Inferior: Ponto 1 -> ZapSign / Clicksign -> Signatário */}
          <path
            d="M 195 210 C 245 210, 260 310, 320 310 L 490 310 C 545 310, 575 210, 615 210"
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth="2.2"
            strokeDasharray="6 6"
            style={{
              strokeDashoffset: -((elapsedMs / 25) % 24),
              opacity: 0.7,
            }}
          />

          {/* Rota Final: Signatário -> Ponto 4 (Contrato Assinado) */}
          <path
            d="M 615 210 L 800 210"
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth="2.2"
            strokeDasharray="6 6"
            style={{
              strokeDashoffset: -((elapsedMs / 25) % 24),
              opacity: 0.7,
            }}
          />
        </svg>

        {/* =================================================================== */}
        {/* CAMADA 10 (z-10): ENVELOPES MÓVEIS (Cor do tema, sem descrições visíveis) */}
        {/* =================================================================== */}
        {/* 1. Envelope Superior (Caminho Download PDF): ativo de 1200ms até 3400ms */}
        {isTravelingTwo && (
          <div
            style={{
              left: `${(twoX / 1000) * 100}%`,
              top: `${(twoYSup / 420) * 100}%`,
              transform: `translate(-50%, -50%) scale(${twoScale})`,
              opacity: twoOpacity,
            }}
            className="absolute z-10 pointer-events-none transition-transform duration-75"
          >
            <div className="relative flex flex-col items-center select-none filter drop-shadow-sm">
              <div className="relative w-11 sm:w-12 h-7 sm:h-8 bg-[var(--accent-surface)] border-1.5 border-[var(--accent-primary)] rounded shadow-xs overflow-hidden flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full text-[var(--accent-primary)] stroke-current fill-none" viewBox="0 0 56 36">
                  <path d="M 0 0 L 28 18 L 56 0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 0 36 L 20 18" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 56 36 L 36 18" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="sr-only">Via 1: PDF</span>
            </div>
          </div>
        )}

        {/* 2. Envelope Inferior (Caminho ZapSign / Clicksign): ativo de 1200ms até 3400ms */}
        {isTravelingTwo && (
          <div
            style={{
              left: `${(twoX / 1000) * 100}%`,
              top: `${(twoYInf / 420) * 100}%`,
              transform: `translate(-50%, -50%) scale(${twoScale})`,
              opacity: twoOpacity,
            }}
            className="absolute z-10 pointer-events-none transition-transform duration-75"
          >
            <div className="relative flex flex-col items-center select-none filter drop-shadow-sm">
              <div className="relative w-11 sm:w-12 h-7 sm:h-8 bg-[var(--accent-surface)] border-1.5 border-[var(--accent-primary)] rounded shadow-xs overflow-hidden flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full text-[var(--accent-primary)] stroke-current fill-none" viewBox="0 0 56 36">
                  <path d="M 0 0 L 28 18 L 56 0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 0 36 L 20 18" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 56 36 L 36 18" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="sr-only">Via 2: Digital</span>
            </div>
          </div>
        )}

        {/* 3. Envelope Único (Sai de trás do Signatário rumo ao Ponto 4): ativo de 4900ms até 5800ms */}
        {isSingleTraveling && (
          <div
            style={{
              left: `${(singleX / 1000) * 100}%`,
              top: `${(singleY / 420) * 100}%`,
              transform: `translate(-50%, -50%) scale(${singleScale})`,
              opacity: singleOpacity,
            }}
            className="absolute z-10 pointer-events-none transition-all duration-75"
          >
            <div className="relative flex flex-col items-center select-none filter drop-shadow-md">
              <div className="relative w-12 sm:w-13 h-7.5 sm:h-8.5 bg-[var(--accent-surface)] border-1.5 border-[var(--accent-primary)] rounded shadow-sm overflow-hidden flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full text-[var(--accent-primary)] stroke-current fill-none" viewBox="0 0 56 36">
                  {singleIsOpen ? (
                    <path d="M 0 16 L 28 0 L 56 16" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  ) : (
                    <path d="M 0 0 L 28 18 L 56 0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                  <path d="M 0 36 L 20 18" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 56 36 L 36 18" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PONTO 1 (z-20): CONTRATO INICIAL -> DESLIZA PRA BAIXO E SOME -> FICA PONTILHADO */}
        {/* =================================================================== */}
        <div className="relative z-20 w-[205px] sm:w-[215px] h-[315px] sm:h-[325px] flex items-center justify-center">
          {/* Base com contorno pontilhado e fundo clarinho no tom do tema (sem opacidade) */}
          <div className="absolute inset-0 w-full h-full rounded-md border-2 border-dashed border-[var(--accent-primary)]/40 bg-[var(--accent-surface)] select-none flex items-center justify-center shadow-xs">
            <span className="sr-only">
              {elapsedMs < STEP3_TIMELINE.contractDepartMs
                ? "Contrato gerado"
                : elapsedMs < STEP3_TIMELINE.travelCaminhosStartMs
                  ? "Envelopando contrato..."
                  : "Duplicando em 2 vias..."}
            </span>
          </div>

          {/* O Contrato inicial (desliza para baixo e some com o inverso de surgir para cima) */}
          {!isContractGone && (
            <div
              className={clsx(
                "relative z-10 w-full h-full rounded-md border border-gray-200 bg-white p-3 shadow-md flex flex-col justify-between text-left select-none overflow-hidden transition-all duration-400 ease-in",
                isContractDeparting ? "opacity-0 translate-y-3 pointer-events-none" : "opacity-100 translate-y-0"
              )}
            >
              <div>
                {/* Cabeçalho limpo com a rubrica oficial Tratto no canto superior direito */}
                <div className="flex items-center justify-between pb-1.5 border-b border-gray-100 mb-1.5 select-none">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-semibold truncate text-gray-700">
                    contrato_123456
                  </span>
                  <div className="flex items-center gap-1 shrink-0" title="Plataforma Tratto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      className="h-4 w-4 text-gray-900 stroke-current fill-none"
                      role="img"
                      aria-label="Rubrica Tratto"
                    >
                      <g strokeLinecap="round" strokeLinejoin="round">
                        <path d="M 6 22 C 14 20, 26 17, 40 19 C 45 20, 48 21, 48 21" strokeWidth="4.2" />
                        <path d="M 31 11 C 30 19, 24 31, 18 36 C 14 40, 15 44, 18 44 C 23 44, 28 37, 33 27 C 34 23, 35 17, 35 13" strokeWidth="3.6" />
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="text-center font-bold uppercase tracking-wider text-gray-900 pb-1 text-[11px] border-b border-gray-100 mb-1 flex items-center justify-center">
                  Contrato de Prestação de Serviços
                </div>

                <div className="space-y-1 text-[10px] sm:text-[11px] text-gray-700 leading-relaxed font-sans">
                  <p>
                    CONTRATANTE{" "}
                    <span className="font-semibold text-gray-900 bg-gray-100 px-1 py-0.2 rounded">
                      João da Silva
                    </span>
                    , sob doc{" "}
                    <span className="font-mono text-[9px] text-gray-800 bg-gray-100 px-1 py-0.2 rounded">
                      12.345.678/0001-90
                    </span>
                    .
                  </p>

                  <p>
                    <strong>Cláusula 1ª:</strong> Serviço{" "}
                    <span className="font-semibold text-gray-900">Plano XYZ</span>, vigência{" "}
                    <span className="font-semibold text-gray-900">12 meses</span>.
                  </p>

                  <p>
                    <strong>Cláusula 2ª:</strong> Mensalidade de{" "}
                    <span className="font-semibold text-gray-900">R$ 1.200,00</span>.
                  </p>

                  <p>
                    <strong>Cláusula 3ª:</strong> Reajuste por{" "}
                    <span className="font-semibold text-gray-900">Índice Oficial (IPCA / Bacen)</span>.
                  </p>
                </div>
              </div>

              {/* Rodapé oficial inicial */}
              <div className="mt-auto pt-1.5 border-t border-gray-100 flex items-center justify-between text-[9px] font-mono text-gray-500">
                <span>Pronto para envio</span>
                <span>Via Original</span>
              </div>
            </div>
          )}
        </div>

        {/* =================================================================== */}
        {/* PONTO 2 (z-20): AS DUAS PLATAFORMAS (Ícones na cor do tema, centralizados no traço) */}
        {/* =================================================================== */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center select-none w-16 sm:w-20">
          {/* PLATAFORMA SUPERIOR: Download (Cor do tema, centralizado em Y = 110px do traço) */}
          <div
            style={{ top: "110px", transform: "translateY(-50%)" }}
            className={clsx(
              "absolute h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-white border shadow-xs flex items-center justify-center text-[var(--accent-primary)] transition-all duration-300 cursor-default",
              isBehindDownload ? "border-[var(--accent-primary)] ring-3 ring-[var(--accent-primary)]/20 scale-[1.06]" : "border-[var(--border-subtle)]"
            )}
            title="Download PDF"
          >
            <Download className="h-7 w-7 sm:h-8 sm:w-8 stroke-[2.2]" />
            <span className="sr-only">Download PDF</span>
          </div>

          {/* PLATAFORMA INFERIOR: ZapSign / Clicksign (Cor do tema, centralizado em Y = 310px do traço) */}
          <div
            style={{ top: "310px", transform: "translateY(-50%)" }}
            className={clsx(
              "absolute h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-white border shadow-xs flex items-center justify-center text-[var(--accent-primary)] transition-all duration-300 cursor-default",
              isBehindZapSign ? "border-[var(--accent-primary)] ring-3 ring-[var(--accent-primary)]/20 scale-[1.06]" : "border-[var(--border-subtle)]"
            )}
            title="ZapSign / Clicksign"
          >
            <Send className="h-7 w-7 sm:h-8 sm:w-8 stroke-[2.2]" />
            <span className="sr-only">ZapSign / Clicksign</span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* PONTO 3 (z-20): O SIGNATÁRIO (Borda dashed lenta, check ✓ na cor do tema antes de o envelope sair) */}
        {/* =================================================================== */}
        <div className="relative z-20 flex items-center justify-center select-none w-16 sm:w-20">
          <div className="relative flex items-center justify-center">
            {/* Borda tracejada (dashed) girando suavemente e lentamente em volta do ícone durante a assinatura */}
            {isSigning && (
              <div
                style={{ animation: "spin 5s linear infinite" }}
                className="absolute -inset-2 rounded-full border-2 border-dashed border-[var(--accent-primary)] pointer-events-none"
              />
            )}

            {/* O Círculo do Avatar exatamente no centro geométrico */}
            <div
              className={clsx(
                "flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 bg-white transition-all duration-300 shadow-sm relative",
                isSignatarioSigned
                  ? "text-[var(--accent-primary)] border-[var(--accent-primary)] ring-4 ring-[var(--accent-primary)]/20 shadow-md"
                  : isSigning
                    ? "text-[var(--accent-primary)] border-[var(--accent-primary)] scale-105"
                    : "text-[var(--accent-primary)] border-[var(--border-strong)]"
              )}
            >
              <User className="h-7 w-7 sm:h-8 sm:w-8" />
              {isSignatarioSigned && (
                <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-[var(--accent-primary)] text-white flex items-center justify-center text-[10px] shadow-xs">
                  ✓
                </span>
              )}
            </div>

            {/* Somente a palavra Signatário abaixo do ícone (sem nenhum status) */}
            <div className="absolute top-full mt-2 flex flex-col items-center whitespace-nowrap pointer-events-none">
              <span className="font-mono text-xs font-semibold text-[var(--text-main)]">
                Signatário
              </span>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* PONTO 4 (z-20): CAIXA COM FUNDO CLARINHO DO TEMA E PONTILHADO -> CONTRATO SURGE ASSINADO */}
        {/* =================================================================== */}
        <div className="relative z-20 w-[205px] sm:w-[215px] h-[315px] sm:h-[325px] flex items-center justify-center">
          {!isSigned ? (
            <div className="w-full h-full rounded-md border-2 border-dashed border-[var(--accent-primary)]/40 bg-[var(--accent-surface)] select-none transition-all flex items-center justify-center shadow-xs">
              <span className="sr-only">Aguardando Assinatura</span>
            </div>
          ) : (
            <div className="w-full h-full rounded-md border border-emerald-400 ring-2 ring-emerald-400/20 bg-white p-3 shadow-xl text-left select-none relative flex flex-col justify-between animate-metric-fade-in">
              <div>
                {/* Cabeçalho limpo com a rubrica oficial Tratto no canto superior direito */}
                <div className="flex items-center justify-between pb-1.5 border-b border-gray-100 mb-1.5 select-none">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-semibold truncate text-gray-700">
                    contrato_123456
                  </span>
                  <div className="flex items-center gap-1 shrink-0" title="Plataforma Tratto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      className="h-4 w-4 text-gray-900 stroke-current fill-none"
                      role="img"
                      aria-label="Rubrica Tratto"
                    >
                      <g strokeLinecap="round" strokeLinejoin="round">
                        <path d="M 6 22 C 14 20, 26 17, 40 19 C 45 20, 48 21, 48 21" strokeWidth="4.2" />
                        <path d="M 31 11 C 30 19, 24 31, 18 36 C 14 40, 15 44, 18 44 C 23 44, 28 37, 33 27 C 34 23, 35 17, 35 13" strokeWidth="3.6" />
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="text-center font-bold uppercase tracking-wider text-gray-900 pb-1 text-[11px] border-b border-gray-100 mb-1 flex items-center justify-center">
                  Contrato de Prestação de Serviços
                </div>

                <div className="space-y-1 text-[10px] sm:text-[11px] text-gray-700 leading-relaxed font-sans">
                  <p>
                    CONTRATANTE{" "}
                    <span className="font-semibold text-gray-900 bg-gray-100 px-1 py-0.2 rounded">
                      João da Silva
                    </span>
                    , sob doc{" "}
                    <span className="font-mono text-[9px] text-gray-800 bg-gray-100 px-1 py-0.2 rounded">
                      12.345.678/0001-90
                    </span>
                    .
                  </p>

                  <p>
                    <strong>Cláusula 1ª:</strong> Serviço{" "}
                    <span className="font-semibold text-gray-900">Plano XYZ</span>, vigência{" "}
                    <span className="font-semibold text-gray-900">12 meses</span>.
                  </p>

                  <p>
                    <strong>Cláusula 2ª:</strong> Mensalidade de{" "}
                    <span className="font-semibold text-gray-900">R$ 1.200,00</span>.
                  </p>

                  <p>
                    <strong>Cláusula 3ª:</strong> Reajuste por{" "}
                    <span className="font-semibold text-gray-900">Índice Oficial (IPCA / Bacen)</span>.
                  </p>
                </div>
              </div>

              {/* Carimbo ASSINADO na parte em branco inferior, mantendo a inclinação diagonal */}
              <div className="mt-auto my-auto flex items-center justify-center select-none py-1">
                <div className="rotate-[-12deg] rounded-lg border-2 border-dotted border-emerald-600 bg-emerald-50/95 backdrop-blur-xs px-3.5 py-1.5 flex items-center gap-1.5 shadow-md animate-metric-fade-in">
                  <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="font-mono text-sm font-black tracking-wider text-emerald-700 uppercase">
                    Assinado
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// ETAPA 4: LINHA DO TEMPO, ANIVERSÁRIO DO CONTRATO E REAJUSTE BACEN
// =========================================================================
function Step4TimelineAdjustment() {
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedMs((prev) => (prev >= 7000 ? 0 : prev + 50));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Fases cronológicas:
  // 0ms a 1400ms: vigência ativa, timeline avançando pelos 12 meses
  // 1400ms a 2000ms: marco 12 alcançado, data-base ativada, API Bacen consultada
  // 2000ms a 6500ms: reajuste aplicado (+4,50%), mensalidade R$ 1.254,00, renovado até 2026
  // 6500ms a 7000ms: reinício suave
  const isAtDatabase = elapsedMs >= 1400 && elapsedMs < 2000;
  const isAdjusted = elapsedMs >= 2000;

  // Progresso percentual da linha do tempo até 1400ms (0% a 100%)
  const progress = Math.min(100, Math.round((elapsedMs / 1400) * 100));

  // Mês exibido no contador de vigência:
  const currentMonthNumber = Math.min(12, Math.floor((elapsedMs / 1400) * 12) + 1);

  return (
    <div className="w-full h-full max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 select-none py-2 px-2 overflow-hidden">
      {/* =================================================================== */}
      {/* 1. O CONTRATO (Lado Esquerdo / Centro) */}
      {/* =================================================================== */}
      <div className="relative w-[235px] sm:w-[265px] h-[330px] sm:h-[355px] rounded-md border border-gray-200 bg-white p-3.5 shadow-md flex flex-col justify-between text-left shrink-0 transition-all duration-300">
        <div>
          {/* Cabeçalho limpo com a rubrica oficial Tratto no canto superior direito */}
          <div className="flex items-center justify-between pb-1.5 border-b border-gray-100 mb-1.5 select-none">
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold truncate text-gray-700">
              contrato_123456
            </span>
            <div className="flex items-center gap-1 shrink-0" title="Plataforma Tratto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                className="h-4 w-4 text-gray-900 stroke-current fill-none"
                role="img"
                aria-label="Rubrica Tratto"
              >
                <g strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 6 22 C 14 20, 26 17, 40 19 C 45 20, 48 21, 48 21" strokeWidth="4.2" />
                  <path d="M 31 11 C 30 19, 24 31, 18 36 C 14 40, 15 44, 18 44 C 23 44, 28 37, 33 27 C 34 23, 35 17, 35 13" strokeWidth="3.6" />
                </g>
              </svg>
            </div>
          </div>

          <div className="text-center font-bold uppercase tracking-wider text-gray-900 pb-1 text-[11px] border-b border-gray-100 mb-1.5">
            Contrato de Prestação de Serviços
          </div>

          <div className="space-y-1.5 text-[10px] sm:text-[11px] text-gray-700 leading-relaxed font-sans">
            <p>
              CONTRATANTE{" "}
              <span className="font-semibold text-gray-900 bg-gray-100 px-1 py-0.2 rounded">
                João da Silva
              </span>
              , sob doc{" "}
              <span className="font-mono text-[9px] text-gray-800 bg-gray-100 px-1 py-0.2 rounded">
                12.345.678/0001-90
              </span>
              .
            </p>

            <p>
              <strong>Cláusula 1ª:</strong> Serviço{" "}
              <span className="font-semibold text-gray-900">Plano XYZ</span>, vigência{" "}
              <span className="font-semibold text-gray-900">12 meses</span>.
            </p>

            <p className="transition-all duration-300">
              <strong>Cláusula 2ª:</strong> Mensalidade de{" "}
              {isAdjusted ? (
                <span className="inline-flex items-center gap-1 font-mono">
                  <span className="line-through text-gray-400 text-[10px]">R$ 1.200,00</span>
                  <span className="font-bold text-[var(--accent-primary)] bg-[var(--accent-surface)] px-1 rounded shadow-2xs">
                    R$ 1.254,00
                  </span>
                </span>
              ) : (
                <span className="font-mono font-semibold text-gray-900">R$ 1.200,00</span>
              )}
              .
            </p>

            <p>
              <strong>Cláusula 3ª:</strong> Reajuste por{" "}
              <span className="font-semibold text-gray-900">Índice Oficial (IPCA / Bacen)</span>.
            </p>
          </div>
        </div>

        {/* Rodapé com badge reativa de vigência */}
        <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between text-[10px]">
          <span className="font-mono text-[9px] text-gray-500">
            {isAdjusted ? "Ano 2 (2025/2026)" : "Ano 1 (2024/2025)"}
          </span>
          <span
            className={clsx(
              "font-mono text-[9px] font-bold px-2 py-0.5 rounded transition-all duration-300",
              isAdjusted
                ? "bg-[var(--accent-surface)] text-[var(--accent-primary)] border border-[var(--border-strong)]"
                : isAtDatabase
                  ? "bg-amber-100 text-amber-800 border border-amber-300 animate-pulse"
                  : "bg-gray-100 text-gray-700"
            )}
          >
            {isAdjusted ? "Valor atualizado ✓" : isAtDatabase ? "Data-base de Reajuste" : "Vigência Ativa"}
          </span>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. PAINÉIS DE AUTOMAÇÃO (Lado Direito) */}
      {/* =================================================================== */}
      <div className="flex flex-col gap-3.5 w-full max-w-[330px] sm:max-w-[360px] shrink-0">
        {/* Painel da Linha do Tempo de Vigência */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-xs text-left">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-1.5 text-[var(--text-main)] font-semibold font-sans">
              <Clock className="h-4 w-4 text-[var(--accent-primary)]" />
              <span>Ciclo Anual de Vigência</span>
            </div>
            <span className="font-mono text-[11px] text-[var(--text-muted)] font-medium">
              {isAdjusted ? "Ciclo renovado" : `Mês ${currentMonthNumber} de 12`}
            </span>
          </div>

          {/* Barra horizontal com progresso e 3 marcos */}
          <div className="mt-4 relative">
            {/* Trilho base */}
            <div className="h-2 w-full rounded-full bg-[var(--border-subtle)] overflow-hidden">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-[var(--accent-primary)] rounded-full transition-all duration-100 ease-linear"
              />
            </div>

            {/* 3 Marcos da Timeline */}
            <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
              <div className="flex flex-col items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--accent-primary)] border-2 border-white shadow-2xs" />
                <span className="mt-1 font-semibold text-[var(--text-main)]">Mês 1</span>
                <span className="text-[9px] text-[var(--text-muted)]">Início</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={clsx(
                    "h-2.5 w-2.5 rounded-full border-2 border-white shadow-2xs transition-colors",
                    progress >= 50 ? "bg-[var(--accent-primary)]" : "bg-gray-300"
                  )}
                />
                <span className="mt-1 font-semibold text-[var(--text-main)]">Mês 6</span>
                <span className="text-[9px] text-[var(--text-muted)]">Semestre</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={clsx(
                    "h-3 w-3 rounded-full border-2 border-white shadow-2xs transition-all",
                    progress >= 100
                      ? "bg-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/30 scale-125"
                      : "bg-gray-300"
                  )}
                />
                <span className="mt-1 font-semibold text-[var(--text-main)]">Mês 12</span>
                <span className="text-[9px] text-[var(--accent-primary)] font-bold">Aniversário</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card da Consulta Oficial ao Banco Central (SGS) */}
        <div
          className={clsx(
            "rounded-xl border transition-all duration-500 p-4 text-left shadow-xs",
            isAtDatabase || isAdjusted
              ? "border-[var(--border-strong)] bg-[var(--accent-surface)] opacity-100 scale-100"
              : "border-[var(--border-subtle)] bg-[var(--bg-card)] opacity-40 scale-98 pointer-events-none"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent-primary)] text-white shrink-0">
                <Landmark className="h-3.5 w-3.5" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold text-[var(--text-main)] leading-tight">
                  Banco Central do Brasil
                </h4>
                <p className="font-mono text-[10px] text-[var(--text-muted)]">
                  API SGS · Série 433 (IPCA Oficial)
                </p>
              </div>
            </div>

            <span className="font-mono text-xs font-bold text-[var(--accent-primary)] bg-white px-2 py-0.5 rounded shadow-2xs border border-[var(--border-subtle)]">
              +4,50%
            </span>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
            <span>Piso de deflação zero (Lei 10.192/2001)</span>
            <span className="font-semibold text-[var(--accent-primary)]">Automático ✓</span>
          </div>
        </div>

        {/* Notificação Flutuante de Envio & AuditLog */}
        <div
          className={clsx(
            "rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2.5 text-left text-xs transition-all duration-400 flex items-center gap-2.5 shadow-2xs",
            isAdjusted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
          )}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-surface)] text-[var(--accent-primary)] shrink-0">
            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-sans text-[11px] font-semibold text-[var(--text-main)] truncate">
              Demonstrativo de cálculo enviado por e-mail
            </p>
            <p className="font-mono text-[9px] text-[var(--text-muted)] truncate">
              AuditLog #8491: Reajuste anual aplicado por índice Bacen
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
