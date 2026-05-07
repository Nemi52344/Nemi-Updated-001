# Careers Applications — Supabase + Resend Setup

## 1. One-time Supabase setup

### a. Create the storage bucket

Dashboard → Storage → **New bucket** → name: `resumes` → Privacy: **Private** → Create.

### b. Run the SQL schema

Dashboard → **SQL Editor** → New query → paste all of `supabase/schema.sql` → Run.

This creates the `applications` table + RLS policies allowing anon inserts and authenticated reads.

## 2. Deploy the Edge Function (emails)

Install the Supabase CLI if you haven't: https://supabase.com/docs/guides/cli

```bash
supabase login
supabase link --project-ref wrkfxtodkxhhlzmfpvgt
supabase secrets set RESEND_API_KEY=re_2hfY95H5_JfiycYdNoViJGj2FUNVGZkRy
supabase functions deploy send-application-emails --no-verify-jwt
```

## 3. Wire the Database Webhook

Dashboard → Database → **Webhooks** → New webhook:

- Name: `send-application-emails`
- Table: `applications`
- Events: check **Insert**
- Type: **Supabase Edge Functions**
- Edge Function: `send-application-emails`
- HTTP Method: POST
- Save.

## 4. Local dev

`.env.local` already contains:

```
NEXT_PUBLIC_SUPABASE_URL=https://wrkfxtodkxhhlzmfpvgt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_FT26jKZMRKO60vR85TLpyQ_QduuLLsu
```

Add the same two vars to your Netlify environment (Site settings → Environment variables) before deploying.

## 5. Emails — verified domain (production)

The function currently sends from `onboarding@resend.dev` (Resend's test sender). For production:

1. Resend → Domains → Add `nemi-ai.com` → add the DNS records they show
2. Once verified, edit `supabase/functions/send-application-emails/index.ts` and change:
   ```
   const FROM = "NEMI AI Careers <careers@nemi-ai.com>";
   ```
3. Redeploy: `supabase functions deploy send-application-emails --no-verify-jwt`

## 6. Viewing applications

Dashboard → **Table Editor** → `applications` — every submission appears here. Click a row's `resume_path` then Storage → `resumes` → that file to download.
