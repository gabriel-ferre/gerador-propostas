"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export type SavePainsResult = { ok: true } | { ok: false; message: string };

const inputSchema = z.object({
  proposalId: z.uuid(),
  painIds: z.array(z.uuid()).max(100),
});

// Salva as dores destacadas da proposta (modo apresentador).
// 1) requireUser() primeiro: sem login, nada acontece.
// 2) zod valida os ids; entrada inválida é recusada.
// 3) A RLS do banco só deixa o dono da proposta gravar; se nenhuma linha
//    foi alterada, tratamos como falha.
export async function saveHighlightedPains(
  proposalId: unknown,
  painIds: unknown,
): Promise<SavePainsResult> {
  await requireUser();

  const parsed = inputSchema.safeParse({ proposalId, painIds });
  if (!parsed.success) {
    return { ok: false, message: "Dados inválidos." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proposals")
    .update({ highlighted_pain_ids: [...new Set(parsed.data.painIds)] })
    .eq("id", parsed.data.proposalId)
    .select("slug");

  if (error || !data || data.length === 0) {
    return { ok: false, message: "Não foi possível salvar o destaque." };
  }

  revalidatePath(`/${data[0].slug}`);
  return { ok: true };
}
