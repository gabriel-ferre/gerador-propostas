import type { ReactNode } from "react";

// Bloco provisório compartilhado. Some quando cada seção ganhar o visual final.
export function Provisional({
  id,
  nome,
  children,
}: {
  id: string;
  nome: string;
  children?: ReactNode;
}) {
  return (
    <section id={id} className="border-b border-dashed px-6 py-12">
      <p className="text-sm font-semibold uppercase tracking-wide">{nome}</p>
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </section>
  );
}
