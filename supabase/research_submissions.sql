-- Run this in the Supabase SQL Editor to create the table for research form submissions.
-- Dashboard: https://app.supabase.com → your project → SQL Editor

create table if not exists public.research_submissions (
  id uuid primary key default gen_random_uuid(),
  purpose text[] not null,
  timing text not null,
  challenge text not null,
  engagement text not null,
  pricing text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  preferred_language text not null,
  consent boolean not null,
  submitted_at timestamptz not null,
  source text not null check (source in ('scroll60', 'cta')),
  created_at timestamptz default now()
);

-- Optional: enable Row Level Security (RLS) and allow anonymous inserts for the anon key
alter table public.research_submissions enable row level security;

create policy "Allow anonymous insert"
  on public.research_submissions
  for insert
  to anon
  with check (true);

-- Only service role (backend) can read; anon cannot select
create policy "Service role can read"
  on public.research_submissions
  for select
  to service_role
  using (true);
