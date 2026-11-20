"use client";

import { useRef, useState } from "react";
import { PainCard } from "@/components/ui-retrieve";
import { usePresenter } from "@/app/[slug]/presenter";
import { saveHighlightedPains } from "@/app/[slug]/actions/pains";
import { cx } from "@/lib/theme";
import type { Channel } from "@/lib/proposal/types";
import type { DiagnosticoProps } from "./types";

const CHANNELS: { value: Channel; label: string }[] = [
  { value: "ecommerce", label: "E-commerce" },
  { value: "loja_fisica", label: "Loja física" },
];

export function DiagnosticoPanel({
  proposalId,
  initialChannel,
  pains,
  highlightedPainIds,
}: DiagnosticoProps) {
  const { isPresenter } = usePresenter();
  const [channel, setChannel] = useState<Channel>(initialChannel);
  const [highlighted, setHighlighted] = useState<string[]>(highlightedPainIds);
  const [saveError, setSaveError] = useState(false);

  // Último estado confirmado pelo servidor e fila para salvar em ordem.
  const savedRef = useRef<string[]>(highlightedPainIds);
  const queueRef = useRef<Promise<void>>(Promise.resolve());
  const latestRef = useRef<string[]>(highlightedPainIds);

  const isLojaFisica = channel === "loja_fisica";
  const visible = pains
    .filter((p) => p.channel === channel)
    .sort((a, b) => a.position - b.position)
    .slice(0, 6);
  const hasHighlight = visible.some((p) => highlighted.includes(p.id));

  function persist(next: string[]) {
    queueRef.current = queueRef.current.then(async () => {
      try {
        const result = await saveHighlightedPains(proposalId, next);
        if (result.ok) {
          savedRef.current = next;
          setSaveError(false);
          return;
        }
      } catch {
        // cai no rollback abaixo
      }
      // Falhou: volta ao último estado salvo, sem quebrar a apresentação.
      latestRef.current = savedRef.current;
      setHighlighted(savedRef.current);
      setSaveError(true);
    });
  }

  function togglePain(id: string) {
    const current = latestRef.current;
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    latestRef.current = next;
    setHighlighted(next); // otimista
    if (isPresenter) persist(next); // visitante: só local, nada é enviado
  }

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.12em] sm:text-base">
        <span
          className={cx(
            "transition-colors duration-200 motion-reduce:transition-none",
            !isLojaFisica ? "text-[color:var(--deck-fg)]" : "text-[color:var(--deck-muted)]",
          )}
        >
          {CHANNELS[0].label}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={isLojaFisica}
          aria-label="Alternar entre E-commerce e Loja física"
          onClick={() => setChannel(isLojaFisica ? "ecommerce" : "loja_fisica")}
          className={cx(
            "relative h-8 w-14 shrink-0 cursor-pointer rounded-full border-[1.5px] transition-colors duration-200 motion-reduce:transition-none",
            "border-brand-red bg-brand-red focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--deck-fg)]",
          )}
        >
          <span
            aria-hidden
            className={cx(
              "absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-[color:var(--deck-fg)] transition-transform duration-200 ease-brand motion-reduce:transition-none",
              isLojaFisica && "translate-x-6",
            )}
          />
        </button>
        <span
          className={cx(
            "transition-colors duration-200 motion-reduce:transition-none",
            isLojaFisica ? "text-[color:var(--deck-fg)]" : "text-[color:var(--deck-muted)]",
          )}
        >
          {CHANNELS[1].label}
        </span>
      </div>

      <ul
        aria-label={`Dores de ${isLojaFisica ? "loja física" : "e-commerce"}`}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-5"
      >
        {visible.map((pain) => {
          const isOn = highlighted.includes(pain.id);
          return (
            <li key={pain.id}>
              <PainCard
                title={pain.text}
                state={isOn ? "destacado" : hasHighlight ? "esmaecido" : "normal"}
                onSelect={() => togglePain(pain.id)}
              />
            </li>
          );
        })}
      </ul>

      {visible.length === 0 ? (
        <p className="text-[color:var(--deck-muted)]">Nenhuma dor cadastrada para este canal.</p>
      ) : null}

      {/* Aviso só aparece para o apresentador quando o salvamento falha. */}
      {isPresenter && saveError ? (
        <p role="status" className="text-sm text-[color:var(--deck-muted)]">
          Não foi possível salvar o último destaque; voltamos ao anterior.
        </p>
      ) : null}
    </div>
  );
}
