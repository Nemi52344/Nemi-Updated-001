-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New query)

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  role text not null,
  department text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  location text,
  experience text not null,
  linkedin text,
  portfolio text,
  cover_letter text not null,
  resume_path text not null
);

alter table public.applications enable row level security;

-- Anyone (including anon key from frontend) can insert a new application.
drop policy if exists "anon can insert applications" on public.applications;
create policy "anon can insert applications"
  on public.applications
  for insert
  to anon, authenticated
  with check (true);

-- Only authenticated dashboard users (i.e. you) can read.
drop policy if exists "only authenticated can read" on public.applications;
create policy "only authenticated can read"
  on public.applications
  for select
  to authenticated
  using (true);

-- Storage: allow anon to upload into the 'resumes' bucket.
-- Create the bucket first (Dashboard > Storage > New bucket > 'resumes' > Private),
-- then run these policies.
drop policy if exists "anon can upload resumes" on storage.objects;
create policy "anon can upload resumes"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'resumes');

-- (Reads are intentionally NOT granted to anon — you'll download resumes
-- from the Supabase dashboard or via a signed URL from an authenticated context.)
