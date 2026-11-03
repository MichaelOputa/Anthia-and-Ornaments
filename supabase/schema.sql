-- ==============================================================================
-- Anthia & Ornaments - Supabase Database & Storage Setup
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql).
-- Add at least one Auth user's email to public.admin_users to authorize catalog writes.
-- ==============================================================================

-- 1. Create the Products Table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('jewelry', 'clothing', 'wristwatch', 'eyeglass', 'perfume')),
  category text not null default 'General',
  description text default '',
  sizes text[] not null default '{}'::text[],
  price numeric not null default 0,
  currency text not null default 'NGN' check (currency in ('NGN', 'USD')),
  image text not null,
  seed_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Add fields to existing installations as well as fresh databases.
alter table public.products
  add column if not exists sizes text[] not null default '{}'::text[],
  add column if not exists seed_key text;

create unique index if not exists products_seed_key_unique
  on public.products (seed_key);

-- Admin allowlist used by every product and image write policy.
create table if not exists public.admin_users (
  email text primary key check (email = lower(trim(email))),
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- 2. Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- 3. Public Read Policy: Allow anyone (visitors and customers) to view products
drop policy if exists "Public products are viewable by everyone" on public.products;
create policy "Public products are viewable by everyone"
  on public.products
  for select
  using (true);

-- 4. Authenticated Write Policies: Allow logged-in admin to Insert, Update, and Delete
drop policy if exists "Authenticated users can insert products" on public.products;
create policy "Authenticated users can insert products"
  on public.products
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Authenticated users can update products" on public.products;
create policy "Authenticated users can update products"
  on public.products
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Authenticated users can delete products" on public.products;
create policy "Authenticated users can delete products"
  on public.products
  for delete
  to authenticated
  using (public.is_admin());

-- 5. Create Storage Bucket for product images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

-- 6. Storage Policies for product-images bucket
drop policy if exists "Public Access to product-images" on storage.objects;
create policy "Public Access to product-images"
  on storage.objects
  for select
  using (bucket_id = 'product-images');

drop policy if exists "Authenticated users can upload images" on storage.objects;
create policy "Authenticated users can upload images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Authenticated users can update images" on storage.objects;
create policy "Authenticated users can update images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'product-images' and public.is_admin())
  with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Authenticated users can delete images" on storage.objects;
create policy "Authenticated users can delete images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'product-images' and public.is_admin());
