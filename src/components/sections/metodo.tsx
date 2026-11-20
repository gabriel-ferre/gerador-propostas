import { Section } from "@/components/ui-retrieve/Section";
import { Eyebrow } from "@/components/ui-retrieve/Eyebrow";
import { DeckTitle } from "@/components/ui-retrieve/DeckTitle";
import { deck } from "@/lib/theme";
import type { MetodoProps } from "./types";
import { MetodoRoda } from "./metodo-roda";

// O schema de `metodo` só tem titulo e texto; os 4 pilares do ODCR (nomes e
// perguntas) vêm do README da marca e ficam fixos aqui até ganharem campos.
const PILARES = [
  { n: "01", nome: "Oferta", pergunta: "A marca e o produto são atrativos?" },
  { n: "02", nome: "Demanda", pergunta: "As campanhas geram demanda qualificada?" },
  { n: "03", nome: "Conversão", pergunta: "O canal de venda converte?" },
  { n: "04", nome: "Recompra", pergunta: "O cliente volta?" },
] as const;

const CENTRO_PADRAO = "12 meses em 12 semanas";

export function Metodo({ content }: MetodoProps) {
  if (!content) return null;

  return (
    <Section id="metodo" variant="navy" width="largo">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <Eyebrow>Método</Eyebrow>
        <DeckTitle text={content.titulo} highlight="ODCR" />
        <p className={deck.body}>{content.texto}</p>
      </div>

      <div className="mt-12 grid items-center gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16">
        <MetodoRoda pilares={PILARES} centro={CENTRO_PADRAO} />

        <ol className="flex flex-col">
          {PILARES.map((p) => (
            <li
              key={p.n}
              className="flex gap-5 border-t border-[color:var(--deck-line)] py-5 last:border-b sm:gap-6 sm:py-6"
            >
              <span className="pt-1 font-mono text-sm font-bold text-[color:var(--deck-accent)] sm:text-base">
                {p.n}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold uppercase tracking-tight text-[color:var(--deck-fg)] sm:text-xl">
                  {p.nome}
                </h3>
                <p className={deck.body}>{p.pergunta}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
