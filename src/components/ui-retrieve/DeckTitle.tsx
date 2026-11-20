import { cx } from "@/lib/theme";

type DeckTitleProps = {
  /** Texto completo do título (a caixa-alta é aplicada por CSS). */
  text: string;
  /** Palavra(s) ou trecho(s) do texto que ficam em vermelho. */
  highlight?: string | string[];
  as?: "h1" | "h2" | "h3";
  size?: "hero" | "section" | "card";
  className?: string;
};

const SIZES = {
  hero: "text-[2.125rem] leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl",
  section: "text-[1.75rem] leading-[1.08] sm:text-4xl lg:text-5xl",
  card: "text-xl leading-tight sm:text-2xl",
} as const;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Título do deck: Poppins bold, CAIXA-ALTA, com a palavra-chave em vermelho. */
export function DeckTitle({
  text,
  highlight,
  as: Tag = "h2",
  size = "section",
  className,
}: DeckTitleProps) {
  const terms = (Array.isArray(highlight) ? highlight : highlight ? [highlight] : [])
    .map((t) => t.trim())
    .filter(Boolean);

  let parts: string[] = [text];
  if (terms.length > 0) {
    const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
    parts = text.split(pattern);
  }
  const lowered = terms.map((t) => t.toLowerCase());

  return (
    <Tag
      className={cx(
        "font-bold uppercase tracking-[-0.01em] text-balance text-[color:var(--deck-fg)]",
        SIZES[size],
        className,
      )}
    >
      {parts.map((part, i) =>
        lowered.includes(part.toLowerCase()) ? (
          <span key={i} className="text-[color:var(--deck-accent)]">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </Tag>
  );
}
