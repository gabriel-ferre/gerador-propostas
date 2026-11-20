import { cx } from "@/lib/theme";

type ProofNumberProps = {
  /** O número já formatado, ex.: "+200", "R$ 680 mil", "10x". */
  value: string;
  /** Legenda abaixo do número. */
  label: string;
  size?: "normal" | "grande";
  className?: string;
};

/** Número de prova: grande, em vermelho, com legenda. */
export function ProofNumber({ value, label, size = "normal", className }: ProofNumberProps) {
  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <p
        className={cx(
          "font-bold leading-none tracking-tight text-[color:var(--deck-accent)]",
          size === "grande" ? "text-6xl sm:text-7xl lg:text-8xl" : "text-5xl sm:text-6xl",
        )}
      >
        {value}
      </p>
      <p className="max-w-[26ch] text-sm font-light leading-snug text-[color:var(--deck-muted)] sm:text-base">
        {label}
      </p>
    </div>
  );
}
