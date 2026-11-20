import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DeckTitle, Eyebrow, Section } from "@/components/ui-retrieve";
import type { FaqProps } from "./types";

/** Seção 14: perguntas frequentes em acordeão (teclado e leitor de tela via Base UI). */
export function Faq({ faqs }: FaqProps) {
  if (faqs.length === 0) return null;
  const itens = [...faqs].sort((a, b) => a.position - b.position);

  return (
    <Section id="faq" variant="navy" width="estreito" aria-label="Perguntas frequentes">
      <Eyebrow>Perguntas frequentes</Eyebrow>
      <DeckTitle
        text="Ficou com alguma dúvida?"
        highlight="dúvida"
        className="mt-4"
      />
      <Accordion className="mt-10 border-t border-white/15 md:mt-14">
        {itens.map((f) => (
          <AccordionItem key={f.id} value={f.id} className="border-b border-white/15">
            <AccordionTrigger className="items-center gap-4 rounded-none py-5 text-left text-base font-semibold text-white hover:text-[color:var(--deck-accent)] hover:no-underline focus-visible:ring-brand-red/60 sm:text-lg md:py-6 md:text-xl **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-brand-red">
              {f.question}
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-base leading-relaxed whitespace-pre-line text-ink-300 sm:text-[1.0625rem]">
              {f.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
