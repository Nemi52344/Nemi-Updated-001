-- Stores short-lived email OTP codes used by /api/otp/send and /api/otp/verify.
-- Code values are SHA-256 hashed before insert; raw codes never touch the DB.
-- Access is server-only via the service-role key, so RLS is enabled with no
-- policies (anon/authenticated roles get zero access).

create table if not exists public.otp_codes (
  email       text primary key,
  code_hash   text not null,
  expires_at  timestamptz not null,
  attempts    integer not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.otp_codes enable row level security;

-- Optional: a cleanup function you can call from a scheduled job to purge
-- expired codes. Service role bypasses RLS so it can DELETE directly.
create or replace function public.otp_codes_purge_expired() returns void
language sql as $$
  delete from public.otp_codes where expires_at < now();
$$;
