"use client";

import { useState } from "react";
import { Logo } from "@/components/ui-retrieve/Logo";
import { cx } from "@/lib/theme";

type AutoridadeFotoProps = {
  /** URL vinda do conteúdo; vazia ou quebrada cai no placeholder. */
  src?: string;
  alt: string;
  /** Tom do placeholder, para a composição não ficar uniforme. */
  tom?: "navy" | "vermelho" | "cinza";
  destaque?: boolean;
  className?: string;
};

const TONS = {
  navy: "linear-gradient(135deg, var(--deck-navy) 0%, #000 100%)",
  vermelho: "linear-gradient(135deg, color-mix(in srgb, var(--brand-red) 28%, transparent) 0%, #000 90%)",
  cinza: "linear-gradient(135deg, rgba(254, 254, 254, 0.1) 0%, rgba(254, 254, 254, 0.02) 100%)",
} as const;

/** Foto da seção Autoridade. Sem URL (ou se falhar ao carregar), mostra um bloco discreto com o símbolo da marca. */
export function AutoridadeFoto({
  src,
  alt,
  tom = "navy",
  destaque = false,
  className,
}: AutoridadeFotoProps) {
  const [falhou, setFalhou] = useState(false);
  const temImagem = Boolean(src) && !falhou;

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-xl border border-[color:var(--deck-line)]",
        destaque ? "rounded-2xl" : "opacity-90",
        className,
      )}
      style={{ background: TONS[tom] }}
    >
      {temImagem ? (
        // eslint-disable-next-line @next/next/no-img-element -- URL externa vinda do conteúdo
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFalhou(true)}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <Logo
            variant="simbolo"
            height={destaque ? 72 : 28}
            alt=""
            className="opacity-30"
          />
        </div>
      )}
    </div>
  );
}
