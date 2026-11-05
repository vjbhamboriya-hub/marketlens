-- MarketLens initial schema. Run in Supabase SQL Editor.
create extension if not exists pgcrypto;
create table if not exists public.products (
 id uuid primary key default gen_random_uuid(), asin text not null, title text not null,
 marketplace text not null check (marketplace in ('US','UK','CA','IN')),
 category text not null, price numeric not null default 0, currency text not null,
 rating numeric not null default 0, reviews integer not null default 0,
 monthly_sales integer not null default 0, competition text not null default 'Medium',
 score integer not null default 50, source text not null default 'DEMO',
 created_at timestamptz not null default now()
);
create table if not exists public.saved_products (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 product_id uuid references public.products(id) on delete set null, asin text not null, marketplace text not null,
 notes text not null default '', created_at timestamptz not null default now(),
 unique(user_id,asin,marketplace)
);
create table if not exists public.competitors (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 asin text not null, marketplace text not null, product_title text not null default '',
 target_price numeric, observed_price numeric, notes text not null default '',
 last_checked_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.keyword_projects (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 seed text not null, marketplace text not null, keywords jsonb not null default '[]'::jsonb,
 provenance text not null default 'HEURISTIC', created_at timestamptz not null default now()
);
create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade, email text,
 role text not null default 'user' check(role in ('user','admin')), created_at timestamptz not null default now()
);
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into public.profiles(id,email,role) values(new.id,new.email,'user') on conflict(id) do nothing; return new; end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
alter table public.products enable row level security;
alter table public.saved_products enable row level security;
alter table public.competitors enable row level security;
alter table public.keyword_projects enable row level security;
alter table public.profiles enable row level security;
drop policy if exists "products read" on public.products;
create policy "products read" on public.products for select to anon,authenticated using (true);
create policy "saved own" on public.saved_products for all to authenticated using(auth.uid()=user_id) with check(auth.uid()=user_id);
create policy "competitors own" on public.competitors for all to authenticated using(auth.uid()=user_id) with check(auth.uid()=user_id);
create policy "keywords own" on public.keyword_projects for all to authenticated using(auth.uid()=user_id) with check(auth.uid()=user_id);
create policy "profile read own" on public.profiles for select to authenticated using(auth.uid()=id);
-- Users cannot update role. Admin promotion is a trusted owner-operated SQL action only:
-- update public.profiles set role='admin' where email='YOUR_OWNER_EMAIL';
-- Do not expose service-role credentials to the browser.
