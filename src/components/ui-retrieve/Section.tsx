import type { ReactNode } from "react";
import {
  CONTAINER_CLASS,
  VARIANT_BG_CLASS,
  VARIANT_TONE,
  cx,
  type ContainerSize,
  type SectionVariant,
} from "@/lib/theme";

type SectionProps = {
  children: ReactNode;
  id?: string;
  variant?: SectionVariant;
  /** Largura máxima do conteúdo. */
  width?: ContainerSize;
  /** Glow radial vermelho no canto (só combina com fundos escuros). */
  glow?: boolean;
  className?: string;
  innerClassName?: string;
  "aria-label"?: string;
};

/** Container de seção: fundo, padding responsivo e largura máxima. */
export function Section({
  children,
  id,
  variant = "preto",
  width = "normal",
  glow = false,
  className,
  innerClassName,
  "aria-label": ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      data-tone={VARIANT_TONE[variant]}
      className={cx(
        "w-full text-[color:var(--deck-fg)]",
        VARIANT_BG_CLASS[variant],
        glow && "deck-glow",
        className,
      )}
    >
      <div
        className={cx(
          "relative z-10 mx-auto w-full px-6 py-16 sm:px-10 md:py-24 lg:px-16 lg:py-28",
          CONTAINER_CLASS[width],
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
