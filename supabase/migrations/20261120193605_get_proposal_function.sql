-- T03: funcao publica get_proposal (nunca devolve plan_offers)

create or replace function public.get_proposal(p_slug text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_proposal public.proposals%rowtype;
  v_case jsonb;
  v_plan jsonb;
begin
  select * into v_proposal
  from public.proposals
  where slug = p_slug and status = 'publicada';

  if not found then
    return null;
  end if;

  -- acesso logado (modo apresentador) nao conta visualizacao
  if auth.uid() is null then
    update public.proposals
    set views = views + 1, last_viewed_at = now()
    where id = v_proposal.id
    returning views, last_viewed_at into v_proposal.views, v_proposal.last_viewed_at;
  end if;

  select to_jsonb(c) into v_case from public.cases c where c.id = v_proposal.case_id;

  select jsonb_build_object(
    'id', p.id,
    'key', p.key,
    'name', p.name,
    'payment_options', p.payment_options,
    'anchoring', p.anchoring
  ) into v_plan
  from public.plans p where p.id = v_proposal.plan_id;

  return jsonb_build_object(
    'id', v_proposal.id,
    'slug', v_proposal.slug,
    'company_name', v_proposal.company_name,
    'channel', v_proposal.channel,
    'highlighted_pain_ids', to_jsonb(v_proposal.highlighted_pain_ids),
    'price_override', v_proposal.price_override,
    'status', v_proposal.status,
    'views', v_proposal.views,
    'last_viewed_at', v_proposal.last_viewed_at,
    'case', v_case,
    'plan', v_plan
  );
end;
$$;

revoke execute on function public.get_proposal(text) from public;
grant execute on function public.get_proposal(text) to anon, authenticated;
