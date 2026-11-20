import type { ReactNode } from "react";
import { cx } from "@/lib/theme";

type DeckPageProps = {
  children: ReactNode;
  className?: string;
};

/** Envolve a página da proposta: aplica Poppins, cores do deck e fundo preto. */
export function DeckPage({ children, className }: DeckPageProps) {
  return (
    <div
      data-tone="escuro"
      className={cx("deck deck-bg-preto min-h-screen w-full overflow-x-clip", className)}
    >
      {children}
    </div>
  );
}
