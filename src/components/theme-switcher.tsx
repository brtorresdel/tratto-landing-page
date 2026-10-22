"use client";

import React, { useEffect, useRef, useState } from "react";
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";

export type ThemeId = "sage" | "butter" | "apricot" | "coral" | "sky";

interface ThemeOption {
  id: ThemeId;
  name: string;
  color: string;
  bgHex: string;
}

export const THEMES: ThemeOption[] = [
  { id: "sage", name: "Sálvia", color: "#24523B", bgHex: "#EBF2ED" },
  { id: "butter", name: "Manteiga", color: "#755B13", bgHex: "#FAF8ED" },
  { id: "apricot", name: "Pêssego", color: "#8E4924", bgHex: "#FAF3EC" },
  { id: "coral", name: "Coral", color: "#8A3340", bgHex: "#FAF0F2" },
  { id: "sky", name: "Céu", color: "#22517E", bgHex: "#F0F5FA" },
];

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>("sage");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("tratto-theme") as ThemeId | null;
    if (saved && THEMES.some((t) => t.id === saved)) {
      setCurrentTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  // Fechar ao clicar fora ou apertar Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectTheme = (themeId: ThemeId) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    try {
      localStorage.setItem("tratto-theme", themeId);
    } catch {
      // localStorage pode estar bloqueado em alguns navegadores
    }
  };

  return (
    <aside
      ref={containerRef}
      aria-label="Seletor de temas pastéis"
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end"
    >
      {/* Menu Vertical de Opções de Cores Acima do Botão */}
      <div
        className={cn(
          "mb-3 flex flex-col items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-white/95 p-2 shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 ease-out origin-bottom",
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-3 scale-95 pointer-events-none"
        )}
      >
        {THEMES.map((theme) => {
          const isActive = currentTheme === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => handleSelectTheme(theme.id)}
              aria-label={`Tema ${theme.name}`}
              title={`Tema ${theme.name}`}
              className={cn(
                "relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-transform active:scale-90 hover:scale-110",
                isActive
                  ? "ring-2 ring-offset-2 ring-[var(--accent-primary)] scale-105 shadow-xs"
                  : "opacity-85 hover:opacity-100"
              )}
              style={{ backgroundColor: theme.bgHex }}
            >
              <span
                className="h-3.5 w-3.5 rounded-full transition-colors duration-300"
                style={{ backgroundColor: theme.color }}
              />
            </button>
          );
        })}
      </div>

      {/* Botão Principal de Ativação com Ícone de Paleta de Cores */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Alternar paleta de temas"
        aria-expanded={isOpen}
        title="Alternar paleta de temas"
        className={cn(
          "group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[var(--border-subtle)] bg-white/95 shadow-[0_4px_24px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_6px_28px_rgba(0,0,0,0.14)]",
          isOpen && "ring-2 ring-offset-2 ring-[var(--accent-primary)] bg-[var(--accent-surface)]"
        )}
      >
        <Palette className="h-5 w-5 text-[var(--accent-primary)] transition-transform duration-300 group-hover:rotate-12" />
      </button>
    </aside>
  );
}
