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
        "Não! Você pode utilizar os arquivos de modelos que a sua empresa já possui; basta somente posicionar os marcadores entre chaves duplas, como {{cliente_nome}} ou {{valor_mensal}}. A Tratto processa o seu documento preservando 100% da sua tipografia, logotipos, cabeçalhos e formatações originais.",
    },
    {
      question: "A Tratto é uma plataforma de assinatura eletrônica própria?",
      answer:
        "Não. A Tratto é apenas um lugar para gerar e gerenciar seus contratos. Entretanto, teremos integração com as plataformas de assinatura mais utilizadas do mercado (inicialmente com a ZapSign e a Clicksign, que já permitem essa integração) no modelo BYOT (Bring Your Own Token). E fique tranquilo: teremos manuais para ajudar a fazer essa integração acontecer, de forma simples e rápida. E claro, você sempre terá a opção de usar o modo manual, pra baixar a via física e depois subir a via assinada para a plataforma.",
    },
    {
      question: "Como funciona o cálculo de reajuste?",
      answer:
        "Você poderá utilizar uma integração para calcular com base em índices oficiais (de forma gratuita — o Banco Central fornece esses dados abertamente para todos) ou também poderá configurar suas porcentagens de ajuste personalizadas. E também poderá configurar para não ter nenhum reajuste, se o contrato for temporário ou sobre um produto ou serviço com tempo determinado e sem renovação.",
    },
    {
      question: "Preciso instalar algum aplicativo ou programa no meu computador?",
      answer:
        "Não! A Tratto roda 100% no seu navegador e na nuvem. Você só precisa acessar com o seu login para criar, aprovar e acompanhar seus contratos de qualquer lugar, seja no computador, tablet ou celular.",
    },
    {
      question: "Já tem uma data de lançamento?",
      answer:
        "A Tratto ainda está na sua fase inicial de desenvolvimento. Atualmente estou conciliando seu desenvolvimento ao meu trabalho, já que sou o único desenvolvedor dela, e não estou recebendo nada por isso. Mas vou manter uma janela constante de atualizações quanto ao seu desenvolvimento, e assim que tivermos uma data, eu anuncio nas minhas redes sociais, pode me acompanhar por lá (links no rodapé dessa página).",
    },
    {
      question: "E quanto vai custar uma assinatura da Tratto?",
      answer:
        "Por enquanto ainda não tenho valores exatos, mas posso garantir que a plataforma será acessível e pensada para a realidade das PMEs brasileiras, bem abaixo do custo de outros ERPs complexos. E você terá condições exclusivas se participar da lista de espera e da pesquisa de mercado!",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="scroll-mt-20 sm:scroll-mt-24 pt-14 sm:pt-18 pb-20 sm:pb-28 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] transition-colors duration-300">
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
                  className="flex w-full items-center justify-between gap-6 py-5 sm:py-6 text-left cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] rounded-lg touch-manipulation select-none"
                >
                  <span
                    className={clsx(
                      "font-sans text-base sm:text-lg font-medium tracking-tight transition-colors duration-200",
                      isOpen
                        ? "text-[var(--accent-primary)]"
                        : "text-[var(--text-main)] md:group-hover:text-[var(--accent-primary)]"
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
