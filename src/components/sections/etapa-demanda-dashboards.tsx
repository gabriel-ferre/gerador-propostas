"use client";

import { useState } from "react";
import { ProofNumber } from "@/components/ui-retrieve/ProofNumber";
import { deck } from "@/lib/theme";

// Números de exemplo, exibidos SÓ em desenvolvimento quando não há prints.
// Em produção nunca mostramos números de prova inventados para um cliente.
const EXEMPLOS = [
  { value: "+212%", label: "retorno sobre o investimento em anúncios", barras: [30, 38, 46, 58, 72, 90] },
  { value: "-38%", label: "no custo para conquistar cada cliente", barras: [90, 80, 70, 58, 50, 40] },
  { value: "3,4x", label: "mais compras vindas de remarketing", barras: [24, 30, 44, 52, 68, 84] },
];

export function EtapaDemandaDashboards({ dashboards }: { dashboards: string[] }) {
  const imagens = dashboards.filter((u) => u.trim() !== "");
  const [quebradas, setQuebradas] = useState<Record<number, boolean>>({});

  if (imagens.length === 0) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <div className="grid gap-4">
        {EXEMPLOS.map((e) => (
          <div key={e.value} className={`${deck.surface} flex items-end justify-between gap-6 p-5 sm:p-6`}>
            <ProofNumber value={e.value} label={e.label} />
            <svg viewBox="0 0 90 56" className="h-14 w-24 shrink-0" aria-hidden="true">
              {e.barras.map((h, i) => (
                <rect key={i} x={i * 15} y={56 - (h / 100) * 56} width="10" height={(h / 100) * 56} rx="2" style={{ fill: "var(--deck-accent)", fillOpacity: 0.35 + i * 0.13 }} />
              ))}
            </svg>
          </div>
        ))}
        <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--deck-muted)]">
          Exemplo ilustrativo de resultados
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {imagens.map((src, i) =>
        quebradas[i] ? null : (
          <figure key={`${i}-${src}`} className={`${deck.surface} overflow-hidden p-2`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Print de dashboard de resultados ${i + 1}`}
              loading="lazy"
              onError={() => setQuebradas((q) => ({ ...q, [i]: true }))}
              className="h-auto w-full rounded-xl object-contain"
            />
          </figure>
        ),
      )}
    </div>
  );
}
