import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProposalRowActions } from "@/components/admin/proposal-row-actions";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PROPOSAL_STATUS_LABELS } from "@/lib/schemas";

const STATUS_LABEL: Record<string, string> = PROPOSAL_STATUS_LABELS;

function statusVariant(status: string) {
  if (status === "publicada") return "default" as const;
  if (status === "arquivada") return "outline" as const;
  return "secondary" as const;
}

function formatDate(iso: string | null) {
  if (!iso) return "nunca";
  return new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  });
}

const newButtonClass =
  "inline-flex h-8 items-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80";

export default async function AdminPage() {
  await requireUser();
  const supabase = await createClient();
  const { data: proposals, error } = await supabase
    .from("proposals")
    .select("id, slug, company_name, status, views, last_viewed_at")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Propostas</h1>
        <Link href="/admin/propostas/nova" className={newButtonClass}>
          Nova proposta
        </Link>
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          Não foi possível carregar as propostas.
        </p>
      )}

      {!error && (!proposals || proposals.length === 0) && (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <p className="mb-1 font-medium">Nenhuma proposta ainda</p>
          <p className="mb-4 text-sm text-muted-foreground">
            Crie a primeira proposta para gerar um link para o cliente.
          </p>
          <Link href="/admin/propostas/nova" className={newButtonClass}>
            Nova proposta
          </Link>
        </div>
      )}

      {proposals && proposals.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Visualizações</TableHead>
              <TableHead>Última visita</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">
                  {p.company_name}
                  <div className="text-xs font-normal text-muted-foreground">
                    /{p.slug}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant(p.status)}>
                    {STATUS_LABEL[p.status] ?? p.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{p.views}</TableCell>
                <TableCell>{formatDate(p.last_viewed_at)}</TableCell>
                <TableCell>
                  <ProposalRowActions id={p.id} slug={p.slug} status={p.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
