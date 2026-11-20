import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Garante que há um usuário logado; senão manda para /login.
// IMPORTANTE: toda Server Action do admin também deve chamar requireUser()
// no início. Não confie só no layout: Server Actions são endpoints POST
// que podem ser chamados sem passar pelo layout.
export async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return user;
}
