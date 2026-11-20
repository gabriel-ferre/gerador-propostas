import { DeckTitle, Eyebrow, Section } from "@/components/ui-retrieve";
import { DiagnosticoPanel } from "./diagnostico-panel";
import type { DiagnosticoProps } from "./types";

export function Diagnostico(props: DiagnosticoProps) {
  return (
    <Section
      id="diagnostico"
      variant="preto"
      aria-label="Diagnóstico"
      innerClassName="flex flex-col gap-10 md:gap-14"
    >
      <div className="flex flex-col gap-5">
        <Eyebrow>Diagnóstico</Eyebrow>
        <DeckTitle
          text="Onde o faturamento está escapando"
          highlight="escapando"
          className="max-w-4xl"
        />
      </div>
      <DiagnosticoPanel {...props} />
    </Section>
  );
}
