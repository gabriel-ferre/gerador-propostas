-- T03: tabelas da biblioteca e das propostas

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke execute on function public.set_updated_at() from public, anon, authenticated;

create table public.pains (
  id uuid primary key default gen_random_uuid(),
  channel text not null check (channel in ('ecommerce', 'loja_fisica')),
  text text not null,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cases (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  niche text not null,
  title text not null,
  body text not null default '',
  resolved_pains text[] not null default '{}',
  media_url text,
  media_type text check (media_type in ('video', 'image')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.plans (
  id uuid primary key default gen_random_uuid(),
  key text not null unique check (key in ('aceleracao_lojas', 'ecom_experts')),
  name text not null,
  payment_options jsonb not null default '[]'::jsonb,
  anchoring jsonb not null default '{"profissionais": [], "entregas": []}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Oferta oculta: tabela separada, nunca exposta ao anonimo
create table public.plan_offers (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.plans (id) on delete cascade,
  title text not null,
  body text not null default '',
  price numeric(12, 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('foto_placa', 'print_whatsapp')),
  image_url text not null,
  caption text,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.client_logos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_url text not null,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.section_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique check (key in (
    'autoridade', 'metodo', 'etapa_oferta', 'etapa_demanda',
    'etapa_conversao', 'etapa_recompra', 'beneficios', 'cta'
  )),
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.proposals (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
    check (slug not in ('admin', 'login', 'logout', 'api', 'dev', '_next', 'auth')),
  company_name text not null,
  channel text not null default 'ecommerce' check (channel in ('ecommerce', 'loja_fisica')),
  highlighted_pain_ids uuid[] not null default '{}',
  case_id uuid references public.cases (id) on delete restrict,
  plan_id uuid references public.plans (id) on delete restrict,
  price_override jsonb,
  status text not null default 'rascunho' check (status in ('rascunho', 'publicada', 'arquivada')),
  views integer not null default 0,
  last_viewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index proposals_owner_id_idx on public.proposals (owner_id);
create index proposals_case_id_idx on public.proposals (case_id);
create index proposals_plan_id_idx on public.proposals (plan_id);
create index plan_offers_plan_id_idx on public.plan_offers (plan_id);

-- updated_at automatico
do $$
declare t text;
begin
  foreach t in array array[
    'pains', 'cases', 'plans', 'plan_offers', 'testimonials',
    'faqs', 'client_logos', 'section_content', 'proposals'
  ] loop
    execute format(
      'create trigger set_updated_at before update on public.%I
       for each row execute function public.set_updated_at()', t);
  end loop;
end $$;
