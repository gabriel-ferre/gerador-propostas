import { Section } from "@/components/ui-retrieve/Section";
import { Eyebrow } from "@/components/ui-retrieve/Eyebrow";
import { DeckTitle } from "@/components/ui-retrieve/DeckTitle";
import { ProofNumber } from "@/components/ui-retrieve/ProofNumber";
import { deck } from "@/lib/theme";
import type { AutoridadeProps } from "./types";
import { AutoridadeFoto } from "./autoridade-foto";

// Posições das 5 fotos menores em volta da principal (grade 3x3, principal 2x2).
const SLOTS = [
  { area: "col-start-3 row-start-1", tom: "cinza" },
  { area: "col-start-3 row-start-2", tom: "vermelho" },
  { area: "col-start-1 row-start-3", tom: "vermelho" },
  { area: "col-start-2 row-start-3", tom: "cinza" },
  { area: "col-start-3 row-start-3", tom: "navy" },
] as const;

export function Autoridade({ content }: AutoridadeProps) {
  if (!content) return null;

  const paragrafos = content.texto.split(/\n{2,}/).filter((p) => p.trim());

  return (
    <Section id="autoridade" variant="preto" width="largo" glow>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Fotos: acima do texto no celular, à esquerda no desktop */}
        <div className="mx-auto grid w-full max-w-md grid-cols-3 grid-rows-3 gap-2 sm:gap-3 lg:max-w-none">
          <AutoridadeFoto
            src={content.foto_principal}
            alt={content.titulo}
            destaque
            tom="navy"
            className="col-span-2 col-start-1 row-span-2 row-start-1"
          />
          {SLOTS.map((slot, i) => (
            <AutoridadeFoto
              key={i}
              src={content.fotos[i]}
              alt=""
              tom={slot.tom}
              className={`${slot.area} aspect-square`}
            />
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <Eyebrow>Autoridade</Eyebrow>
          <DeckTitle text={content.titulo} highlight="moda" />
          <div className="flex flex-col gap-4">
            {paragrafos.map((p, i) => (
              <p key={i} className={deck.body}>
                {p}
              </p>
            ))}
          </div>

          {content.numeros.length > 0 && (
            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-[color:var(--deck-line)] pt-8">
              {content.numeros.map((n, i) => (
                <ProofNumber key={i} value={n.valor} label={n.rotulo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
