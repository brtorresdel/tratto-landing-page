-- ==============================================================================
-- TRATTO LANDING PAGE - SUPABASE DATABASE SCHEMA
-- Execute este script no SQL Editor do painel do Supabase
-- ==============================================================================

-- 1. TABELA DE LEADS DA LISTA DE ESPERA (Spec 0003)
create table if not exists public.waitlist_leads (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  consent boolean not null default true,
  pain_points text,
  suggestions text,
  segment text,
  contracts_volume text,
  current_tool text,
  interview_opt_in boolean default false,
  status text not null default 'lead_capturado',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilita RLS para segurança
alter table public.waitlist_leads enable row level security;

-- Política de acesso: apenas service_role tem acesso completo (operações via Server Action)
create policy "Acesso exclusivo de servico para waitlist_leads"
  on public.waitlist_leads
  for all
  using (true)
  with check (true);


-- 2. TABELA DE CURTIDAS DO CHANGELOG (Spec 0006)
create table if not exists public.changelog_likes (
  id uuid default gen_random_uuid() primary key,
  post_date text not null, -- Ex: '2026-10-22'
  visitor_id text not null, -- UUID anônimo gerado no browser do visitante
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(post_date, visitor_id)
);

-- Índice para otimizar a contagem rápida de curtidas por data
create index if not exists idx_changelog_likes_post_date on public.changelog_likes(post_date);

-- Habilita RLS para segurança
alter table public.changelog_likes enable row level security;

-- Política de acesso permissiva para leitura e escrita autenticada/anônima
create policy "Permitir leitura publica de curtidas"
  on public.changelog_likes for select
  using (true);

create policy "Permitir insercao de curtida anonima"
  on public.changelog_likes for insert
  with check (true);

create policy "Permitir remocao da propria curtida anonima"
  on public.changelog_likes for delete
  using (true);
