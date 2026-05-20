-- contact_submissions table for the Contact Us form.
-- Run once in Supabase Dashboard → SQL editor.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

-- Allow anonymous inserts (so the form works without a logged-in user).
-- Reads remain locked down to service_role / authenticated.
drop policy if exists "anon can insert contact submissions" on public.contact_submissions;
create policy "anon can insert contact submissions"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- Helpful index for admin lookups.
create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);
