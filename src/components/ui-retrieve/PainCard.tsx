import { cx } from "@/lib/theme";

export type PainCardState = "normal" | "destacado" | "esmaecido";

type PainCardProps = {
  title: string;
  description?: string;
  state?: PainCardState;
  /** Chamado ao clicar ou ativar com Enter/Espaço. */
  onSelect?: () => void;
  className?: string;
};

const STATE_CLASS: Record<PainCardState, string> = {
  normal:
    "border-[color:var(--deck-line)] bg-[color:var(--deck-surface)] hover:border-[color:var(--deck-accent)]",
  destacado: "border-brand-red bg-[color:var(--deck-surface)] shadow-brand-red scale-[1.02]",
  esmaecido: "border-[color:var(--deck-line)] bg-transparent opacity-45 hover:opacity-80",
};

/** Cartão de dor: clicável, acessível por teclado, com 3 estados visuais. */
export function PainCard({
  title,
  description,
  state = "normal",
  onSelect,
  className,
}: PainCardProps) {
  return (
    <button
      type="button"
      aria-pressed={state === "destacado"}
      onClick={onSelect}
      className={cx(
        "flex h-full w-full cursor-pointer flex-col items-start gap-2 rounded-2xl border-[1.5px] p-5 text-left",
        "text-[color:var(--deck-fg)] transition-all duration-200 ease-brand motion-reduce:transition-none sm:p-6",
        STATE_CLASS[state],
        className,
      )}
    >
      <span
        aria-hidden
        className={cx(
          "h-2 w-2 shrink-0",
          state === "destacado" ? "bg-brand-red" : "bg-[color:var(--deck-line)]",
        )}
      />
      <span className="text-base font-semibold leading-snug sm:text-lg">{title}</span>
      {description ? (
        <span className="text-sm font-light leading-relaxed text-[color:var(--deck-muted)]">
          {description}
        </span>
      ) : null}
    </button>
  );
}
