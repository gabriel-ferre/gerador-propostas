-- T03: RLS em todas as tabelas + privilegios

alter table public.proposals enable row level security;
alter table public.pains enable row level security;
alter table public.cases enable row level security;
alter table public.plans enable row level security;
alter table public.plan_offers enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.client_logos enable row level security;
alter table public.section_content enable row level security;

-- Privilegios: anon perde tudo; ganha so select nas tabelas publicas de marketing
revoke all on all tables in schema public from anon;
grant select on public.pains, public.cases, public.testimonials,
  public.faqs, public.client_logos, public.section_content to anon;

-- Logado: leitura/escrita
grant select, insert, update, delete on all tables in schema public to authenticated;

-- Proposals: so as do proprio dono
create policy proposals_select_own on public.proposals
  for select to authenticated using (owner_id = (select auth.uid()));
create policy proposals_insert_own on public.proposals
  for insert to authenticated with check (owner_id = (select auth.uid()));
create policy proposals_update_own on public.proposals
  for update to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));
create policy proposals_delete_own on public.proposals
  for delete to authenticated using (owner_id = (select auth.uid()));

-- Tabelas sem acesso anonimo: plans, plan_offers
do $$
declare t text;
begin
  foreach t in array array['plans', 'plan_offers'] loop
    execute format('create policy %I on public.%I for select to authenticated using (true)', t || '_select_auth', t);
    execute format('create policy %I on public.%I for insert to authenticated with check (true)', t || '_insert_auth', t);
    execute format('create policy %I on public.%I for update to authenticated using (true) with check (true)', t || '_update_auth', t);
    execute format('create policy %I on public.%I for delete to authenticated using (true)', t || '_delete_auth', t);
  end loop;
end $$;

-- Tabelas de biblioteca publica: anon e authenticated leem; so authenticated escreve
do $$
declare t text;
begin
  foreach t in array array['pains', 'cases', 'testimonials', 'faqs', 'client_logos', 'section_content'] loop
    execute format('create policy %I on public.%I for select to anon, authenticated using (true)', t || '_select_all', t);
    execute format('create policy %I on public.%I for insert to authenticated with check (true)', t || '_insert_auth', t);
    execute format('create policy %I on public.%I for update to authenticated using (true) with check (true)', t || '_update_auth', t);
    execute format('create policy %I on public.%I for delete to authenticated using (true)', t || '_delete_auth', t);
  end loop;
end $$;
