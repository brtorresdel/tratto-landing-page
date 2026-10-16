import React from "react";

interface TrattoWordmarkProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function TrattoWordmark({
  className = "inline-block h-9 w-auto sm:h-14 lg:h-16",
  width = 170,
  height = 50,
}: TrattoWordmarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 170 50"
      width={width}
      height={height}
      fill="none"
      role="img"
      aria-label="Tratto"
      className={className}
    >
      {/* Tipografia Oficial Tratto (Logotipo Puro) */}
      <g fill="var(--text-main, #0E1210)">
        {/* t inicial */}
        <path d="M 12 11 V 18 H 6 V 23 H 12 V 36 C 12 39 14 41 17.5 41 C 19 41 20.5 40.5 21 40 V 35 C 20.5 35.2 20 35.3 19.2 35.3 C 18 35.3 17.5 34.6 17.5 33.5 V 23 H 22 V 18 H 17.5 V 11 H 12 Z" />

        {/* r */}
        <path d="M 26 18 H 31.5 V 22 C 33 19.5 36 18 39 18 C 40.5 18 41.5 18.3 42 18.6 V 24 C 41 23.5 39.8 23.2 38.5 23.2 C 35 23.2 32 25.5 32 30 V 41 H 26 V 18 Z" />

        {/* a (calibrado) */}
        <path d="M 53 17.8 C 48.5 17.8 45 20.5 43.5 23.5 L 48 25.5 C 49 24 50.5 23 53 23 C 55.5 23 57 24.2 57 26.5 V 27 L 51 27.5 C 45 28 42 31 42 35 C 42 39 45 41.5 49.5 41.5 C 53 41.5 56 40 57.5 37.5 V 41 H 63 V 27 C 63 21 59 17.8 53 17.8 Z M 52 37 C 49.5 37 47.5 35.8 47.5 33.5 C 47.5 31.2 49.5 30.2 52.5 30 L 57 29.8 V 32 C 57 35 55 37 52 37 Z" />

        {/* tt com ponte unificada */}
        <path d="M 72 11 V 36 C 72 39 74 41 77.5 41 C 79 41 80.5 40.5 81 40 V 35 C 80.5 35.2 80 35.3 79.2 35.3 C 78 35.3 77.5 34.6 77.5 33.5 V 23 H 86 V 36 C 86 39 88 41 91.5 41 C 93 41 94.5 40.5 95 40 V 35 C 94.5 35.2 94 35.3 93.2 35.3 C 92 35.3 91.5 34.6 91.5 33.5 V 23 H 98 V 18 H 91.5 V 11 H 86 V 18 H 77.5 V 11 H 72 Z" />
        <rect x="66" y="18" width="33" height="5" rx="2" fill="var(--text-main, #0E1210)" />

        {/* o (aproximado) */}
        <path d="M 110 17.8 C 102 17.8 96 23.5 96 30 C 96 36.5 102 41.8 110 41.8 C 118 41.8 124 36.5 124 30 C 124 23.5 118 17.8 110 17.8 Z M 110 36.5 C 105.5 36.5 102 33.5 102 30 C 102 26.5 105.5 23.2 110 23.2 C 114.5 23.2 118 26.5 118 30 C 118 33.5 114.5 36.5 110 36.5 Z" />
      </g>

      {/* Ponto de selo no final com cor reativa ao tema ativo */}
      <circle
        cx="138"
        cy="39"
        r="3"
        fill="var(--accent-primary, #24523B)"
        className="transition-colors duration-300"
      />
    </svg>
  );
}
