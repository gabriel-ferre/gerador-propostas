import {
  Eye,
  Repeat,
  Sparkles,
  Target,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { DeckTitle } from "@/components/ui-retrieve/DeckTitle";
import { Section } from "@/components/ui-retrieve/Section";
import { deck } from "@/lib/theme";
import type { BeneficiosProps } from "./types";

const FALLBACK_ICONS: LucideIcon[] = [Target, Repeat, Eye, UserPlus, Sparkles];

/** Escolhe o ícone pelo sentido do texto; sem pista, segue a ordem. */
function iconFor(text: string, index: number): LucideIcon {
  const t = text.toLowerCase();
  if (/meta/.test(t)) return Target;
  if (/volt|recompra|recorr|fiel/.test(t)) return Repeat;
  if (/mercado|vis[aã]o|dado|an[aá]lise/.test(t)) return Eye;
  if (/novo|dia|atra[ií]|cliente/.test(t)) return UserPlus;
  if (/destac|autoridade|diferen/.test(t)) return Sparkles;
  return FALLBACK_ICONS[index % FALLBACK_ICONS.length];
}

/** Seção 11: reforço de benefícios e pergunta que leva à ancoragem. */
export function Beneficios({ content }: BeneficiosProps) {
  if (!content) return null;
  const itens = content.itens.filter((i) => i.trim().length > 0);

  return (
    <Section id="beneficios" variant="preto" width="largo" glow aria-label="Benefícios">
      <div className="flex flex-col items-center gap-10 text-center md:gap-14">
        <DeckTitle text={content.titulo} className="max-w-4xl" />

        {itens.length > 0 ? (
          <ul className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {itens.map((item, i) => {
              const Icon = iconFor(item, i);
              return (
                <li
                  key={`${i}-${item}`}
                  className={`${deck.surface} ${deck.transition} flex items-center gap-4 p-5 text-left hover:border-[color:var(--deck-accent)] sm:p-6`}
                >
                  <span
                    aria-hidden
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-red text-white"
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <span className="text-base font-semibold leading-snug text-[color:var(--deck-fg)] sm:text-lg">
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : null}

        <p className="mt-4 max-w-5xl text-balance text-[2rem] font-bold uppercase leading-[1.05] tracking-[-0.01em] text-[color:var(--deck-accent)] sm:text-5xl lg:text-7xl xl:text-8xl">
          {content.pergunta}
        </p>
      </div>
    </Section>
  );
}
