import type { EtapaOfertaProps } from "./types";
import { Provisional } from "./provisional";

export function EtapaOferta({ content }: EtapaOfertaProps) {
  return (
    <Provisional id="etapa_oferta" nome="Etapa 1 — Oferta irresistível">
      {content ? `${content.titulo} — ${content.bullets.length} bullets, ${content.criativos.length} criativos` : "sem conteúdo"}
    </Provisional>
  );
}
