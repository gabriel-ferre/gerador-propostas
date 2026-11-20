// Constantes de tema usadas pelas seções da proposta (linguagem do deck).
// As cores vivem como variáveis CSS em src/app/globals.css; aqui ficam só
// os nomes e as classes utilitárias, para as seções não repetirem strings.

export const SECTION_VARIANTS = ["preto", "navy", "vermelho", "branco"] as const;
export type SectionVariant = (typeof SECTION_VARIANTS)[number];

/** Fundo -> tom do texto (define as variáveis --deck-* nos filhos). */
export const VARIANT_TONE: Record<SectionVariant, "escuro" | "claro" | "vermelho"> = {
  preto: "escuro",
  navy: "escuro",
  vermelho: "vermelho",
  branco: "claro",
};

export const VARIANT_BG_CLASS: Record<SectionVariant, string> = {
  preto: "deck-bg-preto",
  navy: "deck-bg-navy",
  vermelho: "deck-bg-vermelho",
  branco: "deck-bg-branco",
};

/** Cores via variável CSS, para usar em style={{ color: ... }}. */
export const deckColor = {
  fg: "var(--deck-fg)",
  muted: "var(--deck-muted)",
  accent: "var(--deck-accent)",
  eyebrow: "var(--deck-eyebrow)",
  line: "var(--deck-line)",
  surface: "var(--deck-surface)",
} as const;

/** Larguras máximas do conteúdo (tokens --container-*). */
export const CONTAINER_CLASS = {
  estreito: "max-w-3xl",
  normal: "max-w-[var(--container-max)]",
  largo: "max-w-[var(--container-wide)]",
} as const;
export type ContainerSize = keyof typeof CONTAINER_CLASS;

/** Utilitários repetidos nas seções. */
export const deck = {
  text: "text-[color:var(--deck-fg)]",
  muted: "text-[color:var(--deck-muted)]",
  accent: "text-[color:var(--deck-accent)]",
  body: "text-base leading-relaxed font-light text-[color:var(--deck-muted)] md:text-lg",
  surface:
    "rounded-2xl border border-[color:var(--deck-line)] bg-[color:var(--deck-surface)]",
  transition: "transition-all duration-200 ease-brand motion-reduce:transition-none",
} as const;

/** Junta classes ignorando valores vazios. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
