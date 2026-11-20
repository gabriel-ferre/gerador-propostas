import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { connection } from "next/server";

export async function createClient() {
  // Cache Components: o client do Supabase usa Date.now() para checar a
  // validade da sessão. connection() avisa o Next que daqui para frente tudo
  // roda só na hora da requisição (nunca no pré-render).
  await connection();
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Chamado de um Server Component: não pode gravar cookies.
            // Tudo bem, o proxy já renova a sessão.
          }
        },
      },
    },
  );
}
