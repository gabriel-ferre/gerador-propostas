import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

async function signOut() {
  "use server";
  // Server Action: valida a sessão por conta própria (não confia só no layout).
  await requireUser();
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

// Parte dinâmica (lê cookies): fica dentro de <Suspense> por causa do Cache Components.
async function AdminShell({ children }: { children: React.ReactNode }) {
  // Camada 2 de proteção. Server Actions do admin também devem chamar requireUser().
  const user = await requireUser();

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b px-6 py-3">
        <span className="text-sm text-muted-foreground">{user.email}</span>
        <form action={signOut}>
          <Button type="submit" variant="outline" size="sm">
            Sair
          </Button>
        </form>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}
