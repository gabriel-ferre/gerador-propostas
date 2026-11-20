import { DeckTitle } from "@/components/ui-retrieve/DeckTitle";
import { Eyebrow } from "@/components/ui-retrieve/Eyebrow";
import { Section } from "@/components/ui-retrieve/Section";
import { cx } from "@/lib/theme";
import type { DepoimentosProps } from "./types";

const KIND_LABEL: Record<string, string> = {
  foto_placa: "Cliente",
  print_whatsapp: "WhatsApp",
};

/** Seção 10: fotos com plaquinha e prints de WhatsApp em masonry. */
export function Depoimentos({ testimonials }: DepoimentosProps) {
  if (testimonials.length === 0) return null;

  const items = [...testimonials].sort((a, b) => a.position - b.position);

  return (
    <Section id="depoimentos" variant="branco" width="largo" aria-label="Depoimentos de clientes">
      <div className="mb-10 flex flex-col gap-4 md:mb-14">
        <Eyebrow>Quem já passou pelo método</Eyebrow>
        <DeckTitle text="Resultado que os clientes contam" highlight="clientes" />
      </div>

      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-6 [&>li]:mb-4 lg:[&>li]:mb-6">
        {items.map((t) => (
          <li key={t.id} className="break-inside-avoid">
            <figure
              className={cx(
                "overflow-hidden rounded-2xl border border-[color:var(--deck-line)]",
                "bg-[color:var(--deck-surface)]",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.image_url}
                alt={t.caption ?? "Depoimento de cliente"}
                loading="lazy"
                className="block h-auto w-full"
              />
              <figcaption className="flex items-center gap-3 p-4">
                <span className="shrink-0 bg-brand-red px-2 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white">
                  {KIND_LABEL[t.kind] ?? "Depoimento"}
                </span>
                {t.caption ? (
                  <span className="text-sm leading-snug text-[color:var(--deck-muted)]">
                    {t.caption}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
