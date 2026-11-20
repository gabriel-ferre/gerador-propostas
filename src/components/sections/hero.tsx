import { DeckTitle, Eyebrow, Logo, Section } from "@/components/ui-retrieve";
import { HeroLogos } from "./hero-logos";
import type { HeroProps } from "./types";

const SUBTITULO =
  "Construímos a jornada do seu cliente, desde a compra até a recompra, com um método validado em +200 marcas de moda tanto no e-commerce quanto loja física";

export function Hero({ companyName, logos }: HeroProps) {
  const hasLogos = logos.some((l) => l.image_url);

  return (
    <Section
      id="hero"
      variant="navy"
      width="largo"
      glow
      aria-label="Apresentação"
      className="flex min-h-[100svh] items-center"
      innerClassName="flex flex-col gap-12 md:gap-16"
    >
      <div className="flex flex-col items-start gap-8 md:gap-10">
        <Logo variant="horizontal" height={32} priority alt="Retrieve" />
        <div className="flex max-w-6xl flex-col gap-6 md:gap-8">
          <Eyebrow>Proposta comercial</Eyebrow>
          <DeckTitle
            as="h1"
            size="hero"
            text={`Como vamos tornar o faturamento da ${companyName} previsível`}
            highlight={[companyName, "previsível"]}
          />
          <p className="max-w-3xl text-base font-light leading-relaxed text-[color:var(--deck-muted)] md:text-xl lg:text-2xl">
            {SUBTITULO}
          </p>
        </div>
      </div>

      {hasLogos ? (
        <div className="-mx-6 flex flex-col gap-5 sm:-mx-10 lg:-mx-16">
          <Eyebrow className="px-6 sm:px-10 lg:px-16">Marcas que já confiam na Retrieve</Eyebrow>
          <HeroLogos logos={logos} />
        </div>
      ) : null}
    </Section>
  );
}
