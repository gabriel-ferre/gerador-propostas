import type { ReactNode } from "react";
import { cx } from "@/lib/theme";

type EyebrowProps = { children: ReactNode; className?: string };

/** Rótulo curto em caixa-alta com tracking largo, acima dos títulos. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cx(
        "text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--deck-eyebrow)] sm:text-[0.8125rem]",
        className,
      )}
    >
      {children}
    </p>
  );
}
