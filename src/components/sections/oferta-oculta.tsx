"use client";

import { useEffect, useRef, useState } from "react";
import { revealOffer, type RevealedOffer } from "@/app/[slug]/actions/offer";
import { usePresenter } from "@/app/[slug]/presenter";
import { formatBRL } from "./ancoragem-format";
import type { OfertaOcultaProps } from "./types";

function isTyping(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  );
}

// Nada aparece até o atalho Shift + O. Visitante (não logado): renderiza null e
// não registra listener. Nenhum dado de oferta existe no HTML; vem por server action.
export function OfertaOculta({ proposalId }: OfertaOcultaProps) {
  const { isPresenter } = usePresenter();
  const [offer, setOffer] = useState<RevealedOffer | null>(null);
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const busy = useRef(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  useEffect(() => {
    if (!isPresenter) return;

    async function onKeyDown(e: KeyboardEvent) {
      if (e.code !== "KeyO" || !e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.repeat || isTyping(e.target)) return;
      e.preventDefault();

      if (visibleRef.current) {
        setVisible(false);
        setEntered(false);
        return;
      }
      if (busy.current) return;
      busy.current = true;
      try {
        const result = await revealOffer(proposalId);
        if (result) {
          setOffer(result);
          setVisible(true);
        }
      } catch {
        // sem sessão ou falha de rede: não mostra nada
      } finally {
        busy.current = false;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPresenter, proposalId]);

  useEffect(() => {
    if (!visible) return;
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [visible]);

  if (!isPresenter || !visible || !offer) return null;

  return (
    <div
      role="dialog"
      aria-label="Oferta protagonista"
      onClick={() => {
        setVisible(false);
        setEntered(false);
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 transition-opacity duration-500 ease-out motion-reduce:transition-none ${entered ? "opacity-100" : "opacity-0"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl rounded-3xl border border-[color:var(--deck-accent)]/70 bg-[#0b0b0f] p-8 text-white shadow-2xl transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none sm:p-12 ${entered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--deck-accent)]">
          Condição especial
        </p>
        <h2 className="mt-4 text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
          {offer.title}
        </h2>
        <p className="mt-5 text-lg font-light leading-relaxed text-white/80">{offer.body}</p>
        {offer.price !== null && (
          <p className="mt-8 text-5xl font-bold tracking-tight text-[color:var(--deck-accent)] tabular-nums">
            {formatBRL(offer.price)}
          </p>
        )}
      </div>
    </div>
  );
}
