import type { BeneficiosProps } from "./types";
import { Provisional } from "./provisional";

export function Beneficios({ content }: BeneficiosProps) {
  return (
    <Provisional id="beneficios" nome="Reforço de benefícios">
      {content ? `${content.titulo} — ${content.itens.length} benefícios` : "sem conteúdo"}
    </Provisional>
  );
}
