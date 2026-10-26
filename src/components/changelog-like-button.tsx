'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { Heart } from 'lucide-react';
import { toggleChangelogLikeAction } from '@/app/actions/changelog';

interface ChangelogLikeButtonProps {
  date: string;
  initialCount?: number;
  className?: string;
  onToggleLike?: (
    date: string,
    visitorId: string
  ) => Promise<{ success: boolean; liked: boolean; count: number }>;
}

export function ChangelogLikeButton({
  date,
  initialCount = 0,
  className = '',
  onToggleLike,
}: ChangelogLikeButtonProps) {
  const [liked, setLiked] = useState<boolean>(false);
  const [count, setCount] = useState<number>(initialCount);
  const [isBouncing, setIsBouncing] = useState<boolean>(false);
  const [, startTransition] = useTransition();

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

    // Atualização otimista imediata na interface
    setLiked(nextLiked);
    setCount(nextCount);

    let visitorId = '';
    try {
      localStorage.setItem(`tratto_liked_${date}`, nextLiked ? 'true' : 'false');

      // Garante existência de um visitor_id pseudo-anônimo
      let storedId = localStorage.getItem('tratto_visitor_id');
      if (!storedId) {
        storedId =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `visitor-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem('tratto_visitor_id', storedId);
      }
      visitorId = storedId;
    } catch {
      visitorId = `temp-${Date.now()}`;
    }

    // Persistência em background no Supabase via Server Action
    startTransition(async () => {
      try {
        const toggleFn = onToggleLike || toggleChangelogLikeAction;
        const res = await toggleFn(date, visitorId);
        if (res.success) {
          setCount(res.count);
          setLiked(res.liked);
          try {
            localStorage.setItem(`tratto_liked_${date}`, res.liked ? 'true' : 'false');
          } catch {
            // Ignora
          }
        }
      } catch {
        // Fallback gracioso: mantém o estado otimista no cliente
      }
    });
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
