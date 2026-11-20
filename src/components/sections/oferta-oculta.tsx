import type { OfertaOcultaProps } from "./types";
import { Provisional } from "./provisional";

// Nenhum dado de oferta entra aqui; a revelação (Shift + O) é da T16.
export function OfertaOculta(props: OfertaOcultaProps) {
  void props;
  return (
    <Provisional id="oferta_oculta" nome="Oferta protagonista">
      reservado ao modo apresentador
    </Provisional>
  );
}
