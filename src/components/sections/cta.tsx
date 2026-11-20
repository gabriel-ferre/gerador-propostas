import type { CtaProps } from "./types";
import { Provisional } from "./provisional";

export function Cta({ content }: CtaProps) {
  return (
    <Provisional id="cta" nome="CTA">
      {content ? `${content.titulo} — botão "${content.botao}"` : "sem conteúdo"}
    </Provisional>
  );
}
