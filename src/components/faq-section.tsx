"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Preciso trocar meus modelos de contrato em .docx por outro formato?",
      answer:
        "Não. Você continua usando exatamente os arquivos do Word que sua empresa já possui. Basta adicionar os marcadores entre chaves duplas, como {{cliente_nome}} ou {{valor_mensal}}. A Tratto processa o .docx preservando 100% da sua tipografia, logotipos, cabeçalhos e formatações originais.",
    },
    {
      question: "A Tratto é uma plataforma de assinatura eletrônica própria?",
      answer:
        "Não somos uma certificadora própria. A Tratto se integra via API com as plataformas líderes do mercado brasileiro (ZapSign e Clicksign) no modelo BYOT (Bring Your Own Token), onde você informa sua chave e os custos ocorrem na sua conta sem margem extra nossa. Além disso, você sempre pode utilizar o modo manual com upload da via física assinada e escaneada.",
    },
    {
      question: "Como funciona o cálculo de reajuste por inflação?",
      answer:
        "A Tratto conecta-se diretamente à API pública oficial do Banco Central (SGS) para obter as séries temporais dos índices oficiais (IPCA, IGP-M e INPC). O sistema aplica a fórmula de cálculo composto exato no mês de aniversário do contrato, com piso zero obrigatório em caso de deflação (em conformidade com a Lei 10.192/2001).",
    },
    {
      question: "Quanto vai custar a Tratto quando for lançada?",
      answer:
        "A Tratto está atualmente em fase de pré-lançamento e validação. O produto terá planos acessíveis pensados para a realidade de PMEs brasileiras, muito abaixo do custo de ERPs complexos. Quem entrar na lista de espera terá acesso antecipado prioritário e condições fundadoras permanentes.",
    },
    {
      question: "Quando os convites da lista de espera serão liberados?",
      answer:
        "O desenvolvimento da Tratto está acontecendo em ritmo acelerado e com arquitetura validada. Os primeiros lotes de convites serão liberados em ondas graduais nas próximas semanas para os inscritos da lista de espera que participarem da validação.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="pt-14 sm:pt-18 pb-20 sm:pb-28 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-4 sm:px-8 text-center">
        {/* Título Principal */}
        <h2 className="font-serif text-3xl sm:text-5xl italic font-semibold text-[var(--text-main)] leading-tight tracking-tight">
          Perguntas & Respostas
        </h2>

        {/* Subtítulo */}
        <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          A Tratto ainda está na fase inicial de desenvolvimento, mas tem algumas perguntas que já posso adiantar aqui pra vocês:
        </p>

        {/* Lista Unificada do FAQ estilo Framer (com divisórias limpas e sem cards isolados) */}
        <div className="mt-12 sm:mt-16 divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)] text-left">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-answer-${index}`;
            return (
              <div key={faq.question} className="transition-colors duration-200">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between gap-6 py-5 sm:py-6 text-left cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] rounded-lg"
                >
                  <span
                    className={clsx(
                      "font-sans text-base sm:text-lg font-medium tracking-tight transition-colors duration-200",
                      isOpen
                        ? "text-[var(--accent-primary)]"
                        : "text-[var(--text-main)] group-hover:text-[var(--accent-primary)]"
                    )}
                  >
                    {faq.question}
                  </span>

                  {/* Setinha sem background, mais grossinha e com a cor do tema */}
                  <ChevronDown
                    className={clsx(
                      "h-5 w-5 shrink-0 text-[var(--accent-primary)] transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isOpen ? "rotate-180" : "rotate-0"
                    )}
                    strokeWidth={2.6}
                    aria-hidden="true"
                  />
                </button>

                {/* Resposta com animação suave de abertura e fechamento em Bézier (grid-template-rows) */}
                <div
                  id={contentId}
                  role="region"
                  className={clsx(
                    "grid transition-[grid-template-rows,opacity] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 sm:pb-7 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-3xl pr-6 sm:pr-10">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
