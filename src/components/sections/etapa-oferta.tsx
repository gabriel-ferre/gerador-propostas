import type { EtapaOfertaProps } from "./types";
import { Section } from "@/components/ui-retrieve/Section";
import { Eyebrow } from "@/components/ui-retrieve/Eyebrow";
import { DeckTitle } from "@/components/ui-retrieve/DeckTitle";
import { BulletList } from "@/components/ui-retrieve/BulletList";
import { deck } from "@/lib/theme";
import { EtapaOfertaCarrossel } from "./etapa-oferta-carrossel";

export function EtapaOferta({ content }: EtapaOfertaProps) {
  if (!content) return null;

  return (
    <Section id="etapa_oferta" variant="preto" width="largo" glow aria-label={content.titulo}>
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,0.9fr)] lg:gap-20">
        <div>
          <FaseChevron fase="01" />
          <Eyebrow className="mt-8">Etapa 1 do método</Eyebrow>
          <DeckTitle text={content.titulo} size="section" className="mt-3" />
          {content.texto && <p className={`${deck.body} mt-6 max-w-xl`}>{content.texto}</p>}
          {content.bullets.length > 0 && <BulletList items={content.bullets} className="mt-8 max-w-xl" />}
        </div>
        <EtapaOfertaCarrossel criativos={content.criativos} />
      </div>
    </Section>
  );
}

/** Selo "FASE 01" em chevron (seta), preenchido em vermelho como no deck. */
function FaseChevron({ fase }: { fase: string }) {
  return (
    <span
      className="inline-flex h-11 items-center bg-[color:var(--deck-accent)] pl-5 pr-9 text-sm font-bold uppercase tracking-[0.2em] text-[#fefefe]"
      style={{ clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%)" }}
    >
      Fase {fase}
    </span>
  );
}
