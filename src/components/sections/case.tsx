import { Check } from "lucide-react";
import { DeckTitle } from "@/components/ui-retrieve/DeckTitle";
import { Eyebrow } from "@/components/ui-retrieve/Eyebrow";
import { Section } from "@/components/ui-retrieve/Section";
import { cx, deck } from "@/lib/theme";
import type { CaseProps } from "./types";
import { CaseMedia } from "./case-media";

/** Seção 9: case de identificação com o nicho do cliente. */
export function Case({ caseItem }: CaseProps) {
  if (!caseItem) return null;

  const hasMedia = Boolean(caseItem.media_url);
  const pains = caseItem.resolved_pains.filter((p) => p.trim().length > 0);

  return (
    <Section id="case" variant="preto" width="largo" glow aria-label="Case de identificação">
      <div
        className={cx(
          "grid items-center gap-10 lg:gap-16",
          hasMedia && "lg:grid-cols-[1.05fr_0.95fr]",
        )}
      >
        <div className="flex flex-col gap-6 md:gap-8">
          <Eyebrow>Case{caseItem.niche ? ` · ${caseItem.niche}` : ""}</Eyebrow>
          <DeckTitle text={caseItem.title} size="section" />
          {caseItem.body ? (
            <p className={cx(deck.body, "max-w-2xl whitespace-pre-line")}>{caseItem.body}</p>
          ) : null}

          {pains.length > 0 ? (
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--deck-accent)]">
                Dores resolvidas
              </p>
              <ul
                className={cx(
                  "grid gap-3",
                  !hasMedia && "sm:grid-cols-2 lg:grid-cols-3",
                )}
              >
                {pains.map((pain) => (
                  <li
                    key={pain}
                    className={cx(deck.surface, "flex items-start gap-3 p-4 sm:p-5")}
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red text-white"
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-base font-medium leading-snug text-[color:var(--deck-fg)]">
                      {pain}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {hasMedia ? (
          <CaseMedia
            url={caseItem.media_url as string}
            type={caseItem.media_type}
            title={caseItem.title}
          />
        ) : null}
      </div>
    </Section>
  );
}
