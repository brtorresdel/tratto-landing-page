"use client";

import React, { useEffect, useState } from "react";
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("tratto-theme") as ThemeId | null;
    if (saved && THEMES.some((t) => t.id === saved)) {
      setCurrentTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

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
      aria-label="Seletor de temas pastéis"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-white/90 p-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all hover:bg-white"
    >
      <span className="pl-2 pr-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] hidden sm:inline">
        Tema
      </span>

      <div className="flex items-center gap-1">
        {THEMES.map((theme) => {
          const isActive = currentTheme === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => handleSelectTheme(theme.id)}
              aria-label={`Tema ${theme.name}`}
              title={`Tema ${theme.name} (${theme.bgHex})`}
              className={cn(
                "relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-transform active:scale-95",
                isActive ? "ring-2 ring-offset-1 ring-[var(--accent-primary)] scale-110" : "opacity-80 hover:opacity-100"
              )}
              style={{ backgroundColor: theme.bgHex }}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: theme.color }}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
