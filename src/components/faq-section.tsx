"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Preciso trocar meus modelos de contrato em .docx por outro formato?",
      answer:
        "Não. Você continua usando exatamente os arquivos do Word que sua empresa já possui. Basta adicionar os marcadores entre chaves duplas, como {{cliente_nome}} ou {{valor_mensal}}. O Tratto processa o .docx preservando 100% da sua tipografia, logotipos, cabeçalhos e formatações originais.",
    },
    {
      question: "O Tratto é uma plataforma de assinatura eletrônica própria?",
      answer:
        "Não somos uma certificadora própria. O Tratto se integra via API com as plataformas líderes do mercado brasileiro (ZapSign e Clicksign) no modelo BYOT (Bring Your Own Token), onde você informa sua chave e os custos ocorrem na sua conta sem margem extra nossa. Além disso, você sempre pode utilizar o modo manual com upload da via física assinada e escaneada.",
    },
    {
      question: "Como funciona o cálculo de reajuste por inflação?",
      answer:
        "O Tratto conecta-se diretamente à API pública oficial do Banco Central (SGS) para obter as séries temporais dos índices oficiais (IPCA, IGP-M e INPC). O sistema aplica a fórmula de cálculo composto exato no mês de aniversário do contrato, com piso zero obrigatório em caso de deflação (em conformidade com a Lei 10.192/2001).",
    },
    {
      question: "Quanto vai custar o Tratto quando for lançado?",
      answer:
        "O Tratto está atualmente em fase de pré-lançamento e validação. O produto terá planos acessíveis pensados para a realidade de PMEs brasileiras, muito abaixo do custo de ERPs complexos. Quem entrar na lista de espera terá acesso antecipado prioritário e condições fundadoras permanentes.",
    },
    {
      question: "Quando os convites da lista de espera serão liberados?",
      answer:
        "O desenvolvimento do Tratto está acontecendo em ritmo acelerado e com arquitetura validada. Os primeiros lotes de convites serão liberados em ondas graduais nas próximas semanas para os inscritos da lista de espera que participarem da validação.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-4 sm:px-8 text-center">
        {/* Eyebrow / Chapéu Editorial */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] shadow-2xs">
          <span>●</span>
          <span>Perguntas Frequentes</span>
        </div>

        {/* Título Principal */}
        <h2 className="mt-5 font-serif text-3xl sm:text-5xl italic font-semibold text-[var(--text-main)] leading-tight tracking-tight">
          Respostas claras para quem quer entender como o Tratto funciona
        </h2>

        {/* Subtítulo */}
        <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          Tudo o que você precisa saber sobre o pré-lançamento, modelos de contrato, validade jurídica e funcionamento.
        </p>

        {/* Lista Accordion do FAQ */}
        <div className="mt-12 space-y-4 text-left">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-answer-${index}`;
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors hover:bg-black/[0.015] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                >
                  <span className="font-sans text-base sm:text-lg font-semibold text-[var(--text-main)] tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-surface)] text-[var(--accent-primary)] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    className="border-t border-[var(--border-subtle)]/60 px-5 pt-3.5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed bg-[var(--accent-surface)]/20"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
