import "server-only";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";

export type FormOptions = {
  pains: { id: string; channel: string; text: string; position: number }[];
  cases: { id: string; name: string; niche: string }[];
  plans: { id: string; name: string; payment_options: unknown }[];
};

export async function loadFormOptions(): Promise<FormOptions> {
  await requireUser();
  const supabase = await createClient();
  const [pains, cases, plans] = await Promise.all([
    supabase.from("pains").select("id, channel, text, position").order("position"),
    supabase.from("cases").select("id, name, niche").order("name"),
    supabase.from("plans").select("id, name, payment_options").order("name"),
  ]);
  return {
    pains: pains.data ?? [],
    cases: cases.data ?? [],
    plans: plans.data ?? [],
  };
}

export async function loadProposal(id: string) {
  await requireUser();
  const supabase = await createClient();
  const { data } = await supabase
    .from("proposals")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data;
}
