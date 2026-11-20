"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cx } from "@/lib/theme";

type Props = { criativos: string[]; className?: string };

const PLACEHOLDERS = ["Criativo de oferta", "Post de produto", "Story de campanha"];

/** Carrossel sem biblioteca: scroll-snap + botões + arrastar/tocar. */
export function EtapaOfertaCarrossel({ criativos, className }: Props) {
  const imagens = criativos.filter((u) => u.trim() !== "");
  const itens = imagens.length > 0 ? imagens : PLACEHOLDERS;
  const ehPlaceholder = imagens.length === 0;

  const trilho = useRef<HTMLDivElement>(null);
  const [atual, setAtual] = useState(0);
  const [quebradas, setQuebradas] = useState<Record<number, boolean>>({});

  const atualizar = useCallback(() => {
    const el = trilho.current;
    if (!el) return;
    const filhos = Array.from(el.children) as HTMLElement[];
    let melhor = 0;
    let menor = Infinity;
    filhos.forEach((f, i) => {
      const d = Math.abs(f.offsetLeft - el.scrollLeft - filhos[0].offsetLeft);
      if (d < menor) {
        menor = d;
        melhor = i;
      }
    });
    setAtual(melhor);
  }, []);

  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    el.addEventListener("scroll", atualizar, { passive: true });
    return () => el.removeEventListener("scroll", atualizar);
  }, [atualizar]);

  function ir(i: number) {
    const el = trilho.current;
    if (!el) return;
    const alvo = el.children[Math.max(0, Math.min(itens.length - 1, i))] as HTMLElement;
    el.scrollTo({ left: alvo.offsetLeft - (el.children[0] as HTMLElement).offsetLeft, behavior: "smooth" });
  }

  // Arrastar com o mouse (toque já funciona nativamente).
  const arraste = useRef<{ x: number; left: number } | null>(null);
  function aoPressionar(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    arraste.current = { x: e.clientX, left: e.currentTarget.scrollLeft };
    e.currentTarget.style.scrollSnapType = "none";
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function aoMover(e: React.PointerEvent<HTMLDivElement>) {
    if (!arraste.current) return;
    e.currentTarget.scrollLeft = arraste.current.left - (e.clientX - arraste.current.x);
  }
  function aoSoltar(e: React.PointerEvent<HTMLDivElement>) {
    if (!arraste.current) return;
    arraste.current = null;
    e.currentTarget.style.scrollSnapType = "";
  }

  const botao =
    "grid h-11 w-11 place-items-center rounded-full border border-[color:var(--deck-line)] text-[color:var(--deck-fg)] transition-colors hover:bg-[color:var(--deck-accent)] hover:border-[color:var(--deck-accent)] disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--deck-accent)]";

  return (
    <div
      className={cx("w-full", className)}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Criativos de oferta"
    >
      <div
        ref={trilho}
        tabIndex={0}
        onPointerDown={aoPressionar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") ir(atual + 1);
          if (e.key === "ArrowLeft") ir(atual - 1);
        }}
        className="flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] active:cursor-grabbing motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
      >
        {itens.map((item, i) => {
          const falhou = quebradas[i];
          return (
            <figure
              key={`${i}-${item}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${itens.length}`}
              className="relative aspect-[4/5] w-[74%] shrink-0 snap-center overflow-hidden rounded-2xl border border-[color:var(--deck-line)] bg-[color:var(--deck-surface)] sm:w-[48%] lg:w-[58%] xl:w-[52%]"
            >
              {ehPlaceholder || falhou ? (
                <Placeholder rotulo={ehPlaceholder ? item : "Criativo indisponível"} n={i + 1} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item}
                  alt={`Criativo ${i + 1}`}
                  draggable={false}
                  loading="lazy"
                  onError={() => setQuebradas((q) => ({ ...q, [i]: true }))}
                  className="h-full w-full object-cover select-none"
                />
              )}
            </figure>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2" aria-hidden="true">
          {itens.map((_, i) => (
            <span
              key={i}
              className={cx(
                "h-1.5 rounded-full transition-all",
                i === atual
                  ? "w-6 bg-[color:var(--deck-accent)]"
                  : "w-1.5 bg-[color:var(--deck-line)]",
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Criativo anterior" disabled={atual === 0} onClick={() => ir(atual - 1)} className={botao}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button type="button" aria-label="Próximo criativo" disabled={atual >= itens.length - 1} onClick={() => ir(atual + 1)} className={botao}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{`Criativo ${atual + 1} de ${itens.length}`}</p>
    </div>
  );
}

function Placeholder({ rotulo, n }: { rotulo: string; n: number }) {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-[linear-gradient(160deg,var(--deck-surface),transparent)] p-5">
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--deck-eyebrow)]">
        Exemplo
      </span>
      <div>
        <p className="text-6xl font-bold leading-none text-[color:var(--deck-accent)]">
          {String(n).padStart(2, "0")}
        </p>
        <p className="mt-3 text-sm font-light uppercase tracking-wide text-[color:var(--deck-muted)]">
          {rotulo}
        </p>
        <div className="mt-4 h-2 w-2/3 rounded-full bg-[color:var(--deck-line)]" />
        <div className="mt-2 h-2 w-1/2 rounded-full bg-[color:var(--deck-line)]" />
      </div>
    </div>
  );
}
