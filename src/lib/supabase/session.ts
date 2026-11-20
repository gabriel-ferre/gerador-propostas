import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Renova a sessão do Supabase a cada requisição e repassa os cookies atualizados.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Não coloque código entre createServerClient e getUser.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Camada 1 de proteção: /admin e /admin/* exigem usuário logado.
  const { pathname } = request.nextUrl;
  if (!user && (pathname === "/admin" || pathname.startsWith("/admin/"))) {
    const redirect = NextResponse.redirect(new URL("/login", request.url));
    // Mantém cookies de sessão eventualmente renovados/limpos.
    response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  }

  return response;
}
