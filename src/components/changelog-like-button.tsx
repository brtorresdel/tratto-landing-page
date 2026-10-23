'use client';

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface ChangelogLikeButtonProps {
  date: string;
  initialCount?: number;
  className?: string;
}

export function ChangelogLikeButton({
  date,
  initialCount = 0,
  className = '',
}: ChangelogLikeButtonProps) {
  const [liked, setLiked] = useState<boolean>(false);
  const [count, setCount] = useState<number>(initialCount);
  const [isBouncing, setIsBouncing] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`tratto_liked_${date}`);
      if (stored === 'true') {
        setLiked(true);
      }
    } catch {
      // localStorage indisponível ou em modo privado restrito
    }
  }, [date]);

  const handleToggle = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 300);

    const nextLiked = !liked;
    const nextCount = nextLiked ? count + 1 : Math.max(0, count - 1);

    setLiked(nextLiked);
    setCount(nextCount);

    try {
      localStorage.setItem(`tratto_liked_${date}`, nextLiked ? 'true' : 'false');

      // Garante existência de um visitor_id pseudo-anônimo
      if (!localStorage.getItem('tratto_visitor_id')) {
        const randomId =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `visitor-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem('tratto_visitor_id', randomId);
      }
    } catch {
      // Ignora erro de storage
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Curtir esta publicação (${count} curtidas)`}
      aria-pressed={liked}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2 ${
        liked
          ? 'border-[var(--accent-primary)] bg-[var(--accent-surface)] text-[var(--accent-primary)] shadow-sm'
          : 'border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-main)]'
      } ${className}`}
    >
      <Heart
        className={`h-4 w-4 transition-transform duration-200 ${
          isBouncing ? 'scale-125' : 'scale-100'
        } ${liked ? 'fill-[var(--accent-primary)] text-[var(--accent-primary)]' : 'text-current'}`}
      />
      <span>{count}</span>
      <span className="sr-only">curtidas</span>
    </button>
  );
}
