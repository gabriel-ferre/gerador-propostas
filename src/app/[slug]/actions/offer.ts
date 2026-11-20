"use server";

import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

const proposalIdSchema = z.uuid();

export type RevealedOffer = { title: string; body: string; price: number | null };

// Oferta oculta (T16). Única porta de saída dos dados de plan_offers.
// 1) requireUser() ANTES de tudo (Server Action é um POST público).
// 2) O cliente manda só o id da proposta; o plan_id vem do banco, nunca do cliente.
// 3) RLS ainda protege: só usuário logado lê proposals e plan_offers.
export async function revealOffer(proposalId: unknown): Promise<RevealedOffer | null> {
  await requireUser();

  const parsed = proposalIdSchema.safeParse(proposalId);
  if (!parsed.success) return null;

  const supabase = await createClient();

  const { data: proposal } = await supabase
    .from("proposals")
    .select("plan_id")
    .eq("id", parsed.data)
    .maybeSingle();
  if (!proposal?.plan_id) return null;

  const { data: offer } = await supabase
    .from("plan_offers")
    .select("title, body, price")
    .eq("plan_id", proposal.plan_id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (!offer) return null;

  return {
    title: offer.title,
    body: offer.body,
    price: offer.price === null ? null : Number(offer.price),
  };
}
