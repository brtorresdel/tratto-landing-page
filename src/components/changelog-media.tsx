import React from 'react';

interface ChangelogMediaProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export function ChangelogMedia({
  src,
  alt,
  caption,
  className = '',
}: ChangelogMediaProps) {
  return (
    <figure
      className={`my-6 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xs transition-colors duration-300 ${className}`}
    >
      <div className="flex items-center justify-center p-4 sm:p-6 bg-[var(--bg-canvas)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="max-h-[420px] w-auto max-w-full rounded-lg object-contain transition-transform duration-300 hover:scale-[1.01]"
        />
      </div>
      {caption && (
        <figcaption className="border-t border-[var(--border-subtle)] px-4 py-2.5 text-center font-serif text-xs italic text-[var(--text-muted)] sm:text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
