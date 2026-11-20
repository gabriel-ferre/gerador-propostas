import type { EtapaDemandaProps } from "./types";
import { Section } from "@/components/ui-retrieve/Section";
import { Eyebrow } from "@/components/ui-retrieve/Eyebrow";
import { DeckTitle } from "@/components/ui-retrieve/DeckTitle";
import { BulletList } from "@/components/ui-retrieve/BulletList";
import { deck } from "@/lib/theme";
import { EtapaDemandaFunil } from "./etapa-demanda-funil";
import { EtapaDemandaDashboards } from "./etapa-demanda-dashboards";

export function EtapaDemanda({ content }: EtapaDemandaProps) {
  if (!content) return null;

  return (
    <Section id="etapa_demanda" variant="navy" width="largo" aria-label={content.titulo}>
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Eyebrow>Etapa 2 do método</Eyebrow>
        <DeckTitle text={content.titulo} size="section" className="mt-3" />
        {content.texto && <p className={`${deck.body} mt-6`}>{content.texto}</p>}
        {content.bullets.length > 0 && (
          <BulletList items={content.bullets} className="mt-8 w-full max-w-xl text-left" />
        )}
      </div>

      <div className="mt-14 grid items-center gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-20">
        <EtapaDemandaFunil className="mx-auto h-auto w-full max-w-md" />
        <div>
          <Eyebrow className="mb-4">Resultados de clientes</Eyebrow>
          <EtapaDemandaDashboards dashboards={content.dashboards} />
        </div>
      </div>
    </Section>
  );
}
