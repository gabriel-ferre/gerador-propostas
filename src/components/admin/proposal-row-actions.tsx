"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/site";
import { setProposalStatus } from "@/app/admin/propostas/actions";

import type { ProposalStatus as Status } from "@/lib/schemas";

export function ProposalRowActions({
  id,
  slug,
  status,
}: {
  id: string;
  slug: string;
  status: string;
}) {
  const [pending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${SITE_URL}/${slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Não foi possível copiar o link.");
    }
  }

  function change(next: Status) {
    setError(null);
    startTransition(async () => {
      const result = await setProposalStatus(id, next);
      if (!result.ok) setError(result.message ?? "Erro ao atualizar.");
    });
  }

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap gap-2">
        <Link
          href={`/admin/propostas/${id}`}
          className="inline-flex h-7 items-center rounded-lg border px-2.5 text-sm hover:bg-muted"
        >
          Editar
        </Link>
        <Button size="sm" variant="outline" onClick={copyLink}>
          {copied ? "Link copiado" : "Copiar link"}
        </Button>
        {status !== "publicada" && (
          <Button
            size="sm"
            variant="outline"
            disabled={pending}
            onClick={() => change("publicada")}
          >
            Publicar
          </Button>
        )}
        {status === "publicada" && (
          <Button
            size="sm"
            variant="outline"
            disabled={pending}
            onClick={() => change("arquivada")}
          >
            Arquivar
          </Button>
        )}
        {status !== "rascunho" && (
          <Button
            size="sm"
            variant="outline"
            disabled={pending}
            onClick={() => change("rascunho")}
          >
            Voltar para rascunho
          </Button>
        )}
      </div>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
