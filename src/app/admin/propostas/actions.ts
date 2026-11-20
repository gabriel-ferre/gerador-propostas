"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import {
  proposalFormSchema,
  proposalStatusSchema,
  type ProposalFormValues,
} from "@/lib/schemas";

export type ActionResult =
  | { ok: true }
  | { ok: false; message?: string; fieldErrors?: Record<string, string> };

const idSchema = z.uuid("Proposta inválida.");

function zodToFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

function dbError(error: { code?: string; message: string }): ActionResult {
  if (error.code === "23505") {
    return {
      ok: false,
      fieldErrors: { slug: "Este endereço já está em uso." },
    };
  }
  return { ok: false, message: "Não foi possível salvar. Tente novamente." };
}

function toRow(v: ProposalFormValues) {
  return {
    company_name: v.company_name,
    slug: v.slug,
    channel: v.channel,
    highlighted_pain_ids: v.highlighted_pain_ids,
    case_id: v.case_id ?? null,
    plan_id: v.plan_id ?? null,
    price_override: v.price_override && v.price_override.length > 0 ? v.price_override : null,
    status: v.status,
  };
}

export async function createProposal(input: unknown): Promise<ActionResult> {
  await requireUser();
  const parsed = proposalFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, fieldErrors: zodToFieldErrors(parsed.error) };
  }
  const supabase = await createClient();
  // owner_id usa o default auth.uid() do banco.
  const { error } = await supabase.from("proposals").insert(toRow(parsed.data));
  if (error) return dbError(error);
  revalidatePath("/admin");
  return { ok: true };
}

export async function updateProposal(
  id: unknown,
  input: unknown,
): Promise<ActionResult> {
  await requireUser();
  const idParsed = idSchema.safeParse(id);
  if (!idParsed.success) return { ok: false, message: "Proposta inválida." };
  const parsed = proposalFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, fieldErrors: zodToFieldErrors(parsed.error) };
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proposals")
    .update({ ...toRow(parsed.data), updated_at: new Date().toISOString() })
    .eq("id", idParsed.data)
    .select("id");
  if (error) return dbError(error);
  if (!data || data.length === 0) {
    return { ok: false, message: "Proposta não encontrada." };
  }
  revalidatePath("/admin");
  return { ok: true };
}

export async function setProposalStatus(
  id: unknown,
  status: unknown,
): Promise<ActionResult> {
  await requireUser();
  const idParsed = idSchema.safeParse(id);
  const statusParsed = proposalStatusSchema.safeParse(status);
  if (!idParsed.success || !statusParsed.success) {
    return { ok: false, message: "Dados inválidos." };
  }
  const supabase = await createClient();

  // Valida a proposta inteira com o novo status (ex.: publicar exige case e plano).
  const { data: row } = await supabase
    .from("proposals")
    .select("*")
    .eq("id", idParsed.data)
    .maybeSingle();
  if (!row) return { ok: false, message: "Proposta não encontrada." };

  const candidate = {
    company_name: row.company_name,
    slug: row.slug,
    channel: row.channel,
    highlighted_pain_ids: row.highlighted_pain_ids,
    case_id: row.case_id,
    plan_id: row.plan_id,
    price_override: row.price_override,
    status: statusParsed.data,
  };
  const check = proposalFormSchema.safeParse(candidate);
  if (!check.success) {
    const first = Object.values(zodToFieldErrors(check.error))[0];
    return { ok: false, message: first };
  }

  const { error } = await supabase
    .from("proposals")
    .update({ status: statusParsed.data, updated_at: new Date().toISOString() })
    .eq("id", idParsed.data);
  if (error) return { ok: false, message: "Não foi possível atualizar o status." };
  revalidatePath("/admin");
  return { ok: true };
}
